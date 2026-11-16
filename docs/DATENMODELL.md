# DATENMODELL – Listen, Spalten, Rechte, Aktionen

**Wann lesen:** Beim Anlegen der Listen (T-3.x), beim Lesen/Schreiben von Daten im Code (`SharePointService`, `mapping.ts`) und beim Bau jedes Flows.
**Grundsatz:** Schüler schreiben nie direkt in die eigentlichen Listen. Jede Aktion ist ein Eintrag in `NhInbox`. Ein Flow unter dem Funktionskonto prüft ihn und schreibt in die geschützten Listen. Grund: SharePoint kann einzelne Spalten nicht schützen; wer einen Eintrag bearbeiten darf, darf jedes Feld ändern (auch über die Listenansicht oder Excel).

## Inhalt
1. Gruppen und Konten
2. Übersicht der Listen und Rechte
3. Spalten je Liste (L-01 … L-12)
4. Einzelrechte (wie Einträge geschützt werden)
5. Aktionen im Eingang (A-xx) – der Vertrag zwischen App und Flows
6. Feste Wertelisten (Fächer, Stufen, Anliegen …)

## 1. Gruppen und Konten
| Kürzel | SharePoint-Gruppe / Konto | Mitglieder |
|---|---|---|
| SCH | „nachhilfly Schüler“ | alle Schüler/innen (wie genau: O-31) |
| LEI | „nachhilfly Leitungsteam“ | 3 SMV-Schüler, jedes Schuljahr neu |
| LK | „nachhilfly Lehrkraft“ | betreuende Lehrkraft |
| DEV | „nachhilfly Entwicklung“ | Subi + Nachfolger. **Nur auf der Testseite** mit Vollzugriff. Auf der echten Seite keine Sonderrechte. |
| FK | Funktionskonto (z. B. `nachhilfly@…`) | Besitzer der Website, besitzt alle Flows. Kein Mensch meldet sich damit im Alltag an. |
| ADM | IT-Admin (Frau Hilchentwort) | Website-Besitzer, App-Katalog |

## 2. Übersicht der Listen und Rechte
Alle Listen liegen auf der nachhilfly-Website (Adresse in `app/src/config.ts`). Internen Listennamen ohne Umlaute, Anzeigenamen deutsch.
Rechte: **R** lesen · **R-eigene** nur eigene Einträge sehen · **+eigene** hinzufügen und eigene sehen · **E** Einzelrechte pro Eintrag (§4) · **–** kein Zugriff. FK hat überall Vollzugriff, ADM ist Besitzer.

| ID | Interner Name | Anzeigename | Inhalt | SCH | LEI | LK |
|---|---|---|---|---|---|---|
| L-01 | `NhInbox` | Eingang | Alle Anträge der App | +eigene | +eigene | +eigene |
| L-02 | `NhSettings` | Einstellungen | Ferien, Fristen, Not-Aus, Ansprechpersonen | R | R | R |
| L-03 | `NhProfiles` | Profile | Person, Klasse, Avatar, Rollen, Zustand | E (eigenes) | – | R |
| L-04 | `NhConsents` | Einwilligungen | Eltern-Einwilligungen | – | – | R |
| L-05 | `NhApplications` | Bewerbungen und Tutoren | Bewerbung + Tutor-Akte (Zustand, Plätze) | E (eigene) | R | R |
| L-06 | `NhTutorCards` | Steckbriefe | Nur Anzeigefelder für Finden | R | R | R |
| L-07 | `NhTutorings` | Nachhilfen | Anfragen und Nachhilfen mit Stunden | E (Tutor + Nehmende/r) | – | R |
| L-08 | `NhReports` | Meldungen | Meldungen Art 1, ohne meldende Person | – | E (über Tutoren/App) | R |
| L-09 | `NhLog` | Protokoll | Wer hat wann was getan | – | – | R |
| L-10 | `NhStats` | Zahlen | Anonyme Zahlen, 1 Eintrag | – | R | R |
| L-11 | `NhNotify` | Benachrichtigungen | Warteschlange für Teams-Nachrichten/Mails | – | – | – |
| L-12 | `NhCaseNotes` | Fall-Notizen | Interne Notizen zu Bewerbungen/Tutoren (wer entschieden, befangen, Sperr-Stimmen) | – | R | R |
| L-13 | `NhGroups` | Gruppen | Gruppen-Angebote (nur Anzeigefelder, Zahl der Angemeldeten) | R | R | R |
| L-14 | `NhGroupMembers` | Gruppen-Teilnahmen | Wer ist in welcher Gruppe, Anwesenheit, Bestätigungen | E (Tutor + Teilnehmende/r) | – | R |

