# FLOWS – die Power-Automate-Abläufe

**Wann lesen:** Beim Bau oder Ändern eines Flows und wenn die App ein Ergebnis eines Flows erwartet. Für eine Klick-für-Klick-Anleitung zu einem Flow: Befehl `/flow-anleitung F-xx` (erzeugt `flows/anleitungen/F-xx.md`).
**Kosten:** Nur Standard-Konnektoren (SharePoint, Office 365 Outlook, Microsoft Teams, integrierte Aktionen wie Bedingung, Schalter, Variable, Verfassen, JSON analysieren). **Nie** „HTTP“ (allgemein), „Bei Empfang einer HTTP-Anforderung“, Dataverse oder andere Premium-Bausteine: die kosten Geld. „HTTP-Anforderung an SharePoint senden“ ist Standard und erlaubt.

## Inhalt
1. Grundregeln für alle Flows
2. Bausteine (B-xx), die in vielen Flows gleich sind
3. Flows für Aktionen aus dem Eingang (F-01 … F-13)
4. Flows mit Zeitplan (F-20 … F-24)
5. Hilfs-Flows mit eigenem Trigger (F-90, F-91) und Test-Flows (F-00, F-99)
6. Testen und Sichern

## 1. Grundregeln
1. **Besitzer** jedes Flows ist das Funktionskonto (FK). Alle Verbindungen (SharePoint, Outlook, Teams) laufen über FK. Subi baut auf der Testseite mit seinem Konto; vor dem Start stellt ADM die Verbindungen auf FK um und macht FK zum Besitzer (T-10.3).
2. **Name:** `nachhilfly F-03 Anfrage` (ID + Kurzname). Beschreibung: „Siehe FLOWS.md F-03“.
3. **Trigger** der Eingang-Flows: SharePoint „Wenn ein Element erstellt wird“ auf `NhInbox`. **Trigger-Bedingung** (Einstellungen des Triggers), z. B. `@or(equals(triggerOutputs()?['body/Action/Value'],'request'),equals(triggerOutputs()?['body/Action/Value'],'withdrawRequest'))`. So startet jeder Flow nur für seine Aktionen.
4. **Gleichzeitigkeit 1** (Trigger-Einstellungen → Parallelitätssteuerung an, Grad 1) bei Flows, die Plätze oder Zählerstände ändern: F-03, F-04, F-06, F-07, F-09, F-13. Sonst können zwei Anträge gleichzeitig den letzten Platz bekommen.
5. **Handelnde Person** = `Author/Email` aus dem Trigger. Nie aus `Payload` (Ausnahme: gemeldete Person bei A-50, siehe DATENMODELL.md §5).
6. **Aufbau jedes Eingang-Flows:** B-KOPF → Bereich „Versuch“ (alle Prüfungen und Schreibvorgänge) → B-ENDE. Ein Bereich „Fehler“ läuft nur, wenn „Versuch“ fehlschlägt (Einstellung „Ausführen nach: ist fehlgeschlagen, wurde übersprungen, Zeitlimit überschritten“) → B-FEHLER.
7. **Prüfen, dann schreiben.** Erst alle Prüfungen der Reihe nach. Scheitert eine: B-ABLEHNEN mit Fehlercode (E-xx aus TEXTE.md) und Flow beenden („Beenden“ mit Status Erfolgreich). Erst danach schreiben.
8. **Jede Regel-Prüfung bekommt in der Aktions-Beschreibung ihre ID** (z. B. „R-41 höchstens 3 offene“), damit man sie wiederfindet.
9. **Datum:** Immer UTC speichern, für Anzeige/Schultage nach `W. Europe Standard Time` umrechnen (`convertTimeZone`).

