// Applies the unified icon system to every portfolio page.
// Idempotent: safe to re-run.
import { readdir, readFile, writeFile } from 'node:fs/promises';

const root = new URL('../', import.meta.url);
const files = (await readdir(root)).filter(f => f.endsWith('.html'));

const UI = id => `<svg class="icon" aria-hidden="true" focusable="false"><use href="icons.svg#icon-${id}"/></svg>`;
const named = (id, cls = '') => `<svg class="${['icon', cls].filter(Boolean).join(' ')}" aria-hidden="true" focusable="false"><use href="icons.svg#icon-${id}"/></svg>`;

const sectionIcons = {
  home: 'house', about: 'user', work: 'layers', 'web-dev-projects': 'code',
  photo: 'camera', photography: 'camera', video: 'clapperboard', videos: 'clapperboard',
  author: 'book', writing: 'book', startups: 'rocket', experience: 'briefcase',
  skills: 'layers', interests: 'sparkles', contact: 'mail',
  biography: 'user', timeline: 'briefcase', faq: 'help',
  chess: 'chess', philosophy: 'book', reading: 'book-open', technology: 'code', business: 'trending-up',
  overview: 'layers', 'project-overview': 'layers', problem: 'alert', solution: 'lightbulb',
  'my-contribution': 'user', technologies: 'code', screenshots: 'image', results: 'chart',
  'live-links': 'external-link', ventures: 'rocket', 'my-role': 'user',
  'business-models': 'scale', 'business-model': 'scale', challenges: 'mountain',
  achievements: 'trophy', 'future-plans': 'target', books: 'book', articles: 'pen',
  publications: 'globe', ideas: 'lightbulb', 'creative-work': 'sparkles'
};

const navIcons = {
  Home: 'house', About: 'user', Startups: 'rocket', Projects: 'layers',
  Experience: 'briefcase', Creative: 'clapperboard', Writing: 'pen',
  Interests: 'sparkles', Contact: 'mail', FAQ: 'help'
};

const skillIcons = [
  [/web development/i, 'code'], [/apis/i, 'terminal'], [/databases/i, 'database'],
  [/html|css/i, 'code'], [/photography/i, 'camera'], [/blogging|writing/i, 'pen'],
  [/video editing/i, 'clapperboard'], [/chess/i, 'chess'], [/entrepreneurship/i, 'rocket'],
  [/property management/i, 'building'], [/security management/i, 'shield'],
  [/leadership/i, 'users']
];

