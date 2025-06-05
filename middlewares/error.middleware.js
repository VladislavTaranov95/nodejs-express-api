const HttpError = require("../utils/httpError.util");

module.exports = (err, req, res, next) => {
  console.log(err);
  if (err instanceof HttpError) {
    res.status(err.status).json({
      error: {
        message: err.message,
        ...(err.details && { errors: err.details }),
      },
    });
  } else {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
