import { Language } from "../dal/Entities/Language";
import { PaginatedResponse } from "../../../lib/api/PaginatedResponse";
import data from "../dal/languages.json";

class LanguageService {
    async getAll(): Promise<PaginatedResponse<Language>> {
        return new PaginatedResponse<Language>({
            page: 1,
            count: data.length,
            total: data.length,
            items: data,
        });
    }
}

export default new LanguageService();
