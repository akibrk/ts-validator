import { anyOf, VError } from '../../index';
describe('AnyOf Decorator Test', () => {
  it('should pass', () => {
    expect(1 + 1).toBe(2);
  });

  it('Should allow any of number', () => {
    class CaseClass {
      @anyOf([100, 200, 400])
      public check: number;
      constructor() {
        this.check = 100;
        this.check = 200;
      }
    }
    const case_instance = new CaseClass();
    expect(case_instance.check).toEqual(200);
    expect(case_instance).not.toBeUndefined();
  });

  it('Should not allow any of number', () => {
    class CaseClass {
      @anyOf([100, 200, 400])
      public check: number;
      constructor() {
        this.check = 99;
      }
    }
    try {
      new CaseClass();
    } catch (error) {
      expect(error instanceof VError).toBeTruthy();
      expect((error as VError).field).toBe('check');
    }
  });

  it('Should allow any of string', () => {
    class CaseClass {
      @anyOf(['arvyo', 'jacks', '400'])
      public check: string;

      @anyOf(['arvyo', 'jacks', '400'])
      public checkTwo: string;
      constructor() {
        this.check = 'arvyo';
        this.checkTwo = '400';
      }
    }
    const case_instance = new CaseClass();
    expect(case_instance).not.toBeUndefined();
  });

  it('Should not allow any of string', () => {
    class CaseClass {
      @anyOf(['arvyo'])
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
