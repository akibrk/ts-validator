import { PropertyError } from './PropertyError';

/**
 * Error returned after validation
 */
export interface ValidationError {
  field: string;
  errors: Array<PropertyError>;
}
