# TEXTE – alle festen Texte der App

**Wann lesen:** Wenn du Text auf den Bildschirm bringst. Im Code stehen Texte nur in `app/src/app/texts.ts`, mit denselben Schlüsseln wie hier (z. B. `texts.err['E-FULL']`, `texts.ok.request`).
**Neue Texte:** zuerst hier eintragen. Stil: du-Form, kurz, freundlich, nicht kindisch (Lehrkraft-Bereich: Sie). `{name}` = Platzhalter.
**Herkunft:** Konzept v2 und Prototyp v2. Texte mit (Entwurf) prüft die SMV-Gruppe noch einmal (O-05).

## Inhalt
1. Allgemein
2. Willkommen und Registrierung
3. Verhaltenskodex und Datenschutz
4. Bewerbung, Lehrmethoden, Gesprächsleitfaden
5. Hinweise
6. Leere Zustände
7. Wird verarbeitet und Erfolg
8. Fehler (E-xx)
9. Zustände (Anzeige)
10. Benachrichtigungen
11. Auswahl-Beschriftungen
12. Gruppen

## 1. Allgemein
| Schlüssel | Text |
|---|---|
| `common.cancel` | Abbrechen |
| `common.done` | Fertig |
| `common.save` | Sichern |
| `common.next` | Weiter |
| `common.back` | Zurück |
| `common.retry` | Erneut versuchen |
| `common.help` | Hilfe und Melden |
| `common.report` | Melden |
| `common.contact` | Kontakt |
| `common.free` | kostenlos |
| `common.priceUnit` | {preis} € |
| `common.freeSeats` | Plätze frei |
| `common.noSeats` | gerade keine Plätze |
| `common.paused` | macht gerade Pause |
| `common.trialFree` | Probestunde kostenlos |
| `common.onlineAllowed` | online erlaubt: {jaNein} |
| `common.outsideAllowed` | außerhalb der Schule erlaubt: {jaNein} |
| `common.placeHint` | Den genauen Ort sprecht ihr im Chat ab. Er wird nicht in nachhilfly gespeichert. |
| `common.searchPlaceholder` | Fach oder Name suchen |
| `common.logoAlt` | Evangelisches Heidehof-Gymnasium |
| `common.freeTextHint` | Keine Noten, keine Gesundheit, keine Kontaktdaten. |
| `common.counter` | {n} / {max} |
| `common.loadError` | Verbindung fehlgeschlagen. |
| `common.crash` | Da ist etwas schiefgegangen. |
| `common.reload` | Neu laden |

## 2. Willkommen und Registrierung
| Schlüssel | Text |
|---|---|
| `welcome.title` | Willkommen bei nachhilfly |
| `welcome.p1.title` | Tutoren aus deiner Schule |
| `welcome.p1.text` | Schüler deiner Schule, die das Leitungsteam persönlich bestätigt hat. |
| `welcome.p2.title` | Einzeln oder in der Gruppe |
| `welcome.p2.text` | Einzeln ist die erste Stunde kostenlos. Für Klassenarbeiten gibt es auch Gruppen. Jeder Tutor legt seinen Preis selbst fest. |
| `welcome.p3.title` | Sicher und vertraulich |
| `welcome.p3.text` | Niemand sieht, wer Nachhilfe nimmt. Bei Problemen hilft eine Lehrkraft. |
| `welcome.asLearner` | Ich suche Nachhilfe |
| `welcome.asTutor` | Ich will Nachhilfe geben |
| `reg.avatar.title` | Dein Avatar |
| `reg.grade.label` | Deine Klasse |
| `reg.grade.fromAccount` | Aus deinem Schulkonto |
| `reg.rules.title` | Regeln |
| `reg.rules.subtitle` | So läuft es bei uns |
| `reg.rules.check` | Ich halte mich an die Regeln. |
| `reg.privacy.checkUnder` | Ich habe den Datenschutzhinweis gelesen. |
| `reg.privacy.checkOver` | Ich habe den Datenschutzhinweis gelesen und bin einverstanden. |
| `reg.finish.title` | Fast geschafft |
| `reg.finish.parents.title` | Deine Eltern bekommen ein Formular |
| `reg.finish.parents.text` | Die Schule schickt es über den üblichen Weg. Sobald es zurück ist, trägt die betreuende Lehrkraft das ein. |
| `reg.finish.browse.title` | Bis dahin kannst du stöbern |
| `reg.finish.browse.text` | Du siehst alle Tutoren. Anfragen geht, sobald die Zustimmung da ist. |
| `reg.finish.tutorNext` | Als Nächstes: deine Bewerbung als Tutor |
| `reg.finish.button` | Fertig |

