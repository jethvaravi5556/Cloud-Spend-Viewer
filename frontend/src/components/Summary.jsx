import React from "react";

export default function Summary({ summary }) {
  if (!summary) return null;

  const { totalSpend, spendByProvider } = summary;

  return (
    <div className="summary-grid">
      <div className="card">
        <p style={{ fontSize: "0.7rem", textTransform: "uppercase", opacity: 0.7 }}>
          Total Spend
        </p>
        <p style={{ fontSize: "1.25rem", fontWeight: 600 }}>
          ${totalSpend.toFixed(2)}
        </p>
      </div>

      <div className="card">
        <p style={{ fontSize: "0.7rem", textTransform: "uppercase", opacity: 0.7 }}>
          AWS
        </p>
        <p style={{ fontSize: "1.1rem", fontWeight: 600 }}>
          ${(spendByProvider.AWS || 0).toFixed(2)}
        </p>
      </div>

      <div className="card">
        <p style={{ fontSize: "0.7rem", textTransform: "uppercase", opacity: 0.7 }}>
          GCP
        </p>
        <p style={{ fontSize: "1.1rem", fontWeight: 600 }}>
          ${(spendByProvider.GCP || 0).toFixed(2)}
        </p>
      </div>
    </div>
  );
}
