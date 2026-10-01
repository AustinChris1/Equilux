---
name: Equilux
description: "Prove everything · Reveal no one. A zero-knowledge pay-equity protocol on Midnight, drawn as one scroll from sealed night to proven day."
colors:
  night: "#202b22"
  night-deep: "#131a15"
  night-soft: "#2b382d"
  gold: "#ffd85f"
  paper: "#fffdf5"
  cream: "#faf6e9"
  sage: "#9aa398"
  moss: "#55604f"
  reject: "#ffa2a2"
  reject-soft: "#ffc9c9"
  reject-ring: "#ff6467"
  reject-ground: "#460809"
  threshold: "#c10007"
  threshold-ink: "#9f0712"
typography:
  display:
    fontFamily: "Schibsted Grotesk, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(3rem, 6vw, 4.4rem)"
    fontWeight: 600
    lineHeight: 1.02
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Schibsted Grotesk, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 5vw, 3.75rem)"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Schibsted Grotesk, Segoe UI, system-ui, sans-serif"
    fontSize: "1.75rem"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.02em"
  figure:
    fontFamily: "Schibsted Grotesk, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(1.875rem, 3vw, 2.25rem)"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.025em"
  body-lede:
    fontFamily: "Instrument Sans, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.625
  body:
    fontFamily: "Instrument Sans, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.5
  body-sm:
    fontFamily: "Instrument Sans, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "Instrument Sans, system-ui, sans-serif"
    fontSize: "12px"
    fontWeight: 500
    lineHeight: 1.4
  label-caps:
    fontFamily: "Instrument Sans, system-ui, sans-serif"
    fontSize: "12px"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0.08em"
  mono:
    fontFamily: "Spline Sans Mono, ui-monospace, Cascadia Mono, monospace"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: 1.5
    fontFeature: "\"tnum\" 1"
  chip:
    fontFamily: "Spline Sans Mono, ui-monospace, Cascadia Mono, monospace"
    fontSize: "11px"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.04em"
  stamp:
    fontFamily: "Spline Sans Mono, ui-monospace, Cascadia Mono, monospace"
    fontSize: "12px"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "0.16em"
  wordmark:
    fontFamily: "Instrument Serif, Georgia, serif"
    fontSize: "22px"
    fontWeight: 400
    lineHeight: 1
rounded:
  xs: "4px"
  sm: "6px"
  md: "8px"
  lg: "12px"
  xl: "16px"
  band: "28px"
  full: "9999px"
spacing:
  band-inset: "8px"
  band-inset-md: "12px"
  gutter: "20px"
  gutter-md: "32px"
  grid-gap: "24px"
  card-gap: "12px"
  card-pad: "20px"
  section-y: "80px"
  section-y-md: "96px"
components:
  button-primary:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.night}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: "14px 24px"
  button-primary-day:
    backgroundColor: "{colors.night}"
    textColor: "{colors.gold}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: "14px 24px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.cream}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: "14px 16px"
  button-app:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.night}"
    rounded: "{rounded.md}"
    padding: "8px 16px"
  button-app-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.cream}"
    rounded: "{rounded.md}"
    padding: "8px 14px"
  tab:
    backgroundColor: "{colors.night}"
    textColor: "{colors.sage}"
    rounded: "{rounded.md}"
    padding: "8px 14px"
  tab-active:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.night}"
    rounded: "{rounded.md}"
    padding: "8px 14px"
  chip:
    backgroundColor: "{colors.night-deep}"
    textColor: "{colors.cream}"
    typography: "{typography.chip}"
    rounded: "{rounded.sm}"
    padding: "4px 8px"
  input-mono:
    backgroundColor: "{colors.night}"
    textColor: "{colors.cream}"
    typography: "{typography.mono}"
    rounded: "{rounded.sm}"
    padding: "8px 12px"
  section-band-night:
    backgroundColor: "{colors.night}"
    textColor: "{colors.cream}"
    rounded: "{rounded.band}"
    padding: "96px 32px"
  section-band-day:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.night}"
    rounded: "{rounded.band}"
    padding: "96px 32px"
  section-band-paper:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.night}"
    rounded: "{rounded.band}"
    padding: "96px 32px"
  card-indicator:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.night}"
    rounded: "{rounded.xl}"
    padding: "{spacing.card-pad}"
  panel-app:
    backgroundColor: "{colors.night}"
    textColor: "{colors.cream}"
    rounded: "{rounded.xl}"
    padding: "24px"
  figure-tile:
    backgroundColor: "{colors.night}"
    textColor: "{colors.cream}"
    rounded: "{rounded.md}"
    padding: "16px"
  stamp-proven:
    backgroundColor: "transparent"
    textColor: "{colors.gold}"
    typography: "{typography.stamp}"
    rounded: "{rounded.sm}"
    padding: "4px 10px"
