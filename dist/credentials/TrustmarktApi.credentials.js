"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrustmarktApi = void 0;
class TrustmarktApi {
    constructor() {
        this.name = 'trustmarktApi';
        this.displayName = 'Trustmarkt API';
        this.icon = 'file:trustmarkt.svg';
        this.documentationUrl = 'https://www.trustmarkt.de/r/api';
        this.properties = [
            {
                displayName: 'API Key',
                name: 'apiKey',
                type: 'string',
                typeOptions: {
                    password: true,
                },
                default: '',
                required: true,
                description: 'Your Trustmarkt API Key',
            },
        ];
        this.test = {
            request: {
                baseURL: 'https://api.trustmarkt.de/v1',
                url: '/me',
                method: 'GET',
            },
        };
    }
    async authenticate(credentials, requestOptions) {
        var _a, _b;
        let apiKey = String((_a = credentials.apiKey) !== null && _a !== void 0 ? _a : '');
        apiKey = apiKey.replace(/\r\n|\n|\r/g, '|').trim();
        requestOptions.headers = (_b = requestOptions.headers) !== null && _b !== void 0 ? _b : {};
        requestOptions.headers.Authorization = `Bearer ${apiKey}`;
        return requestOptions;
    }
}
exports.TrustmarktApi = TrustmarktApi;
//# sourceMappingURL=TrustmarktApi.credentials.js.map