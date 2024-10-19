import { IDomainError } from "../../../../lib/errors/IDomainError";

export default class UsernameAlreadyTakenError extends IDomainError {
    private static readonly _httpCode = 400;

    constructor() {
        super(UsernameAlreadyTakenError._httpCode, "Username is already taken");
    }
}
