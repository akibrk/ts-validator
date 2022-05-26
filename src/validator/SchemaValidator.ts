import { ValidateModel, ValidationError } from '../interfaces';
import { validateRule } from './Shared';

/**
 * Validates any object against a validation rule
 * @param obj to validate
 * @param model to validate against
 * @returns ValidationError[]
 */
export function validate(obj: any, model: ValidateModel): ValidationError[] {
  let errors: ValidationError[] = [];
  for (let prop in obj) {
    const propError = validateRule(obj[prop], prop, model[prop]);
    if (propError && propError.errors.length) {
      errors.push(propError);
    }
  }
  return errors;
}