**Warum so viele Listen?** Sichtbarkeit wird über Listen getrennt. Was der Bewerber nicht sehen soll (wer abgelehnt hat, wer befangen ist), steht nicht in seiner Bewerbung, sondern in L-12.

## 3. Spalten je Liste
Standardspalten jeder Liste: `ID`, `Title`, `Created`, `Author` (Erstellt von), `Modified`, `Editor`. Typen: **Text** (eine Zeile, max. 255) · **Note** (mehrzeilig, nur Text, kein HTML) · **Number** · **Bool** (Ja/Nein) · **Choice** · **Multi** (Mehrfachauswahl) · **Date** (Datum und Uhrzeit) · **User** (Person) · **Users** (mehrere Personen). **Idx** = Spalte indizieren. JSON-Felder sind Note-Spalten, Inhalt mit `JSON.stringify`.

### L-01 `NhInbox` (Eingang)
Listeneinstellung: Lesezugriff „nur eigene Elemente“, Bearbeiten „nur eigene Elemente“ (ReadSecurity=2, WriteSecurity=2). Versionierung aus.
| Spalte | Anzeige | Typ | Inhalt |
|---|---|---|---|
| `Title` | Titel | Text | = Aktionscode (zum Lesen in der Listenansicht) |
| `Action` | Aktion | Choice, Idx | Aktionscode aus §5 (z. B. `request`) |
| `TargetId` | Bezug | Number | ID des betroffenen Eintrags (z. B. Nachhilfe-ID), sonst leer |
| `Payload` | Daten | Note | JSON nach §5 |
| `State` | Status | Choice, Idx | `new` · `processing` · `done` · `rejected` · `error` (Z-7). Standard `new` |
| `ResultCode` | Ergebnis | Text | `OK` oder Fehlercode E-xx (TEXTE.md §Fehler) |
| `ResultData` | Ergebnisdaten | Note | JSON, z. B. `{"tutoringId":12}` |
| `ProcessedAt` | Verarbeitet | Date | |

**Sicherheit:** Der Flow liest Daten nur aus dem Trigger-Inhalt (Zustand beim Anlegen) und nimmt die handelnde Person **nur aus `Author`** (harte Regel 3 in CLAUDE.md). Ändert jemand den Eintrag nachträglich, hat das keine Wirkung.

### L-02 `NhSettings` (Einstellungen)
Ein Eintrag pro Schlüssel. `Title` = Schlüssel, `Value` (Note) = Wert als Text oder JSON. Schlüssel und Standardwerte: ENTSCHEIDUNGEN.md §Einstellungen.

### L-03 `NhProfiles` (Profile)
| Spalte | Anzeige | Typ | Inhalt |
|---|---|---|---|
| `Person` | Person | User, Idx | Schulkonto |
| `Email` | E-Mail | Text, Idx | Kleinbuchstaben, zum Suchen in Flows |
| `DisplayName` | Name | Text | „Vorname N.“ (Nachname abgekürzt) |
| `Grade` | Klasse | Choice | `5` … `10`, `J1`, `J2` |
| `GradeSource` | Klasse aus | Choice | `account` · `manual` |
| `Avatar` | Avatar | Number | 0–11 |
| `Roles` | Rollen | Multi | `learner` · `applicant` · `tutor` |
| `LearnerState` | Zustand | Choice | Z-1. Leer, wenn nicht `learner` |
| `ConsentOk` | Einwilligung | Bool | Kopie aus L-04 (damit die Person ihren Stand sieht) |
| `OnlineAllowed` | Online erlaubt | Bool | Kopie aus L-04 |
| `OutsideAllowed` | Außerhalb erlaubt | Bool | Kopie aus L-04 (R-16). Ja, wenn keine Einwilligung nötig ist |
| `LastView` | Letzte Ansicht | Text | `learner` · `applicant` · `tutor` · `lead` · `teacher` |
| `RulesAcceptedAt` | Regeln bestätigt | Date | |

