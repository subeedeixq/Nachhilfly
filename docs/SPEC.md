# SPEC – was die App tut

**Wann lesen:** Bevor du einen Bildschirm, eine Rolle oder einen Zustand baust. Nur den betroffenen Abschnitt lesen.
**Vorbild:** `referenz/prototyp-v2.html`. Spalte „Prototyp“ nennt die Stelle (Bereich/Tab bzw. Blatt). Suche im Prototyp mit grep, z. B. `grep -n "A.sheets.request" referenz/prototyp-v2.html`.
**Regeln** stehen in REGELN.md (R-xx), **Texte** in TEXTE.md, **Aktionen** (A-xx) in DATENMODELL.md §Aktionen.

## Inhalt
1. Rollen
2. Zustände (Z-1 … Z-10)
3. Navigation und Startansicht
4. Bildschirme: Start und Registrierung (S-01 … S-05)
5. Bildschirme: Nachhilfe-Nehmende (S-10 … S-19)
6. Bildschirme: Bewerber (S-20 … S-29)
7. Bildschirme: Tutor (S-30 … S-39)
8. Bildschirme: Leitungsteam (S-40 … S-49)
9. Bildschirme: Lehrkraft (S-50 … S-59)
10. Gemeinsame Bildschirme (S-90 … S-99)
11. Die Kette: von der Anfrage bis zum Ende
11b. Gruppennachhilfe: Konzept und Ablauf
12. Benachrichtigungen (N-xx)
13. Was es in Version 1 nicht gibt

## 1. Rollen
| Rolle | Code | Wer | Woher weiß die App das? | Sieht Daten von Nehmenden? |
|---|---|---|---|---|
| Nachhilfe-Nehmende/r | `learner` | jede/r Schüler/in | `Profile.Roles` enthält `learner` | nur eigene |
| Bewerber/in | `applicant` | hat sich als Tutor beworben, noch nicht bestätigt | `Profile.Roles` enthält `applicant` | nein |
| Tutor | `tutor` | bestätigt, ab Klasse 8 | `Profile.Roles` enthält `tutor` | nur von Schülern, die bei ihm anfragen |
| Leitungsteam | `lead` | 3 Schüler der SMV | SharePoint-Gruppe „nachhilfly Leitungsteam“ | **nie** (R-36) |
| Lehrkraft | `teacher` | betreuende Lehrkraft | SharePoint-Gruppe „nachhilfly Lehrkraft“ | ja, wenn nötig |
| Kinderschutz-Ansprechperson | – | von der Schulleitung benannt | keine App-Rolle, bekommt Mails (R-71) | – |

Eine Person kann mehrere Rollen haben (z. B. Leitung + Tutor + Nehmende). Ansichten: `learner`, `applicant`, `tutor`, `lead`, `teacher`. Wechsel siehe R-03.

## 2. Zustände
Code-Schlüssel sind englisch und stehen so auch als Auswahlwerte in den SharePoint-Spalten.

### Z-1 Nehmende (`Profile.LearnerState`)
| Code | Anzeige | Bedeutung | Wer setzt |
|---|---|---|---|
| `restricted` | eingeschränkt | Kann stöbern, nicht anfragen (Einwilligung fehlt, R-11) | Flow bei Registrierung |
| `active` | aktiv | Kann anfragen | Flow (Registrierung ab Kl. 9, oder nach Einwilligung A-60) |
| `suspended` | ausgesetzt | Keine neuen Anfragen | Lehrkraft (R-35) |
| `banned` | gesperrt | Nichts mehr, laufende Nachhilfen enden | Lehrkraft |

### Z-2 Bewerbung (`Application.State`)
| Code | Anzeige | Bedeutung | Wer setzt |
|---|---|---|---|
| `submitted` | wartet | Abgeschickt, Steckbrief noch änderbar | Flow (A-10) |
| `interview` | Gespräch vereinbart | Termin steht, Steckbrief gesperrt (R-22) | Leitung (A-40) |
| `approved` | bestätigt | Tutor, Steckbrief sichtbar | Leitung (A-41), nie die Person selbst |
| `rejected` | abgelehnt | Mit Grund, Einspruch möglich, neu ab Datum (R-27) | Leitung (A-42) |
| `appeal` | Einspruch | Wird von anderem Mitglied geprüft | Bewerber (A-14) |
| `finalRejected` | endgültig abgelehnt | Neu erst nächstes Schuljahr (R-28) | Leitung/Lehrkraft |
| `withdrawn` | zurückgezogen | Bewerber hat zurückgezogen | Bewerber (A-12) |

