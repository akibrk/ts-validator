export function anyOf(params: []) {
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
          throw new Error('Not supported value');
        }
      },
    });
  };
}