### L-04 `NhConsents` (Einwilligungen)
| Spalte | Typ | Inhalt |
|---|---|---|
| `Person` | User, Idx | Schüler/in |
| `DisplayName` | Text | |
| `Grade` | Choice | |
| `State` | Choice | `waiting` · `ok` · `revoked` |
| `OnlineAllowed` | Bool | Eltern haben „online erlaubt“ angekreuzt |
| `OutsideAllowed` | Bool | Eltern haben „Treffen außerhalb der Schule erlaubt“ angekreuzt (R-16) |
| `ReceivedOn` | Date | Datum des Formulars |
| `EnteredBy` | User | Lehrkraft |

### L-05 `NhApplications` (Bewerbungen und Tutoren)
Ein Eintrag pro Bewerbung. Der bestätigte Eintrag ist zugleich die **Tutor-Akte**. Der Bewerber sieht seinen Eintrag (Einzelrechte), deshalb stehen hier **keine** internen Daten (die stehen in L-12).
| Spalte | Typ | Inhalt |
|---|---|---|
| `Person` | User, Idx | Bewerber/Tutor |
| `DisplayName`, `Grade`, `Avatar` | Text, Choice, Number | Kopie aus Profil |
| `State` | Choice, Idx | Z-2 |
| `Draft` | Note | JSON Steckbrief-Entwurf: `{avatar, bio, subjects[], mainSubject, gradeBands[], helpTypes[], formats[], times[{day,slot}], price, languages, capacity}` |
| `InterviewSlots` | Note | JSON `["2026-11-20T13:15", …]` Vorschläge des Bewerbers |
| `InterviewAt` | Date | vereinbarter Termin |
| `InterviewPlace` | Text | z. B. „SMV-Raum“ |
| `ConsentStatus` | Choice | `notNeeded` · `missing` · `ok` (R-21) |
| `MethodsRead` | Text | gelesene Lehrmethoden, z. B. `0,1,3` |
| `RejectReason` | Note | Grund für den Bewerber (R-27) |
| `ReapplyFrom` | Date | frühestens neu bewerben |
| `Appeal` | Note | Einspruchstext |
| `AppealUsed` | Bool | Einspruch verbraucht (R-28) |
| `TutorState` | Choice, Idx | Z-3, nur bei `approved` |
| `Capacity` | Number | Plätze 1–5 |
| `SeatsUsed` | Number | belegt (R-63), vom Flow F-91 gesetzt |
| `HoursConfirmed` | Number | bestätigte Stunden (R-54) |
| `Badges` | Note | JSON `["10 Stunden geholfen"]` |
| `PendingChange` | Note | JSON beantragter Änderung (R-61), sonst leer |
| `CardId` | Number | ID des Steckbriefs in L-06 |

### L-06 `NhTutorCards` (Steckbriefe)
Nur Felder, die alle sehen dürfen. Wird nur von Flows geschrieben (bei Bestätigung, Änderung, Pause, Plätzen).
| Spalte | Typ | Inhalt |
|---|---|---|
| `Person` | User, Idx | Tutor |
| `DisplayName`, `Grade`, `Avatar` | Text, Choice, Number | |
| `Bio` | Note | Kurztext (200) |
| `Subjects` | Multi | Fachkürzel §6 |
| `MainSubject` | Choice | Fach für den Banner (erstes Fach) |
| `GradeBands` | Multi | `5-6` · `7-8` · `9-10` · `KS` |
| `HelpTypes` | Multi | §6 |
| `Formats` | Multi | `school` · `online` · `elsewhere` (R-16, R-24) |
| `Times` | Note | JSON `[{"day":"Mo","slot":"15-16"}]` |
| `Price` | Number | Euro pro 60 Min, 0 = kostenlos |
| `Languages` | Text | freiwillig |
| `Badges` | Note | JSON, Kopie aus L-05 |
| `HoursConfirmed` | Number | Kopie |
| `Visible` | Bool, Idx | sichtbar in Finden (R-48) |
| `Paused` | Bool | pausiert |
| `HasFreeSeats` | Bool | freie Plätze ja/nein (R-63) |
| `ApplicationId` | Number | Bezug zu L-05 |

