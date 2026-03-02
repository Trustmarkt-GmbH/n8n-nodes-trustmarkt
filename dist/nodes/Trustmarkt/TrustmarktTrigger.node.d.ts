import { type IHookFunctions, type ILoadOptionsFunctions, type INodePropertyOptions, type INodeType, type INodeTypeDescription, type IWebhookFunctions, type IWebhookResponseData } from 'n8n-workflow';
export declare class TrustmarktTrigger implements INodeType {
    description: INodeTypeDescription;
    webhookMethods: {
        default: {
            checkExists(this: IHookFunctions): Promise<boolean>;
            create(this: IHookFunctions): Promise<boolean>;
            delete(this: IHookFunctions): Promise<boolean>;
        };
    };
    methods: {
        loadOptions: {
            getWebhookEvents(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]>;
        };
    };
    webhook(this: IWebhookFunctions): Promise<IWebhookResponseData>;
}
