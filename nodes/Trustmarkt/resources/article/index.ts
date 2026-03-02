/**
 * Article Resource
 *
 * This file exports all operations and fields for the Article resource.
 * It serves as the single entry point for the article functionality.
 *
 * STRUCTURE:
 * ─────────────────────────────────────────────────────────────────
 *   resources/article/
 *         ├── index.ts          ← This file (exports everything)
 *         └── operations/       ← Individual operation implementations
 *               ├── get.ts      ← Get single article operation
 *               └── list.ts     ← Get Many articles operation
 * ─────────────────────────────────────────────────────────────────
 *
 * ADDING A NEW OPERATION:
 * 1. Create a new file in operations/ (e.g., create.ts)
 * 2. Export the operation definition and fields
 * 3. Add to the options array and fields below
 */

import type { INodeProperties } from 'n8n-workflow';
import { getArticleOperation, getArticleFields } from './operations/get';
import { listArticleOperation, listArticleFields } from './operations/list';

/**
 * Condition to show fields only when Article resource is selected
 */
const showForArticle = {
    resource: ['article'],
};

/**
 * Article Operations
 * Defines available operations for the Article resource
 */
export const articleOperations: INodeProperties[] = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: showForArticle,
        },
        options: [
            getArticleOperation,
            listArticleOperation,
            // Future operations - add here when implemented:
            // createArticleOperation,
            // updateArticleOperation,
        ],
        default: 'getMany',
    },
];

/**
 * Article Fields
 * Combines all operation-specific fields for the Article resource
 */
export const articleFields: INodeProperties[] = [
    // Get operation fields
    ...getArticleFields,

    // Get Many operation fields
    ...listArticleFields,

    // Future operation fields - add here when implemented:
    // ...createArticleFields,
    // ...updateArticleFields,
];
