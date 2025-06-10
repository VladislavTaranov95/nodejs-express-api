const productService = require("../services/product.service");

class ProductController {
  async getAllProducts(req, res) {
    const products = await productService.getAllProducts();

    res.status(200).json({
      data: products,
    });
  }

  // async getProductById(req, res) {
  //   try {
  //     const product = await this.productService.getProductById(req.params.id);
  //     if (!product) {
  //       return res.status(404).json({ message: 'Product not found' });
  //     }
  //     res.status(200).json(product);
  //   } catch (error) {
  //     res.status(500).json({ message: 'Error fetching product', error });
  //   }
  // }
}

module.exports = new ProductController();
