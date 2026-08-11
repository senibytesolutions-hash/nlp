# National Lawyers Parliament (NLP) — Website (Phase 1)

A production-quality MERN foundation for the National Lawyers Parliament website. This is
**Phase 1**: public-facing site + two working form endpoints (membership applications and contact
messages). Authentication, an admin dashboard, and content management are intentionally out of
scope and will be added in a later phase.

## Stack

**Frontend:** React 18, Vite, Tailwind CSS, React Router, Framer Motion, Lucide React
**Backend:** Node.js, Express, MongoDB, Mongoose

## Project structure

```
nlp-website/
├── frontend/               React + Vite client
│   ├── src/
│   │   ├── assets/          NLP logo
│   │   ├── components/      Navbar, Footer, Button, Card, form pieces, animation wrappers
│   │   ├── pages/            Home, About, Join, Contact
│   │   ├── lib/api.js        Axios client for the backend API
│   │   ├── App.jsx, main.jsx, index.css
│   └── ...config files
└── backend/                Express + MongoDB API
    ├── config/db.js         MongoDB connection
    ├── models/               Application, ContactMessage (Mongoose schemas)
    ├── controllers/          Request handlers
    ├── routes/                /api/applications, /api/contact
    ├── middleware/            Validation + centralized error handling
    ├── utils/validators.js    express-validator rule sets
    └── server.js
```

## Getting started

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env      # then set MONGO_URI, PORT, CLIENT_ORIGIN
npm run dev                # starts on http://localhost:5000
```

Requires a running MongoDB instance (local `mongod`, or a MongoDB Atlas connection string in
`MONGO_URI`).

### 2. Frontend

```bash
cd frontend
npm install
cp .env.example .env      # set VITE_API_URL if the backend isn't on localhost:5000
npm run dev                 # starts on http://localhost:5173
```

Open `http://localhost:5173` in your browser. The Join and Contact forms submit to the backend
API and are validated on both the client and server.

## API reference (Phase 1)

| Method | Route                | Description                          |
|--------|-----------------------|--------------------------------------|
| GET    | `/api/health`          | Health check                         |
| POST   | `/api/applications`    | Submit a membership application      |
| POST   | `/api/contact`         | Submit a contact message             |

Both POST routes are rate-limited (20 requests / 15 minutes per client) and validated with
`express-validator`. Responses follow the shape `{ success, message, data? , errors? }`.

## Design system

- **Colors:** deep green (`forest`), muted gold (`gold`), warm white (`parchment`), light gray
  (`stone`), dark gray (`charcoal`), near-black green (`ink`) — all defined in
  `frontend/tailwind.config.js`.
- **Type:** Fraunces (display/headings), Inter (body), IBM Plex Mono (labels/eyebrows).
- **Signature motif:** a gold "balance scale" divider (`ScaleDivider.jsx`) echoing the NLP crest,
  used sparingly between major sections.

## What's intentionally NOT in Phase 1

- Authentication / JWT
- Admin dashboard
- Announcement content management (CMS)
- User roles/permissions

These shipped in Phase 2 (see below) without breaking the Phase 1 public site or its
Application/ContactMessage models.

## Phase 2 — Admin system

Adds a JWT-protected admin dashboard at `/admin/*`, backed by an `Admin` model (bcrypt-hashed
passwords) and an `Announcement` model. The public Home page's announcement banner now pulls
active announcements from the API instead of static content.

**Auth:** login issues a JWT stored in an httpOnly cookie (not localStorage) — safer against XSS.
`GET /api/auth/me` restores the session on page refresh. All `/api/admin/*` routes are protected
by the `protect` middleware.

**Seeding the first admin:**

```bash
cd backend
npm run seed:admin
```

Default seeded credentials (change via `ADMIN_SEED_EMAIL` / `ADMIN_SEED_PASSWORD` in `.env`
before seeding, and change the password again after first login):

- Email: `admin@nlp.org`
- Password: `admin123`

**New admin routes (frontend):** `/admin/login`, `/admin/dashboard`, `/admin/applications`,
`/admin/applications/:id`, `/admin/announcements` — all except `/admin/login` require an active
session and redirect to login otherwise.

**New API routes (backend):**

| Method | Route                                   | Access  |
|--------|-------------------------------------------|---------|
| POST   | `/api/auth/login`                          | Public  |
| POST   | `/api/auth/logout`                         | Private |
| GET    | `/api/auth/me`                             | Private |
| GET    | `/api/admin/applications`                  | Private |
| GET    | `/api/admin/applications/stats`            | Private |
| GET    | `/api/admin/applications/:id`              | Private |
| PATCH  | `/api/admin/applications/:id/status`       | Private |
| POST   | `/api/admin/applications/:id/notes`        | Private |
| DELETE | `/api/admin/applications/:id`              | Private |
| GET    | `/api/announcements/active`                | Public  |
| GET    | `/api/admin/announcements`                 | Private |
| POST   | `/api/admin/announcements`                 | Private |
| PUT    | `/api/admin/announcements/:id`             | Private |
| PATCH  | `/api/admin/announcements/:id/toggle`      | Private |
| DELETE | `/api/admin/announcements/:id`             | Private |

## Production build

```bash
cd frontend
npm run build     # outputs static files to frontend/dist
```

Serve `frontend/dist` via any static host (Vercel, Netlify, Nginx, etc.), and deploy `backend/`
to a Node host (Render, Railway, a VPS) with `MONGO_URI` and `CLIENT_ORIGIN` set to your deployed
frontend's origin.
