# Ully Coffee — Project Reference

> This file is the canonical context document for all development sessions.
> It is loaded automatically by Claude Code at the start of every conversation.

---

## What Is Ully?

Ully AI is a **mobile-first AI coffee companion** built for baristas, enthusiasts, and coffee businesses. It combines an AI chat assistant (powered by Claude Sonnet), a personal recipe library, curated barista content, cafe bookmarking, and daily coffee news — all wrapped in a dark espresso-crema aesthetic.

**App Name:** Ully AI
**Tagline:** *your coffee companion*
**Bundle ID / Package:** `com.ullyapp.app`
**Expo Project ID:** `baf4d91f-12b9-47cd-b0b4-a01aadd37f08`
**Support:** support@ullyapp.com

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Expo SDK 54 (React Native 0.81) |
| Language | TypeScript (strict) — all files are `.tsx` / `.ts` |
| Navigation | React Navigation 7 (native stack + bottom tabs) |
| State | Zustand (`authStore`, `profileStore`) |
| Server state | TanStack React Query v5 |
| Auth | Firebase Authentication (email/password) |
| Backend logic | Firebase Cloud Functions v2 (Node 22) |
| AI | Anthropic Claude Sonnet via Cloud Function proxy |
| Local storage | AsyncStorage — ALL user data (recipes, profile, cafes, follows) |
| Firestore | Reserved / rules locked — not used by client yet |
| Storage | Firebase Storage — user media under `users/{uid}/` |
| Build | EAS Build (Expo Application Services) |

> **Critical:** All user data (recipes, cafes, profile, chat history, barista follows) is stored in **AsyncStorage**, not Firestore. The Firestore rules exist and are deployed but the client does not write to Firestore directly.

---

## Project Structure

```
Ully-Coffee/
├── App.tsx                  # Root: auth gate, QueryClient, NavigationContainer
├── app.config.js            # Expo config — version, permissions, EAS project ID
├── eas.json                 # EAS build profiles (preview = APK, production = AAB)
├── firebase.json            # Firebase deploy config (functions, firestore, storage)
├── firestore.rules          # Firestore security rules (deployed via firebase deploy)
├── firestore.indexes.json   # Firestore indexes (currently empty)
├── storage.rules            # Storage security rules
│
├── navigation/
│   └── AppNavigator.tsx     # AuthNavigator, AppNavigator, TabNavigator + type exports
│
├── screens/
│   ├── WelcomeScreen.tsx    # Landing: Sign In / Sign Up
│   ├── LoginScreen.tsx      # Email + password login
│   ├── SignUpScreen.tsx     # Registration + age check (DOB not stored)
│   ├── OnboardingScreen.tsx # Role questionnaire (consumer / barista / org)
│   ├── HomeScreen.tsx       # Clean landing: logo + greeting + "ask ully" CTA (no feed)
│   ├── AIScreen.tsx         # Ully AI chat, Dial-in chip, fun facts, voice input
│   ├── SettingsScreen.tsx   # Profile tab: account, preferences, delete account
│   ├── PrivacyPolicyScreen.tsx
│   └── VerifyEmailScreen.tsx
│
├── components/
│   ├── CoffeeFlower.tsx     # Animated SVG logo — used as spinner and brand mark
│   ├── GoldGradient.tsx     # Gold gradient text wrapper
│   ├── PaperBackground.tsx  # Dark gradient background (keep — blackish coffee look)
│   ├── SideDrawer.tsx       # Chat history panel in AI screen
│   ├── ErrorBoundary.tsx    # React error boundary wrapping the whole app
│   ├── NavigationIcons.tsx  # Bottom tab icons
│   ├── DiagnosticIcons.tsx  # SVG icons for AI diagnostic results
│   └── ai/
│       ├── CameraModal.tsx  # Camera + image picker modal for AI screen
│       └── ChatHistory.tsx  # Scrollable chat history list
│
├── hooks/
│   ├── useUllyChat.ts       # ALL AI chat logic: messages, history, weather context
│   └── useCamera.ts         # Camera permissions, image/video capture
│
├── services/
│   ├── FirebaseConfig.ts    # Firebase app init, auth, functions exports
│   ├── ClaudeService.ts     # Calls chatWithUlly Cloud Function (httpsCallable)
│   ├── WeatherLocationService.ts  # wttr.in weather + expo-location (30-min cache)
│   ├── AuthService.ts       # deleteUserAccount (calls wipeUserData Cloud Function)
│   ├── ProfileService.ts    # AsyncStorage: get/save UserProfile
│   └── NotificationService.ts # Local push notification setup
│
├── store/
│   ├── authStore.ts         # Zustand: Firebase auth state (user, initializing)
│   └── profileStore.ts      # Zustand: UserProfile + onboarded flag
│
├── types/
│   └── index.ts             # All shared TypeScript interfaces
│
├── utils/
│   ├── constants.ts         # Colors, AuthColors, Fonts design tokens
│   ├── validation.ts        # validatePassword, validateEmail, sanitizeText
│   └── mediaUtils.ts        # validateImageSize, extractFrames (video thumbnails)
│
├── functions/
│   ├── index.js             # Cloud Functions: chatWithUlly, wipeUserData
│   └── package.json         # Node 22, firebase-admin ^13, firebase-functions ^6
│
├── __tests__/
│   ├── hooks/useUllyChat.test.ts
│   ├── utils/validation.test.ts
│   └── utils/mediaUtils.test.ts
│
└── .maestro/
    ├── happy_path.yaml
    └── flows/               # 01_login, 02_ai_dialin, 03_save_recipe
```

