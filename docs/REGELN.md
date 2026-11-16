# REGELN – alle fachlichen Regeln mit ID

**Wann lesen:** Bevor du eine Funktion baust, die etwas erlaubt, verbietet, prüft oder automatisch auslöst. Im Code und in Flows mit der ID kommentieren (`// R-41`).

**Wer setzt durch?**
- **Flow** = verbindlich. Der Power-Automate-Ablauf prüft und lehnt ab (Fehlercode E-xx, Texte in TEXTE.md).
- **App** = nur Anzeige und Vorprüfung (Knopf gesperrt, Hinweis, Feldfehler). Die App allein schützt nie etwas, weil man sie umgehen kann.
- **Tageslauf** = der tägliche Zeit-Ablauf F-20.
- Werte in `{geschweiften Klammern}` sind Einstellungen aus der Liste `NhSettings` (siehe DATENMODELL.md L-02). Standardwerte stehen in ENTSCHEIDUNGEN.md.

## Inhalt
1. Zugang und Rollen (R-01 … R-07)
2. Registrierung, Einwilligung, Ort (R-10 … R-16)
3. Bewerbung (R-20 … R-29)
4. Vier-Augen-Regeln, Aussetzen, Sperren (R-30 … R-37)
5. Finden und Anfrage (R-40 … R-49)
6. Nachhilfe und Stunden (R-50 … R-59)
7. Tutor verwaltet sich selbst (R-60 … R-65)
8. Melden und Kinderschutz (R-70 … R-74)
9. Daten, Texte, Benachrichtigungen (R-80 … R-87)
10. Schultage und Fristen (R-90 … R-92)
11. Gruppennachhilfe (R-100 … R-114)

## 1. Zugang und Rollen
| ID | Regel | Durch | Wert |
|---|---|---|---|
| R-01 | Kein eigenes Login. Wer die App öffnet, ist über das Schulkonto bekannt. | App | – |
| R-02 | Rollen: `learner`, `applicant`, `tutor` (im Profil), `lead`, `teacher` (SharePoint-Gruppen). Eine Person kann mehrere haben. | App + Flow | – |
| R-03 | Rollenwechsel nur sichtbar, wenn die Person mehr als eine Ansicht hat. Schalter oben neben dem Avatar. Die zuletzt genutzte Ansicht wird gemerkt (`Profile.LastView`, zusätzlich lokal). | App | – |
| R-04 | **Startansicht** beim Öffnen, in dieser Reihenfolge: (1) Gruppe Lehrkraft → Lehrkraft-Bereich. (2) Kein Profil → Willkommen (S-01). (3) Gemerkte Ansicht, wenn sie noch gilt. (4) Gruppe Leitungsteam → Leitung. (5) Tutor-Zustand `active` oder `paused` → Tutor-Übersicht. (6) Bewerbung im Zustand `submitted`, `interview` oder `appeal` → Bewerbungs-Status. (7) Rolle `learner` → Finden. (8) Sonst (nur abgelehnte Bewerbung) → Bewerbungs-Status mit Grund. Eine abgelehnte oder zurückgezogene Bewerbung bestimmt die Startseite nie, wenn (7) zutrifft. | App | – |
| R-05 | **Not-Aus:** Ist `{paused}` an, sehen alle außer der Lehrkraft nur den Pausen-Bildschirm (S-90). Alle Flows lehnen Aktionen ab (E-PAUSED), außer Aktionen der Lehrkraft. | App + Flow | `paused` |
| R-06 | **Ferien:** Liegt heute in `{holidays}`, zeigt die App den Ferien-Hinweis. Fristen ruhen (siehe R-90). | App + Tageslauf | `holidays` |
| R-07 | Ausgesetzte oder gesperrte Personen sehen eine Hinweisseite (S-91) mit Ansprechperson und, wo erlaubt, Einspruch. | App | – |

