/**
 * Trustmarkt API Credentials
 *
 * Defines how n8n authenticates with the Trustmarkt API.
 *
 * This file specifies:
 * 1. Input fields for the user (API Key, Environment)
 * 2. How authentication is added to requests
 * 3. How to test if credentials are valid
 */

import {
	type ICredentialDataDecryptedObject,
	type ICredentialTestRequest,
	type ICredentialType,
	type IHttpRequestOptions,
	type INodeProperties,
	type Icon,
} from 'n8n-workflow';

export class TrustmarktApi implements ICredentialType {
	// Internal name - must match the name used in nodes
	name = 'trustmarktApi';

	// Display name in the UI
	displayName = 'Trustmarkt API';

	// Icon for the credentials
	icon: Icon = { light: 'file:trustmarkt.svg', dark: 'file:trustmarkt-dark.svg' };

	// Link to documentation
	documentationUrl = 'https://www.trustmarkt.de/r/api';

	// ══════════════════════════════════════════════════════════════
	// INPUT FIELDS
	// ══════════════════════════════════════════════════════════════
	properties: INodeProperties[] = [
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

	// ══════════════════════════════════════════════════════════════
	// AUTHENTICATION
	// ══════════════════════════════════════════════════════════════
	async authenticate(
		credentials: ICredentialDataDecryptedObject,
		requestOptions: IHttpRequestOptions,
	): Promise<IHttpRequestOptions> {
		let apiKey = String(credentials.apiKey ?? '');

		// Clean up API key (replace line breaks with pipe character)
		apiKey = apiKey.replace(/\r\n|\n|\r/g, '|').trim();

		requestOptions.headers = requestOptions.headers ?? {};
		requestOptions.headers.Authorization = `Bearer ${apiKey}`;

		return requestOptions;
	}

	// ══════════════════════════════════════════════════════════════
	// CREDENTIAL TEST
	// ══════════════════════════════════════════════════════════════
	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://api.trustmarkt.de/v1',
			url: '/me',
			method: 'GET',
		},
	};
}