## 3. Verhaltenskodex und Datenschutz
**Verhaltenskodex** (`kodex`, Liste, Reihenfolge fest):
1. Ihr trefft euch in der Schule, online über Teams oder an einem Ort, den ihr gemeinsam absprecht (z. B. zuhause oder in der Bücherei). Bis Klasse 8 außerhalb der Schule nur, wenn deine Eltern das erlaubt haben. (Entwurf, O-36)
2. Online nur Montag bis Freitag bis {onlineUntil} Uhr.
3. Die Kamera ist freiwillig. Keine Aufnahmen.
4. Kein Kontakt über Instagram, WhatsApp, Snapchat und keine privaten Nummern.
5. Geld nur nach der Stunde, nie im Voraus. Die Probestunde ist kostenlos.

| Schlüssel | Text |
|---|---|
| `kodex.footer` | Wer sich nicht daran hält, kann ausgesetzt werden. Bei etwas Unangenehmem: Hilfe und Melden. |
| `kodex.notContract` | Die Schule ist nicht Vertragspartner. Bezahlt wird privat zwischen Tutor und Familie. |
| `kodex.outside` | Treffen außerhalb der Schule sind private Verabredungen. Sagt euren Eltern, wann und wo ihr euch trefft. (Entwurf, O-36) |
| `privacy.title` | Datenschutz |
| `privacy.short.owner` | Verantwortlich: die Schule |
| `privacy.short.purpose` | Zweck: Nachhilfe vermitteln |
| `privacy.short.basis` | Grundlage: Einwilligung |
| `privacy.short.who` | Wer sieht was: nur Beteiligte |
| `privacy.short.deletion` | Löschung: spätestens zum Schuljahresende |
| `privacy.long` | (Text von Herrn Scharf, O-04. Bis dahin Platzhalter „Der ausführliche Hinweis folgt.“) |
| `leave.title` | nachhilfly verlassen |
| `leave.text` | Dein Profil wird gelöscht, alle Anfragen und Nachhilfen werden beendet. Deine Tutoren bekommen eine kurze Nachricht ohne Grund. Deine Einwilligung gilt als widerrufen. |
| `leave.note` | Bestätigte Stunden bleiben bis zum Schuljahresende für Bescheinigungen gespeichert und werden dann gelöscht. |
| `leave.button` | nachhilfly verlassen |

## 4. Bewerbung, Lehrmethoden, Gesprächsleitfaden
| Schlüssel | Text |
|---|---|
| `apply.welcome.p1.title` | 1 bis 3 Stunden pro Woche |
| `apply.welcome.p1.text` | Du legst Zeiten, Plätze und Preis selbst fest und kannst jederzeit pausieren. |
| `apply.welcome.p2.title` | Kurzes Kennenlerngespräch |
| `apply.welcome.p2.text` | Etwa 10 Minuten mit dem Leitungsteam. Keine Noten, kein Test, nur ein kleines Erklär-Beispiel. |
| `apply.welcome.p3.title` | Dann ist dein Steckbrief sichtbar |
| `apply.welcome.p3.text` | Andere Schüler finden dich und fragen an. Du entscheidest, wen du annimmst, und kannst auch Gruppen anbieten. |
| `apply.priceHint` | Empfehlung: 8 bis 12 € pro Stunde. Wer viel Erfahrung hat, kann auch etwas mehr nehmen. Die Probestunde ist immer kostenlos, bezahlt wird nach der Stunde. |
| `apply.check.rules` | Ich halte mich an die Regeln und den Verhaltenskodex. |
| `apply.check.methods` | Ich lese vor dem Gespräch die Lehrmethoden. |
| `apply.bioPlaceholder` | Was machst du gern, wie erklärst du? |
| `apply.locked` | Dein Steckbrief ist bis zur Entscheidung gesperrt. So bestätigt das Leitungsteam genau das, was es gesehen hat. |
| `apply.status.sent` | Abgeschickt |
| `apply.status.interview` | Gespräch |
| `apply.status.decision` | Entscheidung |
| `apply.rejected.reapply` | Neu bewerben ab {datum} |
| `apply.appeal.hint` | Schreib, warum die Entscheidung noch einmal geprüft werden soll. Ein anderes Mitglied entscheidet. |
| `apply.appeal.pending` | Dein Einspruch wird geprüft. |
| `apply.final` | Endgültig abgelehnt. Im nächsten Schuljahr kannst du dich neu bewerben. |