## 2. Registrierung, Einwilligung, Ort
| ID | Regel | Durch | Wert |
|---|---|---|---|
| R-10 | Die Klasse kommt aus dem Schulkonto, wenn lesbar (O-12). Sonst wählt man sie einmal. Danach ändert nur die Lehrkraft sie (A-61). | App + Flow | – |
| R-11 | Klasse 5 bis `{consentUntilGrade}` (Standard 8): Zustand `restricted`, bis die Lehrkraft die Eltern-Einwilligung einträgt. Ab der nächsten Klasse gilt die eigene Bestätigung bei der Registrierung als Einwilligung. Ein Häkchen des Kindes reicht unter 14 nie (§ 12 DSG-EKD). | Flow | `consentUntilGrade` |
| R-12 | Klasse 5 und 6 dürfen Online-Nachhilfe nur, wenn die Einwilligung „online erlaubt“ enthält. Tutoren sehen nur „online erlaubt: ja/nein“. | App + Flow | – |
| R-13 | Nie abgefragt oder gespeichert: Noten, Gesundheit, Telefonnummer, Adresse (auch nicht der Treffpunkt zuhause), Fotos, Fächer auf Vorrat. Bilder nur als Avatar aus der festen Auswahl. | App | – |
| R-14 | **Verlassen** (A-03): beendet alle offenen und laufenden Nachhilfen (andere Seite bekommt neutrale Nachricht), löscht Profil und Steckbrief, setzt Einwilligung auf widerrufen. Bestätigte Stunden bleiben bis Schuljahresende für Bescheinigungen. | Flow | – |
| R-15 | Registrierung braucht: Avatar, Klasse, Regeln bestätigt, Datenschutzhinweis bestätigt. | App + Flow | – |
| R-16 | **Ort frei wählbar** (D-25): in der Schule (`school`), online (`online`) oder an einem anderen Ort, den die Beteiligten absprechen, z. B. zuhause oder in der Bücherei (`elsewhere`). `elsewhere` nur, wenn jede beteiligte Person, die eine Eltern-Einwilligung braucht (R-11, R-21), dort „Treffen außerhalb der Schule erlaubt“ hat (E-PLACE). Der genaue Ort wird im Chat abgesprochen und **nie in der App gespeichert** (keine Adressen, R-13). | App + Flow | – |

## 3. Bewerbung
| ID | Regel | Durch | Wert |
|---|---|---|---|
| R-20 | Bewerben ab Klasse `{tutorMinGrade}` (Standard 8). | App + Flow | `tutorMinGrade` |
| R-21 | Bewerber bis Klasse `{consentUntilGrade}` brauchen die Eltern-Einwilligung, bevor sie bestätigt werden dürfen. Bewerben geht schon vorher. | Flow | – |
| R-22 | Der Steckbrief-Entwurf ist änderbar, solange die Bewerbung `submitted` ist. Ab `interview` gesperrt bis zur Entscheidung. Lehrmethoden kann man jederzeit lesen und abhaken. | App + Flow | – |
| R-23 | Kurztext höchstens 200 Zeichen. Keine Kontaktdaten und Links: Flow lehnt ab, wenn er `@`, `http`, `www.`, eine Telefonnummer (6+ Ziffern, auch mit Leerzeichen) oder „insta“, „snap“, „whatsapp“, „tiktok“ enthält (E-CONTACT). | App + Flow | – |
| R-24 | Stufen (`5-6`, `7-8`, `9-10`, `KS`) frei wählbar, auch die eigene Stufe und höhere. Ob es passt, klärt das Leitungsteam im Gespräch. Format `elsewhere` im Steckbrief nur, wenn der Tutor selbst R-16 erfüllt. (Die frühere Grenze „nur Stufen unter der eigenen Klasse“ ist abgeschafft, D-26.) | App + Flow | – |
| R-25 | Online-Zeiten nur Montag bis Freitag und nur in Zeitfenstern, die bis `{onlineUntil}` Uhr enden (Standard 19). | App + Flow | `onlineUntil` |
| R-26 | Plätze (feste Schüler insgesamt) 1 bis 5. | App + Flow | – |
| R-27 | Ablehnung nur mit Grund (Pflichtfeld). Neu bewerben frühestens `{reapplyDays}` Tage danach (Standard 7). | App + Flow | `reapplyDays` |
| R-28 | Einspruch: einmal pro Bewerbung, sofort möglich, Begründung Pflicht. „Endgültig abgelehnt“ (`finalRejected`) heißt: neu bewerben erst im nächsten Schuljahr. | App + Flow | – |
| R-29 | Das Kennenlerngespräch soll innerhalb von `{interviewWithinSchoolDays}` Schultagen stattfinden (Standard 10). Nach Ablauf erinnert der Tageslauf das Leitungsteam. | Tageslauf | `interviewWithinSchoolDays` |

