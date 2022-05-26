import { ValidationRule } from './ValidationRule';

export interface ValidateModel {
  [name: string]: ValidationRule;
}
