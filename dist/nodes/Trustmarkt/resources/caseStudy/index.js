"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.caseStudyFields = exports.caseStudyOperations = void 0;
const get_1 = require("./operations/get");
const list_1 = require("./operations/list");
const showForCaseStudy = {
    resource: ['caseStudy'],
};
exports.caseStudyOperations = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: showForCaseStudy,
        },
        options: [
            get_1.getCaseStudyOperation,
            list_1.listCaseStudyOperation,
        ],
        default: 'getMany',
    },
];
exports.caseStudyFields = [
    ...get_1.getCaseStudyFields,
    ...list_1.listCaseStudyFields,
];
//# sourceMappingURL=index.js.map