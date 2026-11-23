import { Router } from "express";

import {
  register,
  login,
  getCurrentUser
} from "../controllers/auth.controller.js";

import validate from "../middleware/validate.js";
import butuhLogin from "../middleware/auth.js";

import {
  registerSchema,
  loginSchema
} from "../validators/auth.validator.js";

const router = Router();

// Endpoint register
router.post("/register", validate(registerSchema), register);

// Endpoint login
router.post("/login", validate(loginSchema), login);

// Endpoint untuk melihat pengguna yang sedang login
router.get("/saya", butuhLogin, getCurrentUser);

export default router;