const cardIcons = [
  [/email/i, 'mail'], [/linkedin/i, 'linkedin', true], [/github/i, 'github', true],
  [/kor da/i, 'rocket'], [/pactum/i, 'scale'], [/sa real estate/i, 'building'],
  [/let'?s do it/i, 'sparkles'], [/chess/i, 'chess'], [/hope that never ends/i, 'book'],
  [/web development/i, 'code'], [/creative/i, 'sparkles'], [/community/i, 'users']
];

const entryIcons = [
  [/BBIT/i, 'graduation-cap'], [/Sales/i, 'coins'], [/Real Estate/i, 'building'],
  [/MK Real Estate/i, 'building'], [/Kor Da/i, 'rocket'], [/Pactum/i, 'scale'],
  [/Havelian Kings/i, 'trophy'], [/Security Officer/i, 'shield'], [/Author/i, 'book'],
  [/Founder/i, 'rocket'], [/default/i, 'briefcase']
];

const expIcons = [
  [/BBIT/i, 'graduation-cap'], [/Security Officer/i, 'shield'], [/Cricket/i, 'trophy'],
  [/Airbnb/i, 'house'], [/Pactum/i, 'scale'], [/Kor Da/i, 'rocket'], [/Author/i, 'book'],
  [/Founder/i, 'rocket']
];

const footerBrandIcons = [
  [/instagram/i, 'instagram', true], [/youtube/i, 'youtube', true],
  [/linkedin/i, 'linkedin', true], [/facebook/i, 'facebook', true],
  [/tiktok/i, 'tiktok', true], [/github/i, 'github', true]
];

function resolve(map, text) {
  for (const [re, id, brand] of map) {
    if (re.test(text)) return { id, brand: !!brand };
  }
  return null;
}

function icon(id, cls = '', brand = false) {
  const classes = ['icon', cls, brand ? 'brand-icon' : ''].filter(Boolean).join(' ');
  return `<svg class="${classes}" aria-hidden="true" focusable="false"><use href="icons.svg#icon-${id}"/></svg>`;
}

function patchStylesheet(html, name) {
  if (html.includes('href="icons.css"')) return html;
  if (html.includes('href="page-styles.css"')) {
    return html.replace('href="page-styles.css"', 'href="page-styles.css"\n  <link rel="stylesheet" href="icons.css"');
  }
  return html.replace(/\n(\s*)<style>/, `\n  <link rel="stylesheet" href="icons.css">\n$1<style>`);
}

function patchArrows(html) {
  const parts = html.split(/(<script\b[^>]*>[\s\S]*?<\/script>)/g);
  return parts.map(part => {
    if (part.startsWith('<script')) return part;
    return part.replace(/(<a\b[^>]*>)([\s\S]*?)(<\/a>)/g, (m, open, inner, close) => {
      if (/<svg/.test(inner)) return m;
      const cleaned = inner.replace(/\s*(&rarr;|→|↗)\s*$/, '');
      if (cleaned === inner) return m;
      const arrow = /↗/.test(inner) ? 'arrow-up-right' : 'arrow-right';
      return `${open}${cleaned}${named(arrow, 'link-arrow')}${close}`;
    });
  }).join('');
}

function patchNavIcons(html, name) {
  const add = block => block.replace(/(<a\b[^>]*)>([^<]+)<\/a>/g, (m, open, label) => {
    const key = label.trim();
    const id = navIcons[key];
    if (!id || m.includes('nav-icon')) return m;
    return `${open}>${named(id, 'nav-icon')}${label}</a>`;
  });

  if (name === 'index.html') {
    html = html.replace(/(<ul class="nav-links">)([\s\S]*?)(<\/ul>)/, (m, o, c, x) => o + add(c) + x);
    html = html.replace(/(<div class="mobile-menu" id="mobileMenu">)([\s\S]*?)(<\/div>)/, (m, o, c, x) => o + add(c) + x);
  } else if (name !== 'photography.html') {
    html = html.replace(/(<ul class="site-nav"[^>]*>)([\s\S]*?)(<\/ul>)/, (m, o, c, x) => o + add(c) + x);
  }
  return html;
}

function patchSectionIcons(html) {
  return html.replace(/(<section\b[^>]*\bid="([^"]+)"[^>]*>)([\s\S]*?)(<\/section>)/g, (m, open, id, body, close) => {
    const glyph = sectionIcons[id];
    if (!glyph || /class="section-label">\s*<svg|class="section-number">\s*<svg/.test(body)) return m;
    const patched = body.replace(/(<div class="section-label">|<span class="section-number">)/, `$1${named(glyph)}`);
    return open + patched + close;
  });
}

function patchCards(html) {
  // Cards whose first child is an h3 (contact/project cards).
  return html.replace(/(<div class="card">\s*)(<h3[^>]*>)([^<]+)/g, (m, open, h3start, label) => {
    if (m.includes('<svg')) return m;
    const hit = resolve(cardIcons, label);
    if (!hit) return m;
    const indent = /(\n\s*)</.exec(open)?.[1]?.slice(0, -1) || '\n          ';
    return `${open}${icon(hit.id, '', hit.brand)}${indent}${h3start}${label}`;
  });
}

function patchProjectCards(html) {
  return html.replace(/(<div class="project-name">)([^<]+)(<\/div>)/g, (m, open, label, close) => {
    if (m.includes('<svg')) return m;
    const hit = resolve(cardIcons, label);
    if (!hit) return m;
    return `${open}${icon(hit.id)}${label}${close}`;
  });
}