### L-07 `NhTutorings` (Nachhilfen, inkl. Anfragen)
Neue Einträge sind für Schüler unsichtbar, bis der Flow Einzelrechte für Tutor und Nehmende/n vergibt (§4). Stunden stehen als JSON im Eintrag, damit nur ein Eintrag pro Nachhilfe eigene Rechte braucht.
| Spalte | Typ | Inhalt |
|---|---|---|
| `Tutor` | User, Idx | |
| `TutorName`, `TutorAvatar` | Text, Number | Kopie (Steckbrief kann später unsichtbar sein) |
| `Learner` | User, Idx | |
| `LearnerName`, `LearnerGrade`, `LearnerAvatar` | Text, Choice, Number | Kopie, damit der Tutor kein Profil lesen muss |
| `LearnerOnlineAllowed` | Bool | nur ja/nein (R-12) |
| `LearnerOutsideAllowed` | Bool | nur ja/nein (R-16) |
| `Places` | Multi | Wunsch-Orte der Anfrage: `school` · `online` · `elsewhere` |
| `Subject` | Choice | Fachkürzel |
| `Concern` | Choice | Anliegen §6 |
| `Times` | Note | JSON gewünschte Zeiten `[{"day":"Mo","slot":"15-16"}]` |
| `Message` | Note | Nachricht (300) |
| `State` | Choice, Idx | Z-4 |
| `Deadline` | Date | Antwortfrist (R-45) |
| `DeclineReason` | Text | optional, sieht Nehmende/r |
| `Lessons` | Note | JSON `[{"id":"l1","date":"2026-11-03","minutes":60,"place":"school|online|elsewhere","trial":true,"state":"pending","loggedAt":"…","answeredAt":"…"}]` |
| `LastLessonAt` | Date | für R-55 |
| `ContinueTutor`, `ContinueLearner` | Choice | `yes` · `no` · leer (R-51) |
| `ContinueAskedAt` | Date | wann die Frage kam |
| `RemindersSent` | Text | z. B. `continue7,inactive3` damit nicht doppelt erinnert wird |
| `EndedBy` | Choice | `tutor` · `learner` · `system` |
| `EndReason` | Choice | Z-4 |
| `EndedAt` | Date | |

### L-08 `NhReports` (Meldungen Art 1)
| Spalte | Typ | Inhalt |
|---|---|---|
| `AboutType` | Choice, Idx | `tutor` · `learner` · `app` |
| `AboutPerson` | User | leer bei `app` |
| `AboutName` | Text | |
| `Context` | Text | z. B. `tutoring:12` oder `card:4` |
| `Reason` | Choice | Meldegründe §6 |
| `Text` | Note | (1000) |
| `State` | Choice, Idx | Z-6 |
| `Decision` | Choice | Z-6 |
| `DecidedAt` | Date | |
Die meldende Person steht **nur** in L-09 (Protokoll, Lehrkraft).

### L-09 `NhLog` (Protokoll)
| Spalte | Typ | Inhalt |
|---|---|---|
| `Title` | Text | Aktionscode oder Ereignis (z. B. `approve`, `deadline-expired`) |
| `Actor` | User | wer (leer = System) |
| `ActorRole` | Choice | `learner` · `tutor` · `applicant` · `lead` · `teacher` · `system` |
| `Target` | Text, Idx | `application:5`, `tutoring:12`, `report:3`, `profile:7`, `settings` |
| `Details` | Note | lesbarer Satz, z. B. „Bewerbung von Paul W. bestätigt“; bei Meldungen inkl. meldender Person; bei Rückmeldungen (R-83) „passt / passt nicht“ |
| `InboxId` | Number | Bezug zum Eingang |

### L-10 `NhStats` (Zahlen)
Genau ein Eintrag (ID 1), geschrieben von F-20.
`ActiveTutors`, `FreeSeats`, `OpenRequests`, `LessonsThisMonth`, `LearnersWithoutTutor` (alle Number), `SubjectsWithoutFreeTutor` (Text, z. B. `Ch, La`), `UpdatedAt` (Date).

### L-11 `NhNotify` (Benachrichtigungen)
Flows schreiben hier einen Eintrag, F-90 verschickt ihn. So gibt es eine einzige Stelle für Versand und Texte.
`Recipient` (User), `Template` (Text, N-xx), `Link` (Text, Deep-Link in die App), `Body` (Note, nur für N-10 Kinderschutz und N-13 Fehler), `State` (Choice `new` · `sent` · `error`), `Channel` (Choice `teams` · `mail`).

