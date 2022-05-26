import { maxLength, VError } from '../../index';
describe('MaxLength Decorator Test', () => {
  it('should pass', () => {
    expect(1 + 1).toBe(2);
  });

  it('Check max pass ', () => {
    class CaseClass {
      @maxLength(100)
      public check: string;
      @maxLength(100)
      public checkArray: Array<string>;
      constructor() {
        this.check = 'test';
        this.checkArray = ['test'];
      }
    }
    const case_instance = new CaseClass();
    expect(case_instance.check).toEqual('test');
    expect(case_instance).not.toBeUndefined();
  });

  it('Check max fail ', () => {
    class CaseClass {
      @maxLength(0)
      public check: string;
      @maxLength(0)
      public checkMinArray: Array<string>;
      constructor() {
        this.check = 'test';
        this.checkMinArray = ['test'];
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
