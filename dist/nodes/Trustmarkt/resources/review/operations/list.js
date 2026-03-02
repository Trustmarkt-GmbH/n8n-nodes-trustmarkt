"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listReviewFields = exports.listReviewOperation = void 0;
const showForList = {
    resource: ['review'],
    operation: ['getMany'],
};
exports.listReviewOperation = {
    name: 'Get Many',
    value: 'getMany',
    action: 'Get many reviews',
    description: 'Retrieve a list of reviews from your Trustmarkt profile',
    routing: {
        request: {
            method: 'GET',
            url: '/reviews',
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
exports.listReviewFields = [
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
                        name: 'Comments',
                        value: 'comments',
                        description: 'Include comments on the review',
                    },
                    {
                        name: 'Company',
                        value: 'company',
                        description: 'Include the company the review belongs to',
                    },
                    {
                        name: 'Company Main Category',
                        value: 'company.mainCategory',
                        description: 'Include the main category of the company',
                    },
                    {
                        name: 'User',
                        value: 'user',
                        description: 'Include the user who wrote the review',
                    },
                    {
                        name: 'User Company',
                        value: 'user.company',
                        description: 'Include the company of the user who wrote the review',
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
        ],
    },
];
//# sourceMappingURL=list.js.map