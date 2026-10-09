# SPSS Lite

A browser-based survey-analysis demo built with React, Vite, Tailwind CSS,
Papa Parse, and Recharts. The current application is a survey dashboard,
not a fintech or payment-processing application.

Load the built-in six-row sample survey or upload a CSV with a header row.
The app includes a data preview, variable summaries, frequency analysis,
charts, cross-tabulation, report summary cards, and CSV dataset export.
CSV parsing and analysis run in the browser; loaded data lives in React
state and is cleared when the page reloads. There is no backend,
authentication, payment integration, or persistent storage. Settings controls
are demo UI and do not currently change analysis behavior.

## Run locally

Use a Node.js version supported by Vite 8 (Node 20.19+ or 22.12+).

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite.

## Other commands

```sh
npm run build    # Generate the production build in dist/
npm run preview  # Preview the production build locally
npm run lint     # Run Oxlint
```

Application source is in `src/`, static assets are in `public/`, and
`package-lock.json` preserves the dependency versions. Generated outputs,
dependencies, local environment files, logs, and TypeScript build caches
are excluded from Git.
