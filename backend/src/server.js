import express from "express";
import noteRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";
import authUserRouter from "./routes/authUserRouter.js";
import cookieParser from "cookie-parser";
dotenv.config();

const app = express();
connectDB();

// Middleware to parse JSON bodies
app.use(express.json());
app.use(rateLimiter);
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173", // allow Vite frontend
    credentials: true,
  })
);

app.use("/api/auth", authUserRouter);
app.use("/api/notes", noteRoutes);

connectDB()
  .then(() => {
    console.log("Connected to the database");
    app.listen(5001, () => {
      console.log("Server is running on port 5001");
    });
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });
