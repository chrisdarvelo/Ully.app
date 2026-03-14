# Ully AI — Product Vision & Roadmap

> This document captures the long-term product direction, strategic priorities,
> and build roadmap for Ully AI. Updated as the vision evolves.
> For technical architecture and dev commands, see CLAUDE.md.

---

## The Core Idea

> **A barista who knows their machine the way a pilot knows their plane.**

Pilots don't guess. They read instruments. They know their systems — engines,
hydraulics, pressures, temperatures — and when something is off, they diagnose it
in real time and fix it without leaving the cockpit.

Ully exists to produce that barista.

Not someone who "makes good coffee." Someone who understands every system on
their espresso machine — the boiler, the pump, the OPV, the solenoid, the group
head, the flow meter — and can troubleshoot, calibrate, and maintain it on the
spot. Someone who reads a shot the way a pilot reads instruments. Someone whose
café owner knows they can be trusted with a $15,000 machine and a full service rush.

**That barista is worth more. That barista gets promoted. That barista is certified.**

Ully is the guide that gets them there — and the co-pilot in their pocket
every shift after that.

---

## What Ully Is

**Ully is the professional training and intelligence platform for espresso machine
mastery — the path from barista to certified espresso pilot.**

The core product belief:
> The best baristas in the world are not the ones who memorize recipes.
> They are the ones who understand pressure, temperature, thermodynamics,
> flow, and system dynamics well enough to adapt in real time — during service,
> under pressure, with a line out the door. Ully teaches that. Ully tests it.
> Ully certifies it.

---

## Positioning

| What Ully is | What Ully is not |
|---|---|
| A mastery platform — from barista to certified espresso pilot | A general-purpose coffee chatbot |
| Machine-deep: boilers, pressure, valves, thermodynamics | Recipe-only, surface-level advice |
| A co-pilot during service and troubleshooting | A search engine with a chat interface |
| Structured progression with real certification at the end | Gamified trivia with badges |
| A retention and promotion tool for café owners | A consumer lifestyle app |
| Field-ready — works mid-service, in the moment | Dependent on a Wi-Fi connection |

---

## The Pilot Metaphor — Why It Works

A commercial pilot earns a certificate that proves they understand their aircraft's systems,
can respond to instrument readings, handle emergencies without a manual, and lead their
crew calmly through any situation. Nobody questions whether that certificate means something.

We want the same thing for baristas.

The espresso machine is their aircraft. Pressure is their instrument panel. Temperature
stability is their flight path. A spike in extraction time is a stall warning. A faulty
OPV is a hydraulic failure. They need to know all of it — and most of them never get
the chance to learn it.

**The Ully Champion certification is the ATP rating for espresso.** Owners hire for it.
Baristas train toward it. The industry respects it — because it proves instrument-level
machine knowledge, not just palate.

---

## The B2B Case (Why Owners Love It)

Imagine hiring a manager barista who:
- Can change gaskets, clean group heads, and replace solenoid valves without calling a tech
- Diagnoses a pressure drop or temperature instability mid-service and fixes it on the spot
- Trains junior staff through a structured, testable curriculum with certifiable outcomes
- Has a Ully Champion badge that proves all of the above

That manager saves $500–$2,000 on every technician call. They reduce machine downtime
during service. They train the next barista faster. And they have a credential that
benchmarks their skill against a real standard.

**For owners, Ully is not a coffee app. It is a workforce development and maintenance
cost reduction platform — and the certification is something they will gladly pay for
on behalf of their best people.**

> "A manager barista champion who can change gaskets, control pressure, and
> troubleshoot at the spot using Ully? That's a major advantage."

---

## Phase 1 — Ully Coffee (Current)

**Status:** Built. Android APK in internal testing. iOS pending Apple Developer enrollment.

**Who it serves:** Baristas, home enthusiasts, café owners, coffee professionals.

