/**
 * Transport Utilities
 *
 * Helper functions for the Trustmarkt API.
 */

import {
    NodeApiError,
    NodeOperationError,
    type IDataObject,
    type IExecuteSingleFunctions,
    type IHttpRequestOptions,
    type IN8nHttpFullResponse,
    type INodeExecutionData,
    type JsonObject,
} from 'n8n-workflow';

// ═══════════════════════════════════════════════════════════════════
// API CONFIGURATION
// ═══════════════════════════════════════════════════════════════════

/**
 * API base URL
 */
export const API_BASE_URL = 'https://api.trustmarkt.de/v1';

/**
 * Minimum number of words the Trustmarkt AI needs when it writes from a text
 */
export const AI_GENERATION_MIN_TEXT_WORDS = 100;

// ═══════════════════════════════════════════════════════════════════
// HELPER FUNCTIONS
// ═══════════════════════════════════════════════════════════════════

/**
 * Gets the API base URL
 *
 * @returns The API base URL
 */
export function getApiBaseUrl(): string {
    return API_BASE_URL;
}

// ═══════════════════════════════════════════════════════════════════
// ERROR HANDLING
// ═══════════════════════════════════════════════════════════════════

/**
 * English message and hint for each `reason` the API sends with an error
 */
const REASON_MESSAGES: Record<string, { message: string; hint: string }> = {
    already_running: {
        message: 'An AI generation is already running for this item',
        hint: "Wait until it finishes (usually 2–3 minutes), then use 'Get' and check 'ai_generation.status'.",
    },
    daily_limit: {
        message: 'Your company has used all AI generations for today',
        hint: 'Try again tomorrow. The daily limit is shared with the Trustmarkt web app.',
    },
    not_editable: {
        message: 'Only drafts can be written by the Trustmarkt AI',
        hint: 'Create a new draft, or set this one back to draft in the Trustmarkt web app, then start the AI generation again.',
    },
    start_failed: {
        message: 'The Trustmarkt AI could not start',
        hint: "Try again in a moment, or turn on 'Retry On Fail' in the node settings.",
    },
    too_many_running: {
        message: 'Your company already runs the maximum of 5 AI generations at the same time',
        hint: 'Wait a few minutes until one of them finishes, then try again.',
    },
};

/**
 * English message and hint for each HTTP status code without a known `reason`
 */
function getStatusMessage(statusCode: number): { message: string; hint: string } {
    switch (statusCode) {
        case 401:
            return {
                message: 'The Trustmarkt API key was not accepted',
                hint: 'Check the API key in the Trustmarkt API credentials.',
            };
        case 403:
            return {
                message: 'You may not do this in Trustmarkt',
                hint: 'Check that your plan includes this feature and that the item belongs to your company.',
            };
        case 404:
            return {
                message: 'The item was not found in Trustmarkt',
                hint: 'Check the ID. It must belong to your company.',
            };
        case 409:
            return {
                message: 'The item cannot be changed right now',
                hint: 'Check the state of the item in Trustmarkt and try again.',
            };
        case 422:
            return {
                message: 'Trustmarkt did not accept the input',
                hint: 'Check the fields listed below.',
            };
        case 429:
            return {
                message: 'Too many requests to the Trustmarkt API',
                hint: "Wait a moment, or space out the requests with the batching settings under 'Options'.",
            };
        default:
            return statusCode >= 500
                ? {
                      message: 'The Trustmarkt API could not process the request',
                      hint: "Try again in a moment, or turn on 'Retry On Fail' in the node settings.",
                  }
                : {
                      message: `The Trustmarkt API rejected the request (status ${statusCode})`,
                      hint: 'Check the parameters of this node.',
                  };
    }
}

/**
 * Lists the fields the API rejected, one line per field
 */
function formatValidationErrors(errors: unknown): string {
    if (!errors || typeof errors !== 'object') {
        return '';
    }

    return Object.entries(errors as Record<string, unknown>)
        .map(([field, messages]) => {
            const text = Array.isArray(messages) ? messages.join(' ') : String(messages);

            return field === 'general' ? `- ${text}` : `- '${field}': ${text}`;
        })
        .join('\n');
}

/**
 * Post-receive hook that turns an error response of the Trustmarkt API into a
 * NodeApiError with an English message, the API's `reason` and its validation errors.
 *
 * Use it together with `ignoreHttpStatusErrors: true` on the request.
 */
export async function handleTrustmarktApiError(
    this: IExecuteSingleFunctions,
    items: INodeExecutionData[],
    response: IN8nHttpFullResponse,
): Promise<INodeExecutionData[]> {
    const statusCode = Number(response.statusCode);

    if (statusCode < 400) {
        return items;
    }

    const body: IDataObject =
        response.body && typeof response.body === 'object' && !Array.isArray(response.body)
            ? (response.body as IDataObject)
            : {};
    const reason = typeof body.reason === 'string' ? body.reason : undefined;
    const apiMessage = typeof body.message === 'string' ? body.message : undefined;
    const { message, hint } = (reason && REASON_MESSAGES[reason]) || getStatusMessage(statusCode);

    // Hint first, then the fields the API rejected, then what the API itself said
    const descriptionParts = [hint];
    const validationErrors = statusCode === 422 ? formatValidationErrors(body.errors) : '';

    if (validationErrors) {
        descriptionParts.push(validationErrors);
    }

    if (apiMessage) {
        descriptionParts.push(`Trustmarkt API: "${apiMessage}"${reason ? ` (reason: ${reason})` : ''}`);
    } else if (reason) {
        descriptionParts.push(`Reason: ${reason}`);
    }

    throw new NodeApiError(this.getNode(), { ...body, statusCode } as JsonObject, {
        message,
        description: descriptionParts.join('\n\n'),
        httpCode: String(statusCode),
        itemIndex: this.getItemIndex(),
    });
}

/**
 * Pre-send hook that stops a text for the AI generation that is too short,
 * before it uses up a request.
 */
export async function validateAiGenerationText(
    this: IExecuteSingleFunctions,
    requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
    const text = String(this.getNodeParameter('text', '') ?? '');
    const words = text.trim().split(/\s+/u).filter((word) => word !== '').length;

    if (words < AI_GENERATION_MIN_TEXT_WORDS) {
        throw new NodeOperationError(
            this.getNode(),
            `The 'Text' needs at least ${AI_GENERATION_MIN_TEXT_WORDS} words, it has ${words}`,
            {
                description:
                    'The Trustmarkt AI writes only from what the text says. Add more details, e.g. a full interview or transcript, or use a YouTube video as the source.',
                itemIndex: this.getItemIndex(),
            },
        );
    }

    return requestOptions;
}