### Z-3 Tutor (`Application.TutorState`, nur wenn `State = approved`)
| Code | Anzeige | Bedeutung | Wer setzt |
|---|---|---|---|
| `active` | aktiv | sichtbar, nimmt Anfragen an (wenn Plätze frei) | Flow bei Bestätigung, Tutor beim Fortsetzen |
| `paused` | pausiert | keine neuen Anfragen (R-60) | Tutor selbst, Flow (R-35, R-59) |
| `suspended` | ausgesetzt | vorläufig gestoppt, Nachhilfen enden (R-57) | Leitung oder Lehrkraft |
| `banned` | gesperrt | dauerhaft, Einspruch möglich | 2× Leitung oder Lehrkraft (R-34) |
| `quit` | aufgehört | will nicht mehr | Tutor selbst (R-64) |
Abgeleitet (kein Zustand): **voll** = alle Plätze belegt (R-63).

### Z-4 Nachhilfe (`Tutoring.State`)
| Code | Anzeige | Bedeutung | Endzustand? |
|---|---|---|---|
| `open` | offen | Anfrage gestellt, Tutor hat noch nicht geantwortet | nein |
| `withdrawn` | zurückgezogen | Nehmende/r hat zurückgezogen | ja |
| `declined` | abgelehnt | Tutor hat abgelehnt | ja |
| `expired` | abgelaufen | Keine Antwort in der Frist (R-45) | ja |
| `trial` | Probephase | angenommen, Platz belegt, Probestunde | nein |
| `running` | läuft | beide wollen weitermachen | nein |
| `ended` | beendet | `EndedBy`: `tutor`, `learner`, `system`; `EndReason`: `byUser`, `noContinue`, `inactive`, `unavailable`, `schoolYearEnd`, `left` | ja |

### Z-5 Stunde (im JSON `Tutoring.Lessons`)
`pending` (wartet auf Bestätigung) · `confirmed` · `disputed` (bestritten) · `void` (verfallen nach R-53).

### Z-6 Meldung (`Report.State`)
`open` · `done` (mit `Decision`: `noViolation`, `warned`, `suspended`, `handedToTeacher`).

### Z-7 Eingang (`Inbox.State`)
`new` (App hat geschrieben) · `processing` (Flow arbeitet) · `done` (erfolgreich) · `rejected` (Regel verletzt, `ResultCode` = E-xx) · `error` (technischer Fehler, R-86).

### Z-8 Gruppe (`Group.State`)
| Code | Anzeige | Bedeutung |
|---|---|---|
| `open` | Anmeldung offen | sichtbar in Finden, Mitmachen möglich |
| `closed` | läuft | Anmeldeschluss vorbei, Termine finden statt |
| `done` | vorbei | letzter Termin vorbei (Endzustand) |
| `cancelled` | abgesagt | `CancelReason`: `byTutor`, `hidden`, `unavailable`, `schoolYearEnd` (Endzustand) |
Abgeleitet: **voll** = `MemberCount ≥ MaxSize`.

### Z-9 Gruppen-Teilnahme (`GroupMember.State`)
`joined` (angemeldet) · `left` (abgemeldet) · `cancelled` (Gruppe abgesagt) · `done` (Gruppe vorbei).

### Z-10 Gruppen-Termin (im JSON `Group.Sessions`)
`planned` (geplant) · `held` (hat stattgefunden, eingetragen) · `cancelled` (abgesagt). Anwesenheit je Person in `GroupMember.Attendance` mit Z-5 (`pending`, `confirmed`, `disputed`, `void`) oder `absent`.

