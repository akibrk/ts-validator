import { VError } from '../helper/VError';

export function anyOf(params: any[]) {
  return function (target: any, propertyName: string) {
    let value: object | string | undefined = undefined;
    Object.defineProperty(target, propertyName, {
      get: (): object | string | undefined => {
        return value;
      },
      set: (inputValue: any) => {
        if (params.find((x) => x == inputValue)) {
          value = inputValue;
        } else {
          throw new VError(propertyName, 'Not supported value');
        }
      },
    });
  };
}
