import { VError } from '../helper/VError';

export function minLength(len: number) {
  return function (target: any, propertyName: string) {
    let value: object | string | undefined = undefined;
    Object.defineProperty(target, propertyName, {
      get: (): object | string | undefined => {
        return value;
      },
      set: (inputValue: any) => {
        if (target.length === undefined) {
          throw new VError(propertyName, `This validator is not supported for ${typeof target}`);
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
