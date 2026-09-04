/**
 * Get Review Operation
 *
 * Retrieves a single review by its ID. The review must belong to
 * the authenticated user's company.
 *
 * API Endpoint: GET /reviews/{review}
 *
 * Parameters:
 * - review: The review ID (required)
 * - expand: Expand related resources (user, company, comments, collectedBy, etc.)
 */

import type { INodeProperties, INodePropertyOptions } from 'n8n-workflow';

/**
 * Condition to show fields only for get operation
 */
const showForGet = {
    resource: ['review'],
    operation: ['get'],
};

/**
 * Operation definition for the dropdown
 */
export const getReviewOperation: INodePropertyOptions = {
    name: 'Get',
    value: 'get',
    action: 'Get a review',
    description: 'Retrieve a single review by ID',
    routing: {
        request: {
            method: 'GET',
            url: '=/reviews/{{ $parameter.reviewId }}',
        },
    },
};

/**
 * Fields specific to the Get operation
 */
export const getReviewFields: INodeProperties[] = [
    // ─────────────────────────────────────────────────────────────
    // Required Fields
    // ─────────────────────────────────────────────────────────────
    {
        displayName: 'Review ID',
        name: 'reviewId',
        type: 'string',
        required: true,
        default: '',
        description: 'The unique identifier of the review to retrieve',
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
        ],
    },
];
