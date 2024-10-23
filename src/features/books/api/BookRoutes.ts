import AuthMiddleware from "../../../lib/authentication/AuthMiddleware";
import BooksService from "../application/services/BooksService";
import { CreateBookRequest } from "../application/contracts/requests/CreateBookRequest";
import { Router } from "express";
import { SearchBookRequest } from "../application/contracts/requests/SearchBookRequest";
import { UpdateBookRequest } from "../application/contracts/requests/UpdateBookRequest";

const router = Router();

const PREFIX = "books";

router.get(`/${PREFIX}`, async (req, res, next) => {
    try {
        let result = await BooksService.getAll();
        res.send(result);
    } catch (error) {
        next(error);
    }
});

router.get(`/${PREFIX}/:id`, async (req, res, next) => {
    try {
        let result = await BooksService.get(req.params.id);
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

router.post(
    `/${PREFIX}`,
    AuthMiddleware.authenticateToken,
    async (req, res, next) => {
        try {
            const request = new CreateBookRequest(req.body);

            let result = await BooksService.create(request);
            res.send(result);
        } catch (error) {
            next(error);
        }
    }
);

router.put(
    `/${PREFIX}/:id`,
    AuthMiddleware.authenticateToken,
    async (req, res, next) => {
        try {
            const request = new UpdateBookRequest(req.body);

            let result = await BooksService.update(req.params.id, request);
            res.send(result);
        } catch (error) {
            next(error);
        }
    }
);

router.post(`/${PREFIX}/search`, async (req, res, next) => {
    try {
        const request = new SearchBookRequest(req.body);

        let result = await BooksService.search(request);
        res.send(result);
    } catch (error) {
        next(error);
    }
});

router.delete(
    `/${PREFIX}/:id`,
    AuthMiddleware.authenticateToken,
    async (req, res, next) => {
        try {
            await BooksService.delete(req.params.id);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
);

export default router;
