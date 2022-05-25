import { minLength, ValidationError, VError } from '../index';
describe('String validation', () => {
  it('should pass', () => {
    expect(1 + 1).toBe(2);
  });

  class TestDecorator {
    @minLength(2)
    public checkMinPass: string;
    @minLength(100)
    public checkMinFail: string;

    @minLength(1)
    public checkMinArrayPass: Array<string>;
    @minLength(100)
    public checkMinArrayFail: Array<string>;

    constructor() {
      this.checkMinPass = 'test';
      this.checkMinFail = 'test';
      this.checkMinArrayFail = ['test'];
      this.checkMinArrayPass = ['test'];
    }
  }

  it('Should fail ', () => {
    try {
      const TEST_INSTANCE = new TestDecorator();
    } catch (error) {
      if (error instanceof VError) {
        console.log(error);
      } else {
        console.error(error);
      }
    }
  });
});
