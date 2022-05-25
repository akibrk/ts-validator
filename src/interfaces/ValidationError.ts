import { PropertyError } from './PropertyError';

/**
 * Error returned after validation
 */
export interface ValidationError extends Error {
  field: string;
  errors: Array<PropertyError>;
}