### L-12 `NhCaseNotes` (Fall-Notizen)
Ein Eintrag pro Bewerbung bzw. Tutor-Akte.
| Spalte | Typ | Inhalt |
|---|---|---|
| `ApplicationId` | Number, Idx | Bezug zu L-05 |
| `DecidedBy` | User | wer bestätigt/abgelehnt hat |
| `DecidedAt` | Date | |
| `Conflicts` | Users | befangen (R-32) |
| `BanVotes` | Users | Sperr-Stimmen (R-34) |
| `BanReason` | Note | |
| `AppealDecidedBy` | User | |
| `Note` | Note | interne Notiz zu Aussetzen/Sperre |

### L-13 `NhGroups` (Gruppen)
Für alle Schüler lesbar, deshalb **keine** Namen von Teilnehmenden. Nur Flows schreiben.
| Spalte | Typ | Inhalt |
|---|---|---|
| `Tutor` | User, Idx | |
| `TutorName`, `TutorAvatar` | Text, Number | Kopie |
| `ApplicationId` | Number | Tutor-Akte (L-05) |
| `Title` | Text | 3–60 Zeichen |
| `Description` | Note | 300 |
| `Subject` | Choice | Fachkürzel |
| `GradeBands` | Multi | Stufen |
| `Place` | Choice | `school` · `online` · `elsewhere` |
| `PlaceNote` | Text | nur bei `school`, z. B. „Raum 204“ (40) |
| `Sessions` | Note | JSON `[{"id":"s1","start":"2026-11-20T15:00","minutes":60,"state":"planned","cancelReason":""}]`, Zustände Z-10 |
| `NextSessionAt` | Date, Idx | nächster geplanter Termin (für Sortierung und Tageslauf) |
| `MinSize`, `MaxSize` | Number | R-101 |
| `MemberCount` | Number | Angemeldete (`joined`), vom Flow F-13 gezählt |
| `Price` | Number | Euro pro Person und Termin |
| `SignupUntil` | Date | Anmeldeschluss |
| `State` | Choice, Idx | Z-8 |
| `CancelReason` | Choice | `byTutor` · `hidden` · `unavailable` · `schoolYearEnd` |
| `Visible` | Bool, Idx | in Finden sichtbar |
| `RemindersSent` | Text | z. B. `minSize,s2-log` |

### L-14 `NhGroupMembers` (Gruppen-Teilnahmen)
Ein Eintrag pro Person und Gruppe. Einzelrechte für Tutor und Teilnehmende/n (§4), so wie bei Nachhilfen.
| Spalte | Typ | Inhalt |
|---|---|---|
| `GroupId` | Number, Idx | Bezug zu L-13 |
| `GroupTitle`, `Subject` | Text, Choice | Kopie (für „Meine Gruppen“, auch nach Löschung der Gruppe lesbar) |
| `Tutor` | User, Idx | |
| `Learner` | User, Idx | |
| `LearnerName`, `LearnerGrade`, `LearnerAvatar` | Text, Choice, Number | Kopie für den Tutor |
| `LearnerOnlineAllowed`, `LearnerOutsideAllowed` | Bool | ja/nein (R-12, R-16) |
| `State` | Choice, Idx | Z-9 |
| `Attendance` | Note | JSON `[{"sessionId":"s1","present":true,"state":"pending","answeredAt":""}]`, Zustände Z-5 |
| `JoinedAt`, `LeftAt` | Date | |

## 4. Einzelrechte
| Liste | Vorgehen des Flows nach dem Anlegen |
|---|---|
| L-03 Profil | Vererbung brechen (Rollen kopieren), Person bekommt **Lesen** |
| L-05 Bewerbung | Vererbung brechen (Rollen kopieren), Bewerber bekommt **Lesen** |
| L-07 Nachhilfe | Vererbung brechen (Rollen kopieren), Tutor und Nehmende/r bekommen **Lesen** |
| L-08 Meldung über Tutor/App | Vererbung brechen (Rollen kopieren), Gruppe LEI bekommt **Lesen** |
| L-14 Gruppen-Teilnahme | Vererbung brechen (Rollen kopieren), Tutor und Teilnehmende/r bekommen **Lesen** |

