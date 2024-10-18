// src/routes/userRoutes.ts
import { Router } from "express";
import { AppDataSource } from "../../DAL/Database";
import { User } from "../../DAL/Entities/User";

const router = Router();

// Create a new user
router.post("/users", async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = new User();
    user.name = name;
    user.email = email;
    await AppDataSource.manager.save(user);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: "Error creating user" });
  }
});

// Get all users
router.get("/users", async (req, res) => {
  try {
    const users = await AppDataSource.manager.find(User);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Error fetching users" });
  }
});

// Get a user by ID
router.get("/users/:id", async (req, res) => {
  try {
    const user = await AppDataSource.manager.findOneBy(User, { id: parseInt(req.params.id) });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error fetching user" });
  }
});

// Update a user
router.put("/users/:id", async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = await AppDataSource.manager.findOneBy(User, { id: parseInt(req.params.id) });
    if (user) {
      user.name = name;
      user.email = email;
      await AppDataSource.manager.save(user);
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error updating user" });
  }
});

// Delete a user
router.delete("/users/:id", async (req, res) => {
  try {
    const result = await AppDataSource.manager.delete(User, { id: parseInt(req.params.id) });
    if (result.affected) {
      res.status(200).json({ message: "User deleted" });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error deleting user" });
  }
});

export default router;
