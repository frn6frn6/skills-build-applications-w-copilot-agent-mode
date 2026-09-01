# OctoFit Tracker - Frontend (React 19)

The React 19 presentation tier for the OctoFit multi-tier application.

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   ```bash
   cp .env.local.example .env.local
   ```

   Edit `.env.local` and set:
   - `VITE_CODESPACE_NAME` - Your GitHub Codespace name (if running in Codespaces)
   - `VITE_API_PROTOCOL` - API protocol (default: `http`)
   - `VITE_API_HOST` - API host (default: `localhost:8000`)

## Development

```bash
npm run dev
```

The frontend will run on `http://localhost:5173`.

## Build

```bash
npm run build
```

## API Integration

The frontend communicates with the backend API at:

### Codespaces Environment
If `VITE_CODESPACE_NAME` is set, the API base URL is:
```
https://{CODESPACE_NAME}-8000.app.github.dev/api
```

### Local Development
If `VITE_CODESPACE_NAME` is not set, the API base URL falls back to:
```
http://localhost:8000/api
```

## Available Endpoints

- `/api/users` - Users list
- `/api/activities` - Activities list
- `/api/workouts` - Workouts list
- `/api/teams` - Teams list
- `/api/leaderboard` - Leaderboard rankings

## Component Structure

- `App.jsx` - Main app with React Router navigation
- `main.jsx` - Entry point with React Router provider
- `api.js` - API client utility with Vite environment variable support
- `components/Users.jsx` - Users list component
- `components/Activities.jsx` - Activities list component
- `components/Workouts.jsx` - Workouts list component
- `components/Teams.jsx` - Teams list component
- `components/Leaderboard.jsx` - Leaderboard ranking component

## API Response Compatibility

The `fetchFromApi()` utility handles multiple response formats:

1. **Direct array response:**
   ```json
   [{"id": 1, "name": "User 1"}, ...]
   ```

2. **Paginated response with `data` field:**
   ```json
   {"data": [{"id": 1, "name": "User 1"}, ...], "total": 100}
   ```

3. **Paginated response with `results` field:**
   ```json
   {"results": [{"id": 1, "name": "User 1"}, ...], "count": 100}
   ```

## Technologies

- React 19
- React Router 6
- Vite 5
- JavaScript ES6+
