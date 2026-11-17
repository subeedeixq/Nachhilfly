# TODO – Aufgaben in kleinen Schritten

**So benutzen:** Immer die erste offene Aufgabe `[ ]` der aktuellen Phase nehmen (oder `/naechster-schritt`). Pro Sitzung ein bis drei Aufgaben. Nach jeder Aufgabe abhaken, Notiz unter „Jetzt“, Git-Commit.
**Wer:** 🧑 Subi · 🤖 Claude · 🏫 IT/Schule. **Lesen:** nur diese Abschnitte lesen. **Fertig wenn:** Abnahme-Kriterium.
Phasen 3 und 7 (Listen, Flows) können parallel zu 4–6 laufen, sobald Phase 2 durch ist.

## Jetzt
- Stand: Starter-Kit angelegt (15.11.2026), ergänzt am selben Tag: Ort frei (D-25), keine Klassengrenze (D-26), Gruppennachhilfe (D-27). Nächste Aufgabe: T-0.3 (Mail an Frau Hilchentwort verschickt 17.11.2026, Antwort und Adresse der Team-Website abwarten). T-0.5 wartet auf große Logo-Datei von Subi (O-14).
- Notizen der letzten Sitzung: T-1.2 erledigt (17.11.2026): `domain/types.ts`, `domain/constants.ts` (inkl. DEFAULT_SETTINGS, STATE_PILL), `app/texts.ts` (alle TEXTE.md-Texte, `fmt()`). TEXTE.md: `report.kindN` → `report.kindN.label`. Offen für Subi: Texte mit „betreuende Lehrkraft“ (reg.finish.parents.text, pause.text) passen nach D-28 evtl. nicht mehr; Z-3 `quit` hat keinen Anzeigetext. Weiter mit T-1.3.

---

## Phase 0 – Vorbereitung (Subi + IT, ohne Code)
- [x] **T-0.1** 🧑🤖 Offene Punkte durchgehen. Lesen: ENTSCHEIDUNGEN.md §1, §3. Tun: Claude fragt Subi Punkt für Punkt, was bei den Freigaben schon entschieden wurde, und trägt Ergebnisse ein. Fertig wenn: jede O-Zeile hat ein Ergebnis oder „offen, Standard gilt“.
- [x] **T-0.2** 🧑🤖 Computer einrichten. Lesen: SETUP.md §1–§5. Fertig wenn: `m365 spfx doctor` ohne Fehler, `claude` startet im Projekt, Git-Repo auf GitHub (privat) mit erstem Commit.
- [ ] **T-0.3** 🏫 Testseite, App-Katalog, Gruppen, Testkonten, Funktionskonto. Lesen: SETUP.md §6. Tun: Claude schreibt Subi eine kurze Mail an Frau Hilchentwort mit der Checkliste. Fertig wenn: Testseiten-Adresse in `app/src/config.ts` (nach T-1.1) bzw. hier notiert, Testkonten vorhanden.
- [ ] **T-0.4** 🧑 Auf der Testseite eine leere Seite „App“ anlegen (dort kommt später der Webpart drauf) und prüfen, dass Subi Dateien in den App-Katalog der Testseite hochladen darf.
- [ ] **T-0.5** 🤖 Logo vorbereiten: aus `referenz/schullogo.jpg` Teams-Symbole (192 × 192 farbig, 32 × 32 Umriss weiß/transparent) und App-Logo erzeugen. Wenn die Datei zu klein ist (sie ist 200 × 138 px): Subi um SVG/große PNG bitten (O-14). Fertig wenn: Dateien liegen bereit für T-1.1.

