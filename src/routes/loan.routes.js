import express from "express";

import {
  getAllLoansController,
  createLoanController
} from "../controllers/loan.controller.js";

import validate from "../middleware/validate.js";
import butuhLogin from "../middleware/auth.js";
import { loanSchema } from "../validators/loan.validator.js";

const router = express.Router();

// Menampilkan semua data peminjaman (publik)
router.get("/", getAllLoansController);

// Menambahkan peminjaman (harus login)
router.post("/", butuhLogin, validate(loanSchema), createLoanController);

export default router;