**Core features:**
- AI chat assistant (Claude Sonnet) — coffee-only, precision responses, no preamble
- Machine technician mode — deep system knowledge: boilers, OPV, valves, pressure curves
- Weather-aware drink and brew recommendations
- Espresso dial-in assistant with photo analysis
- Focused home screen: logo + greeting + single "ask ully" CTA — no feed, no distractions

**HomeScreen architecture decision (resolved):**
The home screen was stripped of the feed (recipes, baristas, cafes, news) and simplified to a
single-purpose landing: greet the user, surface a rotating coffee tip, and send them to AI.
Feed items (recipes, barista content, café maps, news) are permanently deferred.
The home screen is a clean canvas for the apprentice system and Pilot path.

**Planned (Phase 1b — Ully Learn / Pilot Certification):**
- Progressive espresso mastery curriculum
- Four tiers: Amateur → Barista → Hero → Champion (Certified Espresso Pilot)
- Each tier: 10 stages covering craft, machine systems, thermodynamics, leadership
- AI-powered conversational quizzes — evaluated by Claude, not multiple-choice
- Completing onboarding automatically places user in Amateur Stage 1
- See Phase 1b section below for full design

**Launch blocklist:**
- [ ] Apple Developer Program enrollment
- [ ] Google Play Console internal testing sign-off
- [ ] Google Play Console store listing + data safety form
- [ ] Production EAS build (AAB) for Play Store submission

---

## Phase 1b — Ully Learn (Pilot Certification Program)

**Status:** Designed. Not yet built.

### Concept

"Know your machine the way a pilot knows their plane."

A progressive mastery system that takes a barista from first espresso to Certified Espresso Pilot —
covering not just craft and palate, but instruments, pressure, temperature, thermodynamics,
situational awareness, and team leadership.

This is not Duolingo with coffee trivia. It is not a cheaper alternative to SCA courses.
It is a new industry standard — the first professional certification built for how baristas
actually work and learn, evaluated by AI conversation instead of multiple-choice tests, and
designed to become the credential that owners look for when they hire.

Coursera did not position itself as cheaper than university. It positioned itself as the
modern standard for professional development. That is the model. Ully Learn is what
professional coffee certification looks like in 2026.

---

### Three Pillars (Partner PoC)

The minimum build to demonstrate Ully Learn to café/roaster partners.

---

#### Pillar 1 — Chapter 1: Amateur (PoC)

**What it is:** 10 stages, fully playable, with interactive Taste Profiles and AI quiz logic.

**Taste Profiles** — interactive flavor anchors introduced progressively across the Amateur tier.
The vocabulary spans the full SCA Coffee Taster's Flavor Wheel — from roast-forward
espresso notes to the floral and fruit complexity of washed high-altitude lots.

**Roast-forward / base notes** (familiar entry points — introduced first)
- **Cacao** — dark chocolate, roast-forward, low acidity
- **Almond** — nutty, mild, balanced sweetness
- **Tobacco** — earthy, complex, aged quality signal
- **Caramel** — brown sugar sweetness, maillard-driven, round body
- **Hazelnut** — roasted nut, mild bitterness, approachable

**Stone fruit and tropical** (mid-tier complexity — natural and honey process)
- **Apricot** — stone fruit brightness, found in Ethiopian and Geisha naturals
- **Peach** — soft sweetness, low-acid, common in Brazilian naturals and Bourbon mutations
- **Mango** — tropical, full body, high sweetness — natural process Yirgacheffe
- **Plum** — dark fruit, jammy, found in Kenyan and Rwandan washed lots

**Orchard and berry** (high complexity — washed high-altitude lots)
- **Apple** — crisp malic acidity, found in Typica and Bourbon mutations, Colombian washed
- **Blueberry** — bright berry, fermentation-adjacent, classic Ethiopian natural signal
- **Cherry** — red fruit clarity, washed process, Central American Bourbon
- **Blackcurrant** — sharp, wine-like, Kenyan AA — SL28/SL34 cultivar signature

