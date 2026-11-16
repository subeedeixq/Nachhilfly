# ARCHITEKTUR – wie der Code aufgebaut ist

**Wann lesen:** Beim Anlegen des Projekts (Phase 1), beim Anlegen neuer Dateien und wenn du nicht weißt, wohin etwas gehört.

## Inhalt
1. Technik und Versionen
2. Ordner im Repo
3. Ordner im SPFx-Projekt (`app/src`)
4. Schichten und Regeln für Abhängigkeiten
5. Datenschicht `IDataService`
6. Senden: der Weg über den Eingang
7. Laden, Zwischenspeicher, Aktualisieren
8. Zustand der Oberfläche und Navigation
9. Styles und Bauteile
10. Teams und SharePoint
11. Mock-Daten, Harness, Tests
12. Debuggen mit SharePoint
13. Bauen, Ausliefern, Updates
14. Fehlerbehandlung
15. Leistung und Barrierefreiheit

## 1. Technik und Versionen
| Was | Wahl | Hinweis |
|---|---|---|
| Framework | **SPFx 1.24** (Stand Nov. 2026), Webpart, Vorlage React | Toolchain **Heft** (seit 1.22). Neue CLI `spfx create` kommt mit 1.25, bis dahin Yeoman-Generator. |
| Node.js | 26 (von SPFx 1.24 unterstützt, ebenso 22 und 24) | `.nvmrc` mit der genutzten Version anlegen. `m365 spfx doctor` prüft. |
| Sprache | TypeScript (Version, die der Generator vorgibt) | `strict: true` |
| UI | React (Version vom Generator) | Keine weitere UI-Bibliothek. Kein Fluent UI für Sichtbares (D-12). |
| SharePoint-Zugriff | **PnPjs** (`@pnp/sp`, aktuelle Hauptversion) | nur in `services/SharePointService.ts` |
| Styles | SCSS-Module (`*.module.scss`) + Tokens als CSS-Variablen | Tokens aus DESIGN.md |
| Unit-Tests | Jest (über Heft) | für `domain/` |
| Klick-Tests | Playwright gegen den Harness | Screenshots 390 × 844 |
| Harness-Bündler | esbuild (Dev-Abhängigkeit) | nur für die Testseite ohne SharePoint |
| Flows | Power Automate, nur Standard-Konnektoren | FLOWS.md |

**Neue npm-Pakete nur nach Rückfrage.** Erlaubt ohne Rückfrage: was der SPFx-Generator anlegt, `@pnp/sp`, `@pnp/queryable` (kommt mit), `esbuild`, `esbuild-sass-plugin`, `@playwright/test`.

## 2. Ordner im Repo
```
nachhilfly/
├── CLAUDE.md            Arbeitsanweisung für Claude (zuerst lesen)
├── README.md            Für Menschen: Was ist hier, wie anfangen
├── TODO.md              Aufgabenliste mit Phasen (T-x.y)
├── docs/                Fachliche und technische Doku (eine Wahrheit pro Thema)
├── referenz/            Abgenommenes Vorbild: Prototyp, Logo, PRODUCT.md – nie ändern
├── app/                 Das SPFx-Projekt (wird in T-1.1 angelegt)
├── flows/
│   ├── anleitungen/     Klick-Anleitung + Testtabelle je Flow (F-xx.md)
│   └── export/          Nur LIESMICH.md: wo die Flow-Exporte liegen (nicht im Git)
├── scripts/             Hilfsskripte (z. B. Testdaten), nie mit echten Daten
└── .claude/commands/    Befehle für Claude Code
```