- Listenrechte der Listen L-03, L-05, L-07, L-08, L-14 sind so gesetzt, dass ein neuer Eintrag ohne Einzelrechte für Schüler **unsichtbar** ist. Fällt der Flow aus, ist ein Eintrag schlimmstenfalls kurz für niemanden sichtbar, nie zu weit.
- Technik: Flow-Aktion „HTTP-Anforderung an SharePoint senden“ (Standard, kostenlos): `POST _api/web/lists/getbytitle('NhTutorings')/items({id})/breakroleinheritance(copyRoleAssignments=true,clearSubscopes=true)`, dann `POST …/items({id})/roleassignments/addroleassignment(principalid={userId},roledefid={leseRechtId})`. Die Benutzer-ID holt `POST _api/web/ensureuser` mit `{"logonName":"i:0#.f|membership|<email>"}`. Rollen-ID für „Lesen“: `GET _api/web/roledefinitions/getbyname('Lesen')` (deutsche Website) bzw. `'Read'`. Baustein B-RECHTE in FLOWS.md.
- Grenze: SharePoint erlaubt viele Tausend Einträge mit eigenen Rechten pro Liste. Erwartet sind wenige Hundert pro Jahr. Beim Löschen (F-22) verschwinden sie wieder.

## 5. Aktionen im Eingang
Die App schreibt einen Eintrag in `NhInbox` mit `Action`, `TargetId`, `Payload`. Spalte **Flow** = welcher Ablauf ihn verarbeitet (Trigger-Bedingung auf `Action`). **Erfolg** = Schlüssel des Erfolgstexts in TEXTE.md §Erfolg. Mögliche Fehlercodes stehen in TEXTE.md §Fehler.

