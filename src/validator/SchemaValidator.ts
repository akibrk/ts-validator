import { ValidationError, ValidatorSchema } from '../interfaces';
import { validateRule } from './Shared';

/**
 * Validates any object against a ValidatorSchema
 * @param obj to validate
 * @param schema to validate against
 * @returns ValidationError[]
 */
export function validate(obj: any, schema: ValidatorSchema): ValidationError[] {
  let errors: ValidationError[] = [];
  for (let prop in obj) {
    const propError = validateRule(obj[prop], prop, schema[prop]);
    if (propError && propError.errors.length) {
      errors.push(propError);
    }
  }
  return errors;
}
