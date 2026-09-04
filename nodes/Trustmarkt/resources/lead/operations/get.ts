/**
 * Get Lead Operation
 *
 * Retrieves a single lead by its ID. The lead must belong to
 * the authenticated user's company.
 *
 * API Endpoint: GET /leads/{lead}
 *
 * Parameters:
 * - lead: The lead ID (required)
 * - expand: Expand related resources (resource)
 */

import type { INodeProperties, INodePropertyOptions } from 'n8n-workflow';

/**
 * Condition to show fields only for get operation
 */
const showForGet = {
    resource: ['lead'],
    operation: ['get'],
};

/**
 * Operation definition for the dropdown
 */
export const getLeadOperation: INodePropertyOptions = {
    name: 'Get',
    value: 'get',
    action: 'Get a lead',
    description: 'Retrieve a single lead by ID',
    routing: {
        request: {
            method: 'GET',
            url: '=/leads/{{ $parameter.leadId }}',
        },
    },
};

/**
 * Fields specific to the Get operation
 */
export const getLeadFields: INodeProperties[] = [
    // ─────────────────────────────────────────────────────────────
    // Required Fields
    // ─────────────────────────────────────────────────────────────
    {
        displayName: 'Lead ID',
        name: 'leadId',
        type: 'string',
        required: true,
        default: '',
        description: 'The unique identifier of the lead to retrieve',
        displayOptions: {
            show: showForGet,
        },
    },

    // ─────────────────────────────────────────────────────────────
    // Options (collapsible additional settings)
    // ─────────────────────────────────────────────────────────────
    {
        displayName: 'Options',
        name: 'options',
        type: 'collection',
        placeholder: 'Add Option',
        default: {},
        displayOptions: {
            show: showForGet,
        },
        // Options are sorted alphabetically as per n8n guidelines
        options: [
            {
                displayName: 'Expand',
                name: 'expand',
                type: 'multiOptions',
                default: [],
                description: 'Include related resources in the response',
                // Options sorted alphabetically
                options: [
                    {
                        name: 'Resource',
                        value: 'resource',
                        description: 'Include the resource (lead magnet) the lead signed up for',
                    },
                ],
                routing: {
                    send: {
                        type: 'query',
                        property: 'expand',
                        value: '={{ $value.join(",") }}',
                    },
                },
            },
        ],
    },
];
