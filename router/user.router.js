const Router = require("express").Router;
const userController = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = new Router();

router.get("/user/me", authMiddleware, userController.getMe);

module.exports = router;
