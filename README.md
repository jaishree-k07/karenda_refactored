# Karenda — Weekend Escape Planner

Karenda helps you discover a short, curated weekend escape based on your vibe, budget, and travel time — then turns it into a simple, plannable trip. Built as a single-page React application with Vite.

## Problem & Solution

Planning a quick weekend trip usually means opening a dozen browser tabs across booking sites, blogs, and maps. Karenda solves this by combining destination discovery, personalized recommendations, filtering, budgeting, and saving into one focused flow.

## Features

- **Destination discovery** — browse curated escapes as cards with images, ratings, and quick stats.
- **Search** — live text search across destination name, location, and vibe.
- **Filtering** — filter by vibe, maximum budget, and maximum travel time via a guided preference selector.
- **Sorting** — reorder results by rating, budget (low–high / high–low), or travel time.
- **Personalized recommendations** — a separate "Just for you" section that builds a taste profile from your favorited destinations' tags, falling back to your stated vibe preference, then to top-rated picks if you haven't interacted yet.
- **Destination details** — a full detail modal with highlights, cost estimate, and reviews count.
- **Save / favorite** — toggle favorites, persisted in the browser via `localStorage`.
- **Weekend trip planning & budget calculator** — break down travel, stay, food, and activity costs against your set budget, with a live over/under-budget indicator.
- **Reviews** — mock traveler reviews section.
- **Contact form** — frontend-only contact form (no backend/email delivery).

## Tech Stack

- **Frontend Framework:** React 18 (via Vite)
- **Backend Engine:** None — this is a frontend-only application
- **Database:** None — user data (favorites) is stored client-side in `localStorage`
- **Cloud Hosting:** Vercel

## Project Structure

```text
karenda_refactored/
├── index.html
├── package.json
├── vite.config.js
├── README.md
├── .gitignore
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── styles.css
    ├── components/
    │   ├── Navbar.jsx
    │   ├── Hero.jsx
    │   ├── PreferenceSelector.jsx
    │   ├── DestinationCard.jsx
    │   ├── DestinationModal.jsx
    │   ├── Recommendations.jsx
    │   ├── BudgetPlanner.jsx
    │   ├── Reviews.jsx
    │   ├── Contact.jsx
    │   └── Footer.jsx
    ├── data/
    │   └── destinations.js
    └── utils/
        └── recommend.js
```

## Installation & Setup

```bash
git clone https://github.com/jaishree-k07/karenda_refactored.git
cd karenda_refactored
npm install
```

## Run Commands

```bash
npm run dev       # start local dev server
npm run build     # production build (outputs to dist/)
npm run preview   # preview the production build locally
```

## Environment Configuration

None required. This project has no API keys or external services.

## Deployment

Deployed on **Vercel** as a static Vite build.

| Setting | Value |
|---|---|
| Root Directory | `.` (repo root) |
| Framework Preset | Vite |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Install Command | `npm install` |
| Environment Variables | None |

## Usage Notes

- No login or credentials are required — the app is fully public.
- Favorites persist only in the browser that created them (no cross-device sync, since there's no backend/database).

## Known Limitations

- The contact form does not send real messages; it's a frontend-only demo.
- Recommendations use a simple tag-overlap scoring heuristic rather than a trained model, appropriate for the scope of this project.
