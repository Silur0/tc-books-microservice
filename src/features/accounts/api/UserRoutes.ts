import { AppDataSource } from "../../../common/database/Database";
import { Router } from "express";
import { User } from "../dal/Entities/User";
import { authenticateToken } from "../../../common/authentication/AuthMiddleware";

const router = Router();

// Get all users
router.get("/users", async (req, res) => {
  authenticateToken(req, res, async () => {
    try {
      const users = await AppDataSource.manager.find(User);
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: "Error fetching users" });
    }
  });
});

export default router;