---

## Navigation Architecture

```
App.tsx
├── (unauthenticated) → AuthNavigator
│   ├── WelcomeScreen
│   ├── LoginScreen
│   ├── SignUpScreen
│   └── PrivacyPolicyScreen
│
└── (authenticated) → AppNavigator
    ├── OnboardingScreen     # shown once after signup
    ├── TabNavigator         # 3 tabs, icon-only
    │   ├── Home → HomeScreen
    │   ├── AI   → AIScreen
    │   └── Profile → SettingsScreen
    └── PrivacyPolicyScreen
```

---

## Ully AI — Core Mandates

These rules govern Ully's personality and scope. **Do not change them without deliberate intent.**

1. **Coffee-only.** Ully answers espresso, equipment, grinder, water chemistry, roasting, brewing, latte art, origins, processing, café management, barista technique, and coffee culture questions. Non-coffee questions get: *"That's outside my expertise. Ask me anything about coffee."*
2. **No preamble.** Answer immediately. No "Great question!" or self-introduction.
3. **Concise.** Short, practical responses. Bullet points for multi-step answers.
4. **Weather-aware.** Location and weather context is injected per-request from `WeatherLocationService` — use it to recommend weather-appropriate drinks or local cafes/roasteries when relevant.
5. **Never stored.** Chat history lives in AsyncStorage on-device only. No chat data reaches Firebase.
6. **Claude Sonnet model.** The Cloud Function targets `claude-sonnet-4-20250514`. Do not downgrade.

---

## Design System

All design tokens live in `utils/constants.ts`.

### Colors

```ts
Colors.primary         = '#C8923C'   // crema gold — primary actions, highlights
Colors.background      = '#0E0C0A'   // deep warm near-black
Colors.card            = '#1A1614'   // slightly lighter card surface
Colors.text            = '#FFFFFF'
Colors.textSecondary   = '#A09888'   // warm gray
Colors.border          = '#2A2218'
Colors.tabBar          = '#0E0C0A'
Colors.tabInactive     = '#6B5E52'
```

### Typography

```ts
Fonts.mono   // iOS: Menlo | Android: monospace
Fonts.header // iOS: system | Android: sans-serif-black
```

### Background

`PaperBackground.tsx` renders a dark blackish-brown gradient. **Keep it** — it is the core visual identity.

---

## Firebase Architecture

### Cloud Functions (`functions/index.js`)

| Function | Trigger | Auth required | Purpose |
|---|---|---|---|
| `chatWithUlly` | `onCall` | Yes | Proxies Claude API — API key in Secret Manager |
| `wipeUserData` | `onCall` | Yes | Deletes user's Firestore docs + Storage folder on account deletion |

### Security Rules

- **Firestore:** Owner-only on `profiles`, `recipes`, `cafes`. Catch-all `deny` for everything else.
- **Storage:** Owner-only under `users/{uid}/`. Public assets at `public/` are read-only.
- **Rules deploy command:** `firebase deploy --only firestore:rules,storage`

### API Key Security

The Claude API key is **never in the client bundle**. It lives in Firebase Secret Manager and is accessed only inside `chatWithUlly`. `ClaudeService.ts` calls the function via `httpsCallable` — it never calls Anthropic directly.

---

## User Roles & Onboarding

After signup, `OnboardingScreen.tsx` collects:

| Role | Fields collected |
|---|---|
| Consumer | `dailyCoffees`, `favoriteMethod`, `drinkAt` |
| Barista | `skillLevel`, `baristaMethod`, `favoriteRoaster` |
| Organization | `orgType`, `employeeCount`, `businessType` |