## 3. Navigation und Startansicht
- Startansicht nach R-04. Kein Login-Bildschirm.
- **Oben** (Navigationsleiste): links kleines Schullogo, Mitte der Titel (erscheint beim Scrollen), rechts Rollen-Schalter (nur bei mehreren Ansichten, R-03) und Hilfe-Knopf (immer, R-72).
- **Unten** Tab-Leiste je Ansicht (siehe Tabellen unten). Rote Zahl = wartet auf mich. Ob unten oder oben, entscheidet der Technik-Test auf echten Handys in Teams (O-30). Baue die Tab-Leiste deshalb als eine Komponente mit zwei Darstellungen: `bottom` (iOS-Tabs) und `top` (Segment-Umschalter).
- Details (Steckbrief, Anfrage, Nachhilfe, Bewerbung, Gruppe …) öffnen als **Blatt** (Sheet) von unten.
- **Finden** hat oben einen Umschalter **„Tutoren | Gruppen“** (Segment-Umschalter). Suche und Filter-Chips gelten für beide. Die Tutor-Ansicht „Schüler“ hat unten den Abschnitt „Meine Gruppen“, die Leitungs-Ansicht „Tutoren“ oben den Umschalter „Tutoren | Gruppen“.

| Ansicht | Tabs |
|---|---|
| `learner` | Finden · Meine Nachhilfe (Zahl: zu bestätigende Stunden + Weitermachen-Fragen) · Profil |
| `applicant` | Status · Lehrmethoden · Steckbrief |
| `tutor` | Übersicht · Anfragen (Zahl: offene Anfragen) · Schüler · Steckbrief |
| `lead` | Bewerbungen (Zahl) · Tutoren · Meldungen (Zahl) · Zahlen |
| `teacher` | Einwilligungen (Zahl) · Meldungen (Zahl) · Protokoll · Einstellungen |

## 4. Start und Registrierung
| ID | Bildschirm | Inhalt | Aktionen | Prototyp |
|---|---|---|---|---|
| S-01 | Willkommen | Titel „Willkommen bei nachhilfly“, 3 Punkte (TEXTE.md §Willkommen), Wahl: „Ich suche Nachhilfe“ / „Ich will Nachhilfe geben“ | Wahl → S-02 | `A.areas.reg` Schritt 0, Persona Nils |
| S-02 | Avatar | Raster mit 12 Avataren (Initialen auf Pastellfarbe), Klasse (aus Konto oder Auswahl, R-10) | Weiter | Schritt 1 |
| S-03 | Regeln | Verhaltenskodex (5 Sätze), 2 Häkchen: Regeln, Datenschutzhinweis (Link öffnet S-97) | Weiter erst mit beiden Häkchen (R-15) | Schritt 2 |
| S-04 | Fast geschafft | Kl. 5–8: „Deine Eltern bekommen ein Formular“ + „Bis dahin kannst du stöbern“. Bei Tutor-Wahl: Hinweis auf Bewerbung | „Fertig“ → A-01, dann Finden bzw. Bewerbung S-20 | Schritt 3 |
| S-05 | Bewerbung (6 Schritte) | Siehe S-20 | – | `A.areas.bewerber` Assistent |

Registrierung soll in unter einer Minute fertig sein. Was das Konto weiß (Name, E-Mail, ggf. Klasse), wird nicht gefragt.

