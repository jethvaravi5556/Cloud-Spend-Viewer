import React, { useState, useMemo } from "react";

export default function SpendTable({ rows, onRowClick }) {
  const [sortBy, setSortBy] = useState("date");
  const [sortDir, setSortDir] = useState("asc");

  function changeSort(column) {
    if (sortBy === column) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortDir("asc");
    }
  }

  const sorted = useMemo(() => {
    const data = [...rows];
    data.sort((a, b) => {
      let v1 = a[sortBy];
      let v2 = b[sortBy];

      if (sortBy === "date") {
        v1 = new Date(v1);
        v2 = new Date(v2);
      }
      if (typeof v1 === "string") v1 = v1.toLowerCase();
      if (typeof v2 === "string") v2 = v2.toLowerCase();

      if (v1 < v2) return sortDir === "asc" ? -1 : 1;
      if (v1 > v2) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
    return data;
  }, [rows, sortBy, sortDir]);

  const arrow = sortDir === "asc" ? "↑" : "↓";

  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <Th label="Date" column="date" sortBy={sortBy} arrow={arrow} onClick={changeSort} />
            <Th
              label="Cloud"
              column="cloud_provider"
              sortBy={sortBy}
              arrow={arrow}
              onClick={changeSort}
            />
            <Th
              label="Service"
              column="service"
              sortBy={sortBy}
              arrow={arrow}
              onClick={changeSort}
            />
            <Th label="Team" column="team" sortBy={sortBy} arrow={arrow} onClick={changeSort} />
            <Th label="Env" column="env" sortBy={sortBy} arrow={arrow} onClick={changeSort} />
            <Th
              label="Cost (USD)"
              column="cost_usd"
              sortBy={sortBy}
              arrow={arrow}
              onClick={changeSort}
            />
          </tr>
        </thead>
        <tbody>
          {sorted.map((row) => (
            <tr
              key={row._id}
              onClick={() => onRowClick && onRowClick(row)}
              style={{ cursor: onRowClick ? "pointer" : "default" }}
            >
              <td>{new Date(row.date).toISOString().slice(0, 10)}</td>
              <td>
                <span
                  className={
                    "badge " +
                    (row.cloud_provider === "AWS" ? "badge-aws" : "badge-gcp")
                  }
                >
                  {row.cloud_provider}
                </span>
              </td>
              <td>{row.service}</td>
              <td>{row.team}</td>
              <td>{row.env}</td>
              <td>${row.cost_usd.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Th({ label, column, sortBy, arrow, onClick }) {
  return (
    <th onClick={() => onClick(column)}>
      {label} {sortBy === column && arrow}
    </th>
  );
}
