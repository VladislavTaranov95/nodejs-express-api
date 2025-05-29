const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const uuid = require("uuid");

const prisma = new PrismaClient();
const tokenService = require("./token.service");
const UserDto = require("../dtos/user.dto");
const mailService = require("./mail.service");

class UserService {
  async register(res, email, password) {
    const candidate = await prisma.user.findUnique({
      where: { email },
    });

    if (candidate) {
      throw new Error("User with this email already exists");
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

  async login(res, email, password) {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error("User with this email does not exist");
    }

    const isPasswordEqual = await bcrypt.compare(password, user.password);
    if (!isPasswordEqual) {
      throw new Error("Incorrect password");
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