## 2. Bausteine
| ID | Name | Was er tut |
|---|---|---|
| B-KOPF | Kopf | (1) Eingang-Eintrag `State = processing`. (2) `NhSettings` laden → Variablen (`paused`, `holidays` …). (3) Wenn `paused` und Person nicht in LK: B-ABLEHNEN `E-PAUSED`. (4) Profil der Person aus `NhProfiles` (Filter `Email eq '<email>'`) laden. (5) Gruppen prüfen: HTTP an SharePoint `GET _api/web/sitegroups/getbyname('nachhilfly Leitungsteam')/users?$filter=Email eq '<email>'` → `isLead`; dasselbe für Lehrkraft → `isTeacher`. (6) `Payload` mit „JSON analysieren“ einlesen (Schema je Aktion aus DATENMODELL.md §5). |
| B-ENDE | Ende | Eingang-Eintrag: `State = done`, `ResultCode = OK`, `ResultData` (JSON), `ProcessedAt = utcNow()`. |
| B-ABLEHNEN | Ablehnen | Eingang-Eintrag: `State = rejected`, `ResultCode = E-…`, `ProcessedAt`. Danach „Beenden: Erfolgreich“. Kein Protokolleintrag nötig, außer bei E-SELF/E-NOT-ALLOWED (Hinweis auf Umgehungsversuch). |
| B-FEHLER | Fehler | Eingang-Eintrag `State = error`, `ResultCode = E-SERVER`. Eintrag in `NhNotify` mit Template N-13 an Lehrkraft und Entwicklung, `Body` = Flow-Name + Link zum Lauf (`workflow()` → `run`-Name). R-86. |
| B-LOG | Protokoll | Neuer Eintrag in `NhLog` mit `Title`, `Actor`, `ActorRole`, `Target`, `Details`, `InboxId` (R-85). |
| B-NOTIFY | Benachrichtigen | Neuer Eintrag in `NhNotify`: `Recipient`, `Template` (N-xx), `Link`. Versand macht F-90. |
| B-RECHTE | Einzelrechte | Für Eintrag {id} in Liste {liste}: (1) `POST _api/web/lists/getbytitle('{liste}')/items({id})/breakroleinheritance(copyRoleAssignments=true,clearSubscopes=true)`. (2) Je Person: `POST _api/web/ensureuser` Body `{"logonName":"i:0#.f|membership|{email}"}` → `d.Id`. (3) `POST …/items({id})/roleassignments/addroleassignment(principalid={Id},roledefid={leseId})`. `leseId` einmal in B-KOPF holen: `GET _api/web/roledefinitions/getbytype(2)` (Typ 2 = Lesen, sprachunabhängig). Header: `Accept: application/json;odata=verbose`. |
| B-SCHULTAGE | Schultage addieren | Eingabe Startdatum, n. Schleife „Bis“: Tag +1; zählt nur, wenn Wochentag Mo–Fr und nicht in `holidays`. Ausgabe Datum. Muss sich genau wie `addSchoolDays` in `app/src/domain/dates.ts` verhalten (R-92). |
| B-PERSON-DA | Konto prüfen | Office 365 Users ist **nicht** nötig: `POST _api/web/ensureuser` scheitert, wenn das Konto nicht mehr existiert → Zweig für R-84. |

## 3. Flows für Aktionen aus dem Eingang
Format: **Aktionen** · **Gleichzeitigkeit** · nummerierte Prüfungen (→ Fehlercode) · **Schreibt** · **Benachrichtigt** · **Protokoll**.

### F-01 Profil
**Aktionen:** `register`, `setAvatar`, `leave`, `setView`, `addLearner` · Gleichzeitigkeit: Standard
- `register`: (1) Profil existiert schon → E-EXISTS. (2) `rulesAccepted` und `privacyAccepted` wahr, Avatar 0–11, Klasse gültig → sonst E-INVALID (R-15). (3) Klasse: aus Konto, falls lesbar (O-12), sonst aus Payload. **Schreibt:** Profil (Rollen: `learner` bzw. bei `as = tutor` zunächst keine Rolle, die Bewerbung setzt `applicant`), `LearnerState` = `restricted` wenn Klasse ≤ `consentUntilGrade`, sonst `active` (R-11). `OnlineAllowed`/`OutsideAllowed` = ja, wenn keine Einwilligung nötig ist, sonst nein bis A-60. Bei Einwilligungspflicht Eintrag in `NhConsents` (`waiting`). B-RECHTE auf Profil (Person). **Protokoll:** „registriert“.
- `setAvatar`: Profil, Steckbrief (falls Tutor), offene Nachhilfen (Kopie-Felder) aktualisieren.
- `setView`: nur `LastView` setzen, wenn die Ansicht zur Person passt. Kein Protokoll.
- `addLearner`: Rolle `learner` ergänzen, `LearnerState` wie bei `register`.
- `leave` (R-14): alle Nachhilfen der Person mit `State` in (`open`,`trial`,`running`) → `ended`, `EndedBy` = Rolle der Person, `EndReason = left`; B-NOTIFY N-08 an die andere Seite. Bewerbungen `submitted`/`interview` → `withdrawn`. Tutor-Akte → `TutorState = quit`, Steckbrief löschen, eigene Gruppen absagen (`unavailable`, N-17). Gruppen-Teilnahmen `joined` → `left` (MemberCount neu zählen). Einwilligung → `revoked`. Profil löschen. **Protokoll:** „hat nachhilfly verlassen“.

