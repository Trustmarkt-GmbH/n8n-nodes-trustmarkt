"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getArticleFields = exports.getArticleOperation = void 0;
const showForGet = {
    resource: ['article'],
    operation: ['get'],
};
exports.getArticleOperation = {
    name: 'Get',
    value: 'get',
    action: 'Get an article',
    description: 'Retrieve a single article by ID',
    routing: {
        request: {
            method: 'GET',
            url: '=/articles/{{ $parameter.articleId }}',
        },
    },
};
exports.getArticleFields = [
    {
        displayName: 'Article ID',
        name: 'articleId',
        type: 'string',
        required: true,
        default: '',
        description: 'The unique identifier of the article to retrieve',
        displayOptions: {
            show: showForGet,
        },
    },
    {
        displayName: 'Options',
        name: 'options',
        type: 'collection',
        placeholder: 'Add Option',
        default: {},
        displayOptions: {
            show: showForGet,
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
                    {
                        name: 'Content',
                        value: 'content',
                        description: 'Include the main HTML content of the article',
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
        ],
    },
];
//# sourceMappingURL=get.js.map