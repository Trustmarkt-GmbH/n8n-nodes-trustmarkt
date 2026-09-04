/**
 * TrustmarktTrigger.node.ts
 * 
 * This is a WEBHOOK-TRIGGER Node - it receives real-time events.
 * 
 * WEBHOOK vs POLLING:
 * - Polling: n8n regularly asks the API "Anything new?"
 * - Webhook: Trustmarkt SENDS data to n8n when something happens (real-time!)
 * 
 * HOW IT WORKS:
 * 1. User activates workflow → n8n registers webhook at Trustmarkt (POST /webhooks)
 * 2. Event happens (e.g. new review) → Trustmarkt sends POST to n8n
 * 3. n8n receives data → Workflow is executed
 * 4. User deactivates workflow → n8n deletes webhook at Trustmarkt (DELETE /webhooks/{id})
 * 
 * IMPORTANT: Trigger nodes have NO input, only output!
 */

import {
    NodeApiError,
    NodeConnectionTypes,
    type IDataObject,
    type IHookFunctions,
    type ILoadOptionsFunctions,
    type INodePropertyOptions,
    type INodeType,
    type INodeTypeDescription,
    type IWebhookFunctions,
    type IWebhookResponseData,
    type JsonObject,
} from 'n8n-workflow';

import { getApiBaseUrl } from './shared/transport';

// Trigger nodes cannot be invoked as AI tools, so `usableAsTool` must not be set on this
// node (n8n review requirement). The community-nodes linter still asks for the property,
// hence the targeted disable.
// eslint-disable-next-line @n8n/community-nodes/node-usable-as-tool
export class TrustmarktTrigger implements INodeType {
    description: INodeTypeDescription = {
        // === BASIC INFORMATION ===
        displayName: 'Trustmarkt Trigger',
        name: 'trustmarktTrigger',
        icon: { light: 'file:trustmarkt.svg', dark: 'file:trustmarkt-dark.svg' },
        group: ['trigger'],
        version: 1,
        subtitle: '={{$parameter["events"].join(", ")}}',
        description: 'Starts the workflow when Trustmarkt events occur (Webhooks)',

        defaults: {
            name: 'Trustmarkt Trigger',
        },

        // === INPUTS & OUTPUTS ===
        // Triggers have NO input - they start the workflow!
        inputs: [],
        outputs: [NodeConnectionTypes.Main],

        // === CREDENTIALS (Authentication) ===
        credentials: [
            {
                name: 'trustmarktApi',
                required: true,
            },
        ],

        // === WEBHOOK CONFIGURATION ===
        webhooks: [
            {
                name: 'default',
                httpMethod: 'POST',
                responseMode: 'onReceived',
                path: 'webhook',
            },
        ],

        // === PROPERTIES (Input fields in the UI) ===
        properties: [
            // Event selection: Which events should trigger the workflow?
            {
                displayName: 'Event Names or IDs',
                name: 'events',
                type: 'multiOptions',
                required: true,
                default: [],
                description: 'Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
                // Instead of hardcoded options, load dynamically from API
                typeOptions: {
                    loadOptionsMethod: 'getWebhookEvents',
                },
            },
            // Optional name for the webhook (for identification in the dashboard)
            {
                displayName: 'Webhook Name',
                name: 'webhookName',
                type: 'string',
                default: '',
                placeholder: 'e.g. n8n Integration',
                description: 'Optional name to identify the webhook in the Trustmarkt dashboard',
            },
        ],
    };

    // ==========================================
    // WEBHOOK METHODS
    // ==========================================
    // These methods are called automatically by n8n

