import { VError } from '../helper/VError';

/**
 * Between a range of number values
 * @param min
 * @param max
 * @returns
 */
export function between(min: number, max: number) {
  return function (target: any, propertyName: string) {
    let value: number | undefined = undefined;
    Object.defineProperty(target, propertyName, {
      get: (): number | undefined => {
        return value;
      },
      set: (inputValue: any) => {
        if (inputValue === undefined) {
          throw new VError(propertyName, `Unsupported input value ${inputValue} for ${typeof target}`);
        }
        if (inputValue < min || inputValue > max) {
          throw new VError(propertyName, `${propertyName} must be between ${min}, ${max}`);
        } else {
          value = inputValue;
        }
      },
    });
  };
}
