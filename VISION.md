# Ully AI — Product Vision & Roadmap

> This document captures the long-term product direction, strategic priorities,
> and build roadmap for Ully AI. Updated as the vision evolves.
> For technical architecture and dev commands, see CLAUDE.md.

---

## What Ully Is Becoming

Ully began as a coffee companion. The long-term vision is a category-defining platform:

**Ully is a purpose-built professional intelligence platform for skilled trades and
supply-chain industries — starting with coffee, expanding to every domain where
expert knowledge is locked inside people's heads and unavailable at the moment
it is needed most.**

The core product belief:
> Professionals in the field — a barista dialling in at 6am, a technician
> diagnosing a faulty group head mid-service, a café owner reconciling labour
> cost against daily covers — need expert-level answers and actionable business
> data immediately. Not after a Google search, not after a call to a consultant.
> Ully puts that capability in their pocket, tailored to their trade.

---

## Positioning

| What Ully is | What Ully is not |
|---|---|
| A purpose-built professional tool for the coffee industry | A general-purpose chatbot |
| Domain-specific, opinionated, and expert-calibrated | Broad, vague, or hedging |
| Offline-capable and field-ready | Dependent on a continuous connection |
| Grounded in a proprietary curated knowledge base | Relying solely on AI generation |
| A connected platform spanning the supply chain | A single-use consumer application |
| Custom-engineered tool integrations for real workflows | A generic dashboard bolted onto third-party data |

---

## Phase 1 — Ully Coffee (Current)

**Status:** Built. Android APK in internal testing. iOS pending Apple Developer enrollment.

**Who it serves:** Baristas, home enthusiasts, café owners, coffee professionals.

**Core features:**
- AI chat assistant (Claude Sonnet) — coffee-only, precision responses, no preamble
- Personal recipe library with procedural art covers
- Curated barista content and blog feed
- Café bookmarking and personal coffee map
- Coffee news aggregation (Perfect Daily Grind, Barista Magazine, Daily Coffee News)
- Weather-aware drink and brew recommendations
- Espresso dial-in assistant with photo analysis

**Launch blocklist:**
- [ ] Apple Developer Program enrollment
- [ ] Google Play Console internal testing sign-off
- [ ] Google Play Console store listing + data safety form
- [ ] Production EAS build (AAB) for Play Store submission

---

## Phase 2 — Professional Operations Layer

**Status:** Planned post-launch.

This phase deepens Ully's value for the two highest-leverage professional personas:
**espresso technicians** and **working baristas**. Both need tools that go beyond
AI chat — they need structured, longitudinal records tailored to their daily workflow.

---

### 2a — Offline Knowledge Base

**The problem:** Ully currently requires an internet connection for every AI response.
Professionals work in cellars, roasting facilities, machine rooms, and remote locations
where connectivity is unreliable or absent.

**The solution:** A curated, proprietary knowledge base authored from verified domain
expertise, queryable on-device with no API call required.

#### Architecture

```
User question
      ↓
KnowledgeService (SQLite FTS5 — on-device)
      ↓
 offline?  ──YES──▶  Return best KB match as Ully response
      │
      NO
      ↓
Inject top KB match as grounding context into Claude system prompt
      ↓
Claude API response (enhanced and grounded by KB context)
```

#### Knowledge Base Structure

Each entry:
```json
{
  "id": "espresso-bitter-001",
  "category": "troubleshooting",
  "method": "espresso",
  "question": "Why is my espresso bitter?",
  "tags": ["bitter", "over-extraction", "grind", "temperature"],
  "answer": "Full expert answer here...",
  "related": ["espresso-sour-001", "grind-size-001"]
}
```

#### Target Categories (v1 KB)

| Category | Target entries |
|---|---|
| Espresso troubleshooting | 40–50 |
| Filter / pour over methods | 25–30 |
| Equipment maintenance | 30–40 |
| Water chemistry | 15–20 |
| Grinder calibration | 15–20 |
| Milk texturing / latte art | 20–25 |
| Dial-in guides per method | 10–15 |
| Roast basics | 15–20 |
| Café ops / workflow | 15–20 |
| **Total** | **~200 entries** |

#### Why this matters

