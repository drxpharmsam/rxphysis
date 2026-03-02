# rxphysis

## Frontend

The frontend is a vanilla-JS PWA (originally from [drxpharmsam/mediflow-frontend](https://github.com/drxpharmsam/mediflow-frontend)) and lives in the [`frontend/`](./frontend/) directory.

### Setup & running locally

The frontend has **no build step** — open `frontend/index.html` directly in a browser, or serve it with any static file server:

```bash
# Using Python
cd frontend
python3 -m http.server 8080
# Then open http://localhost:8080
```

```bash
# Using Node.js (npx serve)
cd frontend
npx serve .
# Then open http://localhost:3000
```

### Backend connection

API calls and socket events are currently **pointed at `http://localhost:3000`** (disconnected from the live backend). The real-time socket is also stubbed out with a no-op object so the UI loads without errors.

To reconnect to a backend, edit the top of `frontend/app.js`:

```js
const API_BASE   = 'http://localhost:3000/api';   // change to your backend URL
const SOCKET_URL = 'http://localhost:3000';        // change to your backend URL
const MAPBOX_TOKEN = 'YOUR_MAPBOX_PUBLIC_TOKEN_HERE'; // get one at https://account.mapbox.com/
// and replace the socket stub with:
// const socket = io(SOCKET_URL);
```

See [`frontend/README.md`](./frontend/README.md) and [`frontend/.env.example`](./frontend/.env.example) for the full backend environment variable reference.

---

## Next.js app

The Next.js application lives at the repository root (`app/`, `package.json`, etc.) and is separate from the vanilla-JS frontend above.