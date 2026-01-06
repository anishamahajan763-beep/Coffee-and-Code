require("dotenv").config();
const mongoose = require("mongoose");
const DEMO_PRODUCTS = require("./initDB/initDB");
const Product = require("./models/Product");

const MONGO_URI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/smartstock";

async function connect() {
  await mongoose.connect(MONGO_URI);
}

async function seed() {
  await connect();
  console.log("Connected to", MONGO_URI);

  // Optionally remove existing demo products
  try {
    await Product.deleteMany({ sku: { $regex: "-[0-9]{4}$" } });
  } catch (e) {
    console.warn("cleanup failed", e.message);
  }

  if (!Array.isArray(DEMO_PRODUCTS) || DEMO_PRODUCTS.length === 0) {
    console.error("No demo products found in initDB/initDB.js");
    process.exit(1);
  }

  const created = await Product.insertMany(DEMO_PRODUCTS, { ordered: false });
  console.log(`Inserted ${created.length} products`);
  await mongoose.disconnect();
  console.log("Disconnected");
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