- Reduces Claude API costs — common questions resolved by the KB, not the API
- Makes Ully field-ready — works anywhere, anytime, without a connection
- The KB is proprietary — competitors cannot replicate it by using Claude
- Grounds Claude's answers in verified, curated expertise

#### Files to create

```
services/KnowledgeService.ts     — SQLite FTS5 search, ranked results
assets/knowledge/coffee.json     — authored knowledge base
hooks/useUllyChat.ts             — KB check before/alongside Claude
```

---

### 2b — Maintenance Schedule Tracking

**Who it serves:** Espresso technicians, café owners, head baristas managing equipment.

**The problem:** Equipment maintenance in the coffee industry is managed informally —
paper logs, memory, or nothing at all. Missed maintenance intervals mean machine
failure mid-service, voided warranties, and costly emergency callouts. No purpose-built
mobile tool exists for technicians managing multi-site fleets.

**The solution:** A structured, on-device maintenance log tailored to commercial
espresso equipment — custom-engineered for the technician's workflow, not adapted
from a generic maintenance app.

#### Core functionality

- Machine registry — add machines by type, location, serial number
- Maintenance schedule per machine — custom intervals for each service type
- Service log — technician records each visit: parts replaced, notes, photos
- Push reminders — notify before a service interval expires
- Multi-site view — technicians managing multiple cafés see all machines in one list

#### Schema per service record

```ts
{
  id: string
  machineId: string
  serviceType: 'group_service' | 'boiler_flush' | 'descale' | 'gasket' | 'custom'
  completedAt: string       // ISO timestamp
  technicianNote: string
  partsReplaced?: string[]
  photoUri?: string
  nextDueAt: string         // calculated from interval setting
}
```

**AsyncStorage key:** `@ully_maintenance_{uid}`

**Phasing:** v1 is on-device only. Multi-technician sync (shared Firestore) is Phase 3
when the Business tier is live.

---

### 2c — Training Logs & Personal Performance

**Who it serves:** Baristas at all levels — from new hires tracking their development
to competition-level professionals logging prep sessions.

**The problem:** Barista skill development is tracked informally or not at all.
Coaches provide feedback verbally. Competition prep sessions are undocumented.
There is no tool purpose-built for tracking a barista's longitudinal performance.

**The solution:** A structured training log that captures session data, ties it to
Ully AI feedback, and gives the barista a clear view of their progression over time —
custom-made for the professional barista, not adapted from a fitness tracker.

#### Core functionality

- Session log — drill type, duration, focus area, self-assessment score
- Ully AI integration — log a question during training, it auto-attaches to the session
- Skill tags — milk texture, extraction consistency, workflow speed, sensory calibration
- Progression view — chart of self-assessed scores over time per skill area
- Coach notes — optional field for instructor feedback

#### Schema per session

```ts
{
  id: string
  createdAt: string
  drillType: string              // 'espresso_workflow' | 'milk_texture' | 'cupping' | custom
  durationMinutes: number
  focusArea: string
  selfScore: 1 | 2 | 3 | 4 | 5
  notes: string
  coachNotes?: string
  linkedChatId?: string          // attaches a Ully AI exchange to the session
  tags: string[]
}
```

**AsyncStorage key:** `@ully_training_{uid}`

---

### 2d — User Feedback & Dataset Pipeline

**The problem:** The offline KB starts with manually authored entries. To grow it
faster and reflect real user questions, Ully needs a voluntary feedback loop where
users contribute Q&A pairs back to the knowledge base.

**What this is not:** Fine-tuning Claude. Anthropic does not allow model fine-tuning
via the API. This is a **feedback pipeline that informs KB authoring** — contributions
are reviewed by a human and promoted into the offline KB. Never describe this as
"training the AI" in UI copy.

#### User-facing flow

```
User asks question → Claude answers
        ↓
Subtle thumbs row appears below response (not a modal)
  👍  👎  · Share to improve Ully
        ↓
User taps "Share to improve Ully"
        ↓
Single confirmation sheet:
  "This Q&A will be sent anonymously to help improve
   Ully's knowledge base. No personal info is included."
  [ Send anonymously ]   [ No thanks ]
        ↓
Q&A pair + metadata written to Firestore feedback collection
        ↓
You review → strong entries authored into offline KB
```

#### When to show the prompt

