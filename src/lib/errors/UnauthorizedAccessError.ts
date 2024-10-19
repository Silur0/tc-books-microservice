import { IDomainError } from "./IDomainError";

export default class UnauthorizedAccessError extends IDomainError {
    private static readonly _httpCode = 400;

    constructor() {
        super(UnauthorizedAccessError._httpCode, "Invalid or expired token");
    }
}
