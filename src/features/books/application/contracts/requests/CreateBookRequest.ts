const Joi = require("@hapi/joi");

export class CreateBookRequest {
    isbn: string;
    title: string;
    author: string;
    publicationYear: string;
    language: string;

    constructor(
        isbn: string,
        title: string,
        author: string,
        publicationYear: string,
        language: string
    ) {
        this.isbn = isbn;
        this.title = title;
        this.author = author;
        this.publicationYear = publicationYear;
        this.language = language;
    }

    validate(): boolean {
        const schema = Joi.object({
            isbn: Joi.string().required(),
            title: Joi.string().required(),
            author: Joi.string().required(),
            publicationYear: Joi.string().required(),
            language: Joi.string().required(),
        });

        const { error } = schema.validate(this);

        return !error;
    }
}
