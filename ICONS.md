# Icon System — Flaticon UIcons

## Source and licence

- **Family:** Flaticon UIcons — **Regular Rounded** for interface/content icons and **UIcons Brands** for social marks.
- **Source:** https://www.flaticon.com/uicons
- **Official repository:** https://github.com/freepik-company/flaticon-uicons
- **Licence:** Flaticon free licence. Commercial and personal use is permitted; attribution is required because no premium subscription is used. Full terms: https://www.freepikcompany.com/legal#nav-flaticon
- **Attribution:** `Uicons by Flaticon` linking to https://www.flaticon.com/uicons. It is displayed in the footer of **every page that uses the sprite**.

No external icon font, CDN, or JavaScript library is loaded at runtime. All artwork is baked into one local sprite, `icons.svg`, as plain SVG paths using `currentColor`.

## Implementation

- One sprite: `icons.svg`, with 51 symbols on a shared `0 0 1000 1000` grid.
- Interface symbols use filled UIcons Regular Rounded outlines; social symbols use official UIcons Brands marks.
- Icons are referenced as:
  ```html
  <svg class="icon" aria-hidden="true" focusable="false"><use href="icons.svg#icon-name"/></svg>
  ```
  They are decorative because adjacent text labels convey meaning. Icon-only controls keep their `aria-label`.
- `icons.css` contains only static sizing/alignment support. It adds no transitions, transforms, or animations.
- The original palette, content, sections, navigation, responsive rules, and interactions are unchanged.

## Audit coverage

| Area | Result |
| --- | --- |
| Desktop nav, mobile menu, burger | Uniform UIcons for Home/About/Projects/etc.; burger uses menu/close symbols with the existing `.open` behaviour and `aria-expanded`. |
| Section labels / page section numbers | Small gold UIcons preceding the existing text labels. |
| Hero, about, stats, experience, skills | UIcons for user, layers, briefcase, education, property, security, chess, writing, and other content cues. |
| Projects / startups | UIcons for each project/venture and for text-link arrows, replacing inconsistent typographic arrows. |
| Photography / creative / writing / interests | UIcons for camera, clapperboard, image, leaf, chess, book, moon, growth, and lightbox prev/next/close controls. |
| Contact / social links | Mail, message, send, TikTok, and official Instagram/YouTube/LinkedIn/Facebook/GitHub brand marks. |
| Footer | Required `Uicons by Flaticon` attribution on every page; preserved brand mark `M · A · K`. |
| All 16 HTML pages | Audited; every `icons.svg#...` reference resolves to a symbol in the sprite. |

## Maintenance

The sprite is generated from the official Flaticon UIcons font with the dev-only script in `tools/`:

```sh
cd tools && npm install && node generate-icons.mjs
```

To add an icon, pick a glyph from the same UIcons **Regular Rounded** set or **Brands**, add it to the map in `tools/generate-icons.mjs`, regenerate, and reference it with the same `<use>` pattern. Keep the footer attribution on every page that uses the sprite.
