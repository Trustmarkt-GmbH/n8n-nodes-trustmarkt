/**
 * Me Resource
 *
 * This file exports all operations and fields for the Me resource.
 * It serves as the single entry point for the authenticated user functionality.
 *
 * STRUCTURE:
 * ─────────────────────────────────────────────────────────────────
 *   resources/me/
 *         ├── index.ts          ← This file (exports everything)
 *         └── operations/       ← Individual operation implementations
 *               └── get.ts      ← Get authenticated user operation
 * ─────────────────────────────────────────────────────────────────
 *
 * ADDING A NEW OPERATION:
 * 1. Create a new file in operations/ (e.g., update.ts)
 * 2. Export the operation definition and fields
 * 3. Add to the options array and fields below
 */

import type { INodeProperties } from 'n8n-workflow';
import { getMeOperation, getMeFields } from './operations/get';

/**
 * Condition to show fields only when Me resource is selected
 */
const showForMe = {
    resource: ['me'],
};

/**
 * Me Operations
 * Defines available operations for the Me resource
 */
export const meOperations: INodeProperties[] = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: showForMe,
        },
        options: [
            getMeOperation,
            // Future operations - add here when implemented:
            // updateMeOperation,
        ],
        default: 'get',
    },
];

/**
 * Me Fields
 * Combines all operation-specific fields for the Me resource
 */
export const meFields: INodeProperties[] = [
    // Get operation fields
    ...getMeFields,

    // Future operation fields - add here when implemented:
    // ...updateMeFields,
];
