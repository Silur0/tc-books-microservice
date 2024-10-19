import AccountService from "../application/services/AccountService";
import { Router } from "express";

const router = Router();

const PREFIX = "accounts";

router.post(`/${PREFIX}/register`, async (req, res) => {
    AccountService.register(req, res);
});

router.post(`/${PREFIX}/login`, async (req, res) => {
    AccountService.login(req, res);
});

export default router;
