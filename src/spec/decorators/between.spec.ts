import { between, VError } from '../../index';
describe('Between Decorator Test', () => {
  it('should pass', () => {
    expect(1 + 1).toBe(2);
  });

  const AMOUNT = 13;

  it('Check min-max pass ', () => {
    class CaseClass {
      @between(1, 122.33)
      public check: number;
      constructor() {
        this.check = AMOUNT;
      }
    }
    const case_instance = new CaseClass();
    expect(case_instance.check).toEqual(AMOUNT);
    expect(case_instance).not.toBeUndefined();
  });

  it('Check min-max fail ', () => {
    class CaseClass {
      @between(0, 2)
      public check: number;
      constructor() {
        this.check = AMOUNT;
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
