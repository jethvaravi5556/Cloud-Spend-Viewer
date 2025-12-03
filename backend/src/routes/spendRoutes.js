const express = require("express");
const SpendRecord = require("../models/SpendRecord");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { cloud, team, env, month } = req.query;

    const query = {};

    if (cloud && cloud !== "all") {
      query.cloud_provider = cloud;
    }

    if (team && team !== "all") {
      query.team = team;
    }

    if (env && env !== "all") {
      query.env = env;
    }

    if (month) {
      // month format: "YYYY-MM"
      const [yearStr, monthStr] = month.split("-");
      const year = Number(yearStr);
      const m = Number(monthStr) - 1;
      const start = new Date(year, m, 1);
      const end = new Date(year, m + 1, 1);
      query.date = { $gte: start, $lt: end };
    }

    const records = await SpendRecord.find(query).sort({ date: 1 });

    const totalSpend = records.reduce((sum, r) => sum + r.cost_usd, 0);

    const spendByProvider = records.reduce((acc, r) => {
      acc[r.cloud_provider] = (acc[r.cloud_provider] || 0) + r.cost_usd;
      return acc;
    }, {});

    res.json({
      records,
      summary: {
        totalSpend,
        spendByProvider
      }
    });
  } catch (error) {
    console.error("Error in GET /api/spend:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/debug/all", async (req, res) => {
  const count = await SpendRecord.countDocuments();
  const sample = await SpendRecord.find().limit(5);
  res.json({ count, sample });
});


module.exports = router;
