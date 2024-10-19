import { NextFunction, Request, Response } from "express";

import ForbiddenAccessError from "../errors/ForbiddenAccessError";
import UnauthorizedAccessError from "../errors/UnauthorizedAccessError";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

class AuthMiddleware {
    authenticateToken = (req: Request, res: Response, next: NextFunction) => {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(" ")[1];

        if (!token) {
            throw new ForbiddenAccessError();
        }

        try {
            const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };
            req.body.userId = decoded.userId;
            next();
        } catch (err) {
            throw new UnauthorizedAccessError();
        }
    };
}

export default new AuthMiddleware();
