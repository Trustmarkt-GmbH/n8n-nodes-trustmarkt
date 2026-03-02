"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userFields = exports.userOperations = void 0;
const get_1 = require("./operations/get");
const list_1 = require("./operations/list");
const showForUser = {
    resource: ['user'],
};
exports.userOperations = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: showForUser,
        },
        options: [
            get_1.getUserOperation,
            list_1.listUserOperation,
        ],
        default: 'getMany',
    },
];
exports.userFields = [
    ...get_1.getUserFields,
    ...list_1.listUserFields,
];
//# sourceMappingURL=index.js.map