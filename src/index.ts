import { AppDataSource } from "./DAL/Database";
import AuthRoutes from "./API/Routes/AuthRoutes";
import UserRoutes from "./API/Routes/UserRoutes";
import dotenv from "dotenv";
import express from "express";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

//* ROUTES
app.use(UserRoutes);
app.use(AuthRoutes);

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected successfully");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error)
  });
