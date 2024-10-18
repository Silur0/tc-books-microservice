import { login, register } from "../application/services/AuthServices";

import { Router } from "express";

const router = Router();

router.post("/register", async (req, res) => {
    register(req, res)
});

router.post("/login", async (req, res) => {
    login(req, res)
});

export default router