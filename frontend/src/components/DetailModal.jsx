import React from "react";

export default function DetailModal({ row, onClose }) {
  if (!row) return null;

  const date = new Date(row.date).toISOString().slice(0, 10);

  const description = `This is ${row.cloud_provider} ${row.service} spend from the ${row.team} team in ${row.env} on ${date}.`;

  const fields = [
    { label: "Date", value: date },
    { label: "Cloud Provider", value: row.cloud_provider },
    { label: "Service", value: row.service },
    { label: "Team", value: row.team },
    { label: "Environment", value: row.env },
    { label: "Cost (USD)", value: `$${row.cost_usd.toFixed(2)}` },
    { label: "Account Id", value: row.account_id },
    { label: "Project", value: row.project },
    { label: "Region", value: row.region }
  ].filter((field) => field.value);

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <header className="modal-header">
          <div>
            <p className="eyebrow">Spend detail</p>
            <h2>{row.service}</h2>
          </div>
          <button type="button" className="pill-button" onClick={onClose}>
            Close
          </button>
        </header>

        <p className="helper-text" style={{ marginBottom: "1rem" }}>
          {description}
        </p>

        <dl className="detail-grid">
          {fields.map((field) => (
            <div key={field.label}>
              <dt>{field.label}</dt>
              <dd>{field.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