## 3. Ordner im SPFx-Projekt
```
app/
├── config/                      package-solution.json, serve.json … (vom Generator)
├── teams/                       Teams-Symbole (color.png 192×192, outline.png 32×32)
├── harness/                     Testseite ohne SharePoint (T-1.4)
│   ├── index.html, harness.tsx  Rollenwahl links + Handy-Rahmen wie im Prototyp
│   └── build.mjs                esbuild-Skript
├── tests/ui/                    Playwright-Tests (*.spec.ts) + Screenshots (nicht ins Git)
└── src/
    ├── config.ts                SITE_URL, Listennamen, Zeitgrenzen (keine Geheimnisse)
    ├── webparts/nachhilfly/
    │   ├── NachhilflyWebPart.ts         Einstieg: Kontext lesen, Dienst wählen, <App/> rendern
    │   └── NachhilflyWebPart.manifest.json   supportedHosts: TeamsPersonalApp, SharePointWebPart
    ├── domain/                  Reine Logik, kein React, kein SharePoint
    │   ├── types.ts             Alle Typen und Zustände (Z-1 … Z-7), Aktionscodes (A-xx)
    │   ├── constants.ts         Fächer, Stufen, Anliegen, Zeitfenster, Avatare, Lehrmethoden-Anzahl
    │   ├── rules.ts             Prüffunktionen mit R-IDs, geben Fehlercode oder null zurück
    │   ├── dates.ts             Schultage, Fristen, Formatierung („Di, 3.11.“)
    │   └── selectors.ts         Abgeleitete Werte (freie Plätze, Badge-Zahlen, Startansicht R-04)
    ├── services/
    │   ├── IDataService.ts      Schnittstelle (siehe §5)
    │   ├── MockService.ts       Testdaten + Nachbau der Flow-Logik (aus prototyp-v2 service.js)
    │   ├── mockSeed.ts          Erfundene Testdaten (Personen wie im Prototyp)
    │   ├── SharePointService.ts Echte Listen über PnPjs
    │   └── mapping.ts           SharePoint-Eintrag ↔ Domain-Typ (Spaltennamen aus DATENMODELL.md)
    └── app/
        ├── App.tsx              Rahmen: lädt „ich“, wählt Ansicht, zeigt Pause/Fehler
        ├── state.tsx            Context + Reducer (Ansicht, Tab, Blatt, Menü, Toast)
        ├── texts.ts             ALLE Texte (aus TEXTE.md)
        ├── hooks/               useData, useSend, useMe, useSettings
        ├── components/          Bauteile aus DESIGN.md (eine Datei + .module.scss je Bauteil)
        ├── icons/               Linien-Icons als React-Komponenten (aus prototyp-v2 ui.js)
        ├── screens/
        │   ├── onboarding/      S-01 … S-04
        │   ├── learner/         S-10 … S-17 (inkl. Gruppen S-16, S-17)
        │   ├── applicant/       S-20 … S-23
        │   ├── tutor/           S-30 … S-37 (inkl. Gruppen S-35 … S-37)
        │   ├── lead/            S-40 … S-46   (eigenes Bündel, §15)
        │   ├── teacher/         S-50 … S-53   (eigenes Bündel, §15)
        │   └── common/          S-90 … S-98
        └── styles/
            ├── tokens.scss      CSS-Variablen aus DESIGN.md, gesetzt auf `.nhRoot`
            └── base.scss        Reset nur innerhalb von `.nhRoot`
```
Dateinamen: Komponenten `PascalCase.tsx`, sonst `camelCase.ts`. Ein Bildschirm = eine Datei, benannt nach Inhalt mit S-ID im Kopfkommentar (`// S-10 Finden`).

## 4. Schichten
```
screens → components → hooks → services (IDataService) → domain
                                         ↘ domain
```
- `domain/` importiert nichts aus anderen Ordnern. Alles dort ist mit Jest testbar.
- `screens/` und `components/` kennen nur `IDataService` (über Hooks), nie PnPjs oder `MockService` direkt.
- Nur `NachhilflyWebPart.ts` und `harness.tsx` entscheiden, welcher Dienst benutzt wird.
- Prüfungen in `rules.ts` werden **dreimal** genutzt: App (Knopf sperren, Hinweis), `MockService` (verhält sich wie der Flow), Unit-Tests. Der Flow setzt dieselbe Regel verbindlich um.

## 5. Datenschicht `IDataService`
```ts
// services/IDataService.ts  (Skizze, beim Bauen vervollständigen)
export interface Me { email: string; name: string; isLead: boolean; isTeacher: boolean; profile: Profile | null; application: Application | null; }

export interface IDataService {
  // Lesen (nur was die Person laut Rechten sehen darf; SharePoint filtert ohnehin)
  getMe(): Promise<Me>;
  getSettings(): Promise<Settings>;
  getTutorCards(): Promise<TutorCard[]>;                   // S-10
  getMyTutorings(): Promise<Tutoring[]>;                   // S-13, S-31, S-32
  getGroups(): Promise<Group[]>;                           // S-16, S-46 (alle sichtbaren)
  getMyGroupMemberships(): Promise<GroupMember[]>;         // S-13 (als Teilnehmende/r), S-36 (als Tutor: alle eigenen)
  getMyPendingInbox(): Promise<InboxItem[]>;               // offene Anträge nach Neustart
  getApplications(): Promise<Application[]>;              // nur lead/teacher
  getCaseNotes(): Promise<CaseNote[]>;                     // nur lead/teacher
  getReports(): Promise<Report[]>;                         // lead: nur Tutor/App, teacher: alle
  getStats(): Promise<Stats>;                              // lead/teacher
  getConsents(): Promise<Consent[]>;                       // teacher
  getProfiles(): Promise<Profile[]>;                       // teacher
  getLog(filter?: LogFilter): Promise<LogEntry[]>;         // teacher
  // Schreiben: genau eine Methode
  send<A extends ActionCode>(action: A, targetId: number | null, payload: PayloadOf<A>): Promise<SendResult>;
}
export type SendResult =
  | { ok: true; data?: Record<string, unknown> }
  | { ok: false; code: ErrorCode }          // E-xx aus TEXTE.md
  | { ok: 'slow'; inboxId: number };        // dauert länger, siehe §6
```
`PayloadOf<A>` ist ein Typ, der jeder Aktion ihr Payload-Schema aus DATENMODELL.md §5 zuordnet. So meldet TypeScript falsche Payloads schon beim Bauen.

