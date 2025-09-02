import express from "express";
import {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
  getNoteById,
} from "../controllers/notesController.js";
import {authenticateToken} from "../middleware/authenticateToken.js";

const router = express.Router();

router.get("/", authenticateToken, getNotes);

router.get("/:id", authenticateToken, getNoteById);

router.post("/", authenticateToken, createNote);

router.put("/:id", authenticateToken, updateNote);

router.delete("/:id", authenticateToken, deleteNote);

export default router;
