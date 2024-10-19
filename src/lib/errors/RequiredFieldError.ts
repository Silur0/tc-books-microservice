import { IDomainError } from "./IDomainError";

export default class RequiredFieldError extends IDomainError {
    private static readonly _httpCode = 400;

    constructor(field: string) {
        super(
            RequiredFieldError._httpCode,
            `Invalid field ${field} is required`
        );
    }
}