## Phase 1 – Grundgerüst (lokal, ohne SharePoint)
- [x] **T-1.1** 🤖 SPFx-Projekt anlegen. Lesen: ARCHITEKTUR.md §1–§3, §10. Tun: in `app/` mit dem Generator (nicht interaktiv): Lösung `nachhilfly`, Webpart `Nachhilfly`, Vorlage React. `.nvmrc`, `strict`, `supportedHosts` (TeamsPersonalApp, SharePointWebPart), `supportsFullBleed`. `config.ts` mit `SITE_URL` (Testseite), Listennamen, Zeitgrenzen, `TABBAR_PLACEMENT`. Fertig wenn: `heft build` grün, Projekt in Git (ohne `node_modules`, `lib`, `temp`, `dist`, `sharepoint/solution`).
- [x] **T-1.2** 🤖 Domain: Typen, Konstanten, Texte. Lesen: SPEC.md §2, DATENMODELL.md §5–§6, TEXTE.md (komplett, einmalig). Tun: `domain/types.ts` (alle Zustände Z-1…Z-7, Aktionscodes, `PayloadOf<A>`, Fehlercodes), `domain/constants.ts`, `app/texts.ts` (alle Texte aus TEXTE.md). Fertig wenn: baut, jeder Text aus TEXTE.md hat einen Schlüssel.
- [ ] **T-1.3** 🤖 Regeln und Datum. Lesen: REGELN.md, ARCHITEKTUR.md §11. Tun: `domain/rules.ts` (alle Prüfungen, die die App vorab machen kann, mit R-IDs), `domain/dates.ts` (`addSchoolDays`, `isSchoolDay`, Anzeigeformat „Di, 3.11.“), `domain/selectors.ts` (`startView` R-04, freie Plätze, Badge-Zahlen). Jest-Tests inkl. Pflicht-Testfälle. Fertig wenn: `npm test` grün.
- [ ] **T-1.4** 🤖 Mock-Dienst und Harness. Lesen: ARCHITEKTUR.md §5, §6, §11; Prototyp `/* js/data.js */` und `/* js/service.js */` (per grep). Tun: `IDataService`, `mockSeed.ts`, `MockService.ts` (alle Aktionen A-xx wie die Flows, mit `rules.ts`), Harness mit Rollenwahl wie im Prototyp, Skripte `npm run harness`, `npm test`, `npm run test:ui` in `package.json`. Fertig wenn: Harness öffnet sich im Browser und zeigt für jede Persona einen Platzhalter-Bildschirm mit ihrem Namen und ihrer Startansicht.
- [ ] **T-1.5** 🤖 Styles und Grund-Bauteile. Lesen: DESIGN.md (komplett), ARCHITEKTUR.md §9. Tun: `tokens.scss`, `base.scss`, Icons, Bauteile `NavBar`, `TabBar` (bottom/top), `LargeTitle`, `SectionHeader`, `Group`, `ListItem`, `Button`, `Pill`, `Note`, `Empty`, `Skeleton`, `Toast`. Eine Bauteil-Übersichtsseite im Harness (`?page=bauteile`). Fertig wenn: Screenshot der Übersicht sieht aus wie die Teile im Prototyp.
- [ ] **T-1.6** 🤖 Weitere Bauteile. Lesen: DESIGN.md §5. Tun: `Row` + `SubjectBanner` + `Avatar`, `SearchField`, `Chip`, `Menu`, `Sheet`, `Segmented`, `Switch`, `Checkbox`, `Stepper`, `TimeGrid`, `Steps`, `ProgressSteps`, `AvatarPicker`, `Field`. Fertig wenn: alle auf der Übersichtsseite, mit Tastatur bedienbar, Blatt/Menü mit Animation.
- [ ] **T-1.7** 🤖 App-Rahmen. Lesen: SPEC.md §3, ARCHITEKTUR.md §6–§8, §14. Tun: `App.tsx`, `state.tsx`, Hooks `useMe`, `useData`, `useSend`, `useSettings`, Rollenwechsel, Pause-Bildschirm S-90, Fehlerbildschirme S-94/S-95, Fehlergrenze, Toast „Wird verarbeitet“ S-98. Fertig wenn: im Harness wechselt jede Persona in die richtige Ansicht mit leeren Tabs, Not-Aus zeigt S-90.