**Lehrmethoden** (`methods`, 9 Einträge, Titel + Satz):
1. Erst fragen, dann erklären – Lass dir zeigen, wo es hakt, bevor du loslegst.
2. Selbst rechnen lassen – Dein Schüler hält den Stift, du gibst Tipps.
3. Laut denken – Lass erklären, wie gedacht wird. So findest du Denkfehler.
4. Kleine Schritte – Eine Sache pro Stunde richtig verstehen ist besser als drei halb.
5. Beispiele aus dem Alltag – Geld, Sport, Handy: Alltag macht Abstraktes greifbar.
6. Wiederholen mit Abstand – Den Stoff der letzten Stunde kurz wiederholen.
7. Fehler sind Hinweise – Ein Fehler zeigt, was als Nächstes dran ist.
8. Zusammenfassen lassen – Am Ende erklärt dein Schüler dir das Thema.
9. Pausen einplanen – Nach 25 Minuten kurz durchatmen.

**Gesprächsleitfaden** (`guide`, für das Leitungsteam, Entwurf, O-06):
Kriterien: Kann eine Aufgabe aus dem eigenen Fach verständlich erklären (kurze Probe im Gespräch) · Hat Regeln und Verhaltenskodex verstanden · Ist zuverlässig erreichbar und kennt den Aufwand · Noten werden nicht abgefragt.
Ablauf (10 Min): Begrüßen, Ablauf erklären (1) · Warum willst du Nachhilfe geben? (2) · Erklär-Probe: eine Aufgabe für Klasse 6 (4) · Regeln durchgehen, Fragen klären (2) · Sagen, wann die Entscheidung kommt (1). Bei vielen Bewerbungen: Gruppengespräche mit 4 bis 5 Personen.

## 5. Hinweise
| Schlüssel | Text |
|---|---|
| `note.holidays` | **Ferien.** Anfragen bleiben offen, die Antwortfrist läuft nach den Ferien weiter. |
| `note.restricted` | Deine Eltern bekommen ein Formular. Sobald es da ist, kannst du anfragen. |
| `note.restrictedButton` | Anfragen geht, sobald deine Eltern zugestimmt haben |
| `note.tutorPaused` | Du machst gerade Pause. Niemand kann dich neu anfragen. Deine Schüler bleiben. |
| `note.pendingChange` | Deine Änderung wartet auf Freigabe. Bis dahin sehen andere die alte Version. |
| `note.fullCannotAccept` | Alle deine Plätze sind belegt. Erhöhe deine Plätze oder beende eine Nachhilfe. |
| `note.consentMissingApprove` | Bestätigen geht erst, wenn die Einwilligung der Eltern vorliegt. |
| `note.selfCase` | Bei diesem Fall entscheidest du nicht mit. |
| `note.conflictCase` | Du bist befangen. Ein anderes Mitglied entscheidet. |
| `pause.title` | nachhilfly macht gerade Pause |
| `pause.text` | Die betreuende Lehrkraft hat die App kurz angehalten. Bei Fragen: {lehrkraft} oder die SMV. |
| `suspended.title` | Du bist gerade ausgesetzt |
| `suspended.text` | Bei Fragen wende dich an {lehrkraft}. |
| `banned.title` | Du bist gesperrt |
| `banned.text` | Wenn du das für falsch hältst, kannst du einmal Einspruch einlegen. |
| `unavailable.text` | Tutor nicht mehr verfügbar |
| `unavailable.button` | Neuen Tutor finden |
| `end.ask` | **Wirklich beenden?** Der Platz wird frei. {name} bekommt eine kurze Nachricht ohne Grund. |
| `continue.ask` | Weitermachen mit {name}? |
| `continue.hint` | Ein Nein beendet die Nachhilfe. {name} erfährt keinen Grund. |
| `decline.hint` | {name} bekommt Bescheid und kann jemand anderen anfragen. Der Grund ist freiwillig. |
| `reject.placeholder` | Sachlich und freundlich. {name} liest das. |
| `suspend.hint` | Aussetzen wirkt sofort und beendet laufende Nachhilfen mit dem Hinweis „Tutor nicht mehr verfügbar“, ohne Grund. Eine Sperre braucht ein zweites Mitglied oder die Lehrkraft. Die Lehrkraft wird immer informiert. |
| `report.kind1` | Problem mit Regeln oder App |
| `report.kind1.hint` | Geht an das Leitungsteam (über Tutoren) oder an die Lehrkraft (über Schüler). Wer gemeldet hat, sieht nur die Lehrkraft. |
| `report.kind2` | Ich fühle mich unwohl |
| `report.kind2.hint` | Geht nur an {kinderschutz}. Niemand aus der SMV sieht das. |
| `settings.pauseHint` | Alle anderen sehen dann nur „nachhilfly macht gerade Pause“. |

