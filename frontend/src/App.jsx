import React, { useEffect, useState } from "react";
import { fetchSpend } from "./api";
import FilterBar from "./components/FilterBar.jsx";
import Summary from "./components/Summary.jsx";
import SpendTable from "./components/SpendTable.jsx";
import SpendChart from "./components/SpendChart.jsx";
import DetailModal from "./components/DetailModal.jsx";
import ThemeToggle from "./components/ThemeToggle.jsx";

const prefersDark = () =>
  window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

export default function App() {
  const [filters, setFilters] = useState({
    cloud: "all",
    team: "all",
    env: "all",
    month: ""
  });

  const [data, setData] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);
  const [theme, setTheme] = useState(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") return stored;
    return prefersDark() ? "dark" : "light";
  });

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError("");
        const res = await fetchSpend(filters);
        setData(res.records || []);
        setSummary(res.summary || null);
      } catch (err) {
        console.error(err);
        setError("Failed to load data. Check backend is running.");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [filters]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="app-wrapper">
      <div className="app-header">
        <div>
          <h1>K&Co. Cloud Spend Viewer</h1>
          <p>Explore AWS &amp; GCP spend by provider, team, environment, and month.</p>
        </div>
        <ThemeToggle theme={theme} onToggle={setTheme} />
      </div>

      <FilterBar filters={filters} onChange={setFilters} />

      {loading && <p>Loading data…</p>}
      {error && (
        <p style={{ color: "#f97373", fontSize: "0.85rem" }}>{error}</p>
      )}

      {!loading && !error && (
        <>
          <Summary summary={summary} />
          <SpendChart rows={data} />
          <SpendTable rows={data} onRowClick={setSelectedRow} />

          {data.length === 0 && (
            <p style={{ marginTop: "0.75rem", fontSize: "0.85rem", opacity: 0.8 }}>
              No records found for the current filters.
            </p>
          )}
        </>
      )}

      <DetailModal row={selectedRow} onClose={() => setSelectedRow(null)} />
    </div>
  );
}
