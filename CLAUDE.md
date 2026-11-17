# nachhilfly – Arbeitsanweisung für Claude

Diese Datei liest du in jeder Sitzung zuerst. Sie ist kurz gehalten. Alles andere liest du nur, wenn die Aufgabe es braucht (siehe Wegweiser).

## Das Projekt in 6 Sätzen
- nachhilfly ist die Nachhilfe-Börse der SMV am Evangelischen Heidehof-Gymnasium Stuttgart: Schüler finden bestätigte Schüler-Tutoren, fragen an, Tutoren tragen Stunden ein, beide bestätigen.
- Gebaut wird ein **SPFx-Webpart (SPFx 1.24, React, TypeScript)**, der als **persönliche Teams-App** läuft. Daten liegen in **SharePoint-Listen** auf der nachhilfly-Website der Schule.
- **Die App schreibt nur in eine einzige Liste: `NhInbox` (Eingang).** Power-Automate-Abläufe unter einem Funktionskonto prüfen jeden Antrag und schreiben in die geschützten Listen.
- Vorbild für Aussehen und Verhalten ist `referenz/prototyp-v2.html` (im Browser öffnen, Rollen links wählen). Er ist fertig abgestimmt. Nachbauen, nicht neu erfinden. **Seit dem Prototyp geändert** (hier gilt `docs/`): Ort frei inkl. zuhause (D-25), keine Klassengrenze für Tutoren (D-26), Gruppennachhilfe (D-27, kein Vorbild im Prototyp: aus vorhandenen Bauteilen bauen und Subi vorher einen Screenshot zeigen).
- Projektleiter ist **Subi** (Schüler, Einsteiger beim Programmieren). Er entscheidet, testet und gibt Aufträge. Du schreibst Code, Skripte, Anleitungen.
- Alle Freigaben (Schulleitung, Datenschutz, IT) liegen vor. Offene Detailfragen stehen in `docs/ENTSCHEIDUNGEN.md`.

## Wegweiser: Was steht wo?
Lies nur die Datei bzw. den Abschnitt, den deine Aufgabe braucht. Jede Datei hat oben ein Inhaltsverzeichnis. Suche nach IDs mit grep (z. B. `grep -n "R-41" docs/*.md`).

| Frage | Datei | IDs |
|---|---|---|
| Was ist als Nächstes zu tun? | `TODO.md` | T-x.y |
| Wie funktioniert die App fachlich (Rollen, Zustände, Bildschirme, Abläufe)? | `docs/SPEC.md` | S-xx (Bildschirme), Z- (Zustände) |
| Welche Regel gilt genau? | `docs/REGELN.md` | R-xx |
| Welche Listen, Spalten, Rechte? Welche Aktionen gibt es im Eingang? | `docs/DATENMODELL.md` | L-xx (Listen), A-xx (Aktionen) |
| Was macht welcher Power-Automate-Ablauf? | `docs/FLOWS.md` | F-xx |
| Wie ist der Code aufgebaut, welche Technik, welche Befehle? | `docs/ARCHITEKTUR.md` | – |
| Farben, Abstände, Bauteile, Bewegung | `docs/DESIGN.md` | – |
| Exakte Texte in der App, Fehlermeldungen | `docs/TEXTE.md` | E-xx (Fehlercodes) |
| Was ist entschieden, was ist offen? | `docs/ENTSCHEIDUNGEN.md` | D-xx (entschieden), O-xx (offen) |
| PC einrichten, IT-Aufgaben | `docs/SETUP.md` | – |
| Produkt-Kontext für Design-Skills (impeccable) | `referenz/PRODUCT.md` | – |

**Eine Wahrheit pro Thema.** Jede Regel steht nur in REGELN.md, jede Spalte nur in DATENMODELL.md, jeder Text nur in TEXTE.md. Andere Dateien verweisen per ID. Wenn sich etwas ändert, änderst du zuerst die Doku-Datei, dann den Code.

