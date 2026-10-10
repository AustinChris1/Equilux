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
  app-title:
    fontFamily: "Schibsted Grotesk, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(2rem, 4vw, 2.5rem)"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.025em"
  chapter:
    fontFamily: "Schibsted Grotesk, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 3vw, 2.125rem)"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Schibsted Grotesk, Segoe UI, system-ui, sans-serif"
    fontSize: "1.75rem"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.02em"
  figure-summary:
    fontFamily: "Schibsted Grotesk, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(3rem, 5vw, 3.75rem)"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.025em"
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
  stage: "24px"
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
  stage-pad: "20px"
  stage-pad-md: "40px"
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
  button-chapter:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.night}"
    typography: "{typography.body}"
    rounded: "{rounded.lg}"
    padding: "12px 24px"
    height: "48px"
  wallet-pill:
    backgroundColor: "{colors.night}"
    textColor: "{colors.cream}"
    rounded: "{rounded.md}"
    padding: "6px 10px 6px 6px"
  pill-mode:
    backgroundColor: "rgba(250, 246, 233, 0.06)"
    textColor: "{colors.cream}"
    rounded: "{rounded.full}"
    padding: "6px 12px 6px 8px"
  pill-progress:
    backgroundColor: "rgba(250, 246, 233, 0.06)"
    textColor: "{colors.sage}"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
    padding: "4px 10px"
  pill-progress-active:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.night}"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
    padding: "4px 10px"
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
  panel-stage:
    backgroundColor: "{colors.night}"
    textColor: "{colors.cream}"
    rounded: "{rounded.stage}"
    padding: "{spacing.stage-pad-md}"
  drawer:
    backgroundColor: "{colors.night}"
    textColor: "{colors.cream}"
    typography: "{typography.body}"
    rounded: "{rounded.xl}"
    padding: "{spacing.card-pad}"
  avatar-party:
    backgroundColor: "{colors.gold}"
    rounded: "{rounded.full}"
    size: "150px"
  avatar-chapter:
    backgroundColor: "{colors.gold}"
    rounded: "{rounded.full}"
    size: "56px"
  avatar-team:
    backgroundColor: "{colors.cream}"
    rounded: "{rounded.full}"
    size: "60px"
  card-cheat:
    backgroundColor: "rgba(250, 246, 233, 0.06)"
    textColor: "{colors.cream}"
    rounded: "{rounded.lg}"
    padding: "16px"
  card-cheat-rejected:
    backgroundColor: "{colors.reject-ground}"
    textColor: "{colors.reject-soft}"
    rounded: "{rounded.lg}"
    padding: "16px"
  report-summary:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.night}"
    rounded: "{rounded.xl}"
    padding: "28px"
  guide-setup:
    backgroundColor: "rgba(255, 216, 95, 0.07)"
    textColor: "{colors.cream}"
    rounded: "{rounded.xl}"
    padding: "{spacing.card-pad}"
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
  stamp-rejected:
    backgroundColor: "transparent"
    textColor: "{colors.reject}"
    typography: "{typography.stamp}"
    rounded: "{rounded.sm}"
    padding: "2px 8px"
---

# Design System: Equilux

## Overview

**Creative North Star: "Equinox"**

Equilux is named for the one day night and day are exactly equal, and the system is built out of that day. Everything private lives in an olive night: salaries, payroll rows, the sealed half of the logo. Everything proven lives in a royal-yellow and paper day: the published figures, the report anyone can check. The landing page is one scroll from that night to that day, and the pinned protocol stage in the middle is where the ground literally turns. The app surfaces (`/app`, `/verify`) stay in the night, because they are the working room where the sealing happens; the day appears inside them only on what has been proven: gold character discs for finished chapters, the gold report card, the "Anyone can see" card.