Do not prompt after every message. Show only when:
- Response is 3+ sentences long
- User has not been prompted in the last 10 messages
- User has not disabled feedback prompts in Settings

#### Firestore schema

```
feedback/{autoId}
  question:    string
  answer:      string
  rating:      'helpful' | 'not_helpful'
  shared:      boolean
  method:      string | null    — espresso, pour_over, etc. if detectable
  category:    string | null    — troubleshooting, technique, etc.
  appVersion:  string
  createdAt:   timestamp
  // NO uid, NO email, NO location — anonymous by design
```

#### Privacy requirements before shipping

- Explicit opt-in only — never collect silently
- Update `public/privacy.html` to disclose feedback collection
- Update Play Store data safety form
- Add feedback opt-out toggle in Settings screen
- Firestore rules must restrict feedback collection to authenticated writes, no client reads

#### The compounding effect

```
Users share feedback
      ↓
Identify the 20 most frequently asked questions
      ↓
Author those as KB entries with expert-level answers
      ↓
KB entries serve those questions offline at zero API cost
      ↓
Better answers → more sharing → more KB entries → better Ully
```

This is how the proprietary crop-to-cup dataset starts — not with a data
engineering project, but with a feedback button and human curation.

---

## Phase 3 — Ully Business

**Status:** Planned. Target: 6–12 months post-launch.

**Who it serves:** Café owners, multi-site operators, hospitality group managers.

**The problem:** A café owner's critical business data is fragmented across
incompatible systems — a POS for sales, an espresso machine logging volumetrics,
and accounting software tracking P&L. No tool connects these data points into a
unified view purpose-built for coffee business decision-making. Owners make
consequential decisions based on gut feel because the data exists but is not
accessible in a useful form.

**The solution:** A custom-engineered business intelligence layer integrated directly
into Ully — connecting POS data, machine volumetrics, and accounting systems to
give the owner a real-time operational picture and AI-assisted decision support.
Built in-house, tailored for the coffee operator, not adapted from a generic BI tool.

---

### Tool Integrations

#### Point of Sale — Square (v1)

Square is the most widely deployed POS in independent specialty cafés. The Square
API provides transaction-level data, item sales, and staff performance metrics.

**Data Ully ingests:**
- Daily, weekly, monthly revenue — by location, by shift, by item
- Top-selling items and revenue contribution by category
- Labour cost as a percentage of sales
- Hourly transaction volume — identifies peak and dead periods

**Ully AI layer:** Owner asks "Why was Tuesday revenue down 18%?" — Ully correlates
the POS data with weather, staffing, and prior week trends and surfaces a plain-
language answer with a recommended action.

**Future:** Toast, Lightspeed, and Kounta integrations follow the same pattern.
Square is prioritised because it covers the largest share of the target market.

#### Machine Volumetrics

**v1 — Manual input + photo analysis:**
Most commercial espresso machines do not expose data via API. The v1 approach
is structured manual input by the technician or head barista — shots pulled,
average extraction time, machine temperature log — with optional photo of the
shot or screen display.

**v2 — Native machine API (where supported):**
La Marzocco (Linea PB, KB90), Sanremo, and a growing number of commercial
machines expose Bluetooth or Wi-Fi APIs. Ully will integrate these where the
API is accessible, surfacing live group temperature, shot counter, and
boiler pressure directly in the app.

**Data Ully captures:**
- Daily shot count per group head
- Average extraction time and variance
- Temperature stability log
- Service interval proximity alert (feeds into maintenance schedules from Phase 2b)

#### QuickBooks Integration

**Target:** Café owners already using QuickBooks Online for accounting.

**Data Ully ingests (read-only OAuth connection):**
- Monthly P&L summary — revenue, COGS, gross margin
- Labour cost tracking against revenue
- Supplier invoices — cost-per-kg green coffee, consumables trend
- Cash flow position — current vs prior period

**Ully AI layer:** Owner asks "Am I on track to hit my margin target this quarter?"
Ully pulls the QuickBooks data, cross-references it with POS revenue, and
surfaces a direct answer with the specific levers available to close any gap.

**Implementation approach:** QuickBooks Online OAuth 2.0 + Intuit API. Read-only
scopes only — Ully never writes to the customer's accounting records.

---

### Business Intelligence Dashboard

