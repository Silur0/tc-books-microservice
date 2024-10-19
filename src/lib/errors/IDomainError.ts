export class IDomainError extends Error {
    public readonly httpCode: number;

    constructor(httpCode: number, message: string) {
        super(message);

        Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain

        this.httpCode = httpCode;
        Error.captureStackTrace(this);
    }
}