| ID | `Action` | Wer | `TargetId` | `Payload` | Flow | Regeln | Erfolg |
|---|---|---|---|---|---|---|---|
| A-01 | `register` | jede/r | – | `{"as":"learner"\|"tutor","avatar":3,"grade":"7","rulesAccepted":true,"privacyAccepted":true}` | F-01 | R-10, R-11, R-15 | ok.register |
| A-02 | `setAvatar` | jede/r | – | `{"avatar":5}` | F-01 | – | ok.avatar |
| A-03 | `leave` | jede/r | – | `{}` | F-01 | R-14 | ok.leave |
| A-04 | `setView` | jede/r | – | `{"view":"tutor"}` | F-01 | R-03 (ohne Toast, darf scheitern) | – |
| A-05 | `addLearner` | Tutor/Bewerber | – | `{}` | F-01 | R-11 | ok.addLearner |
| A-10 | `apply` | Profil vorhanden | – | `{"draft":{…},"interviewSlots":["…"],"rulesAccepted":true,"methodsAccepted":true}` | F-02 | R-20 … R-26 | ok.apply |
| A-11 | `updateApplication` | Bewerber | Bewerbung | `{"draft":{…},"interviewSlots":[…]}` | F-02 | R-22 | ok.saved |
| A-12 | `withdrawApplication` | Bewerber | Bewerbung | `{}` | F-02 | – | ok.withdrawApplication |
| A-13 | `methodRead` | Bewerber, Tutor | Bewerbung | `{"index":3,"read":true}` | F-02 | – | – (still) |
| A-14 | `appeal` | Bewerber | Bewerbung | `{"text":"…"}` | F-02 | R-28 | ok.appeal |
| A-15 | `appealBan` | gesperrte Person | Bewerbung oder Profil | `{"text":"…"}` | F-09 / F-12 | R-34 | ok.appeal |
| A-20 | `request` | Nehmende/r | Steckbrief (L-06) | `{"subject":"Ma","concern":"exam","times":[{"day":"Mo","slot":"15-16"}],"places":["school","elsewhere"],"message":"…"}` | F-03 | R-40 … R-47, R-05, R-12, R-16 | ok.request |
| A-21 | `withdrawRequest` | Nehmende/r | Nachhilfe | `{}` | F-03 | nur `open` | ok.withdrawRequest |
| A-22 | `accept` | Tutor | Nachhilfe | `{}` | F-04 | R-46, R-50 | ok.accept |
| A-23 | `decline` | Tutor | Nachhilfe | `{"reason":"Keine Zeit mehr"}` | F-04 | – | ok.decline |
| A-24 | `logLesson` | Tutor | Nachhilfe | `{"date":"2026-11-03","minutes":60,"place":"school"}` | F-05 | R-50, R-52, R-16 | ok.logLesson |
| A-25 | `answerLesson` | Nehmende/r | Nachhilfe | `{"lessonId":"l3","ok":true}` | F-05 | R-53, R-54 | ok.confirmLesson / ok.disputeLesson |
| A-26 | `continue` | beide | Nachhilfe | `{"yes":true}` | F-06 | R-51 | ok.continueYes / ok.continueNo |
| A-27 | `end` | beide | Nachhilfe | `{}` | F-06 | R-56 | ok.end |
| A-28 | `feedback` | beide | Nachhilfe | `{"fits":true,"text":"…"}` | F-06 | R-83 | ok.feedback |
| A-29 | `message` | beide | Nachhilfe | `{"text":"…"}` | F-06 | nur wenn O-20 = Nachrichtenfeld (Version 1.1) | – |
| A-30 | `pause` | Tutor | Bewerbung | `{"on":true}` | F-07 | R-60 | ok.pauseOn / ok.pauseOff |
| A-31 | `changeQuick` | Tutor | Bewerbung | `{"times":[…],"price":10,"capacity":3}` (nur geänderte Felder) | F-07 | R-61, R-63, R-25 | ok.saved |
| A-32 | `changeRequest` | Tutor | Bewerbung | `{"bio":"…","subjects":[…],"gradeBands":[…],"helpTypes":[…]}` | F-07 | R-61, R-23, R-24 | ok.changeRequest |
| A-34 | `quit` | Tutor | Bewerbung | `{}` | F-07 | R-64 | ok.quit |
| A-40 | `scheduleInterview` | LEI | Bewerbung | `{"at":"2026-11-20T13:15","place":"SMV-Raum"}` | F-08 | R-30, R-32 | ok.schedule |
| A-41 | `approve` | LEI, LK | Bewerbung | `{}` | F-08 | R-21, R-30 … R-33 | ok.approve |
| A-42 | `reject` | LEI, LK | Bewerbung | `{"reason":"…"}` | F-08 | R-27, R-28, R-30 … R-33 | ok.reject |
| A-43 | `conflict` | LEI | Bewerbung | `{}` | F-08 | R-32 | ok.conflict |
| A-44 | `suspendTutor` | LEI, LK | Bewerbung | `{"reason":"…"}` | F-09 | R-30, R-35, R-57 | ok.suspend |
| A-45 | `unsuspendTutor` | LEI, LK | Bewerbung | `{}` | F-09 | R-30, R-35 | ok.unsuspend |
| A-46 | `banTutor` | LEI (Stimme), LK (sofort) | Bewerbung | `{"reason":"…"}` | F-09 | R-30, R-34, R-57 | ok.banVote / ok.ban |
| A-47 | `approveChange` | LEI | Bewerbung | `{}` | F-09 | R-30, R-61 | ok.approveChange |
| A-48 | `rejectChange` | LEI | Bewerbung | `{"reason":"…"}` | F-09 | R-30 | ok.rejectChange |
| A-49 | `badge` | LEI | Bewerbung | `{"badge":"Super erklärt"}` | F-09 | R-65 | ok.badge |
| A-50 | `report` | jede/r | – | `{"aboutType":"tutor","aboutEmail":"…","context":"tutoring:12","reason":"noShow","text":"…"}` | F-10 | R-70, R-72 | ok.report |
| A-51 | `childProtection` | jede/r | – | `{"text":"…","context":"tutoring:12"}` | F-11 | R-71 | ok.childProtection |
| A-52 | `decideReport` | LEI (über Tutor/App), LK | Meldung | `{"decision":"warned"}` | F-10 | R-37, R-73 | ok.decideReport |
| A-60 | `consent` | LK | Profil | `{"receivedOn":"2026-11-10","onlineAllowed":true,"outsideAllowed":true}` | F-12 | R-11, R-12, R-16, R-21 | ok.consent |
| A-61 | `setGrade` | LK | Profil | `{"grade":"8"}` | F-12 | R-10 | ok.saved |
| A-62 | `learnerState` | LK | Profil | `{"state":"suspended","reason":"…"}` | F-12 | R-35, R-37 | ok.saved |
| A-63 | `setting` | LK | – | `{"key":"paused","value":true}` | F-12 | R-05, R-06 | ok.saved |

