import { length, VError } from '../../index';
describe('Length Decorator Test', () => {
  it('should pass', () => {
    expect(1 + 1).toBe(2);
  });

  it('Check min-max pass ', () => {
    class CaseClass {
      @length(1, 12)
      public check: string;
      @length(1, 12)
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

  it('Check min-max fail ', () => {
    class CaseClass {
      @length(0, 0)
      public check: string;
      @length(0, 0)
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
