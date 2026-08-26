# Shadies & The Lady Website

Official one-page website for **Shadies & The Lady**, a Belgian pop/rock cover band from Limburg.

## Live Website

https://www.shadiesandthelady.be/

## Project Overview

This website is built as a clean, maintainable static project with:

- HTML5
- CSS3
- Vanilla JavaScript
- GitHub Pages

No frameworks or build tools are required. Open `index.html` in a browser to preview locally.

## File Structure

```
index.html          Page structure, meta tags, JSON-LD band data
css/style.css       All styling
js/script.js        Translations, gig calendar, interactions
style.css           Mirror of css/style.css (keep identical)
script.js           Mirror of js/script.js (keep identical)
assets/images/      Headshots, gallery photos, posters, logo
```

Note: the root-level `style.css` and `script.js` are duplicates of the versions in
`css/` and `js/`. If you edit one, copy it over the other so both stay identical.

## Main Features

- Responsive one-page layout
- Sticky navigation with smooth scrolling
- EN/NL bilingual interface (Dutch default)
- Hero section with booking call-to-action
- Band section with expandable member bios
- Repertoire in three clean song-list blocks (Classics, 90s/00s, Modern)
- Self-maintaining gig calendar with automatic "next show" highlight
- Event posters that expand to full size when clicked
- Photo gallery with lightbox (arrows, swipe, Escape, keyboard support)
- Contact form integrated with Formspree
- Inline booking flow inside the form (3 steps)
- Email copy-to-clipboard button
- Social icon links (Facebook, Instagram, Linktree) with tooltips
- Footer with expandable Legal and Privacy/GDPR sections
- JSON-LD structured data for the band and upcoming events
- Respects the visitor's reduced-motion setting

## Updating the Gig Calendar

All gigs live in the `GIGS` array near the top of `js/script.js`. The cards on the
page and the search-engine event data are both generated from it, so this is the
only place that needs editing.

```js
{
  date: "2026-08-29",                          // ISO yyyy-mm-dd
  title: "2 Jaar De Stip",
  place: "Stevoort",                           // shown on the card
  venue: "De Stip",                            // used for search engines
  city: "Stevoort",                            // used for search engines
  poster: "assets/images/AfficheDeStip.jpeg",  // optional
  featured: true,                              // optional
  private: true                                // optional
}
```

Behaviour worth knowing:

- **Past gigs disappear automatically.** A gig stays listed for the whole of its own
  day and drops off the next morning. Old entries can be deleted whenever convenient.
- **The list sorts itself by date**, so new gigs can be added anywhere in the array.
- **The next upcoming gig is featured automatically.** Add `featured: true` only to
  override this and headline a different gig.
- **`poster`** is optional. Leave it out and no poster button appears, which is the
  normal case for private bookings. Sizing is automatic: large on the featured card,
  compact on the others.
- **`private: true`** keeps a gig visible on the site but out of the structured data,
  so it will not appear in Google event results. Private gigs are also never featured.
- If every gig has passed, the section shows a booking prompt instead of an empty gap.

To add a poster, drop the image in `assets/images/` and reference it in the `poster`
field. Filenames are case-sensitive on GitHub Pages, so they must match exactly.

## Updating Text

All visible text is translated through the `translations` object in `js/script.js`,
with one entry per language. Both `nl` and `en` must contain the same keys, otherwise
the raw key name will be shown to visitors.

Member bios use `\n` to separate paragraphs.

## Contact Form Setup

Form submissions are handled through Formspree.

Current endpoint used in the project:

`https://formspree.io/f/mwlevdzy`

### Anti-spam

This project currently uses:

- Formspree spam filtering
- Hidden honeypot field (`_gotcha`)

Captcha can be enabled later if spam volume increases.

## Bilingual Support

Language switcher supports:

- NL (default)
- EN

Translations are managed in `script.js` through a centralized dictionary. Language
preference is saved in browser local storage. Dates are formatted per language, so
month abbreviations do not need translating by hand.

## Images

- Social share preview: `assets/images/social-preview-logo.png` (1200x630)
- Gallery photos: around 1600px wide, 250-600 KB
- Posters: portrait orientation works best

After changing the share image, refresh the cached preview through the
[Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) and the
[LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/).

## Repository Workflow

Recommended lightweight flow:

1. Make focused changes in one update batch.
2. Keep the root and subfolder copies of `script.js` and `style.css` identical.
3. Commit with a clear message.
4. Verify on GitHub Pages in both NL and EN.
5. Tag stable milestones with releases.

## Release Status

Current recommended release stage:

- `v1.4.0` - Gig Calendar & Poster Release

## Planned Next Improvements

- Full band photo for the hero and social preview
- Optional technical rider as downloadable PDF (on request)
- Optional captcha if spam appears
- Optional analytics/privacy banner if needed
- Final legal text review

## Legal and Privacy Note

Website contact data is used only to respond to booking requests and is not shared with third parties.

## Maintainer

Shadies & The Lady
