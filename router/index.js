const Router = require("express").Router;

const authRouter = require("./auth.router");

const router = new Router();

router.use("/auth", authRouter);

module.exports = router;
