/**
 * List Articles Operation
 *
 * Retrieves a paginated list of articles belonging to the authenticated
 * user's company. Articles are ordered by creation date (newest first).
 *
 * API Endpoint: GET /articles
 *
 * Parameters:
 * - page: Page number (optional, default: 1)
 * - per_page: Results per page (optional, 1-50, default: 15)
 * - search: Filter by title or slug (optional)
 * - expand: Expand related resources (author, category, company)
 */

import type { INodeProperties, INodePropertyOptions } from 'n8n-workflow';

/**
 * Condition to show fields only for list operation
 */
const showForList = {
    resource: ['article'],
    operation: ['getMany'],
};

/**
 * Operation definition for the dropdown
 */
export const listArticleOperation: INodePropertyOptions = {
    name: 'Get Many',
    value: 'getMany',
    action: 'Get many articles',
    description: 'Retrieve a list of articles from your Trustmarkt profile',
    routing: {
        request: {
            method: 'GET',
            url: '/articles',
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
export const listArticleFields: INodeProperties[] = [
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
                        name: 'Author',
                        value: 'author',
                        description: 'Include the author of the article',
                    },
                    {
                        name: 'Category',
                        value: 'category',
                        description: 'Include the category the article belongs to',
                    },
                    {
                        name: 'Company',
                        value: 'company',
                        description: 'Include the company the article belongs to',
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
                description: 'Filter articles by title or slug (max 255 characters)',
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
