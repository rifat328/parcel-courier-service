export default function errorMiddleware(err, req, res, next) {
  let error = { ...err };
  error.message = err.message;

  // Log for development
  console.error(`Error Logic: ${err.name}`, err);

  // 1. Mongoose Bad ObjectId (CastError)
  if (err.name === "CastError") {
    error.message = "Resource not found";
    error.statusCode = 404;
  }

  // 2. Mongoose Duplicate Key
  if (err.code === 11000) {
    error.message = "Duplicate field value entered";
    error.statusCode = 400;
  }

  // 3. Mongoose Validation Error (Fixed 'Name' typo)
  if (err.name === "ValidationError") {
    error.message = Object.values(err.errors)
      .map((val) => val.message)
      .join(", ");
    error.statusCode = 400;
  }

  // 4. Handle standard Thrown Errors (like "Customer not found")
  // If no status code is set yet, check if the error object has one, or default to 500
  const finalStatusCode = error.statusCode || err.statusCode || 500;

  res.status(finalStatusCode).json({
    success: false,
    error: error.message || "Server Error",
  });
}