## 6. Senden: der Weg über den Eingang
`SharePointService.send`:
1. Eintrag in `NhInbox` anlegen (`Title` = `Action` = Code, `TargetId`, `Payload` = `JSON.stringify`, `State = new`). ID merken.
2. Den eigenen Eintrag abfragen: alle 1,5 s in den ersten 10 s, danach alle 4 s.
3. `State = done` → `{ok:true, data: JSON.parse(ResultData)}`. `rejected` → `{ok:false, code: ResultCode}`. `error` → `{ok:false, code:'E-SERVER'}`.
4. Nach `SEND_SLOW_MS` (Standard 20 s, `config.ts`) ohne Ergebnis: `{ok:'slow'}`. Die App zeigt TEXTE.md `pending.slow`, merkt die ID lokal und fragt weiter im Hintergrund bis `SEND_GIVEUP_MS` (Standard 120 s). Beim nächsten Öffnen holt `getMyPendingInbox()` offene Anträge und zeigt ihr Ergebnis.
5. **Kinderschutz (A-51):** Der Flow löscht den Eintrag. „Eintrag nicht mehr gefunden“ gilt hier als Erfolg.
6. Während ein Antrag läuft: derselbe Knopf ist gesperrt (kein doppeltes Senden). Andere Bildschirme bleiben bedienbar.
7. Nach Erfolg: betroffene Daten neu laden (§7), dann Erfolgstext.

`useSend()` kapselt das für die Oberfläche: `const {send, busy} = useSend(); await send('request', cardId, payload, {success: 'ok.request'})` zeigt Toast „Wird verarbeitet …“ (S-98), danach Erfolg oder Fehlertext aus `texts.ts`. Bei Fehler bleiben Formulareingaben erhalten.

## 7. Laden, Zwischenspeicher, Aktualisieren
- Beim Öffnen parallel: `getMe()`, `getSettings()`. Danach nur die Daten der aktuellen Ansicht.
- `useData(key, loader)`: einfacher Speicher im Arbeitsspeicher pro Schlüssel (`cards`, `myTutorings` …) mit `reload(key)`. Kein externes Paket.
- Neu laden: nach eigenem `send` (betroffene Schlüssel), beim Zurückkehren in die App (`visibilitychange`), beim Tab-Wechsel wenn älter als 60 s. Kein Dauer-Abfragen.
- Während des Ladens: graue Platzhalter (S-95). Bei Fehler: S-94 mit „Erneut versuchen“.
- PnPjs: nur benötigte Spalten mit `.select(...)`, Personen mit `.expand('Tutor')`. Filter auf indizierte Spalten. Höchstens 500 Einträge pro Abfrage, sonst seitenweise.

## 8. Zustand der Oberfläche und Navigation
- Kein Router-Paket. `state.tsx` hält `{ view, tabByView, sheet: {name, data} | null, menu, toast }` per `useReducer`.
- Startansicht nach R-04 (`selectors.ts: startView(me, settings, lastViewLocal)`).
- Gemerkte Ansicht: lokal (`localStorage`, in `try/catch`) + Aktion A-04 (still, Fehler egal).
- Blätter (Sheets) liegen über dem Bildschirm, `Escape` schließt, Fokus geht beim Öffnen in das Blatt und beim Schließen zurück zum Auslöser.
- Tab-Leiste als eine Komponente mit `placement: 'bottom' | 'top'` (O-30), Wert aus `config.ts`.

