/**
 * Shared Field Descriptions
 *
 * This file contains reusable field definitions that can be used
 * across multiple resources and operations.
 *
 * USAGE:
 * Import the field you need and spread it into your properties array.
 * Add displayOptions to control when the field is shown.
 *
 * Example:
 *   import { reviewIdField } from '../../shared/descriptions';
 *   export const myFields: INodeProperties[] = [
 *       {
 *           ...reviewIdField,
 *           displayOptions: { show: { resource: ['review'], operation: ['get'] } },
 *       },
 *   ];
 */

import type { INodeProperties } from 'n8n-workflow';

// ═══════════════════════════════════════════════════════════════════
// IDENTIFIER FIELDS
// ═══════════════════════════════════════════════════════════════════

/**
 * Review ID field
 * Used when targeting a specific review
 */
export const reviewIdField: INodeProperties = {
    displayName: 'Review ID',
    name: 'reviewId',
    type: 'string',
    default: '',
    required: true,
    description: 'The unique identifier of the review',
    placeholder: 'e.g., V5QrXa40B0oRLMDkxZYj',
};

/**
 * User ID field
 * Used when targeting a specific user
 */
export const userIdField: INodeProperties = {
    displayName: 'User ID',
    name: 'userId',
    type: 'string',
    default: '',
    required: true,
    description: 'The unique identifier of the user',
    placeholder: 'e.g., 5GdkVeN8ZLaw29zBDXyb',
};

/**
 * Company ID field
 * Used when targeting a specific company
 */
export const companyIdField: INodeProperties = {
    displayName: 'Company ID',
    name: 'companyId',
    type: 'string',
    default: '',
    required: true,
    description: 'The unique identifier of the company',
    placeholder: 'e.g., XZzyJn9jEB1lWdvVRx6w',
};

// ═══════════════════════════════════════════════════════════════════
// PAGINATION FIELDS
// ═══════════════════════════════════════════════════════════════════

/**
 * Standard pagination fields for list operations
 */
export const paginationFields: INodeProperties[] = [
    {
        displayName: 'Page',
        name: 'page',
        type: 'number',
        typeOptions: {
            minValue: 1,
        },
        default: 1,
        description: 'Page number for pagination',
        routing: {
            send: {
                type: 'query',
                property: 'page',
            },
        },
    },
    {
        displayName: 'Per Page',
        name: 'perPage',
        type: 'number',
        typeOptions: {
            minValue: 1,
            maxValue: 50,
        },
        default: 15,
        description: 'Number of results per page (1-50)',
        routing: {
            send: {
                type: 'query',
                property: 'per_page',
            },
        },
    },
];

// ═══════════════════════════════════════════════════════════════════
// COMMON OPTIONS
// ═══════════════════════════════════════════════════════════════════

/**
 * Return All toggle
 * Standard pattern for list operations
 */
export const returnAllField: INodeProperties = {
    displayName: 'Return All',
    name: 'returnAll',
    type: 'boolean',
    default: false,
    description: 'Whether to return all results or only up to a given limit',
};

/**
 * Limit field
 * Standard pattern for list operations when Return All is false
 */
export const limitField: INodeProperties = {
    displayName: 'Limit',
    name: 'limit',
    type: 'number',
    typeOptions: {
        minValue: 1,
    },
    default: 50,
    description: 'Max number of results to return',
};
