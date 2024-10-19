import { IDomainError } from "../../../../lib/errors/IDomainError";

export default class ExistingBookWithISBNError extends IDomainError {
    private static readonly _httpCode = 400;

    constructor() {
        super(
            ExistingBookWithISBNError._httpCode,
            "There is already a book with the same ISBN"
        );
    }
}
