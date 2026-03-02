"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.API_BASE_URL = void 0;
exports.getApiBaseUrl = getApiBaseUrl;
exports.trustmarktApiRequest = trustmarktApiRequest;
exports.trustmarktApiRequestAllItems = trustmarktApiRequestAllItems;
exports.API_BASE_URL = 'https://api.trustmarkt.de/v1';
function getApiBaseUrl() {
    return exports.API_BASE_URL;
}
async function trustmarktApiRequest(method, endpoint, body = {}, query = {}) {
    const baseUrl = getApiBaseUrl();
    const options = {
        method,
        url: `${baseUrl}${endpoint}`,
        json: true,
    };
    if (Object.keys(query).length > 0) {
        options.qs = query;
    }
    if (Object.keys(body).length > 0 && ['POST', 'PUT', 'PATCH'].includes(method)) {
        options.body = body;
    }
    const response = await this.helpers.httpRequestWithAuthentication.call(this, 'trustmarktApi', options);
    return response;
}
async function trustmarktApiRequestAllItems(endpoint, query = {}) {
    const allItems = [];
    let page = 1;
    let hasMore = true;
    while (hasMore) {
        const response = (await trustmarktApiRequest.call(this, 'GET', endpoint, {}, {
            ...query,
            page,
            per_page: 50,
        }));
        const items = response.data;
        allItems.push(...items);
        const meta = response.meta;
        hasMore = page < meta.last_page;
        page++;
    }
    return allItems;
}
//# sourceMappingURL=transport.js.map