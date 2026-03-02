"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Trustmarkt = void 0;
const article_1 = require("./resources/article");
const caseStudy_1 = require("./resources/caseStudy");
const inquiry_1 = require("./resources/inquiry");
const me_1 = require("./resources/me");
const review_1 = require("./resources/review");
const user_1 = require("./resources/user");
const resourceOptions = [
    {
        name: 'Article',
        value: 'article',
        description: 'Manage articles on your profile',
    },
    {
        name: 'Case Study',
        value: 'caseStudy',
        description: 'Manage case studies on your profile',
    },
    {
        name: 'Inquiry',
        value: 'inquiry',
        description: 'Manage incoming inquiries from potential customers',
    },
    {
        name: 'Me',
        value: 'me',
        description: 'Get information about the authenticated user',
    },
    {
        name: 'Review',
        value: 'review',
        description: 'Manage reviews on your Trustmarkt profile',
    },
    {
        name: 'User',
        value: 'user',
        description: 'Manage users in your company',
    },
];
class Trustmarkt {
    constructor() {
        this.description = {
            displayName: 'Trustmarkt',
            name: 'trustmarkt',
            icon: 'file:trustmarkt.svg',
            group: ['transform'],
            version: 1,
            subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
            description: 'Interact with the Trustmarkt API to manage reviews, users, case studies, and more',
            defaults: {
                name: 'Trustmarkt',
            },
            inputs: ['main'],
            outputs: ['main'],
            usableAsTool: true,
            credentials: [
                {
                    name: 'trustmarktApi',
                    required: true,
                },
            ],
            requestDefaults: {
                baseURL: 'https://api.trustmarkt.de/v1',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            },
            properties: [
                {
                    displayName: 'Resource',
                    name: 'resource',
                    type: 'options',
                    noDataExpression: true,
                    options: resourceOptions,
                    default: 'review',
                },
                ...article_1.articleOperations,
                ...article_1.articleFields,
                ...caseStudy_1.caseStudyOperations,
                ...caseStudy_1.caseStudyFields,
                ...inquiry_1.inquiryOperations,
                ...inquiry_1.inquiryFields,
                ...me_1.meOperations,
                ...me_1.meFields,
                ...review_1.reviewOperations,
                ...review_1.reviewFields,
                ...user_1.userOperations,
                ...user_1.userFields,
            ],
        };
    }
}
exports.Trustmarkt = Trustmarkt;
//# sourceMappingURL=Trustmarkt.node.js.map