## 4. Vier-Augen-Regeln, Aussetzen, Sperren
| ID | Regel | Durch | Wert |
|---|---|---|---|
| R-30 | Niemand entscheidet über die eigene Bewerbung, Steckbrief-Änderung, Aussetzung oder Sperre mit, auch nicht beim Schritt „Gespräch vereinbaren“ (E-SELF). | Flow | – |
| R-31 | Über einen Einspruch entscheidet nie die Person, die abgelehnt hat (E-SELF). | Flow | – |
| R-32 | Wer bei einem Fall „Ich bin befangen“ gedrückt hat, ist für diesen Fall raus (E-CONFLICT). | Flow | – |
| R-33 | Bleibt kein unbefangenes Leitungsteam-Mitglied übrig, entscheidet die Lehrkraft. Die App zeigt den Fall dann im Lehrkraft-Bereich. | Flow + App | – |
| R-34 | **Sperre** (`banned`): zwei verschiedene Leitungsteam-Mitglieder (zwei Anträge A-46) oder die Lehrkraft allein. Grund Pflicht. Die Lehrkraft wird immer benachrichtigt. Einspruch möglich wie bei Bewerbungen. | Flow | – |
| R-35 | **Aussetzen** (`suspended`, vorläufig): Tutor durch ein Leitungsteam-Mitglied oder die Lehrkraft; Nehmende nur durch die Lehrkraft. Lehrkraft wird benachrichtigt. Aufheben durch Leitung oder Lehrkraft. Nach dem Aufheben (auch einer Sperre) ist ein Tutor immer `paused` und startet selbst neu. | Flow | – |
| R-36 | **Das Leitungsteam sieht nie Daten von Nehmenden**: keine Namen, keine Klassen, keine Liste, wer Nachhilfe nimmt. Nur Bewerbungen, Tutoren, Meldungen über Tutoren ohne Namen der meldenden Person, anonyme Zahlen. Durchgesetzt über Listenrechte (DATENMODELL.md §Rechte). | Rechte + App | – |
| R-37 | Über Nehmende (Meldungen, Aussetzen, Sperren, Einsprüche) entscheidet nur die Lehrkraft. | Flow | – |

## 5. Finden und Anfrage
| ID | Regel | Durch | Wert |
|---|---|---|---|
| R-40 | Anfragen nur an Tutoren, deren Stufen die eigene Klasse enthalten (E-GRADE). Der Tutor muss **nicht** älter oder in einer höheren Klasse sein (D-26). | App + Flow | – |
| R-41 | Pro Tutor höchstens eine offene Anfrage (E-DUPLICATE). Insgesamt höchstens `{maxOpenRequests}` offene Anfragen (Standard 3, E-TOO-MANY). | App + Flow | `maxOpenRequests` |
| R-42 | Zustand `restricted` (Einwilligung fehlt): Finden ansehen ja, anfragen nein (E-CONSENT). Der Knopf erklärt, worauf gewartet wird. | App + Flow | – |
| R-43 | Kein freier Platz, pausiert, ausgesetzt oder gesperrt: keine Anfrage. Der Flow prüft das beim Eingang erneut („gerade voll geworden“, E-FULL / E-UNAVAILABLE). | App + Flow | – |
| R-44 | Man kann sich nicht selbst anfragen. Der eigene Steckbrief erscheint nicht in Finden (E-SELF). | App + Flow | – |
| R-45 | Der Tutor antwortet innerhalb von `{requestDeadlineSchoolDays}` Schultagen (Standard 3). Sonst wird die Anfrage `expired`, die/der Nehmende bekommt Bescheid. | Tageslauf | `requestDeadlineSchoolDays` |
| R-46 | Annehmen nur, wenn ein Platz frei ist. Der Flow zählt neu (Flow mit Gleichzeitigkeit 1, E-FULL). | Flow | – |
| R-47 | Nachricht in der Anfrage: freiwillig, höchstens 300 Zeichen, Hinweis „Keine Noten, keine Gesundheit, keine Kontaktdaten“. Anliegen nur aus der festen Auswahl. Zeiten nur aus den Zeiten des Tutors. Wunsch-Orte (mind. einer) nur aus den Formaten des Tutors und nach R-12/R-16. | App + Flow | – |
| R-48 | Finden zeigt Steckbriefe mit `Visible = ja`, ohne den eigenen, nur Tutoren, die die eigene Klasse unterrichten. Volle oder pausierte Tutoren erscheinen **ausgegraut** am Ende der Liste („gerade keine Plätze“ bzw. „macht gerade Pause“), Anfrage gesperrt. Ausgesetzte, gesperrte, aufgehörte Tutoren sind unsichtbar (`Visible = nein`). | App + Flow | – |
| R-49 | Für Nehmende öffnet Finden erst, wenn mindestens `{minTutorsToOpen}` Tutoren bestätigt sind (Standard 15). Vorher Leerzustand „Bald geht’s los“. Tutoren und Bewerber sehen Finden immer. | App | `minTutorsToOpen` |

