---
name: Academic Clarity
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#434655'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#737686'
  outline-variant: '#c3c6d7'
  surface-tint: '#0053db'
  primary: '#004ac6'
  on-primary: '#ffffff'
  primary-container: '#2563eb'
  on-primary-container: '#eeefff'
  inverse-primary: '#b4c5ff'
  secondary: '#4b41e1'
  on-secondary: '#ffffff'
  secondary-container: '#645efb'
  on-secondary-container: '#fffbff'
  tertiary: '#006058'
  on-tertiary: '#ffffff'
  tertiary-container: '#007b71'
  on-tertiary-container: '#b3fff3'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b4c5ff'
  on-primary-fixed: '#00174b'
  on-primary-fixed-variant: '#003ea8'
  secondary-fixed: '#e2dfff'
  secondary-fixed-dim: '#c3c0ff'
  on-secondary-fixed: '#0f0069'
  on-secondary-fixed-variant: '#3323cc'
  tertiary-fixed: '#89f5e7'
  tertiary-fixed-dim: '#6bd8cb'
  on-tertiary-fixed: '#00201d'
  on-tertiary-fixed-variant: '#005049'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.015em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 30px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  title-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.005em
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-md:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '600'
    lineHeight: 18px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.03em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  margin: 2rem
  gutter-mobile: 1rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

The design system embodies a modern, focused, and trustworthy atmosphere tailored for primary, secondary, and higher education administrative environments. It serves school administrators, educators, students, and parents who require immediate access to dense academic data—such as attendance records, gradebooks, curriculum schedules, and billing—without visual noise or cognitive strain.

The visual direction follows **Corporate Minimalism** infused with contemporary SaaS precision:
- **Tone:** Methodical, calm, credible, and encouraging.
- **Structure:** Ample breathing room with crisp layout boundaries to make data processing feel organized and effortless.
- **Visual Weight:** Surfaces are lightweight and quiet, allowing student metrics, alerts, and primary actions to command visual priority.

## Colors

The palette establishes an authoritative academic atmosphere through high-clarity blues and indigos balanced by soft neutrals and focused functional signals.

- **Primary (`#2563EB` - Royal Blue):** Used strictly for core interactive calls to action, active navigation states, and primary selection indicators.
- **Secondary (`#4F46E5` - Deep Indigo):** Provides depth in multi-step workflows, bulk actions, and administrative badge accents.
- **Tertiary (`#0D9488` - Academic Teal):** Reserved for positive growth metrics, finalized grades, and verified enrollment indicators.
- **Neutral (`#64748B` - Slate):** Anchors descriptive text, borders, and contextual labels.

### Surface and Canvas Foundation
- **Canvas / Background:** `#F8FAFC` (Off-white / Slate-50) for reduced eye strain across prolonged administrative use.
- **Base Surface:** `#FFFFFF` (Pure White) for elevated containers, data tables, and modal dialogues.
- **Border Tone:** `#E2E8F0` (Slate-200) for structural division without harsh contrast.

### Functional Alerts
- **Success:** `#16A34A` (Attendance confirmed, grade submitted).
- **Warning:** `#D97706` (Late submissions, pending approvals).
- **Destructive:** `#DC2626` (Absence alerts, grade drops, disciplinary reports).

## Typography

The type system blends the architectural warmth and approachability of **Plus Jakarta Sans** for headlines with the neutral, hyper-legible mechanics of **Inter** for dense data displays, schedules, forms, and tables.

- **Headings (Plus Jakarta Sans):** Provide a contemporary, polished feel for section titles, student profiles, and administrative dashboards.
- **Body and Data (Inter):** Ensures optimal numerical clarity and vertical alignment across multi-column data sheets, grade summaries, and notification feeds.
- **Labels and Form Headers:** Emphasize medium-to-semibold weights (`600`) to provide instant form scannability and contrast against active inputs.

## Layout & Spacing

The layout is built on a structured **12-column fluid grid** for desktop and tablet, collapsing to a single or dual-column layout on mobile devices:
- **Desktop (1024px+):** 12 columns, 24px (`1.5rem`) gutters, and 32px (`2rem`) outer margins. Persistent left navigation drawer (260px fixed width).
- **Tablet (768px - 1023px):** 8 columns, 16px (`1rem`) gutters, collapsible navigation rail (72px fixed width).
- **Mobile (< 768px):** 4 columns, 16px gutters, and 16px margins with a bottom navigation bar or top application header.

