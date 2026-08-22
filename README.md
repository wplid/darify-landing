# Darify — Coming Soon

A premium "coming soon" landing page for Darify: a cloud-based real estate
management and peer-to-peer booking platform.

**Stack:** Next.js 16 (App Router) · React 19 · Tailwind CSS v4 · GSAP +
ScrollTrigger · Lenis smooth scroll · react-three-fiber + drei + postprocessing

## What's here

- **Hero** — asymmetric layout with an interactive 3D crystal (built from
  primitives with `@react-three/fiber`, not an external model) that
  responds to cursor movement, plus the waitlist form.
- **Threshold seam** — a line-drawn doorway glyph, taken from the Darify
  mark, that draws itself in as you scroll from the hero into the features.
- **Features** — a pinned, scroll-scrubbed section that crossfades between
  the three core features one at a time.
- **Footer** — logo, social links, copyright.
- Respects `prefers-reduced-motion` throughout: the pin/scrub/parallax
  motion is skipped in favor of a static layout for anyone with that OS
  setting on.

## Run it locally

### 1. Install Node.js
You'll need **Node 18.18+** (Node 20 or later recommended). Check with:
```bash
node -v
```

### 2. Install dependencies
From the project folder:
```bash
npm install
```

### 3. Start the dev server
```bash
npm run dev
```
Open **http://localhost:3000**.

### 4. Build for production
```bash
npm run build
npm start
```

## Customizing

- **Colors** — all tokens live in `app/globals.css` under the `@theme`
  block (`--color-blue`, `--color-violet`, `--color-gold`, etc.). Tailwind
  v4 reads design tokens straight from CSS, so there's no separate
  `tailwind.config.js` to keep in sync.
- **Copy** — headline/subhead are in `components/Hero.js`; feature copy is
  the `FEATURES` array at the top of `components/FeaturesSection.js`.
- **3D scene** — `components/Scene3D.js`. The current shape is a faceted
  crystal (an abstract "digital asset" motif) wrapped in a wireframe shell,
  built entirely from primitives — no external `.glb` model required. If
  you'd rather use a scene you design in [Spline](https://spline.design),
  swap the `<Canvas>` in that file for an `<iframe src="YOUR_SPLINE_SCENE_URL" />`
  and drop the react-three-fiber dependencies.
- **Waitlist form** — `components/Hero.js`'s `handleSubmit` currently only
  toggles a local "submitted" UI state; no email is actually sent anywhere
  yet. Wire it up to whatever you're using to collect signups — a Next.js
  [Route Handler](https://nextjs.org/docs/app/building-your-application/routing/route-handlers-and-middleware)
  that calls Resend/Postmark, or a form service like Formspree or
  ConvertKit, are all a small change in that one function.

## Notes on the design

The brief asked for a dark theme with a blue/violet glow. Your logo's own
blue and gold carry over as the anchor and the one accent color reserved
for a single signature moment (the doorway glyph and its progress dots) —
so the palette reads as *Darify's*, not a generic dark-mode template.

## Deploying

This is a stock Next.js app, so [Vercel](https://vercel.com) is the path
of least resistance (`vercel deploy` from this folder, or connect the repo
in their dashboard). Any Node-capable host works too.
"# darify-landing" 
