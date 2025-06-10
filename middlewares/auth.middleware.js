const jwt = require("jsonwebtoken");
const HttpError = require("../utils/httpError.util");

function authMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];

  if (!token) throw HttpError.unauthorized("Unauthorized access");

  jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, user) => {
    if (err) throw HttpError.unauthorized("Unauthorized access");

    req.user = user;
    next();
  });
}

module.exports = authMiddleware;
