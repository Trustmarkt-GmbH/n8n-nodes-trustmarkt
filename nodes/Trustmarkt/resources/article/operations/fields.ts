/**
 * Article Body Fields
 *
 * The optional fields shared by the Create and Update operations of the
 * Article resource, sorted alphabetically as per n8n guidelines.
 * (The title is defined in each operation, as its rules differ.)
 */

import type { INodeProperties } from 'n8n-workflow';
import { getListResourceLocator } from '../../../shared/listSearch';

/**
 * Builds the optional article fields (Author ID, Category, Content, Thumbnail Alt Text)
 */
export function getArticleBodyFields(): INodeProperties[] {
    return [
        {
            displayName: 'Author ID',
            name: 'authorId',
            type: 'string',
            default: '',
            placeholder: 'e.g. 5GdkVeN8ZLaw29zBDXyb',
            description:
                "The ID of the user who wrote the article, see 'User → Get Many'. Defaults to the user of the API key.",
            routing: {
                send: {
                    type: 'body',
                    property: 'author_id',
                },
            },
        },
        getListResourceLocator({
            displayName: 'Category',
            name: 'categoryId',
            description:
                'The category of the article. Choose one from the list or enter its ID; leave empty for no category.',
            searchListMethod: 'searchArticleCategories',
            placeholder: 'e.g. gYW1KaOqEpMdeMQrlwpV',
            bodyProperty: 'category_id',
        }),
        {
            displayName: 'Content',
            name: 'content',
            type: 'string',
            default: '',
            typeOptions: {
                rows: 8,
            },
            description:
                'The content as Markdown (headings H2–H4, bold, italic, links, lists, dividers), max 50,000 characters. HTML tags are removed; images can only be added in the Trustmarkt web app.',
            routing: {
                send: {
                    type: 'body',
                    property: 'content',
                },
            },
        },
        {
            displayName: 'Thumbnail Alt Text',
            name: 'thumbnailAlt',
            type: 'string',
            default: '',
            placeholder: 'e.g. A team planning a review campaign',
            description: 'The alternative text of the article thumbnail (max 90 characters)',
            routing: {
                send: {
                    type: 'body',
                    property: 'thumbnail_alt',
                },
            },
        },
    ];
}
