import { ValidatorSchema, Type, validate } from '../index';
describe('Email validation', () => {
  it('should pass', () => {
    expect(1 + 1).toBe(2);
  });

  it('Should validate email requirement', () => {
    const T_MODEL: ValidatorSchema = {
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

    const errors = validate(T_VALUE, T_MODEL);
    expect(errors.length).toBe(0);
  });

  it('Should validate mobile number requirement', () => {
    const T_MODEL: ValidatorSchema = {
      mobile: {
        type: Type.mobile,
        required: true,
        minLength: 4,
        maxLength: 12,
      },
    };

    const T_VALUE: any = {
      mobile: '+880 1970000',
    };

    const errors = validate(T_VALUE, T_MODEL);
    expect(errors.length).toBe(0);
  });

  it('Should validate mobile number requirement (max length)', () => {
    const T_MODEL: ValidatorSchema = {
      mobile: {
        type: Type.mobile,
        required: true,
        minLength: 4,
        maxLength: 12,
      },
    };

    const T_VALUE: any = {
      mobile: '+880 1970000000',
    };

    const errors = validate(T_VALUE, T_MODEL);
    expect(errors.length).toBe(1);
  });

  it('Should validate mobile number requirement (min length)', () => {
    const T_MODEL: ValidatorSchema = {
      mobile: {
        type: Type.mobile,
        required: true,
        maxLength: 12,
      },
    };

    const T_VALUE: any = {
      mobile: '+88',
    };

    const errors = validate(T_VALUE, T_MODEL);
    expect(errors.length).toBe(1);
  });

  it('Should validate boolean error', () => {
    const T_MODEL: ValidatorSchema = {
      enable2FA: {
        type: Type.boolean,
        required: true,
      },
    };

    const T_VALUE: any = {
      enable2FA: 'string',
    };

    const errors = validate(T_VALUE, T_MODEL);
    expect(errors.length).toBe(1);
  });

  it('Should validate boolean true', () => {
    const T_MODEL: ValidatorSchema = {
      enable2FA: {
        type: Type.boolean,
        required: true,
      },
    };

    const T_VALUE: any = {
      enable2FA: true,
    };

    const errors = validate(T_VALUE, T_MODEL);
    expect(errors.length).toBe(0);
  });
});
