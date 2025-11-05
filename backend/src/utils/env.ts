import dotenv from "dotenv";

// Load environment variables
dotenv.config();

export const DATABASE_URL = process.env.DATABASE_URL || "";