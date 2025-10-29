import express from "express";
import {
  registerUser,
  loginUser,
  getMe,
  verifyUser,
  logoutUser,
  forgotPassword,
  resetPassword,
} from "../controllers/auth.controllers.js";
import { isLoggedIn } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validator.middleware.js";
import {
  registerValidator,
  loginValidator,
  resetPasswordValidator,
  forgotPasswordValidator,
} from "../validators/index.js";

const router = express.Router();

// IMPORTANT: Always apply validation middleware before controller
// Validation prevents invalid data from reaching business logic
router.post("/register", registerValidator, validate, registerUser);
router.post("/login", loginValidator, validate, loginUser);
router.get("/me", isLoggedIn, getMe);
router.get("/verify/:token", verifyUser);
router.get("/logout", isLoggedIn, logoutUser);
router.post("/forgot-password", forgotPasswordValidator, validate, forgotPassword);
router.post("/reset-password/:token", resetPasswordValidator, validate, resetPassword);

export default router;
