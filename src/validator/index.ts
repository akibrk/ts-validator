import { ValidateModel, ValidateThis, ValidationError } from '../interfaces';
import { Type } from '../types';
import { isEmailAddress } from './utils';

/**
 * Validates single property against a validation model
 * @param obj to validate
 * @param propName name of the property
 * @param model Validation Model
 * @returns IValidationError | undefined
 */
function validateThis(obj: any, propName: string, model: ValidateThis): ValidationError | undefined {
  let vError: ValidationError = {
    field: propName,
    errors: [],
  };

  // If there isn't a rule defined for the property ignore it
  if (!model) {
    return model;
  }

  if (model.allowNull) {
    return undefined;
  }

  if (model.required) {
    if (typeof obj === undefined || typeof obj === null) {
      vError.errors.push({
        message: `Field is required, missing field: ${propName}`,
      });
    }
  }

  switch (model.type) {
    case Type.email:
      if (typeof obj !== Type.string) {
        vError.errors.push({
          message: `Invalid type, expected ${model.type} got ${typeof obj}`,
        });
      } else {
        const { value, error } = isEmailAddress(obj);
        if (!value && error) {
          vError.errors.push({
            message: error,
          });
        }

        if (model.minLength) {
          if (obj.length < model.minLength) {
            vError.errors.push({
              message: `Invalid ${model.type} address, must be equal or longer than ${model.minLength}`,
            });
          }
        }
        if (model.maxLength) {
          if (obj.length > model.maxLength) {
            vError.errors.push({
              message: `Invalid ${model.type} address, must be equal or shorter than ${model.maxLength}`,
            });
          }
        }
      }
      break;
    default:
      if (model.type !== typeof obj) {
        vError.errors.push({
          message: `Invalid type, expected ${model.type} got ${obj === null ? 'null' : typeof obj}`,
        });
      } else {
        if (model.type === Type.string) {
          if (model.minLength) {
            if (obj.length < model.minLength) {
              vError.errors.push({
                message: `Invalid '${propName}', must be equal or longer than ${model.minLength}`,
              });
            }
          }

          if (model.maxLength) {
            if (obj.length > model.maxLength) {
              vError.errors.push({
                message: `Invalid '${propName}', must be equal or shorter than ${model.maxLength}`,
              });
            }
          }
        } else if (model.type === Type.number) {
          if (model.min) {
            if (obj < model.min) {
              vError.errors.push({
                message: `Invalid '${propName}', must be equal or larger than ${model.min}`,
              });
            }
          }

          if (model.max) {
            if (obj > model.max) {
              vError.errors.push({
                message: `Invalid '${propName}', must be equal or less than ${model.max}`,
              });
            }
          }
        }
      }
  }

  return vError;
}

/**
 * Validates any object against a validation model
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