## 6. Nachhilfe und Stunden
| ID | Regel | Durch | Wert |
|---|---|---|---|
| R-50 | Nach dem Annehmen beginnt die **Probephase** (`trial`). Die erste eingetragene Stunde ist die Probestunde und immer kostenlos. | Flow | – |
| R-51 | Ist die Probestunde eingetragen, fragt die App beide „Weitermachen?“. Ein Nein von einer Seite beendet die Nachhilfe (andere Seite erfährt keinen Grund). Beide Ja → `running`. Ohne Antwort: Erinnerung nach `{continueReminderDays}` Tagen (7), Ende nach `{continueEndDays}` Tagen (14). | App + Flow + Tageslauf | – |
| R-52 | Nur der Tutor trägt Stunden ein: Datum (nicht in der Zukunft, höchstens 14 Tage zurück), Dauer 45 oder 60 Min, Ort `school`, `online` oder `elsewhere`. Online bei Klasse 5–6 nur mit Erlaubnis (R-12), anderer Ort nur nach R-16. Nur in Nachhilfen `trial` oder `running`. | App + Flow | – |
| R-53 | Die/der Nehmende bestätigt oder bestreitet jede Stunde. Nach `{lessonConfirmDays}` Tagen (7) ohne Antwort wird sie `void` und zählt nicht. | App + Flow + Tageslauf | – |
| R-54 | Nur bestätigte Stunden zählen: für die Bescheinigung, die Stundenzahl im Steckbrief und Abzeichen. | Flow | – |
| R-55 | `{inactiveReminderWeeks}` Wochen (3) ohne eingetragene Stunde: Erinnerung an beide. Nach `{inactiveEndWeeks}` Wochen (5) endet die Nachhilfe, der Platz wird frei. | Tageslauf | – |
| R-56 | Beide können jederzeit beenden. Gespeichert wird, von wem (`EndedBy`). Die andere Seite bekommt eine neutrale Nachricht ohne Grund. | Flow | – |
| R-57 | Tutor ausgesetzt, gesperrt, aufgehört oder nicht mehr an der Schule: alle seine offenen, Probe- und laufenden Nachhilfen enden mit `EndReason = unavailable`. Nehmende sehen nur „Tutor nicht mehr verfügbar“ (kein Grund) und den Knopf „Neuen Tutor finden“, nach dem Fach gefiltert. Alle Gruppen des Tutors werden abgesagt (`CancelReason = unavailable`, R-111). | Flow + App | – |
| R-58 | Zum Schuljahresende `{schoolYearEnd}` enden alle Nachhilfen. Wer weitermachen will, fragt im neuen Schuljahr neu an. | Flow (F-23) | `schoolYearEnd` |
| R-59 | Tutoren aus J2 werden ab `{abiPauseFrom}` automatisch pausiert. `{examReminderDates}`: Erinnerung an Kursstufen-Tutoren, ob sie pausieren möchten. | Tageslauf | `abiPauseFrom`, `examReminderDates` |

