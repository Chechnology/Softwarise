# Softwarise

**Where software is built, funded, bought, sold, and monetized.**

Softwarise is a premium software economy platform built for the African tech and creative economy, designed to scale globally. It unifies four core verticals — marketplace, investment, manufacturing, and monetization — into a single, luxury-grade product experience.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 15 (App Router), TypeScript, Tailwind CSS |
| UI Components | shadcn/ui, Framer Motion, Lucide Icons |
| State / Data | React Query, Zustand |
| Backend | Supabase (PostgreSQL, Auth, Storage, RLS) |
| Payments | Stripe (Connect, Escrow, Subscriptions) |
| Email | Resend |
| AI | OpenAI (gpt-4o-mini / gpt-4o) |
| Analytics | PostHog |
| Hosting | Vercel |
| Search | PostgreSQL Full-Text Search (tsvector) |

---

## Project Structure

```
softwarise/
├── app/
│   ├── (auth)/                 # Login, signup, OAuth callback
│   ├── (marketing)/            # Public pages: home, marketplace, invest, build, monetize
│   ├── (dashboard)/            # Authenticated user dashboard
│   ├── admin/                  # Admin panel (role-gated)
│   ├── api/                    # API routes (listings, projects, payments, messages...)
│   ├── globals.css             # Design system & luxury aesthetic
│   ├── layout.tsx              # Root layout
│   ├── sitemap.ts              # Dynamic sitemap generation
│   └── robots.ts               # SEO robots config
├── components/
│   ├── home/                   # Homepage sections (hero, pillars, stats...)
│   ├── marketplace/             # Listing grid, filters, detail page
│   ├── investments/             # Startup grid, deal rooms
│   ├── manufacturing/           # Project grid, proposal forms
│   ├── dashboard/               # Sidebar, widgets, charts
│   ├── admin/                   # Admin widgets
│   ├── layout/                  # Nav, footer
│   └── ui/                      # shadcn/ui primitives
├── lib/
│   ├── supabase/                # Server, client, middleware
│   ├── stripe/                  # Payment & escrow helpers
│   ├── resend/                  # Transactional email templates
│   ├── openai/                  # AI listing optimization, valuation, matching
│   └── utils/                   # Formatters, constants
├── types/                       # Full TypeScript type system
├── supabase/
│   └── migrations/              # Complete SQL schema with RLS
└── middleware.ts                # Auth route protection
```

---

## The Four Pillars

### 1. Software Sale (Marketplace)
Buy and sell SaaS products, mobile apps, websites, domains, and source code. Includes listing creation with AI-assisted optimization, grid/table marketplace views, offer submission, watchlists, and a secure Acquisition Room for deal negotiation.

### 2. Investment Seeking (Capital)
Founders raise capital through startup profiles with funding goals, traction data, and pitch decks. Investors browse deal flow, get AI-powered matching, and negotiate via private Deal Rooms.

### 3. Software Manufacturing (Build)
Clients post project requests with AI-estimated scope. Agencies and freelancers submit milestone-based proposals. Stripe-powered escrow releases funds as milestones are approved.

### 4. Software Monetization
Sellers boost visibility through featured listings, sponsorships, and lifetime deal campaigns. Advertisers purchase homepage, sidebar, and newsletter placements.

---

## Database Architecture

The Supabase schema (`supabase/migrations/001_initial_schema.sql`) includes 24 tables covering users, listings, investments, projects, messaging, payments, and more — with full Row Level Security policies, foreign key constraints, GIN indexes for full-text search, and trigger-based search vector updates.

Key tables: `users`, `profiles`, `listings`, `listing_assets`, `offers`, `acquisition_rooms`, `startup_profiles`, `investor_profiles`, `deal_rooms`, `projects`, `proposals`, `milestones`, `agency_profiles`, `freelancer_profiles`, `advertisements`, `sponsorships`, `conversations`, `messages`, `transactions`, `subscriptions`, `documents`, `notifications`, `reviews`, `activity_logs`.

---

## Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment variables
Copy `.env.example` to `.env.local` and fill in your credentials:
```bash
cp .env.example .env.local
```

### 3. Set up Supabase
```bash
# Push the schema to your Supabase project
supabase db push

# Or run the migration manually via the Supabase SQL Editor:
# supabase/migrations/001_initial_schema.sql
```

Enable Google and LinkedIn OAuth providers in your Supabase Auth settings, and set the redirect URL to `{your-domain}/auth/callback`.

### 4. Configure Stripe
- Create a Stripe Connect platform account for escrow payments
- Set up webhook endpoint: `{your-domain}/api/payments/webhook`
- Subscribe to events: `payment_intent.succeeded`, `payment_intent.payment_failed`, `customer.subscription.*`, `transfer.created`

### 5. Run the development server
```bash
npm run dev
```

Visit `http://localhost:3000`.

---

## Design System

The platform uses a luxury dark-mode-first design language:

| Token | Value |
|---|---|
| Background | `#0B0B0D` |
| Surface | `#111214` |
| Secondary Surface | `#18191C` |
| Primary (Gold) | `#D4AF37` |
| Accent (Blue) | `#3B82F6` |
| Success | `#10B981` |
| Error | `#EF4444` |

Typography uses Inter as the primary typeface with Plus Jakarta Sans for display contexts. All components use CSS custom properties for theming consistency, defined in `app/globals.css`.

---

## Deployment

This project is configured for zero-friction deployment on Vercel:

```bash
vercel --prod
```

`vercel.json` includes security headers, cron jobs for listing expiration and digest emails, and multi-region edge deployment (Frankfurt + Washington D.C. for optimal African and global latency).

---

## Security

- Row Level Security (RLS) enforced on all sensitive tables
- Server-side Supabase auth via `@supabase/ssr`
- Stripe webhook signature verification
- Zod schema validation on all API routes
- KYC-ready architecture (`is_kyc_verified` flag on users)
- Audit logging via `activity_logs` table

---

## License

Proprietary — Softwarise Technologies Ltd. All rights reserved.
