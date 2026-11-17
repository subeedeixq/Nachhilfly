# app/

Das SPFx-Projekt (SPFx 1.24.1, React, Heft, Node 26). Aufbau: `docs/ARCHITEKTUR.md` §3.

- Erstes Mal: `npm install` (dauert einige Minuten)
- Bauen: `npx heft build`
- Paket: `npx heft build --production && npx heft package-solution --production` → `sharepoint/solution/nachhilfly.sppkg`

`npx heft` nimmt die Heft-Version des Projekts, nicht die global installierte.
Platzhalter bis zur Klärung: `SITE_URL` in `src/config.ts` (T-0.3), Teams-Symbole in `teams/` (T-0.5).