### F-02 Bewerbung
**Aktionen:** `apply`, `updateApplication`, `withdrawApplication`, `methodRead`, `appeal` · Gleichzeitigkeit: Standard
- `apply`: (1) Profil fehlt → E-NO-PROFILE. (2) Klasse < `tutorMinGrade` → E-GRADE (R-20). (3) Laufende Bewerbung (`submitted`, `interview`, `appeal`) oder Tutor-Akte `approved` mit TutorState ≠ `quit` → E-EXISTS. (4) `ReapplyFrom` der letzten Ablehnung in der Zukunft → E-TOO-EARLY. `finalRejected` in diesem Schuljahr → E-TOO-EARLY (R-27, R-28). (5) Entwurf prüfen: Kurztext ≤ 200 und ohne Kontaktdaten (R-23 → E-CONTACT), mind. 1 Fach, Stufen nach R-24, Format (`elsewhere` nur nach R-16), mind. 1 Zeit, Online-Zeiten nach R-25, Plätze 1–5, Preis 0–30 → sonst E-INVALID. **Schreibt:** Bewerbung (`submitted`, `ConsentStatus` nach R-21 aus Profil), Fall-Notiz (leer), Rolle `applicant` im Profil. B-RECHTE (Bewerber). **Benachrichtigt:** N-01 an alle LEI. **Protokoll.**
- `updateApplication`: nur eigener Eintrag (Person = Author) und `State = submitted` → sonst E-LOCKED (R-22). Gleiche Prüfungen wie bei `apply` (5).
- `withdrawApplication`: nur eigener, `State` in (`submitted`,`interview`,`appeal`) → `withdrawn`. Rolle `applicant` entfernen; hat die Person keine Rolle mehr, bekommt sie `learner` (wie Prototyp).
- `methodRead`: Index 0–8 in `MethodsRead` ergänzen/entfernen. Kein Protokoll.
- `appeal`: nur eigener, `State = rejected`, `AppealUsed = nein` → sonst E-NOT-ALLOWED. Text 1–500. **Schreibt:** `State = appeal`, `Appeal`, `AppealUsed = ja`. **Benachrichtigt:** N-03 an LEI außer `DecidedBy` und außer `Conflicts`; ist niemand übrig → an LK (R-31, R-33).

### F-03 Anfrage
**Aktionen:** `request`, `withdrawRequest` · **Gleichzeitigkeit 1**
- `request`: (1) Profil fehlt oder Rolle `learner` fehlt → E-NO-PROFILE. (2) `LearnerState` = `restricted` → E-CONSENT (R-42); `suspended`/`banned` → E-NOT-ALLOWED. (3) Steckbrief `TargetId` laden; nicht `Visible` oder `Paused` → E-UNAVAILABLE. (4) Tutor = Person selbst → E-SELF (R-44). (5) Klasse der Person nicht in `GradeBands` → E-GRADE (R-40; keine Altersgrenze mehr, D-26). (6) `HasFreeSeats` = nein (Tutor-Akte neu zählen: `SeatsUsed >= Capacity`) → E-FULL (R-43). (7) Offene Anfrage der Person bei diesem Tutor → E-DUPLICATE; Anzahl offener Anfragen ≥ `maxOpenRequests` → E-TOO-MANY (R-41). (8) Fach nicht in `Subjects` des Tutors, Anliegen ungültig, Zeiten nicht aus den Tutor-Zeiten, Nachricht > 300 → E-INVALID (R-47). (9) Wunsch-Orte: mind. einer, alle in `Formats` des Tutors → sonst E-INVALID. Bleibt nach Abzug nicht erlaubter Orte keiner übrig: nur `online` gewünscht, Klasse 5–6 und `OnlineAllowed` = nein → E-ONLINE (R-12); nur `elsewhere` gewünscht und `OutsideAllowed` = nein → E-PLACE (R-16). Gespeichert werden nur erlaubte Orte. **Schreibt:** Nachhilfe (`open`, Kopie-Felder, `Deadline` = B-SCHULTAGE(heute, `requestDeadlineSchoolDays`)). B-RECHTE (Tutor + Nehmende/r). `ResultData` = `{"tutoringId":id}`. **Benachrichtigt:** N-04 an Tutor. **Protokoll.**
- `withdrawRequest`: nur eigene (`Learner` = Author), `State = open` → `withdrawn`. Sonst E-NOT-ALLOWED.