## Phase 2 – Technik-Test live (Teams auf echten Handys)
Ziel: früh wissen, ob Teams, Listen und Flows so funktionieren wie geplant. Nur ein Bildschirm, nur eine Aktion.
- [ ] **T-2.1** 🤖 Finden-Bildschirm S-10 und Steckbrief S-11 (Ansicht) mit Mock-Daten. Lesen: SPEC.md §5 (S-10, S-11), REGELN.md R-40, R-48, R-49. Fertig wenn: im Harness wie im Prototyp (Screenshot-Vergleich mit Persona Ben).
- [ ] **T-2.2** 🧑🤖 Testliste `NhTutorCards` und `NhInbox` von Hand auf der Testseite anlegen (Claude gibt Klick-Anleitung mit Spalten aus DATENMODELL.md L-01, L-06), 5 erfundene Steckbriefe eintragen. Fertig wenn: Listen da, Einträge sichtbar.
- [ ] **T-2.3** 🤖 `SharePointService` nur für `getMe`, `getSettings` (Standardwerte, wenn Liste fehlt), `getTutorCards`, `send` (Eingang + Abfragen). Lesen: ARCHITEKTUR.md §5–§7, §10. Fertig wenn: baut; mit `heft start` zeigt die Testseite die 5 Steckbriefe.
- [ ] **T-2.4** 🧑🤖 Test-Flow „F-00 Echo“: Trigger Eingang, setzt `State = done` nach 1 Sekunde. Claude schreibt die Klick-Anleitung. Fertig wenn: Knopf im Steckbrief (nur Testversion) zeigt „Wird verarbeitet“ → „Gespeichert“. **Zeit messen** → O-32.
- [ ] **T-2.5** 🧑🏫 Paket bauen, in den App-Katalog der Testseite laden, als Teams-App testweise installieren (Frau Hilchentwort). Auf iPhone, Android und PC in Teams öffnen. Prüfen und in ENTSCHEIDUNGEN.md eintragen: O-30 (Leiste unten/oben), Schrift, Logo, Scrollen, O-33, O-12 (wenn möglich), O-21 (eine Testnachricht vom Flow-Bot). Fertig wenn: Ergebnisse eingetragen, Screenshots von den Handys im Team-Ordner.
- [ ] **T-2.6** 🤖 Anpassungen aus dem Test (z. B. Tab-Leiste oben). Fertig wenn: Subi ist auf dem echten Handy zufrieden.

## Phase 3 – Listen und Rechte (Testseite)
- [ ] **T-3.1** 🤖 Einrichtungs-Werkzeug: Zweiter Webpart „nachhilfly Einrichtung“ (nur für Website-Besitzer sichtbar), der alle Listen L-01…L-14 mit Spalten, Indizes und Listeneinstellungen aus einer Schema-Datei (`app/src/setup/schema.ts`, erzeugt aus DATENMODELL.md §3) anlegt oder ergänzt. Mehrmals ausführbar ohne Schaden. Grund: braucht keine extra App-Registrierung, läuft mit Subis Besitzer-Rechten auf der Testseite. Lesen: DATENMODELL.md §2–§3. Fertig wenn: auf der Testseite ein Klick legt alle Listen an; zweiter Klick ändert nichts.
- [ ] **T-3.2** 🤖 Rechte setzen im Einrichtungs-Werkzeug: Vererbung der Listen brechen, Gruppenrechte nach DATENMODELL.md §2 (inkl. ReadSecurity/WriteSecurity für L-01). Fertig wenn: mit Testkonto „Fünftklässler“ geprüft: sieht L-06, sieht L-03/L-05/L-07 leer, kann in L-01 schreiben, sieht nur eigene L-01-Einträge.
- [ ] **T-3.3** 🤖 Testdaten-Knopf im Einrichtungs-Werkzeug: füllt die Testseite mit den erfundenen Daten aus `mockSeed.ts` (nur Testseite! Prüft die Adresse). Fertig wenn: Daten da, Einzelrechte gesetzt.
- [ ] **T-3.4** 🤖 `NhSettings` mit Standardwerten aus ENTSCHEIDUNGEN.md §4 füllen (im Einrichtungs-Werkzeug). Fertig wenn: alle Schlüssel vorhanden.

