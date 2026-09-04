/**
 * Resource (Lead Magnet) Resource
 *
 * This file exports all operations and fields for the Resource resource.
 * A "resource" in the Trustmarkt API is a lead magnet (e.g. a video, a
 * downloadable file or a link collection) that visitors unlock by filling
 * out a lead form.
 *
 * STRUCTURE:
 * ─────────────────────────────────────────────────────────────────
 *   resources/resource/
 *         ├── index.ts          ← This file (exports everything)
 *         └── operations/       ← Individual operation implementations
 *               ├── get.ts      ← Get single resource operation
 *               └── list.ts     ← Get Many resources operation
 * ─────────────────────────────────────────────────────────────────
 *
 * ADDING A NEW OPERATION:
 * 1. Create a new file in operations/ (e.g., update.ts)
 * 2. Export the operation definition and fields
 * 3. Add to the options array and fields below
 */

import type { INodeProperties } from 'n8n-workflow';
import { getResourceOperation, getResourceFields } from './operations/get';
import { listResourceOperation, listResourceFields } from './operations/list';

/**
 * Condition to show fields only when Resource resource is selected
 */
const showForResource = {
    resource: ['resource'],
};

/**
 * Resource Operations
 * Defines available operations for the Resource resource
 */
export const resourceOperations: INodeProperties[] = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: showForResource,
        },
        options: [
            getResourceOperation,
            listResourceOperation,
        ],
        default: 'getMany',
    },
];

/**
 * Resource Fields
 * Combines all operation-specific fields for the Resource resource
 */
export const resourceFields: INodeProperties[] = [
    // Get operation fields
    ...getResourceFields,

    // Get Many operation fields
    ...listResourceFields,
];
