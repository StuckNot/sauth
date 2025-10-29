import jwt from "jsonwebtoken";
import { ApiError } from "../utils/api-error.js";
import { User } from "../models/user.models.js";

// IMPORTANT: Always validate JWT tokens before allowing access to protected routes
// This middleware verifies the user is authenticated and attaches user info to req
export const isLoggedIn = async (req, res, next) => {
    try {
        // IMPORTANT: Check for token in Authorization header or cookies
        // Token extraction must handle both scenarios for flexibility
        const token = req.cookies?.accessToken || 
                     req.header("Authorization")?.replace("Bearer ", "");

        // IMPORTANT: Always validate token existence before verification
        // Missing token should return 401 (Unauthorized), not 500 (Internal Server Error)
        if (!token) {
            throw new ApiError(401, "Access token is missing. Please login first.");
        }

        // IMPORTANT: Always verify JWT with the correct secret from environment
        // Using wrong secret or missing secret causes token verification to fail
        if (!process.env.ACCESS_TOKEN_SECRET) {
            throw new ApiError(500, "Server configuration error: ACCESS_TOKEN_SECRET not set");
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        // IMPORTANT: Always verify user still exists in database
        // User might have been deleted after token was issued
        const user = await User.findById(decodedToken._id).select(
            "-password -refreshToken -forgotPasswordToken -emailVerificationToken"
        );

        if (!user) {
            throw new ApiError(401, "Invalid access token: User not found");
        }

        // IMPORTANT: Attach user to request object for use in controllers
        // This avoids redundant database queries in controllers
        req.user = user;
        next();

    } catch (error) {
        // IMPORTANT: Handle JWT-specific errors appropriately
        // Different JWT errors (expired, malformed) need different status codes
        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({
                success: false,
                message: "Invalid access token"
            });
        }

        if (error.name === "TokenExpiredError") {
            return res.status(401).json({
                success: false,
                message: "Access token has expired. Please login again."
            });
        }

        // IMPORTANT: Pass ApiError instances directly, wrap others
        if (error instanceof ApiError) {
            return res.status(error.statusCode).json({
                success: false,
                message: error.message
            });
        }

        return res.status(500).json({
            success: false,
            message: "Authentication middleware error",
            ...(process.env.NODE_ENV === "development" && { error: error.message })
        });
    }
};