**Floral and tea-like** (elite complexity — Geisha, Yirgacheffe washed)
- **Jasmine** — perfumed floral, delicate — Geisha and Guji washed
- **Bergamot** — Earl Grey quality, citrus-floral — Ethiopian Yirgacheffe washed
- **Rose** — subtle floral sweetness — Geisha at high elevation
- **Hibiscus** — tart floral, high acidity, Ethiopian natural at light roast

**Citrus** (acidity-forward — light roast, washed process)
- **Lemon** — bright citric acidity, clean finish — washed East African
- **Orange** — round citrus sweetness — Colombian, Honduran, medium roast
- **Grapefruit** — sharp, clean, drying finish — Kenyan washed at high extraction

Each stage introduces a concept via 3–5 lesson screens, then runs an AI-powered
conversational quiz evaluated by Claude. The Taste Profile vocabulary is introduced
progressively — base notes first, florals and high-complexity fruit in later stages.
Students learn to identify, describe, and dial-in using this language across all 10 stages.

**Build checklist:**
- [ ] `LearnScreen.tsx` — tier map, progress rings, locked/unlocked states
- [ ] `StageScreen.tsx` — lesson slides + Claude quiz flow
- [ ] `LessonContent.ts` — Amateur 10-stage content: topics, quiz prompts, rubrics
- [ ] Taste Profile intro screen (before Stage 1)
- [ ] Badge + stage unlock animation
- [ ] Firestore write on stage completion

---

#### Pillar 2 — Technician AI Persona (The Co-Pilot)

**What it is:** A specialized Claude system prompt that responds like an experienced
espresso machine technician — zero fluff, direct diagnosis, instrument-level knowledge.

**What Ully knows in this mode:**
- Boiler types: single-boiler, heat exchanger (HX), dual-boiler, thermoblock — how each affects temperature stability and workflow
- Pressure systems: pump calibration, OPV (over-pressure valve) setting, pre-infusion pressure curves, pressure profiling (mechanical vs. electronic)
- Temperature dynamics: PID controller behavior, thermal mass and recovery, thermosiphon flow, thermal stability under load
- Valves: solenoid valve function and failure modes, steam valve, OPV bypass symptoms
- Flow: flow meter integration, flow profiling (Decent, La Marzocco GS3 MP), volumetric dosing
- Thermodynamics: heat exchange efficiency, steam pressure and vapor temperature relationship, boiler pressure vs. steam quality
- Maintenance: group head gasket and screen replacement, backflush procedure, descaling frequency and method, pump maintenance
- Situational awareness: diagnosing extraction issues under service pressure, reading pressure gauges, interpreting channeling patterns from visual extraction

**Persona rules:**
- No preamble. No "Great question!" No hedging.
- Starts with the most likely cause, not a list of possibilities.
- Gives a specific fix: what to adjust, by how much, in what order.
- Uses technician vocabulary: OPV, solenoid, group head, puck prep, pre-infusion, boiler pressure, TDS, extraction yield.

**Shot analysis (Dial-in with photo):**
- Identifies channeling from extraction pattern (uneven color, tiger-striping, blonding)
- Flags over-tamping from cone/wavy extraction
- Reads puck condition from the photo (dry/wet, cracked, imprinted)
- Returns: diagnosis + one adjustment + expected result

---

#### Pillar 3 — Team Progress Dashboard (MVP)

**What it is:** A simple, exportable view on the Business Platform showing each team
member's rank, machine competency, and skill gaps.

**MVP table:**
| Barista Name | Current Rank | Stages Completed | Skill Gap | Last Active |
|---|---|---|---|---|
| Alex | Barista | 14/20 | Pressure management | 2 days ago |
| Jamie | Amateur | 6/10 | Machine systems | 1 week ago |

**Exportable Certification:**
- PDF: "Ully Certified Espresso Pilot — [Name] — [Rank] — [Date]"
- Designed for the business owner to use in HR records, post in the café, or include in job applications