## 5. Nachhilfe-Nehmende
| ID | Bildschirm | Inhalt | Aktionen | Prototyp |
|---|---|---|---|---|
| S-10 | Finden | Großer Titel, Umschalter „Tutoren / Gruppen“ (Gruppen → S-16), Suchfeld („Fach oder Name suchen“), Filter-Chips: Fach ▾, Klasse ▾ (Menü), in der Schule, online, anderer Ort, kostenlos, freie Plätze. Liste: Fach-Banner · Avatar · Name, Klasse · Fächer, Zeiten · rechts Preis, „frei“. Hinweise: Ferien (R-06), eingeschränkt (R-42). Leer: E1/E2 (TEXTE.md §Leer). Sortierung: freie zuerst, dann nach Name; volle/pausierte ausgegraut unten (R-48). | Zeile → S-11; Filter zurücksetzen | Persona Ben, Tab Finden |
| S-11 | Steckbrief (Blatt) | Großer Avatar, Name, Klasse, Kurztext, Tags (Fächer, Stufen, Art, Format), Zeiten, Preis + Hinweis Probestunde kostenlos, freie Plätze ja/nein, Abzeichen, bestätigte Stunden | „Anfrage an {Vorname}“ (gesperrt mit Grund nach R-40…R-44), Melden | `A.sheets.tutor` |
| S-12 | Anfrage (Blatt) | Fach (nur Fächer des Tutors), Anliegen (Chips, Pflicht), passende Zeiten (Chips aus Tutor-Zeiten, mind. 1), Wunsch-Orte (Chips aus den Formaten des Tutors, nicht erlaubte gesperrt mit Grund, R-12/R-16), Hinweis „Den genauen Ort sprecht ihr im Chat ab“, Nachricht (optional, 300, R-47) | „Anfrage senden“ → A-20. Fehlende Felder am Feld markieren | `A.sheets.request` |
| S-13 | Meine Nachhilfe | Abschnitte: „Zu bestätigen“ (Stunden, R-53), „Nach der Probestunde“ (Weitermachen?, R-51), „Offene Anfragen“ (mit Frist), „Meine Tutoren“ (Probe/läuft, Stundenzahl, „macht gerade Pause“), „Meine Gruppen“ (Titel, Tutor, nächster Termin, abgesagte Termine markiert; Tipp → S-17), „Beendet“ (neutraler Grund, „Neuen Tutor finden“ R-57). Zu bestätigende Gruppen-Termine erscheinen ebenfalls unter „Zu bestätigen“ (A-76). Leer: `empty.mine` | Stunde bestätigen/bestreiten A-25, Weitermachen A-26, Anfrage zurückziehen A-21, Zeile → S-14 | Tab Meine Nachhilfe |
| S-14 | Nachhilfe (Blatt) | Tutor, Fach, Anliegen, Zustand, alle Stunden mit Status, Kontakt-Knopf | Kontakt (Teams-Chat-Link, O-20), Beenden (mit Nachfrage) A-27, Rückmeldung A-28, Melden | `A.sheets.nh` |
| S-16 | Gruppen (in Finden, Umschalter „Gruppen“) | Liste nach R-103: Fach-Banner · Gruppen-Symbol (statt Avatar) · Titel · „mit {Tutor} · {erster Termin} (+{n} Termine)“ · rechts Preis pro Person und „{frei} frei“ bzw. „voll“. Leer: `empty.groups` | Zeile → S-17 | – (neu, kein Vorbild im Prototyp) |
| S-17 | Gruppe (Blatt) | Titel, Fach, Stufen, Tutor (Tipp öffnet Steckbrief S-11), Beschreibung, alle Termine mit Zustand, Ort (+ Raum-Hinweis bzw. „Ort sprecht ihr im Chat ab“), Plätze „{frei} von {max} frei · ab {min} Personen“, Preis pro Person und Termin, Anmeldeschluss, Diskretions-Hinweis (R-112) | „Mitmachen“ A-73 (gesperrt mit Grund nach R-104) bzw. „Abmelden“ A-74 (mit Nachfrage), Kontakt zum Tutor, Melden | – (neu) |
| S-15 | Profil | Avatar, Name, Klasse, Stand der Einwilligung, Rollen | Avatar ändern A-02, „Tutor werden“ → S-20, Rollenwechsel, Regeln, Datenschutz, Hilfe, „nachhilfly verlassen“ (Blatt mit Erklärung, A-03) | Tab Profil |

