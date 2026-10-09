# Dependency review — 9 October 2026

The initial `npm audit --json` reported two high-severity affected package
entries. Both were also reported by `npm audit --omit=dev` because several
build dependencies are declared in `dependencies`, rather than
`devDependencies`. That classification alone does not establish browser
runtime exposure.

| Package before fix | Advisory | Dependency paths | Compatible update |
| --- | --- | --- | --- |
| nanoid 3.3.16 | [GHSA-2v37-7h3g-55p8](https://github.com/advisories/GHSA-2v37-7h3g-55p8): custom generators can loop indefinitely when size is zero | root → postcss → nanoid; Vite also uses PostCSS | 3.3.20 |
| source-map-js 1.2.1 | [GHSA-68fv-2mgg-jv7q](https://github.com/advisories/GHSA-68fv-2mgg-jv7q): indexed source-map section offsets can cause event-loop denial of service | root → postcss → source-map-js; root → @tailwindcss/vite → @tailwindcss/node → source-map-js | 1.2.2 |

The application's imports do not use either package. The affected paths
serve CSS compilation and source-map processing during development/builds;
Vercel serves the compiled static assets rather than running a Node application
server. Malicious build inputs can still disrupt developer or CI workloads.
The advisories were fixed, rather than dismissed as tooling concerns.

`npm update nanoid source-map-js` updated the existing lockfile within the
parents' compatible semver ranges. No framework downgrade, forced audit fix,
or major-version override was used. Both the full and production-filtered
audits subsequently reported **zero vulnerabilities**. This describes the
registry report at review time, not a guarantee against future advisories.

Recheck with:

```sh
npm audit
npm audit --omit=dev
npm explain nanoid
npm explain source-map-js
```
