/**
 * Inquiry Resource
 *
 * This file exports all operations and fields for the Inquiry resource.
 * It serves as the single entry point for the inquiry functionality.
 *
 * STRUCTURE:
 * ─────────────────────────────────────────────────────────────────
 *   resources/inquiry/
 *         ├── index.ts          ← This file (exports everything)
 *         └── operations/       ← Individual operation implementations
 *               ├── get.ts      ← Get single inquiry operation
 *               └── list.ts     ← Get Many inquiries operation
 * ─────────────────────────────────────────────────────────────────
 *
 * ADDING A NEW OPERATION:
 * 1. Create a new file in operations/ (e.g., update.ts)
 * 2. Export the operation definition and fields
 * 3. Add to the options array and fields below
 */

import type { INodeProperties } from 'n8n-workflow';
import { getInquiryOperation, getInquiryFields } from './operations/get';
import { listInquiryOperation, listInquiryFields } from './operations/list';

/**
 * Condition to show fields only when Inquiry resource is selected
 */
const showForInquiry = {
    resource: ['inquiry'],
};

/**
 * Inquiry Operations
 * Defines available operations for the Inquiry resource
 */
export const inquiryOperations: INodeProperties[] = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: showForInquiry,
        },
        options: [
            getInquiryOperation,
            listInquiryOperation,
            // Future operations - add here when implemented:
            // updateInquiryOperation,
        ],
        default: 'getMany',
    },
];

/**
 * Inquiry Fields
 * Combines all operation-specific fields for the Inquiry resource
 */
export const inquiryFields: INodeProperties[] = [
    // Get operation fields
    ...getInquiryFields,

    // Get Many operation fields
    ...listInquiryFields,

    // Future operation fields - add here when implemented:
    // ...updateInquiryFields,
];
