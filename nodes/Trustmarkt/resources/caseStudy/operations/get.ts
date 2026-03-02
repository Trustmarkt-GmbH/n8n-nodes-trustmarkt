/**
 * Get Case Study Operation
 *
 * Retrieves a single case study by its ID. The case study must belong to
 * the authenticated user's company.
 *
 * API Endpoint: GET /case-studies/{case_study}
 *
 * Parameters:
 * - case_study: The case study ID (required)
 * - expand: Expand related resources (review, customerIndustry, content)
 */

import type { INodeProperties, INodePropertyOptions } from 'n8n-workflow';

/**
 * Condition to show fields only for get operation
 */
const showForGet = {
    resource: ['caseStudy'],
    operation: ['get'],
};

/**
 * Operation definition for the dropdown
 */
export const getCaseStudyOperation: INodePropertyOptions = {
    name: 'Get',
    value: 'get',
    action: 'Get a case study',
    description: 'Retrieve a single case study by ID',
    routing: {
        request: {
            method: 'GET',
            url: '=/case-studies/{{ $parameter.caseStudyId }}',
        },
    },
};

/**
 * Fields specific to the Get operation
 */
export const getCaseStudyFields: INodeProperties[] = [
    // ─────────────────────────────────────────────────────────────
    // Required Fields
    // ─────────────────────────────────────────────────────────────
    {
        displayName: 'Case Study ID',
        name: 'caseStudyId',
        type: 'string',
        required: true,
        default: '',
        description: 'The unique identifier of the case study to retrieve',
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
                        name: 'Content',
                        value: 'content',
                        description: 'Include the HTML content of problems, goals, and results sections',
                    },
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
        ],
    },
];
