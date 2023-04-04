# Validator

Validate typescript based on schema, class models or decorators!

## Release Notes

[Read here](./CHANGELOG.md)

## Usage

There are three main strategies for validation currently available in this library,

1. Schema Based
2. Class Decorator Based
3. Class Model Based

---

### 1. Schema Based

```ts
import { ValidatorSchema, Type, ValidationError, validate } from '@akibrk/validator';

const registerForm: ValidatorSchema = {
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

### 2. Decorator Based

Before using decorators please check your ts.config file to see if the decorator is enabled under compiler options `"experimentalDecorators": true`

As of May,22 it's still in experimental flag.

**Limitations**: You cannot apply multiple decorator to same property at the moment, I will try to get that working next.

```ts
import { between, isEmail, required } from '@akibrk/validator';
class CaseClass {
  @between(1, 122.33)
  public check: number;

  @isEmail()
  public email: string;

  @required()
  public acceptTerms: boolean;

  constructor() {
    this.check = AMOUNT;
    this.email = 'contact@akibrk.com';
    this.acceptTerms = true;
  }
}
```

#### Available decorators

- required
- isEmail
- between
- minLength
- maxLength
- length
- isMobile

---

### 3. Class Model/ Interface

```ts
import { Validator } from '@akibrk/validator';

class Login {
  public email: string = '';
  public password: string = '';
}

// Or

interface ILogin {
  email: string;
  password: string;
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
```