**Implementation:**
- Add `/training/apprentice` route to ully-web
- Read `users/{uid}/learnProgress` from Firestore for each team member linked to the org
- Rank map: Amateur (0–10) → Barista (11–20) → Hero (21–30) → Champion (31–40 stages)
- PDF export via `window.print()` with print-specific CSS (no library needed for MVP)

---

### Business Case

The ROI frame for café owners and managers:

> **Replacing a barista costs ~$3,000** in recruiting, training, and lost productivity.
> Ully Learn reduces that cost by compressing ramp-up time and making skill
> progression visible — so managers retain good people longer and promote with confidence.

The machine mastery angle adds a second ROI lever:

> **A single technician callout costs $200–$800.** A barista who can diagnose a pressure
> drop, replace a group head gasket, or recalibrate the OPV on the spot eliminates that
> cost. Ully Learn builds that barista. The certification proves it.

The career-gate hook that makes it sticky:

> *"You don't touch the machine until you hit Hero rank."*

Managers can use rank as a gating mechanism for station access — a built-in
incentive that makes progression feel real, not gamified.

---

### Pricing Model

```
Free — forever
 └─ 20 AI copilot messages/day
 └─ Ully Learn: Amateur Stages 1–3 (permanent, never locked away)
 └─ Progress and badges preserved even after trial ends
 └─ 14-day Pro trial on first signup (full access, no credit card)

Pro — $7.99/month
 └─ Unlimited AI co-pilot
 └─ Full Ully Learn access: all 4 tiers, all 40 stages
 └─ Progress badges, stage unlocks, quiz history
 └─ (Certified Espresso Pilot credential not included)

Pro Annual — $79/year  ← 2 months free vs monthly
 └─ Everything in Pro
 └─ Control Tower — full Business Platform access
 └─ Crew management & shift scheduling
 └─ Equipment register & full service history
 └─ Inventory with par-level alerts
 └─ Revenue & expense intelligence
 └─ Training logs & certification tracking per team member
 └─ Unlimited crew members

Certified Espresso Pilot — $150 one-time
 └─ Unlocked after completing the Hero-Champion curriculum
 └─ Exclusive Test Prep material — final tier only
 └─ Champion tier examination: AI oral defense with Claude as examiner
 └─ Official Barista Champion Certificate (PDF + digital badge)
 └─ Verifiable certification tied to account and date
 └─ Individual purchase OR sponsored by owner via Pro Annual seat
```

**The free tier is designed to be sticky, not stingy.**

Amateur Stages 1–3 stay free forever. That is enough content for a new barista to:
- Complete their first conversational AI quiz
- Unlock their first Taste Profile (Cacao, Almond, or Tobacco)
- Earn their first progress badge
- See the full tier map — Amateur, Barista, Hero, Champion — stretching above them

They hit Stage 4 and the path continues, just behind a paywall. Their progress bar
sits at 3/10. Their badge says "Amateur — In Progress." The incomplete loop is
intentional. Progress that exists but is frozen converts better than content that
was never started.

**The 14-day trial does the heavy lifting.**

On signup, every new user gets 14 days of full Pro access — no credit card, no friction.
That is enough time to push deep into Barista tier, feel the pull of Hero, and get
invested in a progress score they do not want to lose. When the trial ends:

- Stages 4+ lock
- Their progress, badges, and position are fully visible — they can see exactly where
  they stopped and exactly what is next
- The AI still works (20 msg/day) — they are never totally cut off

The ask at the end of 14 days is not "pay to try something new." It is "pay to
continue something you already started and care about." That is a fundamentally
different conversion.

**The certification premium is the owner product.**

The $7.99 subscription is the training platform — the volume play. A barista pays
it for themselves. The certification is what owners buy for their best people.
No café owner hesitates to pay for a certification that proves their manager barista
can troubleshoot a machine failure at the bar and train the rest of the team.
It is an obvious ROI against a $800 technician callout.

The psychological sequence: free trial hooks the barista → Pro converts them →
certification is what the owner buys when they see the barista's tier progress and
want to make it official.

