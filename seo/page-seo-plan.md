# Page SEO Plan — Phase 1 Planning Document

> Planning only. Titles and descriptions below are **suggestions for final copy**. The `<title>` and meta description currently inside each new Phase 1 HTML file are draft versions; align them with this plan in Phase 2. No existing file has been edited.

## 1. Suggested page titles and meta descriptions

Titles aim for roughly 60 characters or fewer; descriptions for roughly 155 characters or fewer. Confirm final lengths after copy is written. Every entry is unique — none duplicates the homepage.

| Page / file | Suggested page title | Suggested meta description | Primary keyword | Intent |
|---|---|---|---|---|
| About — `about.html` | About Me \| Muhammad Ayan Khan | Learn about Muhammad Ayan Khan: his background, journey from Qatar to Pakistan, entrepreneurship, technology interests and philosophy. | Muhammad Ayan Khan entrepreneur | Informational / navigational |
| Startups — `startups.html` | Startups \| Muhammad Ayan Khan | Explore the startups founded by Muhammad Ayan Khan, including Kor Da and Pactum — their goals, challenges and future plans. | startup founder Pakistan | Informational |
| Projects — `projects.html` | Projects \| Muhammad Ayan Khan | Browse web projects by Muhammad Ayan Khan: client sites, the problem and solution, technologies, screenshots and live links. | web developer Pakistan | Informational / commercial |
| Experience — `experience.html` | Experience \| Muhammad Ayan Khan | See the professional experience, entrepreneurship, education and skills of Muhammad Ayan Khan, founder, author and web developer. | Muhammad Ayan Khan founder | Informational |
| Creative — `creative.html` | Creative Work \| Muhammad Ayan Khan | Explore photography, video and other creative work by Muhammad Ayan Khan, including his gallery and video channels. | Muhammad Ayan Khan photography | Informational / navigational |
| Writing — `writing.html` | Writing \| Muhammad Ayan Khan | Read about the books, articles and ideas of Muhammad Ayan Khan, author of Hope That Never Ends, and his writing on growth. | Hope That Never Ends book | Informational / commercial |
| Interests — `interests.html` | Interests \| Muhammad Ayan Khan | Discover the interests of Muhammad Ayan Khan: chess, philosophy, reading, technology and business, and how they shape his work. | Muhammad Ayan Khan chess and philosophy | Informational |
| Contact — `contact.html` | Contact Muhammad Ayan Khan | Contact Muhammad Ayan Khan for collaborations, projects and conversations. Find email details and social profiles. | contact Muhammad Ayan Khan | Navigational / transactional |
| Kor Da — `kor-da.html` | Kor Da \| Startup by Muhammad Ayan Khan | Kor Da is a Pakistan-focused property and home rental startup founded by Muhammad Ayan Khan. Read the overview, role and plans. | Kor Da startup Pakistan | Informational / commercial |
| Pactum — `pactum.html` | Pactum \| Startup by Muhammad Ayan Khan | Pactum is a trust-based escrow startup in Pakistan founded by Muhammad Ayan Khan. Read the overview, role and future plans. | Pactum escrow Pakistan | Informational / commercial |
| SA Real Estate — `sa-real-estate.html` | SA Real Estate \| Muhammad Ayan Khan | SA Real Estate is a property listing website built by Muhammad Ayan Khan. See the problem, solution, contribution and live link. | SA Real Estate website Pakistan | Commercial investigation |
| Let's Do It Agency — `lets-do-it-agency.html` | Let's Do It Agency \| Muhammad Ayan Khan | Let's Do It Agency is an agency website built by Muhammad Ayan Khan. See the brief, the build, the contribution and live link. | Let's Do It Agency website | Commercial investigation |
| Chess Federation of Pakistan — `chess-federation-of-pakistan.html` | Chess Federation of Pakistan \| Muhammad Ayan Khan | The Chess Federation of Pakistan website project by Muhammad Ayan Khan — scope, contribution, technologies and live link. | Chess Federation of Pakistan website | Informational / navigational |

**Note:** The Phase 1 draft title on the Chess Federation page is longer than the suggested final title above; shorten it during Phase 2. All other draft titles already match or are close to the suggestions.

## 2. Internal linking plan (planned — not implemented)

### 2.1 Structure: hub and spoke

```
Homepage (index.html)  ← links to be added in Phase 2
 ├── About Me
 │    └── Startups / Kor Da / Pactum
 ├── Startups (hub)
 │    ├── Kor Da
 │    └── Pactum
 ├── Projects (hub)
 │    ├── SA Real Estate
 │    ├── Let's Do It Agency
 │    └── Chess Federation of Pakistan
 ├── Experience
 │    ├── Kor Da
 │    └── Pactum
 ├── Creative
 │    └── Photography (existing photography.html)
 ├── Writing
 ├── Interests
 │    └── Chess Federation of Pakistan
 └── Contact
```

### 2.2 Links already present inside the NEW files (Phase 1)

These are page-to-page links only. They do not alter the homepage or its navigation.

