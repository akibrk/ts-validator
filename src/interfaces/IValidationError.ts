import IPropertyError from "./IPropertyError";

export default interface IValidationError{
    field: string,
    errors: Array<IPropertyError>;
}