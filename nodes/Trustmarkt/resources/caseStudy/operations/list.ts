/**
 * List Case Studies Operation
 *
 * Retrieves a paginated list of case studies belonging to the authenticated
 * user's company. Case studies are ordered by creation date (newest first).
 *
 * API Endpoint: GET /case-studies
 *
 * Parameters:
 * - page: Page number (optional, default: 1)
 * - per_page: Results per page (optional, 1-50, default: 15)
 * - search: Filter by title or customer_name (optional)
 * - expand: Expand related resources (review, customerIndustry)
 */

import type { INodeProperties, INodePropertyOptions } from 'n8n-workflow';

/**
 * Condition to show fields only for list operation
 */
const showForList = {
    resource: ['caseStudy'],
    operation: ['getMany'],
};

/**
 * Operation definition for the dropdown
 */
export const listCaseStudyOperation: INodePropertyOptions = {
    name: 'Get Many',
    value: 'getMany',
    action: 'Get many case studies',
    description: 'Retrieve a list of case studies from your Trustmarkt profile',
    routing: {
        request: {
            method: 'GET',
            url: '/case-studies',
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
export const listCaseStudyFields: INodeProperties[] = [
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
                        name: 'Customer Industry',
                        value: 'customerIndustry',
                        description: 'Include the industry of the customer',
                    },
                    {
                        name: 'Review',
                        value: 'review',
                        description: 'Include the associated review',
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
                displayName: 'Search',
                name: 'search',
                type: 'string',
                default: '',
                description: 'Filter case studies by title or customer name (max 255 characters)',
                routing: {
                    send: {
                        type: 'query',
                        property: 'search',
                    },
                },
            },
        ],
    },
];
