import { VError } from '../helper/VError';
import { ValidationRule, ValidationError } from '../interfaces';
import { Type } from '../types';

/**
 * Validates single property against a validation rule
 * @param obj to validate
 * @param propName name of the property
 * @param rule Validation Rule
 * @returns ValidationError | undefined
 */
export function validateRule(obj: any, propName: string, rule: ValidationRule): ValidationError | undefined {
  let vError: ValidationError = new VError(propName);

  // If there isn't a rule defined for the property ignore it
  if (!rule || rule.allowNull) {
    return undefined;
  }

  if (rule.required) {
    if (!obj || typeof obj === 'undefined') {
      vError.errors.push({
        message: `Field is required, missing field: ${propName}`,
      });
      return vError;
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
    case Type.mobile:
      if (typeof obj !== Type.string) {
        vError.errors.push({
          message: `Invalid type, expected ${rule.type} got ${typeof obj}`,
        });
      } else {
        const { value, error } = isMobileNumber(obj);
        if (!value && error) {
          vError.errors.push({
            message: error,
          });
        }

        if (rule.minLength) {
          if (obj.length < rule.minLength) {
            vError.errors.push({
              message: `Invalid ${rule.type} number, must be equal or longer than ${rule.minLength}`,
            });
          }
        }
        if (rule.maxLength) {
          if (obj.length > rule.maxLength) {
            vError.errors.push({
              message: `Invalid ${rule.type} number, must be equal or shorter than ${rule.maxLength}`,
            });
          }
        }
      }
      break;
    case Type.array:
      if (typeof obj !== 'object') {
        vError.errors.push({
          message: `Invalid type, expected ${rule.type} got ${obj === null ? 'null' : typeof obj}`,
        });
      }
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
      break;
    case Type.string:
      if (rule.type !== typeof obj) {
        vError.errors.push({
          message: `Invalid type, expected ${rule.type} got ${obj === null ? 'null' : typeof obj}`,
        });
        break;
      }

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
      break;
    case Type.number:
      if (rule.type !== typeof obj) {
        vError.errors.push({
          message: `Invalid type, expected ${rule.type} got ${obj === null ? 'null' : typeof obj}`,
        });
        break;
      }
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
      break;
    default:
      if (rule.type !== typeof obj) {
        vError.errors.push({
          message: `Invalid type, expected ${rule.type} got ${obj === null ? 'null' : typeof obj}`,
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
