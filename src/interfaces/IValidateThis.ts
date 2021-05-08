import { Vtype } from "../types/vt";

export default interface IValidateThis{
    type: Vtype,
    required?: boolean,
    allowNull?: boolean,
    minLength?: number,
    maxLength?: number,
    min?: number,
    max?: number
}