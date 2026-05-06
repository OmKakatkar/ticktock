# ticktock — Timesheet Management App

A SaaS-style timesheet management application built for the TenTwenty Frontend Technical Assessment.

## Live Demo

[https://ticktock-om.vercel.app](https://ticktock-om.vercel.app)

## Test Credentials

Email: john@tentwenty.me  
Password: password123

## Setup Instructions

### Prerequisites

- Node.js 18+
- Yarn

### Installation

```bash
git clone <repo-url>
cd ticktock
yarn install
```

### Environment Variables

Create a `.env.local` file in the root:

`NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3000`

### Run Development Server

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000)

## Frameworks and Libraries

- **Next.js 16** — App Router, API routes, proxy.ts for route protection
- **React 19** — UI layer
- **TypeScript** — Full type safety
- **Tailwind CSS v4** — Styling
- **next-auth v4** — Authentication with Credentials provider
- **@headlessui/react** — Accessible dropdown components
- **@heroicons/react** — Icons
- **classnames** — Conditional class composition

## Architecture

All client-side data fetching goes through internal Next.js API routes (`/api/*`). Components never call mock data directly — this mirrors real-world API integration patterns.

Mock data lives in `src/lib/mockData.ts` and is served through:

- `GET /api/timesheets` — list of weekly timesheets
- `GET /api/timesheets/[weekId]` — single week detail
- `GET /api/timesheets/[weekId]/entries` — entries for a week
- `POST /api/timesheets/[weekId]/entries` — add a new entry

Authentication is handled by next-auth with a Credentials provider. Sessions are JWT-based. Route protection runs in `proxy.ts` using `getToken` from next-auth/jwt.

## Project Structure

```
src/
app/
(auth)/login/          — Login page
(dashboard)/
timesheets/          — Dashboard table
timesheets/[weekId]/ — Weekly detail view
api/                   — Internal API routes
components/
ui/                    — Button, Input, Select, Badge
timesheets/            — DashboardNav, TimesheetTable,
WeekDetailView, AddEntryModal
lib/                     — Mock data, auth config
types/                   — TypeScript interfaces
```

## Design System

UI primitives (Button, Input, Select, Badge) are reusable, typed components built to be composable across the application.

## Assumptions

- Authentication uses dummy credentials — no real database
- Mock data is in-memory — new entries persist until page refresh
- Pagination UI is present but not wired to real pagination logic
- Date Range and Status filters are rendered but not functional
- The "Edit" and "Delete" actions in the entry menu are rendered but not implemented

## Time Spent

Approximately 8 hours total across two days.
