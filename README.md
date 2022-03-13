# Validatets

Validate typescript based on models/schema object.

## Warning

This is not production ready.

## Usage

```ts
import { ValidateModel, Type, ValidationError, validate } from '@akibkhan/validatets';

const registerForm: ValidateModel = {
  username: {
    type: Type.string,
    minLength: 4,
    maxLength: 50,
  },
  password: {
    type: Type.string,
    minLength: 6,
  },
  email: {
    type: Type.email,
    maxLength: 100,
  },
};

const formData: any = {
  username: 'akibrk',
  password: '123456',
  email: 'me@invalid@email.com',
};

validate(formData, registerForm);
```