| Source page | Existing links in the new file |
|---|---|
| `about.html` | `startups.html`, `kor-da.html`, `pactum.html` |
| `startups.html` | `kor-da.html`, `pactum.html` |
| `projects.html` | `sa-real-estate.html`, `lets-do-it-agency.html`, `chess-federation-of-pakistan.html`, plus three external live-site URLs copied from the homepage |
| `experience.html` | `kor-da.html`, `pactum.html` |
| `creative.html` | `photography.html`, YouTube, TikTok |
| `writing.html` | Amazon book link, Ourboox free-read link |
| `interests.html` | `chess-federation-of-pakistan.html`, `startups.html`, external CFP site |
| `contact.html` | Five social profile URLs copied from the homepage |
| `kor-da.html` | `startups.html`, website, LinkedIn |
| `pactum.html` | `startups.html`, website, LinkedIn |
| `sa-real-estate.html` | `projects.html`, live site |
| `lets-do-it-agency.html` | `projects.html`, live site |
| `chess-federation-of-pakistan.html` | `projects.html`, `interests.html`, live site |

All external URLs above are copied from the existing homepage. Verify they still resolve before publishing.

### 2.3 Changes required in Phase 2 (NOT done in this phase)

To make the pages discoverable from the live site, the following existing-file changes will be needed in `index.html`:

1. **Desktop navigation** — add links inside `<ul class="nav-links">` (currently: About, Work, Photos, Videos, Author, Startups, Contact). Decide whether to keep hash links and add page links, or replace them.
2. **Mobile menu** — add matching links inside `<div class="mobile-menu" id="mobileMenu">`.
3. **Footer** — extend `<footer>` (currently: Photography, Facebook, TikTok, Contact).
4. **Hero / section CTAs** — optionally point "Explore My Work", "View Startups", "View Projects", "Buy My Book" and "Let's Connect" buttons at the new pages.

Do not modify `style.css` or the inline `<style>` in `index.html` unless a new navigation needs extra rules. The existing `main.js` scroll/mobile-menu handlers assume the current IDs; keep those IDs intact.

If clean URLs such as `/about` are wanted instead of `/about.html`, a new `vercel.json` with rewrites would be required. With the current zero-config Vercel static setup, plain `.html` files are served automatically at their file paths, so no routing config is needed. No deployment has been performed.

### 2.4 Anchor text guidance

- Use descriptive anchors: "Startups founded by Muhammad Ayan Khan", "Kor Da", "Pactum", "See the project".
- Avoid "click here" and repeated identical anchors pointing to different pages.
- Vary anchors between brand + topic and topic-only forms.
- Do not add links to pages whose placeholder content has not been replaced.

### 2.5 Future additions

- Add breadcrumbs to sub-pages once navigation is finalized (Home → Startups → Kor Da).
- Consider a shared footer contact link on all new pages after Phase 2 navigation is agreed.
- Add `sitemap.xml` and `robots.txt` only after final URLs and canonical tags are decided.

## 3. Content expansion plan

| Page | Sections ready | What to add next | Priority |
|---|---|---|---|
| About | 8 sections | Introduction, background, journey, role details, philosophy, ambitions | High — brand anchor page |
| Startups | 7 sections | Venture summaries, exact founder role, models, verified milestones | High — hub page |
| Projects | 8 sections | Per-project summaries, screenshots, confirmed stack, verified results | High — commercial intent |
| Experience | 5 sections | Employment dates, institution name, certifications, precise skill list | Medium |
| Creative | 3 sections | Curated images, video titles/years, links to existing gallery and channels | Medium |
| Writing | 4 sections | Book details, article links, publications, draft ideas | Medium |
| Interests | 5 sections | Personal notes for each interest; reading list | Low |
| Contact | 3 sections | **Email address**, confirmed profiles, availability details | High — conversion page |
| Kor Da | 9 sections | Verified overview, role, model, challenges, milestones, plans | High |
| Pactum | 9 sections | Verified overview, escrow process, role, model, milestones, plans | High |
| SA Real Estate | 8 sections | Client brief, features, stack, screenshots, results | Medium |
| Let's Do It Agency | 8 sections | Client brief, features, stack, screenshots, results | Medium |
| Chess Federation of Pakistan | 8 sections | Engagement details, features, stack, screenshots, results | Medium |

### Writing rules for expansion

- Replace every `[PLACEHOLDER — ...]` block with verified copy; do not simply delete the blocks and leave empty sections.
- State facts, not claims: avoid invented user counts, revenue, follower numbers, awards or "first/only/best" statements unless evidence exists.
- Where a fact already appears on the current homepage, re-check it before repeating it on a new page.
- Use one primary keyword per page in the title, one heading and the opening paragraph. Do not repeat it unnaturally.
- Add images only after files exist in `images/` and descriptions are accurate.
- Keep external links to `target="_blank" rel="noopener noreferrer"` where already used.

## 4. Information still needed from the site owner

1. **Public email address** for the Contact page (none exists on the current site).
2. Confirmed role titles and dates for each venture and role.
3. University/institution name and BBIT start/expected completion dates.
4. Any certifications (issuer and year), or confirmation that there are none.
5. Verified milestones, metrics and achievements for Kor Da and Pactum — nothing should be published without evidence.
6. Book publication year and formats; full list of published articles and their URLs.
7. Screenshots for the three project pages, plus confirmation of who owns the images.
8. Whether the three live project URLs and the two startup URLs should be presented as current work.
9. Final URL preference: `.html` paths (current setup) or clean URLs.
10. Final navigation labels and ordering for Phase 2.

## 5. Deliberately not created yet

- Canonical tags and Open Graph tags using final URLs.
- `sitemap.xml` and `robots.txt`.
- Structured data / schema markup.
- Any change to existing metadata, navigation, design or deployment configuration.
