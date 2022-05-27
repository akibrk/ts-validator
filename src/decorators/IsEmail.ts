import { isEmailAddress } from '../validator/Shared';
import { VError } from '../helper/VError';

/**
 * Validates an email address
 * @param maxLength maximum length of the email
 * @returns
 */
export function isEmail(maxLength?: number) {
  return function (target: any, propertyName: string) {
    let value: string;
    Object.defineProperty(target, propertyName, {
      get: (): any => {
        return value;
      },
      set: (inputValue: string) => {
        const validationResult = isEmailAddress(inputValue);
        if (validationResult.value) {
          if (maxLength) {
            if (inputValue.length <= maxLength) {
              value = inputValue;
            } else {
              throw new VError(propertyName, `Email cannot be longer than ${maxLength}`);
            }
          } else {
            value = inputValue;
          }
        } else {
          throw new VError(propertyName, validationResult.error);
        }
      },
    });
  };
}
