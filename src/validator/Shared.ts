import { VError } from '../helper/VError';
import { ValidationRule, ValidationError } from '../interfaces';
import { Type } from '../types';

/**
 * Validates single property against a validation rule
 * @param item to validate
 * @param propName name of the property
 * @param rule Validation Rule
 * @returns ValidationError | undefined
 */
export function validateRule(item: any, propName: string, rule: ValidationRule): ValidationError | undefined {
  let vError: ValidationError = new VError(propName);

  // If there isn't a rule defined for the property ignore it
  if (!rule) return undefined;

  // If null is allowed and the value is null ignore
  if(rule.allowNull && item === null) return undefined;

  // If note required and the value is undefined ignore
  if(!rule.required && item === undefined) return undefined;

  if (rule.required) {
    if (!item || typeof item === 'undefined') {
      vError.errors.push({
        message: `Field is required, missing field: ${propName}`,
      });
      return vError;
    }
  }

  switch (rule.type) {
    case Type.email:
      if (typeof item !== Type.string) {
        vError.errors.push({
          message: `Invalid type, expected ${rule.type} got ${typeof item}`,
        });
      } else {
        const { value, error } = isEmailAddress(item);
        if (!value && error) {
          vError.errors.push({
            message: error,
          });
        }

        if (rule.minLength) {
          if (item.length < rule.minLength) {
            vError.errors.push({
              message: `Invalid ${rule.type} address, must be equal or longer than ${rule.minLength}`,
            });
          }
        }
        if (rule.maxLength) {
          if (item.length > rule.maxLength) {
            vError.errors.push({
              message: `Invalid ${rule.type} address, must be equal or shorter than ${rule.maxLength}`,
            });
          }
        }
      }
      break;
    case Type.mobile:
      if (typeof item !== Type.string) {
        vError.errors.push({
          message: `Invalid type, expected ${rule.type} got ${typeof item}`,
        });
      } else {
        const { value, error } = isMobileNumber(item);
        if (!value && error) {
          vError.errors.push({
            message: error,
          });
        }

        if (rule.minLength) {
          if (item.length < rule.minLength) {
            vError.errors.push({
              message: `Invalid ${rule.type} number, must be equal or longer than ${rule.minLength}`,
            });
          }
        }
        if (rule.maxLength) {
          if (item.length > rule.maxLength) {
            vError.errors.push({
              message: `Invalid ${rule.type} number, must be equal or shorter than ${rule.maxLength}`,
            });
          }
        }
      }
      break;
    case Type.array:
      if (typeof item !== 'object') {
        vError.errors.push({
          message: `Invalid type, expected ${rule.type} got ${item === null ? 'null' : typeof item}`,
        });
      }
      if (rule.minLength) {
        if (item.length < rule.minLength) {
          vError.errors.push({
            message: `Invalid '${propName}', must be equal or longer than ${rule.minLength}`,
          });
        }
      }

      if (rule.maxLength) {
        if (item.length > rule.maxLength) {
          vError.errors.push({
            message: `Invalid '${propName}', must be equal or shorter than ${rule.maxLength}`,
          });
        }
      }
      break;
    case Type.string:
      if (rule.type !== typeof item) {
        vError.errors.push({
          message: `Invalid type, expected ${rule.type} got ${item === null ? 'null' : typeof item}`,
        });
        break;
      }

      if (rule.minLength) {
        if (item.length < rule.minLength) {
          vError.errors.push({
            message: `Invalid '${propName}', must be equal or longer than ${rule.minLength}`,
          });
        }
      }

      if (rule.maxLength) {
        if (item.length > rule.maxLength) {
          vError.errors.push({
            message: `Invalid '${propName}', must be equal or shorter than ${rule.maxLength}`,
          });
        }
      }
      break;
    case Type.number:
      if (rule.type !== typeof item) {
        vError.errors.push({
          message: `Invalid type, expected ${rule.type} got ${item === null ? 'null' : typeof item}`,
        });
        break;
      }
      if (rule.min) {
        if (item < rule.min) {
          vError.errors.push({
            message: `Invalid '${propName}', must be equal or larger than ${rule.min}`,
          });
        }
      }

      if (rule.max) {
        if (item > rule.max) {
          vError.errors.push({
            message: `Invalid '${propName}', must be equal or less than ${rule.max}`,
          });
        }
      }
      break;
    default:
      if (rule.type !== typeof item) {
        vError.errors.push({
          message: `Invalid type, expected ${rule.type} got ${item === null ? 'null' : typeof item}`,
        });
      }
  }

  return vError.errors.length ? vError : undefined;
}

import { ValidationResult } from 'types';

export function isNullOrUndefined(arg: any): ValidationResult {
  if (arg == null || arg == undefined) return { value: true, error: 'Invalid' };
  return { value: false };
}

/**
 * Checks if a string is email or not
 * @param arg string
 * @returns ValidationResult
 */
export function isEmailAddress(arg: string): ValidationResult {
  if (isNullOrUndefined(arg).value) return { value: false, error: 'Email might be null or undefined' };
  arg = arg.trim();

  const objArr = arg.split('@');

  if (objArr.length !== 2) {
    return { value: false, error: 'Invalid email address' };
  } else if (!objArr[0].length || !(objArr[1].length >= 3)) {
    return { value: false, error: `Invalid address, might be missing username or domain` };
  } else {
    return { value: true };
  }
}

/**
 * Checks if a number is valid or not
 * @param arg string
 * @returns ValidationResult
 */
export function isMobileNumber(arg: string): ValidationResult {
  if (isNullOrUndefined(arg).value) return { value: false, error: 'Number might be null or undefined' };

  // Normalize the digits
  arg = arg.trim().replace(/ /g, '').replace(/-/g, '').replace(/\(/g, '').replace(/\)/g, '');

  if (arg.length >= 3) {
    let matches = arg.match(/^\+?[0-9]{3,25}$/)?.length;
    if (matches && matches > 0) {
      return { value: true };
    } else {
      return { value: false, error: 'Does not match any known number format' };
    }
  } else {
    return { value: false, error: 'Number too short' };
  }
}