The recurring signature is the **Equals Seal**: an equals sign with one bar solid (the published aggregate) and one bar hollow (the sealed payroll). It is the logo, but it also runs through the pages as a horizon line under the hero, as the progress track of the protocol stage, as the fill state of each roadmap wave, and as the chapter track of `/app`, with the story's characters riding on it. Density is moderate and editorial: large Schibsted Grotesk statements, short one-line copy, and data rendered as figures, chips and hashes rather than paragraphs. Every section carries one authored moment of motion and no more.

`/app` tells the protocol as a guided story: six chapters, each led by a drawn character, one sentence, one line and one gold button. People are drawn, not photographed, and the words on the surface are plain; the machine's vocabulary waits inside "Behind the scenes".

The system rejects the category default of a hero followed by stacked cards of paragraphs, eyebrow kickers above headings, and film-grain or noise textures. Product truth constrains it: no invented figures, no claimed mainnet, every number shown is one the circuit verified.

**Key Characteristics:**
- Two grounds with meaning: night (sealed, private) and day (gold/paper, proven, public).
- The Equals Seal, solid bar over hollow bar, as logo, horizon, progress motif and the app's chapter track.
- Rounded inset bands (28px corners, 8–12px inset) stacked down the landing, one ground per band.
- Schibsted Grotesk for statements and figures; Instrument Sans for everything you read; Spline Sans Mono only for what a machine produced.
- Drawn characters (DiceBear Notionists) in round gold or cream discs carry the app's story.
- Flat tonal surfaces with hairline rings; shadows only on objects floating over imagery, the stage or the page.
- One strong ease-out curve for every motion; reduced motion always honored.

## Colors

A two-ground palette: deep olive night for what is sealed, royal yellow and warm paper for what is proven, with a quiet sage for secondary text and a red reserved for what the rules refuse.

