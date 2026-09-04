/**
 * Get Resource Operation
 *
 * Retrieves a single resource (lead magnet) by its ID. The resource must
 * belong to the authenticated user's company.
 *
 * API Endpoint: GET /resources/{resource}
 *
 * Parameters:
 * - resource: The resource ID (required)
 * - status: Which version the content fields are taken from (optional, draft|public)
 */

import type { INodeProperties, INodePropertyOptions } from 'n8n-workflow';

/**
 * Condition to show fields only for get operation
 */
const showForGet = {
    resource: ['resource'],
    operation: ['get'],
};

/**
 * Operation definition for the dropdown
 */
export const getResourceOperation: INodePropertyOptions = {
    name: 'Get',
    value: 'get',
    action: 'Get a resource',
    description: 'Retrieve a single resource (lead magnet) by ID',
    routing: {
        request: {
            method: 'GET',
            url: '=/resources/{{ $parameter.resourceId }}',
        },
    },
};

/**
 * Fields specific to the Get operation
 */
export const getResourceFields: INodeProperties[] = [
    // ─────────────────────────────────────────────────────────────
    // Required Fields
    // ─────────────────────────────────────────────────────────────
    {
        displayName: 'Resource ID',
        name: 'resourceId',
        type: 'string',
        required: true,
        default: '',
        description: 'The unique identifier of the resource (lead magnet) to retrieve',
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
                displayName: 'Version',
                name: 'status',
                type: 'options',
                default: 'public',
                description:
                    'Which version the content fields are taken from. If not set, the published version is used, falling back to the newest draft while the resource was never published.',
                // Options sorted alphabetically
                options: [
                    {
                        name: 'Draft',
                        value: 'draft',
                        description: 'The newest version of the resource (the current editing state)',
                    },
                    {
                        name: 'Public',
                        value: 'public',
                        description:
                            'Strictly the published version — content fields are null while the resource was never published',
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
