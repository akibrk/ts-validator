import { VError } from '../helper/VError';
import { ValidateModel, ValidationRule, ValidationError } from '../interfaces';
import { Type } from '../types';
import { isEmailAddress } from './common';

/**
 * Validates single property against a validation rule
 * @param obj to validate
 * @param propName name of the property
 * @param rule Validation Rule
 * @returns ValidationError | undefined
 */
export function validateThis(obj: any, propName: string, rule: ValidationRule): ValidationError | undefined {
  let vError: ValidationError = new VError(propName);

  // If there isn't a rule defined for the property ignore it
  if (!rule) {
    return rule;
  }

  if (rule.allowNull) {
    return undefined;
  }

  if (rule.required) {
    if (typeof obj === undefined || typeof obj === null) {
      vError.errors.push({
        message: `Field is required, missing field: ${propName}`,
      });
    }
  }

  switch (rule.type) {
    case Type.email:
      if (typeof obj !== Type.string) {
        vError.errors.push({
          message: `Invalid type, expected ${rule.type} got ${typeof obj}`,
        });
      } else {
        const { value, error } = isEmailAddress(obj);
        if (!value && error) {
          vError.errors.push({
            message: error,
          });
        }

        if (rule.minLength) {
          if (obj.length < rule.minLength) {
            vError.errors.push({
              message: `Invalid ${rule.type} address, must be equal or longer than ${rule.minLength}`,
            });
          }
        }
        if (rule.maxLength) {
          if (obj.length > rule.maxLength) {
            vError.errors.push({
              message: `Invalid ${rule.type} address, must be equal or shorter than ${rule.maxLength}`,
            });
          }
        }
      }
      break;
    default:
      if (rule.type !== typeof obj) {
        vError.errors.push({
          message: `Invalid type, expected ${rule.type} got ${obj === null ? 'null' : typeof obj}`,
        });
      } else {
        if (rule.type === Type.string) {
          if (rule.minLength) {
            if (obj.length < rule.minLength) {
              vError.errors.push({
                message: `Invalid '${propName}', must be equal or longer than ${rule.minLength}`,
              });
            }
          }

          if (rule.maxLength) {
            if (obj.length > rule.maxLength) {
              vError.errors.push({
                message: `Invalid '${propName}', must be equal or shorter than ${rule.maxLength}`,
              });
            }
          }
        } else if (rule.type === Type.number) {
          if (rule.min) {
            if (obj < rule.min) {
              vError.errors.push({
                message: `Invalid '${propName}', must be equal or larger than ${rule.min}`,
              });
            }
          }

          if (rule.max) {
            if (obj > rule.max) {
              vError.errors.push({
                message: `Invalid '${propName}', must be equal or less than ${rule.max}`,
              });
            }
          }
        }
      }
  }

  return vError;
}

/**
 * Validates any object against a validation rule
 * @param obj to validate
 * @param model to validate against
 * @returns IValidationError[]
 */
export function validate(obj: any, model: ValidateModel): ValidationError[] {
  let errors: ValidationError[] = [];

  for (let prop in obj) {
    const propError = validateThis(obj[prop], prop, model[prop]);

    if (propError && propError.errors.length) {
      errors.push(propError);
    }
  }

  return errors;
}
