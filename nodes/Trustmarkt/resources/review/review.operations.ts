/**
 * Review Operations Registry
 *
 * This file serves as a central registry for all review operations.
 * It re-exports operations from individual files for easy importing.
 *
 * USAGE:
 * When adding a new operation, import it here and re-export it.
 * This keeps the main index.ts clean and organized.
 */

export { getReviewOperation, getReviewFields } from './operations/get';
export { listReviewOperation, listReviewFields } from './operations/list';

// Future operations - export here when implemented:
// export { replyToReviewOperation, replyToReviewFields } from './operations/reply';
