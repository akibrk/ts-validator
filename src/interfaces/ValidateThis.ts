import { Type } from '../types';

export interface ValidateThis {
  type: Type;
  required?: boolean;
  allowNull?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}
