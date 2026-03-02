"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserFields = exports.getUserOperation = void 0;
const showForGet = {
    resource: ['user'],
    operation: ['get'],
};
exports.getUserOperation = {
    name: 'Get',
    value: 'get',
    action: 'Get a user',
    description: 'Retrieve a single user by ID',
    routing: {
        request: {
            method: 'GET',
            url: '=/user/{{ $parameter.userId }}',
        },
    },
};
exports.getUserFields = [
    {
        displayName: 'User ID',
        name: 'userId',
        type: 'string',
        required: true,
        default: '',
        description: 'The unique identifier of the user to retrieve',
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
                        name: 'Company',
                        value: 'company',
                        description: 'Include the company the user belongs to',
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