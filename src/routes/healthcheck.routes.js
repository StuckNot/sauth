import {Router } from "express";
// IMPORTANT: Always use correct file paths with proper casing and extensions
// Common mistake: Missing dot (.) in filename like "healthcheckcontrollers" instead of "healthcheck.controllers"
import { healthcheck } from "../controllers/healthcheck.controllers.js";

const router = Router();

router.get("/healthcheck", healthcheck);


export default router;