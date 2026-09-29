---
name: Bali Sacred Heritage & Expeditions
description: Editorial Luxury Monograph & Booking System for UHNW Expeditions
colors:
  gallery-white: "#FCFCFA"
  obsidian-ink: "#0E100F"
  charcoal-soft: "#444A47"
  gold-accent: "#B4915F"
  hairline-rule: "#DCDAD4"
typography:
  display:
    fontFamily: "Tenor Sans, Inter, serif"
    fontSize: "clamp(2.5rem, 5vw, 3.5rem)"
    fontWeight: 400
    lineHeight: 1.15
    letterSpacing: "0.02em"
  headline:
    fontFamily: "Tenor Sans, Inter, sans-serif"
    fontSize: "clamp(1.75rem, 3vw, 2.25rem)"
    fontWeight: 400
    lineHeight: 1.25
    letterSpacing: "0.015em"
  title:
    fontFamily: "Tenor Sans, Inter, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 400
    lineHeight: 1.35
    letterSpacing: "0.01em"
  body:
    fontFamily: "Manrope, Inter, sans-serif"
    fontSize: "0.95rem"
    fontWeight: 400
    lineHeight: 1.7
    letterSpacing: "normal"
  label:
    fontFamily: "Manrope, Inter, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.18em"
rounded:
  none: "0px"
  sm: "2px"
spacing:
  xs: "8px"
  sm: "16px"
  md: "24px"
  lg: "48px"
  xl: "80px"
components:
  button-primary:
    backgroundColor: "{colors.obsidian-ink}"
    textColor: "{colors.gallery-white}"
    rounded: "{rounded.none}"
    padding: "16px 36px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.obsidian-ink}"
    rounded: "{rounded.none}"
    padding: "16px 36px"
---

# Design System: Bali Sacred Heritage

## 1. Overview

**Creative North Star: "The Architectural Sanctuary Monograph"**

The design language rejects digital SaaS conventions in favor of museum-grade editorial composure. Built for leaders seeking mental decompression, it avoids aggressive marketing prompts, bright gradients, and containerized "cards". The layout breathes with generous whitespace, deliberate typographic asymmetry, and authentic high-resolution imagery.

**Key Characteristics:**
- **Zero-Box Philosophy**: Content lives freely on the architectural plane, organized through typographic scale and subtle 0.35pt hairline rules rather than enclosed cards.
- **Museum Restraint**: Crisp monochrome foundations with delicate warm metallic punctuation (`#B4915F`).
- **High-Contrast Clarity**: Body text and headlines maintain ≥ 8:1 contrast ratios on gallery white surfaces.

## 2. Colors

The palette evokes natural stone, Japanese ink, and quiet architectural luxury without falling into generic "AI cream/beige" tropes.

### Primary
- **Obsidian Ink** (`#0E100F`): Used for primary headlines, authoritative signatures, and primary actions.
- **Gallery White** (`#FCFCFA`): Architectural canvas providing breathing room and high optical contrast.

### Neutral
- **Charcoal Soft** (`#444A47`): Body prose and secondary narrative text. Guarantees legible reading over extended paragraphs.
- **Hairline Rule** (`#DCDAD4`): 0.35pt structural divider lines replacing borders and card boxes.

### Accent
- **Muted Gold** (`#B4915F`): Reserved for subtle running headers, metadata badges, and refined editorial accents (under 5% visual surface).

## 3. Typography

A paired editorial system balancing classical architectural proportion with modern legibility.

### Display & Headlines
- **Tenor Sans Regular**: Used for H1 hero titles and chapter headers. Generous letter spacing (+0.02em) with disciplined leading (1.15–1.25x) to prevent descender collision in Cyrillic and Latin.

### Body & UI
- **Manrope (Regular, Medium, Bold)**: Clean geometric sans-serif delivering effortless readability across dense travel itineraries and personal messages.

## 4. Elevation

**Tonal and Rule-Based Layering (Zero Drop Shadows)**

The system is strictly planar. Drop shadows, glassmorphism, and blurred card surfaces are forbidden. Spatial depth is achieved exclusively through:
1. High-contrast photography anchoring the perimeter.
2. Fine hairline rules (0.35pt) providing subtle structural thresholds.
3. Asymmetric whitespace creating natural visual cadence.

## 5. Components

Components are stripped of decorative ornamentation, focusing on crisp tactile precision.

### Buttons & CTAs
- **Primary CTA**: Solid obsidian rectangle, uppercase tracked label (`#0E100F` background, `#FCFCFA` text), zero radius, no hover glow.
- **Ghost Action**: Transparent background with fine obsidian border and subtle underline transition.

### Editorial Columns
- Two-column asymmetric spreads: 55% photography / 45% typographic storytelling.
- Three-part pillar modules separated by fine hairline dividers.

## 6. Do's and Don'ts

### Do's
- **DO** let typography and photography dictate layout hierarchy.
- **DO** maintain strict line length (55–70 characters) on explanatory copy.
- **DO** preserve authentic photographic aspect ratios without artificial cropping or heavy filters.

### Don'ts
- **DON'T** put text into boxed cards or rounded containers (`border-radius: 16px+`).
- **DON'T** use gradient text or decorative multi-colored buttons.
- **DON'T** use repetitive numbered eyebrow kickers (`01 / 02 / 03`) above every section.
- **DON'T** introduce warm saturated beige/sand backgrounds that read as AI template slop.
