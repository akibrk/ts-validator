import { isEmail, VError } from '../../index';
describe('IsEmail Decorator Test', () => {
  it('should pass', () => {
    expect(1 + 1).toBe(2);
  });

  it('A valid email', () => {
    class CaseClass {
      @isEmail()
      public check: string;
      constructor() {
        this.check = 'test@akibrk.com';
      }
    }
    const case_instance = new CaseClass();
    expect(case_instance.check).toEqual('test@akibrk.com');
    expect(case_instance).not.toBeUndefined();
  });

  it('Valid email length', () => {
    const EMAIL = 't@akibrk.com';
    class CaseClass {
      @isEmail(12)
      public check: string;
      constructor() {
        this.check = EMAIL;
      }
    }
    const case_instance = new CaseClass();
    expect(case_instance.check).toEqual(EMAIL);
    expect(case_instance).not.toBeUndefined();
  });

  it('Invalid email length', () => {
    const EMAIL = 't@akibrk.com';
    class CaseClass {
      @isEmail(6)
      public check: string;
      constructor() {
        this.check = EMAIL;
      }
    }
    try {
      new CaseClass();
    } catch (error) {
      expect(error instanceof VError).toBeTruthy();
      expect((error as VError).field).toBe('check');
    }
  });

  it('An invalid email', () => {
    class CaseClass {
      @isEmail()
      public check: string;
      constructor() {
        this.check = 'test';
      }
    }
    try {
      new CaseClass();
    } catch (error) {
      expect(error instanceof VError).toBeTruthy();
      expect((error as VError).field).toBe('check');
    }
  });
});
