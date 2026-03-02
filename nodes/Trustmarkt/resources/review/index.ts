/**
 * Review Resource
 *
 * This file exports all operations and fields for the Review resource.
 * It serves as the single entry point for the review functionality.
 *
 * STRUCTURE:
 * ─────────────────────────────────────────────────────────────────
 *   resources/review/
 *         ├── index.ts          ← This file (exports everything)
 *         ├── review.operations.ts  ← Operation definitions
 *         └── operations/       ← Individual operation implementations
 *               ├── get.ts      ← Get single review operation
 *               └── list.ts     ← List reviews operation
 * ─────────────────────────────────────────────────────────────────
 *
 * ADDING A NEW OPERATION:
 * 1. Create a new file in operations/ (e.g., reply.ts)
 * 2. Export the operation definition and fields
 * 3. Import and add to review.operations.ts
 * 4. Add fields to the reviewFields array below
 */

import type { INodeProperties } from 'n8n-workflow';
import { getReviewOperation, getReviewFields } from './operations/get';
import { listReviewOperation, listReviewFields } from './operations/list';

/**
 * Condition to show fields only when Review resource is selected
 */
const showForReview = {
	resource: ['review'],
};

/**
 * Review Operations
 * Defines available operations for the Review resource
 */
export const reviewOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showForReview,
		},
		options: [
			getReviewOperation,
			listReviewOperation,
			// Future operations - add here when implemented:
			// replyToReviewOperation,
		],
		default: 'getMany',
	},
];

/**
 * Review Fields
 * Combines all operation-specific fields for the Review resource
 */
export const reviewFields: INodeProperties[] = [
	// Get operation fields
	...getReviewFields,

	// List operation fields
	...listReviewFields,

	// Future operation fields - add here when implemented:
	// ...replyToReviewFields,
];
