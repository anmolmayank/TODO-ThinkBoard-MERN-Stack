import express from 'express';
import noteRoutes from "./routes/notesRoutes.js";
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';
import rateLimiter from './middleware/rateLimiter.js';
import cors from "cors";
dotenv.config();

const app = express();
connectDB();

// Middleware to parse JSON bodies
app.use(express.json());
app.use(rateLimiter);
app.use(cors());

app.use("/api/notes", noteRoutes);

connectDB().then(() => {
  console.log('Connected to the database');
  app.listen(5001, () => {
  console.log('Server is running on port 5001');
});
}).catch((error) => {
  console.error('Database connection error:', error);
});