## Phase 4 – Bildschirme Nachhilfe-Nehmende (Harness zuerst, dann Testseite)
- [ ] **T-4.1** 🤖 Willkommen und Registrierung S-01…S-04. Lesen: SPEC.md §4, REGELN.md R-10…R-15, TEXTE.md §2–§3. Fertig wenn: Persona Nils kommt als Nehmender und als Tutor-Bewerber durch, Klasse 5–8 sieht Eltern-Hinweis.
- [ ] **T-4.2** 🤖 Finden vollständig: Suche, Filter-Chips mit Menüs, Sortierung, ausgegraut, Leerzustände, Ferien- und Eingeschränkt-Hinweis. Lesen: SPEC.md S-10, REGELN.md R-40…R-49. Fertig wenn: Klick-Test „filtern, zurücksetzen“ grün.
- [ ] **T-4.3** 🤖 Steckbrief-Blatt S-11 komplett + Anfrage-Blatt S-12 mit Feldfehlern. Lesen: SPEC.md S-11, S-12, R-40…R-47. Fertig wenn: leere Anfrage zeigt Fehler am Feld, volle Anfrage → „Wird verarbeitet“ → Erfolg; E-FULL/E-DUPLICATE/E-TOO-MANY im Mock auslösbar.
- [ ] **T-4.4** 🤖 Meine Nachhilfe S-13 + Nachhilfe-Blatt S-14 (bestätigen, bestreiten, Weitermachen, zurückziehen, beenden, Kontakt, Rückmeldung). Lesen: SPEC.md S-13, S-14, §11, R-50…R-57. Fertig wenn: Kette aus SPEC §11 im Harness komplett durchspielbar (zusammen mit Tutor-Ansicht ab T-5.3, bis dahin über Mock-Knöpfe).
- [ ] **T-4.5** 🤖 Profil S-15, Avatar ändern, Rollenwechsel, Tutor werden, Verlassen. Fertig wenn: Verlassen beendet im Mock alles (R-14).
- [ ] **T-4.6** 🤖 Hilfe und Melden S-92/S-93, Regeln S-96, Datenschutz S-97. Lesen: SPEC.md §10, R-70…R-74. Fertig wenn: beide Meldearten im Mock; Kinderschutz-Meldung landet nirgends sichtbar.
- [ ] **T-4.7** 🤖 Gruppen für Nehmende: Umschalter in Finden, Liste S-16, Blatt S-17 (Mitmachen/Abmelden), „Meine Gruppen“ und Termin bestätigen in S-13. Vorher Entwurf als Harness-Screenshot an Subi (kein Vorbild im Prototyp). Lesen: SPEC.md §11b, S-16, S-17, REGELN.md R-100…R-114, TEXTE.md §12, DESIGN.md Gruppen-Zeile. Fertig wenn: Ben meldet sich bei einer Gruppe an und ab; volle Gruppe zeigt E-FULL; Lea (eingeschränkt) sieht gesperrten Knopf mit Grund.

## Phase 5 – Bewerber und Tutor
- [ ] **T-5.1** 🤖 Bewerbungs-Assistent S-20 (6 Schritte, Vorschau, Eingaben bleiben). Lesen: SPEC.md S-20, R-20…R-26, TEXTE.md §4. Fertig wenn: Persona Nils kann sich bewerben, Fehler am Feld bei R-23/R-24/R-25.
- [ ] **T-5.2** 🤖 Status S-21, Lehrmethoden S-22, Steckbrief-Vorschau S-23 (Sperre R-22), Einspruch, Zurückziehen. Fertig wenn: Persona Paul wie im Prototyp.
- [ ] **T-5.3** 🤖 Tutor-Übersicht S-30 und Anfragen S-31 (annehmen, ablehnen mit Grund, voll). Lesen: SPEC.md S-30, S-31, R-46, R-60, R-63. Fertig wenn: Persona Jonas wie im Prototyp, Annehmen bis voll.
- [ ] **T-5.4** 🤖 Schüler S-32 und Stunde eintragen S-33. Lesen: R-50…R-55. Fertig wenn: Probestunde → Weitermachen-Frage bei beiden.
- [ ] **T-5.5** 🤖 Tutor-Steckbrief S-34 (sofort ändern, Änderung beantragen, Pause, Aufhören). Lesen: R-60…R-65. Fertig wenn: Änderung beantragt zeigt Hinweis, alte Version bleibt in Finden.
- [ ] **T-5.6** 🤖 Gruppen für Tutoren: „Gruppe anbieten“ S-35 (3 Schritte), Verwalten S-36 (Teilnehmende, Gruppen-Chat, absagen), Termin eintragen S-37, Abschnitt in S-32. Lesen: SPEC.md §11b, S-30, S-32, S-35…S-37, R-100…R-114. Fertig wenn: im Harness ganze Kette aus SPEC §11b mit Jonas und Ben durchspielbar; nach der ersten Anmeldung sind gesperrte Felder mit Schloss.

