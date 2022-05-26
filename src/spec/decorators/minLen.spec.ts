import { minLength, VError } from '../../index';
describe('MinLength Decorator Test', () => {
  it('should pass', () => {
    expect(1 + 1).toBe(2);
  });

  it('Check min pass ', () => {
    class CaseClass {
      @minLength(2)
      public checkMin: string;
      @minLength(1)
      public checkMinArray: Array<string>;
      constructor() {
        this.checkMin = 'test';
        this.checkMinArray = ['test'];
      }
    }
    const case_instance = new CaseClass();
    expect(case_instance).not.toBeUndefined();
  });

  it('Check min fail ', () => {
    class CaseClass {
      @minLength(100)
      public checkMin: string;
      @minLength(100)
      public checkMinArray: Array<string>;
      constructor() {
        this.checkMin = 'test';
        this.checkMinArray = ['test'];
      }
    }
    try {
      new CaseClass();
    } catch (error) {
      expect(error instanceof VError).toBeTruthy();
      expect((error as VError).field).toBe('checkMin');
    }
  });
});
