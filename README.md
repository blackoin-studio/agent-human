# Ziki Dashboard Frontend Mockup

A pixel-faithful, responsive frontend recreation of the **Ziki Dashboard** (`ziki.dev/dashboard`) built with **React + Vite + Tailwind CSS + Lucide Icons**, optimized for instant Vercel deployment.

## Features & UI Components

- **Top Navigation Bar (`Navbar.tsx`)**:
  - Custom Ziki geometric logo & brand text
  - **Zedu** organization dropdown menu
  - **Product**, **Marketing**, and **Security** navigation tabs (clickable, switches between views)
  - **Agents** dropdown button showing active bots with status tags
  - User profile chip (**UO** - Uriel Okafor) with dropdown menu
  - Points chip displaying current points (**7,247 pts**)
  - Notification bell with unread badge counter (`1`)

- **Header Section**:
  - `Welcome back, Uriel` greeting & subtitle
  - `+ New Issue` button which opens an interactive modal

- **Four Metric Stat Cards (`StatCard.tsx`)**:
  - **Points**: `7247` with `500 to go` badge and `500 required this week`
  - **Created by me**: `2` with `+2` green badge and `in the last 30 days`
  - **Assigned to me**: `0` with `0` slate badge and `high priority`
  - **Resolved issues**: `0` with `0%` slate badge and `of issues assigned to me`

- **Issues Assigned to Me (`IssuesTable.tsx`)**:
  - Dark container matching original UI
  - Header with `0 issues · sorted by top votes` and `View all issues` button
  - Uppercase column headers (`VOTES`, `ISSUE`, `TYPE`, `PRIORITY`, `STATUS`, `STAGE`, `REPORTED`)
  - **Empty state**: Exact match (*"Nothing assigned to you - Issues assigned to you will show up here."*)
  - Interactive **Preview With Data** toggle to test populated rows
  - Footer showing `Showing 0 issues`

- **Your Points Chart (`PointsChart.tsx`)**:
  - Filter controls: `All dates` selector and `Daily` / `Weekly` / `Monthly` / `Yearly` granularity tabs
  - Total display: `7247` points with `pts in this range`
  - Legend: `500 reached` (blue), `Below 500` (dark slate), and `Weekly requirement · 500 pts` (dashed)
  - 8-Week timeline matching screenshot: Week 1–6 (0), Week 7 high blue spike with `+8747` badge and `7247` count, Week 8 (0)
  - Hover tooltips on chart columns

- **Modular Architecture**:
  - Clean separation into `src/components/` and `src/types/` for easy customization of future pages.

## Getting Started

### 1. Run Locally
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 2. Build for Production
```bash
npm run build
```

### 3. Deploy to Vercel
Simply push this repository to GitHub and import it into [Vercel](https://vercel.com). Vercel will automatically detect Vite and deploy in seconds. `vercel.json` is pre-configured for client-side routing.
