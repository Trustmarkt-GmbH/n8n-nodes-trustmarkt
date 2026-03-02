/**
 * List Users Operation
 *
 * Retrieves a paginated list of users belonging to the authenticated
 * user's company. Users are ordered by creation date (newest first).
 *
 * API Endpoint: GET /user
 *
 * Parameters:
 * - page: Page number (optional, default: 1)
 * - per_page: Results per page (optional, 1-50, default: 15)
 */

import type { INodeProperties, INodePropertyOptions } from 'n8n-workflow';

/**
 * Condition to show fields only for list operation
 */
const showForList = {
	resource: ['user'],
	operation: ['getMany'],
};

/**
 * Operation definition for the dropdown
 */
export const listUserOperation: INodePropertyOptions = {
	name: 'Get Many',
	value: 'getMany',
	action: 'Get many users',
	description: 'Retrieve a list of users from your company',
	routing: {
		request: {
			method: 'GET',
			url: '/user',
		},
		output: {
			postReceive: [
				{
					type: 'rootProperty',
					properties: {
						property: 'data',
					},
				},
			],
		},
	},
};

/**
 * Fields specific to the Get Many operation
 */
export const listUserFields: INodeProperties[] = [
	// ─────────────────────────────────────────────────────────────
	// Options (collapsible additional settings)
	// ─────────────────────────────────────────────────────────────
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: showForList,
		},
		// Options are sorted alphabetically as per n8n guidelines
		options: [
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				typeOptions: {
					minValue: 1,
					maxValue: 50,
				},
				default: 50,
				description: 'Max number of results to return',
				routing: {
					send: {
						type: 'query',
						property: 'per_page',
					},
				},
			},
			{
				displayName: 'Page',
				name: 'page',
				type: 'number',
				typeOptions: {
					minValue: 1,
				},
				default: 1,
				description: 'Page number for pagination (starts at 1)',
				routing: {
					send: {
						type: 'query',
						property: 'page',
					},
				},
			},
		],
	},
];
