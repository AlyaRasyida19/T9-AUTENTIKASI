const errorHandler = (err, req, res, next) => {
  console.error(err);

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    status: "error",
    code: err.code || "INTERNAL_SERVER_ERROR",
    message: statusCode === 500
      ? "Terjadi kesalahan pada server"
      : err.message
  });
};

export default errorHandler;
