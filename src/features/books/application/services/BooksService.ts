import { AppDataSource } from "../../../../lib/database/Database";
import { Book } from "../../dal/Entities/Book";
import { CreateBookRequest } from "../contracts/requests/CreateBookRequest";
import { Language } from "./../../../languages/dal/Entities/Language";
import { PaginatedResponse } from "../../../../lib/api/PaginatedResponse";
import { Repository } from "typeorm";
import RequiredFieldError from "../../../../lib/errors/RequiredFieldError";

class BooksService {
    private readonly booksRepo: Repository<Book> =
        AppDataSource.getRepository(Book);

    async get(): Promise<PaginatedResponse<Book>> {
        let result = await this.booksRepo.find();
        return new PaginatedResponse<Book>({
            page: 1,
            count: result.length,
            total: result.length,
            items: result,
        });
    }

    async create(req: CreateBookRequest): Promise<Book> {
        if (!req.isbn) {
            throw new RequiredFieldError("ISBN");
        }

        if (!req.title) {
            throw new RequiredFieldError("Title");
        }

        if (!req.publicationYear) {
            throw new RequiredFieldError("Publication Year");
        }

        if (!req.language) {
            throw new RequiredFieldError("Language");
        }

        return new Book();
    }
}

export default new BooksService();
