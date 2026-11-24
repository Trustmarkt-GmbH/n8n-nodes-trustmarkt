/**
 * Create Article Operation
 *
 * Creates a new article draft for the authenticated user's company.
 * A company can have at most 50 articles in draft, submitted or rejected
 * status at the same time.
 *
 * API Endpoint: POST /articles
 *
 * Body:
 * - title: The title (required, 3-90 characters)
 * - content: The content as Markdown (optional, max 50,000 characters)
 * - thumbnail_alt: The alt text of the thumbnail (optional, max 90 characters)
 * - author_id: The author, defaults to the authenticated user (optional)
 * - category_id: The category (optional)
 */

import type { INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import { handleTrustmarktApiError } from '../../../shared/transport';
import { getArticleBodyFields } from './fields';

/**
 * Condition to show fields only for create operation
 */
const showForCreate = {
    resource: ['article'],
    operation: ['create'],
};

/**
 * Operation definition for the dropdown
 */
export const createArticleOperation: INodePropertyOptions = {
    name: 'Create',
    value: 'create',
    action: 'Create an article',
    description: 'Create a new article draft',
    routing: {
        request: {
            method: 'POST',
            url: '/articles',
            ignoreHttpStatusErrors: true,
        },
        output: {
            postReceive: [handleTrustmarktApiError],
        },
    },
};

/**
 * Fields specific to the Create operation
 */
export const createArticleFields: INodeProperties[] = [
    // ─────────────────────────────────────────────────────────────
    // Required Fields
    // ─────────────────────────────────────────────────────────────
    {
        displayName: 'Title',
        name: 'title',
        type: 'string',
        required: true,
        default: '',
        placeholder: 'e.g. 5 ways to win more reviews',
        description: 'The title of the article (3–90 characters). The AI generation may replace it.',
        displayOptions: {
            show: showForCreate,
        },
        routing: {
            send: {
                type: 'body',
                property: 'title',
            },
        },
    },

    // ─────────────────────────────────────────────────────────────
    // Additional Fields (collapsible optional fields)
    // ─────────────────────────────────────────────────────────────
    {
        displayName: 'Additional Fields',
        name: 'additionalFields',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: {
            show: showForCreate,
        },
        options: getArticleBodyFields(),
    },
];
