const Router = require("express").Router;

const userController = require("../controllers/user.controller");

const router = new Router();

router.post("/register", userController.register);
router.post("/login", userController.login);
// router.post("/login", () => {});
// router.post("/logout", () => {});

// router.get("/activate/:link", () => {});
// router.get("/refresh", () => {});

module.exports = router;
