const Joi = require("@hapi/joi");

export class UpdateBookRequest {
    isbn: string | undefined;
    title: string | undefined;
    author: string | undefined;
    publicationYear: string | undefined;
    language: string | undefined;

    constructor({
        isbn,
        title,
        author,
        publicationYear,
        language,
    }: {
        isbn: string;
        title: string;
        author: string;
        publicationYear: string;
        language: string;
    }) {
        this.isbn = isbn;
        this.title = title;
        this.author = author;
        this.publicationYear = publicationYear;
        this.language = language;
    }

    validate(): boolean {
        const schema = Joi.object({
            isbn: Joi.string(),
            title: Joi.string(),
            author: Joi.string(),
            publicationYear: Joi.string(),
            language: Joi.string(),
        });

        const { error } = schema.validate(this);

        return !error;
    }
}
