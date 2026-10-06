# 🎬 404 Cinema &bull; Next-Gen Movie Theater

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![Bootstrap 5](https://img.shields.io/badge/Bootstrap_5.3.3-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)](https://getbootstrap.com/)
[![GitHub Pages](https://img.shields.io/badge/Live_Demo-GitHub_Pages-success?style=for-the-badge&logo=github)](https://d0kus.github.io/FrontendBootstrapVersion/)

> **Astana IT University** &bull; **Group:** SE-2507  
> **Course:** Web Technologies / Frontend Development  
> **Project:** Midterm Project &bull; Cinema Ticket Reservation System

---

## 🌐 Live Website (GitHub Pages)

🔗 **Live Link:** [https://d0kus.github.io/FrontendBootstrapVersion/](https://d0kus.github.io/FrontendBootstrapVersion/)

---

## 📖 Project Overview

**404 Cinema** is a multi-page web platform for an ultra-modern premium movie theater featuring 4K dual-laser IMAX projection, Dolby Atmos spatial audio, and luxury VIP recliner seating. The project demonstrates responsive web layout using **Bootstrap 5.3.3** along with a dedicated showcase for **Pure CSS Media Queries**.

---

## 👥 Team Members & Page Distribution

According to project requirements, each team member is responsible for at least two complete HTML pages:

| Team Member | Role & Responsibilities | Assigned Pages |
| :--- | :--- | :--- |
| **Umarov Diyar** | Main Landing Page, Hero Carousel & Cinema Auditorium Specs | 1. [`index.html`](index.html)<br>2. [`halls.html`](halls.html) |
| **Aibek Mukhat** | Movie Timetable, Pricing Matrix & Pure CSS Media Queries Showcase | 1. [`schedule.html`](schedule.html)<br>2. [`pricing.html`](pricing.html)<br>3. [`media-queries.html`](media-queries.html) |
| **Anuar Muratbay** | Online Seat Booking System, About Us & Team Story | 1. [`booking.html`](booking.html)<br>2. [`about.html`](about.html) |

---

## 📁 Project Architecture & Pages

The application consists of **7 interconnected HTML pages**:

1. **`index.html` (Home)** &mdash; Full-featured landing page featuring a 9-slide interactive Bootstrap carousel, cinema experience highlights, format filters, and a 6-movie premiere showcase.
2. **`halls.html` (Halls & Tech)** &mdash; Detailed acoustic and visual technical breakdown for Hall 01 (IMAX Laser), Hall 02 (VIP Recliner Lounge), and Hall 03 (Dolby Atmos), followed by an architecture photo gallery.
3. **`schedule.html` (Schedule)** &mdash; Daily movie showtime schedule with auditorium filters, status badges, format tags, and responsive timetable.
4. **`pricing.html` (Pricing & Offers)** &mdash; Promotional tier cards (Student discount, Family matinee, Midnight rates), complete price matrix table, and transparent ticket refund policy.
5. **`booking.html` (Booking)** &mdash; Responsive ticket reservation layout including hall preview cards, step-by-step instructions, seating tier selector, and concession combo options.
6. **`about.html` (About Us)** &mdash; Cinema origin story, core values, team member profile cards, and departmental contact directory.
7. **`media-queries.html` (Media Queries Demo)** &mdash; Dedicated assignment requirement demonstrating fluid responsive typography and multi-column card re-ordering built purely with CSS media queries without framework dependencies.

---

## 🛠 Tech Stack & Implementation Details

- **HTML5:** Semantic markup (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`, `<figure>`).
- **CSS3:**
  - Modern CSS custom variables (`--cinema-orange: #f97316`, `--cinema-bg: #121316`, `--cinema-card: #1f222b`).
  - Card hover micro-animations (`.hover-card` transform and glow).
  - Pure CSS fluid typography scaling with screen indicator in `media-queries.css`.
- **Bootstrap 5.3.3:**
  - Responsive Grid System: `container`, `row`, `col-12`, `col-md-6`, `col-lg-4`, `g-4`.
  - Components: `navbar` with mobile collapse toggler, `carousel` with crossfade, `table` with `table-responsive`, `card`, `badge`, `btn-group`.
  - Dark Theme: Built-in `data-bs-theme="dark"` integrated with custom cinema color overrides.

---

## 📱 Responsive Breakpoints

The project has been tested and optimized across all major device widths:

- **Mobile Phones (< 768px):** Single-column stacked layouts, touch-friendly tap targets, collapsed mobile navigation.
- **Tablets (768px – 991px):** Two-column card rows, balanced table layouts.
- **Laptops & Desktops (≥ 992px):** Three-column card displays, wide hero carousel banners, sticky navigation.

---

## 🚀 How to Run Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/d0kus/FrontendBootstrapVersion.git
   ```
2. Open the project folder in VS Code or your preferred editor.
3. Open `index.html` directly in your browser or run with **Live Server**.
