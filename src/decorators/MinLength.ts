export function minLength(len: number) {
  return function (target: any, propertyName: string) {
    let value: object | string | undefined = undefined;
    Object.defineProperty(target, propertyName, {
      get: (): object | string | undefined => {
        return value;
      },
      set: (inputValue: any) => {
        if (target.length === undefined) {
          throw new Error(`This validator is not supported for ${typeof target}`);
        }
        if (inputValue.length < len) {
          throw new Error(`${propertyName} must be greater than ${len}`);
        } else {
          value = inputValue;
        }
      },
    });
  };
}
