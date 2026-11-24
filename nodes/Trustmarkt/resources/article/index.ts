/**
 * Article Resource
 *
 * This file exports all operations and fields for the Article resource.
 * It serves as the single entry point for the article functionality.
 *
 * STRUCTURE:
 * ─────────────────────────────────────────────────────────────────
 *   resources/article/
 *         ├── index.ts                   ← This file (exports everything)
 *         └── operations/                ← Individual operation implementations
 *               ├── create.ts            ← Create article draft operation
 *               ├── get.ts               ← Get single article operation
 *               ├── list.ts              ← Get Many articles operation
 *               ├── startAiGeneration.ts ← Start AI Generation operation
 *               └── update.ts            ← Update article operation
 * ─────────────────────────────────────────────────────────────────
 *
 * ADDING A NEW OPERATION:
 * 1. Create a new file in operations/ (e.g., delete.ts)
 * 2. Export the operation definition and fields
 * 3. Add to the options array and fields below
 */

import type { INodeProperties } from 'n8n-workflow';
import { createArticleOperation, createArticleFields } from './operations/create';
import { getArticleOperation, getArticleFields } from './operations/get';
import { listArticleOperation, listArticleFields } from './operations/list';
import {
    startAiGenerationArticleOperation,
    startAiGenerationArticleFields,
} from './operations/startAiGeneration';
import { updateArticleOperation, updateArticleFields } from './operations/update';

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
        // Operations are sorted alphabetically as per n8n guidelines
        options: [
            createArticleOperation,
            getArticleOperation,
            listArticleOperation,
            startAiGenerationArticleOperation,
            updateArticleOperation,
        ],
        default: 'getMany',
    },
];

/**
 * Article Fields
 * Combines all operation-specific fields for the Article resource
 */
export const articleFields: INodeProperties[] = [
    // Create operation fields
    ...createArticleFields,

    // Get operation fields
    ...getArticleFields,

    // Get Many operation fields
    ...listArticleFields,

    // Start AI Generation operation fields
    ...startAiGenerationArticleFields,

    // Update operation fields
    ...updateArticleFields,
];
