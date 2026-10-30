# Medha — Sculpting for Design

A static, image-led art portfolio with a floating artwork homepage and five detailed assignment pages. No framework or dependency installation is required.

## Run

- Build: `npm run build`
- Preview: `npm run preview`
- Open: http://127.0.0.1:4173

The generated website is in `dist/`. Existing Vercel settings remain compatible.

## Edit the portfolio

- `src/projects.mjs`: assignment text, order, captions, and image sequences.
- `src/style.css`: layout, responsive styling, and typography.
- `src/gallery.js`: accessible image viewer, arrow-key navigation, and focus restoration.
- `src/art/`: optimized artwork images and transparent homepage cutouts.
- `src/submissions/`: original assignment PDFs.
- `build-art.mjs`: generates the homepage and assignment pages.

To add an assignment, add its content to `src/projects.mjs`, place its images and PDF in the corresponding source folders, and add its reference to the homepage order in `build-art.mjs`.

## Content and imagery

Project descriptions are grounded in Medha's five supplied submissions and the course brief. Image names preserve the source PDF page and embedded-image number. The detail galleries use original photographs and sketches, converted to WebP for the web. The homepage uses AI-assisted background extractions; the original photographs remain available in the galleries and PDFs.

Design reference: Marion Deuchars' portfolio, especially its white canvas, handmade lettering, image-led presentation, and simple navigation. No artwork, branding, or source code was taken from that website. Caveat is loaded through Google Fonts, with handwriting-style system fallbacks.

The earlier engineering site builder and source assets are retained as legacy source. The art build replaces the generated `dist/` directory. Work is on local branch `codex/sculpting-portfolio`; nothing has been pushed or published.

## Verification

The build and JavaScript syntax checks pass. All local page, image, PDF, and stylesheet links resolve. All six pages were checked in the browser; phone-width layouts have no horizontal overflow. Image opening, next/previous navigation, Escape closing, and focus restoration were verified. Review screenshots are in `review/` locally.