### F-04 Antwort des Tutors
**Aktionen:** `accept`, `decline` · **Gleichzeitigkeit 1**
- Beide: (1) Nachhilfe laden, `Tutor` = Author, `State = open` → sonst E-NOT-ALLOWED bzw. E-GONE (schon beantwortet/abgelaufen).
- `accept`: (2) Tutor-Akte: `TutorState = active` → sonst E-UNAVAILABLE. (3) `SeatsUsed >= Capacity` → E-FULL (R-46). **Schreibt:** `State = trial`. (F-91 zählt danach die Plätze.) **Benachrichtigt:** N-05 an Nehmende/n.
- `decline`: **Schreibt:** `State = declined`, `DeclineReason`. **Benachrichtigt:** N-05.

### F-05 Stunden
**Aktionen:** `logLesson`, `answerLesson` · Gleichzeitigkeit: Standard
- `logLesson`: (1) `Tutor` = Author, `State` in (`trial`,`running`) → sonst E-NOT-ALLOWED. (2) Datum nicht in der Zukunft, höchstens 14 Tage zurück, Dauer 45/60, Ort gültig, online bei Kl. 5–6 nur mit `LearnerOnlineAllowed`, `elsewhere` nur mit `LearnerOutsideAllowed` → E-INVALID / E-ONLINE / E-PLACE (R-52, R-16). **Schreibt:** Stunde an `Lessons` anhängen (`pending`; `trial = true`, wenn es die erste Stunde ist, R-50), `LastLessonAt`. Bei erster Stunde: `ContinueAskedAt = jetzt`. **Benachrichtigt:** N-06 an Nehmende/n; bei Probestunde zusätzlich N-07 an beide.
- `answerLesson`: (1) `Learner` = Author, Stunde existiert und ist `pending` → sonst E-GONE. **Schreibt:** `confirmed` oder `disputed`. Bei `confirmed`: Tutor-Akte `HoursConfirmed` + (Minuten/60), Steckbrief-Kopie; Abzeichen bei 10/20/50 (R-65). Bei `disputed`: B-NOTIFY N-06 an Tutor (neutral). **Protokoll.**

### F-06 Verlauf der Nachhilfe
**Aktionen:** `continue`, `end`, `feedback`, (`message` erst Version 1.1) · **Gleichzeitigkeit 1**
- Alle: Author ist `Tutor` oder `Learner` der Nachhilfe → sonst E-NOT-ALLOWED.
- `continue`: nur `State = trial` und Probestunde eingetragen → sonst E-NOT-ALLOWED. `yes = false` → `ended`, `EndReason = noContinue`, `EndedBy` = Seite; N-08 an die andere Seite ohne Grund. `yes = true` → eigene Spalte `Continue…` = `yes`; sind beide `yes` → `running` (R-51).
- `end`: `State` in (`trial`,`running`) → `ended`, `EndReason = byUser`, `EndedBy`, `EndedAt`. N-08 an die andere Seite (R-56).
- `feedback`: B-LOG (R-83). Kein Eintrag in der Nachhilfe. Bei `fits = true` zusätzlich neutrale Nachricht an den Tutor („Du hast eine gute Rückmeldung bekommen“, ohne Freitext, D-31).

### F-07 Tutor verwaltet sich selbst
**Aktionen:** `pause`, `changeQuick`, `changeRequest`, `quit` · **Gleichzeitigkeit 1**
- Alle: Tutor-Akte (TargetId) gehört Author, `State = approved`. `TutorState` `suspended`/`banned` → E-NOT-ALLOWED.
- `pause`: `TutorState` `active` ↔ `paused`; Steckbrief `Paused`. (R-60)
- `changeQuick`: Zeiten (R-25), Preis 0–30, Plätze 1–5 und nicht unter `SeatsUsed` → E-INVALID. Sofort in Akte und Steckbrief (R-61).
- `changeRequest`: Prüfungen wie `apply` (5) für die geänderten Felder. **Schreibt:** `PendingChange`. **Benachrichtigt:** N-01-ähnlich an LEI („Neues in nachhilfly“).
- `quit`: `TutorState = quit`, Steckbrief `Visible = nein`, alle Nachhilfen des Tutors enden nach R-57 (`EndReason = unavailable`), N-08 an die Nehmenden. Alle Gruppen des Tutors absagen (wie F-13 `cancelGroup`, `CancelReason = unavailable`, N-17). Rolle `tutor` entfernen.

