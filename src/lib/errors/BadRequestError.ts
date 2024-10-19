import { IDomainError } from "./IDomainError";

export default class BadRequestError extends IDomainError {
    private static readonly _httpCode = 400;

    constructor() {
        super(BadRequestError._httpCode, "Bad request");
    }
}
