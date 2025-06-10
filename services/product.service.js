const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class ProductService {
  async getAllProducts(req, res) {
    const products = await prisma.product.findMany();

    return products;
  }
}

module.exports = new ProductService();
