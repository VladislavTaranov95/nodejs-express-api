const Router = require("express").Router;
const userController = require("../controllers/user.controller");
const validate = require("../middlewares/validate.middleware");
const loginSchema = require("../validations/login.shema");
const registerSchema = require("../validations/register.shema");

const router = new Router();

router.post("/register", validate(registerSchema), userController.register);
router.post("/login", validate(loginSchema), userController.login);
router.post("/refresh", userController.refresh);
router.post("/logout", userController.logout);
// router.post("/login", () => {});
// router.post("/logout", () => {});

// router.get("/activate/:link", () => {});
// router.get("/refresh", () => {});

module.exports = router;
