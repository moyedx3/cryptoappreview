# Crypto App Review

A full-stack crypto app review platform with a brutalist design aesthetic, built with Next.js 16, React 19, TypeScript, and PostgreSQL.

![Brutalist Design](https://img.shields.io/badge/Design-Brutalist-black)
![Next.js](https://img.shields.io/badge/Next.js-16-black)
![React](https://img.shields.io/badge/React-19-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue)

## 🚀 Features

### Frontend
- **Brutalist UI** — Bold borders, sharp shadows, mint green (#D1FAE5) accent
- **Responsive Design** — Mobile-first, works on all devices
- **Server-Side Rendering** — Fast initial load, SEO-friendly
- **Dynamic Content** — Fetches reviews from API, no hardcoded data

### Backend
- **REST API** — Full CRUD operations for articles, categories, loved apps
- **PostgreSQL Database** — Structured schema with relationships
- **Admin Panel** — Complete content management at `/admin`
- **Type-Safe** — Full TypeScript coverage

### Admin Panel (`/admin`)
- 📊 **Dashboard** — Stats on articles, categories, subscribers
- 📝 **Article Management** — Create, edit, delete, publish
- 🏷️ **Categories** — Organize reviews by type
- ⭐ **Featured Articles** — Highlight top reviews
- 💾 **Draft/Publish** — Workflow for content creation

## 📁 Project Structure

```
cryptoappreview/
├── database/
│   ├── schema.sql          # Database schema
│   └── seed.sql            # Sample data
├── src/
│   ├── app/
│   │   ├── admin/          # Admin panel pages
│   │   ├── api/            # API routes
│   │   ├── globals.css     # Global styles
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Homepage
│   └── lib/
│       └── db.ts           # Database connection
├── .env.example            # Environment template
├── next.config.ts          # Next.js config
├── package.json
└── README.md
```

## 🛠️ Setup & Installation

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- Git

### 1. Clone & Install

```bash
git clone https://github.com/moyedx3/cryptoappreview.git
cd cryptoappreview
npm install
```

### 2. Database Setup

Create a PostgreSQL database:

```bash
# Using psql
psql -U postgres -c "CREATE DATABASE cryptoappreview;"

# Run schema
psql -U postgres -d cryptoappreview -f database/schema.sql

# (Optional) Seed with sample data
psql -U postgres -d cryptoappreview -f database/seed.sql
```

### 3. Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/cryptoappreview
```

### 4. Run Development Server

```bash
npm run dev
```

Open:
- **Frontend:** http://localhost:3000
- **Admin Panel:** http://localhost:3000/admin

## 📚 API Documentation

### Articles

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/articles` | List articles (supports filters) |
| POST | `/api/articles` | Create new article |
| GET | `/api/articles/[id]` | Get single article |
| PUT | `/api/articles/[id]` | Update article |
| DELETE | `/api/articles/[id]` | Delete article |

**Query Parameters for GET /api/articles:**
- `category` — Filter by category slug
- `featured=true` — Get featured articles only
- `published=false` — Include drafts (admin)
- `limit` — Number of results (default: 10)
- `offset` — Pagination offset

### Categories

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/categories` | List all categories |
| POST | `/api/categories` | Create new category |

### Loved Apps

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/loved-apps` | List loved apps (On the Radar) |
| POST | `/api/loved-apps` | Add loved app |

### Stats

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/stats` | Get dashboard statistics |

## 🎨 Design System

### Colors
- **Primary:** `#D1FAE5` (Mint Green)
- **Background:** `#D1FAE5`
- **Text/Borders:** `#000000` (Black)
- **White:** `#FFFFFF`

### Typography
- **Display:** Anton (Google Fonts)
- **Body:** Inter (Google Fonts)

### Brutalist Elements
- 4px black borders on containers
- Box shadows with pixel offsets (4px, 6px, 8px)
- Sharp corners (no border-radius)
- Uppercase headings with letter-spacing

## 🚀 Deployment

### Railway (Recommended)

1. **Connect Repository**
   - Go to [Railway](https://railway.app)
   - New Project → Deploy from GitHub repo
   - Select `moyedx3/cryptoappreview`

2. **Add PostgreSQL**
   - New → Database → Add PostgreSQL
   - Railway auto-sets `DATABASE_URL`

3. **Deploy**
   - Railway automatically deploys on push
   - Your app is live!

### Environment Variables on Railway

```
DATABASE_URL=${{Postgres.DATABASE_URL}}
```

### Manual Database Setup on Railway

```bash
# Connect to Railway PostgreSQL
railway connect postgres

# Run schema
\i database/schema.sql

# (Optional) Seed data
\i database/seed.sql
```

## 📝 Admin Panel Guide

### Creating an Article

1. Go to `/admin/articles/new`
2. Fill in the form:
   - **Title** — App name (e.g., "MetaMask")
   - **Subtitle** — Feature/version (e.g., "Portfolio Dapp")
   - **Category** — Select from dropdown
   - **Rating** — 1-10 score
   - **Description** — Short summary (shown in cards)
   - **Content** — Full review (markdown supported)
   - **Image URL** — App logo/screenshot
   - **Featured** — Check to highlight on homepage
   - **Publish** — Check to make live
3. Click **Save Article**

### Managing Articles

- **Dashboard** — See stats at `/admin`
- **List View** — All articles at `/admin/articles`
- **Edit** — Click "Edit" on any article
- **Delete** — Click "Delete" (confirms first)

## 🧪 Testing

### Build Test

```bash
npm run build
```

### API Test (with curl)

```bash
# Get all articles
curl http://localhost:3000/api/articles

# Create article
curl -X POST http://localhost:3000/api/articles \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test App",
    "subtitle": "Version 1.0",
    "description": "A test review",
    "content": "Full review here...",
    "rating": 8,
    "category_id": 1,
    "is_published": true
  }'
```

## 🗄️ Database Schema

### Categories
| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL PK | Unique ID |
| name | VARCHAR(100) | Display name |
| slug | VARCHAR(100) | URL-friendly name |
| created_at | TIMESTAMP | Creation date |

### Articles
| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL PK | Unique ID |
| title | VARCHAR(200) | App name |
| subtitle | VARCHAR(200) | Version/feature |
| description | TEXT | Short summary |
| content | TEXT | Full review |
| rating | INTEGER (1-10) | Score |
| category_id | FK | Category reference |
| image_url | VARCHAR(500) | Image URL |
| is_featured | BOOLEAN | Highlighted |
| is_published | BOOLEAN | Live status |
| published_at | TIMESTAMP | Publish date |
| created_at | TIMESTAMP | Creation date |
| updated_at | TIMESTAMP | Last update |

### Loved Apps
| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL PK | Unique ID |
| name | VARCHAR(200) | App name |
| category | VARCHAR(100) | Category name |
| rating | INTEGER (1-10) | Score |
| description | TEXT | Brief description |
| display_order | INTEGER | Sort order |
| is_active | BOOLEAN | Show/hide |

## 🐛 Troubleshooting

### Build Errors

**TypeScript errors with route handlers:**
- Next.js 16 uses `Promise<{ params }>` in route handlers
- Already fixed in the codebase

**Database connection errors:**
- Check `DATABASE_URL` is set correctly
- Ensure PostgreSQL is running
- Verify database exists

### Runtime Errors

**"Cannot find module 'pg'":**
```bash
npm install pg
```

**Empty homepage:**
- Run seed script: `psql $DATABASE_URL -f database/seed.sql`
- Or create articles via admin panel

## 📄 License

MIT — Built by Char for moyedx3

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make changes
4. Test thoroughly
5. Submit PR

---

**Built with:** Next.js 16 · React 19 · TypeScript · PostgreSQL · Tailwind CSS v4
