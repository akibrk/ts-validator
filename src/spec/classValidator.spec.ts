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

  it('Checks missing properties', () => {
    expect(loginValidator.isValid({})).toBeFalsy();
    expect(loginValidator.isValid({ email: 'akib' })).toBeFalsy();
  });

  it('Has no error', () => {
    expect(loginValidator.validate({ email: 'akib', password: 'test' }).length).toBe(0);
    expect(loginValidator.isValid({ email: 'akib', password: 'test' })).toBeTruthy();
  });

  it('Has one error', () => {
    expect(loginValidator.validate({ email: 'akib', password: null }).length).toBe(1);
    expect(loginValidator.isValid({ email: 'akib', password: null })).toBeFalsy();
  });
});
