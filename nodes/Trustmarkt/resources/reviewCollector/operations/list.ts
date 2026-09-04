/**
 * List Review Collectors Operation
 *
 * Retrieves a paginated leaderboard of the authenticated user's company
 * team members and how many reviews each collected through their personal
 * review link within a date range, ordered by collected count descending.
 * Each entry nests the collected reviews.
 *
 * This endpoint is restricted to company owners of a company whose plan
 * includes personal review links. Other callers receive a 403.
 *
 * API Endpoint: GET /review-collectors
 *
 * Parameters:
 * - from: Inclusive start of the window, Y-m-d (optional, default: first day of current month)
 * - to: Inclusive end of the window, Y-m-d (optional, default: today)
 * - page: Page number (optional, default: 1)
 * - per_page: Results per page (optional, 1-100, default: 15)
 * - expand: Expand the collector into the full user representation (user)
 */

import type { INodeProperties, INodePropertyOptions } from 'n8n-workflow';

/**
 * Condition to show fields only for list operation
 */
const showForList = {
    resource: ['reviewCollector'],
    operation: ['getMany'],
};

/**
 * Operation definition for the dropdown
 */
export const listReviewCollectorOperation: INodePropertyOptions = {
    name: 'Get Many',
    value: 'getMany',
    action: 'Get many review collectors',
    description:
        'Retrieve a leaderboard of team members and the reviews they collected through their personal review links',
    routing: {
        request: {
            method: 'GET',
            url: '/review-collectors',
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
export const listReviewCollectorFields: INodeProperties[] = [
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
                        name: 'User',
                        value: 'user',
                        description:
                            'Expand each collector into the full user representation instead of only ID and name',
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
                displayName: 'From',
                name: 'from',
                type: 'dateTime',
                default: '',
                description:
                    'Inclusive start of the leaderboard window (only the date part is used). Defaults to the first day of the current month. Must not be later than "To" and not more than 48 months ago.',
                routing: {
                    send: {
                        type: 'query',
                        property: 'from',
                        value: '={{ String($value).slice(0, 10) }}',
                    },
                },
            },
            {
                displayName: 'Limit',
                name: 'limit',
                type: 'number',
                typeOptions: {
                    minValue: 1,
                    maxValue: 100,
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
                displayName: 'To',
                name: 'to',
                type: 'dateTime',
                default: '',
                description:
                    'Inclusive end of the leaderboard window (only the date part is used). Defaults to today.',
                routing: {
                    send: {
                        type: 'query',
                        property: 'to',
                        value: '={{ String($value).slice(0, 10) }}',
                    },
                },
            },
        ],
    },
];
