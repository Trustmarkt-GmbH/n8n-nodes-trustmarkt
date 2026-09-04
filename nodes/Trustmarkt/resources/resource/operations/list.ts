/**
 * List Resources Operation
 *
 * Retrieves a paginated list of resources (lead magnets) belonging to the
 * authenticated user's company — both published and draft ones,
 * distinguishable by their `status`. Resources are ordered by creation
 * date (newest first).
 *
 * API Endpoint: GET /resources
 *
 * Parameters:
 * - page: Page number (optional, default: 1)
 * - per_page: Results per page (optional, 1-50, default: 15)
 * - status: Which version the content fields are taken from (optional, draft|public)
 */

import type { INodeProperties, INodePropertyOptions } from 'n8n-workflow';

/**
 * Condition to show fields only for list operation
 */
const showForList = {
    resource: ['resource'],
    operation: ['getMany'],
};

/**
 * Operation definition for the dropdown
 */
export const listResourceOperation: INodePropertyOptions = {
    name: 'Get Many',
    value: 'getMany',
    action: 'Get many resources',
    description: 'Retrieve a list of resources (lead magnets) from your Trustmarkt profile',
    routing: {
        request: {
            method: 'GET',
            url: '/resources',
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
export const listResourceFields: INodeProperties[] = [
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
            {
                displayName: 'Version',
                name: 'status',
                type: 'options',
                default: 'public',
                description:
                    'Which version the content fields of each resource are taken from. If not set, the published version is used, falling back to the newest draft for resources that were never published.',
                // Options sorted alphabetically
                options: [
                    {
                        name: 'Draft',
                        value: 'draft',
                        description:
                            'The newest version of every resource (the current editing state)',
                    },
                    {
                        name: 'Public',
                        value: 'public',
                        description:
                            'Strictly the published version — resources that were never published are excluded',
                    },
                ],
                routing: {
                    send: {
                        type: 'query',
                        property: 'status',
                    },
                },
            },
        ],
    },
];
