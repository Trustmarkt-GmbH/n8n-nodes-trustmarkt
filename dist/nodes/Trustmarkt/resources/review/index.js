"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewFields = exports.reviewOperations = void 0;
const get_1 = require("./operations/get");
const list_1 = require("./operations/list");
const showForReview = {
    resource: ['review'],
};
exports.reviewOperations = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: showForReview,
        },
        options: [
            get_1.getReviewOperation,
            list_1.listReviewOperation,
        ],
        default: 'getMany',
    },
];
exports.reviewFields = [
    ...get_1.getReviewFields,
    ...list_1.listReviewFields,
];
//# sourceMappingURL=index.js.map