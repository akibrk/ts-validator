import { VError } from '../helper/VError';

/**
 * Set the maximum length limit
 * @param len maximum length of a string or array
 * @returns
 */
export function maxLength(len: number) {
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
        if (inputValue.length > len) {
          throw new VError(propertyName, `${propertyName} cannot be longer than ${len} char`);
        } else {
          value = inputValue;
        }
      },
    });
  };
}
