# Portfolio Dev Setup

## What was done

The `keighley-portfolio.jsx` file existed as a standalone React component with no build tooling around it. The following files were created to make it runnable in the browser:

### Files added

| File | Purpose |
|------|---------|
| `package.json` | Defines the project with React 18 + Vite dependencies |
| `vite.config.js` | Vite config with the React plugin |
| `index.html` | HTML entry point pointing to `main.jsx` |
| `main.jsx` | React root — mounts `<App />` from the portfolio component |

### Dependencies installed

- `react` + `react-dom` ^18.3.1
- `vite` ^6.0.0
- `@vitejs/plugin-react` ^4.3.4

## Running the dev server

```bash
npm run dev
```

Opens at `http://localhost:5173` (or next available port).

## Portfolio overview

`keighley-portfolio.jsx` is a full-screen, era-based portfolio with 5 distinct visual themes:

| Era | Years | Style |
|-----|-------|-------|
| Curious Tinkerer | 1993–1999 | Windows 95 / retro UI |
| Print Designer | 2000–2003 | Editorial / Swiss print |
| Web Designer | 2004–2012 | Early 2000s web / matrix green |
| Lead Product Designer | 2013–2024 | React / dark dev aesthetic |
| Senior Product Designer | 2025–Present | AI / minimal glassmorphism |

Navigation: scroll wheel, arrow keys, or the era buttons in the bottom nav bar.
