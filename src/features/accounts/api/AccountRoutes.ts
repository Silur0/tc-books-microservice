import AccountService from "../application/services/AccountService";
import { Router } from "express";

const router = Router();

const PREFIX = "accounts";

router.post(`/${PREFIX}/register`, async (req, res, next) => {
    try {
        await AccountService.register(req.body);
        res.status(201);
    } catch (error) {
        next(error);
    }
});

router.post(`/${PREFIX}/login`, async (req, res, next) => {
    try {
        let result = await AccountService.login(req.body);
        res.status(201).send(result);
    } catch (error) {
        next(error);
    }
});

export default router;
