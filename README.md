# Workspace Reservation System (PerformanceTestJS)

Lightweight SPA demonstrating workspace reservation flows using Vite, TailwindCSS and a JSON Server mock API.

## Features

- Mocked user authentication
- Role-based views (admin / user)
- Create, list and manage reservations
- Simple client-side routing
- Modular structure and small footprint

## Quick Start

Requirements:

- Node.js (16+ recommended)

Install dependencies:

```bash
npm install
```

Run development (frontend + mock API):

```bash
npm run dev
```

- Frontend served by Vite (shown in terminal, e.g. `http://localhost:5173`)
- Mock API served by JSON Server at `http://localhost:3000`

Build for production:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

If you prefer to run services separately, you can run the frontend or the API individually:

```bash
# frontend only
npm run client

# mock API only
npm run server
```

## Technologies

| Area | Technology |
|---|---|
| Language | JavaScript (ES6+) |
| Bundler / Dev server | Vite |
| Styling | TailwindCSS |
| Mock API | JSON Server |
| Process runner | Concurrently |
| Markup | HTML5 |
| Stylesheet | CSS3 |
| Runtime | Node.js |

## Default test credentials

- Admin: `admin@test.com` / `A123456`
- User: `user@test.com` / `A123456`

## API (JSON Server)

The mock API endpoints are defined in `db.json`:

- `GET /users` — list users
- `GET /reservations` — list reservations
- `POST /reservations` — create reservation
- `PATCH /reservations/:id` — update reservation
- `DELETE /reservations/:id` — delete reservation

## Project structure

```
src/
  ├─ api/           # http client wrapper
  ├─ components/    # UI components (Sidebar, ReservationCard)
  ├─ controllers/   # controllers (login, home)
  ├─ router/        # small client-side router
  ├─ services/      # reservation service
  ├─ views/         # view templates
  ├─ main.js        # app entry
  └─ style.css      # Tailwind entry + small custom rules
db.json             # mock data for JSON Server
package.json
```

## Notes and troubleshooting

- If `npm run dev` starts Vite on a different port (e.g. 5174), open the URL shown in the terminal.
- If the JSON Server fails because port `3000` is in use, run the mock API on another port:

```bash
npx json-server --watch db.json --port 3001
```

and update `API_URL` in `src/api/http.js`.

## Next steps (optional)

- Add real authentication and user management
- Persist data to a real backend
- Add tests and CI

---

If you want, I can add the `client` and `server` scripts to `package.json` so you can run them separately.