## 6. Leere Zustände
| Schlüssel | Titel | Text | Knopf |
|---|---|---|---|
| `empty.noTutorsYet` | Bald geht’s los! | Die ersten Tutoren werden gerade bestätigt. | Selbst Tutor werden |
| `empty.filter` | Kein Tutor passt | Probier es mit weniger Filtern. | Filter zurücksetzen |
| `empty.mine` | Noch keine Nachhilfe | Such dir einen Tutor aus. Die erste Stunde ist immer kostenlos. | Tutor finden |
| `empty.requests` | Keine neuen Anfragen | Dein Steckbrief ist sichtbar. Sobald jemand anfragt, bekommst du Bescheid. | – |
| `empty.requestsPaused` | Keine neuen Anfragen | Du machst gerade Pause. | – |
| `empty.students` | Noch keine Schüler | Wenn du eine Anfrage annimmst, erscheint dein Schüler hier. | – |
| `empty.lessons` | Noch keine Stunden eingetragen | – | Stunde eintragen |
| `empty.done` | Alles erledigt | – | – |
| `empty.consents` | Keine offenen Einwilligungen | – | – |
| `empty.log` | Noch keine Einträge | – | – |
| `empty.groups` | Gerade keine Gruppen | Frag einen Tutor, ob er eine Gruppe für dein Thema anbietet. | Tutoren ansehen |
| `empty.myGroups` | Noch keine Gruppen | Biete eine Gruppe an, zum Beispiel vor einer Klassenarbeit. | Gruppe anbieten |

