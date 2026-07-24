# 花间静茶 · Tokonoma

A zen-themed photo gallery — *床之间*, the alcove for displaying nature's beauty through the seasons. Browse photos by month using a vertical-Chinese calendar; upload via the caretaker (admin) page; storage on Cloudflare R2.

## Tech Stack
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4 (custom zen palette in `globals.css`)
- **Animations**: Framer Motion
- **Storage**: Cloudflare R2 (via `@aws-sdk/client-s3`)
- **Icons**: Lucide React

## Design Language
- **Palette**: warm beige paper, sumi ink, matcha tea green, moss, aged gold, plum seal
- **Typography**: Noto Serif SC for Chinese, Cormorant Garamond for accents, Inter for UI labels
- **Surfaces**: soft neumorphism on washi paper background with SVG grain
- **Motion**: slow `cubic-bezier(0.22, 1, 0.36, 1)` easing — drift, never snap
- **Vertical Chinese**: month tiles use `writing-mode: vertical-rl` to mirror traditional almanacs

## Routes
| Route | Purpose |
|-------|---------|
| `/` | Public gallery — calendar nav + masonry grid + lightbox |
| `/admin` | Caretaker — password-gated upload/delete UI |

## API
| Route | Method | Purpose |
|-------|--------|---------|
| `/api/photos?year=&month=` | GET | List photos for a month |
| `/api/photos` | POST (multipart) | Upload — requires `x-admin-password` header |
| `/api/photos/delete` | POST | Delete by key — requires `x-admin-password` header |
| `/api/admin/auth` | POST | Verify admin password |

## R2 Object Layout
```
photos/{year}/{month}/{timestamp}-{caption-slug}.{ext}
```
Caption is encoded into the filename (URL-encoded, hyphenated, max 60 chars). The `parseKey` helper in `app/api/photos/route.ts` decodes it back.

## Environment
```bash
R2_ACCOUNT_ID=
R2_ACCESS_KEY_ID=
R2_SECRET_ACCESS_KEY=
R2_BUCKET_NAME=tokonoma
R2_PUBLIC_URL=https://tokonoma-assets.vibeuncle.com
ADMIN_PASSWORD=change_me
```

## Cloudflare R2 Setup
1. Create bucket `tokonoma` in the Cloudflare dashboard.
2. Enable public access via custom domain (`tokonoma-assets.vibeuncle.com`) or `r2.dev`.
3. Set bucket CORS to allow GET from your site origin.
4. Generate an API token with R2 read/write scoped to the bucket; populate `R2_ACCESS_KEY_ID` / `R2_SECRET_ACCESS_KEY`.

## Getting Started
```bash
npm install
cp .env.example .env.local   # fill in R2 + ADMIN_PASSWORD
npm run dev
```
Open http://localhost:3000 for the gallery, http://localhost:3000/admin for the caretaker view.