A dedicated owner view inside Ully — not a web dashboard, but a native mobile
screen purpose-built for the café operator checking performance between shifts.

**Key views:**
- Today at a glance — revenue, covers, top item, machine status
- Weekly trend — revenue vs prior week, labour %, best and worst shifts
- Machine health — all machines, maintenance status, next service due
- Cost alerts — if COGS or labour crosses a set threshold, Ully flags it proactively
- AI summary — "Here is what your business data is telling you today"

**Who accesses this:** Business tier subscribers only. Individual barista accounts
on the same location see their training logs and shift performance only — not the
full P&L.

---

## Phase 4 — Ully Roaster

**Status:** Future. Follows the Business tier.

**Who it serves:** Independent roasters, head roasters, Q Graders, green coffee buyers.

**The problem:** Roasters rely on institutional knowledge and expensive, desktop-bound
software (Cropster, Artisan) that offers no AI-assisted guidance. Developing profiles
for new green coffees, diagnosing roast defects, and managing blend consistency are
solved by experience — not tools.

**Core features:**
- Roast profile development assistant — charge temp, first crack prediction, development ratio
- Green coffee intake — origin, variety, process, moisture, density logging
- Cupping score tracking — lot comparison, QC over time
- Blend formulation — target profile matching and component ratio adjustment
- Inventory management — green coffee freshness windows and lot aging alerts
- Roast defect troubleshooting (tipping, scorching, baked, underdeveloped)
- Direct connection to Ully Coffee consumer data — "what are baristas saying about this origin?"

**Why this follows Phase 3:**
- Requires the shared Firestore data layer established in the Business tier
- Roasters are reachable and willing to pay ($100–300/month per seat)
- Bridges the farm world and the consumer world in the crop-to-cup data platform
- Cropster integration or interop may be required — scope TBD

---

## Phase 5 — Ully Agriculture

**Status:** Future. Requires dedicated resourcing and regional partnerships.

**Who it serves:** Smallholder coffee farmers, cooperative managers, agronomists,
farm owners in producing regions (Ethiopia, Colombia, Brazil, Guatemala, Indonesia).

**The problem:** Over 70% of coffee is grown by smallholder farmers with under
5 hectares. Purpose-built technology tools are virtually nonexistent for this
population. Agronomic knowledge is passed down verbally or via infrequent extension
service visits. Climate change is accelerating crop stress. Actionable, localised
information saves harvests and livelihoods.

**Core features:**
- Plant disease identification from photos (coffee leaf rust, CBD, CLR, Anthracnose)
- Soil management — pH, nitrogen, micronutrients, amendment recommendations
- Harvest timing — cherry ripeness assessment via camera
- Processing method guidance — washed vs natural vs honey based on local conditions
- Yield forecasting and tracking
- Climate adaptation — altitude shifts, drought response, shade management
- Certification preparation — organic, Fair Trade, Rainforest Alliance, UTZ checklists
- Hyperlocal weather integration — forecast impact on harvest and processing decisions

**Technical requirements beyond current Ully stack:**
- Full offline capability — farms have no reliable connectivity
- Multi-language — Spanish, Amharic, Indonesian, Portuguese, Swahili
- Low-bandwidth optimisation — images compressed heavily before processing
- Firestore sync when connected — farm records persist across devices and seasons

**Revenue model:**
- Direct to cooperative or farm association (B2B, not individual farmer)
- NGO and impact investment partnerships (USAID, World Bank, Gates Foundation have
  active coffee agriculture programmes)
- Importer-funded access — importers pay per farm onboarded for supply chain traceability data

---

## The Crop-to-Cup Data Platform

**This is the long-term strategic asset.**

Each Ully vertical captures proprietary data at its node of the supply chain:

```
Ully Agriculture
  ↓  farm ID, soil data, variety, process, harvest date, certifications
Ully Logistics (future)
  ↓  lot tracking, shipping conditions, transit time, customs documentation
Ully Roaster
  ↓  green coffee intake, roast profile, cupping score, blend composition
Ully Business
  ↓  POS revenue, machine volumetrics, labour cost, consumer demand signals
Ully Coffee (current)
  ↓  barista technique, consumer feedback, brew method preference
```

