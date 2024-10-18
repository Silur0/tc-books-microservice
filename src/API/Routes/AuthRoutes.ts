import { login, register } from "../../Application/Services/AuthServices";

import { Router } from "express";

const router = Router();

router.post("/register", async (req, res) => {
    register(req, res)
});

router.post("/login", async (req, res) => {
    login(req, res)
});

export default router