### F-08 Leitung: Bewerbungen
**Aktionen:** `scheduleInterview`, `approve`, `reject`, `conflict` · Gleichzeitigkeit 1
- Alle: (1) `isLead` oder `isTeacher` → sonst E-NOT-ALLOWED. (2) Bewerbung gehört Author → E-SELF (R-30). (3) Author in `Conflicts` der Fall-Notiz → E-CONFLICT (R-32).
- `scheduleInterview`: `State = submitted` → `interview`, `InterviewAt`, `InterviewPlace`. N-02 an Bewerber.
- `approve`: `State` in (`interview`,`appeal`). Bei `appeal`: Author ≠ `DecidedBy` → E-SELF (R-31). `ConsentStatus = missing` → E-CONSENT (R-21). **Schreibt:** `State = approved`, `TutorState = active`, `Capacity` aus Entwurf, Steckbrief anlegen (`Visible = ja`, `HasFreeSeats = ja`), `CardId`. Fall-Notiz `DecidedBy`/`AppealDecidedBy`. Profil: Rolle `applicant` → `tutor`. N-02.
- `reject`: Grund 1–300 Pflicht → E-INVALID. `State` in (`submitted`,`interview`) → `rejected`, `RejectReason`, `ReapplyFrom` = heute + `reapplyDays`. `State = appeal` → Author ≠ `DecidedBy` (E-SELF) → `finalRejected`. N-02.
- `conflict`: Author zu `Conflicts` hinzufügen. Bleibt kein unbefangenes LEI-Mitglied (alle 3 befangen oder selbst betroffen) → N-03 an LK (R-33).

### F-09 Leitung: Tutoren
**Aktionen:** `suspendTutor`, `unsuspendTutor`, `banTutor`, `approveChange`, `rejectChange`, `badge`, `appealBan` (Tutor) · **Gleichzeitigkeit 1**
- Alle außer `appealBan`: `isLead` oder `isTeacher`, nicht eigene Akte (E-SELF), nicht befangen (E-CONFLICT).
- `suspendTutor`: Grund Pflicht. `TutorState = suspended`, Steckbrief `Visible = nein`, alle Nachhilfen enden (R-57), alle Gruppen abgesagt (`unavailable`, N-17), N-08 an Nehmende, N-11 an Tutor und LK. Fall-Notiz `Note`.
- `unsuspendTutor`: `suspended` oder `banned` → `paused`, Steckbrief `Visible = ja`, `Paused = ja` (R-35). N-11.
- `banTutor`: LK → sofort `banned`. LEI → Stimme in `BanVotes` (keine doppelte Stimme derselben Person). Bei 2 verschiedenen Stimmen → `banned`. Beim Sperren: wie `suspendTutor` + N-11 an LK immer (R-34).
- `approveChange` / `rejectChange`: `PendingChange` übernehmen in Akte, Entwurf und Steckbrief bzw. verwerfen (Grund an Tutor über N-02-Text „Neues in nachhilfly“).
- `badge`: Text 1–30 an `Badges` anhängen (Akte + Steckbrief).
- `appealBan`: Author = Tutor der Akte, `TutorState = banned`, noch kein Einspruch → Text in Fall-Notiz, N-03 an LEI außer Abstimmenden, sonst LK.

### F-10 Meldungen
**Aktionen:** `report`, `decideReport` · Gleichzeitigkeit: Standard
- `report`: (1) Grund gültig, Text 1–1000 → E-INVALID. (2) Bei `aboutType` `tutor`/`learner`: Beziehung prüfen (DATENMODELL.md §5 Hinweis) → E-NOT-ALLOWED. **Schreibt:** Meldung ohne meldende Person; bei `tutor`/`app` B-RECHTE für Gruppe LEI. **Protokoll** mit meldender Person (nur LK liest). **Benachrichtigt:** N-09 (R-70).
- `decideReport`: Über Nehmende nur `isTeacher` (R-37), sonst LEI oder LK, nicht über sich selbst (E-SELF). `State = done`, `Decision`. Bei `suspended` und Tutor: wie F-09 `suspendTutor`. Bei `handedToTeacher`: N-09 an LK.

