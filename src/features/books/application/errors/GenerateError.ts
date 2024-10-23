import { IDomainError } from "../../../../lib/errors/IDomainError";

export default class GenerateError extends IDomainError {
    private static readonly _httpCode = 400;

    constructor(value: string) {
        super(
            GenerateError._httpCode,
            `An error occurred while generating the ${value}`
        );
    }
}
