import { IDomainError } from "./IDomainError";

export default class BadRequestError extends IDomainError {
    statusCode: number;
    constructor() {
        super("bad request");
        this.statusCode = 400;
    }
}
