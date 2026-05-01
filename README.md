# 🌍 Countries Explorer

A responsive React application that lets you explore information about every country in the world — built with **React 19**, **Vite**, and **React Router v7**, with a strong focus on **custom hooks** and **Context API** for state management.

---

## 🔗 Live Demo

[View on Vercel →](https://your-vercel-url.vercel.app)

> Replace the link above with your actual Vercel deployment URL.

---

## ✨ Features

- **Browse all countries** — fetches live data from the [REST Countries API](https://restcountries.com)
- **Search** — filter countries by name in real time
- **Filter by region** — narrow down results by Africa, Americas, Asia, Europe, or Oceania
- **Country detail page** — click any card to see full details: native name, population, region, sub-region, capital, top-level domain, currencies, languages, and bordering countries
- **Border country navigation** — click any border country badge to navigate directly to that country's detail page
- **Dark / Light mode** — toggle global theme powered by Context API
- **Shimmer loading UI** — skeleton placeholders shown while data is being fetched
- **Error handling** — graceful "not found" states for both the list and detail views

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| UI Library | React 19 |
| Build Tool | Vite 7 |
| Routing | React Router DOM v7 |
| State / Theme | Context API + Custom Hook |
| Styling | Plain CSS (component-scoped) |
| Icons | Font Awesome (CDN) |
| Data Source | REST Countries API v3.1 |
| Deployment | Vercel |

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Header.jsx               # App header with dark mode toggle
│   ├── Home.jsx                 # Home page — search, filter, country list
│   ├── SearchBar.jsx            # Controlled search input
│   ├── SelectMenu.jsx           # Region filter dropdown
│   ├── CountriesList.jsx        # Fetches & renders all country cards
│   ├── CountryCard.jsx          # Individual country card
│   ├── CountryDetail.jsx        # Full detail view for a single country
│   ├── CountriesListShimmer.jsx # Skeleton UI for the list
│   ├── CountryDetailShimmer.jsx # Skeleton UI for the detail page
│   └── Error.jsx                # Generic error component
│
├── contexts/
│   ├── ThemeContext.jsx         # Creates the ThemeContext
│   └── ThemeProvider.jsx        # Provides [isDark, setIsDark] to the tree
│
├── hooks/
│   └── useTheme.jsx             # Custom hook — wraps useContext(ThemeContext)
│
├── App.jsx                      # Root layout — wraps everything in ThemeProvider
├── main.jsx                     # Entry point with router setup
└── index.css / App.css          # Global and layout styles
```

---

## 🪝 Custom Hook Highlight

The `useTheme` custom hook is the centrepiece of this project's hook pattern:

```js
// src/hooks/useTheme.jsx
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

export const useTheme = () => useContext(ThemeContext);
```

Instead of calling `useContext(ThemeContext)` directly in every component, any component can simply do:

```js
const [isDark, setIsDark] = useTheme();
```

This makes theme consumption clean, refactorable, and decoupled from the context implementation.

---

## 🚀 Getting Started Locally

### Prerequisites

- Node.js ≥ 18
- npm

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

The output goes into the `dist/` folder and is ready for deployment.

---

## 🌐 API Reference

This project uses the public [REST Countries API](https://restcountries.com) — no API key required.

| Endpoint | Used for |
|---|---|
| `/v3.1/all?fields=name,flags,population,region,capital,cca3` | Home page country list |
| `/v3.1/name/:name?fullText=true` | Country detail page |
| `/v3.1/alpha/:code` | Resolving border country names |

---

## 📸 Screenshots

> Add screenshots of your app here after deployment — light mode, dark mode, and the detail page make for a great showcase.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
