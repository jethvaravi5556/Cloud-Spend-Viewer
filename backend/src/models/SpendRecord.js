const mongoose = require("mongoose");

const SpendRecordSchema = new mongoose.Schema(
  {
    date: { type: Date, required: true },
    cloud_provider: { type: String, enum: ["AWS", "GCP"], required: true },
    service: { type: String, required: true },
    team: { type: String, required: true },
    env: { type: String, enum: ["prod", "staging", "dev"], required: true },
    cost_usd: { type: Number, required: true },

    project: String,
    account_id: String,
    region: String
  },
  { timestamps: true }
);

const SpendRecord = mongoose.model("SpendRecord", SpendRecordSchema);

module.exports = SpendRecord;
