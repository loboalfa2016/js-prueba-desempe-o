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

## Running the project

```bash
npm run dev
```

This command starts both:

- Vite frontend
- JSON Server mock backend on `http://localhost:3000`

## Running json-server separately

```bash
npm run server
```

If you want to run just the frontend:

```bash
npm run client
```

## API Endpoints

The mock API is served by JSON Server from `db.json`.

- `GET /users`
- `GET /functions`
- `POST /functions`
- `PATCH /functions/:id`
- `DELETE /functions/:id`
- `GET /reservations`
- `POST /reservations`
- `PATCH /reservations/:id`
- `DELETE /reservations/:id`

## Test users

- Admin: `admin@test.com` / `A123456`
- User: `user@test.com` / `A123456`
- User: `user2@test.com` / `A123456`

## Role permissions

### Admin

- View all reservations
- Confirm or cancel reservations
- Create, edit, cancel, and delete cinema functions
- View all functions and seats availability

### User

- Browse available cinema functions
- Reserve tickets for a selected function
- Edit own reservation before the function starts
- Cancel own reservation
- See only own reservations

## Project structure

```
src/
  ├─ api/           # HTTP client wrapper
  ├─ components/    # Reusable UI components
  ├─ controllers/   # View controllers and business logic
  ├─ router/        # Simple SPA router and guards
  ├─ services/      # API service modules
  ├─ views/         # Page templates
  ├─ main.js        # Application entry
  └─ style.css      # Tailwind and custom styling
db.json             # mock database for JSON Server
package.json
vite.config.js
```

## Technical decisions

- Session persistence is implemented with `localStorage` for login state.
- The router protects `/home` and redirects unauthenticated users.
- The application uses separate services for reservations and functions.
- Function availability is calculated using `availableSeats` and reservation updates.
- Reservations use status values: `pending`, `confirmed`, and `canceled`.
- Admin-only actions are hidden from standard users.

## Notes and troubleshooting

- If Vite starts on a different port, use the URL shown in the terminal.
- If port `3000` is already in use, change the JSON Server port and update `API_URL` in `src/api/http.js`.
- If you see `Unchecked runtime.lastError: The message port closed before a response was received`, this is typically caused by a browser extension or external plugin, not by this SPA code.

## Running the app

1. Install dependencies: `npm install`
2. Start the app: `npm run dev`
3. Open the URL shown by Vite in your browser

---

The application now supports cinema function management, seat availability, role-based reservation controls, and an English project README.
