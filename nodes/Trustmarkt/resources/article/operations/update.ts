/**
 * Update Article Operation
 *
 * Changes an article of the authenticated user's company. Only articles in
 * draft or rejected status can be changed. Only the fields added under
 * "Update Fields" are sent; all others stay as they are.
 *
 * API Endpoint: PUT /articles/{article}
 *
 * Parameters:
 * - article: The article ID (required)
 * - Body: title (10-90 characters), content, thumbnail_alt, author_id, category_id (all optional)
 */

import type { INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import { handleTrustmarktApiError } from '../../../shared/transport';
import { getArticleBodyFields } from './fields';

/**
 * Condition to show fields only for update operation
 */
const showForUpdate = {
    resource: ['article'],
    operation: ['update'],
};

/**
 * Operation definition for the dropdown
 */
export const updateArticleOperation: INodePropertyOptions = {
    name: 'Update',
    value: 'update',
    action: 'Update an article',
    description: 'Change the title, content or details of a draft or rejected article',
    routing: {
        request: {
            method: 'PUT',
            url: '=/articles/{{ $parameter.articleId }}',
            ignoreHttpStatusErrors: true,
        },
        output: {
            postReceive: [handleTrustmarktApiError],
        },
    },
};

/**
 * Fields specific to the Update operation
 */
export const updateArticleFields: INodeProperties[] = [
    // ─────────────────────────────────────────────────────────────
    // Required Fields
    // ─────────────────────────────────────────────────────────────
    {
        displayName: 'Article ID',
        name: 'articleId',
        type: 'string',
        required: true,
        default: '',
        description: 'The unique identifier of the article to update. Only drafts and rejected articles can be changed.',
        displayOptions: {
            show: showForUpdate,
        },
    },

    // ─────────────────────────────────────────────────────────────
    // Update Fields (only the added fields are sent)
    // ─────────────────────────────────────────────────────────────
    {
        displayName: 'Update Fields',
        name: 'updateFields',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: {
            show: showForUpdate,
        },
        options: [
            ...getArticleBodyFields(),
            {
                displayName: 'Title',
                name: 'title',
                type: 'string',
                default: '',
                placeholder: 'e.g. 5 ways to win more reviews',
                description: 'The title of the article (10–90 characters)',
                routing: {
                    send: {
                        type: 'body',
                        property: 'title',
                    },
                },
            },
        ],
    },
];
