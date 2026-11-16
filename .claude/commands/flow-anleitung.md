---
description: Klick-für-Klick-Anleitung und Testtabelle für einen Power-Automate-Flow schreiben
argument-hint: "F-xx"
---
Schreibe für den Flow $ARGUMENTS eine Bauanleitung für Subi (Einsteiger) nach `flows/anleitungen/$ARGUMENTS.md`.

Lies dafür: `docs/FLOWS.md` §1, §2 und den Abschnitt zu $ARGUMENTS; die betroffenen Aktionen in `docs/DATENMODELL.md` §5; die genannten Regeln in `docs/REGELN.md`; Fehlercodes in `docs/TEXTE.md` §8.

Aufbau der Datei:
1. **Wozu** (2 Sätze) und **Kosten-Check**: nur Standard-Konnektoren (nenne sie).
2. **Vorher nötig**: Listen, Spalten, andere Flows (z. B. Vorlage F-99).
3. **Schritte**: nummeriert, je Schritt: genaue Aktion in Power Automate (deutscher Name, wie er im Menü steht), was in welches Feld kommt (Ausdrücke als Code-Block zum Kopieren), welche Regel-ID die Prüfung umsetzt. Bei „HTTP-Anforderung an SharePoint senden“: Methode, URI, Header, Body vollständig.
4. **Einstellungen**: Trigger-Bedingung (zum Kopieren), Gleichzeitigkeit, „Ausführen nach“ für Fehler-Bereich.
5. **Testtabelle**: Testkonto · Eingabe (Eintrag im Eingang) · erwartetes Ergebnis (State, ResultCode, geänderte Listen, Benachrichtigung). Mindestens ein erlaubter Fall und jeder Fehlercode des Flows.
6. **Häufige Fehler** beim Bauen.

Nach dem Schreiben: Subi kurz sagen, wo die Datei liegt und wie lange der Bau ungefähr dauert.
