import {IValidateModel, Vtype, validate} from "../index"
describe('String validation', () => {
    it('should pass', ()=>{
        expect(1+1).toBe(2);
    })

    const T_MODEL: IValidateModel = {
        email:{
            type: Vtype.email,
            required: true,
            minLength: 4,
            maxLength: 100
        }
    }

    const T_VALUE: any = {
        email: 'Akib'
    }

    it('should validate email requirement', ()=>{
        const errors = validate(T_VALUE, T_MODEL);
        console.log(errors); 
        expect(errors.length).toBe(0);
    })


    


})
