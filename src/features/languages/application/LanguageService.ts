import { Request, Response } from "express";

import BadRequestError from "../../../lib/errors/BadRequestError";
import { Language } from "../dal/Entities/Language";

const data = require("../dal/languages.json");

class LanguageService {
    async getAll(req: Request, res: Response): Promise<Language[]> {
        throw new BadRequestError();
        res.status(200).json(data);
        return data;
    }
}

export default new LanguageService();
