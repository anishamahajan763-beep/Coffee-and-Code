require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const productRoutes = require("./routes/products");

const app = express();

app.use(cors());
app.use(express.json());

const mongoUri =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/smartstock";

mongoose
  .connect(mongoUri, {
    // options handled by mongoose 6+
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/api/products", productRoutes);

app.get("/api/health", (req, res) => res.json({ status: "ok" }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend listening on port ${PORT}`));
