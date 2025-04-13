import { config } from "dotenv";
import path from "path";

// Load environment variables
config({ path: path.join(__dirname, "..", "..", ".env") });

export const PORT = parseInt(process.env.PORT || "8000");
export const REDIS_HOST = process.env.REDIS_HOST || "localhost";
export const REDIS_PORT = parseInt(process.env.REDIS_PORT || "6379");
export const REDIS_PASSWORD = process.env.REDIS_PASSWORD || "";
export const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";
export const FILE_EXPIRY_SECONDS = 24 * 60 * 60; // 24 hours
