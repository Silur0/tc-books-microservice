export class PublicationYearResponse {
    year: string;

    constructor({ year }: { year: string }) {
        this.year = year;
    }
}
