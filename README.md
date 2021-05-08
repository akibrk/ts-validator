# Validatets
Validate typescript based on models/schema object.


## Usage

```ts
import {IValidateModel, Vtype, IValidationError, validate} from '@akibkhan/validatets'

const registerForm: IValidateModel = {
    username: {
        type: Vtype.string,
        minLength: 4,
        maxLength: 50
    },
    password:{
        type: Vtype.string,
        minLength: 6
    },
    email:{
        type: Vtype.email,
        maxLength: 100 
    }
}

const formData: any = {
    username: 'akibrk',
    password: '123456',
    email: 'me@invalid@email.com'
}

validate(formData, registerForm)

```


## Note
This is not meant to be used for production, this is just a educational package.