import { IDomainError } from "../../../../lib/errors/IDomainError";

export default class InvalidLoginError extends IDomainError {
    private static readonly _httpCode = 400;

    constructor() {
        super(InvalidLoginError._httpCode, "Invalid username or password");
    }
}
