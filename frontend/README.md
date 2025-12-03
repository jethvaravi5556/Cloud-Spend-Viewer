# Cloud Spend Viewer – Frontend

React + Vite SPA that visualizes AWS and GCP spend pulled from the backend API. It includes filtering, a monthly spend chart, light/dark themes, and a detail modal for each record.

## Features
- Filter by cloud, team, environment, or month.
- Persisted light/dark theme toggle (respects OS preference on first load).
- Monthly total spend bar chart (uses the same filtered dataset).
- Click any table row to open a detail modal with every field and a short description.

## Requirements
- Node.js 18+
- Backend API running at `http://localhost:4000` (default). You can edit `API_BASE` in `src/api.js` if needed.

## Setup
```bash
cd frontend
npm install
```

## Scripts
- `npm run dev` – start Vite dev server (default port `5173`).
- `npm run build` – production build.
- `npm run preview` – preview the production build.
- `npm run lint` – run ESLint against `src/`.

## Notes
- All styling comes from `src/styles.css`, which defines CSS variables for both themes. If you add components, try to reuse the existing variables.
- Charting relies on [`recharts`](https://recharts.org/); if you add additional visualizations, keep data transformations inside memoized helpers to avoid expensive recomputes.
