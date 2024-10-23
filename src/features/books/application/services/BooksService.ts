import { AppDataSource } from "../../../../lib/database/Database";
import { Book } from "../../dal/Entities/Book";
import { BookResponse } from "./../contracts/responses/BookResponse";
import { CreateBookRequest } from "../contracts/requests/CreateBookRequest";
import EntityNotFoundError from "../../../../lib/errors/EntityNotFoundError";
import ExistingBookWithISBNError from "../errors/ExistingBookWithISBNError";
import GenerateSummaryError from "../errors/GenerateSummaryError";
import InvalidRequestError from "../../../../lib/authentication/errors/InvalidRequestError";
import { LanguageResponse } from "../contracts/responses/LanguageResponse";
import { Logger } from "../../../../lib/logger/Logger";
import { OpenAI } from "openai";
import { PaginatedResponse } from "../../../../lib/api/PaginatedResponse";
import { PublicationYearResponse } from "../contracts/responses/PublicationYearResponse";
import { Repository } from "typeorm";
import RequiredFieldError from "../../../../lib/errors/RequiredFieldError";
import { SearchBookRequest } from "../contracts/requests/SearchBookRequest";
import { UpdateBookRequest } from "../contracts/requests/UpdateBookRequest";

const openAIService = new OpenAI();

class BooksService {
    private readonly booksRepo: Repository<BookResponse> =
        AppDataSource.getRepository(Book);

    async get(): Promise<PaginatedResponse<BookResponse>> {
        let result = await this.booksRepo.find();

        let response: BookResponse[] = result.map((book) => ({
            id: book.id,
            isbn: book.isbn,
            title: book.title,
            author: book.author,
            publicationYear: book.publicationYear,
            language: book.language,
            summary: book.summary,
        }));

        return new PaginatedResponse<BookResponse>({
            page: 1,
            count: result.length,
            total: result.length,
            items: response,
        });
    }

    async getPublicationYears(): Promise<
        PaginatedResponse<PublicationYearResponse>
    > {
        let result = await this.booksRepo
            .createQueryBuilder("book")
            .select("book.publicationYear", "year")
            .distinct(true)
            .getRawMany();

        let resultSorted = result.sort(
            (a, b) => Number(b.year) - Number(a.year)
        );

        return new PaginatedResponse<PublicationYearResponse>({
            page: 1,
            count: result.length,
            total: result.length,
            items: resultSorted,
        });
    }

    async getLanguages(): Promise<PaginatedResponse<LanguageResponse>> {
        let result = await this.booksRepo
            .createQueryBuilder("book")
            .select("book.language", "language")
            .distinct(true)
            .getRawMany();

        let resultSorted = result.sort();

        return new PaginatedResponse<LanguageResponse>({
            page: 1,
            count: result.length,
            total: result.length,
            items: resultSorted,
        });
    }

    async create(req: CreateBookRequest): Promise<Book> {
        if (!req.validate()) {
            throw new InvalidRequestError();
        }

        if (!req.isbn) {
            throw new RequiredFieldError("ISBN");
        }

        let existingBook = await this.booksRepo.findOneBy({
            isbn: req.isbn,
        });

        if (existingBook) {
            throw new ExistingBookWithISBNError();
        }

        if (!req.title) {
            throw new RequiredFieldError("Title");
        }

        if (!req.author) {
            throw new RequiredFieldError("Author");
        }

        if (!req.publicationYear) {
            throw new RequiredFieldError("Publication Year");
        }

        if (!req.language) {
            throw new RequiredFieldError("Language");
        }

        let summary = await this.generateSummary(req.isbn, req.title);

        let book = new Book();

        book.isbn = req.isbn;
        book.title = req.title;
        book.author = req.author;
        book.publicationYear = req.publicationYear;
        book.language = req.language;
        book.summary = summary!;

        return await this.booksRepo.save(book);
    }

    async update(id: string, req: UpdateBookRequest): Promise<BookResponse> {
        if (!req.validate()) {
            throw new InvalidRequestError();
        }

        let numId = Number(id);

        if (Number.isNaN(numId)) {
            throw new RequiredFieldError("Id");
        }

        let book = await this.booksRepo.findOneBy({
            id: numId,
        });

        if (book == null) {
            throw new EntityNotFoundError("Book", id);
        }

        book.isbn = req.isbn ?? book.isbn;
        book.title = req.title ?? book.title;
        book.author = req.author ?? book.author;
        book.publicationYear = req.publicationYear ?? book.publicationYear;
        book.language = req.language ?? book.language;

        book = await this.booksRepo.save(book);

        let response: BookResponse = {
            id: book.id,
            isbn: book.isbn,
            title: book.title,
            author: book.author,
            publicationYear: book.publicationYear,
            language: book.language,
            summary: book.summary,
        };

        return response;
    }

    async search(
        req: SearchBookRequest
    ): Promise<PaginatedResponse<BookResponse>> {
        if (!req.validate()) {
            throw new InvalidRequestError();
        }

        const { key, years, languages } = req;

        const query = this.booksRepo.createQueryBuilder("book");

        if (years && years.length > 0) {
            query.andWhere("book.publicationYear IN (:...years)", { years });
        }

        if (languages && languages.length > 0) {
            query.andWhere("book.language IN (:...languages)", { languages });
        }

        if (key) {
            query.andWhere(
                "(book.title ILIKE :key OR book.isbn ILIKE :key OR book.author ILIKE :key)",
                { key: `%${key}%` }
            );
        }

        let result = await query.getMany();

        let response: BookResponse[] = result.map((book) => ({
            id: book.id,
            isbn: book.isbn,
            title: book.title,
            author: book.author,
            publicationYear: book.publicationYear,
            language: book.language,
            summary: book.summary,
        }));

        return new PaginatedResponse<BookResponse>({
            page: 1,
            count: result.length,
            total: result.length,
            items: response,
        });
    }

    async delete(id: string) {
        let numId = Number(id);

        if (Number.isNaN(numId)) {
            throw new RequiredFieldError("Id");
        }

        this.booksRepo.delete(numId);
    }

    private async generateSummary(isbn: string, title: string) {
        try {
            let result = await openAIService.chat.completions.create({
                model: "gpt-3.5-turbo",
                temperature: 0.7,
                max_tokens: 70,
                messages: [
                    {
                        role: "system",
                        content:
                            "You are a helpful assistant that summarizes books.",
                    },
                    {
                        role: "user",
                        content: `Write a concise 2-line summary of the book with the following details:\n\nTitle: ${title}\nISBN: ${isbn}`,
                    },
                ],
            });
            Logger.log(result, result.choices[0].message);
            return result.choices[0].message.content;
        } catch (error) {
            throw new GenerateSummaryError();
        }
    }
}

export default new BooksService();
