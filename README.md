# Wedding Invitation Web — Anu & Nirmal

An elegant, mobile-first wedding invitation web application celebrating **Anu (Bride) & Nirmal (Groom)** on **November 5, 2026** at **Hotel Grand Guardian, Ratnapura**.

Designed with a bespoke **White, Dull Gold, and Noir Black** palette with editorial typography, gold foil accents, and fluid mobile UX.

---

## Features

- **Interactive Wax Seal Envelope Unveiling**: First-impression tactile unseal animation with monogram crest.
- **Bespoke Color Palette**: Pure white, silk ivory, antique dull gold (`#9C7D4A` / `#BA955A`), and warm charcoal onyx.
- **Ambient Wedding Music Player**: Floating luxury vertical side controller docked to the left center of the screen with rotating gold vinyl disc, rhythmic equalizer wave visualizer, and vertical gold typography. Features custom romantic ambient audio track (`assets/music.mp3` and `assets/music.m4a`). Automatically unseals with romantic melody upon opening the invitation.
- **Live Countdown Timer**: Precise countdown to November 5, 2026 (09:30 AM SLT).
- **Add to Calendar**:
  - Direct 1-Click Google Calendar event generator.
  - Downloadable Apple iCal & Outlook (`.ics`) file.
- **Celebration Itinerary / Schedule**: Poruwa ceremony, welcome refreshments, grand entrance, banquet feast, and cake cutting.
- **Venue Guide**: Direct Google Maps link and one-tap copy address for Hotel Grand Guardian, Ratnapura.
- **Dress Code Guide**: Swatches and guidance for formal celebration attire.
- **Dual-Delivery RSVP**:
  - One-tap WhatsApp confirmation prefilled with guest name, attendance status, guest count, dietary preferences, and wishes.
  - Automatic `localStorage` backup + optional PHP backend (`api/rsvp.php` -> `data/rsvps.json`).
- **Live Blessings Guestbook**: Interactive wishes wall with instant updates.
- **Mobile Sticky Navigation Bar**: Easy thumb-access to events, venue, RSVP, wishes, and sound toggle.

---

## How to Run & Host

### 1. In Local XAMPP
Since this project is located in `c:\xampp\htdocs\wedding-invite-web`:
1. Start **Apache** from the XAMPP Control Panel.
2. Open your web browser and visit:
   ```
   http://localhost/wedding-invite-web/
   ```

### 2. Static Hosting (GitHub Pages / Netlify / Vercel / Cloudflare Pages)
Because this application is built with standard HTML5, CSS3, and JavaScript, you can host it for free on any static host:
- **GitHub Pages**: Push this repository to GitHub, go to **Settings > Pages**, and select the `main` branch.
- **Netlify**: Drag and drop the `wedding-invite-web` folder directly onto [app.netlify.com/drop](https://app.netlify.com/drop).
- **Vercel**: Run `vercel deploy` or connect your GitHub repo.

---

## Customization Guide

- **Coordinator WhatsApp Number**: Open `js/main.js` and change `COORDINATOR_WHATSAPP = '94771234567'` to the couple's or coordinator's Sri Lankan WhatsApp number.
- **Custom Background Music**: Place an audio file named `music.mp3` in the `assets/` directory. The player will automatically use it instead of the built-in harp synthesizer.
- **Couple Portraits**: Replace the SVG placeholders in `index.html` inside `.person-avatar-wrap` with photos of Anu and Nirmal (e.g., `<img src="assets/anu.jpg" class="person-avatar-img">`).