## 7. Wird verarbeitet und Erfolg
| Schlüssel | Text |
|---|---|
| `pending.toast` | Wird verarbeitet … |
| `pending.slow` | Dauert länger als sonst. Du bekommst Bescheid, sobald es fertig ist. |
| `ok.register` | Willkommen bei nachhilfly! |
| `ok.avatar` | Avatar geändert |
| `ok.leave` | Du hast nachhilfly verlassen. |
| `ok.addLearner` | Du kannst jetzt auch Nachhilfe bekommen. |
| `ok.apply` | Bewerbung abgeschickt. Das Leitungsteam meldet sich. |
| `ok.saved` | Gespeichert |
| `ok.withdrawApplication` | Bewerbung zurückgezogen |
| `ok.appeal` | Einspruch abgeschickt |
| `ok.request` | Anfrage an {name} gesendet |
| `ok.withdrawRequest` | Anfrage zurückgezogen |
| `ok.accept` | {name} ist jetzt dein Schüler. Verabredet die Probestunde im Chat. |
| `ok.decline` | Anfrage abgelehnt |
| `ok.logLesson` | Stunde eingetragen |
| `ok.confirmLesson` | Stunde bestätigt |
| `ok.disputeLesson` | Stunde bestritten. {name} bekommt Bescheid. |
| `ok.continueYes` | Schön! Ihr macht weiter. |
| `ok.continueNo` | Nachhilfe beendet |
| `ok.end` | Nachhilfe beendet |
| `ok.feedback` | Danke für deine Rückmeldung |
| `ok.pauseOn` | Pause gestartet |
| `ok.pauseOff` | Pause beendet. Du bist wieder sichtbar. |
| `ok.changeRequest` | Änderung beantragt. Sie geht zur Freigabe. |
| `ok.quit` | Du bist kein Tutor mehr. Danke für deine Hilfe! |
| `ok.schedule` | Gespräch vereinbart. {name} bekommt Bescheid. |
| `ok.approve` | Bestätigt. {name} ist jetzt Tutor. |
| `ok.reject` | Abgelehnt. Die Nachricht mit Grund geht raus. |
| `ok.conflict` | Du bist bei diesem Fall raus. |
| `ok.suspend` | Ausgesetzt. Die Lehrkraft ist informiert. |
| `ok.unsuspend` | Wieder freigegeben. Startet pausiert. |
| `ok.banVote` | Sperre beantragt. Es braucht ein zweites Mitglied oder die Lehrkraft. |
| `ok.ban` | Gesperrt. Die Lehrkraft ist informiert. |
| `ok.approveChange` | Änderung freigegeben |
| `ok.rejectChange` | Änderung abgelehnt |
| `ok.badge` | Abzeichen vergeben |
| `ok.report` | Meldung gesendet |
| `ok.childProtection` | Gesendet. {kinderschutz} meldet sich bei dir. |
| `ok.decideReport` | Entschieden |
| `ok.consent` | Einwilligung eingetragen |
| `ok.createGroup` | Gruppe angeboten. Sie ist jetzt in Finden sichtbar. |
| `ok.cancelSession` | Termin abgesagt. Alle Angemeldeten bekommen Bescheid. |
| `ok.cancelGroup` | Gruppe abgesagt. Alle Angemeldeten bekommen Bescheid. |
| `ok.joinGroup` | Du bist dabei! |
| `ok.leaveGroup` | Du bist abgemeldet. |
| `ok.hideGroup` | Gruppe ausgeblendet. Die Lehrkraft ist informiert. |

## 8. Fehler
Der Flow schreibt den Code in `NhInbox.ResultCode`, die App zeigt den Text. Gleiche Codes nutzt `rules.ts`.
| Code | Text |
|---|---|
| `E-PAUSED` | nachhilfly macht gerade Pause. |
| `E-NO-PROFILE` | Bitte registriere dich zuerst. |
| `E-EXISTS` | Das gibt es schon. |
| `E-INVALID` | Da fehlt noch etwas. Bitte prüf deine Eingaben. |
| `E-CONTACT` | Bitte keine Kontaktdaten oder Links im Text. |
| `E-CONSENT` | Deine Eltern müssen erst zustimmen. |
| `E-GRADE` | Dieser Tutor unterrichtet deine Klasse nicht. |
| `E-FULL` | Dieser Tutor ist gerade voll geworden. |
| `E-UNAVAILABLE` | Dieser Tutor ist gerade nicht verfügbar. |
| `E-DUPLICATE` | Du hast schon eine offene Anfrage bei {name}. |
| `E-TOO-MANY` | Du hast schon {max} offene Anfragen. |
| `E-ONLINE` | Online-Nachhilfe ist für dich noch nicht freigegeben. |
| `E-PLACE` | Treffen außerhalb der Schule sind hier noch nicht von den Eltern erlaubt. |
| `E-SELF` | Bei diesem Fall darfst du nicht entscheiden. |
| `E-CONFLICT` | Du hast dich bei diesem Fall als befangen gemeldet. |
| `E-LOCKED` | Der Steckbrief ist bis zur Entscheidung gesperrt. |
| `E-TOO-EARLY` | Neu bewerben geht erst ab {datum}. |
| `E-GONE` | Das ist schon erledigt oder abgelaufen. |
| `E-NOT-ALLOWED` | Das darfst du hier nicht. |
| `E-NETWORK` | Keine Verbindung. Deine Eingaben sind noch da. Bitte versuch es noch einmal. |
| `E-SERVER` | Das hat nicht geklappt. Bitte versuch es später noch einmal. |