## 7. Tutor verwaltet sich selbst
| ID | Regel | Durch | Wert |
|---|---|---|---|
| R-60 | **Pause** setzt der Tutor selbst. Neue Anfragen sofort gesperrt, laufende Nachhilfen bleiben, seine Schüler sehen „macht gerade Pause“. Ende: selbst fortsetzen. | Flow | – |
| R-61 | **Sofort gültig:** Zeiten, Preis, Plätze, Pause. **Mit Freigabe** durch ein anderes Leitungsteam-Mitglied: Kurztext, Fächer, Stufen, Art der Hilfe. Bis zur Freigabe bleibt die alte Version sichtbar. | Flow | – |
| R-62 | Preis frei wählbar (ganze Euro, 0 bis 30) oder kostenlos (0). Die App zeigt daneben die Empfehlung `{priceHint}` („8–12 €, Erfahrene auch etwas mehr“). Bezahlung privat, nach der Stunde, Probestunde kostenlos. | App + Flow | `priceHint` |
| R-63 | **Belegte Plätze** = Nachhilfen des Tutors im Zustand `trial` oder `running`. Sind alle Plätze belegt, ist der Tutor „voll“ (`HasFreeSeats = nein`). Plätze werden nie von Hand gepflegt, der Flow zählt sie bei jeder Änderung neu. Plätze kann man nicht unter die belegte Zahl senken. | Flow | – |
| R-64 | **Aufhören** (A-34): Tutor-Zustand `quit`, Steckbrief unsichtbar, Nachhilfen enden (R-57). Neu bewerben jederzeit möglich. | Flow | – |
| R-65 | Abzeichen vergibt nur das Leitungsteam oder automatisch der Flow bei 10, 20, 50 bestätigten Stunden („10 Stunden geholfen“). Eigene Abzeichen von nachhilfly, keine Fortnite-Namen oder -Optik. | Flow | – |

## 8. Melden und Kinderschutz
| ID | Regel | Durch | Wert |
|---|---|---|---|
| R-70 | **Art 1 „Problem mit Regeln oder App“** (A-50): über einen Tutor → Leitungsteam sieht sie (ohne Namen der meldenden Person); über eine/n Nehmende/n → nur Lehrkraft; über die App allgemein → Leitungsteam. Die Lehrkraft sieht alles inkl. meldender Person (im Protokoll). | Flow + Rechte | – |
| R-71 | **Art 2 „Ich fühle mich unwohl“** (A-51): geht nur per Mail an die Kinderschutz-Ansprechperson. Der Flow löscht den Eingang-Eintrag sofort nach dem Versand (inkl. Papierkorb). Nichts davon im Protokoll außer „Kinderschutz-Meldung weitergeleitet“ ohne Namen. Niemand aus der SMV sieht sie. | Flow | – |
| R-72 | Melden ist überall erreichbar: Steckbrief, Anfrage, Nachhilfe, Meine Schüler. Der Knopf „Hilfe“ oben rechts ist auf jedem Bildschirm. Auch Tutoren können Nehmende melden. | App | – |
| R-73 | Entscheidungen zu Meldungen: `noViolation`, `warned`, `suspended`, `handedToTeacher`. Über Tutoren: Leitung oder Lehrkraft. Über Nehmende: nur Lehrkraft. | Flow | – |
| R-74 | Die Hilfe-Seite nennt Kinderschutz-Ansprechperson und Vertrauenslehrkräfte mit Namen aus `{contacts}`. | App | `contacts` |

## 9. Daten, Texte, Benachrichtigungen
| ID | Regel | Durch | Wert |
|---|---|---|---|
| R-80 | Neben jedem Freitextfeld: „Keine Noten, keine Gesundheit, keine Kontaktdaten.“ Zeichenlimits: Kurztext 200, Nachricht 300, Ablehnungsgrund 300, Einspruch 500, Meldung 1000. | App + Flow | – |
| R-81 | **Löschfristen** (Flow F-22): Eingang 30 Tage nach Verarbeitung · abgelehnte/zurückgezogene Bewerbungen zum Schuljahresende · Anfragen ohne Nachhilfe (`declined`, `expired`, `withdrawn`) 3 Monate nach Ende · Nachhilfen mit Stunden zum Schuljahresende nach Erstellung der Bescheinigungen · Meldungen und Protokoll nach 1 Jahr · Profile und Steckbriefe beim Austritt oder Schulabgang · Gruppen und Teilnahmen: mit bestätigten Terminen zum Schuljahresende, sonst 3 Monate nach Ende. Papierkorb wird mitgeleert. | Flow | – |
| R-82 | Benachrichtigungen sind neutral: „Neues in nachhilfly“ plus Link. Kein Fach, keine Klasse, kein Name im Text (Sperrbildschirm). Weg: Teams-Nachricht vom Flow-Bot, sonst E-Mail (O-21). | Flow | – |
| R-83 | Rückmeldung „passt / passt nicht“ nach der Probestunde und beim Beenden: freiwillig, sieht nur die Lehrkraft (steht im Protokoll, nicht in der Nachhilfe). | Flow | – |
| R-84 | Flows prüfen vor jedem Schritt, ob beteiligte Konten noch existieren. Fehlt ein Konto, gilt R-57 bzw. die Nachhilfe endet; der Flow läuft nicht ins Leere. | Flow | – |
| R-85 | Jede Entscheidung und jede Statusänderung kommt ins Protokoll (`NhLog`): wer, was, wann, worauf. | Flow | – |
| R-86 | Schlägt ein Flow fehl: Eingang-Eintrag `error`, Mail an Lehrkraft und Entwickler, App zeigt E-SERVER. | Flow | – |
| R-87 | Die App sagt nie „erledigt“, bevor der Flow fertig ist. Sie zeigt „Wird verarbeitet …“ bis zum Ergebnis (ehrliche Zustände). | App | – |

