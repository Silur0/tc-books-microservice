import { NextFunction, Request, Response } from "express";

import ForbiddenAccessError from "./errors/ForbiddenAccessError";
import UnauthorizedAccessError from "./errors/UnauthorizedAccessError";
import { User } from "../../features/accounts/dal/Entities/User";
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
            jwt.verify(token, JWT_SECRET);
            next();
        } catch (err) {
            throw new UnauthorizedAccessError();
        }
    };

    generateToken = (user: User) => {
        const token = jwt.sign(
            {
                userId: user.id,
                username: user.username,
            },
            JWT_SECRET,
            {
                expiresIn: "1h",
            }
        );
        return token;
    };
}

export default new AuthMiddleware();
