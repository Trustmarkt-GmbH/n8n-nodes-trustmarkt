/**
 * List Search Methods
 *
 * Load the choices of the "From List" mode of resource locators.
 * Both lists are short and not paginated, so they are loaded at once
 * and filtered by name here.
 *
 * API Endpoints:
 * - GET /industries         → [{ id, name, slug }]
 * - GET /article-categories → [{ id, name, slug }]
 */

import {
    NodeApiError,
    type IDataObject,
    type ILoadOptionsFunctions,
    type INodeListSearchResult,
    type INodeProperties,
    type JsonObject,
} from 'n8n-workflow';
import { API_BASE_URL } from './transport';

/**
 * Loads a list of `{ id, name }` items and keeps those whose name contains the filter
 */
async function searchNamedItems(
    context: ILoadOptionsFunctions,
    path: string,
    filter?: string,
): Promise<INodeListSearchResult> {
    let items: IDataObject[];

    try {
        items = (await context.helpers.httpRequestWithAuthentication.call(context, 'trustmarktApi', {
            method: 'GET',
            url: `${API_BASE_URL}${path}`,
            headers: { Accept: 'application/json' },
            json: true,
        })) as IDataObject[];
    } catch (error) {
        throw new NodeApiError(context.getNode(), error as JsonObject);
    }

    const search = (filter ?? '').trim().toLowerCase();

    return {
        results: (Array.isArray(items) ? items : [])
            .filter((item) => !search || String(item.name ?? '').toLowerCase().includes(search))
            .map((item) => ({
                name: String(item.name ?? item.id),
                value: String(item.id),
            })),
    };
}

/**
 * Industries a case study customer can belong to
 */
export async function searchIndustries(
    this: ILoadOptionsFunctions,
    filter?: string,
): Promise<INodeListSearchResult> {
    return await searchNamedItems(this, '/industries', filter);
}

/**
 * Categories the articles of the user's company can have
 */
export async function searchArticleCategories(
    this: ILoadOptionsFunctions,
    filter?: string,
): Promise<INodeListSearchResult> {
    return await searchNamedItems(this, '/article-categories', filter);
}

/**
 * Builds a resource locator with a "From List" and a "By ID" mode
 *
 * @param field - Display name, name, description and list method of the field
 */
export function getListResourceLocator(field: {
    displayName: string;
    name: string;
    description: string;
    searchListMethod: string;
    placeholder: string;
    bodyProperty: string;
}): INodeProperties {
    return {
        displayName: field.displayName,
        name: field.name,
        type: 'resourceLocator',
        default: { mode: 'list', value: '' },
        description: field.description,
        modes: [
            {
                displayName: 'From List',
                name: 'list',
                type: 'list',
                typeOptions: {
                    searchListMethod: field.searchListMethod,
                    searchable: true,
                },
            },
            {
                displayName: 'By ID',
                name: 'id',
                type: 'string',
                placeholder: field.placeholder,
            },
        ],
        routing: {
            send: {
                type: 'body',
                property: field.bodyProperty,
            },
        },
    };
}
