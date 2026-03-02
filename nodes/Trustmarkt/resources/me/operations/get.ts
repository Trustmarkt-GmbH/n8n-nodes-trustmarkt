/**
 * Get Me Operation
 *
 * Retrieves the authenticated user's information, including their
 * associated company data.
 *
 * API Endpoint: GET /me
 *
 * Parameters:
 * - expand: Expand related resources (company, company.mainCategory, company.articles)
 */

import type { INodeProperties, INodePropertyOptions } from 'n8n-workflow';

/**
 * Condition to show fields only for get operation
 */
const showForGet = {
    resource: ['me'],
    operation: ['get'],
};

/**
 * Operation definition for the dropdown
 */
export const getMeOperation: INodePropertyOptions = {
    name: 'Get',
    value: 'get',
    action: 'Get authenticated user',
    description: 'Retrieve information about the authenticated user',
    routing: {
        request: {
            method: 'GET',
            url: '/me',
        },
    },
};

/**
 * Fields specific to the Get operation
 */
export const getMeFields: INodeProperties[] = [
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
                        name: 'Company',
                        value: 'company',
                        description: 'Include the company the user belongs to',
                    },
                    {
                        name: 'Company Articles',
                        value: 'company.articles',
                        description: 'Include the articles of the company',
                    },
                    {
                        name: 'Company Main Category',
                        value: 'company.mainCategory',
                        description: 'Include the main category of the company',
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