## Phase 6 – Leitungsteam und Lehrkraft
- [ ] **T-6.1** 🤖 Leitung: Bewerbungen S-40/S-41 mit Leitfaden, Vier-Augen-Regeln sichtbar (ausgegraut mit Grund). Lesen: SPEC.md §8, R-30…R-37. Fertig wenn: Persona Mira kann nicht über Tims Einspruch entscheiden; Ablehnen ohne Grund geht nicht.
- [ ] **T-6.2** 🤖 Leitung: Tutoren S-42/S-43 (Aussetzen, Aufheben, Sperre beantragen, Änderung freigeben, Abzeichen). Fertig wenn: Sperre braucht 2 Stimmen.
- [ ] **T-6.3** 🤖 Leitung: Meldungen S-44 und Zahlen S-45. **Prüfen: nirgends Namen oder Klassen von Nehmenden (R-36).** Fertig wenn: Klick-Test sucht im Leitungs-Bereich nach den Namen aller Mock-Nehmenden und findet keinen.
- [ ] **T-6.4** 🤖 Lehrkraft: Einwilligungen S-50, Meldungen S-51, Protokoll S-52, Einstellungen S-53 inkl. Ferienkalender und Not-Aus. Sie-Form. Fertig wenn: Persona Frau Keller wie im Prototyp, Not-Aus wirkt auf alle anderen Personas.
- [ ] **T-6.5** 🤖 Nachladen von Leitung/Lehrkraft-Bündeln (ARCHITEKTUR.md §15). Fertig wenn: Bündelgröße für Lernende notiert und kleiner als vorher.
- [ ] **T-6.6** 🤖 Leitung: Gruppen S-46 mit „Ausblenden“. Lesen: SPEC.md S-46, R-111, R-112. Fertig wenn: keine Teilnehmer-Namen im Leitungs-Bereich (Klick-Test aus T-6.3 erweitern).

## Phase 7 – Flows (Testseite, Klick-Anleitungen von Claude, Bau durch Subi)
Für jeden Flow: `/flow-anleitung F-xx` → Anleitung + Testtabelle in `flows/anleitungen/F-xx.md` → Subi baut → gemeinsam testen mit Testkonten → Export in den Team-Ordner (D-23).
- [ ] **T-7.0** 🤖 Baustein-Vorlage: Flow „F-99 Vorlage“ mit B-KOPF, Versuch/Fehler-Bereichen, B-ENDE, B-ABLEHNEN, B-FEHLER. Alle weiteren Flows starten als Kopie davon. Lesen: FLOWS.md §1–§2.
- [ ] **T-7.1** F-90 Versand + F-91 Plätze zählen
- [ ] **T-7.2** F-01 Profil
- [ ] **T-7.3** F-02 Bewerbung
- [ ] **T-7.4** F-08 Leitung Bewerbungen
- [ ] **T-7.5** F-03 Anfrage
- [ ] **T-7.6** F-04 Antwort des Tutors
- [ ] **T-7.7** F-05 Stunden
- [ ] **T-7.8** F-06 Verlauf
- [ ] **T-7.9** F-07 Tutor selbst
- [ ] **T-7.10** F-09 Leitung Tutoren
- [ ] **T-7.11** F-10 Meldungen + F-11 Kinderschutz
- [ ] **T-7.12** F-12 Lehrkraft
- [ ] **T-7.13** F-20 Tageslauf (mit B-SCHULTAGE, gleiche Testfälle wie `dates.ts`)
- [ ] **T-7.14** F-21 Wochenbericht, F-22 Löschen, F-23 Schuljahresende
- [ ] **T-7.15** F-13 Gruppen (+ Gruppen-Schritte in F-20, F-07, F-09, F-01, F-12)

