import { validateThis } from '../validator';
import { VError } from '../helper/VError';
import { ValidationError, ValidationRule } from '../interfaces';
import { Type } from '../types';
import { isEmailAddress } from './common';

type Rule<T> = {
  [key in keyof T]: ValidationRule;
};
export class Validator<T> {
  private rules: Rule<T>;
  constructor(rules: Rule<T>) {
    this.rules = rules;
  }
  public validate(payload: any) {
    let errors: ValidationError[] = [];

    for (let prop in this.rules) {
      const propError = validateThis(payload[prop], prop, this.rules[prop]);
      if (propError && propError.errors.length) {
        errors.push(propError);
      }
    }
    console.log(JSON.stringify(errors));
  }
}

class Login {
  public email: string = '';
  public password: string = '';
}

const loginValidator = new Validator<Login>({
  email: {
    type: Type.string,
    required: true,
  },
  password: {
    type: Type.string,
  },
});

loginValidator.validate({
  email: 'null',
});
