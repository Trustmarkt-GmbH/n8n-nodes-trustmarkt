"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inquiryFields = exports.inquiryOperations = void 0;
const get_1 = require("./operations/get");
const list_1 = require("./operations/list");
const showForInquiry = {
    resource: ['inquiry'],
};
exports.inquiryOperations = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: showForInquiry,
        },
        options: [
            get_1.getInquiryOperation,
            list_1.listInquiryOperation,
        ],
        default: 'getMany',
    },
];
exports.inquiryFields = [
    ...get_1.getInquiryFields,
    ...list_1.listInquiryFields,
];
//# sourceMappingURL=index.js.map