function patchSkillChips(html) {
  return html.replace(/<span class="skill-chip">([^<]+)<\/span>/g, (m, label) => {
    if (m.includes('<svg')) return m;
    const hit = resolve(skillIcons, label);
    if (!hit) return m;
    return `<span class="skill-chip">${icon(hit.id)}${label}</span>`;
  });
}

function patchExp(html) {
  html = html.replace(/(<div class="exp-card__role">)([^<]+)(<\/div>)/g, (m, open, label, close) => {
    if (m.includes('<svg')) return m;
    const hit = resolve(expIcons, label);
    if (!hit) return m;
    return `${open}${icon(hit.id)}${label}${close}`;
  });
  html = html.replace(/(<tr><td>)([^<]+)(<\/td>)/g, (m, open, label, close) => {
    if (m.includes('<svg') || /^(Role|BBIT|Former|Club|Airbnb|Founder|Published)/.test(label) === false) return m;
    const hit = resolve(expIcons, label);
    if (!hit) return m;
    return `${open}${icon(hit.id)}${label}${close}`;
  });
  return html;
}

function patchEntries(html) {
  return html.replace(/(<div class="entry">[\s\S]*?)(<h3>)([^<]+)/g, (m, before, h3, label) => {
    if (before.includes('entry-icon')) return m;
    const hit = resolve(entryIcons, label) || { id: 'briefcase' };
    return `${before}${icon(hit.id, 'entry-icon')}\n          ${h3}${label}`;
  });
}

function patchFaq(html) {
  return html.replace(/(<summary\b[^>]*>)([\s\S]*?)(<\/summary>)/g, (m, open, inner, close) => {
    if (m.includes('faq-chevron')) return m;
    return `${open}${inner}${named('chevron-down', 'faq-chevron')}${close}`;
  });
}

function patchPhotography(html) {
  const filterIcons = { all: 'layers', portrait: 'user', landscape: 'image', street: 'building', nature: 'leaf' };
  html = html.replace(/(<button class="filter-btn[^"]*" data-cat="([^"]+)">)([^<]+)(<\/button>)/g, (m, open, cat, label, close) => {
    if (m.includes('<svg')) return m;
    const id = filterIcons[cat] || 'layers';
    return `${open}${icon(id)}${label}${close}`;
  });
  html = html.replace(/(<div class="hero-tag">)([\s\S]*?)(<\/div>)/, (m, open, inner, close) => {
    if (inner.includes('<svg')) return m;
    return `${open}${named('camera')}${inner}${close}`;
  });
  html = html.replace(/(<a href="https:\/\/www\.instagram\.com\/[^"]+" target="_blank" class="insta-link"[^>]*>)([^<]+)(<\/a>)/g, (m, open, label, close) => {
    if (m.includes('<svg')) return m;
    return `${open}${icon('instagram', '', true)}${label}${close}`;
  });
  html = html.replace(/(<a href="\/" class="nav-back">)\s*←\s*([^<]+)(<\/a>)/, `$1${named('arrow-left')}$2$3`);
  return html;
}

function patchBurger(html) {
  const replacement = `<button class="nav-burger" id="navBurger" aria-label="Open menu" aria-expanded="false">\n    ${named('menu', 'burger-open')}\n    ${named('x', 'burger-close')}\n  </button>`;
  html = html.replace(/<button class="nav-burger" id="navBurger" aria-label="Open menu">[\s\S]*?<\/button>/, replacement);
  html = html.replace(/\.nav-burger span \{[\s\S]*?\.nav-burger\.open span:nth-child\(3\) \{[^}]*\}/, `.nav-burger .icon { width: 24px; height: 24px; color: var(--gold); transition: transform .25s ease; }\n    .nav-burger:hover .icon { transform: scale(1.05); }`);
  html = html.replace(/function openMenu\(\)\{mMenu\.classList\.add\('open'\);burger\.classList\.add\('open'\);document\.body\.style\.overflow='hidden';\}/, `function openMenu(){mMenu.classList.add('open');burger.classList.add('open');burger.setAttribute('aria-expanded','true');document.body.style.overflow='hidden';}`);
  html = html.replace(/function closeMenu\(\)\{mMenu\.classList\.remove\('open'\);burger\.classList\.remove\('open'\);document\.body\.style\.overflow='';\}/, `function closeMenu(){mMenu.classList.remove('open');burger.classList.remove('open');burger.setAttribute('aria-expanded','false');document.body.style.overflow='';}`);
  return html;
}

