import React, { useMemo } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

const dateFormatter = new Intl.DateTimeFormat("en", {
  month: "short",
  year: "numeric"
});

const currencyFormatter = new Intl.NumberFormat("en", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0
});

export default function SpendChart({ rows }) {
  const monthlyTotals = useMemo(() => {
    const buckets = rows.reduce((acc, record) => {
      const date = new Date(record.date);
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
      acc[key] = (acc[key] || 0) + record.cost_usd;
      return acc;
    }, {});

    return Object.entries(buckets)
      .map(([monthKey, total]) => {
        const [year, month] = monthKey.split("-");
        const label = dateFormatter.format(new Date(Number(year), Number(month) - 1, 1));
        return { monthKey, label, total: Number(total.toFixed(2)) };
      })
      .sort((a, b) => (a.monthKey < b.monthKey ? -1 : 1));
  }, [rows]);

  if (monthlyTotals.length === 0) return null;

  return (
    <div className="card chart-card">
      <div className="card-header">
        <div>
          <p className="eyebrow">Monthly total spend</p>
          <p className="helper-text">
            Shows the sum of the currently filtered records grouped by month.
          </p>
        </div>
      </div>

      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={monthlyTotals}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--grid)" vertical={false} />
            <XAxis dataKey="label" tick={{ fill: "var(--text-muted)" }} stroke="var(--grid)" />
            <YAxis
              tick={{ fill: "var(--text-muted)" }}
              stroke="var(--grid)"
              tickFormatter={(value) => `$${value / 1000}k`}
            />
            <Tooltip
              cursor={{ fill: "var(--hover-bg)" }}
              contentStyle={{
                background: "var(--surface)",
                border: `1px solid var(--border)`,
                color: "var(--text)"
              }}
              formatter={(value) => currencyFormatter.format(value)}
            />
            <Bar dataKey="total" fill="var(--accent)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

