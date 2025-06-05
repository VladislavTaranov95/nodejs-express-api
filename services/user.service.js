const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const uuid = require("uuid");

const prisma = new PrismaClient();
const tokenService = require("./token.service");
const UserDto = require("../dtos/user.dto");
const mailService = require("./mail.service");
const { validationResult } = require("express-validator");
const HttpError = require("../utils/httpError.util");

class UserService {
  async register(res, email, password) {
    const candidate = await prisma.user.findUnique({
      where: { email },
    });

    if (candidate) {
      throw HttpError.badRequest("User with this email already exists");
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const activationLink = uuid.v4();

    const user = await prisma.user.create({
      data: {
        email,
        password: hashPassword,
        activationLink,
        firstName: "test",
        lastName: "test",
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

  async login(req, res, email, password) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map((err) => {
        return {
          [err.path]: err.msg,
        };
      });

      throw HttpError.unproccessableEntity("Validation error", errorMessages);
    }

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
}

module.exports = new UserService();
