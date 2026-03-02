/**
 * Get Inquiry Operation
 *
 * Retrieves a single inquiry by its ID. The inquiry must belong to
 * the authenticated user's company.
 *
 * API Endpoint: GET /inquiries/{inquiry}
 *
 * Parameters:
 * - inquiry: The inquiry ID (required)
 */

import type { INodeProperties, INodePropertyOptions } from 'n8n-workflow';

/**
 * Condition to show fields only for get operation
 */
const showForGet = {
    resource: ['inquiry'],
    operation: ['get'],
};

/**
 * Operation definition for the dropdown
 */
export const getInquiryOperation: INodePropertyOptions = {
    name: 'Get',
    value: 'get',
    action: 'Get an inquiry',
    description: 'Retrieve a single inquiry by ID',
    routing: {
        request: {
            method: 'GET',
            url: '=/inquiries/{{ $parameter.inquiryId }}',
        },
    },
};

/**
 * Fields specific to the Get operation
 */
export const getInquiryFields: INodeProperties[] = [
    // ─────────────────────────────────────────────────────────────
    // Required Fields
    // ─────────────────────────────────────────────────────────────
    {
        displayName: 'Inquiry ID',
        name: 'inquiryId',
        type: 'string',
        required: true,
        default: '',
        description: 'The unique identifier of the inquiry to retrieve',
        displayOptions: {
            show: showForGet,
        },
    },
];
