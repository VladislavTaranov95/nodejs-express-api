const userService = require("../services/user.service");

class UserController {
  async register(req, res) {
    try {
      const { email, password } = req.body;
      const user = await userService.register(res, email, password);

      delete user.refreshToken;

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
    const user = await userService.login(req, res, email, password);

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
}

module.exports = new UserController();
