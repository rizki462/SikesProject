import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

export const DATABASE_URL: string = process.env.DATABASE_URL || "";
export const SECRET:string = process.env.SECRET || "";