### F-11 Kinderschutz
**Aktion:** `childProtection` · Gleichzeitigkeit: Standard · **Kein B-LOG mit Inhalt**
(1) Text 1–1000. (2) Mail (Office 365 Outlook „E-Mail senden (V2)“) an die Adresse der Kinderschutz-Ansprechperson (oben im Flow als Variable `kinderschutzMail`, **nicht** in `NhSettings`, damit Schüler sie nicht lesen), Betreff „nachhilfly: Kinderschutz-Meldung“, Inhalt: Text, Name und Klasse der meldenden Person, Kontext. Wichtigkeit hoch. (3) Eingang-Eintrag löschen, dann aus dem Papierkorb löschen (HTTP an SharePoint: `POST _api/web/recyclebin('{id}')/deleteObject()`; die ID über `_api/web/recyclebin?$filter=LeafName eq '{id}_.000'` finden). (4) B-LOG nur: „Kinderschutz-Meldung weitergeleitet“ ohne Person, ohne Text (R-71). Die App wartet hier nicht auf `done`, sondern auf das Verschwinden des Eintrags (siehe ARCHITEKTUR.md §Senden).

### F-12 Lehrkraft
**Aktionen:** `consent`, `setGrade`, `learnerState`, `setting`, `appealBan` (Nehmende) · Gleichzeitigkeit: Standard · alle nur `isTeacher` → sonst E-NOT-ALLOWED
- `consent`: Einwilligung `ok`, `OnlineAllowed`, `OutsideAllowed`, `ReceivedOn`, `EnteredBy`. Profil `ConsentOk`, `OnlineAllowed`, `OutsideAllowed`, `LearnerState` `restricted` → `active`. Offene Bewerbungen `ConsentStatus` `missing` → `ok`. Offene Nachhilfen und Gruppen-Teilnahmen: `LearnerOnlineAllowed`, `LearnerOutsideAllowed` aktualisieren.
- `setGrade`: Profil, Steckbrief, Bewerbung, offene Nachhilfen (Kopien) aktualisieren. Einwilligungspflicht neu bewerten.
- `learnerState`: `suspended`/`banned`/`active`. Bei `banned`: alle Nachhilfen enden (`EndReason = unavailable` aus Sicht des Tutors neutral). N-11.
- `setting`: Schlüssel muss in ENTSCHEIDUNGEN.md §Einstellungen stehen → sonst E-INVALID. Wert schreiben. Bei `holidays`: F-20 rechnet Fristen beim nächsten Lauf neu (R-91).

