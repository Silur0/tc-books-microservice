// src/index.ts
import express from "express";
import { AppDataSource } from "./DAL/Database";
import userRoutes from "./API/Routes/userRoutes";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(userRoutes);

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected successfully!");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => console.log(error));
