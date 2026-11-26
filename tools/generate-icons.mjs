/**
 * Regenerates ../icons.svg from Lucide and Simple Icons.
 *
 * UI glyphs:  Lucide v1.81.0 (ISC), outline, 1.6px stroke.
 * Brand marks: Simple Icons v15 (CC0 artwork; trademarks remain with owners),
 *              except LinkedIn, which uses the canonical v13 path.
 * Chess:       custom geometric mark (Lucide has no chess glyph).
 *
 * No dependencies, no cached font files, and no runtime requests: everything
 * is baked into a single local sprite. Run with: node tools/generate-icons.mjs
 */
import { writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const out = join(dirname(fileURLToPath(import.meta.url)), '..', 'icons.svg');
const LUCIDE = 'https://unpkg.com/lucide-static@1.81.0/icons/';
const SIMPLE = 'https://cdn.jsdelivr.net/npm/simple-icons@v15/icons/';
const SIMPLE_LEGACY = 'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/';
const STROKE = '1.6';

// id -> [kind, source name, label]
const icons = [
  ['icon-house', 'lucide', 'house', 'Home'],
  ['icon-home', 'lucide', 'house', 'Home alias'],
  ['icon-user', 'lucide', 'user', 'About'],
  ['icon-users', 'lucide', 'users', 'Community'],
  ['icon-layers', 'lucide', 'layers', 'Sections / projects'],
  ['icon-code', 'lucide', 'code', 'Code'],
  ['icon-camera', 'lucide', 'camera', 'Photography'],
  ['icon-clapperboard', 'lucide', 'clapperboard', 'Video'],
  ['icon-book', 'lucide', 'book', 'Writing'],
  ['icon-book-open', 'lucide', 'book-open', 'Reading'],
  ['icon-pen', 'lucide', 'pen', 'Articles'],
  ['icon-rocket', 'lucide', 'rocket', 'Startups'],
  ['icon-briefcase', 'lucide', 'briefcase', 'Experience'],
  ['icon-sparkles', 'lucide', 'sparkles', 'Interests'],
  ['icon-mail', 'lucide', 'mail', 'Contact'],
  ['icon-help', 'lucide', 'circle-help', 'FAQ'],
  ['icon-chevron-down', 'lucide', 'chevron-down', 'FAQ toggle'],
  ['icon-chevron-left', 'lucide', 'chevron-left', 'Previous'],
  ['icon-chevron-right', 'lucide', 'chevron-right', 'Next'],
  ['icon-arrow-left', 'lucide', 'arrow-left', 'Back'],
  ['icon-arrow-right', 'lucide', 'arrow-right', 'Link'],
  ['icon-arrow-up-right', 'lucide', 'arrow-up-right', 'External link'],
  ['icon-external-link', 'lucide', 'external-link', 'Live link'],
  ['icon-menu', 'lucide', 'menu', 'Menu'],
  ['icon-x', 'lucide', 'x', 'Close'],
  ['icon-image', 'lucide', 'image', 'Image'],
  ['icon-leaf', 'lucide', 'leaf', 'Nature'],
  ['icon-building', 'lucide', 'building', 'Property'],
  ['icon-trending-up', 'lucide', 'trending-up', 'Business'],
  ['icon-alert', 'lucide', 'triangle-alert', 'Problem'],
  ['icon-lightbulb', 'lucide', 'lightbulb', 'Solution / ideas'],
  ['icon-chart', 'lucide', 'chart-column', 'Results'],
  ['icon-scale', 'lucide', 'scale', 'Business model'],
  ['icon-mountain', 'lucide', 'mountain', 'Challenges'],
  ['icon-trophy', 'lucide', 'trophy', 'Achievements'],
  ['icon-target', 'lucide', 'target', 'Future plans'],
  ['icon-globe', 'lucide', 'globe', 'Publications'],
  ['icon-graduation-cap', 'lucide', 'graduation-cap', 'Education'],
  ['icon-coins', 'lucide', 'coins', 'Sales'],
  ['icon-database', 'lucide', 'database', 'Databases'],
  ['icon-terminal', 'lucide', 'terminal', 'APIs'],
  ['icon-shield', 'lucide', 'shield', 'Security'],
  ['icon-moon', 'lucide', 'moon', 'Faith'],
  ['icon-send', 'lucide', 'send', 'Submit'],
  ['icon-instagram', 'brand', 'instagram', 'Instagram'],
  ['icon-youtube', 'brand', 'youtube', 'YouTube'],
  ['icon-linkedin', 'brand-legacy', 'linkedin', 'LinkedIn'],
  ['icon-facebook', 'brand', 'facebook', 'Facebook'],
  ['icon-tiktok', 'brand', 'tiktok', 'TikTok'],
  ['icon-github', 'brand', 'github', 'GitHub'],
];

const chess = `  <!-- Chess — custom geometric mark -->
  <symbol id="icon-chess" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${STROKE}" stroke-linecap="round" stroke-linejoin="round"><path d="M7 10h10l-1.5 7h-7L7 10Z"/><path d="M9 10V7l3-3 3 3v3"/><path d="M6 20h12"/></symbol>`;

async function fetchSvg(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Could not download ${url} (${response.status})`);
  return response.text();
}

function extractPaths(markup, url) {
  const body = markup.match(/<svg[^>]*>([\s\S]*?)<\/svg>/)?.[1];
  if (!body) throw new Error(`Unexpected SVG response from ${url}`);
  return body
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<title[^>]*>[\s\S]*?<\/title>/gi, '')
    .replace(/^\s+|\s+$/g, '');
}

const symbols = await Promise.all(icons.map(async ([id, kind, name, label]) => {
  const base = kind === 'lucide' ? LUCIDE : kind === 'brand-legacy' ? SIMPLE_LEGACY : SIMPLE;
  const url = base + name + '.svg';
  const paths = extractPaths(await fetchSvg(url), url);
  const attrs = kind === 'lucide'
    ? `fill="none" stroke="currentColor" stroke-width="${STROKE}" stroke-linecap="round" stroke-linejoin="round"`
    : 'fill="currentColor"';
  const source = kind === 'lucide'
    ? `Lucide ${name}`
    : kind === 'brand-legacy'
      ? 'Simple Icons v13 linkedin (canonical mark)'
      : `Simple Icons ${name}`;
  return `  <!-- ${label} — ${source} -->\n  <symbol id="${id}" viewBox="0 0 24 24" ${attrs}>${paths}</symbol>`;
}));

symbols.push(chess);

const sprite = `<svg xmlns="http://www.w3.org/2000/svg" style="display:none">
<!--
  ICON SPRITE — Lucide UI glyphs + Simple Icons brand marks
  UI:    Lucide v1.81.0 (ISC), outline, ${STROKE}px stroke, round caps/joins.
  Brand: Simple Icons v15 (CC0 artwork; trademarks remain with their owners);
         LinkedIn uses the canonical v13 mark, removed from later releases.
  Chess: Custom geometric mark because Lucide has no chess glyph.
  All artwork is local SVG. No runtime requests, icon fonts, or logo containers.
-->
${symbols.join('\n')}
</svg>
`;

await writeFile(out, sprite, 'utf8');
console.log(`Wrote ${out} with ${symbols.length} symbols (${Buffer.byteLength(sprite)} bytes)`);
