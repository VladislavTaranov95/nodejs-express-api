const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const uuid = require("uuid");

const prisma = new PrismaClient();
const tokenService = require("./token.service");
const UserDto = require("../dtos/user.dto");
const mailService = require("./mail.service");
const HttpError = require("../utils/httpError.util");

class UserService {
  async register(res, payload) {
    const candidate = await prisma.user.findUnique({
      where: { email: payload.email },
    });

    if (candidate) {
      throw HttpError.badRequest("User with this email already exists");
    }

    const hashPassword = await bcrypt.hash(payload.password, 10);
    const activationLink = uuid.v4();

    const user = await prisma.user.create({
      data: {
        ...payload,
        password: hashPassword,
      },
    });

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokensAndSetCookie(res, { ...userDto });

    await mailService.sendActivationMail(
      user.email,
      `${process.env.API_URL}/api/auth/activate/${activationLink}`
    );

    return {
      accessToken: tokens.accessToken,
      user: { ...userDto },
    };
  }

  async login(res, email, password) {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw HttpError.badRequest("User with this email does not exist");
    }

    const isPasswordEqual = await bcrypt.compare(password, user.password);
    if (!isPasswordEqual) {
      throw HttpError.badRequest("Incorrect username or password");
    }

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokensAndSetCookie(res, { ...userDto });

    return {
      accessToken: tokens.accessToken,
      user: { ...userDto },
    };
  }

  async logout(res) {
    res.clearCookie("refreshToken");
    return { message: "User logged out successfully" };
  }

  async activate(activationLink) {
    const user = await prisma.user.findUnique({
      where: { activationLink },
    });

    if (!user) {
      throw new Error("Invalid activation link");
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { isActivated: true },
    });
  }

  async refresh(req, res) {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      throw HttpError.unauthorized("Refresh token is required");
    }
    const { valid, payload } = tokenService.validateRefreshToken(refreshToken);

    if (!valid) {
      throw HttpError.unauthorized("Unauthorized access");
    }

    const user = await prisma.user.findUnique({
      where: { id: payload.id },
    });

    if (!user) {
      throw HttpError.unauthorized("Unauthorized access");
    }

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokensAndSetCookie(res, { ...userDto });

    return {
      accessToken: tokens.accessToken,
      user: { ...userDto },
    };
  }

  async getMe(req) {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      throw HttpError.unauthorized("Refresh token is required");
    }
    const { valid, payload } = tokenService.validateRefreshToken(refreshToken);

    if (!valid) {
      throw HttpError.unauthorized("Unauthorized access");
    }

    const user = await prisma.user.findUnique({
      where: { id: payload.id },
    });

    if (!user) {
      throw HttpError.unauthorized("Unauthorized access");
    }

    const userDto = new UserDto(user);

    return {
      user: { ...userDto },
    };
  }

  async getUser(id) {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw HttpError.notFound("User not found");
    }

    return new UserDto(user);
  }
}

module.exports = new UserService();
