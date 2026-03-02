/**
 * Transport Utilities
 *
 * Helper functions for making API requests to the Trustmarkt API.
 *
 * n8n supports two approaches for API requests:
 *
 * 1. DECLARATIVE (used by this node):
 *    - Define routing in the properties
 *    - n8n automatically builds and executes requests
 *    - Simpler and less code
 *
 * 2. PROGRAMMATIC (for complex scenarios):
 *    - Implement custom execute() method
 *    - Full control over request/response handling
 *    - Use the helpers in this file
 *
 * This node primarily uses the DECLARATIVE approach, but these
 * utilities are available for special cases or future extensions.
 */

import type {
    IExecuteFunctions,
    IHttpRequestMethods,
    IDataObject,
    IHttpRequestOptions,
} from 'n8n-workflow';

// ═══════════════════════════════════════════════════════════════════
// API CONFIGURATION
// ═══════════════════════════════════════════════════════════════════

/**
 * API base URL
 */
export const API_BASE_URL = 'https://api.trustmarkt.de/v1';

// ═══════════════════════════════════════════════════════════════════
// HELPER FUNCTIONS
// ═══════════════════════════════════════════════════════════════════

/**
 * Gets the API base URL
 *
 * @returns The API base URL
 */
export function getApiBaseUrl(): string {
    return API_BASE_URL;
}

/**
 * Generic function for Trustmarkt API requests
 *
 * Use this for custom API calls that can't be handled declaratively.
 *
 * @param this - n8n Execution Context
 * @param method - HTTP Method (GET, POST, PUT, DELETE)
 * @param endpoint - API Endpoint (e.g., '/reviews')
 * @param body - Request Body for POST/PUT/PATCH
 * @param query - Query Parameters
 * @returns API response data
 */
export async function trustmarktApiRequest(
    this: IExecuteFunctions,
    method: IHttpRequestMethods,
    endpoint: string,
    body: IDataObject = {},
    query: IDataObject = {},
): Promise<IDataObject | IDataObject[]> {
    const baseUrl = getApiBaseUrl();

    const options: IHttpRequestOptions = {
        method,
        url: `${baseUrl}${endpoint}`,
        json: true,
    };

    // Add query parameters if present
    if (Object.keys(query).length > 0) {
        options.qs = query;
    }

    // Add body if present (only for POST, PUT, PATCH)
    if (Object.keys(body).length > 0 && ['POST', 'PUT', 'PATCH'].includes(method)) {
        options.body = body;
    }

    // Execute request with credentials (n8n handles authentication)
    const response = await this.helpers.httpRequestWithAuthentication.call(
        this,
        'trustmarktApi',
        options,
    );

    return response;
}

/**
 * Fetches all pages of a paginated endpoint
 *
 * Use this when you need to retrieve all results from a paginated API.
 *
 * @param this - n8n Execution Context
 * @param endpoint - API Endpoint
 * @param query - Additional query parameters
 * @returns All items from all pages
 */
export async function trustmarktApiRequestAllItems(
    this: IExecuteFunctions,
    endpoint: string,
    query: IDataObject = {},
): Promise<IDataObject[]> {
    const allItems: IDataObject[] = [];
    let page = 1;
    let hasMore = true;

    while (hasMore) {
        const response = (await trustmarktApiRequest.call(this, 'GET', endpoint, {}, {
            ...query,
            page,
            per_page: 50,
        })) as IDataObject;

        const items = response.data as IDataObject[];
        allItems.push(...items);

        // Check if there are more pages
        const meta = response.meta as IDataObject;
        hasMore = page < (meta.last_page as number);
        page++;
    }

    return allItems;
}