---

### Competitive Moat

| What exists | What Ully Learn is |
|---|---|
| SCA courses — in-person, static content, multiple-choice | AI-examined, machine-deep, always current, tied to real ops |
| Quiz apps and coffee trivia | A professional certification program with a credential that means something |
| YouTube machine tutorials | Structured curriculum + examination + exportable proof of mastery |
| Generic LMS / Coursera-style platforms | Purpose-built for espresso machine mastery, integrated with business ops |
| Manufacturer training sessions | Always available, evaluates judgment not recall, tied to career progression |

Ully Learn is not positioned as an alternative to existing options. It is the new standard.
The SCA certification tests knowledge of coffee. Ully certification tests knowledge of
the machine — a gap that no existing credential fills.

The AI quiz format is the key differentiator. Instead of "What is the ideal OPV setting?
A) 8 bar B) 9 bar C) 10 bar" — Ully asks *"Your machine is pulling inconsistent
extraction times and the pressure gauge is peaking at 11 bar. Walk me through
your diagnosis and what you'd adjust first."* Claude evaluates the response. This
cannot be scraped, guessed, or auto-completed.

---

### Tier Structure — The Pilot Path

| Tier | Who it's for | Stages | Focus | Milestone |
|---|---|---|---|---|
| Amateur | Home enthusiasts, new to specialty | 10 | Coffee fundamentals, palate, first espresso | Amateur badge |
| Barista | Aspiring and working café staff | 10 | Dial-in, extraction science, milk, workflow | Barista badge |
| Hero | Experienced professionals, senior baristas | 10 | Machine systems, pressure, temperature, thermodynamics, team leadership | Hero badge |
| Champion | Competition-level, machine experts | 10 | Advanced thermodynamics, machine maintenance, certification-level mastery | Certified Espresso Pilot |

**Total: 40 stages across 4 tiers.**

The Hero and Champion tiers are where the Pilot metaphor fully activates — deep machine
systems knowledge, situational awareness training, leadership skills. Champion completion
grants the **Ully Certified Espresso Pilot** credential.

---

### Progression Rules

1. Completing onboarding automatically places the user in **Amateur, Stage 1**.
2. Each stage = a short lesson (3–5 screens) + an AI-powered conversational quiz.
3. Passing a quiz (evaluated by Claude, ≥80% equivalent) unlocks the next stage.
4. Completing all 10 stages in a tier unlocks the next tier.
5. Tier completion grants a badge displayed on the user's profile.
6. Users who selected "Barista" skill level in onboarding start at Barista Stage 1.
7. Users who selected "Hero" skill level start at Hero Stage 1.
8. Users who selected "Organization" in onboarding start at Barista Stage 1.

**Gating rules by plan:**

| Stage | Free (after trial) | Pro | Cert add-on |
|---|---|---|---|
| Amateur 1–3 | Unlocked forever | Unlocked | Unlocked |
| Amateur 4–10 | Locked (visible, progress preserved) | Unlocked | Unlocked |
| Barista 1–10 | Locked | Unlocked | Unlocked |
| Hero 1–10 | Locked | Unlocked | Unlocked |
| Champion 1–9 | Locked | Unlocked | Unlocked |
| Champion Stage 10 (Exam) | Locked | Locked | Unlocked |

- Locked stages are **visible** — users see the stage title, topic, and their position in the path. They cannot start the lesson. The progress ring shows their frozen position.
- During the 14-day trial, all stages are unlocked as if Pro.
- Progress earned during the trial is preserved when the trial ends — the bar stays at wherever they reached, just frozen.

---

### AI Quiz Design

Quizzes are **conversational, not multiple-choice.** Claude plays the examiner:

- Presents a real-world scenario ("Your HX machine is pulling short despite a fine grind...")
- Evaluates the user's free-text response for correctness, depth, and reasoning
- Gives targeted feedback before moving to the next question
- Scores holistically (not keyword matching) — harder to game, higher knowledge signal

