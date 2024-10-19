import { IDomainError } from "../../../../lib/errors/IDomainError";

export default class GenerateSummaryError extends IDomainError {
    private static readonly _httpCode = 400;

    constructor() {
        super(
            GenerateSummaryError._httpCode,
            "An error occurred while generating the summary"
        );
    }
}
