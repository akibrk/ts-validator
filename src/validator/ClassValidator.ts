import { ValidationError, ValidationRule } from '../interfaces';
import { validateRule } from './Shared';

type Rule<T> = {
  [key in keyof T]: ValidationRule;
};
export class Validator<T> {
  private rules: Rule<T>;
  constructor(rules: Rule<T>) {
    this.rules = rules;
  }

  /**
   * Validate payload against the model and return the errors
   * @param payload to validate
   * @description Returns empty array if there are no errors
   * @returns ValidationError[]
   */
  public validate(payload: any): ValidationError[] {
    let errors: ValidationError[] = [];

    for (let prop in this.rules) {
      const propError = validateRule(payload[prop], prop, this.rules[prop]);
      if (propError) {
        errors.push(propError);
      }
    }
    return errors;
  }

  /**
   * Check whether a payload is valid or not
   * @param payload to validate
   * @returns bo0lean
   */
  public isValid(payload: any): boolean {
    return this.validate(payload).length <= 0;
  }
}
