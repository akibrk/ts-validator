import { Type } from '../types';

export interface ValidationRule {
  type: Type;
  required?: boolean;
  allowNull?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}
