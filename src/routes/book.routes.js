import express from "express";

import {
  getAllBooksController,
  getBookByIdController,
  createBookController,
  updateBookController,
  deleteBookController
} from "../controllers/book.controller.js";

import validate from "../middleware/validate.js";
import butuhLogin from "../middleware/auth.js";
import { bookSchema } from "../validators/book.validator.js";

const router = express.Router();

// Menampilkan semua buku (publik)
router.get("/", getAllBooksController);

// Menampilkan satu buku berdasarkan ID (publik)
router.get("/:id", getBookByIdController);

// Menambahkan buku (harus login)
router.post("/", butuhLogin, validate(bookSchema), createBookController);

// Mengubah buku (harus login)
router.put("/:id", butuhLogin, validate(bookSchema), updateBookController);

// Menghapus buku (harus login)
router.delete("/:id", butuhLogin, deleteBookController);

// Export router
export default router;
