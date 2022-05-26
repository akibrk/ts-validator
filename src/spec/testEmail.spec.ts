import { ValidateModel, Type, validate } from '../index';
describe('Email validation', () => {
  it('should pass', () => {
    expect(1 + 1).toBe(2);
  });

  const T_MODEL: ValidateModel = {
    email: {
      type: Type.email,
      required: true,
      minLength: 4,
      maxLength: 100,
    },
  };

  const T_VALUE: any = {
    email: 'akib@xnzark.com',
  };

  it('should validate email requirement', () => {
    const errors = validate(T_VALUE, T_MODEL);
    expect(errors.length).toBe(0);
  });
});
