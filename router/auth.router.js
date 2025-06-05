const Router = require("express").Router;

const { body } = require("express-validator");
const userController = require("../controllers/user.controller");

const router = new Router();

let validators = [
  body("email").isEmail().withMessage("Email format is invalid"),
  body("password")
    .isLength({ min: 5, max: 10 })
    .withMessage("Password must be between 5 and 10 characters long"),
];

router.post("/register", userController.register);
router.post("/login", validators, userController.login);
// router.post("/login", () => {});
// router.post("/logout", () => {});

// router.get("/activate/:link", () => {});
// router.get("/refresh", () => {});

module.exports = router;
