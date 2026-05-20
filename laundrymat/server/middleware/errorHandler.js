// middleware/errorHandler.js
// Express middleware functions take (req, res, next) as arguments.
// Error handling middleware takes a 4th argument: err.
// Express knows it's an error handler because of the 4 parameters.
import process from "node:process";

const errorHandler = (err, req, res) => {
  // Log the full error stack in development for debugging
  console.error(err.stack);

  // Default to 500 (Internal Server Error) if no status code set
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode).json({
    success: false,
    message: err.message || "Something went wrong",
    // Only show the full error stack in development — never in production
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};

export default errorHandler;