## 6. Bewerber
| ID | Bildschirm | Inhalt | Aktionen | Prototyp |
|---|---|---|---|---|
| S-20 | Bewerbung (Assistent, 6 Schritte, Fortschrittsbalken) | 1 Willkommen (Aufwand, Gespräch, Steckbrief) · 2 Über dich (Avatar, Kurztext 200) · 3 Was du anbietest (Fächer, Stufen frei wählbar R-24, Art, Format: Schule/online/anderer Ort) · 4 Wann (Zeitraster Mo–Fr × 13–19 Uhr, R-25) · 5 Plätze (1–5) und Preis (Hinweis R-62), Gesprächszeiten (2–3 Fenster) · 6 Regeln + Lehrmethoden bestätigen, Vorschau des Steckbriefs | Zurück/Weiter, Abschicken → A-10. Eingaben bleiben beim Zurückgehen erhalten | Persona Nils als Tutor, `wz*` |
| S-21 | Status | Schritte: abgeschickt → Gespräch → Entscheidung (erledigt/jetzt/offen), Gesprächstermin und Ort. Bei `rejected`: Grund, „neu bewerben ab {Datum}“, Einspruch. Bei `appeal`: „Wird geprüft“. Bei `finalRejected`: Hinweis nächstes Schuljahr | Bewerbung zurückziehen A-12, Einspruch (Blatt, 500 Zeichen) A-14, später „Neu bewerben“ | Persona Paul, Tab Status |
| S-22 | Lehrmethoden | 9 Methoden (TEXTE.md §Lehrmethoden) zum Abhaken, Zähler | Abhaken A-13 (schnell, ohne Toast) | Tab Lehrmethoden |
| S-23 | Steckbrief (Vorschau) | So sehen andere ihn. Ab `interview` mit Schloss-Hinweis gesperrt (R-22) | Ändern (öffnet Assistent mit Daten) A-11 | Tab Steckbrief |

## 7. Tutor
| ID | Bildschirm | Inhalt | Aktionen | Prototyp |
|---|---|---|---|---|
| S-30 | Übersicht | Plätze belegt „2/3“ (Balken), offene Anfragen, bestätigte Stunden, aktive Gruppen, Abzeichen, Lehrmethoden-Fortschritt, Pausen-Schalter, Hinweis bei ausstehender Steckbrief-Änderung | Pause an/aus A-30, „Gruppe anbieten“ → S-35, Aufhören (Blatt) A-34 | Persona Jonas, Tab Übersicht |
| S-31 | Anfragen | Offene Anfragen: Banner, Avatar, Vorname + Klasse, Fach, Anliegen, Zeiten, Nachricht, „online erlaubt: ja/nein“, „außerhalb der Schule erlaubt: ja/nein“, Wunsch-Orte, Frist. Bei vollem Platz: Annehmen gesperrt mit Hinweis | Annehmen A-22, Ablehnen (Blatt mit optionalem Grund: „Keine Zeit mehr“, „Passt fachlich nicht“, „Ohne Grund“) A-23, Melden | Tab Anfragen |
| S-32 | Schüler | Laufende Nachhilfen und Probephasen mit Stunden und deren Status, Weitermachen-Frage nach Probestunde. Abschnitt „Meine Gruppen“: Titel, nächster Termin, „{n}/{max} angemeldet“, Hinweis „Termin eintragen“ wenn fällig | Stunde eintragen (Blatt S-33), Kontakt, Beenden A-27, Melden | Tab Schüler |
| S-33 | Stunde eintragen (Blatt) | Schüler wählen, Tag (letzte 14 Tage), Dauer 45/60 (Segment), Ort Schule/online/anderer Ort (Segment, nicht erlaubte gesperrt, R-12/R-16) | Eintragen A-24 | `A.sheets.logLesson` |
| S-35 | Gruppe anbieten / ändern (Blatt, 3 Schritte) | 1 **Was:** Titel, Fach (nur bestätigte), Stufen, Beschreibung · 2 **Wann und wo:** Termine (Zeile je Termin: Datum, Uhrzeit, Dauer 45/60/90; „+ Termin“), Ort (Segment Schule/online/anderer Ort, Raum-Hinweis bei Schule) · 3 **Plätze und Preis:** Mindest- und Höchstzahl (Stepper), Preis pro Person (Hinweis R-110), Anmeldeschluss (Standard vorbelegt), Vorschau der Zeile aus S-16. Nach der ersten Anmeldung nur noch erlaubte Felder (R-106), Rest mit Schloss | „Gruppe anbieten“ A-70 / „Sichern“ A-71 | – (neu, Bauteile wie S-20) |
| S-36 | Gruppe verwalten (Blatt) | Kopf wie S-17, Teilnehmende (Avatar, Vorname, Klasse, online/außerhalb erlaubt), Termine mit Zustand | „Gruppen-Chat starten“ (R-113), Termin eintragen → S-37, Termin absagen A-72, Termin hinzufügen / ändern → S-35, Gruppe absagen A-72 (Nachfrage), Melden (über Teilnehmende/n) | – (neu) |
| S-37 | Gruppen-Termin eintragen (Blatt) | Termin wählen (nur vergangene, geplante), „Hat stattgefunden“ / „Ist ausgefallen“ (Segment), Anwesenheit: Liste mit Häkchen, alle vorausgewählt | Eintragen A-75 | – (neu, wie S-33) |
| S-34 | Steckbrief | Vorschau + Abschnitte: „Sofort ändern“ (Zeiten-Blatt, Preis, Plätze mit Stepper) und „Mit Freigabe“ (Kurztext, Fächer, Stufen). Infos, „nachhilfly verlassen“ | A-31 (sofort), A-32 (Antrag) | Tab Steckbrief, `A.sheets.times`, `A.sheets.bio` |