### F-13 Gruppen
**Aktionen:** `createGroup`, `updateGroup`, `cancelGroup`, `joinGroup`, `leaveGroup`, `logGroupSession`, `answerGroupSession`, `hideGroup` · **Gleichzeitigkeit 1** (sonst können zwei Personen den letzten Platz bekommen)
- `createGroup`: (1) Tutor-Akte `approved`, `TutorState = active`, Fach in den bestätigten Fächern → E-NOT-ALLOWED (R-100). (2) Aktive Gruppen (`open`/`closed`) des Tutors ≥ `maxActiveGroupsPerTutor` → E-TOO-MANY (R-102). (3) Pflichtangaben und Grenzen nach R-101, Termine in der Zukunft und sortiert, Anmeldeschluss ≤ erster Termin → E-INVALID; Kontaktdaten in Titel/Beschreibung → E-CONTACT; `elsewhere` nur, wenn der Tutor selbst R-16 erfüllt → E-PLACE. **Schreibt:** Gruppe (`open`, `Visible = ja`, `MemberCount = 0`, Termin-IDs `s1`, `s2` …, `NextSessionAt`). `ResultData` = `{"groupId":id}`. **Protokoll.**
- `updateGroup`: eigene Gruppe, Zustand `open`/`closed`. `MemberCount = 0` → alle Felder wie bei `createGroup`; sonst nur erlaubte Felder nach R-106 → sonst E-LOCKED. Termine anhängen (Grenze `groupMaxSessions`). Bei `MemberCount > 0`: N-17 an alle `joined`.
- `cancelGroup`: eigene Gruppe. Mit `sessionId`: Termin `cancelled`; ohne: alle geplanten Termine `cancelled`, Gruppe `cancelled` (`byTutor`). Sind alle Termine abgesagt → Gruppe `cancelled`. Teilnahmen bei ganzer Absage → `cancelled`. N-17 an alle `joined`. `NextSessionAt` neu.
- `joinGroup`: Prüfungen nach R-104 in dieser Reihenfolge: E-NO-PROFILE · E-SELF · E-GONE (Zustand nicht `open`, Anmeldeschluss vorbei, nicht `Visible`) · E-GRADE · E-CONSENT / E-NOT-ALLOWED (`suspended`/`banned`) · E-ONLINE / E-PLACE · E-DUPLICATE · E-TOO-MANY (aktive Teilnahmen ≥ `maxGroupsPerLearner`) · E-FULL (`MemberCount ≥ MaxSize`). **Schreibt:** Teilnahme (`joined`, Kopie-Felder, `Attendance = []`). B-RECHTE (Tutor + Teilnehmende/r). `MemberCount` + 1. **Benachrichtigt:** N-15 an Tutor. **Protokoll.**
- `leaveGroup`: eigene Teilnahme `joined` → `left`, `LeftAt`. `MemberCount` − 1. N-15 an Tutor.
- `logGroupSession`: eigene Gruppe, Termin `planned`, Beginn vorbei (höchstens 14 Tage) → sonst E-INVALID. `held = false` → wie Termin absagen. `held = true`: Termin `held`. Für jede Teilnahme `joined`: Eintrag in `Attendance` (`present` = nicht in `absent`; anwesend → `state = pending`, sonst `absent`). N-06 an alle Anwesenden.
- `answerGroupSession`: Teilnahme gehört Author, Eintrag `pending` → sonst E-GONE. `confirmed`/`disputed`. War es die **erste** Bestätigung für diesen Termin: Tutor-Akte `HoursConfirmed` + Dauer/60, Steckbrief-Kopie, Abzeichen-Prüfung (R-109, R-65). Bestritten → N-06 an Tutor (neutral).
- `hideGroup`: `isLead` oder `isTeacher`, nicht eigene Gruppe (E-SELF), Grund 1–300 → E-INVALID. Gruppe `cancelled` (`hidden`), `Visible = nein`, Teilnahmen `cancelled`, N-17 an Teilnehmende (ohne Grund), N-11-artig an LK. Grund nur ins Protokoll (R-111).

## 4. Flows mit Zeitplan
### F-20 Tageslauf (täglich 06:00, `W. Europe Standard Time`)
In dieser Reihenfolge, jeder Schritt in einem eigenen Bereich (ein Fehler stoppt nicht die anderen):
1. Ist heute kein Schultag (R-90): Fristen nicht prüfen, nur Schritt 8 (Zahlen).
2. Anfragen `open` mit `Deadline` < heute → `expired`, N-05 (R-45).
3. Stunden `pending` älter als `lessonConfirmDays` (ohne Ferientage) → `void` (R-53).
4. Probephase: `ContinueAskedAt` + 7 Tage ohne beide Antworten → N-07 (einmal, `RemindersSent`); + 14 Tage → `ended`, `noContinue` (R-51).
5. `running`/`trial` ohne Stunde seit 3 Wochen → N-07 (einmal); seit 5 Wochen → `ended`, `inactive` (R-55).
6. Bewerbungen `submitted` länger als `interviewWithinSchoolDays` → N-14 an LEI (einmal) (R-29).
7. Ab `abiPauseFrom`: Tutoren mit Klasse J2 und `TutorState = active` → `paused` (R-59). An `examReminderDates`: N-07-artige Erinnerung an KS-Tutoren.
8. `NhStats` neu berechnen (R-36: nur Zahlen).
9. Konten prüfen (B-PERSON-DA) für alle Tutoren mit offenen Nachhilfen oder aktiven Gruppen; fehlt eins → R-57 (R-84).
10. **Gruppen:** `open` mit `SignupUntil` < jetzt → `closed`; liegt `MemberCount` unter `MinSize` → N-16 an Tutor (einmal, R-108). Termine `planned`, deren Beginn mehr als 1 Tag vorbei ist → N-16 „Termin eintragen“ an Tutor (einmal je Termin, R-109). `Attendance`-Einträge `pending` älter als `lessonConfirmDays` → `void`. Gruppe ohne geplante Termine in der Zukunft und Zustand `open`/`closed` → `done`, Teilnahmen `joined` → `done` (R-114). `NextSessionAt` neu setzen.