| A-70 | `createGroup` | Tutor | – | `{"title":"…","description":"…","subject":"Ma","gradeBands":["7-8"],"place":"school","placeNote":"Raum 204","sessions":[{"start":"2026-11-20T15:00","minutes":60}],"minSize":2,"maxSize":6,"price":4,"signupUntil":"2026-11-19T20:00"}` | F-13 | R-100 … R-102, R-16, R-23 | ok.createGroup |
| A-71 | `updateGroup` | Tutor | Gruppe | wie A-70, nur geänderte Felder; Termine als `{"addSessions":[…]}` | F-13 | R-106 | ok.saved |
| A-72 | `cancelGroup` | Tutor | Gruppe | `{"sessionId":"s2","reason":"…"}` (ohne `sessionId` = ganze Gruppe) | F-13 | R-107 | ok.cancelSession / ok.cancelGroup |
| A-73 | `joinGroup` | Nehmende/r | Gruppe | `{}` | F-13 | R-104, R-12, R-16 | ok.joinGroup |
| A-74 | `leaveGroup` | Nehmende/r | Gruppe | `{}` | F-13 | R-105 | ok.leaveGroup |
| A-75 | `logGroupSession` | Tutor | Gruppe | `{"sessionId":"s1","held":true,"absent":[12,15]}` (IDs der Teilnahmen in L-14, die nicht da waren) | F-13 | R-109 | ok.logLesson |
| A-76 | `answerGroupSession` | Teilnehmende/r | Teilnahme (L-14) | `{"sessionId":"s1","ok":true}` | F-13 | R-109, R-54 | ok.confirmLesson / ok.disputeLesson |
| A-77 | `hideGroup` | LEI, LK | Gruppe | `{"reason":"…"}` | F-13 | R-111, R-30 | ok.hideGroup |

`aboutEmail` in A-50 ist eine Ausnahme von „Identität nur aus Author“: Es bezeichnet nicht den Handelnden, sondern die gemeldete Person. Der Flow prüft, dass diese Person in einer Nachhilfe/Anfrage oder Gruppe mit der meldenden Person verbunden ist, einen sichtbaren Steckbrief hat oder eine sichtbare Gruppe leitet. Sonst E-NOT-ALLOWED.

## 6. Feste Wertelisten
Im Code in `app/src/domain/constants.ts`. Anzeige-Texte in TEXTE.md.
| Liste | Werte (Code → Anzeige) |
|---|---|
| Fächer | `Ma` Mathe · `De` Deutsch · `En` Englisch · `Fr` Französisch · `La` Latein · `Bio` Biologie · `Ch` Chemie · `Ph` Physik · `NwT` NwT · `Inf` Informatik · `Ge` Geschichte · `Geo` Geografie · `Gk` Gemeinschaftskunde · `Wi` Wirtschaft (endgültige Liste: O-13) |
| Stufen | `5-6` Klasse 5–6 · `7-8` Klasse 7–8 · `9-10` Klasse 9–10 · `KS` Kursstufe |
| Klassen | `5` `6` `7` `8` `9` `10` `J1` `J2` (Vergleich: J1 = 11, J2 = 12) |
| Anliegen / Art der Hilfe | `basics` Grundlagen · `exam` Klassenarbeit vorbereiten · `homework` Hausaufgaben verstehen · `learning` Lernen lernen |
| Format / Ort | `school` in der Schule · `online` online über Teams · `elsewhere` anderer Ort (z. B. zuhause, Bücherei) |
| Tage | `Mo` `Di` `Mi` `Do` `Fr` |
| Zeitfenster | `13-14` `14-15` `15-16` `16-17` `17-18` `18-19` (`18-19` nur online, R-25) |
| Dauer | `45` · `60` Minuten (Gruppen-Termine zusätzlich `90`) |
| Meldegründe | `noShow` Nicht erschienen · `messages` Unpassende Nachrichten · `money` Streit ums Geld · `profile` Unpassender Steckbrief · `app` Problem mit der App · `other` Etwas anderes |
| Ablehnungsgründe Anfrage | `noTime` Keine Zeit mehr · `notFitting` Passt fachlich nicht · `none` Ohne Grund |
| Avatare | 12 Farbpaare, DESIGN.md §Avatare |