### Spacing Rhythms
- `space-xs` (4px): Icon-to-text gaps within chips and micro-labels.
- `space-sm` (8px): Form input inner paddings (vertical), adjacent badge spacing.
- `space-md` (16px): Standard gap between form fields, list item paddings.
- `space-lg` (24px): Card interior paddings, metric widget gaps.
- `space-xl` (40px): Section divisions and major dashboard panel separations.

## Elevation & Depth

To maintain a clean and distraction-free academic dashboard, depth relies primarily on **low-contrast outlines** paired with **subtle ambient shadows**:

- **Layer 0 (Canvas):** Pure `#F8FAFC`. Completely flat.
- **Layer 1 (Cards, Data Panels, Form Modules):** `#FFFFFF` fill with a `1px solid #E2E8F0` border and a delicate tint shadow: `0 1px 3px 0 rgba(15, 23, 42, 0.04), 0 1px 2px -1px rgba(15, 23, 42, 0.02)`.
- **Layer 2 (Dropdowns, Popovers, Filter Overlays):** `#FFFFFF` surface with a `1px solid #CBD5E1` border and elevated shadow: `0 4px 6px -1px rgba(15, 23, 42, 0.08), 0 2px 4px -2px rgba(15, 23, 42, 0.04)`.
- **Layer 3 (Modals, Slide-over Panels):** `#FFFFFF` surface with deep projection: `0 20px 25px -5px rgba(15, 23, 42, 0.1), 0 8px 10px -6px rgba(15, 23, 42, 0.05)`, backed by a `rgba(15, 23, 42, 0.4)` backdrop blur overlay (`backdrop-blur-sm`).

## Shapes

The interface balances modern approachability with organizational rigor by utilizing controlled, medium roundedness (`0.5rem` / `8px` baseline):
- **Inputs, Buttons, Badges, and Table Cell Accents:** `0.5rem` (8px).
- **Cards, Filter Bars, and Containers:** `rounded-lg` (`1rem` / 16px).
- **Dialogues and Large Modals:** `rounded-xl` (`1.5rem` / 24px).
- **Status Pills and Counter Tags:** Full pill radius (`9999px`) to distinguish categorical indicators from actionable buttons.

## Components

### Buttons
- **Primary:** High-contrast `#2563EB` background, `#FFFFFF` label, `8px` corner radius. Hover: `#1D4ED8`. Active: `#1E40AF`.
- **Secondary:** Surface `#FFFFFF`, `1px solid #CBD5E1` border, `#0F172A` label. Hover: `#F1F5F9`.
- **Ghost:** Transparent background with `#2563EB` or `#64748B` text; hover state triggers `#F8FAFC`.
- **Focus Ring:** Dual-layer ring with `2px` offset and `#2563EB` highlight (`box-shadow: 0 0 0 2px #FFFFFF, 0 0 0 4px #2563EB`).

### Inputs & Form Fields
- **Container:** `40px` height for desktop, `44px` on mobile for touch accessibility. Background `#FFFFFF`, border `1px solid #CBD5E1`.
- **Labels:** Persistent above-input layout (`label-md`), color `#1E293B`, with an optional `*` in `#DC2626` for required fields.
- **Active / Focus:** Border shifts immediately to `#2563EB` with a continuous `3px` glow (`rgba(37, 99, 235, 0.15)`).
- **Helper & Validation Text:** Displayed `4px` beneath input in `body-sm`. Error states turn border and message to `#DC2626`.

### Chips & Badges
- **Academic Tags (Status, Grade Levels):** Pill-shaped (`9999px`), `font-size: 11px`, `font-weight: 600`, padding `2px 8px`.
- **Active Filter Chips:** `#EFF6FF` background with `#1D4ED8` text and `1px solid #BFDBFE`.
- **Status Variant Examples:**
  - *Present / Passed:* `#F0FDF4` fill, `#15803D` text.
  - *Late / Pending:* `#FFFBEB` fill, `#B45309` text.
  - *Absent / Failed:* `#FEF2F2` fill, `#B91C1C` text.

### Cards & Data Panels
- Background `#FFFFFF`, radius `16px`, `1px solid #E2E8F0`.
- Card headers feature clean vertical alignment: title on the left (`title-md`), contextual actions (date range selector, quick exports) on the right.

### Tables & Data Grids
- **Header:** Background `#F8FAFC`, uppercase `11px` typography, `12px 16px` padding, bottom border `1px solid #E2E8F0`.
- **Rows:** Alternate hover state `#F8FAFC`, transition duration `150ms`, bottom divider `1px solid #F1F5F9`.
- **Cell Content:** Standard `14px` regular text with numeric figures tabularly aligned.

### Checkboxes & Radios
- Size `18px x 18px`. Border `1.5px solid #94A3B8`.
- Checked state transitions to `#2563EB` with pure white indicator icon.