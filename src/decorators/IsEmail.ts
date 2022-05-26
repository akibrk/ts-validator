import { isEmailAddress } from 'validator/common';
import { VError } from '../helper/VError';

/**
 * Validates an email address
 * @returns
 */
export function isEmail() {
  return function (target: any, propertyName: string) {
    let value: string;
    Object.defineProperty(target, propertyName, {
      get: (): any => {
        return value;
      },
      set: (inputValue: any) => {
        const validationResult = isEmailAddress(inputValue);
        if (validationResult.value) {
          value = inputValue;
        } else {
          throw new VError(propertyName, validationResult.error);
        }
      },
    });
  };
}
