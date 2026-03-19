# 🚀 Web Development Projects — Prathmesh Gaikwad

> A collection of three beginner-to-intermediate HTML, CSS, and JavaScript web development projects.
> Built as part of B.Tech CSE coursework at Bharati Vidyapeeth's College of Engineering, Kolhapur.

---

## 📁 Project Overview

| # | Project | Tech Stack | File(s) |
|---|---------|------------|---------|
| 1 | [Personal Portfolio](#1-personal-portfolio) | HTML, CSS | `portfolio.html` |
| 2 | [Landing Page](#2-landing-page) | HTML, CSS | `index.html`, `style.css` |
| 3 | [Calculator App](#3-calculator-app) | HTML, CSS, JS | `index.html`, `style.css`, `script.js` |

---

## 1. 🧑‍💻 Personal Portfolio

### 📌 Description
A fully responsive personal portfolio website built using HTML and CSS. Designed to showcase skills, education, projects, and contact information in a clean editorial layout. Features a warm cream and forest green color palette with Playfair Display and Outfit fonts.

### 🎯 Objective
To create an impressive and user-friendly personal portfolio that represents a developer's profile, achievements, and capabilities.

### ✨ Features
- **Header / Navigation** — Fixed navbar with smooth scroll links and logo
- **Hero Section** — Name, tagline, animated stats bar, and CTA buttons
- **About Section** — Bio with education timeline and profile card
- **Skills Section** — 6 categorized skill cards (Java, Web, Android, CS, etc.)
- **Projects Section** — 6 project cards with titles, descriptions, and tech tags
- **Resume Section** — Resume download card with PDF link
- **Contact Section** — Contact info cards + message form
- **Footer** — Copyright notice, brand name, and navigation links
- **Scroll Reveal Animations** — Elements animate in as you scroll

### 🛠️ Tech Stack
| Technology | Usage |
|------------|-------|
| HTML5 | Page structure and semantic markup |
| CSS3 | Styling, grid layout, flexbox, animations |
| Google Fonts | Playfair Display + Outfit typography |
| JavaScript (minimal) | Scroll reveal via IntersectionObserver |

### 📂 File Structure
```
portfolio/
└── portfolio_v2.html     ← All-in-one file (HTML + embedded CSS)
```

### ▶️ How to Run
1. Download `portfolio_v2.html`
2. Open it in any modern web browser (Chrome, Firefox, Edge)
3. No server or installation required

### 📸 Sections Layout
```
[Header / Nav]
[Hero — Name + Tagline + Avatar]
[Scrolling Ticker]
[About — Bio + Education Timeline]
[Skills — 6 Category Cards]
[Projects — 6 Project Cards]
[Resume — Download Card]
[Contact — Info + Form]
[Footer]
```

### 🎨 Design Highlights
- **Color Palette:** Warm cream (`#f5f0e8`) + Forest green (`#1e3a2f`) + Gold (`#b8922a`)
- **Typography:** Playfair Display (headings) + Outfit (body)
- **Layout:** CSS Grid + Flexbox with diagonal accents and sticky sidebar

---

## 2. 🌐 Landing Page

### 📌 Description
A professional SaaS/tech product landing page for a fictional product called **NexaFlow**. Built with a futuristic dark theme featuring midnight blue and electric cyan neon aesthetics. Fully responsive across all screen sizes.

### 🎯 Objective
To learn and apply HTML/CSS fundamentals including columns, sections, headers, footers, boxes, color palettes, padding, and alignment — while designing a visually impressive and user-friendly page.

### ✨ Features
- **Header / Nav** — Fixed glassmorphism navbar with smooth scroll and mobile hamburger menu
- **Hero Section** — Headline, tagline, CTA buttons, live dashboard mockup UI card, floating badges, stats bar
- **Features Section** — 6 feature cards in a bento CSS Grid layout
- **How It Works** — 3-step process with connector lines
- **Pricing Section** — 3-tier pricing cards (Free, Pro, Enterprise)
- **Testimonials** — 3 review cards with author avatars and star ratings
- **CTA Section** — Bold call-to-action with glowing background
- **Footer** — 5-column layout with brand, social icons, and link groups
- **Scroll Reveal** — Cards animate in using IntersectionObserver API

### 🛠️ Tech Stack
| Technology | Usage |
|------------|-------|
| HTML5 | Semantic structure with sections, nav, footer |
| CSS3 | Custom properties, Grid, Flexbox, animations |
| Google Fonts | Bebas Neue (display) + Manrope (body) |
| JavaScript | Mobile nav toggle, scroll reveal animations |

### 📂 File Structure
```
landing-page/
├── index.html     ← Page structure and content
└── style.css      ← All styling (550+ lines)
```

### ▶️ How to Run
1. Download both `index.html` and `style.css` into the **same folder**
2. Open `index.html` in any modern web browser
3. No server or installation required

### 📸 Sections Layout
```
[Header — Fixed Nav with Logo + Links + Buttons]
[Hero — Headline + Dashboard Mockup + Stats Bar]
[Features — 6 Cards in Bento Grid]
[How It Works — 3 Steps]
[Pricing — 3 Tier Cards]
[Testimonials — 3 Review Cards]
[CTA — Bold Call to Action]
[Footer — 5-Column Links]
```

### 🎨 Design Highlights
- **Color Palette:** Midnight blue (`#04060f`) + Electric cyan (`#00c8ff`) + Blue (`#0066ff`)
- **Typography:** Bebas Neue (headings) + Manrope (body)
- **Effects:** Radial glows, dot-grid background, CSS custom properties, glassmorphism navbar
- **Responsive:** Fully mobile-friendly with hamburger menu at ≤768px

### 📐 CSS Concepts Used
- `CSS Grid` — Feature bento grid, pricing grid, footer grid
- `Flexbox` — Navbar, hero section, stat bars
- `CSS Variables` — Colors, spacing, fonts via `:root`
- `@keyframes` — Fade-up animations, pulsing badge dot
- `backdrop-filter` — Glassmorphism navbar
- `position: fixed` — Sticky header
- `@media queries` — Responsive breakpoints at 1024px, 900px, 768px, 480px

---

## 3. 🔢 Calculator App

### 📌 Description
A fully functional real-world calculator application built with HTML, CSS, and JavaScript. Features a dark glassmorphism design with amber/gold neon accents, and a complete calculator engine that matches the behaviour of iOS/Windows built-in calculators.

### 🎯 Objective
To implement an interactive calculator with event listeners, operators, conditionals, and a real arithmetic engine — while building a polished, responsive interface using CSS Grid for button alignment.

### ✨ Features

#### 🧮 Core Calculator Features
- Addition, Subtraction, Multiplication, Division
- Operator chaining — `3 + 4 × 2` evaluates `3+4=7` then `7×2=14`
- **Repeat equals** — pressing `=` again repeats last operation (`5+3=8`, then `=` → `11`, `=` → `14`)
- **Context-aware percent** — `200 + 5%` adds 10 (5% of 200); `50%` alone → `0.5`
- **AC / C toggle** — `C` clears current entry only; `AC` resets everything
- `+/−` sign toggle
- Backspace (⌫) to delete last digit
- Advanced: `√x`, `x²`, `1/x`
- Error handling: divide by zero shows `Error` + shake animation

#### 🎨 UI Features
- Glassmorphism calculator shell with backdrop blur
- Amber/gold glow on operator buttons
- Gradient orange equals button
- Animated ambient background orbs
- Ripple click effect on all buttons
- Auto-resizing font for long numbers
- Blinking cursor on display
- Live expression bar shows full expression as you type
- History panel — last 60 calculations, click any to restore
- Keyboard shortcuts support

### 🛠️ Tech Stack
| Technology | Usage |
|------------|-------|
| HTML5 | Calculator layout, button grid, display |
| CSS3 | Grid layout, glassmorphism, animations, variables |
| JavaScript (ES6+) | Full calculator engine, event handling, history |
| Google Fonts | Orbitron (display font) + Share Tech Mono (mono) |

### 📂 File Structure
```
calculator/
├── index.html     ← Layout: display + button grid + history panel
├── style.css      ← Glassmorphism dark theme (amber/gold)
└── script.js      ← Full calculator engine (v2 — real calc logic)
```

### ▶️ How to Run
1. Download all 3 files (`index.html`, `style.css`, `script.js`) into the **same folder**
2. Open `index.html` in any modern web browser
3. Use mouse clicks or keyboard to operate

### ⌨️ Keyboard Shortcuts
| Key | Action |
|-----|--------|
| `0` – `9` | Input digits |
| `.` or `,` | Decimal point |
| `+` | Addition |
| `-` | Subtraction |
| `*` | Multiplication |
| `/` | Division |
| `Enter` or `=` | Equals |
| `Backspace` | Delete last digit |
| `Escape` or `Delete` | Clear (AC/C) |
| `%` | Percent |

### 📸 Interface Layout
```
┌──────────────────────────┐
│  CALCPRO    🔴 🟡 🟢     │  ← Header bar
├──────────────────────────┤
│  200 + 5% =              │  ← Expression bar
│                    210   │  ← Main result display
│  RAD/DEG                 │  ← Meta info
├──────────────────────────┤
│  AC    +/−    %    ÷     │  ← Row 1 (Utility + Operator)
│  7      8     9    ×     │  ← Row 2
│  4      5     6    −     │  ← Row 3
│  1      2     3    +     │  ← Row 4
│  0          .      =     │  ← Row 5
├──────────────────────────┤
│  ⌫     √x    x²   1/x   │  ← Advanced row
└──────────────────────────┘
```

### 🧠 JavaScript Concepts Used
- `switch` statements for operator routing
- `if / else` for all edge cases
- Event delegation with `addEventListener`
- `IntersectionObserver` for scroll effects
- `parseFloat` and precision math (`toPrecision`)
- Integer scaling to fix floating-point errors (`0.1 + 0.2 = 0.3` ✅)
- State machine pattern with a central `calc` object
- DOM manipulation (`classList`, `textContent`, `createElement`)
- `keydown` event for keyboard support

### 🎨 Design Highlights
- **Color Palette:** Dark bg (`#0c0e14`) + Amber (`#ffb340`) + Gradient orange equals
- **Effects:** Glassmorphism, ambient glowing orbs, ripple on click, shake on error, pop on result
- **Responsive:** Adjusts button size at ≤640px and ≤360px

---

## 👨‍💻 Author

**Prathmesh Gaikwad**
B.Tech — Computer Science & Engineering
Bharati Vidyapeeth's College of Engineering, Kolhapur (Shivaji University)

---

## 📄 License

These projects are created for educational purposes as part of B.Tech CSE coursework.
Feel free to use and modify for learning.

---

*Built with HTML · CSS · JavaScript*
