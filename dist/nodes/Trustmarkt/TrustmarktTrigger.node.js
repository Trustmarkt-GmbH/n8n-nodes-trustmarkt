"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrustmarktTrigger = void 0;
const n8n_workflow_1 = require("n8n-workflow");
const transport_1 = require("./shared/transport");
class TrustmarktTrigger {
    constructor() {
        this.description = {
            displayName: 'Trustmarkt Trigger',
            name: 'trustmarktTrigger',
            icon: 'file:trustmarkt.svg',
            group: ['trigger'],
            version: 1,
            subtitle: '={{$parameter["events"].join(", ")}}',
            description: 'Starts the workflow when Trustmarkt events occur (Webhooks)',
            usableAsTool: true,
            defaults: {
                name: 'Trustmarkt Trigger',
            },
            inputs: [],
            outputs: [n8n_workflow_1.NodeConnectionTypes.Main],
            credentials: [
                {
                    name: 'trustmarktApi',
                    required: true,
                },
            ],
            webhooks: [
                {
                    name: 'default',
                    httpMethod: 'POST',
                    responseMode: 'onReceived',
                    path: 'webhook',
                },
            ],
            properties: [
                {
                    displayName: 'Event Names or IDs',
                    name: 'events',
                    type: 'multiOptions',
                    required: true,
                    default: [],
                    description: 'Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
                    typeOptions: {
                        loadOptionsMethod: 'getWebhookEvents',
                    },
                },
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
        this.webhookMethods = {
            default: {
                async checkExists() {
                    const webhookData = this.getWorkflowStaticData('node');
                    if (webhookData.webhookId) {
                        return true;
                    }
                    return false;
                },
                async create() {
                    const webhookUrl = this.getNodeWebhookUrl('default');
                    const events = this.getNodeParameter('events');
                    const webhookName = this.getNodeParameter('webhookName', '');
                    const body = {
                        url: webhookUrl,
                        events: events,
                        is_active: true,
                    };
                    if (webhookName) {
                        body.name = webhookName;
                    }
                    try {
                        const baseUrl = (0, transport_1.getApiBaseUrl)();
                        const response = await this.helpers.httpRequestWithAuthentication.call(this, 'trustmarktApi', {
                            method: 'POST',
                            url: `${baseUrl}/webhooks`,
                            body,
                            json: true,
                        });
                        const webhookData = this.getWorkflowStaticData('node');
                        webhookData.webhookId = response.id;
                        if (response.secret) {
                            webhookData.webhookSecret = response.secret;
                        }
                        return true;
                    }
                    catch {
                        return false;
                    }
                },
                async delete() {
                    const webhookData = this.getWorkflowStaticData('node');
                    const webhookId = webhookData.webhookId;
                    if (!webhookId) {
                        return true;
                    }
                    try {
                        const baseUrl = (0, transport_1.getApiBaseUrl)();
                        await this.helpers.httpRequestWithAuthentication.call(this, 'trustmarktApi', {
                            method: 'DELETE',
                            url: `${baseUrl}/webhooks/${webhookId}`,
                            json: true,
                        });
                        delete webhookData.webhookId;
                        delete webhookData.webhookSecret;
                        return true;
                    }
                    catch {
                        return true;
                    }
                },
            },
        };
        this.methods = {
            loadOptions: {
                async getWebhookEvents() {
                    try {
                        const baseUrl = (0, transport_1.getApiBaseUrl)();
                        const response = await this.helpers.httpRequestWithAuthentication.call(this, 'trustmarktApi', {
                            method: 'GET',
                            url: `${baseUrl}/webhooks/events`,
                            json: true,
                        });
                        return response.map((event) => ({
                            name: event.name,
                            value: event.value,
                            description: event.description,
                        }));
                    }
                    catch {
                        return [];
                    }
                },
            },
        };
    }
    async webhook() {
        const bodyData = this.getBodyData();
        return {
            workflowData: [
                this.helpers.returnJsonArray(bodyData),
            ],
        };
    }
}
exports.TrustmarktTrigger = TrustmarktTrigger;
//# sourceMappingURL=TrustmarktTrigger.node.js.map