This format is a world-first integration of conversational AI into structured
professional certification. It is the moat. Protect it.

---

### Sample Stage Topics — The Pilot Curriculum

**Amateur (1–10)** — First flights
1. What is specialty coffee? Grading, scoring, the supply chain.
2. Brewing methods: espresso, pour over, French press, AeroPress.
3. Coffee origins: Ethiopia, Colombia, Brazil — taste profile basics.
4. Grind size and its effect on extraction.
5. Water quality and temperature fundamentals.
6. Reading a coffee bag: roast date, process, variety.
7. Espresso basics: dose, yield, time — the recipe triangle.
8. Milk basics: steaming temperature, microfoam vs. foam.
9. Barista tools: tamper, scale, timer, portafilter.
10. How to taste: the flavor wheel, descriptors, calibration.

**Barista (1–10)** — Instrument familiarization
1. Dialing in: extraction ratio, TDS, and what the numbers mean.
2. Extraction science: under- vs. over-extraction, identifying from taste.
3. Water chemistry: hardness, alkalinity, mineral balance, RO systems.
4. Latte art fundamentals: milk physics, pouring mechanics.
5. Workflow optimization: efficiency, mise en place, service rhythm.
6. Equipment calibration: grinder burrs, dosing consistency.
7. Shot diagnosis: reading extraction visually, channeling, channeling causes.
8. Puck preparation: distribution, tamping pressure, WDT.
9. Machine cleaning: group head, portafilter, backflush, steam wand.
10. Customer service: translating technical knowledge for guests.

**Hero (1–10)** — Systems knowledge
1. Boiler types: single-boiler, HX, dual-boiler, thermoblock — temperature behavior, workflow implications, recovery time.
2. Hydraulic circuit: water path from inlet to group head — pump, pre-infusion chamber, solenoid, group, drain.
3. Pump mechanics: rotary vs. vibratory pumps — pressure calibration, output consistency, wear diagnosis.
4. The OPV: purpose, correct setting (typically 9 bar at the group), over-pressure symptoms, adjustment procedure.
5. Temperature management: PID controllers, thermal mass, thermosiphon flow, stability under back-to-back pulls.
6. Solenoid valves: 3-way solenoid function, failure modes (dripping, no drain, stuck open), diagnostic tests.
7. Pressure profiling: pre-infusion, declining pressure, flat profiling — mechanical vs. electronic, when and why.
8. Flow meters and volumetric dosing: how flow meters work, calibration, drift diagnosis.
9. Team training: building skill progressions, running group calibrations, giving technical feedback, shift structure.
10. Situational awareness: diagnosing under service pressure, reading instruments mid-rush, prioritizing when multiple things are wrong.

**Champion (1–10)** — Certified Espresso Pilot
1. Advanced hydraulics: full machine water circuit under load — pressure drop across the system, line pressure vs. pump pressure, inlet pressure requirements, pressure gauge placement and interpretation.
2. Electrical systems: machine power circuit overview, heating element types (tubular, band, immersion), element failure diagnosis, fuse and thermal cutout behavior, reading a wiring diagram.
3. Control boards and electronics: PID wiring and sensor inputs (thermocouple, RTD), pressure transducers, flow meter signal, relay boards, common control board failure modes, firmware update procedures.
4. Water supply and filtration: municipal vs. well water, hardness and TDS targets for espresso (50–150 ppm total hardness), carbon filtration, scale inhibitor cartridges, softener resin beds, RO systems and remineralization, testing water before and after filtration.
5. Preventive maintenance program: daily/weekly/monthly/annual maintenance schedules, backflush protocol, group head gasket and screen replacement intervals, descaling frequency by water hardness, OPV check cadence, pump pressure verification, boiler inspection, full strip-down and rebuild intervals.
6. Advanced thermodynamics: vapor pressure curves, thermal conductivity of group head materials (brass vs. stainless vs. copper), heat loss modeling, steam quality and dryness fraction, boiler pressure vs. steam temperature at the wand.
7. Fault diagnosis under pressure: systematic troubleshooting methodology — isolate, test, confirm, fix — applied to hydraulic, electrical, and mechanical failures mid-service.
8. Signature drink design and documentation: technical construction, reproducibility, recipe documentation standards, training a team to replicate.
9. Sensory science and panel calibration: psychophysics of taste and smell, fatigue management, calibrating a team to a shared sensory standard.
10. Certification examination — The Full Systems Audit: an AI-conducted oral defense covering all seven machine systems. Claude presents real failure scenarios across hydraulics, electrical, control systems, water, and maintenance. The candidate must diagnose, explain causation, and prescribe a fix with specific steps and tolerances. No multiple choice. No partial credit for vague answers. Passing standard: a technician with 5+ years on commercial equipment would agree with the diagnosis and repair plan.

