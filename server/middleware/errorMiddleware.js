import ApiError from "../exceptions/apiError.js";

export default function (err, req, res, next) {
  const statusCode = res.statusCode ? res.statusCode : 500;
  res.status(statusCode);

  if (err instanceof ApiError) {
    return res.status(err.status).json({
      message: err.message,
      errors: err.errors,
      stack: process.env.NODE_ENV !== "production" ? err.stack : null,
    });
  }
  return res.status(500).json({ message: "Непредвиденная ошибка" });
};
