/**
 * User Resource
 *
 * This file exports all operations and fields for the User resource.
 * It serves as the single entry point for the user functionality.
 *
 * STRUCTURE:
 * ─────────────────────────────────────────────────────────────────
 *   resources/user/
 *         ├── index.ts          ← This file (exports everything)
 *         └── operations/       ← Individual operation implementations
 *               ├── get.ts      ← Get single user operation
 *               └── list.ts     ← Get Many users operation
 * ─────────────────────────────────────────────────────────────────
 *
 * ADDING A NEW OPERATION:
 * 1. Create a new file in operations/ (e.g., update.ts)
 * 2. Export the operation definition and fields
 * 3. Add to the options array and fields below
 */

import type { INodeProperties } from 'n8n-workflow';
import { getUserOperation, getUserFields } from './operations/get';
import { listUserOperation, listUserFields } from './operations/list';

/**
 * Condition to show fields only when User resource is selected
 */
const showForUser = {
	resource: ['user'],
};

/**
 * User Operations
 * Defines available operations for the User resource
 */
export const userOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showForUser,
		},
		options: [
			getUserOperation,
			listUserOperation,
			// Future operations - add here when implemented:
			// updateUserOperation,
		],
		default: 'getMany',
	},
];

/**
 * User Fields
 * Combines all operation-specific fields for the User resource
 */
export const userFields: INodeProperties[] = [
	// Get operation fields
	...getUserFields,

	// Get Many operation fields
	...listUserFields,

	// Future operation fields - add here when implemented:
	// ...updateUserFields,
];
