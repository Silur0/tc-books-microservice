import { IDomainError } from "./IDomainError";

export default class ForbiddenAccessError extends IDomainError {
    private static readonly _httpCode = 400;

    constructor() {
        super(
            ForbiddenAccessError._httpCode,
            "Access Denied: No token provided"
        );
    }
}
