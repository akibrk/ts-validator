export enum Type {
  boolean = 'boolean',
  string = 'string',
  number = 'number',
  email = 'email',
  object = 'object',
  array = 'array',
  mobile = 'mobile',
}

export type ValidationResult = {
  value: boolean;
  error?: string;
  errors?: string[];
};
