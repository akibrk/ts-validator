import { VError } from '../helper/VError';

/**
 * Set the minimum length limit
 * @param len minimum length of a string or array
 * @returns
 */
export function minLength(len: number) {
  len = Math.abs(Math.round(len));
  return function (target: any, propertyName: string) {
    let value: object | string | undefined = undefined;
    Object.defineProperty(target, propertyName, {
      get: (): object | string | undefined => {
        return value;
      },
      set: (inputValue: any) => {
        if (inputValue.length === undefined) {
          throw new VError(propertyName, `Unsupported input value ${inputValue} for ${typeof target}`);
        }
        if (inputValue.length < len) {
          throw new VError(propertyName, `${propertyName} must be greater than ${len}`);
        } else {
          value = inputValue;
        }
      },
    });
  };
}
