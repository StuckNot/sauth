import mongoose from "mongoose";

// IMPORTANT: Always validate environment variables before using them
// Missing env variables cause cryptic errors that are hard to debug
const connectDB = async () => {
    try {
        // IMPORTANT: Check if MONGO_URL exists before attempting connection
        // This provides clear error messages instead of generic connection failures
        if (!process.env.MONGO_URL) {
            throw new Error("MONGO_URL environment variable is not defined");
        }

        await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDB connected successfully");
        
        // IMPORTANT: Handle connection events for better error tracking
        mongoose.connection.on('error', (err) => {
            console.error("MongoDB connection error:", err);
        });
        
    } catch (error) {
        console.error("MongoDB connection failed", error);
        // IMPORTANT: Always exit process on database connection failures
        // Prevents application from running without database access
        process.exit(1);
    }
};

export default connectDB;