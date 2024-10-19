export abstract class IDomainError extends Error {
    abstract statusCode: number;
}
