"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.limitField = exports.returnAllField = exports.paginationFields = exports.companyIdField = exports.userIdField = exports.reviewIdField = void 0;
exports.reviewIdField = {
    displayName: 'Review ID',
    name: 'reviewId',
    type: 'string',
    default: '',
    required: true,
    description: 'The unique identifier of the review',
    placeholder: 'e.g., V5QrXa40B0oRLMDkxZYj',
};
exports.userIdField = {
    displayName: 'User ID',
    name: 'userId',
    type: 'string',
    default: '',
    required: true,
    description: 'The unique identifier of the user',
    placeholder: 'e.g., 5GdkVeN8ZLaw29zBDXyb',
};
exports.companyIdField = {
    displayName: 'Company ID',
    name: 'companyId',
    type: 'string',
    default: '',
    required: true,
    description: 'The unique identifier of the company',
    placeholder: 'e.g., XZzyJn9jEB1lWdvVRx6w',
};
exports.paginationFields = [
    {
        displayName: 'Page',
        name: 'page',
        type: 'number',
        typeOptions: {
            minValue: 1,
        },
        default: 1,
        description: 'Page number for pagination',
        routing: {
            send: {
                type: 'query',
                property: 'page',
            },
        },
    },
    {
        displayName: 'Per Page',
        name: 'perPage',
        type: 'number',
        typeOptions: {
            minValue: 1,
            maxValue: 50,
        },
        default: 15,
        description: 'Number of results per page (1-50)',
        routing: {
            send: {
                type: 'query',
                property: 'per_page',
            },
        },
    },
];
exports.returnAllField = {
    displayName: 'Return All',
    name: 'returnAll',
    type: 'boolean',
    default: false,
    description: 'Whether to return all results or only up to a given limit',
};
exports.limitField = {
    displayName: 'Limit',
    name: 'limit',
    type: 'number',
    typeOptions: {
        minValue: 1,
    },
    default: 50,
    description: 'Max number of results to return',
};
//# sourceMappingURL=descriptions.js.map