# Railway Deployment Guide

## Option 1: Dashboard Deployment (Easiest)

1. Go to https://railway.app
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Choose `moyedx3/cryptoappreview`
5. Railway will auto-detect Next.js and deploy

## Option 2: CLI Deployment

Requires interactive login. Run locally:

```bash
npm install -g @railway/cli
railway login
railway init --name cryptoappreview
railway add --database postgres
railway up
```

## Post-Deployment Setup

### 1. Add PostgreSQL
- In Railway dashboard, click "New" → "Database" → "Add PostgreSQL"
- Railway auto-sets `DATABASE_URL`

### 2. Run Database Schema
```bash
railway connect postgres
\i database/schema.sql
\i database/seed.sql
```

Or use Railway's SQL executor in dashboard.

### 3. Environment Variables
These are auto-set by Railway:
- `DATABASE_URL` (from PostgreSQL)
- `PORT` (Railway sets this)

Optional:
- `NEXT_PUBLIC_API_URL` (your Railway domain)

### 4. Get Domain
Railway provides a free `.up.railway.app` domain automatically.

To add custom domain:
```bash
railway domain
```

## API Access for Char

After deployment, provide Char with:

1. **Site URL**: `https://your-project.up.railway.app`
2. **Admin Panel**: `https://your-project.up.railway.app/admin`
3. **API Base**: `https://your-project.up.railway.app/api`

For programmatic access, create API key or share admin credentials.

## Verification Checklist

- [ ] PostgreSQL connected
- [ ] Schema loaded (`articles`, `categories`, `loved_apps` tables)
- [ ] Seed data present
- [ ] Homepage loads with reviews
- [ ] Admin panel accessible
- [ ] API endpoints working:
  - GET /api/articles
  - POST /api/articles
  - GET /api/categories
  - GET /api/loved-apps
  - GET /api/stats
