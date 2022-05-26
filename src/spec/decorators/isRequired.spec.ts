import { required, VError } from '../../index';
describe('Required Decorator Test', () => {
  it('should pass', () => {
    expect(1 + 1).toBe(2);
  });

  it('Passing required value', () => {
    class CaseClass {
      @required()
      public check: string;
      constructor() {
        this.check = 'test';
      }
    }
    const case_instance = new CaseClass();
    expect(case_instance.check).toEqual('test');
    expect(case_instance).not.toBeUndefined();
  });

  it('Not passing required value', () => {
    class CaseClass {
      @required()
      public check: any;
      constructor() {
        this.check = undefined;
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
