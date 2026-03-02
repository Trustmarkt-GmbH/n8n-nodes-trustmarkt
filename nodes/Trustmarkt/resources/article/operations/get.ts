/**
 * Get Article Operation
 *
 * Retrieves a single article by its ID. The article must belong to
 * the authenticated user's company.
 *
 * API Endpoint: GET /articles/{article}
 *
 * Parameters:
 * - article: The article ID (required)
 * - expand: Expand related resources (author, category, company, content)
 */

import type { INodeProperties, INodePropertyOptions } from 'n8n-workflow';

/**
 * Condition to show fields only for get operation
 */
const showForGet = {
    resource: ['article'],
    operation: ['get'],
};

/**
 * Operation definition for the dropdown
 */
export const getArticleOperation: INodePropertyOptions = {
    name: 'Get',
    value: 'get',
    action: 'Get an article',
    description: 'Retrieve a single article by ID',
    routing: {
        request: {
            method: 'GET',
            url: '=/articles/{{ $parameter.articleId }}',
        },
    },
};

/**
 * Fields specific to the Get operation
 */
export const getArticleFields: INodeProperties[] = [
    // ─────────────────────────────────────────────────────────────
    // Required Fields
    // ─────────────────────────────────────────────────────────────
    {
        displayName: 'Article ID',
        name: 'articleId',
        type: 'string',
        required: true,
        default: '',
        description: 'The unique identifier of the article to retrieve',
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
                    {
                        name: 'Content',
                        value: 'content',
                        description: 'Include the main HTML content of the article',
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
