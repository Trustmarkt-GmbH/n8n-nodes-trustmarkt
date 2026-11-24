/**
 * Case Study Resource
 *
 * This file exports all operations and fields for the Case Study resource.
 * It serves as the single entry point for the case study functionality.
 *
 * STRUCTURE:
 * ─────────────────────────────────────────────────────────────────
 *   resources/caseStudy/
 *         ├── index.ts                   ← This file (exports everything)
 *         └── operations/                ← Individual operation implementations
 *               ├── create.ts            ← Create case study draft operation
 *               ├── get.ts               ← Get single case study operation
 *               ├── list.ts              ← Get Many case studies operation
 *               ├── startAiGeneration.ts ← Start AI Generation operation
 *               └── update.ts            ← Update case study operation
 * ─────────────────────────────────────────────────────────────────
 *
 * ADDING A NEW OPERATION:
 * 1. Create a new file in operations/ (e.g., delete.ts)
 * 2. Export the operation definition and fields
 * 3. Add to the options array and fields below
 */

import type { INodeProperties } from 'n8n-workflow';
import { createCaseStudyOperation, createCaseStudyFields } from './operations/create';
import { getCaseStudyOperation, getCaseStudyFields } from './operations/get';
import { listCaseStudyOperation, listCaseStudyFields } from './operations/list';
import {
    startAiGenerationCaseStudyOperation,
    startAiGenerationCaseStudyFields,
} from './operations/startAiGeneration';
import { updateCaseStudyOperation, updateCaseStudyFields } from './operations/update';

/**
 * Condition to show fields only when Case Study resource is selected
 */
const showForCaseStudy = {
    resource: ['caseStudy'],
};

/**
 * Case Study Operations
 * Defines available operations for the Case Study resource
 */
export const caseStudyOperations: INodeProperties[] = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: showForCaseStudy,
        },
        // Operations are sorted alphabetically as per n8n guidelines
        options: [
            createCaseStudyOperation,
            getCaseStudyOperation,
            listCaseStudyOperation,
            startAiGenerationCaseStudyOperation,
            updateCaseStudyOperation,
        ],
        default: 'getMany',
    },
];

/**
 * Case Study Fields
 * Combines all operation-specific fields for the Case Study resource
 */
export const caseStudyFields: INodeProperties[] = [
    // Create operation fields
    ...createCaseStudyFields,

    // Get operation fields
    ...getCaseStudyFields,

    // Get Many operation fields
    ...listCaseStudyFields,

    // Start AI Generation operation fields
    ...startAiGenerationCaseStudyFields,

    // Update operation fields
    ...updateCaseStudyFields,
];