---

### Web Platform: Competency Maps

On the Business Platform, manager view shows a visual **Competency Map** — a heat map
of each team member's strengths and gaps across skill areas (espresso, milk, machine
systems, thermodynamics, customer service, team leadership).

- Rank is visible to the manager — tied to mobile apprentice progress
- Promotions and pay raises tied to rank milestones
- Org can configure one custom chapter per their house style (v1 limit)
- Heat map built from training session scores, quiz results, and Ully AI interaction topics

This transforms staff development from a gut-feel conversation into an evidence-based
process — and gives managers a clear, defensible answer to "why does this person
deserve a raise" and "who is ready to run the machine alone."

---

### Architecture (future implementation)

> **Critical:** AsyncStorage is insufficient for Ully Learn. Progress must sync across
> devices and be visible on the Business Platform. **Firestore sync is a hard requirement
> before shipping this feature.**

```
Firestore path: users/{uid}/learnProgress

{
  tier: 'amateur' | 'barista' | 'hero' | 'champion',
  stage: number,              // 1–10
  completedStages: string[],  // ['amateur-1', 'amateur-2', ...]
  badges: string[],           // ['amateur', 'barista', 'hero', 'champion']
  championComplete: boolean,  // true when Champion tier complete = Certified Espresso Pilot
  lastActivity: number,       // timestamp
  quizHistory: {
    stageId: string,
    score: number,
    completedAt: number,
  }[]
}
```

---

## Phase 2 — Ully Business Platform (Web)

**Status:** Active. Repo at `ully-web`. Core platform built and deploying to ullyapp.com.

**Who it serves:** Café owners, roasters, multi-site operators.

**Framing:** The Control Tower. While the barista learns and operates on the mobile app (the cockpit), the owner manages from the web platform — crew progress, equipment status, inventory, revenue, and AI-powered operational recommendations. Both interfaces talk to the same Ully AI, grounded in the org's live data.

**Built and live:**
- Team management, shift scheduling, invite system
- Equipment register and full service history
- Inventory tracking with par-level alerts
- Revenue and expense logging
- Ully AI chat — context-aware, grounded in org data (equipment, team, inventory)
- Training logs and skill tracking per team member

**Included in Pro Annual ($79/year)** — not a separate product tier.

**Roadmap:**
- Team Competency Map — visual heat map of each barista's progress through the curriculum
- PDF certification export per team member
- POS integration (Square first, then Toast/Lightspeed)
- QuickBooks sync for P&L visibility
- Machine volumetrics (La Marzocco, Sanremo native API where supported)
- Multi-location dashboard
- Org-specific training chapter builder (one custom chapter per org, v1)

---

## Long-Term Expansion

The pilot metaphor and mastery system generalize beyond coffee.

Every skilled trade has the same problem: expert knowledge is locked in people's heads,
certification is expensive and inaccessible, and the profession lacks a portable credential
that proves machine-level competency.

Ully's next domains after coffee: craft brewing, HVAC, industrial kitchen equipment.
The platform, the quiz engine, and the certification infrastructure are the same.
Only the content changes.

**The moat is the format — AI-evaluated open-ended examination — not the content.**
