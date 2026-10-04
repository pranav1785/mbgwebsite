# Medha Girish — Portfolio

Static portfolio website for Medha Girish, built around her work in communication systems, signal processing, embedded software, and edge AI.

## Build

```sh
npm run build
```

The production-ready site is generated in `dist/`.

## Deploy on Vercel

Import this GitHub repository and leave the project Root Directory at the repository root. The checked-in `vercel.json` selects the **Other** framework preset, runs the build, and publishes `dist/` automatically.

If an older Vercel project has dashboard overrides, set:

- Framework Preset: **Other**
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: leave empty

Then redeploy the latest commit without using the previous build cache.
