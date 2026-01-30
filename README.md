# Crypto App Review - Full Stack Application

A crypto app review platform with Next.js frontend and PostgreSQL backend.

## Features

- **Frontend:** Brutalist design, responsive, server-side rendering
- **Backend:** REST API with Next.js API routes
- **Database:** PostgreSQL with structured schema
- **Admin Panel:** Full CRUD for articles, categories, loved apps

## Setup

### 1. Database Setup

Create a PostgreSQL database and run the schema:

```bash
psql -U your_user -d your_database -f database/schema.sql
```

Or use Railway's PostgreSQL service.

### 2. Environment Variables

Copy `.env.example` to `.env.local` and fill in:

```bash
DATABASE_URL=postgresql://user:password@host:port/database
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Run Development Server

```bash
npm run dev
```

Visit:
- Frontend: http://localhost:3000
- Admin: http://localhost:3000/admin

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/articles` | GET | List articles (with filters) |
| `/api/articles` | POST | Create article |
| `/api/articles/[id]` | GET | Get single article |
| `/api/articles/[id]` | PUT | Update article |
| `/api/articles/[id]` | DELETE | Delete article |
| `/api/categories` | GET | List categories |
| `/api/categories` | POST | Create category |
| `/api/loved-apps` | GET | List loved apps |
| `/api/loved-apps` | POST | Create loved app |
| `/api/stats` | GET | Dashboard stats |

## Admin Panel

Access at `/admin` for:
- Dashboard with stats
- Create/Edit/Delete articles
- Manage categories
- View subscribers

## Deployment

### Railway

1. Connect GitHub repo to Railway
2. Add PostgreSQL service
3. Set `DATABASE_URL` environment variable
4. Deploy!

## Built With

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS v4
- PostgreSQL
- pg driver
