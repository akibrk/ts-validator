import { Type, Validator } from '../index';
describe('Class Validator', () => {
  it('should pass', () => {
    expect(1 + 1).toBe(2);
  });

  class Login {
    public email: string = '';
    public password: string = '';
  }

  const loginValidator = new Validator<Login>({
    email: {
      type: Type.string,
      required: true,
    },
    password: {
      type: Type.string,
    },
  });

  interface Product {
    name: string;
    tags: string[];
  }

  const productValidator = new Validator<Product>({
    name: {
      type: Type.string,
      required: true,
    },
    tags: {
      type: Type.array,
      required: true,
      maxLength: 2,
      minLength: 1,
    },
  });

  const A_PRODUCT: Product = {
    name: 'krisiponno',
    tags: ['agriculture', 'food'],
  };

  const B_PRODUCT: Product = {
    name: 'krisiponno',
    tags: ['agriculture', 'food', 'delivery'],
  };

  it('Checks missing properties', () => {
    expect(loginValidator.isValid({})).toBeFalsy();
    expect(loginValidator.isValid({ email: 'akib' })).toBeFalsy();
  });

  it('Valid login model', () => {
    expect(loginValidator.validate({ email: 'akib', password: 'test' }).length).toBe(0);
    expect(loginValidator.isValid({ email: 'akib', password: 'test' })).toBeTruthy();
  });

  it('Login has one error', () => {
    expect(loginValidator.validate({ email: 'akib', password: null }).length).toBe(1);
    expect(loginValidator.isValid({ email: 'akib', password: null })).toBeFalsy();
  });

  it('Product has array of tags', () => {
    expect(productValidator.validate(A_PRODUCT).length).toBe(0);
    expect(productValidator.isValid(A_PRODUCT)).toBeTruthy();
  });

  it('Product has more than max tags', () => {
    expect(productValidator.validate(B_PRODUCT).length).toBe(1);
    expect(productValidator.isValid(B_PRODUCT)).toBeFalsy();
  });
});
