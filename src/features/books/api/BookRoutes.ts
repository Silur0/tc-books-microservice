import BooksService from "../application/services/BooksService";
import { Router } from "express";

const router = Router();

const PREFIX = "books";

router.get(`/${PREFIX}`, async (req, res, next) => {
    try {
        let result = await BooksService.get();
        res.send(result);
    } catch (error) {
        next(error);
    }
});

export default router;
