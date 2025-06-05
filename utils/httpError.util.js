class HttpError extends Error {
  constructor(status, message, details) {
    super(message);
    this.status = status;

    if (details) {
      this.details = details;
    }
  }

  static badRequest(message) {
    return new HttpError(400, message || "Bad Request");
  }

  static unauthorized(message) {
    return new HttpError(401, message || "Unauthorized");
  }

  static forbidden(message) {
    return new HttpError(403, message || "Forbidden");
  }

  static notFound(message) {
    return new HttpError(404, message || "Not Found");
  }

  static unproccessableEntity(message, details) {
    console.log(details);

    return new HttpError(422, message || "Unprocessable Entity", details);
  }

  static internalServerError(message) {
    return new HttpError(500, message || "Internal Server Error");
  }
}

module.exports = HttpError;
