import AccountRoutes from "./features/accounts/api/AccountRoutes";
import { AppDataSource } from "./lib/database/Database";
import ErrorMiddleware from "./lib/errors/middleware/ErrorMiddleware";
import LanguageRoutes from "./features/languages/api/LanguageRoutes";
import dotenv from "dotenv";
import express from "express";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

//* ROUTES
app.use(AccountRoutes);
app.use(LanguageRoutes);

// *Error Middleware
app.use(ErrorMiddleware.handleError);

AppDataSource.initialize()
    .then(() => {
        console.log("Database connected successfully");
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });
