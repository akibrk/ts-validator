import { VError } from '../helper/VError';

/**
 * Makes sure a value exists
 * @returns
 */
export function required() {
  return function (target: any, propertyName: string) {
    let value: object | string | number | boolean;
    Object.defineProperty(target, propertyName, {
      get: (): any => {
        return value;
      },
      set: (inputValue: any) => {
        if (typeof inputValue === 'undefined' || inputValue === null || inputValue === undefined) {
          throw new VError(propertyName, 'This is required');
        } else {
          value = inputValue;
        }
      },
    });
  };
}
