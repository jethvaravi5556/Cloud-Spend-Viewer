const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
require("./db");

const spendRoutes = require("./routes/spendRoutes");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Cloud Spend API running");
});

app.use("/api/spend", spendRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
