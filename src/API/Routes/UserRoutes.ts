import { User, UserRole } from "../../DAL/Entities/User";

import { AppDataSource } from "../../DAL/Database";
import { Router } from "express";
import { authenticateToken } from "../Middlewares/AuthMiddleware";

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
