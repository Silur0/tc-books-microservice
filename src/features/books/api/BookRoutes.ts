import BooksService from "../application/services/BooksService";
import { CreateBookRequest } from "../application/contracts/requests/CreateBookRequest";
import { Router } from "express";
import { UpdateBookRequest } from "../application/contracts/requests/UpdateBookRequest";

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

router.get(`/${PREFIX}/years`, async (req, res, next) => {
    try {
        let result = await BooksService.getPublicationYears();
        res.send(result);
    } catch (error) {
        next(error);
    }
});

router.get(`/${PREFIX}/languages`, async (req, res, next) => {
    try {
        let result = await BooksService.getLanguages();
        res.send(result);
    } catch (error) {
        next(error);
    }
});

router.post(`/${PREFIX}`, async (req, res, next) => {
    try {
        const { isbn, title, author, publicationYear, language } = req.body;
        const request = new CreateBookRequest(
            isbn,
            title,
            author,
            publicationYear,
            language
        );

        let result = await BooksService.create(request);
        res.send(result);
    } catch (error) {
        next(error);
    }
});

router.put(`/${PREFIX}/:id`, async (req, res, next) => {
    try {
        const { isbn, title, author, publicationYear, language } = req.body;
        const request = new UpdateBookRequest(
            isbn,
            title,
            author,
            publicationYear,
            language
        );

        let result = await BooksService.update(req.params.id, request);
        res.send(result);
    } catch (error) {
        next(error);
    }
});

export default router;
