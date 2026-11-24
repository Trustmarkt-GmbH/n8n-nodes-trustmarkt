/**
 * Start AI Generation Operation (Case Study)
 *
 * Starts the Trustmarkt AI writing a case study draft from a YouTube video
 * or a text. The generation runs in the background (usually 2-3 minutes)
 * and replaces the texts, the metrics and the customer name.
 * Check the progress with "Get": `ai_generation.status`.
 *
 * API Endpoint: POST /case-studies/{case_study}/ai-generation
 *
 * Parameters:
 * - case_study: The case study ID (required)
 * - Body: source, youtube_url, text (see shared/aiGeneration.ts)
 */

import type { INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import { getAiGenerationFields } from '../../../shared/aiGeneration';
import { handleTrustmarktApiError } from '../../../shared/transport';

/**
 * Condition to show fields only for start AI generation operation
 */
const showForStart = {
    resource: ['caseStudy'],
    operation: ['startAiGeneration'],
};

/**
 * Operation definition for the dropdown
 */
export const startAiGenerationCaseStudyOperation: INodePropertyOptions = {
    name: 'Start AI Generation',
    value: 'startAiGeneration',
    action: 'Start AI generation for a case study',
    description: 'Let the Trustmarkt AI write a case study draft from a YouTube video or a text',
    routing: {
        request: {
            method: 'POST',
            url: '=/case-studies/{{ $parameter.caseStudyId }}/ai-generation',
            ignoreHttpStatusErrors: true,
        },
        output: {
            postReceive: [handleTrustmarktApiError],
        },
    },
};

/**
 * Fields specific to the Start AI Generation operation
 */
export const startAiGenerationCaseStudyFields: INodeProperties[] = [
    // ─────────────────────────────────────────────────────────────
    // Required Fields
    // ─────────────────────────────────────────────────────────────
    {
        displayName: 'Case Study ID',
        name: 'caseStudyId',
        type: 'string',
        required: true,
        default: '',
        description: 'The unique identifier of the case study draft the AI should write',
        displayOptions: {
            show: showForStart,
        },
    },
    ...getAiGenerationFields('caseStudy', 'case study', 'the texts, the metrics and the customer name'),
];