### Primary
- **Royal Proof Yellow** (#ffd85f): the color of what has been proven. Primary buttons and the chapter action slab on night, the solid bar of the Seal, finished chapter discs, the "proven" stamp, verified checks, hash text once committed, the app's report card and "Anyone can see" card, and the full ground of day bands (Indicators, Mandate, Roadmap). On night it is an accent used sparingly; on day it is the ground itself. At 7–15% it tints setup guides, icon discs and the "done" pill.

### Neutral
- **Olive Night** (#202b22): the sealed ground. Night bands (Cheats), the app stage, drawers, the wallet pill and dropdown, figure tiles, and the ink color on every day surface (headings, primary-on-day buttons, seal bars on gold, the report card).
- **Deep Night** (#131a15): the page body and the darkest ground: hero, footer, app and verify page backgrounds, the Try to cheat section, payroll cells, the Behind the scenes log, floating chips and notices.
- **Night Soft** (#2b382d): loading skeletons in the app only.
- **Paper** (#fffdf5): the second day ground (Who Sees, Scope, Try It) and the fill of indicator cards as they are proven.
- **Cream** (#faf6e9): primary text on night and the ground of team members' character discs. Used at 3–8% alpha as the fill of the mode pill, cheat cards, wallet choices, future progress pills and rows on night, and at 60% as a table well on paper.
- **Sage** (#9aa398): secondary text on night: ledes, chapter lines, labels, captions, inactive nav, locked reasons. Always at full strength on night grounds. A pale sage disc ground (#c9cfc4, avatar-only) marks a chapter not yet finished.
- **Moss** (#55604f): long-form body text on paper (the Scope disclosures), where full night ink would be too heavy.

### Tertiary (state)
- **Circuit Reject** (#ffa2a2): icons, the REJECTED stamp, the machine message, the rejected count and "Circuit rejected" labels when a cheat or a mismatch is refused.
- **Reject Soft** (#ffc9c9): the plain reason on a rejected cheat card, body text inside a stopped-step notice, and the "≥ 5% · assess" chip.
- **Reject Ring** (#ff6467): the REJECTED stamp's border and hairline rings (30–50% alpha) around refused states.
- **Reject Ground** (#460809): the fill (30–60% alpha) behind refused states and the assess chip.
- **Threshold Red** (#c10007) and **Threshold Ink** (#9f0712): the 5% legal threshold line and its label on gold, and a category "over 5%, must be checked" in the app's report card. Nowhere else.

### Named Rules
**The Two Grounds Rule.** Night means sealed, day means proven. A surface's ground states what it holds: private inputs and the working room sit on night; published figures and public statements sit on gold or paper. Never put a proven aggregate on a ground that reads as "sealed" without a gold signal, and never put a salary on a day ground.

**The One Night Band Rule.** On the landing, everything above and inside the protocol stage is night; everything after the stage turns to day (gold and paper alternating), with Cheats as the single night band, because cheating is an attack on the sealed side. The footer closes back in Deep Night.

**The Contrast Floor Rule.** Small text (12–15px) never drops below Sage at full strength on night grounds, or Olive Night at 75% opacity on gold and paper. Faded variants (sage/50, sage/60, sage/70, night/45, night/60) are for icons, separators and decorative marks only.

**The Red Is a Verdict Rule.** Red appears only when the rules refuse something or the 5% threshold is crossed: a rejected cheat card and its stamp, the rejected count, a step the rules stopped (its notice and the failed lines in Behind the scenes), and the over-5% flag. Setup states (no wallet, no fee fuel) are guides in gold and cream, never red. Red is never decoration, never a brand accent, never a hover.

## Typography

**Display Font:** Schibsted Grotesk (with Segoe UI, system-ui)
**Wordmark Font:** Instrument Serif italic (with Georgia), for the word "Equilux" only
**Body Font:** Instrument Sans (with system-ui)
**Mono Font:** Spline Sans Mono (with ui-monospace, Cascadia Mono)

**Character:** A tight, confident grotesk for claims and numbers, a soft humanist sans for everything a person reads, and a mono that marks anything a machine produced. The italic serif appears once per screen, in the wordmark, as the only soft gesture in an otherwise engineered system.

### Hierarchy
- **Display** (600, 48px to 4.4rem, line-height 1.02, -0.025em): the hero headline only, two lines, the second in gold.
- **Headline** (600, 36px to 60px, line-height 1.05, -0.025em): one per landing band, a full sentence stated as fact ("All seven Article 9 figures. Proven."). Cheats, Try It and the stage headline cap at 48px.
- **App title** (600, 32px to 40px, line-height 1.1, -0.025em): the `/app` H1, "Watch Acme prove its pay gap".
- **Chapter** (600, 28px to 34px, line-height 1.15, -0.02em): each `/app` chapter title, a plain sentence in cream ("The payroll company locks every salary"). No number, no caps.
- **Title** (600, 1.75rem, -0.02em): the `/verify` page title and the "Try to cheat" section title; the same face at 20–30px titles Scope columns and roadmap waves, and at 17px the wallet dropdown.
- **Figure summary** (600, 48px to 60px, line-height 1): the two gap figures on the app's report card, each over a plain sentence ("less pay for women, on average").
- **Figure** (600, 30px to 36px): proven numbers on indicator cards, report tiles, hero stats. Figures are display-face statements, not mono readouts.
- **Body lede** (400, 18px, line-height 1.625): the single line under the hero headline. Max width about 28rem.
- **Body** (400, 15px / 14px, line-height 1.5–1.625): section copy, disclosures, the chapter line (15px, 16px from md, sage, max width about 36rem), cheat card titles (15px semibold), drawer summaries (15px medium).
- **Label** (500, 12–13px): captions, notes, nav links, table heads, card labels, chapter-track labels (12px semibold), write-progress pills. Report and app labels are sans, never mono.
- **Label caps** (600, 12px, 0.08em, uppercase): `/verify` section heads ("What the chain says"), report tile labels, image captions on Who Sees, the landing's "Circuit rejected". Never an app chapter title.
- **Mono** (400, 11–13px, tabular): hashes, contract addresses, sealed salary readouts in the app, the machine message on a rejected cheat, the Behind the scenes log, code. **Chip** (11px, 0.04em) wraps the short ones.
- **Stamp** (mono 600, 11–15px, 0.16–0.2em, uppercase, rotated -8° to -10°, 2px border): the "proven" stamp and the REJECTED stamp, the only uppercase-mono devices, because each is a verdict.

### Named Rules
**The Machine Voice Rule.** Spline Sans Mono is used only for text a machine produced: hashes, addresses, figures in data rows, rule messages, logs, code and the verdict stamps. Headings, labels, buttons and section titles are never mono.

**The One Wordmark Rule.** Instrument Serif italic sets the word "Equilux" and nothing else, always next to the Seal.

**The Plain Words Rule.** App surfaces speak to someone who has never heard of zero knowledge: "Open the report", "Lock 14 salaries", "Check and approve", "Math proof", "Fee fuel (DUST)". The words contract, circuit, enroll and commit appear only inside "Behind the scenes" and in machine messages set in mono.

## Layout

The landing is a stack of **inset bands**: each section is its own rounded panel (28px corners) inset 8px from the viewport (12px from md), separated by the same 8–12px gap, so the page reads as a column of grounds rather than one continuous canvas. Inside each band, content sits in a centered container (1152px max) with 20px gutters (32px from md) and vertical padding of 80px (96px from md).

A strict **12-column grid** with 24px gutters governs the bands that split: the hero (5 columns copy, 7 columns imagery), the protocol stage (5 columns step list, 7 columns stage), Cheats (5 / 7). Headline-led bands put the statement first at up to 3xl width, then the data below. Card grids use a 12px gap: indicator cards 2 columns on mobile, 4 from md, with the last indicator spanning 2.

The protocol stage is a 520vh section with a sticky full-height panel; scroll progress drives the active step (five steps), the ground color, and the Seal track at the bottom.

App surfaces sit under a sticky header in a 1280px container. `/app` content is 1152px wide and `/verify` 1024px, with 16px gutters (24px from md).

`/app` is a **guided six-chapter story** in one column, one thing at a time:
1. **Title row:** the H1, with the mode pill under it ("Practice run in your browser", "Live on Midnight testnet"); the ghost "Try to cheat" and "Start over" sit at the right from md and wrap below on phones.
2. **Chapter track:** six character discs (Acme, Payroll, Council, Team, Report, Anyone) spaced edge to edge on the Equals Seal, a label under each from sm; on phones the labels hide and one line reads "2 of 6 · Payroll".
3. **Stage:** one panel showing one chapter. From md it is a 200px character column beside the chapter column (40px gap, 40px padding); on phones it stacks and centers (20px padding) so the character, the sentence and the gold action land above the fold. The chapter's living picture (payroll people, the team, the report card, the "Anyone can see / Nobody can see" pair) sits 32px under the action.
4. **Try to cheat** (opened from the title row, then scrolled to): a Deep Night section of cheat cards, 1 / 2 / 3 columns (sm / lg) with a 12px gap.
5. **Two drawers**, collapsed: "Use your own payroll" and "Behind the scenes", side by side from lg.

Inner grids step up with width: payroll people 2 / 3 / 4 columns, the team 3 / 4 / 7, the report's two figures 1 / 2.

Breakpoints are Tailwind defaults (640 / 768 / 1024px). Everything collapses to one column at phone width with no horizontal page scroll; wide tables scroll inside their own rounded well.

### Named Rules
**The One Chapter Rule.** The `/app` stage shows one chapter: one character, one sentence, one line, one gold action. Everything else (cheats, your own payroll, the technical record) waits behind a button or a closed drawer.

## Elevation & Depth

Flat by default. Depth comes from tonal grounds (Deep Night under Night under Cream-at-6%) and hairline rings: gold at 8–25% alpha on night, Olive Night at 10–20% alpha on day. Shadows exist only for objects that float over imagery, over the protocol stage, or over the page itself, where they need to detach from a busy ground. On night those shadows are black and deep; on day they are tinted with Olive Night so they read as the same light.

### Shadow Vocabulary
- **Night float** (`box-shadow: 0 24px 48px -16px rgba(0,0,0,0.7)`): the hero's report card over the portraits, and the wallet dropdown over the app.
- **Night chip** (`box-shadow: 0 10px 24px -8px rgba(0,0,0,0.6)`): sealing chips laid over photographs.
- **Night notice** (`box-shadow: 0 18px 40px -12px rgba(0,0,0,0.7)`): the cheat that bounces off the stage.
- **Day float** (`box-shadow: 0 30px 60px -24px rgba(32,43,34,0.6)`): the report card that lands in daylight at the end of the stage.
- **Day screenshot** (`box-shadow: 0 24px 60px -20px rgba(32,43,34,0.45)`): the app screenshot in Try It.
- **Chapter ring** (`box-shadow: 0 0 0 3px #131a15, 0 0 0 6px #ffd85f`): not a float but a ring drawn with spread: a ground-colored gap, then a gold ring around the chapter disc on stage. Team discs use the same device on Olive Night (`0 0 0 3px #202b22, 0 0 0 5px #ffd85f`) once that person has confirmed.

### Named Rules
**The Float Only Rule.** A shadow means "this object is laid over something else." Cards, panels and bands sitting on their own ground get a ring, never a drop shadow.

## Shapes

Soft, consistent rounding that steps down with scale: 28px for section bands, 24px for the app stage and the Try to cheat section, 16px for cards, figures, photos, app panels, drawers, the report card and the wallet dropdown, 12px for the chapter action slab, cheat cards, payroll cells and floating report cards, 8px for buttons, the wallet pill, notices and data tiles, 6px for chips, inputs and stamps, 4px for quartile and dash marks. Circles are reserved for meaning: character discs, icon discs, step and check marks, sealed payroll points, the mode pill and write-progress pills.

The Seal's own geometry is the house silhouette: a full-round solid bar over a full-round outlined bar. Wherever progress, a horizon or a fill state is drawn, it is drawn as this pair (a filling pill over a hollow pill), never as a generic spinner or bar chart.

Photography is always duotoned into the world: grayscale, slightly darkened, multiplied with an olive-to-gold gradient and washed with a 10% gold overlay, inside a 16px rounded frame. Drawn characters are never duotoned; they sit on their flat disc ground.

## Components

### Buttons
Confident, warm and physical: a solid gold slab that lifts or presses, never a gradient.
- **Shape:** gently rounded (8px); the chapter slab 12px.
- **Primary (night):** Royal Proof Yellow ground, Olive Night text, 15px semibold, 14px by 24px, with a trailing arrow that nudges 2px right on hover. Presses to 0.97 scale on active (150ms ease-out).
- **Primary (day):** inverted: Olive Night ground, gold text, same size; lifts 2px on hover.
- **Chapter action (app):** the one gold slab per chapter: 15px semibold, 12px by 24px, at least 48px tall, an optional leading icon. Lifts 2px on hover, presses to 0.97; disabled drops to 55%. While working it shows a spinner and the step in plain words ("Locking the salaries…"). Once the chapter is done it becomes a "done" pill (gold at 12%, gold text, a check) that scales in from 0.9 over 200ms.
- **Play the whole story:** beside the slab, a quiet text button: 14px medium sage with a Play icon, underlined in gold at 30%, gold on hover. It reads "Play the rest" once a chapter is done and disappears once the report is published.
- **Ghost:** transparent with a 1px gold ring at 25%; text Cream at 85%. Hover turns the text gold and the ring to 60%.
- **App size:** 13px, 8px by 16px (ghost 8px by 14px); primary lifts 2px on hover, disabled drops to 50% and stops lifting. The header's "Connect wallet" is this size with a wallet icon.
- **Focus:** 2px gold outline, 2–4px offset, on every interactive element, including character discs and drawer summaries.

### Chips and Pills
- **Chips:** mono 11px, 6px radius, 4px by 8px, icon gap 6px. On night: Deep Night at 90% with a gold ring at 25% when floating over photos; gold at 10–15% fill with gold text for confirmed states ("counted", "< 5%"); Cream at 6% for neutral counters. The assess chip ("≥ 5% · assess") is Reject Ground at 50% with Reject Soft text. Chips that change state scramble their text through noise before resolving.
- **Mode pill (app):** fully round, Cream at 6%, 13px cream text, a 24px icon disc: gold with a night icon when live on a chain, Cream at 10% in practice.
- **Write progress (app, wallet mode):** three fully round 12px pills in a row, "Math proof", "Approve in [wallet]", "On the blockchain", joined by 16px gold hairlines at 25%. Past steps are gold at 15% with a check; the current step is solid gold with night text and a spinner; future steps are Cream at 6% with sage text and their line icon.

### Cards / Containers
- **Indicator cards (day):** 16px radius, 20px padding, min height 176px, a ring of Olive Night at 20% on gold. Each carries a lettered night disc (a–g) with gold letter, a muted line icon, a Figure-size number, a 14px label and a 12px note at night/75. The paper fill rises from the bottom as each indicator is shown proven.
- **App stage:** 24px radius, Olive Night ground, gold ring at 12%. A chapter enters from 28px right and leaves 20px left (350ms); under reduced motion it simply swaps.
- **App panels (`/verify`):** 16px radius, Olive Night ground, gold ring at 12%, 16–24px padding.
- **Drawers (app):** 16px radius, Olive Night at 70%, gold ring at 10%. The summary is a 20px-padded row: a 36px gold-at-12% icon disc, a 15px medium cream title, a sage chevron that turns 180° when open. Behind the scenes adds a count chip (Cream at 8%, fully round) and opens onto a Deep Night mono log (12px; each step's heading line in 13px cream sans, failed lines in Circuit Reject).
- **Payroll cells (app):** 12px radius, Deep Night at 70%, gold ring at 8%, 10px padding: a 36px cream character disc, the first name in 13px cream with the department in sage, and the salary in 11px mono that scrambles into a lock and a short gold hash once locked. When the council approves, a 16px gold check badge pops onto each face, 40ms apart.
- **Report summary (app, day ground):** the published report as a gold card: 16px radius, 20px padding (28px from md), night ink. It reveals upward with a clip from the bottom (700ms), then the proven stamp lands once in its corner. Two Figure-summary numbers, each over a plain sentence ("9.69% less pay for women, on average", "at the middle salary"); then category rows divided by Olive Night hairlines at 15% (a shield for a gap under 5%, a people icon and "too few people to show" when hidden, Threshold Ink and "over 5%, must be checked" when flagged); then the bonus line. Below it, a closed night drawer "See all seven figures the law asks for" holds the report tiles.
- **Anyone can see / Nobody can see:** a pair of 16px cards, side by side from sm. The first is solid gold with night text and checks (the figures, one sealed code per salary, the math proof); the second is Deep Night with a gold ring at 12%, sage text and gold locks (any salary, any name, who earns what).
- **Setup guides:** when the wallet has no fee fuel, the stage shows a guide, not an error: gold at 7% with a gold ring at 25%, 16px radius, 20px padding, a gold fuel icon, a 15px cream title ("Lace needs fee fuel (DUST) first"), three steps numbered in 28px gold discs (faucet, turn on DUST, wait), and a ghost "Check again".
- **Figure tiles:** 8px radius, 1px gold border at 15–25%, 16px padding, label caps over a Figure-size number over a 12px sage note.
- **Shadow strategy:** none at rest (see Elevation).

### Avatar (drawn characters)
Every person in `/app` is a Notionists character by Zoish (CC0 1.0), drawn by DiceBear (`@dicebear/core`, `@dicebear/notionists`) from a seed: the same seed always draws the same face, so a person looks the same in the track, the stage, the payroll and the team. Each sits in a full-round disc on a flat ground: gold for the parties (Acme, the payroll company, the council, the inspector), cream for the team, a pale sage for a chapter not yet finished. Chapters beyond the current one also drop to 45% with grayscale.
- **Sizes:** 112px on the stage (150px from md); the council as three overlapping faces (the middle one larger, all ringed 4px in Olive Night); 44px in the chapter track (56px from sm) with a 20–24px badge disc (gold with a check when done, night with a sage line icon otherwise); 60px in the team grid; 36px in payroll cells.
- **Team grid:** tapping a face confirms that person; a confirmed face gets the chapter ring and a gold lock badge, which becomes a check once they have checked they were counted. Faces wait at 50% with grayscale until the council approves.

### Inputs / Fields
- **Style:** mono 12px, Olive Night or Deep Night ground, 1px gold border at 15%, 6px radius, 8px by 12px. Placeholder sage at 50%. In `/app` they appear only inside "Use your own payroll" (the three parties' keys), under 12px sage labels.
- **Focus:** the border strengthens to gold at 50%; no glow.
- **Choices:** no radio lists. A choice the visitor makes is a card (see Cheat cards).
- **Error:** a notice on Reject Ground at 30–35% with a Reject Ring hairline, Reject Soft text, and the rule's own message in mono.

### Cheat cards
Every trick a dishonest party might try, as a card the visitor taps. 12px radius, 16px padding, at least 132px tall, a 1px ring.
- **Ready:** Cream at 6%, gold ring at 12% (hover Cream at 10%, ring at 35%); a 40px icon disc (gold at 15%, gold line icon), a 15px semibold cream title ("Add an employee who doesn't exist"), and "Tap to try it" in 13px sage at the foot.
- **Locked:** Cream at 3%, ring at 8%, sage title and a lock with the plain reason ("After the council approves").
- **Rejected:** the card turns to Reject Ground at 45% with a Reject Ring at 45%, knocks once sideways (0, -9, 7, -3, 0px over 320ms), then the REJECTED stamp lands in its corner (mono 11px, 2px Reject Ring border, rotated -10°, from 1.6× to 1× over 300ms, 220ms after the knock starts). Below the title: the plain reason in Reject Soft, then the machine message in 11px mono in Circuit Reject at 80%. Under reduced motion there is no knock and the stamp is simply there.
- **Section:** a Deep Night panel (24px radius, gold ring at 10%) headed by a 56px gold-at-15% mask disc, the 28px title "Try to cheat" and one sage line; the count of rejected tricks sits at the right in 14px Circuit Reject.

### Navigation
- **Landing nav:** fixed, transparent at the top, fading to Deep Night at 88% with a backdrop blur and a gold hairline (14%) over the first 120px of scroll. Seal (gold) plus wordmark at 22px on the left; 13px medium sage links that turn gold on hover; the gold "Open the app" button on the right. Links hide below md.
- **App header:** sticky, Deep Night at 90% with blur and a gold hairline at 10%. Seal plus 21px wordmark, a hairline divider (from sm), then "Try it" and "Verify" in 13px medium (current page in cream, the other sage, gold on hover). On the right: "How it works" (from md), a Source code link (from sm, its label from lg), then a slot for the page's own control. On `/app` that slot holds the gold "Connect wallet" button; `/verify` leaves it empty.
- **Wallet pill:** once connected, the button becomes an Olive Night pill with a gold ring at 30% (60% on hover), 8px radius: the wallet's 24px icon, its name (from sm), a fuel dot (8px: solid gold when DUST is ready, a hollow gold ring when empty), "Testnet" in sage and a chevron.
- **Wallet dropdown:** non-modal, anchored under the pill at the right, at most 360px wide: Olive Night, 16px radius, gold ring at 20%, the night float shadow; it enters from 6px above at 0.98 scale (200ms) and closes on Escape or a click away. It opens by itself once per connection. Not connected, it lists the browser's wallets as Cream-at-6% rows with a gold "Connect", or a gold "Get Lace" when none is found. Connected, it is a checklist (Network, Fee fuel (DUST), Math proofs): each row a 32px icon square, gold at 12% when ready or a hollow gold-ringed square when not, and a value with a gold check or a dashed gold circle. With no fuel, three gold-numbered steps follow in a gold-at-7% well; then "Use a 6-person team" and "Back to practice mode".

### The Equals Seal Horizon (signature)
A solid gold pill over a hollow gold pill (border at 40–50%). Under the hero it draws in from the left once (1.1s); under the protocol stage the solid bar fills with scroll progress and turns to Olive Night when the ground turns to day; in the roadmap each wave is a hollow pill with a night fill of 100%, 60% or 0% for delivered, building and planned. In `/app` it is the chapter track: an 8px solid gold bar over an 8px hollow bar with a 2px gold border at 40%, running behind the six character discs. The solid bar fills (600ms) to the last finished disc over a faint gold-at-10% channel, so the cast rides on the Seal.

### The Proven Stamp (signature)
A rotated mono "proven" (or "all 7 proven") in a 2px bordered box, gold on night or night on gold. It lands once: from 1.5× scale and invisible to 1×, 350ms, strong ease-out, after the thing it certifies has appeared. Scrolling back never replays it. Its counterpart, the REJECTED stamp, lands the same way on a refused cheat card.

### Protocol Stage (signature)
A sticky full-height panel whose ground interpolates Deep Night → Olive Night → Royal Proof Yellow across scroll. Left: five steps as a list of icon dots (active gold on night, night on day) with the active step's one-line explanation expanding below it. Right: fourteen payroll rows whose salaries scramble into hashes, a gold sweep for the council, a refused cheat, the Seal with the proven stamp, and finally the report card in daylight, its figures counting up over 900ms.

## Do's and Don'ts

### Do:
- **Do** choose a ground by meaning: night for sealed inputs and the working app, gold or paper for proven, public results.
- **Do** draw progress, horizons and fill states as the Equals Seal pair: a solid pill over a hollow pill.
- **Do** use the single strong ease-out `cubic-bezier(0.23, 1, 0.32, 1)` for entrances and state changes, 200ms for state, 250–450ms for steps, 600ms for the app's chapter track, 700ms for entrances, 900–1100ms for drawing a seal bar.
- **Do** animate with full transform strings in framer-motion (`transform: "translateY(18px)"`, `"rotate(-8deg) scale(1.5)"`), and limit each section to one authored moment.
- **Do** honor `prefers-reduced-motion`: show the end state immediately, stop the star twinkle, skip the council sweep, show counts at their final value, swap chapters without sliding, skip the cheat knock.
- **Do** keep small text at Sage on night and Olive Night at 75% or stronger on gold and paper.
- **Do** set hashes, addresses and rule messages in Spline Sans Mono with tabular numerals, and let them scramble through noise when they change state.
- **Do** duotone every photograph into the olive and gold world inside a 16px frame.
- **Do** draw the app's people as seeded Notionists characters in round gold or cream discs, and keep the attribution (Zoish, CC0 1.0) with the code.
- **Do** give each app chapter one sentence, one line and one gold action, in plain words.
- **Do** show setup states (no wallet, no fee fuel) as numbered guides in gold and cream.

### Don't:
- **Don't** put eyebrow kickers or overline labels above headings; the headline states the fact on its own.
- **Don't** add grain, noise or film textures to any ground.
- **Don't** use Spline Sans Mono for headings, section titles, buttons or report labels.
- **Don't** use Instrument Serif for anything except the word "Equilux".
- **Don't** add another night band between the protocol stage and the footer beyond Cheats.
- **Don't** use red except for a refusal by the rules or the 5% threshold; a missing wallet or empty fee fuel is never red.
- **Don't** give resting cards or panels a drop shadow; use a hairline ring.
- **Don't** replay the proven stamp or stack several animated moments in one section.
- **Don't** show a salary on a day ground, or a figure the circuit did not verify.
- **Don't** put contract, circuit, enroll or commit on an app surface; they belong inside Behind the scenes.
