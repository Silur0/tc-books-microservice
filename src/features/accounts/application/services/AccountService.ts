import { Request, Response } from "express";
import { User, UserRole } from "../../dal/Entities/User";

import InvalidLoginError from "../errors/InvalidLoginError";
import { LoginRequest } from "../contracts/requests/LoginRequest";
import { LoginResponse } from "../contracts/responses/LoginResponse";
import { RegisterRequest } from "../contracts/requests/RegisterRequest";
import RequiredFieldError from "../../../../lib/errors/RequiredFieldError";
import UserRepo from "../../dal/repo/UserRepo";
import UsernameAlreadyTakenError from "../errors/UsernameAlreadyTakenError";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

class AccountService {
    async register(req: RegisterRequest): Promise<void> {
        const { username, password } = req;

        if (!username) {
            throw new RequiredFieldError("Username");
        }

        if (!password) {
            throw new RequiredFieldError("Password");
        }

        const existingUser = await UserRepo.getUserByUsername(username);

        if (existingUser) {
            throw new UsernameAlreadyTakenError();
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await UserRepo.addUser(username, hashedPassword);
    }

    async login(req: LoginRequest): Promise<LoginResponse> {
        const { username, password } = req;

        if (!username) {
            throw new RequiredFieldError("Username");
        }

        if (!password) {
            throw new RequiredFieldError("Password");
        }

        const user = await await UserRepo.getUserByUsername(username);

        if (!user) {
            throw new InvalidLoginError();
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new InvalidLoginError();
        }

        const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
            expiresIn: "1h",
        });

        return new LoginResponse({ token: token });
    }
}

export default new AccountService();
