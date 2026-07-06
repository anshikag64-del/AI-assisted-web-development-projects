# PKGT Firm Marketing Website — PRD

## Problem statement (original, verbatim)
"Build a super prompt Website for the pdf i am uploading and it should look like real and genrative also UI shall look attractive, where the UX research should be shown also remove the Abhilash Gupta's name"

Source PDF: M/s Pramod Kumar Gupta Thekedar (PKGT) company profile — civil construction firm, 35+ years, Uttar Pradesh, government infrastructure clients.

## Architecture
- **Frontend**: React 19 (single-page site at `/`), TailwindCSS, framer-motion, recharts, sonner
- **Backend**: FastAPI + Motor (MongoDB async) — `/api/contact`, `/api/company/stats`, `/api/health`
- **DB**: MongoDB, `contact_inquiries` collection

## User personas
- Government tender officers (PWD, PMGSY, UP Bridge Corp) evaluating contractor credentials
- Prospective private-sector partners / sub-contractors
- Family members / employees (institutional profile)

## Core requirements (static)
- Hero + 11 sections (Nav, Hero, About, Sectors, Projects, Clients, Research, Machinery, Turnover, Team, Contact, Footer)
- 13 verified projects, 33+ machinery items, 5-yr turnover chart
- Dedicated Research & Insights (UX / project analytics) section — differentiator
- HARD constraint: name "Abhilash Gupta" must NOT appear anywhere
- Contact form saves enquiries to MongoDB

## Implemented (Dec 2025)
- Single-page cinematic industrial dark site (bento sectors, tabular projects, bar-chart turnover)
- Bar-chart turnover + CAGR block
- Sonner toast validation on contact form + `/api/contact` POST persistence
- Data centralised in `/app/frontend/src/data/site.js`
- Fully data-testid annotated
- Passed backend + frontend testing (iteration_1)

## Backlog
### P0
- (none)
### P1
- Real project photography (currently uses generic Unsplash/Pexels)
- Client-logos section with actual logo images
- Downloadable PDF profile / brochure
### P2
- i18n Hindi toggle
- Admin dashboard to view/export contact enquiries
- Case-study deep-dive pages per project
- Google Maps embed on Contact section

## Next tasks
- Awaiting user feedback and prioritisation of P1 items.
