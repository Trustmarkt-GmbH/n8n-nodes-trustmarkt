"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.meFields = exports.meOperations = void 0;
const get_1 = require("./operations/get");
const showForMe = {
    resource: ['me'],
};
exports.meOperations = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: showForMe,
        },
        options: [
            get_1.getMeOperation,
        ],
        default: 'get',
    },
];
exports.meFields = [
    ...get_1.getMeFields,
];
//# sourceMappingURL=index.js.map