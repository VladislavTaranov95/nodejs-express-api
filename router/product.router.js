const Router = require("express").Router;
const productController = require("../controllers/product.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = new Router();

router.get("/products", authMiddleware, productController.getAllProducts);

module.exports = router;
