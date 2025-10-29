// IMPORTANT: Maintain consistent naming conventions (camelCase for variables)
// Inconsistent naming like "statuscode" vs "statusCode" causes confusion and bugs
class ApiResponse {
    constructor(
        statusCode,  // Fixed: Changed from statuscode to statusCode for consistency
        data = null,
        message = "Success"
    ) {
        // IMPORTANT: Always validate constructor parameters
        // Prevents runtime errors from invalid input
        if (!statusCode || statusCode < 100 || statusCode > 599) {
            throw new Error("Invalid status code provided");
        }
        
        this.statusCode = statusCode;
        this.message = message;
        this.success = statusCode < 400;
        this.data = data;
    }
}

export { ApiResponse };