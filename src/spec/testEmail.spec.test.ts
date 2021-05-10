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
        }
    }

    const T_VALUE: any = {
        name: 'Akib'
    }

    it('should validate string requirement', ()=>{
        expect(validate(T_VALUE, T_MODEL).length).toBe(0);
    })
})
