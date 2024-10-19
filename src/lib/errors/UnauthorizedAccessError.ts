import { IDomainError } from "./IDomainError";

export default class UnauthorizedAccessError extends IDomainError {
    statusCode: number;
    constructor() {
        super("Invalid or expired token");
        this.statusCode = 403;
    }
}