## 9. Zustände (Anzeige)
| Code | Text | Pille |
|---|---|---|
| Nachhilfe `open` | offen · Antwort bis {datum} | wait |
| `trial` | Probe | blue |
| `running` | läuft | ok |
| `declined` | Anfrage abgelehnt | grey |
| `expired` | Keine Antwort, abgelaufen | grey |
| `withdrawn` | zurückgezogen | grey |
| `ended` | beendet | grey |
| Stunde `pending` | wartet auf Bestätigung | wait |
| `confirmed` | bestätigt | ok |
| `disputed` | bestritten | red |
| `void` | nicht bestätigt | grey |
| Bewerbung `submitted` | wartet | wait |
| `interview` | Gespräch vereinbart | blue |
| `approved` | bestätigt | ok |
| `rejected` | abgelehnt | red |
| `appeal` | Einspruch | wait |
| `finalRejected` | endgültig abgelehnt | red |
| Tutor `active` | aktiv | ok |
| `paused` | pausiert | grey |
| `suspended` | ausgesetzt | red |
| `banned` | gesperrt | red |
| Einwilligung `notNeeded` / `missing` / `ok` | nicht nötig / fehlt / liegt vor | grey / wait / ok |
| Gruppe `open` | Anmeldung offen | blue |
| `closed` | läuft | ok |
| `done` | vorbei | grey |
| Gruppe `cancelled` / Termin `cancelled` | abgesagt | red |
| Termin `held` | hat stattgefunden | ok |
| Anwesenheit `absent` | nicht da | grey |
| Ansichten | Nachhilfe bekommen · Bewerbung · Tutor · Leitungsteam · Lehrkraft | – |

## 10. Benachrichtigungen
Alle Teams-Nachrichten und Mails (außer N-10, N-13): Betreff/Titel **„Neues in nachhilfly“**, Text **„Öffne nachhilfly, um es zu sehen.“** + Link. Keine Namen, Fächer, Klassen (R-82).
N-10 Kinderschutz (Mail an die Ansprechperson): Betreff „nachhilfly: Kinderschutz-Meldung“, Inhalt siehe FLOWS.md F-11.
N-13 Fehler: Betreff „nachhilfly: Ein Ablauf ist fehlgeschlagen“, Inhalt Flow-Name, Zeit, Link zum Lauf.

## 11. Auswahl-Beschriftungen
Stehen in DATENMODELL.md §6 (Code → Anzeige). Sie gehören trotzdem in `texts.ts` unter `labels.*`.

## 12. Gruppen
| Schlüssel | Text |
|---|---|
| `group.segment.tutors` | Tutoren |
| `group.segment.groups` | Gruppen |
| `group.offer` | Gruppe anbieten |
| `group.with` | mit {tutor} |
| `group.moreSessions` | +{n} Termine |
| `group.seats` | {frei} von {max} frei · ab {min} Personen |
| `group.full` | voll |
| `group.pricePerPerson` | {preis} € pro Person und Termin |
| `group.priceHint` | Empfehlung: {groupPriceHint}. Bei Gruppen gibt es keine kostenlose Probestunde. Bezahlt wird nach dem Termin. |
| `group.signupUntil` | Anmeldung bis {datum} |
| `group.join` | Mitmachen |
| `group.leave` | Abmelden |
| `group.leaveLate` | Die Anmeldung ist schon geschlossen. Sag {tutor} bitte kurz Bescheid. |
| `group.privacy` | Die anderen in der Gruppe sehen deinen Namen, wenn ihr euch trefft oder im Gruppen-Chat schreibt. In der App sieht man nur, wie viele angemeldet sind. |
| `group.chat` | Gruppen-Chat starten |
| `group.logSession` | Termin eintragen |
| `group.held` | Hat stattgefunden |
| `group.notHeld` | Ist ausgefallen |
| `group.attendance` | Wer war da? |
| `group.cancelSession` | Termin absagen |
| `group.cancelAll` | Ganze Gruppe absagen |
| `group.cancelAsk` | **Wirklich absagen?** Alle Angemeldeten bekommen Bescheid. |
| `group.minNotReached` | Noch unter der Mindestzahl. Du entscheidest, ob die Gruppe trotzdem stattfindet. |
| `group.locked` | Seit sich jemand angemeldet hat, kannst du nur noch Beschreibung, Raum, neue Termine und mehr Plätze ändern. |
| `group.hide` | Gruppe ausblenden |
| `group.cancelled` | abgesagt |
| `group.step1` | Was |
| `group.step2` | Wann und wo |
| `group.step3` | Plätze und Preis |
| `group.titlePlaceholder` | z. B. Klassenarbeit Bruchrechnung |
| `group.addSession` | + Termin |
