/**
 * Transport Utilities
 *
 * Helper functions for the Trustmarkt API.
 */

// ═══════════════════════════════════════════════════════════════════
// API CONFIGURATION
// ═══════════════════════════════════════════════════════════════════

/**
 * API base URL
 */
export const API_BASE_URL = 'https://api.trustmarkt.de/v1';

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