### F-21 Wochenbericht (montags 07:00)
Mail an LK: offene Einwilligungen (Name, Klasse, seit wann) (N-12) und Protokoll der letzten 7 Tage als Tabelle.

### F-22 Löschen (am 1. jedes Monats, 03:00)
Löschfristen nach R-81. Danach Papierkorb der Website (erste und zweite Stufe) für Einträge der nachhilfly-Listen leeren. Anzahl gelöschter Einträge ins Protokoll.

### F-23 Schuljahresende (manuell starten oder am `schoolYearEnd`)
Alle Nachhilfen `open`/`trial`/`running` → beendet bzw. `expired`, `EndReason = schoolYearEnd` (R-58). Gruppen `open`/`closed` → `cancelled` (`schoolYearEnd`), Teilnahmen → `cancelled`. Bewerbungen `submitted`/`interview` → `withdrawn` mit Hinweis. Profile: `GradeSource = manual` → Klasse um 1 erhöhen oder Lehrkraft-Hinweis (O-12). J2 → Profil, Steckbrief, Akte löschen.

### F-24 Bescheinigungen (Version 1.1)
Liste der Tutoren mit mindestens einer bestätigten Stunde als Mail an die Leitung, als Grundlage für Bescheinigung bzw. Zeugnisvermerk (D-32).

## 5. Hilfs-Flows mit eigenem Trigger
### F-90 Versand (Trigger: Element erstellt in `NhNotify`)
Template N-xx → neutraler Text „Neues in nachhilfly“ + Link (R-82). Kanal `teams`: Microsoft Teams „Nachricht in Chat oder Kanal posten“ als Flow-Bot an `Recipient` (O-21). Scheitert das oder Kanal `mail`: Outlook „E-Mail senden (V2)“ vom Funktionskonto. N-10 und N-13 immer per Mail mit `Body`. Danach `State = sent` bzw. `error`. Einträge löscht F-22 nach 30 Tagen.

### F-91 Plätze zählen (Trigger: Element erstellt oder geändert in `NhTutorings`)
Für den Tutor des Eintrags: Anzahl Nachhilfen in `trial`/`running` → `SeatsUsed` in der Akte (Gruppen zählen nicht, R-102); Steckbrief `HasFreeSeats = SeatsUsed < Capacity` (R-63). Schreibt nicht in `NhTutorings` (sonst Endlosschleife). Gleichzeitigkeit 1.

### F-00 Echo (nur Testseite, Technik-Test T-2.4)
Trigger Eingang, keine Bedingung. Setzt `State = processing`, wartet 1 Sekunde, setzt `State = done`, `ResultCode = OK`. Dient nur zum Messen der Laufzeit (O-32). Nach Phase 2 ausschalten.

### F-99 Vorlage (T-7.0)
Leerer Eingang-Flow mit B-KOPF, Bereich „Versuch“, Bereich „Fehler“ mit B-FEHLER, B-ENDE und einem Beispiel für B-ABLEHNEN. Wird nie eingeschaltet. Jeder neue Eingang-Flow startet als Kopie („Speichern unter“).

## 6. Testen und Sichern
- Jeder Flow wird zuerst auf der **Testseite** mit Testkonten gebaut (T-0.x). Pro Flow eine Testtabelle in `flows/anleitungen/F-xx.md`: Eingabe → erwartetes Ergebnis (inkl. jeder Ablehnung E-xx).
- Nach jeder Änderung: Flow exportieren („Exportieren → Paket (.zip)“). Die Datei enthält keine Passwörter, aber echte Schul-Adressen (z. B. `kinderschutzMail`). Deshalb: **nicht ins Git-Repo**, sondern in die Dokumentbibliothek des nachhilfly-Teams, Ordner `Flows/F-xx/`. Im Repo (`flows/export/LIESMICH.md`) steht nur, welche Version wo liegt.
- Laufzeit messen: Wie lange dauert `request` vom Anlegen bis `done`? Ergebnis in ENTSCHEIDUNGEN.md bei O-32 eintragen. Die App-Zeitgrenzen (ARCHITEKTUR.md §Senden) danach richten.
