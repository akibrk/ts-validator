import IPropertyError from "./IPropertyError";

/**
 * Error returned after validation
 */
export default interface IValidationError{
    field: string,
    errors: Array<IPropertyError>;
}