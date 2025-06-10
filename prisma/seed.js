const { PrismaClient } = require("@prisma/client");
const fs = require("fs").promises;

const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.product.deleteMany();

    const data = await fs.readFile("prisma/product.json", "utf-8");
    const fakeProducts = JSON.parse(data);

    console.log(`Seeding database with ${fakeProducts.length} products...`);
    for (const product of fakeProducts) {
      const { name, description, images, price, brand } = product;

      const formattedPrice = Number(price.split(" ").join(""));

      try {
        await prisma.product.create({
          data: {
            name,
            description,
            price: formattedPrice,
            images,
            brand,
          },
        });
      } catch (error) {
        console.error(`Error creating product:`, error);
      }
    }

    console.log(`Database has been seeded. 🌱`);
  } catch (error) {
    throw error;
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