## Ablauf jeder Sitzung
1. `TODO.md` öffnen: Abschnitt **„Jetzt“** und die erste offene Aufgabe `[ ]` lesen.
2. Nur die Abschnitte lesen, die bei der Aufgabe unter **„Lesen“** stehen.
3. Subi in 3 bis 6 Zeilen sagen, was du vorhast. Bei einer offenen Frage (O-xx) oder einem Widerspruch: kurz fragen. Sonst loslegen.
4. In kleinen Schritten umsetzen. Nach jedem Schritt bauen und testen (Befehle siehe unten).
5. **Fertig-Check** (siehe unten) durchgehen.
6. In `TODO.md` abhaken `[x]`, unter „Jetzt“ eine Zeile Notiz für die nächste Sitzung schreiben, mit Git speichern (`git add -A && git commit -m "T-x.y: ..."`).
7. Subi in 2 bis 4 Zeilen sagen, was fertig ist und was er testen soll.

Befehle `/naechster-schritt`, `/pruefen`, `/flow-anleitung F-xx`, `/fortschritt` gibt es in `.claude/commands/`.

## Harte Regeln (nie brechen)
1. **Keine echten Schülerdaten.** Nur erfundene Testdaten (Namen wie im Prototyp). Nie echte Namen, E-Mails oder Klassen in Code, Tests, Screenshots oder Git.
2. **Die App schreibt nur in `NhInbox`.** Kein direkter Schreibzugriff auf andere Listen, auch nicht „nur kurz zum Testen“. Lesen geht über `IDataService`.
3. **Wer etwas tut, bestimmt der Ablauf aus „Erstellt von“ des Eingang-Eintrags**, nie aus Feldern im Payload.
4. **Alles wird gebündelt.** Keine externen Skripte, CDNs, Web-Fonts, Bilder-URLs. SharePoint blockiert sie (CSP). Keine Inline-Skripte.
5. **Aussehen nur mit den Tokens aus `docs/DESIGN.md`.** Kein Fluent UI für sichtbare Bauteile, keine neuen Farben, keine Emojis, kein dunkles Design.
6. **Texte nur aus `app/src/app/texts.ts`**, und die kommen aus `docs/TEXTE.md`. Neue Texte zuerst in TEXTE.md eintragen. App-Sprache: Deutsch, „du“ (Lehrkraft-Bereich: „Sie“).
7. **Jede fachliche Regel bekommt ihre ID im Code-Kommentar** (`// R-41`). Regel ändern = zuerst REGELN.md ändern.
8. **Werte mit „Vorschlag“ (O-xx) sind Einstellungen, nicht fest im Code.** Standardwert aus ENTSCHEIDUNGEN.md nehmen.
9. **Keine Premium-Bausteine in Power Automate** (kosten Geld). Nur Standard-Konnektoren: SharePoint, Office 365 Outlook, Microsoft Teams, Integrierte Aktionen.
10. **Versionen nicht von Hand hochsetzen.** SPFx-Updates nur mit `npx -p @pnp/cli-microsoft365@latest m365 spfx project upgrade --output md`. Keine neuen npm-Pakete ohne Rückfrage bei Subi.
11. **`referenz/` nie ändern.** Das ist das abgenommene Vorbild.
12. **Keine Geheimnisse ins Repo** (Passwörter, Tokens, E-Mail-Adressen echter Personen). Die Website-Adresse steht in `app/src/config.ts`, das ist erlaubt.
13. **Kosten immer ansagen.** Wenn etwas Geld kosten könnte (Lizenz, Abo, Premium, Nutzungslimit), sag es Subi ausdrücklich, bevor du es vorschlägst.

