import { isMobileNumber } from '../validator/Shared';
import { VError } from '../helper/VError';

/**
 * Validates a mobile number
 * @param maxLength maximum length of the number
 * @returns
 */
export function isMobile(maxLength?: number) {
  return function (target: any, propertyName: string) {
    let value: string;
    Object.defineProperty(target, propertyName, {
      get: (): any => {
        return value;
      },
      set: (inputValue: string) => {
        const validationResult = isMobileNumber(inputValue);
        if (validationResult.value) {
          if (maxLength) {
            if (inputValue.length <= maxLength) {
              value = inputValue;
            } else {
              throw new VError(propertyName, `Number cannot be longer than ${maxLength}`);
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
