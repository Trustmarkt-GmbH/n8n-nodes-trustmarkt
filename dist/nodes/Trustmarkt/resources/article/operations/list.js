"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listArticleFields = exports.listArticleOperation = void 0;
const showForList = {
    resource: ['article'],
    operation: ['getMany'],
};
exports.listArticleOperation = {
    name: 'Get Many',
    value: 'getMany',
    action: 'Get many articles',
    description: 'Retrieve a list of articles from your Trustmarkt profile',
    routing: {
        request: {
            method: 'GET',
            url: '/articles',
        },
        output: {
            postReceive: [
                {
                    type: 'rootProperty',
                    properties: {
                        property: 'data',
                    },
                },
            ],
        },
    },
};
exports.listArticleFields = [
    {
        displayName: 'Options',
        name: 'options',
        type: 'collection',
        placeholder: 'Add Option',
        default: {},
        displayOptions: {
            show: showForList,
        },
        options: [
            {
                displayName: 'Expand',
                name: 'expand',
                type: 'multiOptions',
                default: [],
                description: 'Include related resources in the response',
                options: [
                    {
                        name: 'Author',
                        value: 'author',
                        description: 'Include the author of the article',
                    },
                    {
                        name: 'Category',
                        value: 'category',
                        description: 'Include the category the article belongs to',
                    },
                    {
                        name: 'Company',
                        value: 'company',
                        description: 'Include the company the article belongs to',
                    },
                ],
                routing: {
                    send: {
                        type: 'query',
                        property: 'expand',
                        value: '={{ $value.join(",") }}',
                    },
                },
            },
            {
                displayName: 'Limit',
                name: 'limit',
                type: 'number',
                typeOptions: {
                    minValue: 1,
                    maxValue: 50,
                },
                default: 50,
                description: 'Max number of results to return',
                routing: {
                    send: {
                        type: 'query',
                        property: 'per_page',
                    },
                },
            },
            {
                displayName: 'Page',
                name: 'page',
                type: 'number',
                typeOptions: {
                    minValue: 1,
                },
                default: 1,
                description: 'Page number for pagination (starts at 1)',
                routing: {
                    send: {
                        type: 'query',
                        property: 'page',
                    },
                },
            },
            {
                displayName: 'Search',
                name: 'search',
                type: 'string',
                default: '',
                description: 'Filter articles by title or slug (max 255 characters)',
                routing: {
                    send: {
                        type: 'query',
                        property: 'search',
                    },
                },
            },
        ],
    },
];
//# sourceMappingURL=list.js.map