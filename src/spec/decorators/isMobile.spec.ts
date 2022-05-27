import { isMobile, VError } from '../../index';
describe('IsMobile Decorator Test', () => {
  it('should pass', () => {
    expect(1 + 1).toBe(2);
  });

  it('A valid number', () => {
    const VALID_MOBILE = '+880 19019';
    class CaseClass {
      @isMobile()
      public check: string;
      constructor() {
        this.check = VALID_MOBILE;
      }
    }
    const case_instance = new CaseClass();
    expect(case_instance.check).toEqual(VALID_MOBILE);
    expect(case_instance).not.toBeUndefined();
  });

  it('Valid number length', () => {
    const VALID_MOBILE = '+880 19019';
    class CaseClass {
      @isMobile(12)
      public check: string;
      constructor() {
        this.check = VALID_MOBILE;
      }
    }
    const case_instance = new CaseClass();
    expect(case_instance.check).toEqual(VALID_MOBILE);
    expect(case_instance).not.toBeUndefined();
  });

  it('Invalid number length', () => {
    const VALID_MOBILE = '+880 19019';
    class CaseClass {
      @isMobile(6)
      public check: string;
      constructor() {
        this.check = VALID_MOBILE;
      }
    }
    try {
      new CaseClass();
    } catch (error) {
      expect(error instanceof VError).toBeTruthy();
      expect((error as VError).field).toBe('check');
    }
  });

  it('An invalid number', () => {
    class CaseClass {
      @isMobile()
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
