export enum Type {
  string = 'string',
  number = 'number',
  email = 'email',
  object = 'object',
}

export type ValidationResult = {
  value: boolean;
  error?: string;
  errors?: string[];
};