---

# Design System: Equilux

## Overview

**Creative North Star: "Equinox"**

Equilux is named for the one day night and day are exactly equal, and the system is built out of that day. Everything private lives in an olive night: salaries, payroll rows, the sealed half of the logo. Everything proven lives in a royal-yellow and paper day: the published figures, the report anyone can check. The landing page is one scroll from that night to that day, and the pinned protocol stage in the middle is where the ground literally turns. The app surfaces (`/app`, `/verify`) stay in the night, because they are the working room where the sealing happens; the day appears inside them only as gold accents on what has been proven.

The recurring signature is the **Equals Seal**: an equals sign with one bar solid (the published aggregate) and one bar hollow (the sealed payroll). It is the logo, but it also runs through the pages as a horizon line under the hero, as the progress track of the protocol stage, and as the fill state of each roadmap wave. Density is moderate and editorial: large Schibsted Grotesk statements, short one-line copy, and data rendered as figures, chips and hashes rather than paragraphs. Every section carries one authored moment of motion and no more.

The system rejects the category default of a hero followed by stacked cards of paragraphs, eyebrow kickers above headings, and film-grain or noise textures. Product truth constrains it: no invented figures, no claimed mainnet, every number shown is one the circuit verified.

**Key Characteristics:**
- Two grounds with meaning: night (sealed, private) and day (gold/paper, proven, public).
- The Equals Seal, solid bar over hollow bar, as logo, horizon and progress motif.
- Rounded inset bands (28px corners, 8–12px inset) stacked down the page, one ground per band.
- Schibsted Grotesk for statements and figures; Instrument Sans for everything you read; Spline Sans Mono only for what a machine produced.
- Flat tonal surfaces with hairline rings; shadows only on objects floating over imagery or the stage.
- One strong ease-out curve for every motion; reduced motion always honored.

## Colors

A two-ground palette: deep olive night for what is sealed, royal yellow and warm paper for what is proven, with a quiet sage for secondary text and a red reserved for what the circuit refuses.

