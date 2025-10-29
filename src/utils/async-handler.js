// IMPORTANT: This utility wraps async route handlers to catch promise rejections
// Without this, unhandled promise rejections will crash the Node.js process
// Always wrap async controller functions with this handler
const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(
            requestHandler(req, res, next)
        ).catch((error) => next(error));
    }
};

export { asyncHandler };
