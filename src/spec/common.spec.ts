import { isEmailAddress, isNullOrUndefined } from '../validator/common';

describe('Test isEmailAddress common validator', () => {
  it('should pass', () => {
    expect(1 + 1).toBe(2);
  });

  const VALID_EMAIL = 'akib@akibrk.com';
  const INVALID_EMAIL = 'akib@';
  const INVALID_EMAIL_LENGTH = 'ad';
  const UNDEFINED_EMAIL: string = undefined as any;

  it('Should be a valid email', () => {
    expect(isEmailAddress(VALID_EMAIL).value).toBeTruthy();
  });

  it('Should be an invalid email', () => {
    expect(isEmailAddress(INVALID_EMAIL).value).toBeFalsy();
  });

  it('Should be an invalid by length', () => {
    expect(isEmailAddress(INVALID_EMAIL_LENGTH).value).toBeFalsy();
  });

  it('Should be undefined email', () => {
    expect(isEmailAddress(UNDEFINED_EMAIL).value).toBeFalsy();
  });
});

describe('Test isNullOrUndefined common validator', () => {
  it('should pass', () => {
    expect(1 + 1).toBe(2);
  });

  it('Should be null', () => {
    expect(isNullOrUndefined(null).value).toBeTruthy();
  });

  it('Should undefined', () => {
    expect(isNullOrUndefined(undefined).value).toBeTruthy();
  });

  it('Should not be undefined string', () => {
    expect(isNullOrUndefined('test').value).toBeFalsy();
  });

  it('Should not be undefined object', () => {
    expect(isNullOrUndefined({}).value).toBeFalsy();
  });
});