## 9. Styles und Bauteile
- `tokens.scss` setzt alle Variablen aus DESIGN.md auf `.nhRoot` (nicht auf `:root`, damit SharePoint/Teams nichts überschreibt und wir nichts außerhalb verändern).
- Jede Komponente hat ein eigenes `.module.scss`. Nur Variablen benutzen, keine festen Farben.
- `base.scss`: `box-sizing`, Systemschrift, `-webkit-font-smoothing`, Fokus-Ring, `prefers-reduced-motion` – alles unter `.nhRoot`.
- Bauteile (je eine Komponente): `NavBar`, `TabBar`, `LargeTitle`, `SectionHeader`, `Row` (mit `SubjectBanner`, `Avatar`), `ListItem` (`.it`), `Group`, `SearchField`, `Chip`, `ChipMenu`, `Menu`, `Sheet`, `Button` (primary/secondary/danger, groß/Pille), `TextButton`, `Segmented`, `Switch`, `Checkbox`, `Stepper`, `TimeGrid`, `Pill`, `Note`, `Empty`, `Skeleton`, `Toast`, `Steps` (Fortschritt), `ProgressSteps` (Bewerbungsstatus), `AvatarPicker`, `Field` (Textfeld mit Zähler und Fehler).
- Vorbild für jedes Bauteil: die gleichnamige CSS-Klasse im Prototyp (`grep -n "^\.chip" referenz/prototyp-v2.html`). Maße aus DESIGN.md haben Vorrang.
- Icons: SVG-Pfade aus `NH.ui` im Prototyp (`/* js/ui.js */`) als React-Komponenten, `stroke-width 1.75`, `aria-hidden`.
- Schullogo: als Datei im Paket (`app/src/app/assets/`), importiert, kein externer Link. Die vorhandene Datei ist klein (200 × 138 px). Größere Datei oder SVG bei der Schule anfragen (O-14).

## 10. Teams und SharePoint
- **Manifest:** `supportedHosts: ["SharePointWebPart", "TeamsPersonalApp"]`, `supportsFullBleed: true`. Teams-App-Name „nachhilfly“, Beschreibung kurz, Symbole in `app/teams/`.
- **Website-Adresse:** In einer persönlichen Teams-App ist der SPFx-Kontext **nicht** unsere Website. Deshalb immer `spfi(config.SITE_URL).using(SPFx(this.context))`. Nie `this.context.pageContext.web.absoluteUrl` für Daten benutzen.
- **Wer bin ich:** `this.context.pageContext.user.email` und `loginName`. Gruppen: `sp.web.currentUser.groups()` auf unserer Website.
- **Klasse aus dem Konto** (O-12): Falls die Schule sie im Konto pflegt (z. B. `department`), über Microsoft Graph `me?$select=department`. Braucht eine API-Berechtigung in `package-solution.json` (`webApiPermissionRequests` für `User.Read`), die ADM im SharePoint-Admin-Center genehmigt. Erst bauen, wenn O-12 geklärt ist.
- **Teams-Chat öffnen:** Link `https://teams.microsoft.com/l/chat/0/0?users=<email>`. In Teams mit `this.context.sdks.microsoftTeams?.teamsJs.app.openLink(url)`, sonst `window.open`.
- **Teams-Design:** Die App bleibt hell, auch bei dunklem Teams (D-08). Hintergrund von `.nhRoot` immer `--nh-bg`.
- **Ganze Höhe:** In Teams füllt die App das Fenster. Scrollen nur im Inhaltsbereich, Navigations- und Tab-Leiste bleiben stehen (wie im Prototyp `.sc`).

## 11. Mock-Daten, Harness, Tests
- **MockService** baut die Logik aus `referenz/prototyp-v2.html` Abschnitt `/* js/service.js */` nach, aber mit den Typen, Aktionscodes und Fehlercodes dieser Doku und mit `rules.ts`. Antwortzeit künstlich 300–900 ms, damit „Wird verarbeitet“ sichtbar ist. Schalter `?slow=1` simuliert 25 s (Test für §6 Punkt 4).
- **Abweichungen vom Prototyp** (docs/ gilt): Ort frei mit `elsewhere` (D-25), keine Klassengrenze für Tutoren (D-26, im Prototyp-`service.js` steht noch `lvl(u.klasse) >= lvl(tutor)`), Gruppen (D-27, im Prototyp nicht vorhanden).
- **mockSeed.ts:** dieselben erfundenen Personen wie im Prototyp, dazu 3 erfundene Gruppen (Jonas: „Klassenarbeit Bruchrechnung“, 1 Termin, Ben angemeldet; Mira: „Englisch Simple Past“, 3 Termine; Lina: eine volle Gruppe) (Nils, Lea, Ben, Paul, Jonas, Mira, Frau Keller + weitere). Keine echten Namen.
- **Harness** (`npm run harness`): esbuild bündelt `harness.tsx` (App + MockService + Rollenwahl) zu `harness/dist/index.html`. Funktioniert ohne Internet und ohne SharePoint. Damit testet Claude jede Änderung selbst.
- **Unit-Tests** (`npm test`): `rules.ts` (jede Regel mindestens ein erlaubter und ein verbotener Fall), `dates.ts`, `selectors.ts`.
  Pflicht-Testfälle für `addSchoolDays` (R-92), Ferien `[{"from":"2026-12-23","to":"2027-01-09"}]`:
  | Start | n | Ergebnis |
  |---|---|---|
  | Mo 2026-11-02 | 3 | Do 2026-11-05 |
  | Do 2026-11-05 | 3 | Di 2026-11-10 |
  | Mo 2026-12-21 | 3 | Di 2027-01-12 |
  | Sa 2026-11-07 | 1 | Mo 2026-11-09 |
