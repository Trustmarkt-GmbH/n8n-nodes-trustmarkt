/**
 * AI Generation Fields
 *
 * The fields of the "Start AI Generation" operation, shared by the
 * Article and Case Study resources.
 *
 * API Endpoints:
 * - POST /articles/{article}/ai-generation
 * - POST /case-studies/{case_study}/ai-generation
 *
 * Body:
 * - source: 'youtube' or 'text' (required)
 * - youtube_url: Link to the YouTube video (required when source is youtube)
 * - text: Text to write from, at least 100 words, max 50,000 characters (required when source is text)
 */

import type { INodeProperties } from 'n8n-workflow';
import { validateAiGenerationText } from './transport';

/**
 * Builds the source fields of the "Start AI Generation" operation
 *
 * @param resource - The resource value the fields belong to (e.g. 'article')
 * @param itemName - The item in plain words (e.g. 'article', 'case study')
 * @param replacedContent - What the AI replaces (e.g. 'the title and the content')
 */
export function getAiGenerationFields(
    resource: string,
    itemName: string,
    replacedContent: string,
): INodeProperties[] {
    const showForStart = {
        resource: [resource],
        operation: ['startAiGeneration'],
    };

    return [
        {
            displayName: `The AI writes in the background, usually in 2–3 minutes, and replaces ${replacedContent} of the ${itemName}. Add a Wait node (about 3 minutes), then use 'Get' and check 'ai_generation.status': 'completed' when done, 'failed' (with 'ai_generation.error') when it should be started again.`,
            name: 'aiGenerationNotice',
            type: 'notice',
            default: '',
            displayOptions: {
                show: showForStart,
            },
        },
        {
            displayName: 'Source',
            name: 'source',
            type: 'options',
            required: true,
            default: 'youtube',
            description: `What the Trustmarkt AI writes the ${itemName} from`,
            displayOptions: {
                show: showForStart,
            },
            options: [
                {
                    name: 'Text',
                    value: 'text',
                    description: 'A text such as an interview, notes or a transcript',
                },
                {
                    name: 'YouTube Video',
                    value: 'youtube',
                    description: 'A video on YouTube',
                },
            ],
            routing: {
                send: {
                    type: 'body',
                    property: 'source',
                },
            },
        },
        {
            displayName: 'YouTube URL',
            name: 'youtubeUrl',
            type: 'string',
            required: true,
            default: '',
            placeholder: 'e.g. https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            description: 'The link to the YouTube video (max 2,048 characters)',
            displayOptions: {
                show: {
                    ...showForStart,
                    source: ['youtube'],
                },
            },
            routing: {
                send: {
                    type: 'body',
                    property: 'youtube_url',
                },
            },
        },
        {
            displayName: 'Text',
            name: 'text',
            type: 'string',
            required: true,
            default: '',
            typeOptions: {
                rows: 8,
            },
            placeholder: 'e.g. Interview with Anna from Bäckerei Schmidt: before the project they had 10 orders a week ...',
            description: `The text the AI writes the ${itemName} from, e.g. an interview, notes or a transcript`,
            hint: 'At least 100 words and at most 50,000 characters, so the AI does not have to invent content',
            displayOptions: {
                show: {
                    ...showForStart,
                    source: ['text'],
                },
            },
            routing: {
                send: {
                    type: 'body',
                    property: 'text',
                    preSend: [validateAiGenerationText],
                },
            },
        },
    ];
}
