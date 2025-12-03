## Cloud Spend Viewer – Backend

Express + MongoDB API that stores cloud spend records and exposes filtered results to the frontend.

## Requirements
- Node.js 18+
- MongoDB connection string (Atlas or local)

Create a `.env` file inside `backend/`:
```
MONGO_URI="<your Mongo connection string>"
PORT=4000
```

## Install & Run
```bash
cd backend
npm install
npm run dev     # watches src/server.js via nodemon
# or
npm start       # plain node
```

The server listens on `http://localhost:4000` by default and exposes:
- `GET /` – health text
- `GET /api/spend` – spend records with optional `cloud`, `team`, `env`, `month=YYYY-MM`
- `GET /api/spend/debug/all` – helper endpoint to view counts/sample docs

## Seeding MongoDB
Raw CSVs live in `backend/data/`:
- `aws_line_items_12mo.csv`
- `gcp_billing_12mo.csv`

To wipe & repopulate the database with those files:
```bash
cd backend
npm run seed
```

The script maps each row to the `SpendRecord` Mongoose model and skips files that are missing. Update the CSVs or add new ones and rerun the command whenever you need fresh data.

