import { PropertyError, ValidationError } from '../interfaces';

export class VError implements ValidationError {
  field: string;
  errors: PropertyError[];
  name: string;
  message: string;
  stack?: string | undefined;

  constructor(field: string);
  constructor(field: string, message?: string);
  constructor(field: string, message?: string, errors?: PropertyError[]) {
    this.message = message || 'Validation failed';
    this.field = field;
    this.errors = errors || [];
    this.name = 'ValidationError';
  }
}
