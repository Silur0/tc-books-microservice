import { Request, Response } from "express";
import { User, UserRole } from "../../dal/Entities/User";

import { AppDataSource } from "../../../../lib/database/Database";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

class AccountService {
    async register(req: Request, res: Response): Promise<void> {
        const { username, password } = req.body;

        try {
            const existingUser = await AppDataSource.manager.findOneBy(User, {
                username,
            });
            if (existingUser) {
                res.status(400).json({ message: "User already exists" });
                return;
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const user = new User();
            user.username = username;
            user.password = hashedPassword;
            user.userRole = UserRole.ADMIN;

            await AppDataSource.manager.save(user);

            res.status(201).json({ message: "User registered successfully" });
        } catch (error) {
            res.status(500).json({ message: "Error registering user" });
        }
    }

    async login(req: Request, res: Response): Promise<void> {
        const { username, password } = req.body;

        try {
            const user = await AppDataSource.manager.findOneBy(User, {
                username,
            });
            if (!user) {
                res.status(400).json({
                    message: "Invalid username or password",
                });
                return;
            }

            const isPasswordValid = await bcrypt.compare(
                password,
                user.password
            );
            if (!isPasswordValid) {
                res.status(400).json({
                    message: "Invalid username or password",
                });
                return;
            }

            const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
                expiresIn: "1h",
            });

            res.json({ token });
        } catch (error) {
            res.status(500).json({ message: "Error logging in" });
        }
    }
}

export default new AccountService();
