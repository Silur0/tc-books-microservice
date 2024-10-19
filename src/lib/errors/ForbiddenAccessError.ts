import { IDomainError } from "./IDomainError";

export default class ForbiddenAccessError extends IDomainError {
    statusCode: number;
    constructor() {
        super("Access Denied: No token provided");
        this.statusCode = 401;
    }
}
