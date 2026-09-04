/**
 * List Reviews Operation
 *
 * Retrieves a paginated list of reviews belonging to the authenticated
 * user's company. Reviews are ordered by creation date (newest first).
 *
 * API Endpoint: GET /reviews
 *
 * Parameters:
 * - page: Page number (optional, default: 1)
 * - per_page: Results per page (optional, 1-50, default: 15)
 * - expand: Expand related resources (user, company, comments, collectedBy, etc.)
 */

import type { INodeProperties, INodePropertyOptions } from 'n8n-workflow';

/**
 * Condition to show fields only for list operation
 */
const showForList = {
    resource: ['review'],
    operation: ['getMany'],
};

/**
 * Operation definition for the dropdown
 */
export const listReviewOperation: INodePropertyOptions = {
    name: 'Get Many',
    value: 'getMany',
    action: 'Get many reviews',
    description: 'Retrieve a list of reviews from your Trustmarkt profile',
    routing: {
        request: {
            method: 'GET',
            url: '/reviews',
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
export const listReviewFields: INodeProperties[] = [
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
                        name: 'Collected By',
                        value: 'collectedBy',
                        description:
                            'Expand the team member who collected the review through their personal review link into the full user representation (only for company owners whose plan includes personal review links)',
                    },
                    {
                        name: 'Comments',
                        value: 'comments',
                        description: 'Include comments on the review',
                    },
                    {
                        name: 'Company',
                        value: 'company',
                        description: 'Include the company the review belongs to',
                    },
                    {
                        name: 'Company Main Category',
                        value: 'company.mainCategory',
                        description: 'Include the main category of the company',
                    },
                    {
                        name: 'User',
                        value: 'user',
                        description: 'Include the user who wrote the review',
                    },
                    {
                        name: 'User Company',
                        value: 'user.company',
                        description: 'Include the company of the user who wrote the review',
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
        ],
    },
];
