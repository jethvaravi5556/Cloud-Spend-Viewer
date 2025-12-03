import axios from "axios";

const API_BASE = "http://localhost:4000";

export async function fetchSpend(filters) {
  const params = new URLSearchParams();

  if (filters.cloud && filters.cloud !== "all") params.append("cloud", filters.cloud);
  if (filters.team && filters.team !== "all") params.append("team", filters.team);
  if (filters.env && filters.env !== "all") params.append("env", filters.env);
  if (filters.month) params.append("month", filters.month);

  const url = `${API_BASE}/api/spend?${params.toString()}`;
  const res = await axios.get(url);
  return res.data;
}
