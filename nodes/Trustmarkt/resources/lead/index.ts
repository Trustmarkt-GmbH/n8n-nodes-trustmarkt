/**
 * Lead Resource
 *
 * This file exports all operations and fields for the Lead resource.
 * A lead is a person who signed up for one of the company's resources
 * (lead magnets).
 *
 * STRUCTURE:
 * ─────────────────────────────────────────────────────────────────
 *   resources/lead/
 *         ├── index.ts          ← This file (exports everything)
 *         └── operations/       ← Individual operation implementations
 *               ├── get.ts      ← Get single lead operation
 *               └── list.ts     ← Get Many leads operation
 * ─────────────────────────────────────────────────────────────────
 *
 * ADDING A NEW OPERATION:
 * 1. Create a new file in operations/ (e.g., update.ts)
 * 2. Export the operation definition and fields
 * 3. Add to the options array and fields below
 */

import type { INodeProperties } from 'n8n-workflow';
import { getLeadOperation, getLeadFields } from './operations/get';
import { listLeadOperation, listLeadFields } from './operations/list';

/**
 * Condition to show fields only when Lead resource is selected
 */
const showForLead = {
    resource: ['lead'],
};

/**
 * Lead Operations
 * Defines available operations for the Lead resource
 */
export const leadOperations: INodeProperties[] = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: showForLead,
        },
        options: [
            getLeadOperation,
            listLeadOperation,
        ],
        default: 'getMany',
    },
];

/**
 * Lead Fields
 * Combines all operation-specific fields for the Lead resource
 */
export const leadFields: INodeProperties[] = [
    // Get operation fields
    ...getLeadFields,

    // Get Many operation fields
    ...listLeadFields,
];
