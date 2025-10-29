import app from "./app.js";
import dotenv from "dotenv";
import connectDB from "./db/index.js";

// IMPORTANT: Always configure environment variables BEFORE using them
// dotenv.config() must be called before accessing process.env
dotenv.config({
    path: "./.env"
});

// IMPORTANT: Define constants at the top, not after they're used
// This prevents confusion and makes code more readable
const PORT = process.env.PORT || 8000;

// IMPORTANT: Always handle database connection errors before starting the server
// Starting server without DB connection can lead to runtime errors
connectDB()
.then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
.catch((error) => {
    console.error("Failed to connect to the database", error);
    // IMPORTANT: Always exit process on critical failures
    // Prevents the application from running in an invalid state
    process.exit(1);
})

