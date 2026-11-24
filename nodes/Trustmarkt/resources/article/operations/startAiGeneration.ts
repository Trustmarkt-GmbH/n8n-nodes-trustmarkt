/**
 * Start AI Generation Operation (Article)
 *
 * Starts the Trustmarkt AI writing an article draft from a YouTube video
 * or a text. The generation runs in the background (usually 2-3 minutes)
 * and replaces the title and the content.
 * Check the progress with "Get": `ai_generation.status`.
 *
 * API Endpoint: POST /articles/{article}/ai-generation
 *
 * Parameters:
 * - article: The article ID (required)
 * - Body: source, youtube_url, text (see shared/aiGeneration.ts)
 */

import type { INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import { getAiGenerationFields } from '../../../shared/aiGeneration';
import { handleTrustmarktApiError } from '../../../shared/transport';

/**
 * Condition to show fields only for start AI generation operation
 */
const showForStart = {
    resource: ['article'],
    operation: ['startAiGeneration'],
};

/**
 * Operation definition for the dropdown
 */
export const startAiGenerationArticleOperation: INodePropertyOptions = {
    name: 'Start AI Generation',
    value: 'startAiGeneration',
    action: 'Start AI generation for an article',
    description: 'Let the Trustmarkt AI write an article draft from a YouTube video or a text',
    routing: {
        request: {
            method: 'POST',
            url: '=/articles/{{ $parameter.articleId }}/ai-generation',
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
export const startAiGenerationArticleFields: INodeProperties[] = [
    // ─────────────────────────────────────────────────────────────
    // Required Fields
    // ─────────────────────────────────────────────────────────────
    {
        displayName: 'Article ID',
        name: 'articleId',
        type: 'string',
        required: true,
        default: '',
        description: 'The unique identifier of the article draft the AI should write',
        displayOptions: {
            show: showForStart,
        },
    },
    ...getAiGenerationFields('article', 'article', 'the title and the content'),
];
