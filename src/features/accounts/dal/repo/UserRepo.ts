import { User, UserRole } from "../Entities/User";

import { AppDataSource } from "../../../../lib/database/Database";
import { Repository } from "typeorm";

class UserRepo {
    userRepo: Repository<User>;

    constructor() {
        this.userRepo = AppDataSource.getRepository(User);
    }

    async getUserByUsername(username: string): Promise<User | null> {
        let result = await this.userRepo.findOneBy({
            username: username,
        });

        return result;
    }

    async addUser(username: string, password: string): Promise<User | null> {
        const user = new User();
        user.username = username;
        user.password = password;
        user.userRole = UserRole.ADMIN;

        let result = await AppDataSource.manager.save(user);

        return result;
    }
}

export default new UserRepo();
