import { DataSource } from "typeorm";
import dotenv from "dotenv";

dotenv.config();

console.log(__dirname)

export const AppDataSource = new DataSource({
  type: "postgres",
  url:  process.env.DATABASE_URL,
  entities: [
    './src/features/**/dal/Entities/*.{js,ts}'
  ],
  synchronize: true,
});
