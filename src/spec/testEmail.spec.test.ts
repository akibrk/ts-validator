import {validate} from '../validator'
import {IValidateModel} from '../interfaces'
import { Vtype } from '../types/vt';
describe('String validation', () => {
    it('should pass', ()=>{
        expect(1+1).toBe(2);
    })

    const T_MODEL: IValidateModel = {
        name:{
            type: Vtype.string,
            required: true,
            minLength: 4,
            maxLength: 100
        }
    }

    const T_VALUE: any = {
        email: 'Akib'
    }

    it('should validate email requirement', ()=>{
        expect(validate(T_VALUE, T_MODEL).length).toBe(0);
    })


    


})
