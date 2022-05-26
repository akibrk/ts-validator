import { ValidationResult } from 'types';

export function isNullOrUndefined(arg: any): ValidationResult {
  if (arg == null || arg == undefined) return { value: true, error: 'Invalid' };
  return { value: false };
}

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

export function isMobileNumber(arg: string): ValidationResult {
  if (isNullOrUndefined(arg).value) return { value: false, error: 'Number might be null or undefined' };

  // Normalize the digits
  arg = arg.trim().replace(' ', '').replace('(', '').replace(')', '').replace('-', '');

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
