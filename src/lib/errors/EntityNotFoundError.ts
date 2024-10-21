import { IDomainError } from "./IDomainError";

export default class EntityNotFoundError extends IDomainError {
    private static readonly _httpCode = 400;

    constructor(entity: string, id: string) {
        super(
            EntityNotFoundError._httpCode,
            `Entity ${entity} not found with id: ${id}`
        );
    }
}