## 8. Leitungsteam
Zeigt **nie** Namen oder Klassen von Nehmenden (R-36).
| ID | Bildschirm | Inhalt | Aktionen | Prototyp |
|---|---|---|---|---|
| S-40 | Bewerbungen | Gruppen: Einsprüche, Neu (`submitted`), Gespräch vereinbart, Erledigt (eingeklappt). Zeile: Banner Hauptfach, Avatar, Name, Klasse, Datum, Einwilligung ja/nein/nicht nötig. Fälle, bei denen ich befangen bin oder selbst betroffen: ausgegraut mit Grund | Zeile → S-41 | Persona Mira, Tab Bewerbungen |
| S-41 | Bewerbung (Blatt) | Steckbrief-Vorschau, Gesprächszeiten, Lehrmethoden gelesen x/9, Einwilligung, Verlauf. Gesprächsleitfaden (Blatt) | Gespräch vereinbaren (Zeit wählen) A-40, Bestätigen A-41 (gesperrt ohne Einwilligung R-21), Ablehnen (Grund Pflicht) A-42, „Ich bin befangen“ A-43. Bei Einspruch: A-41/A-42 | `A.sheets.app`, `A.sheets.guide` |
| S-42 | Tutoren | Liste: Banner, Avatar, Name, Zustand-Pille, Plätze belegt/gesamt, bestätigte Stunden. Ausstehende Änderungen oben | Zeile → S-43 | Tab Tutoren |
| S-43 | Tutor (Blatt) | Steckbrief, Zustand, ausstehende Änderung (alt → neu) | Änderung freigeben/ablehnen A-47/A-48, Aussetzen A-44, Aufheben A-45, Sperre beantragen (Grund) A-46, Abzeichen vergeben A-49 | `A.sheets.tadmin` |
| S-44 | Meldungen | Nur Meldungen über Tutoren und über die App: Grund, über wen, Datum, Zustand. Ohne meldende Person | Zeile → Blatt: Entscheidung A-52 | Tab Meldungen |
| S-46 | Gruppen (Umschalter in „Tutoren“) | Alle Gruppen `open`/`closed`: Banner, Titel, Tutor, Termine, „{n}/{max} angemeldet“. **Keine Namen von Teilnehmenden** (R-112, R-36) | Zeile → Blatt mit Details und „Gruppe ausblenden“ (Grund Pflicht) A-77 | – (neu) |
| S-45 | Zahlen | Aktive Tutoren, freie Plätze, offene Anfragen, aktive Gruppen, Stunden diesen Monat, Fächer ohne freien Tutor, Anzahl Nehmende ohne Tutor (nur Zahl). Stand-Zeitpunkt | – | Tab Zahlen |

## 9. Lehrkraft (Anrede „Sie“)
| ID | Bildschirm | Inhalt | Aktionen | Prototyp |
|---|---|---|---|---|
| S-50 | Einwilligungen | Wartet (Name, Klasse, seit), Erledigt. | Zeile → Blatt: „Liegt vor“ + Datum + „online erlaubt“ + „Treffen außerhalb der Schule erlaubt“ A-60; Klasse korrigieren A-61 | Persona Frau Keller, Tab Einwilligungen |
| S-51 | Meldungen | Alle Meldungen (über Tutoren und Nehmende), mit meldender Person (aus Protokoll). Fälle nach R-33 | Entscheiden A-52, Nehmende aussetzen/sperren/aufheben A-62, Tutor-Entscheidungen wie Leitung | Tab Meldungen |
| S-52 | Protokoll | Chronologisch: wann, wer (Rolle), was. Filter nach Person/Art | – (Wochenbericht per Mail F-21) | Tab Protokoll |
| S-53 | Einstellungen | Ferienkalender (Zeiträume), Fristen (Stepper), Werte aus O-Liste, Ansprechpersonen, Not-Aus (Schalter mit Nachfrage) | A-63 | Tab Einstellungen |