When this data flows between verticals, Ully becomes a **traceability and quality
correlation platform** — the first tool that connects soil composition and farm
practice to cup quality and consumer preference at scale.

**This dataset does not exist anywhere.** It is Ully's long-term competitive moat.

### Consumer-facing traceability

A barista or consumer scans a QR code on a coffee bag and sees:
- Farm name, region, altitude, farmer name
- Harvest date, processing method, certifications
- Green coffee cupping score
- Roaster's profile notes
- Brewing recommendations from Ully AI

This transparency is demanded by specialty coffee buyers and increasingly required
by importers navigating EU deforestation regulation and ethical sourcing mandates.

---

## Vertical Expansion Beyond Coffee

After proving the model across the crop-to-cup chain, the platform architecture
applies directly to other skilled trades with the same professional identity,
operational knowledge gap, and mobile-first workflow characteristics.

**Prioritisation criteria:**
1. Low liability — advice cannot directly injure or kill
2. Strong professional community — word-of-mouth distribution
3. Underserved by existing software
4. Mobile-first workflow — field, not desk
5. Demonstrated willingness to pay for tools that save time

**Target verticals in priority order:**

| Vertical | Professionals served | Key use case |
|---|---|---|
| **Restaurant / F&B** | Chefs, kitchen managers, sommeliers | Kitchen ops, supplier management, recipe scaling, compliance |
| **Independent auto repair** | Mechanics, shop owners | Diagnosis assistance, repair procedures, parts lookup |
| **HVAC / Plumbing / Electrical** | Independent contractors | Troubleshooting, code compliance, part identification |
| **Agriculture (general)** | Farmers, agronomists | Crop disease identification, soil management, yield optimisation |
| **Welding / Fabrication** | Welders, fabricators | Procedure lookup, material compatibility, certification preparation |

**Regulated industries (aviation, medical, legal) — approach after Series A:**
These verticals carry real opportunity but require legal counsel, compliance
frameworks, and validation processes that are not appropriate until the platform
has proven revenue and has dedicated compliance resources in place.

---

## Business Model & Pricing

### Tier structure

| Tier | Price | What's included |
|---|---|---|
| **Free** | 14-day full Pro trial, then limited | 20 AI messages/day, basic recipe library, news feed |
| **Pro** | $9.99/month or **$79/year** | Unlimited AI, shot history, full dial-in assistant, offline KB, training logs |
| **Business** | $24.99/location/month | Everything in Pro + maintenance scheduling, shared recipe library, POS integration, machine volumetrics, QuickBooks connection, team performance view, priority support |
| **Technician Lifetime** | $149 one-time (first 100 CTG members) | Full Pro forever — seeding the highest-leverage professional community |

### Pricing anchors

- $79/year Pro = what Cropster charges **per month** — position this explicitly
- $9.99/month Pro = 33% below Barista Hustle's $15/month individual tier
- $24.99/location Business = a 20-location chain is $500/month MRR from one account
- The Business tier's tool integrations (POS, QuickBooks, volumetrics) are the
  primary justification for the price step-up — position as a purpose-built
  operations platform, not a chat upgrade
- Launch with a 14-day full Pro trial, not a feature-limited free tier — professionals
  need to experience the complete product before committing

### Business model evolution

| Phase | Model | Target price |
|---|---|---|
| v1 Consumer | 14-day Pro trial → freemium conversion | $9.99/month or $79/year |
| v2 Professional | Pro + offline KB + maintenance + training logs | $14.99/month |
| v3 Business | Location-based operator licence with tool integrations | $24.99/location/month |
| v4 Roaster | Roaster seat licence | $99–299/month/seat |
| v5 Agriculture | Cooperative licence (B2B) | $500–2000/month/cooperative |
| Platform | Data licensing + traceability API | Enterprise contract |

---

## 90-Day GTM Plan (March — June 2026)

### Community channels — where to show up