    webhookMethods = {
        default: {
            /**
             * Checks if the webhook already exists
             * Called before create() is executed
             */
            async checkExists(this: IHookFunctions): Promise<boolean> {
                const webhookData = this.getWorkflowStaticData('node');

                // If we have a stored webhook ID, it exists
                if (webhookData.webhookId) {
                    return true;
                }

                return false;
            },

            /**
             * Registers the webhook at Trustmarkt
             * Called when the workflow is activated
             */
            async create(this: IHookFunctions): Promise<boolean> {
                // Get webhook URL from n8n (the URL that Trustmarkt should call)
                const webhookUrl = this.getNodeWebhookUrl('default');

                // Get parameters from the UI
                const events = this.getNodeParameter('events') as string[];
                const webhookName = this.getNodeParameter('webhookName', '') as string;

                // Request body for Trustmarkt API
                const body: IDataObject = {
                    url: webhookUrl,
                    events: events,
                    is_active: true,
                };

                // Optional name
                if (webhookName) {
                    body.name = webhookName;
                }

                try {
                    // Get API base URL from credentials
                    const baseUrl = getApiBaseUrl();

                    // Register webhook at Trustmarkt
                    const response = await this.helpers.httpRequestWithAuthentication.call(
                        this,
                        'trustmarktApi',
                        {
                            method: 'POST',
                            url: `${baseUrl}/webhooks`,
                            body,
                            json: true,
                        },
                    );

                    // Store webhook ID (for later deletion)
                    const webhookData = this.getWorkflowStaticData('node');
                    webhookData.webhookId = response.id;

                    // Store secret (for signature verification)
                    if (response.secret) {
                        webhookData.webhookSecret = response.secret;
                    }

                    return true;
                } catch (error) {
                    throw new NodeApiError(this.getNode(), error as JsonObject);
                }
            },

            /**
             * Deletes the webhook at Trustmarkt
             * Called when the workflow is deactivated
             */
            async delete(this: IHookFunctions): Promise<boolean> {
                const webhookData = this.getWorkflowStaticData('node');
                const webhookId = webhookData.webhookId as string;

                // If no webhook ID is stored, nothing to delete
                if (!webhookId) {
                    return true;
                }

                try {
                    // Get API base URL from credentials
                    const baseUrl = getApiBaseUrl();

                    // Delete webhook at Trustmarkt
                    await this.helpers.httpRequestWithAuthentication.call(
                        this,
                        'trustmarktApi',
                        {
                            method: 'DELETE',
                            url: `${baseUrl}/webhooks/${webhookId}`,
                            json: true,
                        },
                    );

                    return true;
                } catch (error) {
                    // Do not block deactivation, but make the failure visible:
                    // the webhook may still be active in Trustmarkt and needs manual cleanup.
                    this.logger.error(`Failed to delete Trustmarkt webhook ${webhookId}`, { error });
                    return true;
                } finally {
                    // Always clear stored data regardless of API outcome
                    delete webhookData.webhookId;
                    delete webhookData.webhookSecret;
                }
            },
        },
    };

    // ==========================================
    // LOAD OPTIONS METHODS
    // ==========================================
    // These methods are called to dynamically load dropdown options from the API

    methods = {
        loadOptions: {
            /**
             * Fetches available webhook events from the Trustmarkt API
             * Called when the user opens the "Events" dropdown
             */
            async getWebhookEvents(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
                try {
                    // Get API base URL from credentials
                    const baseUrl = getApiBaseUrl();

                    // Call the Trustmarkt API to get available events
                    const response = await this.helpers.httpRequestWithAuthentication.call(
                        this,
                        'trustmarktApi',
                        {
                            method: 'GET',
                            url: `${baseUrl}/webhooks/events`,
                            json: true,
                        },
                    );

                    // Transform API response to n8n option format
                    // API returns: { value: string, name: string, description: string }[]
                    // n8n expects: { value: string, name: string, description?: string }[]
                    return (response as IDataObject[]).map((event: IDataObject) => ({
                        name: event.name as string,
                        value: event.value as string,
                        description: event.description as string,
                    }));
                } catch (error) {
                    throw new NodeApiError(this.getNode(), error as JsonObject);
                }
            },
        },
    };

    /**
     * Called when Trustmarkt sends a POST request
     * Here we process the incoming webhook data
     */
    async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
        // Get request body (the data Trustmarkt sent)
        const bodyData = this.getBodyData();

        // Optional: Verify signature
        // const webhookData = this.getWorkflowStaticData('node');
        // const secret = webhookData.webhookSecret;
        // const signature = this.getHeaderData()['x-trustmarkt-signature'];
        // TODO: Implement signature verification if Trustmarkt supports it

        // Return data for the workflow
        // Each item in workflowData becomes a separate execution
        return {
            workflowData: [
                this.helpers.returnJsonArray(bodyData),
            ],
        };
    }
}
