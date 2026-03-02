"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReviewFields = exports.getReviewOperation = void 0;
const showForGet = {
    resource: ['review'],
    operation: ['get'],
};
exports.getReviewOperation = {
    name: 'Get',
    value: 'get',
    action: 'Get a review',
    description: 'Retrieve a single review by ID',
    routing: {
        request: {
            method: 'GET',
            url: '=/reviews/{{ $parameter.reviewId }}',
        },
    },
};
exports.getReviewFields = [
    {
        displayName: 'Review ID',
        name: 'reviewId',
        type: 'string',
        required: true,
        default: '',
        description: 'The unique identifier of the review to retrieve',
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
        ],
    },
];
//# sourceMappingURL=get.js.map