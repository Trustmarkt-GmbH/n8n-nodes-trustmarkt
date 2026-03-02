import { type ICredentialDataDecryptedObject, type ICredentialTestRequest, type ICredentialType, type IHttpRequestOptions, type INodeProperties, type Icon } from 'n8n-workflow';
export declare class TrustmarktApi implements ICredentialType {
    name: string;
    displayName: string;
    icon: Icon;
    documentationUrl: string;
    properties: INodeProperties[];
    authenticate(credentials: ICredentialDataDecryptedObject, requestOptions: IHttpRequestOptions): Promise<IHttpRequestOptions>;
    test: ICredentialTestRequest;
}
