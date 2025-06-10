const Router = require("express").Router;

const authRouter = require("./auth.router");
const productRouter = require("./product.router");
const userRouter = require("./user.router");

const router = new Router();

router.use("/auth", authRouter);
router.use(productRouter);
router.use(userRouter);

module.exports = router;
