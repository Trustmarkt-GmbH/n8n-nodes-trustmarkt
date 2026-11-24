/**
 * Create Case Study Operation
 *
 * Creates a new case study draft for the authenticated user's company.
 * The company's plan must include case studies, and a company can have at
 * most 50 drafts at the same time.
 *
 * API Endpoint: POST /case-studies
 *
 * Body:
 * - title: The internal title (required, 3-100 characters)
 * - customer_name: The name of the customer (optional, 3-100 characters)
 */

import type { INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import { handleTrustmarktApiError } from '../../../shared/transport';

/**
 * Condition to show fields only for create operation
 */
const showForCreate = {
    resource: ['caseStudy'],
    operation: ['create'],
};

/**
 * Operation definition for the dropdown
 */
export const createCaseStudyOperation: INodePropertyOptions = {
    name: 'Create',
    value: 'create',
    action: 'Create a case study',
    description: 'Create a new case study draft',
    routing: {
        request: {
            method: 'POST',
            url: '/case-studies',
            ignoreHttpStatusErrors: true,
        },
        output: {
            postReceive: [handleTrustmarktApiError],
        },
    },
};

/**
 * Fields specific to the Create operation
 */
export const createCaseStudyFields: INodeProperties[] = [
    // ─────────────────────────────────────────────────────────────
    // Required Fields
    // ─────────────────────────────────────────────────────────────
    {
        displayName: 'Title',
        name: 'title',
        type: 'string',
        required: true,
        default: '',
        placeholder: 'e.g. Rebranding for Bäckerei Schmidt',
        description:
            'The internal title of the case study (3–100 characters). The AI generation may replace it.',
        displayOptions: {
            show: showForCreate,
        },
        routing: {
            send: {
                type: 'body',
                property: 'title',
            },
        },
    },

    // ─────────────────────────────────────────────────────────────
    // Additional Fields (collapsible optional fields)
    // ─────────────────────────────────────────────────────────────
    {
        displayName: 'Additional Fields',
        name: 'additionalFields',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: {
            show: showForCreate,
        },
        options: [
            {
                displayName: 'Customer Name',
                name: 'customerName',
                type: 'string',
                default: '',
                placeholder: 'e.g. Bäckerei Schmidt',
                description:
                    'The name of the customer the case study is about (3–100 characters). The AI generation fills it in when empty.',
                routing: {
                    send: {
                        type: 'body',
                        property: 'customer_name',
                    },
                },
            },
        ],
    },
];
