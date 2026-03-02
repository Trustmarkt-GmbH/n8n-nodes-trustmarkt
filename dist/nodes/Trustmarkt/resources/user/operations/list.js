"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listUserFields = exports.listUserOperation = void 0;
const showForList = {
    resource: ['user'],
    operation: ['getMany'],
};
exports.listUserOperation = {
    name: 'Get Many',
    value: 'getMany',
    action: 'Get many users',
    description: 'Retrieve a list of users from your company',
    routing: {
        request: {
            method: 'GET',
            url: '/user',
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
exports.listUserFields = [
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