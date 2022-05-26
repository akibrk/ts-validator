import { ValidationRule } from './ValidationRule';

export interface ValidatorSchema {
  [key: string]: ValidationRule;
}
