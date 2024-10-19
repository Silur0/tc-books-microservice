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
            let result = await LanguageService.getAll();
            res.send(result);
        } catch (error) {
            next(error);
        }
    }
);

export default router;
