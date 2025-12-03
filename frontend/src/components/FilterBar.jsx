import React from "react";

const clouds = [
  { value: "all", label: "All Providers" },
  { value: "AWS", label: "AWS" },
  { value: "GCP", label: "GCP" }
];

const teams = ["all", "Core", "Web", "Data"];
const envs = ["all", "prod", "staging", "dev"];

export default function FilterBar({ filters, onChange }) {
  function update(field, value) {
    onChange({
      ...filters,
      [field]: value
    });
  }

  return (
    <div className="filters-row">
      <select
        value={filters.cloud}
        onChange={(e) => update("cloud", e.target.value)}
      >
        {clouds.map((c) => (
          <option key={c.value} value={c.value}>
            {c.label}
          </option>
        ))}
      </select>

      <select
        value={filters.team}
        onChange={(e) => update("team", e.target.value)}
      >
        {teams.map((t) => (
          <option key={t} value={t}>
            {t === "all" ? "All Teams" : t}
          </option>
        ))}
      </select>

      <select
        value={filters.env}
        onChange={(e) => update("env", e.target.value)}
      >
        {envs.map((env) => (
          <option key={env} value={env}>
            {env === "all" ? "All Environments" : env}
          </option>
        ))}
      </select>

      <input
        type="month"
        value={filters.month}
        onChange={(e) => update("month", e.target.value)}
      />
    </div>
  );
}
