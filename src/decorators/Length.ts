export function length(minLen: number, maxLen: number) {
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
        if (inputValue.length < minLen || inputValue.length > maxLen) {
          throw new Error(`${propertyName} must be between ${minLen}, ${maxLen}`);
        } else {
          value = inputValue;
        }
      },
    });
  };
}
