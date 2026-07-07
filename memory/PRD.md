# BloomNest AI — PRD

## Problem statement
Millions of mothers struggle to balance childcare, family, finances, health, and career growth. There is no single AI-powered platform that helps mothers manage every aspect of their lives. BloomNest AI is the AI Operating System for Mothers.

## User personas
- New mothers
- Stay-at-home mothers
- Working mothers
- Women returning to work
- Freelancers, students with children

## Core requirements (static)
- Emotional, premium, calming, empowering brand
- Landing + full dashboard with 6 modules
- AI Life Balance Score (hero feature)
- AI Life Coach (Claude Sonnet 4.5)
- Baby care, Career hub, Finance, Meals, Health, Settings
- Dark + light mode

## Architecture
- Frontend: React 19 + Tailwind + Framer Motion + Recharts + shadcn/ui
- Backend: FastAPI + MongoDB (Motor)
- Auth: Emergent-managed Google Auth (session_token cookie)
- AI: Claude Sonnet 4.5 via emergentintegrations
- Storage: Emergent object storage (resume uploads)

## Implemented (v1 — Feb 2026)
- Landing page (hero, problem, features, testimonials, pricing, FAQ, footer) with dark/light toggle
- Emergent Google Auth full flow
- Dashboard shell + sidebar + topbar
- Life Balance Score with sub-scores + AI suggestions
- Analytics charts (weekly productivity, baby sleep)
- Calendar + upcoming events widgets
- Baby module: CRUD + growth chart
- Career module: resume upload + AI ATS analysis + cover letter generator + job tracker
- AI Coach: streaming chat with Claude Sonnet 4.5

## Backlog (P0/P1/P2)
- P0: Interview practice module (Career)
- P0: Finance module full build (expenses, budgets, bill scanner)
- P1: Meal planner with baby food + shopping list
- P1: Health tracking (water, mood, cycle, sleep native)
- P1: Notifications (vaccination reminders push)
- P2: Native mobile apps
- P2: Nanny mode / family sharing
- P2: Stripe subscriptions

## Next tasks
- Finance module
- Interview practice with AI mock interviews
- Notifications engine
