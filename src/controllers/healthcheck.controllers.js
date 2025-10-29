import { ApiResponse } from "../utils/api-response.js";

// IMPORTANT: Always use consistent parameter order as defined in ApiResponse constructor
// ApiResponse(statusCode, data, message) - order matters for default values
const healthcheck = (req, res) => {
    res.status(200).json(
        new ApiResponse(200, { message: "Server is running" }, "Health check successful")
    );
};

export { healthcheck };