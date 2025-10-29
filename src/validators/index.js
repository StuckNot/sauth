import { body } from "express-validator";

// IMPORTANT: Use express-validator for input validation
// Never trust user input - always validate and sanitize before use

// User registration validation rules
export const registerValidator = [
    // IMPORTANT: Always chain validators in logical order
    // Trim and normalize before checking length and format
    body("username")
        .trim()
        .notEmpty().withMessage("Username is required")
        .isLength({ min: 3, max: 30 }).withMessage("Username must be between 3 and 30 characters")
        .matches(/^[a-zA-Z0-9_]+$/).withMessage("Username can only contain letters, numbers, and underscores"),

    body("email")
        .trim()
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Please provide a valid email address")
        .normalizeEmail(),

    // IMPORTANT: Password validation must enforce security requirements
    // Weak passwords are a major security vulnerability
    body("password")
        .notEmpty().withMessage("Password is required")
        .isLength({ min: 8 }).withMessage("Password must be at least 8 characters long")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/).withMessage(
            "Password must contain at least one uppercase letter, one lowercase letter, and one number"
        ),
];

// User login validation rules
export const loginValidator = [
    body("email")
        .trim()
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Please provide a valid email address"),

    body("password")
        .notEmpty().withMessage("Password is required"),
];

// Password reset validation rules
export const resetPasswordValidator = [
    body("newPassword")
        .notEmpty().withMessage("New password is required")
        .isLength({ min: 8 }).withMessage("Password must be at least 8 characters long")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/).withMessage(
            "Password must contain at least one uppercase letter, one lowercase letter, and one number"
        ),
];

// Forgot password validation (only needs email)
export const forgotPasswordValidator = [
    body("email")
        .trim()
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Please provide a valid email address"),
];