## Begriffe: Deutsch (App) → Code
| App / Doku | Code | | App / Doku | Code |
|---|---|---|---|---|
| Nachhilfe-Nehmende/r | `learner` | | Nachhilfe (Beziehung) | `tutoring` |
| Tutor | `tutor` | | Anfrage (= Nachhilfe im Zustand offen) | `tutoring` mit `state: 'open'` |
| Bewerber/in | `applicant` | | Stunde | `lesson` |
| Leitungsteam | `lead` | | Steckbrief | `tutorCard` |
| Lehrkraft | `teacher` | | Bewerbung / Tutor-Akte | `application` |
| Eingang | `inbox` | | Meldung | `report` |
| Einwilligung (Eltern) | `consent` | | Protokoll | `log` |
| Einstellungen | `settings` | | Zahlen | `stats` |
| Fach (Kürzel Ma, En …) | `subject` | | Anliegen | `concern` |
| Klasse | `grade` | | Stufen (5-6, 7-8 …) | `gradeBands` |
| Aussetzen / Sperren | `suspend` / `ban` | | Befangen | `conflict` |
| Gruppe (Angebot) | `group` | | Gruppen-Teilnahme | `groupMember` |
| Gruppen-Termin | `session` | | Anwesenheit | `attendance` |
| in der Schule / online / anderer Ort | `school` / `online` / `elsewhere` | | Anmeldeschluss | `signupUntil` |
| Wird verarbeitet | `pending` | | Ablauf (Power Automate) | Flow, `F-xx` |

Zustandsnamen im Code: siehe SPEC.md §Zustände (englische Schlüssel, z. B. `trial`, `running`).

## Befehle (im Ordner `app/`)
| Zweck | Befehl |
|---|---|
| Umgebung prüfen | `npx -p @pnp/cli-microsoft365@latest m365 spfx doctor` |
| Entwickeln mit SharePoint (Debug-Leiste) | `heft start` (dann Testseite mit Debug-Link öffnen, siehe ARCHITEKTUR.md §Debuggen) |
| Ohne SharePoint testen (Testseite mit Mock-Daten) | `npm run harness` → `harness/dist/index.html` |
| Unit-Tests (Regeln, Datum) | `npm test` |
| Klick-Tests mit Screenshots | `npm run test:ui` |
| Paket bauen | `heft build --production && heft package-solution --production` → `app/sharepoint/solution/nachhilfly.sppkg` |

Die genauen Skriptnamen legt Aufgabe T-1.1/T-1.4 fest. Wenn sie abweichen, trag sie hier ein. Heft immer als `npx heft …` aufrufen (Projektversion statt globaler).

## Fertig-Check (Definition of Done)
- [ ] Baut ohne Fehler und ohne neue Warnungen. Unit-Tests grün.
- [ ] Im Harness auf 390 px Breite angesehen (Screenshot), sieht aus wie im Prototyp, kein seitliches Scrollen.
- [ ] Alle Zustände da: Laden (graue Platzhalter), leer, Fehler, „Wird verarbeitet“.
- [ ] Texte aus `texts.ts`. Regeln mit R-ID kommentiert.
- [ ] Bedienbar mit Tastatur, Knöpfe haben Beschriftung (`aria-label`), Touch-Ziele ≥ 44 px, Kontrast passt.
- [ ] Keine Daten von Nehmenden in Ansichten des Leitungsteams (R-36).
- [ ] TODO.md abgehakt, Git-Commit gemacht.

## Wie du mit Subi sprichst
- Deutsch, einfach, kurze Sätze. Fachwörter beim ersten Mal in Klammern erklären.
- Erst das Ergebnis, dann Details. Keine langen Berichte über deine Arbeitsschritte.
- Wenn Subi etwas in SharePoint, Teams oder Power Automate klicken muss: nummerierte Schritte mit genauen Namen der Knöpfe.
- Wenn du etwas nicht weißt (z. B. wie es auf dem echten Handy aussieht): sag es, statt zu raten.

## Sparsam arbeiten
- Nicht die ganze Doku lesen. Nur die genannten Abschnitte, per grep nach IDs springen.
- `referenz/prototyp-v2.html` ist groß (~160 KB). Nicht komplett lesen: gezielt mit grep suchen (z. B. `grep -n "A.sheets.request" referenz/prototyp-v2.html`) und nur die Treffer-Zeilen lesen. Die Geschäftslogik steht im Abschnitt `/* js/service.js */`.
- Große Ausgaben (Build-Logs, Testläufe) auf Fehler filtern statt komplett anzeigen.
- Nicht ungefragt umbauen, was schon fertig und getestet ist.
