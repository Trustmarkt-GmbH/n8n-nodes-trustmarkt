/**
 * List Leads Operation
 *
 * Retrieves a paginated list of leads belonging to the authenticated
 * user's company. A lead is a person who signed up for one of the
 * company's resources (lead magnets). Leads are ordered by creation
 * date (newest first).
 *
 * API Endpoint: GET /leads
 *
 * Parameters:
 * - page: Page number (optional, default: 1)
 * - per_page: Results per page (optional, 1-50, default: 15)
 * - resource: Only return leads of a single resource (optional, resource ID)
 * - expand: Expand related resources (resource)
 */

import type { INodeProperties, INodePropertyOptions } from 'n8n-workflow';

/**
 * Condition to show fields only for list operation
 */
const showForList = {
    resource: ['lead'],
    operation: ['getMany'],
};

/**
 * Operation definition for the dropdown
 */
export const listLeadOperation: INodePropertyOptions = {
    name: 'Get Many',
    value: 'getMany',
    action: 'Get many leads',
    description: 'Retrieve a list of leads that signed up for your resources (lead magnets)',
    routing: {
        request: {
            method: 'GET',
            url: '/leads',
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
export const listLeadFields: INodeProperties[] = [
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
                displayName: 'Resource ID',
                name: 'resourceId',
                type: 'string',
                default: '',
                description:
                    'Only return the leads of a single resource (lead magnet). Pass the ID of a resource as returned by the Resource operations.',
                routing: {
                    send: {
                        type: 'query',
                        property: 'resource',
                    },
                },
            },
        ],
    },
];
