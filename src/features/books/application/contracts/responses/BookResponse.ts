export interface BookResponse {
    id: number;
    isbn: string;
    title: string;
    author: string;
    publicationYear: string;
    language: string;
    summary?: string;
}
