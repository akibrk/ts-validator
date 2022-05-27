import { isEmailAddress, isMobileNumber, isNullOrUndefined } from '../validator/Shared';

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

describe('Test isMobileNumber common validator', () => {
  it('should pass', () => {
    expect(1 + 1).toBe(2);
  });

  const VALID_MOBILE_NUMBER_ONE = '01911111111111';
  const VALID_MOBILE_NUMBER_TWO = '+1 883-231-111111';
  const VALID_MOBILE_NUMBER_THREE = '+1 (883)-231-111111';
  const VALID_MOBILE_NUMBER_FOUR = '+112347849334';
  const VALID_MOBILE_NUMBER_FIVE = '+1 (123)-(4784)-9334';

  const INVALID_MOBILE_NUMBER_ONE = '01';
  const INVALID_MOBILE_NUMBER_TWO = '12()';
  const INVALID_MOBILE_NUMBER_THREE = 'ab898';
  const INVALID_MOBILE_NUMBER_FOUR = '+122$898';

  it('Valid number', () => {
    expect(isMobileNumber(VALID_MOBILE_NUMBER_ONE).value).toBeTruthy();
  });

  it('Valid number', () => {
    expect(isMobileNumber(VALID_MOBILE_NUMBER_TWO).value).toBeTruthy();
  });

  it('Valid number', () => {
    expect(isMobileNumber(VALID_MOBILE_NUMBER_THREE).value).toBeTruthy();
  });

  it('Valid number', () => {
    expect(isMobileNumber(VALID_MOBILE_NUMBER_FOUR).value).toBeTruthy();
  });

  it('Valid number', () => {
    expect(isMobileNumber(VALID_MOBILE_NUMBER_FIVE).value).toBeTruthy();
  });

  it('Invalid number', () => {
    expect(isMobileNumber(INVALID_MOBILE_NUMBER_ONE).value).toBeFalsy();
  });
  it('Invalid number', () => {
    expect(isMobileNumber(INVALID_MOBILE_NUMBER_TWO).value).toBeFalsy();
  });
  it('Invalid number', () => {
    expect(isMobileNumber(INVALID_MOBILE_NUMBER_THREE).value).toBeFalsy();
  });
  it('Invalid number', () => {
    expect(isMobileNumber(INVALID_MOBILE_NUMBER_FOUR).value).toBeFalsy();
  });
});
