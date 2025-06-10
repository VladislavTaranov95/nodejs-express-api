const jwt = require("jsonwebtoken");
const HttpError = require("../utils/httpError.util");

class TokenService {
  generateTokensAndSetCookie(res, payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: "30m",
    });

    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: "30d",
    });

    res.cookie("refreshToken", refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    return {
      accessToken,
      refreshToken,
      ...payload,
    };
  }

  validateRefreshToken(refreshToken) {
    try {
      const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
      return { valid: true, payload: decoded };
    } catch (err) {
      return { valid: false, error: err.message };
    }
  }
}

module.exports = new TokenService();
