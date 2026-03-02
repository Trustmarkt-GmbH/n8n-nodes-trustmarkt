"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listCaseStudyFields = exports.listCaseStudyOperation = void 0;
const showForList = {
    resource: ['caseStudy'],
    operation: ['getMany'],
};
exports.listCaseStudyOperation = {
    name: 'Get Many',
    value: 'getMany',
    action: 'Get many case studies',
    description: 'Retrieve a list of case studies from your Trustmarkt profile',
    routing: {
        request: {
            method: 'GET',
            url: '/case-studies',
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
exports.listCaseStudyFields = [
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
                        name: 'Customer Industry',
                        value: 'customerIndustry',
                        description: 'Include the industry of the customer',
                    },
                    {
                        name: 'Review',
                        value: 'review',
                        description: 'Include the associated review',
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
                description: 'Filter case studies by title or customer name (max 255 characters)',
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