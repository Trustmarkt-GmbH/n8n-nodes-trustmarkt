"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCaseStudyFields = exports.getCaseStudyOperation = void 0;
const showForGet = {
    resource: ['caseStudy'],
    operation: ['get'],
};
exports.getCaseStudyOperation = {
    name: 'Get',
    value: 'get',
    action: 'Get a case study',
    description: 'Retrieve a single case study by ID',
    routing: {
        request: {
            method: 'GET',
            url: '=/case-studies/{{ $parameter.caseStudyId }}',
        },
    },
};
exports.getCaseStudyFields = [
    {
        displayName: 'Case Study ID',
        name: 'caseStudyId',
        type: 'string',
        required: true,
        default: '',
        description: 'The unique identifier of the case study to retrieve',
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
                        name: 'Content',
                        value: 'content',
                        description: 'Include the HTML content of problems, goals, and results sections',
                    },
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
        ],
    },
];
//# sourceMappingURL=get.js.map