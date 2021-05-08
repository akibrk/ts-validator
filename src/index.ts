import IValidateModel from 'interfaces/IValidateModel';
import IValidateThis from './interfaces/IValidateThis';
import IValidationError from './interfaces/IValidationError';
import { Vtype } from './types/vt';



function validateThis(obj: any, propName:string, model: IValidateThis): IValidationError | undefined{
    let vError: IValidationError = {
        field: propName,
        errors:[]
    };

    // If there isn't a rule defined for the property ignore it
    if(!model){
        return model;
    }

    if(model.allowNull){
        return undefined;
    }
    
    if(model.required){
        if(typeof obj === undefined || typeof obj === null){
            vError.errors.push({
                message: `Field is required, missing field: ${propName}`
            })
        }
    }


    switch(model.type){
        case Vtype.email: 
            if(typeof obj !== Vtype.string){
                vError.errors.push({
                    message: `Invalid type, expected ${model.type} got ${typeof obj}`
                })
            }else{
                obj = obj.trim();
                
                const objArr = obj.split('@');
                
                if(objArr.length !== 2){
                    vError.errors.push({
                        message: `Invalid ${model.type} address`
                    })
                }else if(!objArr[0].length || !(objArr[1].length >= 3)){
                    vError.errors.push({
                        message: `Invalid ${model.type} address, might be missing username or domain`
                    })
                }

                if(model.minLength){
                    if(obj.length < model.minLength){
                        vError.errors.push({
                            message: `Invalid ${model.type} address, must be equal or longer than ${model.minLength}`
                        })
                    }
                }
                if(model.maxLength){
                    if(obj.length > model.maxLength){
                        vError.errors.push({
                            message: `Invalid ${model.type} address, must be equal or shorter than ${model.maxLength}`
                        })
                    }
                }
            }
            break;
        default:
            if(model.type !== typeof obj){
                vError.errors.push({
                    message: `Invalid type, expected ${model.type} got ${obj === null ? 'null' : typeof obj}`
                })
            }else{
                if(model.type === Vtype.string){
                    if(model.minLength){
                        if(obj.length < model.minLength){
                            vError.errors.push({
                                message: `Invalid '${propName}', must be equal or longer than ${model.minLength}`
                            })
                        }
                    }
                    
                    if(model.maxLength){
                        if(obj.length > model.maxLength){
                            vError.errors.push({
                                message: `Invalid '${propName}', must be equal or shorter than ${model.maxLength}`
                            })
                        }
                    }
                }else if(model.type === Vtype.number){
                    if(model.min){
                        if(obj < model.min){
                            vError.errors.push({
                                message: `Invalid '${propName}', must be equal or larger than ${model.min}`
                            })
                        }
                    }
                    
                    if(model.max){
                        if(obj > model.max){
                            vError.errors.push({
                                message: `Invalid '${propName}', must be equal or less than ${model.max}`
                            })
                        }
                    }
                }
            }

    }

    return vError;
}


export function validate(obj: any, model: IValidateModel): IValidationError[]{
    let errors: IValidationError[] = [];

    for(let prop in obj){
        const propError = validateThis(obj[prop], prop ,model[prop]);

        if(propError && propError.errors.length){
            errors.push(propError);
        }
    }

    return errors;
}

  