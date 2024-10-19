import AuthMiddleware from "../../../lib/authentication/AuthMiddleware";
import LanguageService from "../application/LanguageService";
import { Router } from "express";

const router = Router();

const PREFIX = "languages";

router.get(
    `/${PREFIX}`,
    AuthMiddleware.authenticateToken,
    async (req, res, next) => {
        try {
            await LanguageService.getAll(req, res);
        } catch (error) {
            next(error);
        }
    }
);

export default router;