- **Klick-Tests** (`npm run test:ui`): je Rolle ein Durchlauf wie im Prototyp-Test (Anfrage senden, annehmen, Stunde eintragen, bestätigen, Gruppe anbieten, mitmachen, Termin eintragen und bestätigen, Bewerbung, Leitung entscheidet, Lehrkraft trägt Einwilligung ein, Not-Aus). Prüft: keine Konsolen-Fehler, kein seitliches Scrollen bei 390 px, Screenshots in `tests/ui/shots/` (nicht im Git).

## 12. Debuggen mit SharePoint
1. Im Ordner `app/`: `heft start`. Beim ersten Mal vorher `heft trust-dev-cert`.
2. Eine Seite auf der **Testseite** öffnen, auf der der Webpart liegt. Den Debug-Link gibt `heft start` aus bzw. die SPFx-Debug-Leiste (Workbench gibt es ab 1.12.2026 nicht mehr).
3. Der Code läuft lokal, Daten kommen aus den Testlisten. Echte Daten gibt es auf der Testseite nie.

## 13. Bauen, Ausliefern, Updates
1. Version erhöhen: `config/package-solution.json` → `solution.version` (z. B. `1.0.3.0`). Wenn sich Teams-Name, -Symbol oder -Rechte ändern, zusätzlich die Teams-Manifest-Version.
2. `heft build --production` und `heft package-solution --production` → `sharepoint/solution/nachhilfly.sppkg`.
3. **Test:** Paket in den App-Katalog der Testseite hochladen (Subi, T-0.4), ausprobieren.
4. **Echt:** ADM lädt das Paket in den App-Katalog der Schule, „Bereitstellen“. Beim allerersten Mal „Mit Teams synchronisieren“ und im Teams Admin Center freigeben und anheften (T-10.x). Reine Code-Updates brauchen keine neue Teams-Freigabe, solange sich das Teams-Manifest nicht ändert (im Technik-Test bestätigen, O-33).
5. Feste Update-Termine alle 2 Wochen (D-16). Jede Version bekommt einen Git-Tag `v1.0.3`.

## 14. Fehlerbehandlung
| Fall | Verhalten |
|---|---|
| Laden scheitert (Netz, 5xx) | S-94 mit „Erneut versuchen“, Daten der letzten erfolgreichen Abfrage bleiben sichtbar, wenn vorhanden |
| 403 beim Lesen | Person hat kein Recht (z. B. noch keine Einzelrechte): leise als „leer“ behandeln und einmal nach 3 s neu laden |
| Senden: Eintrag anlegen scheitert | Toast `E-NETWORK`, Eingaben bleiben |
| Senden: `rejected` | Toast mit Text zum Fehlercode, Eingaben bleiben, Daten neu laden |
| Senden: `error` | Toast `E-SERVER` |
| Unbekannter Fehlercode | Toast `E-SERVER`, Code in die Konsole |
| JavaScript-Fehler in einem Bildschirm | React-Fehlergrenze um jeden Bildschirm: „Da ist etwas schiefgegangen“ + „Neu laden“ |

## 15. Leistung und Barrierefreiheit
- Bündel für Lernende klein halten: `lead/` und `teacher/` per `import()` nachladen.
- Listen mit mehr als 50 Zeilen: nur sichtbare rendern oder „Mehr anzeigen“.
- Keine Animation ohne Zweck. `prefers-reduced-motion` schaltet Übergänge praktisch aus.
- WCAG 2.2 AA: Kontrast ≥ 4,5 : 1 für Text, Fokus sichtbar, alle Knöpfe mit Namen, Blätter als `role="dialog"` mit `aria-modal`, Menüs mit `role="menu"`, Schalter mit `role="switch"`, Text-Zoom bis 200 % ohne Abschneiden, Touch-Ziele ≥ 44 px.
