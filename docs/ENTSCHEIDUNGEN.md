# ENTSCHEIDUNGEN – was feststeht, was offen ist

**Wann lesen:** Vor jeder Aufgabe, die eine O-Nummer berührt, und wenn du etwas Unklares entscheiden müsstest.
**Für Claude:** Ist ein Punkt offen (Spalte „Ergebnis“ leer), baue mit dem **Standard** weiter und mache den Wert einstellbar. Nicht blockieren. Ändert sich ein Ergebnis, passe zuerst REGELN.md/DATENMODELL.md an, dann den Code.
**Für Subi:** Trag Ergebnisse in die Spalte „Ergebnis“ ein (mit Datum und wer entschieden hat). Schweigen gilt nicht als Zustimmung.

## Inhalt
1. Freigaben
2. Entschieden (D-xx)
3. Offen (O-xx)
4. Einstellungen und Standardwerte (`NhSettings`)

## 1. Freigaben
| Freigabe | Wer | Stand |
|---|---|---|
| 1. Schulleitung | Schulleitung | liegt vor (laut Subi, 15.11.2026). Details bei O-15 … O-17, O-27 eintragen. |
| 2. Datenschutz | Herr Scharf | liegt vor (laut Subi, 15.11.2026). Details bei O-04, O-08 … O-10, O-35 eintragen. |
| 3. Technik | Frau Hilchentwort | liegt vor (laut Subi, 15.11.2026). Ergebnisse des Technik-Tests bei O-12, O-20 … O-24, O-30 … O-34 eintragen. Falls der Technik-Test noch nicht gemacht wurde: das ist Phase 2 in TODO.md. |

