import { validationResult } from "express-validator";
import { ApiError } from "../utils/api-error.js";

// IMPORTANT: Always validate request data before processing in controllers
// This middleware checks validation results from express-validator
// Prevents invalid data from reaching your business logic
export const validate = (req, res, next) => {
    const errors = validationResult(req);
    
    // IMPORTANT: Check if validation errors exist
    // If errors exist, return them before executing controller logic
    if (!errors.isEmpty()) {
        // IMPORTANT: Format validation errors properly for client consumption
        // Map errors to readable format instead of returning raw validation results
        const formattedErrors = errors.array().map(error => ({
            field: error.path || error.param,
            message: error.msg,
            value: error.value
        }));

        return res.status(400).json({
            success: false,
            message: "Validation failed",
            errors: formattedErrors
        });
    }

    // IMPORTANT: Call next() only if validation passes
    // Without this, request won't proceed to controller
    next();
};

