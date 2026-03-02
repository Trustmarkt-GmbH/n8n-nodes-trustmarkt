"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInquiryFields = exports.getInquiryOperation = void 0;
const showForGet = {
    resource: ['inquiry'],
    operation: ['get'],
};
exports.getInquiryOperation = {
    name: 'Get',
    value: 'get',
    action: 'Get an inquiry',
    description: 'Retrieve a single inquiry by ID',
    routing: {
        request: {
            method: 'GET',
            url: '=/inquiries/{{ $parameter.inquiryId }}',
        },
    },
};
exports.getInquiryFields = [
    {
        displayName: 'Inquiry ID',
        name: 'inquiryId',
        type: 'string',
        required: true,
        default: '',
        description: 'The unique identifier of the inquiry to retrieve',
        displayOptions: {
            show: showForGet,
        },
    },
];
//# sourceMappingURL=get.js.map