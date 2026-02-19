import app from "./app.js";
import connectDB from "./utils/db.js";
const PORT = process.env.PORT || 5000;
import dotenv from "dotenv";

dotenv.config();

await connectDB();