## 10. Schultage und Fristen
| ID | Regel | Durch | Wert |
|---|---|---|---|
| R-90 | Schultag = Montag bis Freitag, nicht in `{holidays}`. Alle Fristen in Schultagen zählen nur Schultage. Fristen in Tagen/Wochen (R-51, R-53, R-55) ruhen in den Ferien ebenfalls (die Ferientage werden nicht mitgezählt). | Flow + App | – |
| R-91 | Fristen werden beim Entstehen als Datum gespeichert (`Deadline`) und vom Tageslauf geprüft. Ändert sich der Ferienkalender, rechnet F-20 offene Fristen neu. | Flow | – |
| R-92 | Eine Hilfsfunktion `addSchoolDays(datum, n, holidays)` gibt es zweimal mit identischem Verhalten: in `app/src/domain/dates.ts` (mit Unit-Tests) und als Schleife in F-20. Testfälle stehen in ARCHITEKTUR.md §Tests. | App + Flow | – |

## 11. Gruppennachhilfe
Ein bestätigter Tutor bietet eine **Gruppe** an: ein Thema (z. B. „Klassenarbeit Bruchrechnung“), ein oder mehrere feste Termine, begrenzte Plätze. Nehmende melden sich mit einem Tipp an, ohne Annahme durch den Tutor. Konzept und Ablauf: SPEC.md §11b. Entscheidung: D-27.
| ID | Regel | Durch | Wert |
|---|---|---|---|
| R-100 | Gruppen bieten nur bestätigte Tutoren mit `TutorState = active` an. Das Fach muss eines ihrer bestätigten Fächer sein (E-NOT-ALLOWED). | App + Flow | – |
| R-101 | **Pflichtangaben:** Titel (3–60 Zeichen), Fach, Stufen (mind. eine, frei wählbar wie R-24), Ort (`school`, `online` oder `elsewhere`, R-16), 1 bis `{groupMaxSessions}` Termine (Standard 8; je Datum, Uhrzeit, Dauer 45/60/90 Min, nicht in der Vergangenheit), Mindest- und Höchstzahl (2 bis `{groupMaxSize}`, Standard 8), Preis pro Person und Termin (0 bis 15 €), Anmeldeschluss (Standard: Vortag des ersten Termins, 20 Uhr; nie nach dem ersten Termin). Freiwillig: Beschreibung (300), Raum-Hinweis bei `school` (40, z. B. „Raum 204“). Titel und Beschreibung ohne Kontaktdaten (wie R-23). | App + Flow | `groupMaxSessions`, `groupMaxSize` |
| R-102 | Ein Tutor hat höchstens `{maxActiveGroupsPerTutor}` Gruppen gleichzeitig im Zustand `open` oder `closed` (Standard 3, E-TOO-MANY). Gruppen zählen **nicht** zu seinen festen Plätzen (R-63). | Flow | `maxActiveGroupsPerTutor` |
| R-103 | In Finden (Umschalter „Gruppen“) erscheinen Gruppen im Zustand `open` mit `Visible = ja`, deren Stufen die eigene Klasse enthalten, nicht die eigenen. Sortiert nach erstem Termin. Volle Gruppen ausgegraut („voll“). | App | – |
| R-104 | **Mitmachen** (A-73), sofort ohne Annahme: nicht der Tutor selbst (E-SELF); Zustand `open` und Anmeldeschluss nicht vorbei (E-GONE); Klasse in den Stufen (E-GRADE); `LearnerState = active` (E-CONSENT); Ort nach R-12/R-16 (E-ONLINE/E-PLACE); freier Platz (E-FULL); nicht schon angemeldet (E-DUPLICATE); höchstens `{maxGroupsPerLearner}` aktive Teilnahmen (Standard 5, E-TOO-MANY). Gruppen zählen nicht zu den offenen Anfragen (R-41). | App + Flow | `maxGroupsPerLearner` |
| R-105 | **Abmelden** (A-74) jederzeit möglich. Nach dem Anmeldeschluss zeigt die App den Hinweis, dem Tutor kurz Bescheid zu sagen. Der Tutor bekommt eine neutrale Nachricht. | App + Flow | – |
| R-106 | **Ändern** (A-71): Solange niemand angemeldet ist, ist alles änderbar. Danach nur noch: Beschreibung, Raum-Hinweis, Termine hinzufügen, Höchstzahl erhöhen (nie unter die Zahl der Angemeldeten). Ein Termin wird nicht verschoben, sondern abgesagt und neu hinzugefügt. Alle Teilnehmenden bekommen bei jeder Änderung N-17. | Flow | – |
| R-107 | **Absagen** (A-72): Der Tutor sagt einen Termin oder die ganze Gruppe ab, Grund freiwillig. Teilnehmende bekommen N-17. Sind alle Termine abgesagt, ist die Gruppe `cancelled`. | Flow | – |
| R-108 | **Mindestzahl:** Ist sie am Anmeldeschluss nicht erreicht, bekommt der Tutor N-16 und entscheidet selbst (stattfinden lassen oder absagen). Es gibt keine automatische Absage. | Tageslauf | – |
| R-109 | **Termin eintragen** (A-75): nur der Tutor, nur für einen Termin, dessen Beginn vorbei ist (höchstens 14 Tage), mit Anwesenheit je Person (Standard: alle da). Jede anwesende Person bestätigt oder bestreitet (A-76), nach `{lessonConfirmDays}` Tagen verfällt es (`void`, wie R-53). Der Termin zählt für den Tutor **einmal** mit seiner Dauer als bestätigte Stunde (R-54), sobald mindestens eine Person bestätigt hat. Nicht eingetragene Termine: Erinnerung an den Tutor am Tag danach. | App + Flow + Tageslauf | – |
| R-110 | **Preis:** Bei Gruppen gibt es keine kostenlose Probestunde. Preis pro Person und Termin, Empfehlung `{groupPriceHint}` (Standard „3–6 € pro Person“). Bezahlung privat nach dem Termin, nie im Voraus (wie R-62). | App | `groupPriceHint` |
| R-111 | **Ausblenden** (A-77): ein Leitungsteam-Mitglied oder die Lehrkraft, Grund Pflicht, nicht bei eigenen Gruppen (R-30). Die Gruppe wird `cancelled` (`CancelReason = hidden`), Teilnehmende bekommen „Gruppe abgesagt“ ohne Grund, die Lehrkraft wird informiert. Tutor ausgesetzt, gesperrt, aufgehört oder weg → alle seine Gruppen `cancelled` (`unavailable`, R-57). | Flow | – |
| R-112 | **Diskretion:** In der App sehen Teilnehmende nur die Zahl der Angemeldeten, nie Namen. Der Tutor sieht Name, Klasse, Avatar und „online/außerhalb erlaubt“ seiner Teilnehmenden. Das Leitungsteam sieht Gruppen und Teilnehmerzahl, nie Namen (R-36). Vor dem Mitmachen steht der Hinweis, dass die anderen dich sehen, wenn ihr euch trefft oder der Tutor einen Gruppen-Chat startet. | App + Rechte | – |
| R-113 | **Kontakt:** Der Tutor kann einen Teams-Gruppenchat mit allen Angemeldeten starten (Deep-Link mit allen Adressen). Einzeln geht „Kontakt“ wie bei Nachhilfen. Den genauen Ort bei `elsewhere` sprechen alle im Chat ab (R-16). | App | – |
| R-114 | **Ende:** Nach dem letzten Termin (eingetragen oder abgesagt) wird die Gruppe `done` (Tageslauf). Zum Schuljahresende werden alle Gruppen beendet bzw. abgesagt (R-58). Melden geht in Gruppen wie überall (R-70, R-72), auch Tutor über Teilnehmende. | Tageslauf + App | – |
