// backend/src/seed.js
const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");
const dotenv = require("dotenv");
const mongoose = require("./db");
const SpendRecord = require("./models/SpendRecord");

dotenv.config();

/**
 * Your CSV headers:
 *  AWS: [ 'date', 'account_id', 'service', 'team', 'env', 'cost_usd' ]
 *  GCP: [ 'date', 'project_id', 'service', 'team', 'env', 'cost_usd' ]
 *
 * So we just map these directly.
 */

function mapAwsRow(row) {
  const date = row.date;
  const service = row.service;
  const team = row.team || "Core";
  const env = row.env || "prod";
  const cost = parseFloat(row.cost_usd);

  if (!date || isNaN(cost) || cost === 0) return null;

  return {
    date: new Date(date),
    cloud_provider: "AWS",
    service: service || "Unknown AWS Service",
    team,
    env,
    cost_usd: cost,
    account_id: row.account_id || undefined
  };
}

function mapGcpRow(row) {
  const date = row.date;
  const service = row.service;
  const team = row.team || "Core";
  const env = row.env || "prod";
  const cost = parseFloat(row.cost_usd);

  if (!date || isNaN(cost) || cost === 0) return null;

  return {
    date: new Date(date),
    cloud_provider: "GCP",
    service: service || "Unknown GCP Service",
    team,
    env,
    cost_usd: cost,
    project: row.project_id || undefined   // stored in the "project" field of the model
  };
}

async function importCsv(filePath, cloudProvider) {
  return new Promise((resolve, reject) => {
    const records = [];

    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => {
        let mapped = null;
        if (cloudProvider === "AWS") mapped = mapAwsRow(row);
        if (cloudProvider === "GCP") mapped = mapGcpRow(row);

        if (mapped) records.push(mapped);
      })
      .on("end", async () => {
        try {
          console.log(
            `Finished reading ${cloudProvider} CSV, ${records.length} valid rows`
          );

          await SpendRecord.deleteMany({ cloud_provider: cloudProvider });

          if (records.length > 0) {
            await SpendRecord.insertMany(records);
          }

          console.log(
            `✅ Imported ${records.length} records for ${cloudProvider}`
          );
          resolve();
        } catch (err) {
          console.error(`❌ Error inserting ${cloudProvider} records:`, err);
          reject(err);
        }
      })
      .on("error", (err) => {
        console.error(`❌ Error reading ${cloudProvider} CSV:`, err);
        reject(err);
      });
  });
}

async function run() {
  const sources = [
    {
      label: "AWS",
      file: path.join(__dirname, "..", "data", "aws_line_items_12mo.csv")
    },
    {
      label: "GCP",
      file: path.join(__dirname, "..", "data", "gcp_billing_12mo.csv")
    }
  ];

  try {
    for (const source of sources) {
      if (!fs.existsSync(source.file)) {
        console.warn(`⚠️  Skipping ${source.label} seed – file missing at ${source.file}`);
        continue;
      }

      console.log(`📥 Seeding ${source.label} data from ${path.basename(source.file)}...`);
      await importCsv(source.file, source.label);
    }
  } catch (err) {
    console.error("❌ Error during seeding:", err);
  } finally {
    mongoose.connection.close();
  }
}

run();
