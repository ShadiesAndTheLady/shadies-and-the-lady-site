# Shadies & The Lady Website

Official one-page website for **Shadies & The Lady**, a Belgian pop/rock cover band from Limburg.

## Live Website

https://shadiesandthelady.github.io/shadies-and-the-lady-site/

## Project Overview

This website is built as a clean, maintainable static project with:

- HTML5
- CSS3
- Vanilla JavaScript
- GitHub Pages

No frameworks or build tools are required.

## Main Features

- Responsive one-page layout
- Sticky navigation with smooth scrolling
- EN/NL bilingual interface (Dutch default)
- Hero section with booking call-to-action
- Band section (about + members merged)
- Repertoire in three clean song-list blocks (Classics, 90s/00s, Modern)
- Combined gigs and booking section
- Featured next gig card with non-link CTA text
- Contact form integrated with Formspree
- Inline booking flow inside the form (3 steps)
- Email copy-to-clipboard button
- Social icon links (Facebook, Instagram, Linktree) with tooltips
- Footer with quick links and legal/privacy references
- Legal + Privacy/GDPR section

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

Translations are managed in `script.js` through a centralized dictionary. Language preference is saved in browser local storage.

## Repository Workflow

Recommended lightweight flow:

1. Make focused changes in one update batch.
2. Commit with a clear message.
3. Verify on GitHub Pages.
4. Tag stable milestones with releases.

## Release Status

Current recommended release stage:

- `v1.3.0` - Contact Flow Polish

## Planned Next Improvements

- Optional technical rider as downloadable PDF (on request)
- Optional captcha if spam appears
- Optional analytics/privacy banner if needed
- Final legal text review

## Legal and Privacy Note

Website contact data is used only to respond to booking requests and is not shared with third parties.

## Maintainer

Shadies & The Lady