### Primary
- **Royal Proof Yellow** (#ffd85f): the color of what has been proven. Primary buttons on night, the solid bar of the Seal, step dots once done, the "proven" stamp, verified checks, hash text once committed, and the full ground of day bands (Indicators, Mandate, Roadmap). On night it is an accent used sparingly; on day it is the ground itself.

### Neutral
- **Olive Night** (#202b22): the sealed ground. Night bands (Cheats), app panels, figure tiles, and the ink color on every day surface (headings, primary-on-day buttons, seal bars on gold).
- **Deep Night** (#131a15): the page body and the darkest ground: hero, footer, app and verify page backgrounds, floating chips and notices.
- **Night Soft** (#2b382d): loading skeletons in the app only.
- **Paper** (#fffdf5): the second day ground (Who Sees, Scope, Try It) and the fill of indicator cards as they are proven.
- **Cream** (#faf6e9): primary text on night. Used at 5–8% alpha as the inactive fill of tabs, rows and cheat buttons on night, and at 60% as a table well on paper.
- **Sage** (#9aa398): secondary text on night: ledes, labels, captions, inactive nav. Always at full strength on night grounds.
- **Moss** (#55604f): long-form body text on paper (the Scope disclosures), where full night ink would be too heavy.

### Tertiary (state)
- **Circuit Reject** (#ffa2a2): icons and "Circuit rejected" labels when a cheat or a mismatch is refused.
- **Reject Soft** (#ffc9c9): body text inside error notices and the "≥ 5% · assess" chip.
- **Reject Ring** (#ff6467): hairline rings (30–50% alpha) around refused states.
- **Reject Ground** (#460809): the fill (30–60% alpha) behind refused states and the assess chip.
- **Threshold Red** (#c10007) and **Threshold Ink** (#9f0712): the 5% legal threshold line and its label on gold. Nowhere else.

### Named Rules
**The Two Grounds Rule.** Night means sealed, day means proven. A surface's ground states what it holds: private inputs and the working room sit on night; published figures and public statements sit on gold or paper. Never put a proven aggregate on a ground that reads as "sealed" without a gold signal, and never put a salary on a day ground.

**The One Night Band Rule.** On the landing, everything above and inside the protocol stage is night; everything after the stage turns to day (gold and paper alternating), with Cheats as the single night band, because cheating is an attack on the sealed side. The footer closes back in Deep Night.

**The Contrast Floor Rule.** Small text (12–15px) never drops below Sage at full strength on night grounds, or Olive Night at 75% opacity on gold and paper. Faded variants (sage/50, sage/70, night/45) are for icons, separators and decorative marks only.

**The Red Is a Verdict Rule.** Red appears only when the circuit refuses something or the 5% threshold is crossed. It is never decoration, never a brand accent, never a hover.

## Typography

**Display Font:** Schibsted Grotesk (with Segoe UI, system-ui)
**Wordmark Font:** Instrument Serif italic (with Georgia), for the word "Equilux" only
**Body Font:** Instrument Sans (with system-ui)
**Mono Font:** Spline Sans Mono (with ui-monospace, Cascadia Mono)

**Character:** A tight, confident grotesk for claims and numbers, a soft humanist sans for everything a person reads, and a mono that marks anything a machine produced. The italic serif appears once per screen, in the wordmark, as the only soft gesture in an otherwise engineered system.

### Hierarchy
- **Display** (600, 48px to 4.4rem, line-height 1.02, -0.025em): the hero headline only, two lines, the second in gold.
- **Headline** (600, 36px to 60px, line-height 1.05, -0.025em): one per landing band, a full sentence stated as fact ("All seven Article 9 figures. Proven."). Cheats, Try It and the stage headline cap at 48px.
- **Title** (600, 1.75rem, -0.02em): page titles in `/app` and `/verify`; the same face at 20–30px titles Scope columns and roadmap waves.
- **Figure** (600, 30px to 36px): proven numbers on indicator cards, report tiles, hero stats. Figures are display-face statements, not mono readouts.
- **Body lede** (400, 18px, line-height 1.625): the single line under the hero headline. Max width about 28rem.
- **Body** (400, 15px / 14px, line-height 1.5–1.625): section copy, disclosures, step lines. Max width about 42rem (2xl).
- **Label** (500, 12–13px): captions, notes, nav links, table heads, card labels. Report and app labels are sans, never mono.
- **Label caps** (600, 12px, 0.08em, uppercase): app step titles ("1 · Deploy the reporting contract" with the number in gold), report tile labels, image captions on Who Sees, "Circuit rejected".
- **Mono** (400, 11–13px, tabular): hashes, contract addresses, salary and euro readouts in the app, circuit rejection messages, code. **Chip** (11px, 0.04em) wraps the short ones.
- **Stamp** (mono 600, 12–15px, 0.16–0.2em, uppercase, rotated -8° to -10°, 2px border): the "proven" stamp, the single uppercase-mono device, because it is the circuit's verdict.

### Named Rules
**The Machine Voice Rule.** Spline Sans Mono is used only for text a machine produced: hashes, addresses, figures in data rows, circuit messages, code and the proven stamp. Headings, labels, buttons and section titles are never mono.

**The One Wordmark Rule.** Instrument Serif italic sets the word "Equilux" and nothing else, always next to the Seal.

## Layout

The landing is a stack of **inset bands**: each section is its own rounded panel (28px corners) inset 8px from the viewport (12px from md), separated by the same 8–12px gap, so the page reads as a column of grounds rather than one continuous canvas. Inside each band, content sits in a centered container (1152px max) with 20px gutters (32px from md) and vertical padding of 80px (96px from md).

A strict **12-column grid** with 24px gutters governs the bands that split: the hero (5 columns copy, 7 columns imagery), the protocol stage (5 columns step list, 7 columns stage), Cheats (5 / 7). Headline-led bands put the statement first at up to 3xl width, then the data below. Card grids use a 12px gap: indicator cards 2 columns on mobile, 4 from md, with the last indicator spanning 2.

The protocol stage is a 520vh section with a sticky full-height panel; scroll progress drives the active step (five steps), the ground color, and the Seal track at the bottom.

App surfaces use a wider container (1280px for `/app`, 1024px for `/verify`) with 16–24px gutters. The workspace is a main panel plus a 380px activity rail from lg, stacked below on smaller screens; the progress rail shows labels from sm and a single "Step n of 6" line on phones.

Breakpoints are Tailwind defaults (640 / 768 / 1024px). Everything collapses to one column at phone width with no horizontal page scroll; wide tables scroll inside their own rounded well.

## Elevation & Depth

Flat by default. Depth comes from tonal grounds (Deep Night under Night under Cream-at-6%) and hairline rings: gold at 10–25% alpha on night, Olive Night at 10–20% alpha on day. Shadows exist only for objects that float over imagery or over the protocol stage, where they need to detach from a busy ground. On night those shadows are black and deep; on day they are tinted with Olive Night so they read as the same light.

### Shadow Vocabulary
- **Night float** (`box-shadow: 0 24px 48px -16px rgba(0,0,0,0.7)`): the hero's report card over the portraits.
- **Night chip** (`box-shadow: 0 10px 24px -8px rgba(0,0,0,0.6)`): sealing chips laid over photographs.
- **Night notice** (`box-shadow: 0 18px 40px -12px rgba(0,0,0,0.7)`): the cheat that bounces off the stage.
- **Day float** (`box-shadow: 0 30px 60px -24px rgba(32,43,34,0.6)`): the report card that lands in daylight at the end of the stage.
- **Day screenshot** (`box-shadow: 0 24px 60px -20px rgba(32,43,34,0.45)`): the app screenshot in Try It.
- **Current halo** (`box-shadow: 0 0 0 4px rgba(255,216,95,0.15)`): the app progress-rail dot for the party currently open.

### Named Rules
**The Float Only Rule.** A shadow means "this object is laid over something else." Cards, panels and bands sitting on their own ground get a ring, never a shadow.

## Shapes

Soft, consistent rounding that steps down with scale: 28px for section bands, 16px for cards, figures, photos and app panels, 12px for cheat buttons and floating report cards, 8px for buttons, tabs, notices and data tiles, 6px for chips, inputs and stamps, 4px for quartile and dash marks. Circles are reserved for meaning: step dots, check and minus marks, sealed payroll points.

The Seal's own geometry is the house silhouette: a full-round solid bar over a full-round outlined bar. Wherever progress, a horizon or a fill state is drawn, it is drawn as this pair (a filling pill over a hollow pill), never as a generic spinner or bar chart.

Photography is always duotoned into the world: grayscale, slightly darkened, multiplied with an olive-to-gold gradient and washed with a 10% gold overlay, inside a 16px rounded frame.

## Components

### Buttons
Confident, warm and physical: a solid gold slab that lifts or presses, never a gradient.
- **Shape:** gently rounded (8px).
- **Primary (night):** Royal Proof Yellow ground, Olive Night text, 15px semibold, 14px by 24px, with a trailing arrow that nudges 2px right on hover. Presses to 0.97 scale on active (150ms ease-out).
- **Primary (day):** inverted: Olive Night ground, gold text, same size; lifts 2px on hover.
- **Ghost:** transparent with a 1px gold ring at 25%; text Cream at 85%. Hover turns the text gold and the ring to 60%.
- **App size:** 13px, 8px by 16px (ghost 8px by 14px); primary lifts 2px on hover, disabled drops to 50% and stops lifting.
- **Focus:** 2px gold outline, 4px offset, on every interactive element.

### Chips
- **Style:** mono 11px, 6px radius, 4px by 8px, icon gap 6px. On night: Deep Night at 90% with a gold ring at 25% when floating over photos; gold at 10–15% fill with gold text for confirmed states ("counted", "< 5%"); Cream at 6% for neutral counters.
- **State:** the assess chip ("≥ 5% · assess") is Reject Ground at 50% with Reject Soft text. Chips that change state scramble their text through noise before resolving.

### Cards / Containers
- **Indicator cards (day):** 16px radius, 20px padding, min height 176px, a ring of Olive Night at 20% on gold. Each carries a lettered night disc (a–g) with gold letter, a muted line icon, a Figure-size number, a 14px label and a 12px note at night/75. The paper fill rises from the bottom as each indicator is shown proven.
- **App panels (night):** 16px radius, Olive Night ground, gold ring at 12%, 20–24px padding. The activity rail sits on Deep Night at 60% with a gold ring at 10%.
- **Figure tiles:** 8px radius, 1px gold border at 15–25%, 16px padding, label caps over a Figure-size number over a 12px sage note.
- **Shadow strategy:** none at rest (see Elevation).

### Inputs / Fields
- **Style:** mono 12px, Olive Night or Deep Night ground, 1px gold border at 15%, 6px radius, 8px by 12px. Placeholder sage at 50%.
- **Focus:** the border strengthens to gold at 50%; no glow.
- **Choices:** native radios tinted gold (`accent-color`), set in 13px cream text inside a bordered "Try to cheat" well.
- **Error:** a notice on Reject Ground at 30% with a Reject Ring hairline, Reject Soft text, and the circuit's own message.

### Navigation
- **Landing nav:** fixed, transparent at the top, fading to Deep Night at 88% with a backdrop blur and a gold hairline (14%) over the first 120px of scroll. Seal (gold) plus wordmark at 22px on the left; 13px medium sage links that turn gold on hover; the gold "Open the app" button on the right. Links hide below md.
- **App header:** sticky, Deep Night at 90% with blur and a gold hairline at 10%. Seal plus 21px wordmark, a hairline divider, then Workspace and Verify (current page in cream, others sage).
- **Party tabs (app):** 8px radius, 13px medium with a 13px icon; active is gold ground with night text, inactive is Cream at 6% with sage text.

### The Equals Seal Horizon (signature)
A solid gold pill over a hollow gold pill (border at 40–50%). Under the hero it draws in from the left once (1.1s); under the protocol stage the solid bar fills with scroll progress and turns to Olive Night when the ground turns to day; in the roadmap each wave is a hollow pill with a night fill of 100%, 60% or 0% for delivered, building and planned. In the app the same idea becomes the progress rail: a gold hairline that scales across six step dots as the flow completes.

### The Proven Stamp (signature)
A rotated mono "proven" (or "all 7 proven") in a 2px bordered box, gold on night or night on gold. It lands once: from 1.5× scale and invisible to 1×, 350ms, strong ease-out, after the thing it certifies has appeared. Scrolling back never replays it.

### Protocol Stage (signature)
A sticky full-height panel whose ground interpolates Deep Night → Olive Night → Royal Proof Yellow across scroll. Left: five steps as a list of icon dots (active gold on night, night on day) with the active step's one-line explanation expanding below it. Right: fourteen payroll rows whose salaries scramble into hashes, a gold sweep for the council, a refused cheat, the Seal with the proven stamp, and finally the report card in daylight, its figures counting up over 900ms.

## Do's and Don'ts

### Do:
- **Do** choose a ground by meaning: night for sealed inputs and the working app, gold or paper for proven, public results.
- **Do** draw progress, horizons and fill states as the Equals Seal pair: a solid pill over a hollow pill.
- **Do** use the single strong ease-out `cubic-bezier(0.23, 1, 0.32, 1)` for entrances and state changes, 200ms for state, 250–450ms for steps, 700ms for entrances, 900–1100ms for drawing a seal bar.
- **Do** animate with full transform strings in framer-motion (`transform: "translateY(18px)"`, `"rotate(-8deg) scale(1.5)"`), and limit each section to one authored moment.
- **Do** honor `prefers-reduced-motion`: show the end state immediately, stop the star twinkle, skip the council sweep, show counts at their final value.
- **Do** keep small text at Sage on night and Olive Night at 75% or stronger on gold and paper.
- **Do** set hashes, addresses and circuit messages in Spline Sans Mono with tabular numerals, and let them scramble through noise when they change state.
- **Do** duotone every photograph into the olive and gold world inside a 16px frame.

### Don't:
- **Don't** put eyebrow kickers or overline labels above headings; the headline states the fact on its own.
- **Don't** add grain, noise or film textures to any ground.
- **Don't** use Spline Sans Mono for headings, section titles, buttons or report labels.
- **Don't** use Instrument Serif for anything except the word "Equilux".
- **Don't** add another night band between the protocol stage and the footer beyond Cheats.
- **Don't** use red except for a circuit refusal or the 5% threshold.
- **Don't** give resting cards or panels a drop shadow; use a hairline ring.
- **Don't** replay the proven stamp or stack several animated moments in one section.
- **Don't** show a salary on a day ground, or a figure the circuit did not verify.
