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

router.post(`/${PREFIX}`, async (req, res, next) => {
    try {
        let result = await BooksService.create(req.body);
        res.send(result);
    } catch (error) {
        next(error);
    }
});

router.put(`/${PREFIX}/:id`, async (req, res, next) => {
    try {
        let result = await BooksService.update(req.params.id, req.body);
        res.send(result);
    } catch (error) {
        next(error);
    }
});

export default router;
