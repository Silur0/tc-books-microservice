import { IDomainError } from "../../errors/IDomainError";

export default class InvalidRequestError extends IDomainError {
    private static readonly _httpCode = 400;

    constructor() {
        super(InvalidRequestError._httpCode, "Invalid request");
    }
}
