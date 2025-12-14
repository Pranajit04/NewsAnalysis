# News Analysis Platform

Hack Zenith — Team FnaTicOG  
Priyanshu Bakshi · Pranajit Banerjee · Atanu Sarkar

## What it does
- Collects news (text + video), tags the related ministry/department, and scores sentiment.
- Retro-themed Next.js UI with auto-refresh and manual refresh.
- AI search button hits Google News to pull fresh articles.
- Backend can alert on negative news.

## Tech in plain words
- Frontend: Next.js 13 + Tailwind, retro styling, Google News search.
- Backend: Django with crawlers (BeautifulSoup/Selenium), DistilBERT for categories, RoBERTa for sentiment.
- Proxy: Frontend calls `/api/backend/*`, which rewrites to the Django server set in `NEXT_PUBLIC_API_BASE_URL`.

## Run locally (simple steps)
```bash
# Backend
cd server
python -m venv .venv && .venv\Scripts\activate   # macOS/Linux: source .venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver 0.0.0.0:8000

# Frontend
cd ../client
cp .env.example .env.local    # create/edit if missing
# set NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8000
npm install
npm run dev
```

## Env you need
- `NEXT_PUBLIC_API_BASE_URL`: Django base URL (defaults to `http://127.0.0.1:8000`). Requests to `/api/backend/...` get proxied there.

## Data flow (at a glance)
1) Backend scrapes/classifies/scores and serves JSON at `/`.  
2) Frontend `latestPosts` calls `/api/backend/` (rewrite → backend).  
3) AI search calls `/api/googleNews?query=...` for Google News results.  
4) Negative items can trigger backend email alerts.

