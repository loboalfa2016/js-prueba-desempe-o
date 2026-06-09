# Cinema Booking SPA

## Project name

Cinema Booking SPA

## Description

A Single Page Application for managing cinema showtimes and ticket reservations with role-based access control. The app uses a mock JSON Server backend and allows admins to manage movie functions while regular users can book and manage their own reservations.

## Technologies used

- JavaScript (ES6+)
- Vite
- TailwindCSS
- JSON Server
- Fetch API
- `localStorage`

## Installation

```bash
npm install
```

## Running the project

```bash
npm run dev
```

This starts the frontend and the mock backend together.

## Running json-server

```bash
npm run server
```

This starts only the JSON Server mock backend on `http://localhost:3000`.

If you want to run only the frontend:

```bash
npm run client
```

## Test users

- Admin: `admin@test.com` / `A123456`
- User: `user@test.com` / `A123456`
- User 2: `user2@test.com` / `A123456`

## Role permissions

### Admin

- View all reservations
- Confirm or cancel reservations
- Create, edit, cancel, and delete cinema functions
- View all functions and seat availability

### User

- Browse available functions
- Reserve tickets for a selected function
- Edit own reservation before the function start time
- Cancel own reservation
- View only own reservations

## Project structure

```
src/
  ├─ api/           # HTTP client wrapper for backend calls
  ├─ components/    # Reusable UI components
  ├─ controllers/   # Business logic and event handling
  ├─ router/        # Client-side routing and route protection
  ├─ services/      # API service modules
  ├─ views/         # Page templates for each route
  ├─ main.js        # Application entry point
  └─ style.css      # Tailwind and custom styling

db.json             # Mock database for JSON Server
package.json        # Scripts and dependencies
vite.config.js      # Vite configuration and path aliases
```

## Technical decisions

- Session persistence is implemented with `localStorage` to keep the user logged in between page reloads.
- Routing uses `history.pushState()` to enable SPA navigation without full page reloads.
- The router protects `/home` and redirects unauthenticated users to the login page.
- API calls are centralized in `src/api/http.js` to handle fetch requests and JSON parsing.
- Service modules in `src/services/` encapsulate function and reservation endpoints.
- The UI logic is separated into controllers, views, and reusable components.
- Reservation availability is managed using `availableSeats` on function records.
