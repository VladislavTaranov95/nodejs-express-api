const tokenService = require("../services/token.service");
const userService = require("../services/user.service");

class UserController {
  async register(req, res) {
    try {
      const user = await userService.register(res, req.body);

      res.status(201).json({
        message: "User registered successfully",
        data: user,
      });
    } catch (error) {
      res.status(400).json({
        message: error.message || "An error occurred during registration",
      });
    }
  }

  async login(req, res) {
    const { email, password } = req.body;

    const user = await userService.login(res, email, password);

    res.status(200).json({
      message: "User logged in successfully",
      data: user,
    });
  }

  async activate(req, res) {
    try {
      const activationLink = req.params.link;
      await userService.activate(activationLink);

      res.status(200).json({
        message: "Account activated successfully",
      });
    } catch (error) {
      res.status(400).json({
        message: error.message || "An error occurred during activation",
      });
    }
  }

  async refresh(req, res) {
    const user = await userService.refresh(req, res);

    res.status(200).json({
      message: "Token refreshed successfully",
      data: user.accessToken,
    });
  }

  async logout(req, res) {
    const message = await userService.logout(res);

    res.status(200).json(message);
  }

  async getMe(req, res) {
    const user = await userService.getMe(req);

    res.status(200).json({
      message: "User fetched successfully",
      data: user,
    });
  }

  // async getUser(req, res) {
  //   const decodedUser = await tokenService.decodeToken(req);
  //   const user = await userService.getUser(decodedUser.id);

  //   res.status(200).json({
  //     message: "User fetched successfully",
  //     data: user,
  //   });
  // }
}

module.exports = new UserController();
