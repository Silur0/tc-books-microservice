import { IDomainError } from "../../errors/IDomainError";

export default class UnauthorizedAccessError extends IDomainError {
    private static readonly _httpCode = 401;

    constructor() {
        super(UnauthorizedAccessError._httpCode, "Invalid or expired token");
    }
}
