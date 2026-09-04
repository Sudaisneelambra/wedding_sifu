# Wedding Invitation — React Template

A single-page digital wedding / nikah invitation, combining the structure and the
warm cream–gold–rose theme of the two reference invitations into one standard,
reusable template.

Built with **React 18 + Vite**. No UI framework, no runtime dependencies beyond React.

---

## Quick start

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build into /dist
npm run preview  # preview the production build
```

---

## Customising for a client

**Edit one file: `src/data/invitation.js`.** Every visible string lives there as a
`{{PLACEHOLDER}}` token. Nothing else needs to change.

| Key | What it controls |
|---|---|
| `meta.pageTitle` | Browser tab + social preview title |
| `couple.groom` / `couple.bride` | Names, parents, house & place (set `parents`/`house` to `''` to hide) |
| `words` | Bismillah, all headings, CTA labels, closing message |
| `event.dateTime` | **ISO local date-time** — drives the live countdown |
| `event.dayNumber` / `monthLabel` / `yearLabel` / `weekday` / `timeLabel` | The date pill and detail cards |
| `venue` | Venue name, address, Google Maps URL |
| `rsvp` | Enable/disable, button labels, result messages, optional `endpoint` |
| `art` | The cover illustration and how it is framed on wide / narrow screens |
| `music` | Enable/disable, audio file, volume and fade-in length |

### Collecting RSVP responses

By default a guest's answer is remembered on their own device only
(`localStorage`). To collect responses centrally, set `rsvp.endpoint` to any URL
that accepts a `POST` of `{ attending: boolean, at: ISOString }` — a Google Apps
Script web app, a Supabase function, a Formspree endpoint, etc. A network failure
never blocks the guest.

### The cover artwork

`public/hero.jpg` (with a smaller `hero.webp` served first) fills the opening
screen behind the card, under a cream veil that keeps the text readable, with a
very slow drift. Because the illustration is much wider than a phone screen,
`art.focusWide` and `art.focusNarrow` set how it is framed at each size — they
are plain CSS `object-position` values, so `'22% 50%'` keeps the couple in view
on desktop while `'26% 60%'` reframes for portrait. Replace both files to use a
different illustration.

### Background music

`public/music.mp3` is an original, gently looping instrumental (66 seconds,
seamless). Replace the file — or point `music.src` at another one in `/public` —
to use your own. `music.volume` and `music.fadeInMs` control how it comes in.

Browsers refuse to start audio without a user gesture, so playback begins on the
"Open Invitation" click and fades up from silence; a tap anywhere is the
fallback. The floating button toggles it. Set `music.enabled: false` (or
`src: ''`) to remove it entirely.

---

## Structure

```
src/
├─ data/invitation.js      ← the only file you edit per client
├─ styles/
│  ├─ theme.css            ← colour + type tokens (the shared palette)
│  └─ app.css              ← all component styles
├─ hooks/
│  ├─ useCountdown.js      ← live countdown to the event
│  └─ useReveal.js         ← scroll-triggered fade-up
├─ components/
│  ├─ Backdrop.jsx         ← gradients, corner sprigs, swaying lanterns (inline SVG)
│  ├─ Loader.jsx           ← opening splash
│  ├─ Hero.jsx             ← bismillah + script names + CTA
│  ├─ InviteCard.jsx       ← couple with parents & houses
│  ├─ EventDetails.jsx     ← date pill + detail cards
│  ├─ Countdown.jsx        ← days / hours / mins / secs
│  ├─ Rsvp.jsx             ← yes / no flow with result screens
│  ├─ Venue.jsx            ← address + Google Maps button
│  ├─ Closing.jsx          ← thank-you message + signature
│  ├─ MusicToggle.jsx      ← floating audio control
│  ├─ Reveal.jsx           ← scroll-reveal wrapper
│  └─ Rule.jsx             ← ornamental divider
└─ App.jsx
```

---

## Theme

The palette merges both references — a warm cream ground with antique gold and
rose-clay accents on deep cocoa text. All values are CSS custom properties in
`src/styles/theme.css`, so a rebrand is a handful of lines.

| Token | Value | |
|---|---|---|
| `--bg` | `#FAF7F1` | page ground |
| `--bg-2` | `#F5EFE0` | warm beige band |
| `--card` | `#FDFBF7` | card surface |
| `--rose` | `#A86040` | primary accent (dates, numerals) |
| `--gold` | `#C9A84C` | ornament + borders |
| `--gold-dark` | `#8B6A2E` | Arabic script, signature |
| `--brown-deep` | `#5C4033` | headings |
| `--sage` | `#6B7C5C` | foliage accent |
| `--text` | `#2C2016` | body text |
| `--muted` | `#7A6652` | secondary text |

**Type:** Cormorant Garamond (display) · Great Vibes (script names) ·
Amiri (Arabic) · Montserrat (UI labels) — loaded from Google Fonts in `index.html`.

> Note: Great Vibes has no glyphs for `{`, `}` or `_`, so the placeholder tokens
> fall back to a serif in the hero. Real names render in the script face.

---

## Deploying

`npm run build` emits a fully static `/dist`. `base` is set to `'./'`, so the
output works from any path — Netlify, Vercel, GitHub Pages, or a plain folder on
a shared host.

---

## Accessibility & polish

- Respects `prefers-reduced-motion`.
- Decorative SVG and icons are `aria-hidden`; controls carry labels.
- Fluid `clamp()` type and layout — one column on phones, no horizontal scroll.
- Long names wrap instead of overflowing.
