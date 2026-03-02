/**
 * Get User Operation
 *
 * Retrieves a single user by their ID. The user must belong to
 * the authenticated user's company.
 *
 * API Endpoint: GET /user/{user}
 *
 * Parameters:
 * - user: The user ID (required)
 * - expand: Expand related resources (company)
 */

import type { INodeProperties, INodePropertyOptions } from 'n8n-workflow';

/**
 * Condition to show fields only for get operation
 */
const showForGet = {
    resource: ['user'],
    operation: ['get'],
};

/**
 * Operation definition for the dropdown
 */
export const getUserOperation: INodePropertyOptions = {
    name: 'Get',
    value: 'get',
    action: 'Get a user',
    description: 'Retrieve a single user by ID',
    routing: {
        request: {
            method: 'GET',
            url: '=/user/{{ $parameter.userId }}',
        },
    },
};

/**
 * Fields specific to the Get operation
 */
export const getUserFields: INodeProperties[] = [
    // ─────────────────────────────────────────────────────────────
    // Required Fields
    // ─────────────────────────────────────────────────────────────
    {
        displayName: 'User ID',
        name: 'userId',
        type: 'string',
        required: true,
        default: '',
        description: 'The unique identifier of the user to retrieve',
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
                        name: 'Company',
                        value: 'company',
                        description: 'Include the company the user belongs to',
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
