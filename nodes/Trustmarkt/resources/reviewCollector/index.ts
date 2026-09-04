/**
 * Review Collector Resource
 *
 * This file exports all operations and fields for the Review Collector
 * resource. A review collector is a team member who collected reviews
 * through their personal review link.
 *
 * STRUCTURE:
 * ─────────────────────────────────────────────────────────────────
 *   resources/reviewCollector/
 *         ├── index.ts          ← This file (exports everything)
 *         └── operations/       ← Individual operation implementations
 *               └── list.ts     ← Get Many review collectors operation
 * ─────────────────────────────────────────────────────────────────
 *
 * ADDING A NEW OPERATION:
 * 1. Create a new file in operations/ (e.g., get.ts)
 * 2. Export the operation definition and fields
 * 3. Add to the options array and fields below
 */

import type { INodeProperties } from 'n8n-workflow';
import {
    listReviewCollectorOperation,
    listReviewCollectorFields,
} from './operations/list';

/**
 * Condition to show fields only when Review Collector resource is selected
 */
const showForReviewCollector = {
    resource: ['reviewCollector'],
};

/**
 * Review Collector Operations
 * Defines available operations for the Review Collector resource
 */
export const reviewCollectorOperations: INodeProperties[] = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: showForReviewCollector,
        },
        options: [
            listReviewCollectorOperation,
        ],
        default: 'getMany',
    },
];

/**
 * Review Collector Fields
 * Combines all operation-specific fields for the Review Collector resource
 */
export const reviewCollectorFields: INodeProperties[] = [
    // Get Many operation fields
    ...listReviewCollectorFields,
];