## 10. Gemeinsame Bildschirme
| ID | Bildschirm | Inhalt |
|---|---|---|
| S-90 | Pause (Not-Aus) | Vollbild: Pausen-Symbol, „nachhilfly macht gerade Pause“, Ansprechperson (R-05) |
| S-91 | Ausgesetzt / gesperrt | Hinweis, Ansprechperson, ggf. Einspruch (R-07) |
| S-92 | Hilfe und Melden (Blatt) | Zwei große Knöpfe: „Problem mit Regeln oder App“ und „Ich fühle mich unwohl“; Ansprechpersonen (R-74); Verhaltenskodex |
| S-93 | Melden (Blatt) | Art 1: Gründe als Chips (TEXTE.md §Meldegründe) + Text (1000). Art 2: nur Text + Hinweis, wer es bekommt. Senden → A-50 / A-51 |
| S-94 | Verbindungsfehler | „Verbindung fehlgeschlagen.“ + „Erneut versuchen“ |
| S-95 | Laden | Graue Platzhalter-Zeilen in der Form der echten Liste, kein Spinner allein |
| S-96 | Regeln (Blatt) | Verhaltenskodex + Konsequenzen |
| S-97 | Datenschutzhinweis (Blatt) | Kurzfassung (Verantwortlich, Zweck, Grundlage, Wer sieht was, Löschung) + Langfassung (Text von Herrn Scharf, O-04) |
| S-98 | Toast „Wird verarbeitet …“ | Unten, mit Spinner, bis der Flow fertig ist. Danach Erfolgstext oder Fehlertext (E-xx). Dauert es länger als 20 s: „Dauert länger als sonst …“ (siehe ARCHITEKTUR.md §Senden) |

## 11. Die Kette: von der Anfrage bis zum Ende
Jeder Weg endet in einem Endzustand, auch wenn niemand etwas tut (Fristen).
```
Nehmende/r: Anfrage (A-20) ──► open ──┬─ Tutor nimmt an (A-22) ──► trial
                                      ├─ Tutor lehnt ab (A-23) ──► declined
                                      ├─ zurückgezogen (A-21) ──► withdrawn
                                      └─ Frist R-45 ──────────────► expired
trial: Tutor trägt Probestunde ein (A-24) → Nehmende/r bestätigt (A-25)
     → beide „Weitermachen?“ (A-26): beide Ja ► running │ ein Nein ► ended(noContinue)
     → keine Antwort: Erinnerung 7 Tage, Ende 14 Tage (R-51)
running: Stunden eintragen/bestätigen (A-24/A-25) … beenden (A-27) ► ended(byUser)
     → 3 Wochen ohne Stunde Erinnerung, 5 Wochen ► ended(inactive) (R-55)
immer: Tutor ausgesetzt/gesperrt/quit/weg ► ended(unavailable) (R-57)
       Schuljahresende ► ended(schoolYearEnd) (R-58) · Verlassen ► ended(left) (R-14)
```
Kontakt nach dem Annehmen: Teams-Chat (Deep-Link auf das Schulkonto der anderen Person). Wenn Schüler-Chats gesperrt sind (O-20): Nachrichtenfeld in der App (Version 1.1, siehe §13).

