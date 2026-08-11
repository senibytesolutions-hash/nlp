export const notFound = (req, res, next) => {
  res.status(404);
  next(new Error(`Route not found - ${req.originalUrl}`));
};

// eslint-disable-next-line no-unused-vars
export const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;

  if (err.name === "ValidationError") {
    return res.status(400).json({
      success: false,
      message: "Please correct the highlighted fields and try again.",
      errors: Object.values(err.errors).map((e) => ({
        field: e.path,
        message: e.message,
      })),
    });
  }

  res.status(statusCode).json({
    success: false,
    message: err.message || "Something went wrong on our end. Please try again later.",
    stack: process.env.NODE_ENV === "production" ? undefined : err.stack,
  });
};
