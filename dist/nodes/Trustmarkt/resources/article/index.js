"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.articleFields = exports.articleOperations = void 0;
const get_1 = require("./operations/get");
const list_1 = require("./operations/list");
const showForArticle = {
    resource: ['article'],
};
exports.articleOperations = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: showForArticle,
        },
        options: [
            get_1.getArticleOperation,
            list_1.listArticleOperation,
        ],
        default: 'getMany',
    },
];
exports.articleFields = [
    ...get_1.getArticleFields,
    ...list_1.listArticleFields,
];
//# sourceMappingURL=index.js.map