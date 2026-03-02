import type { IExecuteFunctions, IHttpRequestMethods, IDataObject } from 'n8n-workflow';
export declare const API_BASE_URL = "https://api.trustmarkt.de/v1";
export declare function getApiBaseUrl(): string;
export declare function trustmarktApiRequest(this: IExecuteFunctions, method: IHttpRequestMethods, endpoint: string, body?: IDataObject, query?: IDataObject): Promise<IDataObject | IDataObject[]>;
export declare function trustmarktApiRequestAllItems(this: IExecuteFunctions, endpoint: string, query?: IDataObject): Promise<IDataObject[]>;
