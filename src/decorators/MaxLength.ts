import { VError } from '../helper/VError';

export function maxLength(len: number) {
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
        if (inputValue.length > len) {
          throw new VError(propertyName, `${propertyName} cannot be longer than ${len} char`);
        } else {
          value = inputValue;
        }
      },
    });
  };
}
