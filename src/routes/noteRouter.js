import express from "express";
import { getAllNotes, createNote, editNote, deleteNote, getNoteById } from "../controllers/noteController.js";

const router = express.Router();

router.route("/").get(getAllNotes).post(createNote);
router.route("/:id").get(getNoteById).put(editNote).delete(deleteNote);

export default router;