| Channel | Audience | Approach |
|---|---|---|
| **r/espresso** (546K members) | Home baristas, enthusiasts | Post expert troubleshooting threads — no promotion, genuine expertise only |
| **Barista Hustle Forum** | Serious professionals, Matt Perger community | High-quality methodology posts; most influential professional forum in the industry |
| **Coffee Technicians Guild** | Working technicians | Direct outreach; CTG member Pro offer — highest-leverage early adopter community |
| **Home-Barista.com** | Equipment-focused enthusiasts | Equipment repair and dial-in threads |
| **Instagram / TikTok** | Barista culture | Field content, dial-in videos |
| **Perfect Daily Grind** | Global specialty professionals | Contributed articles, press pitch |
| **Sprudge** | Culture and technology audience | Press pitch — receptive to novel products |
| **Daily Coffee News** | Industry professionals | First press pitch target — most likely to cover a solo-founder story |

### Press pitch targets — priority order

1. **Daily Coffee News** — most likely to cover a solo-founder coffee technology
   launch with a technician angle
2. **Sprudge** — covers culture and technology, receptive to novel products
3. **Perfect Daily Grind** — larger audience, higher editorial bar; better suited
   for a follow-up story post-WoC with user data and testimonials

**Pitch angle:** *"A working espresso technician built the professional AI platform
the industry has been waiting for — and launched it at World of Coffee."*

### Influencer targets (post-launch)

- **James Hoffmann** (2.35M YouTube) — does not take paid placements; pitch on
  technical merit only; approach at the 3-month mark with an established user base
- **Morgan Eckroth** (1M+ YouTube, 2022 US Barista Champion) — most authentic
  professional barista voice in the market; natural Ully user persona

### Week-by-week plan

**March 2026 — Now (6 weeks to WoC)**
- [ ] Register for World of Coffee San Diego at usa.worldofcoffee.org
- [ ] Email CTG at ctg@sca.coffee — introduce Ully, propose free Pro for members
- [ ] Expedite Apple Developer Program enrollment — TestFlight critical for WoC
- [ ] Enroll in SCA professional membership ($100/year — network access)
- [ ] Founder begins posting expertise on r/espresso and Barista Hustle Forum
      (no promotion — genuine knowledge sharing only)
- [ ] Draft three media pitches: Daily Coffee News, Sprudge, Perfect Daily Grind
- [ ] Print 100 QR code cards for Android beta + TestFlight (once live)
- [ ] Start March 15: WoC pre-event content series on Instagram/TikTok

**April 2026 — WoC San Diego (April 10–12)**
- [ ] Attend WoC as professional attendee — target 10 live product demos on the
      show floor with baristas and technicians
- [ ] Collect 5 written or video testimonials from demo users
- [ ] Post daily WoC field reports from a working technician's perspective
- [ ] Press pitches go live the week of April 7
- [ ] Soft public launch: Google Play Store open beta or early access

**May 2026 — Post-WoC consolidation**
- [ ] Publish post-WoC recap (blog or PDG contributed piece)
- [ ] Activate CTG member offer: free 90-day Pro trial for verified CTG members
- [ ] Begin collecting in-app feedback data from beta users
- [ ] Prepare iOS App Store submission based on TestFlight feedback
- [ ] World of Coffee Asia, Bangkok (May 7–9) — press hook, no travel required

**June 2026 — iOS launch + European moment**
- [ ] Submit to App Store — target full iOS availability
- [ ] World of Coffee Europe, Brussels (June 25–27) — "now available globally" press story
- [ ] Begin small paid social testing on Instagram and Reddit ($500/month,
      performance-oriented, r/espresso and barista-adjacent communities)

### Three product moves — deferred, design decisions captured

High-leverage features to build post-WoC. Design decisions are resolved —
implementation is ready to start when prioritised.

---

**1. Shift Mode**

One-tap mode that sets the AI to maximum brevity for on-shift, time-pressure,
greasy-hand environments. Distinct from the current "short and practical" default —
Shift Mode removes all context and explanation entirely.

| Normal Mode | Shift Mode |
|---|---|
| Answer + brief context | Answer only |
| "Here's why this happens..." | Removed |
| "You might also consider..." | Removed |
| Multi-paragraph when complex | One paragraph hard cap |

**UX decision (resolved):** Gold chip in the AI screen header, always visible.
Active state is gold-filled. Sticky across sessions — saved to AsyncStorage so a
technician does not re-enable it every morning.

**Implementation:** System prompt flag in `useUllyChat.ts`. Add a `shiftMode`
boolean to the hook, persist to AsyncStorage under `@ully_shift_mode_{uid}`,
inject a secondary brevity override into `buildSystemPrompt()` when active.

