import asyncHandler from "express-async-handler";

import AppError from "../utils/AppError.js";
import noteModel from "../models/noteModel.js";

// ! @desc Get All Notes
// ! @route GET /api/notes
// ! @access Private
const getAllNotes = asyncHandler(async (req, res) => {
  const notes = await noteModel.find().sort({ createdAt: 1 });
  res.status(200).json({ notes: notes || [] });
});

// ! @desc Get Note By Id
// ! @route GET /api/notes/:id
// ! @access Private
const getNoteById = asyncHandler(async (req, res, next) => {
  const note = await noteModel.findById(req.params.id);
  if (!note) return next(new AppError("Note not found", 404));
  res.status(200).json({ note });
});

// ! @desc Create Note
// ! @route POST /api/notes/:id
// ! @access Private
const createNote = asyncHandler(async (req, res, next) => {
  const { title, content } = req.body;
  console.log("Body", req.body);
  if (!title || !content) return next(new AppError("Please provide title and content", 400));
  const note = await noteModel.create({ title, content });
  if (!note) return next(new AppError("Note not created", 400));
  res.status(201).json({ note });
});

// ! @desc Edit Note
// ! @route PUT /api/notes/:id
// ! @access Private
const editNote = asyncHandler(async (req, res, next) => {
  const { title, content } = req.body;
  const note = await noteModel.findByIdAndUpdate(req.params.id, { title, content }, { returnDocument: "after" });
  if (!note) return next(new AppError("Note not found", 404));
  res.status(201).json({ note });
});

// ! @desc Delete Note
// ! @route DELETE /api/notes/:id
// ! @access Private
const deleteNote = asyncHandler(async (req, res, next) => {
  const note = await noteModel.findByIdAndDelete(req.params.id);
  if (!note) return next(new AppError("Note not found", 404));
  res.status(204).json();
});

export { getAllNotes, getNoteById, createNote, editNote, deleteNote };