function patchSubmitButtons(html) {
  return html.replace(/(<button\b[^>]*\bid="submitBtn"[^>]*>)([^<]+)(<\/button>)/g, (m, open, label, close) => {
    if (m.includes('<svg')) return m;
    return `${open}${label}${named('send')}${close}`;
  });
}

function patchFooterBrands(html) {
  const domains = {
    instagram: 'instagram', youtube: 'youtube', linkedin: 'linkedin',
    facebook: 'facebook', tiktok: 'tiktok', github: 'github'
  };
  return html.replace(/(<a\b[^>]*href="https:\/\/(?:www\.)?([a-z.-]+)[^"]*"[^>]*>)([^<]+)(<\/a>)/gi, (m, open, domain, label, close) => {
    if (m.includes('<svg')) return m;
    const key = domain.replace(/^www\./, '').split('.')[0];
    const id = domains[key];
    if (!id) return m;
    return `${open}${icon(id, '', true)}${label}${close}`;
  });
}

function removeFlaticonAttribution(html) {
  return html.replace(/\s*·\s*<a\b[^>]*href="https:\/\/www\.flaticon\.com\/uicons"[^>]*>Uicons by Flaticon<\/a>/gi, '');
}

function removeWhatsapp(html, name) {
  if (name === 'index.html') {
    html = html.replace(/\s*<div class="contact-item"[^>]*>\s*<span><svg[\s\S]*?icon-message[\s\S]*?<\/div>\s*<\/div>/, '');
  }
  if (name === 'contact.html') {
    html = html.replace(/\s*<div class="card">\s*<svg[^>]*>[\s\S]*?icon-message[\s\S]*?<\/svg>\s*<h3>WhatsApp<\/h3>[\s\S]*?<\/div>\s*<\/div>/, '');
  }
  return html;
}

function renameTiktok(html) {
  return html.replace(/icons\.svg#icon-music/g, 'icons.svg#icon-tiktok');
}

function patchIndexExtras(html) {
  return html.replace(/(<h3 class="projects-sub-title" id="web-dev-projects">)([\s\S]*?)(<\/h3>)/, (m, open, inner, close) => {
    if (inner.includes('<svg')) return m;
    return `${open}${named('code')}${inner}${close}`;
  });
}

let changed = [];
for (const name of files) {
  let html = await readFile(new URL(name, root), 'utf8');
  const before = html;
  html = html.replace(/class="icon undefined/g, 'class="icon');
  html = patchStylesheet(html, name);
  html = patchArrows(html);
  html = patchNavIcons(html, name);
  html = patchSectionIcons(html);
  html = patchCards(html);
  html = patchProjectCards(html);
  html = patchSkillChips(html);
  html = patchExp(html);
  html = patchEntries(html);
  html = patchFaq(html);
  html = patchSubmitButtons(html);
  html = patchFooterBrands(html);
  html = removeWhatsapp(html, name);
  html = removeFlaticonAttribution(html);
  html = renameTiktok(html);
  if (name === 'photography.html') html = patchPhotography(html);
  if (name === 'index.html') {
    html = patchBurger(html);
    html = patchIndexExtras(html);
  }
  if (html !== before) {
    await writeFile(new URL(name, root), html, 'utf8');
    changed.push(name);
  }
}

console.log(`Updated ${changed.length} pages:\n${changed.join('\n')}`);