## 2. Entschieden
| ID | Entscheidung | Quelle |
|---|---|---|
| D-01 | SPFx-App in Teams (persönliche App), Daten in SharePoint-Listen der Schule. Kein eigener Server. | Konzept v2, Frau Hilchentwort |
| D-02 | Über Teams dürfen personenbezogene Daten geteilt werden, außer Noten und Gesundheitsdaten. | Frau Hilchentwort |
| D-03 | Eigene App erlaubt. Die Admin gibt sie frei (Teams-Paket, `.sppkg`). | Frau Hilchentwort |
| D-04 | Kein eigenes Login, Schulkonto wird erkannt. | Konzept v2 |
| D-05 | Leitungsteam = 3 Schüler der SMV-Gruppe + betreuende Lehrkraft. | Subi |
| D-06 | Doppelrolle erlaubt (Tutor und Nehmende/r), mit Rollenwechsel. | Subi |
| D-07 | SMV-Schüler dürfen Tutor sein, entscheiden aber nie über eigene Fälle. Ein Flow prüft das. | Subi |
| D-08 | Nur helles Design, Schullogo und Schulblau (#4A5BA6), Apple-Stil mit Fach-Bannern, kein großer farbiger Kopf. | Subi + SMV, 3.11.2026 |
| D-09 | Version 1 ohne Terminkalender, nur „Stunde eintragen“. | Subi |
| D-10 | Plattform kostenlos. Preis frei, Empfehlung 8–12 € (Erfahrene etwas mehr). Bezahlung privat, Schule nicht Vertragspartner. | Subi |
| D-11 | Klasse 5–6 online nur mit ausdrücklicher Zustimmung der Eltern. | Subi |
| D-12 | **React** statt „ohne Framework“ (frühere Planung). Gründe: offizieller SPFx-Skill und fast alle Beispiele nutzen React, leichter für Nachfolger. **Kein Fluent UI** für das Aussehen, eigenes CSS nach DESIGN.md. | Starter-Kit 15.11.2026 (Einwand von Subi → hier ändern, bevor T-1.1 startet) |
| D-13 | Auch die Lehrkraft schreibt nur über den Eingang (nicht direkt in Einwilligungen/Einstellungen), damit alles protokolliert wird und Folgeschritte automatisch laufen. Strenger als Konzept v2. | Starter-Kit |
| D-14 | Den Eingang sieht jede Person nur mit eigenen Einträgen, auch die Lehrkraft. Grund: Kinderschutz-Meldungen stehen dort kurz im Klartext. Strenger als Konzept v2. | Starter-Kit |
| D-15 | Interne Falldaten (wer entschieden hat, wer befangen ist, Sperr-Stimmen) stehen in einer eigenen Liste L-12, nicht in der Bewerbung, die der Bewerber lesen kann. | Starter-Kit |
| D-16 | Updates alle 2 Wochen zu festen Terminen. Jede Version mit Git-Tag. | Konzept v2 |
| D-17 | Avatare statt Fotos. | früher entschieden |
| D-18 | Ablehnung: neu bewerben nach 1 Woche oder sofort einmal begründeter Einspruch. | Subi |
| D-19 | Pause setzt jeder Tutor selbst. Neue Anfragen gesperrt, laufende bleiben. | Subi |
| D-20 | Keine Premium-Bausteine in Power Automate (kosten Geld). | Konzept v2 |
| D-21 | In Finden erscheinen volle und pausierte Tutoren ausgegraut am Ende (Konzept v2 war an zwei Stellen widersprüchlich; so wie im abgenommenen Prototyp). | Starter-Kit |
| D-22 | Benachrichtigungen laufen über eine Warteschlangen-Liste (`NhNotify`) und einen Versand-Flow. Grund: Ein Flow, den andere Flows aufrufen, bräuchte Premium oder Lösungen mit Dataverse. | Starter-Kit |
| D-23 | Flow-Exporte liegen in der Dokumentbibliothek des nachhilfly-Teams, nicht im Git (enthalten echte Schuladressen). | Starter-Kit |
| D-24 | Entwicklung immer zuerst auf der Testseite mit erfundenen Daten und Testkonten. Echte Seite erst zum Start. | Konzept v2 |
| D-25 | **Ort frei:** Nachhilfe in der Schule, online oder an einem anderen Ort (z. B. zuhause, Bücherei). Ersetzt die frühere Regel „keine Treffen zuhause“. Schutz: bis Klasse 8 nur mit Eltern-Einwilligung „Treffen außerhalb der Schule erlaubt“ (R-16). Schulleitung/Datenschutz bestätigen den neuen Kodex-Satz (O-36). | Subi, 15.11.2026 |
| D-26 | **Keine Klassengrenze für Tutoren:** Tutoren dürfen jede Stufe unterrichten, auch die eigene und höhere (R-24, R-40). Ob es passt, klärt das Gespräch mit dem Leitungsteam. | Subi, 15.11.2026 |
| D-27 | **Gruppennachhilfe schon in Version 1:** Tutoren bieten Gruppen zu einem Thema mit festen Terminen an, Nehmende melden sich direkt an (R-100 … R-114, SPEC.md §11b). | Subi, 15.11.2026 |

## 3. Offen
| ID | Frage | Standard bis zur Klärung | Wer klärt | Ergebnis |
|---|---|---|---|---|
| O-01 | Tutor ab Klasse 8? | 8 (`tutorMinGrade`) | SMV-Gruppe | |
| O-02 | Höchstens 3 offene Anfragen, 3 Schultage Antwortfrist? | 3 / 3 | SMV-Gruppe | |
| O-03 | Online-Zeitfenster Mo–Fr bis 19 Uhr? | 19 (`onlineUntil`) | SMV-Gruppe + Schulleitung | |
| O-04 | Text des Datenschutzhinweises | Kurzfassung aus TEXTE.md, Langfassung Platzhalter | Herr Scharf | |
| O-05 | Endgültige Regeltexte (Kodex, Elternbrief) | Entwurf in TEXTE.md §3 | SMV-Gruppe | |
| O-06 | Kriterien und Gesprächsleitfaden für Tutoren | Entwurf in TEXTE.md §4 | SMV-Gruppe | |
| O-07 | Rückmeldung nach der Probestunde nur für die Lehrkraft? | ja (R-83) | SMV-Gruppe | |
| O-08 | Löschfristen | wie R-81 | Herr Scharf | |
| O-09 | Einwilligungsgrenze „Klasse 5–8“ statt Alter? Jüngere Neuntklässler? | Klasse ≤ 8 (`consentUntilGrade`) | Herr Scharf | |
| O-10 | Weg für die Eltern-Einwilligung (Papier, Elternportal) | Lehrkraft trägt „liegt vor“ ein | Herr Scharf + Schule | |
| O-11 | Kinderschutz-Ansprechperson (Name, Mail) und Vertrauenslehrkräfte (Namen) | leer, Hilfe-Seite zeigt „wird noch benannt“ | Schulleitung | |
| O-12 | Ist die Klasse im Schulkonto hinterlegt und lesbar (z. B. Feld `department`)? | nein: einmal wählen, Lehrkraft prüft | Frau Hilchentwort (Technik-Test) | |
| O-13 | Endgültige Fächerliste | DATENMODELL.md §6 (14 Fächer) | SMV-Gruppe | |
| O-14 | Logo als SVG oder große PNG; Logo in der App erlaubt? | vorhandene kleine Datei | Schulleitung / Sekretariat | |
| O-15 | Wer ist die betreuende Lehrkraft, wie viel Zeit hat sie? | – | Schulleitung | |
| O-16 | Zusatzregeln für volljährige Tutoren mit Klasse 5–6? | keine | Schulleitung | |
| O-17 | In welchen Räumen und zu welchen Zeiten ist Nachhilfe in der Schule erlaubt? | „in der Schule“ ohne Raum | Schulleitung | |
| O-18 | Ab wie vielen Tutoren öffnet Finden für Nehmende? | 15 (`minTutorsToOpen`) | SMV-Gruppe | |
| O-19 | Liste der eigenen Abzeichen | „10/20/50 Stunden geholfen“ automatisch, sonst Freitext | SMV-Gruppe | |
| O-20 | Dürfen Schüler sich in Teams gegenseitig schreiben und anrufen? | ja: Kontakt-Knopf öffnet Teams-Chat. Falls nein: Nachrichtenfeld (Version 1.1, A-29) | Frau Hilchentwort | |
| O-21 | Darf ein Flow Teams-Nachrichten (Flow-Bot) an Schüler senden, oder nur Mails? | Teams, sonst Mail | Frau Hilchentwort | |
| O-22 | Funktionskonto: Gibt es eins mit Lizenz? **Kostet es Geld, wer zahlt?** | – (ohne Funktionskonto kein Start) | Frau Hilchentwort | |
| O-23 | Bekommt jemand (Frau Hilchentwort/SMV-Lehrkraft) Rechte auf den App-Katalog für Updates? | Frau Hilchentwort lädt hoch | Frau Hilchentwort | |
| O-24 | Kann die App für alle Schüler in Teams angeheftet werden? | ja (App-Einrichtungsrichtlinie) | Frau Hilchentwort | |
| O-25 | Wo liegt der Code? Konto der Schule (z. B. GitHub-Organisation der SMV) statt privat | privates Repo von Subi, Lehrkraft als Mitglied, später übertragen | Schule + Subi | |
| O-26 | Wer sind die zwei Nachfolger (Klasse 8–10)? | – | SMV | |
| O-27 | Bescheinigung: Format, wer unterschreibt? | Liste der bestätigten Stunden an die Lehrkraft | Schulleitung | |
| O-28 | Erfolgsmaßstab: 30 vermittelte Nachhilfen im ersten Halbjahr? | 30 | SMV-Gruppe | |
| O-29 | Schuljahresdaten 2026/27: Ferien, Abiturbeginn, Schuljahresende, Klausurphasen KS | eintragen in `NhSettings` | Lehrkraft | |
| O-30 | Tab-Leiste unten oder oben? (doppelte Leiste in Teams auf dem Handy) | unten, umschaltbar in `config.ts` | Technik-Test T-2.x | |
| O-31 | Wie kommen alle Schüler in die Gruppe „nachhilfly Schüler“? (z. B. vorhandene Schülergruppe der Schule einfügen) | – | Frau Hilchentwort | |
| O-32 | Wie lange braucht ein Flow vom Antrag bis zum Ergebnis? | Zeitgrenzen 20 s / 120 s | Technik-Test (messen) | |
| O-33 | Brauchen reine Code-Updates eine neue Teams-Freigabe? | nein, solange das Teams-Manifest gleich bleibt | Technik-Test | |
| O-34 | Funktionieren Einzelrechte per Flow wie geplant (Geschwindigkeit, Grenzen)? | ja | Technik-Test | |
| O-35 | Ist „wer nimmt Nachhilfe in welchem Fach“ ähnlich schutzbedürftig wie Noten? | ja, so behandelt (R-36) | Herr Scharf | |
| O-36 | Treffen außerhalb der Schule (D-25): Sind Schulleitung und Datenschutz mit dem neuen Kodex-Satz, dem Hinweis „private Verabredung“ und dem zusätzlichen Häkchen in der Eltern-Einwilligung einverstanden? Passt das zum Schutzkonzept des Trägers, gerade bei volljährigen Tutoren (O-16)? | so gebaut wie D-25, Texte als Entwurf | Schulleitung + Herr Scharf | |
| O-37 | Werte für Gruppen: höchstens 8 Personen, 8 Termine, 3 Gruppen pro Tutor, 5 Teilnahmen pro Person, Preis-Empfehlung 3–6 € pro Person | wie genannt (Einstellungen) | SMV-Gruppe | |

## 4. Einstellungen und Standardwerte (`NhSettings`)
Ein Eintrag pro Schlüssel (`Title`) mit `Value`. Die Lehrkraft ändert sie in S-53 (A-63). Nur diese Schlüssel sind erlaubt.
| Schlüssel | Typ | Standard | Regel |
|---|---|---|---|
| `paused` | true/false | false | R-05 |
| `holidays` | JSON `[{"from":"2026-12-23","to":"2027-01-09","name":"Weihnachten"}]` | Ferien BW 2026/27 eintragen (O-29) | R-06, R-90 |
| `consentUntilGrade` | Zahl | 8 | R-11 |
| `tutorMinGrade` | Zahl | 8 | R-20 |
| `maxOpenRequests` | Zahl | 3 | R-41 |
| `requestDeadlineSchoolDays` | Zahl | 3 | R-45 |
| `onlineUntil` | Zahl (Uhr) | 19 | R-25 |
| `reapplyDays` | Zahl | 7 | R-27 |
| `interviewWithinSchoolDays` | Zahl | 10 | R-29 |
| `continueReminderDays` | Zahl | 7 | R-51 |
| `continueEndDays` | Zahl | 14 | R-51 |
| `lessonConfirmDays` | Zahl | 7 | R-53 |
| `inactiveReminderWeeks` | Zahl | 3 | R-55 |
| `inactiveEndWeeks` | Zahl | 5 | R-55 |
| `minTutorsToOpen` | Zahl | 15 | R-49 |
| `priceHint` | Text | 8–12 € | R-62 |
| `schoolYearEnd` | Datum | (O-29) | R-58 |
| `abiPauseFrom` | Datum | (O-29) | R-59 |
| `examReminderDates` | JSON `["2027-01-11"]` | `[]` | R-59 |
| `groupMaxSize` | Zahl | 8 | R-101 |
| `groupMaxSessions` | Zahl | 8 | R-101 |
| `maxActiveGroupsPerTutor` | Zahl | 3 | R-102 |
| `maxGroupsPerLearner` | Zahl | 5 | R-104 |
| `groupPriceHint` | Text | 3–6 € pro Person | R-110 |
| `contacts` | JSON `{"teacher":"","childProtection":"","trust":[],"smv":"SMV-Raum, große Pause"}` | Namen leer (O-11, O-15) | R-74 |

Die Mail-Adresse der Kinderschutz-Ansprechperson steht **nicht** hier (alle Schüler können diese Liste lesen), sondern als Variable im Flow F-11.