## Phase 8 – Echte Daten anbinden (Testseite)
- [ ] **T-8.1** 🤖 `SharePointService` vollständig (alle Lesemethoden, `mapping.ts` für alle Listen). Lesen: DATENMODELL.md §3, ARCHITEKTUR.md §5–§7. Fertig wenn: alle Bildschirme laden auf der Testseite ohne Fehler.
- [ ] **T-8.2** 🤖 Offene Anträge nach Neustart (`getMyPendingInbox`), „Dauert länger“-Fall, 403-Fall. Fertig wenn: Test mit gestopptem Flow zeigt `pending.slow`, nach Start des Flows das Ergebnis.
- [ ] **T-8.3** 🧑🤖 Ende-zu-Ende-Test mit allen Testkonten: komplette Kette aus SPEC.md §11 und §11b (Gruppe), Bewerbung bis Bestätigung, Meldung, Not-Aus, Treffen außerhalb mit und ohne Eltern-Erlaubnis. Claude schreibt die Testliste, Subi klickt. Fertig wenn: alle Punkte grün oder als Fehler in „Jetzt“ notiert.

## Phase 9 – Qualität
- [ ] **T-9.1** 🤖 Sicherheits-Test: Mit Testkonto „Fünftklässler“ versuchen, über die SharePoint-Listenansicht und die REST-Adresse fremde Daten zu lesen oder Listen zu ändern. Mit Testkonto „Leitung“ Daten von Nehmenden suchen. Fertig wenn: nichts gefunden, Ergebnis in ENTSCHEIDUNGEN.md bei O-34.
- [ ] **T-9.2** 🤖 Barrierefreiheit: Skill `design:accessibility-review` bzw. Prüfung nach ARCHITEKTUR.md §15, Screenreader-Stichprobe (VoiceOver/Sprachausgabe). Fertig wenn: keine Fehler der Stufe AA offen.
- [ ] **T-9.3** 🤖 Design-Feinschliff mit Skill `impeccable` (Kontext: `referenz/PRODUCT.md`, `docs/DESIGN.md`) gegen den Prototyp. Fertig wenn: Subi sagt „passt“.
- [ ] **T-9.4** 🧑 Texte-Durchsicht mit 2 Fünft-/Sechstklässlern (nur Testseite, Testkonten). Unverständliches in TEXTE.md ändern.

## Phase 10 – Pilot und Start
- [ ] **T-10.1** 🏫 Echte Website „nachhilfly“ anlegen, Einrichtungs-Werkzeug dort ausführen (ohne Testdaten!), Gruppen befüllen (O-31), `NhSettings` mit echten Daten (O-11, O-29).
- [ ] **T-10.2** 🤖 `config.ts` für die echte Website, Version 1.0.0.0, Paket bauen, Git-Tag `v1.0.0`.
- [ ] **T-10.3** 🏫🧑 Flows auf die echte Website umstellen (Listen-Adressen), Besitzer und Verbindungen auf das Funktionskonto (FLOWS.md §1).
- [ ] **T-10.4** 🏫 Paket in den App-Katalog der Schule, mit Teams synchronisieren, im Teams Admin Center freigeben und anheften (O-24).
- [ ] **T-10.5** 🧑 Startwelle: möglichst viele Tutoren bewerben sich und werden bestätigt, dann Elternbrief und Werbung (O-38). Finden ist für Nehmende sofort offen (D-30, R-49).
- [ ] **T-10.6** 🤖 Betriebshandbuch `docs/BETRIEB.md`: bauen, ausliefern, Flows, Rollen jedes Jahr neu besetzen, Not-Aus, häufige Fehler, Übergabe an Nachfolger (O-26), Code-Konto (O-25).
