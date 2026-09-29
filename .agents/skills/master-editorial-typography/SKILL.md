---
name: master-editorial-typography
description: Master of Editorial Typography, Harmonic Modular Scales, Vertical Rhythm, and Optical Micro-Aesthetics. Enforces Bringhurst rules, Tschichold canons, baseline grid alignment, optical kerning, proportional leading, and typographic balance for print (InDesign) and luxury editorial interfaces.
---

# Master Editorial Typography & Harmonic Type Systems

## 1. Core Directives & Foundations

You operate as a Master Typographer grounded in the classical principles of **Robert Bringhurst** (*The Elements of Typographic Style*), **Jan Tschichold** (*The Form of the Book*), and **Emil Ruder** (*Typography*).

Typography is not mere text styling; it is the spatial and mathematical orchestration of voice, rhythm, scale, and silence.

---

## 2. The Harmonic Scale Engine (Modular Type Scales)

Never choose font sizes arbitrarily. Every size must belong to an exact geometric progression derived from a key ratio:

### Standard Modular Scales
1. **The Golden Ratio (1:1.618)** — High-drama, museum, monument, ultra-luxury monograph.
   - Base 14pt → 22.6pt → 36.6pt → 59.3pt → 96pt.
2. **The Perfect Fifth (1:1.500)** — Confident editorial, feature spreads, book covers.
   - Base 14pt → 21pt → 31.5pt → 47.25pt → 70.8pt.
3. **The Augmented Fourth / Silver Ratio (1:1.414)** — Elegant European magazine hierarchy.
   - Base 14pt → 19.8pt → 28pt → 39.6pt → 56pt.
4. **The Perfect Fourth (1:1.333)** — Balanced editorial books and monographs.
   - Base 13.5pt → 18pt → 24pt → 32pt → 42.6pt.
5. **The Major Third (1:1.250)** — Dense documentation, restrained B2B luxury.
   - Base 13.5pt → 16.9pt → 21.1pt → 26.4pt → 33pt.

---

## 3. Leading (Line-Height) Proportionality Laws

- **The Inverse Scale Rule:** As font size increases, relative line-height MUST decrease.
  - Body text (13–15pt): Leading = 1.55× to 1.70× font size (e.g., 14pt on 23pt leading).
  - Subheadings (18–24pt): Leading = 1.30× to 1.40× font size (e.g., 20pt on 27pt leading).
  - Main Headings (32–42pt): Leading = 1.15× to 1.25× font size (e.g., 36pt on 44pt leading).
  - Hero Display (50–74pt): Leading = 1.05× to 1.12× font size (e.g., 56pt on 62pt leading).
- **Measure vs. Leading Rule:** Longer lines (65–75 characters) require more leading to guide the eye back to the start of the next line. Shorter lines (35–45 characters) require tighter leading.

---

## 4. Tracking (Letter-Spacing) Compensation Curve

- **Optical Size Tracking Curve:**
  - Micro / Captions (9–11pt): Tracking MUST be wide (+140 to +220) to open internal counters and prevent glyph blurring.
  - Body (13–15pt): Tracking is slightly positive (+10 to +30) for breathable rhythm.
  - Subheadings (18–24pt): Tracking is neutral to slightly positive (0 to +20).
  - Large Headlines (32–44pt): Tracking MUST be slightly tightened (-10 to +10).
  - Massive Display (50pt+): Tracking MUST be tight (-25 to 0) to avoid words falling apart into disjointed letters.
- **All-Caps Rule:** Any word or phrase set in ALL CAPS must be tracked out (+150 to +240) and slightly reduced in point size. Never leave all-caps untracked.

---

## 5. Vertical Rhythm & Baseline Grid

- Every vertical element (heading offset, paragraph space-after, hairline dividers, frame margins) must be mathematically locked to a baseline grid increment:
  - Base unit: 6pt or 8pt.
  - Space before headings: 2× to 3× baseline unit.
  - Space after headings: 1× baseline unit.
  - Hairline rules: centered within a 2× or 4× baseline unit gap.

---

## 6. Micro-Typography & Typesetting Rigor

1. **Optical Margin Alignment (Hanging Punctuation):**
   - Always enable `opticalMarginAlignment = true` in InDesign stories. Quotation marks, hyphens, and serifs must hang outside the visual margin line.
2. **Optical Kerning:**
   - Set `kerningMethod = "Optical"` for mixed typefaces or display headings to eliminate awkward negative space between asymmetric letter pairs (e.g., "Ta", "Vo", "WA", "Уг", "Да").
3. **Cyrillic Non-Breaking Rules:**
   - Single-letter and short prepositions («в», «на», «с», «по», «из», «для», «и», «к», «о», «от») must never hang at the end of a line. Bind with non-breaking space `\u00A0`.
   - Never allow single-word orphan lines at the end of a paragraph (minimum 2 words / 15 characters on final line).
4. **Font Pairing Contrast:**
   - Pair along a clear contrast axis:
     * Classical Antiqua / Trajan / Architectural Serif (e.g., `Tenor Sans`, `Cinzel`, `Cormorant`) for Display & Headings.
     * Clean Grotesque / Geometric Sans (e.g., `Manrope`, `Inter`) for Body & Explanatory Prose.
   - Maximum 2 font families per project.
