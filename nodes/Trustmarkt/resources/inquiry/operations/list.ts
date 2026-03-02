/**
 * List Inquiries Operation
 *
 * Retrieves a paginated list of inquiries belonging to the authenticated
 * user's company. Inquiries are ordered by creation date (newest first).
 *
 * API Endpoint: GET /inquiries
 *
 * Parameters:
 * - page: Page number (optional, default: 1)
 * - per_page: Results per page (optional, 1-50, default: 15)
 */

import type { INodeProperties, INodePropertyOptions } from 'n8n-workflow';

/**
 * Condition to show fields only for list operation
 */
const showForList = {
    resource: ['inquiry'],
    operation: ['getMany'],
};

/**
 * Operation definition for the dropdown
 */
export const listInquiryOperation: INodePropertyOptions = {
    name: 'Get Many',
    value: 'getMany',
    action: 'Get many inquiries',
    description: 'Retrieve a list of inquiries from your Trustmarkt profile',
    routing: {
        request: {
            method: 'GET',
            url: '/inquiries',
        },
        output: {
            postReceive: [
                {
                    type: 'rootProperty',
                    properties: {
                        property: 'data',
                    },
                },
            ],
        },
    },
};

/**
 * Fields specific to the Get Many operation
 */
export const listInquiryFields: INodeProperties[] = [
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
            show: showForList,
        },
        // Options are sorted alphabetically as per n8n guidelines
        options: [
            {
                displayName: 'Limit',
                name: 'limit',
                type: 'number',
                typeOptions: {
                    minValue: 1,
                    maxValue: 50,
                },
                default: 50,
                description: 'Max number of results to return',
                routing: {
                    send: {
                        type: 'query',
                        property: 'per_page',
                    },
                },
            },
            {
                displayName: 'Page',
                name: 'page',
                type: 'number',
                typeOptions: {
                    minValue: 1,
                },
                default: 1,
                description: 'Page number for pagination (starts at 1)',
                routing: {
                    send: {
                        type: 'query',
                        property: 'page',
                    },
                },
            },
        ],
    },
];