All stored in `UserProfile` via `ProfileService` → AsyncStorage.

---

## Data Storage Map

| Data | Where | Key pattern |
|---|---|---|
| User profile | AsyncStorage | `@ully_profile_{uid}` |
| Chat history | AsyncStorage | `@ully_chat_history` |
| Learn progress | Firestore | `users/{uid}/learnProgress` |
| Machines | AsyncStorage | `@ully_machines_{uid}` |
| Service records | AsyncStorage | `@ully_service_records_{uid}` |
| Team members | AsyncStorage | `@ully_team_members_{uid}` |
| Training logs | AsyncStorage | `@ully_training_logs_{uid}` |
| Auth session | Firebase Auth SDK | managed |
| Claude API key | Firebase Secret Manager | `CLAUDE_API_KEY` |

> **Note:** Learn progress uses Firestore (not AsyncStorage) — cross-device visibility
> and Business Platform sync are hard requirements for the apprentice system.

---

## AsyncStorage Key Index

```
@ully_profile_{uid}
@ully_chat_history
@ully_machines_{uid}
@ully_service_records_{uid}
@ully_team_members_{uid}
@ully_training_logs_{uid}
```

---

## Key Development Commands

### Start

```bash
npx expo start               # Start Expo dev server
npx expo start --clear       # Clear Metro cache and start
npx expo start --android     # Open directly on Android
npx expo start --ios         # Open directly on iOS simulator
```

### Build (EAS)

```bash
# Preview build (internal APK for Android testing)
eas build --platform android --profile preview

# Production build (signed AAB for Play Store)
eas build --platform android --profile production

# Production build for App Store
eas build --platform ios --profile production

# Both platforms
eas build --platform all --profile production
```

### Submit (EAS)

```bash
eas submit --platform android   # Submit .aab to Google Play Console
eas submit --platform ios       # Submit .ipa to App Store Connect
```

### Firebase

```bash
# Deploy everything
firebase deploy

# Deploy rules only (safe to run any time)
firebase deploy --only firestore:rules,storage

# Deploy Cloud Functions only
firebase deploy --only functions

# Local emulator
firebase emulators:start
```

### Version Management

When shipping an update to the Play Store or App Store, increment **both**:
- `version` in `app.config.js` (semver string — shown to users)
- `versionCode` in `android` block (integer — must increase monotonically)
- `buildNumber` in `ios` block when added

### Testing

```bash
npm test                 # Run all Jest unit tests
npm run test:watch       # Watch mode
npm run test:coverage    # Coverage report

# E2E (requires Maestro installed and device/simulator running)
npm run e2e              # Full happy path
npm run e2e:login        # Login flow only
npm run e2e:ai           # AI dial-in flow only
npm run e2e:recipe       # Save recipe flow only
```

### Icons / Assets

```bash
node scripts/generate-icon.js   # Regenerate icon.png and adaptive-icon.png
```

---

## Environment Variables

Stored in `.env` (gitignored). All accessed via `app.config.js → extra`:

```
FIREBASE_API_KEY
FIREBASE_AUTH_DOMAIN
FIREBASE_PROJECT_ID
FIREBASE_STORAGE_BUCKET
FIREBASE_MESSAGING_SENDER_ID
FIREBASE_APP_ID
APP_CHECK_SITE_KEY
APP_CHECK_DEBUG_TOKEN
```

The Claude API key is **not** in `.env` — it lives exclusively in Firebase Secret Manager.

---

## Launch Checklist

- [x] TypeScript migration complete
- [x] Firebase Security Rules locked + deployed via firebase.json
- [x] `wipeUserData` Cloud Function — account deletion works
- [x] `versionCode: 1` added to Android config
- [x] Weather + location AI context live
- [ ] Apple Developer Program enrollment
- [ ] Google Play Console account + Service Account JSON
- [x] `firebase deploy --only firestore:rules,storage,functions` run against production
- [ ] TestFlight pilot build (iOS)
- [ ] Play Store internal track build (Android)

---

## Privacy & App Store Posture

- **No analytics SDK.** No Mixpanel, Amplitude, Firebase Analytics, or equivalent.
- **No ad network.**
- **Photos never stored.** Images go directly to Claude API, are not saved server-side.
- **Chat on-device only.** AsyncStorage, never transmitted to our servers.
- **Age gate at signup.** DOB used client-side for 13+ check only, not stored.
- Full Apple Privacy Nutrition Labels are documented in `APP_STORE_METADATA.md`.