---

**2. Dial-in Shot History**

Save each dial-in session to AsyncStorage. Creates a longitudinal data trail
that no competitor offers. Foundation for the future crop-to-cup data layer.

**UX decision (resolved):** History lives inside the dial-in modal as a "History"
tab — contextual, no navigation away from the dial-in flow. Scrollable list of
previous sessions with dose, yield, time, taste, and the AI recommendation.

**AsyncStorage key:** `@ully_dialin_{uid}`

**Schema per session:**
```ts
{
  id: string
  createdAt: string
  dose: number
  yield: number
  time: number
  taste: 'sour' | 'balanced' | 'bitter'
  imageUri?: string
  aiRecommendation: string
  notes?: string
}
```

**Implementation:** Save on dial-in submission in `AIScreen.tsx`. Read and display
in a new History tab in `DialInModal`.

---

**3. Share This Fix**

Share icon on every Ully AI response — not just diagnostic responses. The user
decides what is worth sharing; do not try to detect intent.

**UX decision (resolved):** Small share icon at the bottom-right of each assistant
message bubble. Not shown on user messages. Shown only on the most recent assistant
response in a conversation to avoid visual noise.

**Share format:**
```
💡 Ully AI — Espresso Assistant

[full response text]

─────────────────
Get Ully: [App Store / Play Store link]
```

**Implementation:** `Share.share()` from React Native core in
`components/ai/ChatHistory.tsx`. No new dependencies.

### Key dates — 2026 industry calendar

| Date | Event | Action |
|---|---|---|
| **April 10–12** | World of Coffee San Diego | **Attend. Primary launch window.** |
| May 7–9 | World of Coffee Asia, Bangkok | International press hook |
| June 25–27 | World of Coffee Europe, Brussels | iOS global launch story |
| TBD | CTG Summit 2026 | Single best event for the technician ICP |
| October 23–25 | World Barista Championship, Panama City | 6-month story + WBC content push |

---

## What to Build and When

```
NOW
├── Ship Ully Coffee v1 (iOS + Android)
├── Internal testing → Play Store internal track
└── Apple Developer enrollment → TestFlight

NEXT (3–6 months post-launch)
├── Offline knowledge base (Phase 2a)
│   ├── Author ~200 KB entries
│   ├── KnowledgeService.ts (SQLite FTS5)
│   └── Wire into useUllyChat.ts
├── Maintenance schedule tracking (Phase 2b)
├── Training logs + personal performance (Phase 2c)
├── User feedback pipeline (Phase 2d)
└── Pro subscription tier (RevenueCat integration)

6–12 MONTHS
├── Ully Business (Phase 3)
│   ├── Square POS integration
│   ├── Machine volumetrics (manual input → native API)
│   ├── QuickBooks Online integration
│   └── Business intelligence dashboard
└── Business tier go-to-market — café owner channels

12–24 MONTHS
├── Ully Roaster (Phase 4)
│   ├── Shared Firestore data layer
│   ├── Roast profile + cupping score features
│   └── Green coffee lot tracking
└── Web dashboard (roasters and importers need desktop)

24+ MONTHS
├── Ully Agriculture (Phase 5)
│   ├── Offline-first architecture
│   ├── Multi-language support
│   └── Cooperative B2B sales motion
└── Crop-to-cup traceability QR system

PLATFORM
├── Logistics / supply chain node
├── Traceability data platform + API
└── First regulated vertical (TBD based on resources)
```

---

## Principles That Do Not Change

1. **Coffee-only** in the coffee product. Domain focus is the product.
2. **No analytics SDK.** No Mixpanel, no Amplitude. Privacy is a feature, not a footnote.
3. **On-device first.** User data stays on the user's device unless they explicitly choose to share it.
4. **No preamble.** Ully answers immediately. Every product built on this platform follows the same rule.
5. **Mobile-first.** Professionals are not at desks. Every feature must work one-handed, outdoors, in a loud environment.
6. **The KB is proprietary.** Curated domain expertise is the moat — protect it.
7. **Integrations are purpose-built.** Ully connects to third-party tools (POS, QuickBooks, machine APIs) on its own terms — custom-engineered for the professional's workflow, never a generic connector.
