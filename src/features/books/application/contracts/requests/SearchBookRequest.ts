const Joi = require("@hapi/joi");

export class SearchBookRequest {
    key?: string;
    years?: string[];
    languages?: string[];

    constructor({
        key,
        years,
        languages,
    }: {
        key: string;
        years: string[];
        languages: string[];
    }) {
        this.key = key;
        this.years = years;
        this.languages = languages;
    }

    validate(): boolean {
        const schema = Joi.object({
            key: Joi.string(),
            years: Joi.array().items(Joi.string()),
            languages: Joi.array().items(Joi.string()),
        });

        const { error } = schema.validate(this);

        return !error;
    }
}
