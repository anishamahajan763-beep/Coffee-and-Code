const mongoose = require("mongoose");

const BatchSchema = new mongoose.Schema({
  id: { type: String },
  expiryDate: { type: Date, required: true },
  costPrice: { type: Number, required: true },
  sellingPrice: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    sku: { type: String, required: true, unique: true },
    batches: { type: [BatchSchema], default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
