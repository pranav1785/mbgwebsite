import { mkdirSync, writeFileSync, cpSync, rmSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { projects } from './src/projects.mjs';
const root = path.dirname(fileURLToPath(import.meta.url));
const dist = path.join(root, 'dist');
if (path.dirname(dist) !== root || path.basename(dist) !== 'dist') throw new Error('Invalid build directory');
rmSync(dist, { recursive: true, force: true });
mkdirSync(dist, { recursive: true });
cpSync(path.join(root, 'src/art'), path.join(dist, 'assets/art'), { recursive: true });
cpSync(path.join(root, 'src/submissions'), path.join(dist, 'submissions'), { recursive: true });
for (const name of ['style.css', 'gallery.js']) cpSync(path.join(root, 'src', name), path.join(dist, name));
const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const art = (p, file) => `assets/art/${p.source || p.slug}/${file}.webp`;
const head = (title, description, base = './') => `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)}</title><meta name="description" content="${esc(description)}"><meta name="theme-color" content="#ffffff">
<link rel="icon" href="${base}favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="${base}style.css">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600&display=swap" rel="stylesheet">
<script src="${base}gallery.js" defer></script></head>`;
const footer = (base = './') => `<footer class="footer"><a href="${base}" aria-label="Medha — all assignments">Medha Bhavani Girish</a><span>Sculpting for Design · 2026</span><a href="#top">Back to top ↑</a></footer>`;
const order = [projects[1], projects[2], projects[3], projects[0], projects[4]];
writeFileSync(path.join(dist, 'index.html'), `${head('Medha — Sculpting for Design', 'A collection of sculpture, material experiments, and memories by Medha Bhavani Girish.')}<body id="top" class="home"><a class="skip" href="#work">Skip to artwork</a>
<header class="home-header"><h1 class="signature">Medha<span>Bhavani Girish</span></h1><p class="handwritten subtitle">a few things I made.</p></header>
<main id="work" aria-label="Sculpting assignments"><div class="artwork-field">${order.map((p,i) => `<a class="floating-work work-${i+1}" href="${p.slug}/" aria-label="Explore ${esc(p.title)}"><div class="object-space"><img src="assets/art/cutouts/${p.cutout}.webp" alt="${esc(p.title)} — ${p.cutout === 'bird' ? 'a handmade clay barbet' : p.cutout === 'sea' ? 'a blue painted marine relief' : p.cutout === 'wire' ? 'a wire brachiosaurus' : p.cutout === 'vessel' ? 'a textured clay vessel' : 'an abstract carved foam rose'}" ${i>2 ? 'loading="lazy"' : 'fetchpriority="high"'} width="600" height="650"></div><span class="work-name">${esc(p.title)}<span class="work-arrow" aria-hidden="true">↗</span></span><span class="work-medium">${esc(p.medium)}</span></a>`).join('')}</div>
<p class="home-note handwritten">Looking, making, remembering.<br><span>Studies from Sculpting for Design, 2026.</span></p></main>${footer()}</body></html>`);
for (let i=0;i<projects.length;i++) {
  const p=projects[i], base='../', directory=path.join(dist,p.slug);mkdirSync(directory);
  const sections=p.sections.map((s,n)=>`<section class="story-section ${s.layout || ''}"><div class="section-copy"><span class="section-number">${String(n+1).padStart(2,'0')}</span><div><h2>${esc(s.title)}</h2>${s.text.map(t=>`<p>${esc(t)}</p>`).join('')}</div></div>${s.images ? `<div class="image-sequence ${s.layout || (s.images.length===1 ? 'single':'pair')}">${s.images.map(([file,caption])=>{
    const url=base+art(p,file);if(!existsSync(path.join(dist,art(p,file))))throw new Error('Missing artwork: '+url);
    return `<figure><button class="image-open" aria-label="Enlarge: ${esc(caption)}" data-full="${url}" data-caption="${esc(caption)}"><img src="${url}" alt="${esc(caption)}" loading="lazy" decoding="async"><span class="enlarge-hint" aria-hidden="true">↗</span></button><figcaption>${esc(caption)}</figcaption></figure>`;
  }).join('')}</div>` : ''}</section>`).join('');
  const next=projects[(i+1)%projects.length];
  writeFileSync(path.join(directory,'index.html'),`${head(p.title+' — Medha',p.intro,base)}<body id="top" class="project-page"><a class="skip" href="#project">Skip to project</a>
  <header class="project-header"><a class="small-signature" href="../" aria-label="Medha — back to all assignments">Medha</a><a class="back-link" href="../">← All assignments</a></header>
  <main id="project"><div class="project-intro"><div class="intro-copy"><p class="eyebrow">Assignment ${p.number} / Sculpting for Design</p><h1>${esc(p.title)}</h1><p class="project-deck">${esc(p.intro)}</p><p class="medium">${esc(p.medium)}</p></div><img class="project-object" src="../assets/art/cutouts/${p.cutout}.webp" alt="A preview of ${esc(p.title)}" width="700" height="750" fetchpriority="high"></div>
  <div class="story"><p class="lead">${esc(p.lead)}</p>${sections}<section class="source-note"><span class="handwritten">The original pages.</span><p>See the sketches, photographs, and reflections together in the submitted portfolio.</p><a class="pdf-link" href="../submissions/${encodeURIComponent(p.pdf)}" target="_blank" rel="noopener">Open assignment PDF ↗ <span>(opens in a new tab)</span></a></section></div>
  <nav class="project-end" aria-label="Continue exploring"><a href="../">← All assignments</a><a class="next-project" href="../${next.slug}/"><span>Next assignment →</span><strong>${esc(next.title)}</strong></a></nav></main>${footer('../')}
  <dialog class="lightbox" aria-label="Artwork viewer"><form method="dialog"><button class="close-lightbox" aria-label="Close image">Close ×</button></form><button class="viewer-arrow previous-image" aria-label="Previous image">←</button><figure><img alt=""><figcaption aria-live="polite"></figcaption></figure><button class="viewer-arrow next-image" aria-label="Next image">→</button><p class="viewer-count" aria-live="polite"></p></dialog></body></html>`);
}
writeFileSync(path.join(dist,'favicon.svg'),'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" fill="white"/><text x="10" y="48" font-family="cursive" font-size="52" fill="#222">m</text></svg>');
writeFileSync(path.join(dist,'404.html'),`${head('Page not found — Medha','Return to Medha’s artwork.')}<body class="not-found"><h1 class="handwritten">Nothing here, yet.</h1><a href="/">← Back to the artwork</a></body></html>`);
console.log(`Built homepage and ${projects.length} assignment pages in dist/.`);