## 11b. Gruppennachhilfe: Konzept und Ablauf
**Idee in einem Satz:** Ein Tutor stellt ein Angebot mit Thema, Terminen und Plätzen ein, Schüler tippen „Mitmachen“, fertig. Keine Anfrage, kein Annehmen, keine Probestunde.
**Wofür:** Klassenarbeit oder Klausur vorbereiten (ein Termin am Vortag), ein Thema in mehreren Terminen (z. B. „Grammatik-Crashkurs, 3× dienstags“), Hausaufgaben-Runde, Abi-Vorbereitung. Alles mit demselben Baukasten: Titel + 1 bis 8 Termine.
**Warum so einfach:** Ein einziges Objekt (Gruppe) mit einer Liste von Terminen deckt Einmal-Termin und Kurs ab. Anmelden ohne Annahme spart dem Tutor Arbeit (Tutoren zuerst). Plätze und Mindestzahl geben ihm Kontrolle.
```
Tutor: Gruppe anbieten (A-70) ──► open (sichtbar in Finden → Gruppen)
Schüler: Mitmachen (A-73) ──► joined   … Abmelden (A-74) ──► left
Anmeldeschluss (F-20) ──► closed  · unter Mindestzahl: Tutor wird gefragt (R-108)
Je Termin: Tutor trägt ein + Anwesenheit (A-75) ──► Anwesende bestätigen (A-76)
           Termin absagen (A-72) ──► Teilnehmende bekommen Bescheid
Letzter Termin vorbei (F-20) ──► done   · ganze Gruppe abgesagt/ausgeblendet ──► cancelled
```
Abgrenzung zur Einzel-Nachhilfe: Gruppen belegen keine festen Plätze (R-102), zählen nicht als offene Anfragen (R-104), haben keine Weitermachen-Frage und keine kostenlose Probestunde (R-110). Bestätigte Termine zählen für Stunden und Abzeichen (R-109).

## 12. Benachrichtigungen
Text immer neutral (R-82). Versand durch Flow F-90 (Helfer), aufgerufen aus den Flows.
| ID | Ereignis | Empfänger | Auslöser |
|---|---|---|---|
| N-01 | Neue Bewerbung | Leitungsteam | F-02 |
| N-02 | Gespräch vereinbart / bestätigt / abgelehnt | Bewerber | F-08 |
| N-03 | Einspruch eingelegt | unbefangene Leitung (nicht wer abgelehnt hat), sonst Lehrkraft | F-02 |
| N-04 | Neue Anfrage | Tutor | F-03 |
| N-05 | Anfrage angenommen / abgelehnt / abgelaufen | Nehmende/r | F-04, F-20 |
| N-06 | Stunde eingetragen | Nehmende/r | F-05 |
| N-07 | Weitermachen? / Erinnerungen | beide | F-05, F-20 |
| N-08 | Nachhilfe beendet / Tutor nicht mehr verfügbar | die andere Person | F-06, F-09 |
| N-09 | Neue Meldung Art 1 | über Tutor/App: Leitung; über Nehmende: Lehrkraft | F-10 |
| N-10 | Kinderschutz-Meldung | nur Ansprechperson (Mail mit Inhalt) | F-11 |
| N-11 | Aussetzung, Sperre | betroffene Person + Lehrkraft | F-09, F-12 |
| N-12 | Offene Einwilligungen (Sammelliste) | Lehrkraft, wöchentlich | F-21 |
| N-13 | Flow fehlgeschlagen | Lehrkraft + Entwickler | alle (R-86) |
| N-14 | Gespräch überfällig (R-29) | Leitung | F-20 |
| N-15 | Jemand hat sich für die Gruppe an- oder abgemeldet | Tutor | F-13 |
| N-16 | Mindestzahl nicht erreicht / Termin eintragen | Tutor | F-20 |
| N-17 | Gruppe oder Termin geändert bzw. abgesagt | Teilnehmende | F-13, F-07, F-09, F-23 |

## 13. Nicht in Version 1
- Kein Terminkalender (nur „Stunde eintragen“). Vielleicht Version 2.
- Keine Gruppen-Wunschliste (Version 2: Schüler wünschen sich ein Thema, Tutoren sehen die Nachfrage).
- Kein Wechsel einer Gruppe in eine Einzel-Nachhilfe (dafür normale Anfrage stellen).
- Kein Chat in der App, außer O-20 verlangt es (dann Version 1.1: einfaches Nachrichtenfeld pro Nachhilfe, Aktion A-29).
- Keine Bescheinigung als PDF aus der App. Die Bescheinigung bestätigt nur, dass jemand Tutor war (D-32, Version 1.1, F-24).
- Keine Fotos, keine Bewertungen mit Sternen.
