const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const MONGO_URI =
  process.env.MONGO_URI ||
  "mongodb+srv://ravijethva2004_db_user:pT430J2rTd3EKJcZ@cluster0.jvkazwb.mongodb.net/?appName=Cluster0";

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
  });

module.exports = mongoose;
