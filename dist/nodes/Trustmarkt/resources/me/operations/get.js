"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMeFields = exports.getMeOperation = void 0;
const showForGet = {
    resource: ['me'],
    operation: ['get'],
};
exports.getMeOperation = {
    name: 'Get',
    value: 'get',
    action: 'Get authenticated user',
    description: 'Retrieve information about the authenticated user',
    routing: {
        request: {
            method: 'GET',
            url: '/me',
        },
    },
};
exports.getMeFields = [
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
                        name: 'Company',
                        value: 'company',
                        description: 'Include the company the user belongs to',
                    },
                    {
                        name: 'Company Articles',
                        value: 'company.articles',
                        description: 'Include the articles of the company',
                    },
                    {
                        name: 'Company Main Category',
                        value: 'company.mainCategory',
                        description: 'Include the main category of the company',
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