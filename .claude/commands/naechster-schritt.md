---
description: Nächste offene Aufgabe aus TODO.md erledigen (Plan, Umsetzung, Prüfung, Abhaken)
argument-hint: "[optional: Aufgaben-ID, z. B. T-1.3]"
---
Arbeite die nächste Aufgabe ab. Wenn eine ID angegeben ist ($ARGUMENTS), nimm diese.

1. Lies in `TODO.md` den Abschnitt „Jetzt“ und finde die erste offene Aufgabe `[ ]` (oder $ARGUMENTS). Prüfe, ob frühere Aufgaben derselben Phase offen sind, von denen sie abhängt. Wenn ja: sag das kurz und schlag die richtige Aufgabe vor.
2. Lies **nur** die Abschnitte, die bei der Aufgabe unter „Lesen“ stehen. Springe per grep zu IDs.
3. Prüfe in `docs/ENTSCHEIDUNGEN.md`, ob O-Punkte die Aufgabe berühren. Offen → Standardwert nehmen und einstellbar bauen.
4. Schreib Subi einen Plan in 3–6 kurzen Zeilen (Deutsch, einfach). Bei echter Unklarheit eine Frage stellen, sonst direkt anfangen.
5. Umsetzen in kleinen Schritten. Nach jedem Schritt bauen bzw. testen. Fehlerausgaben gefiltert lesen.
6. Fertig-Check aus `CLAUDE.md` durchgehen. Bei UI: Harness-Screenshot bei 390 px ansehen und mit dem Prototyp vergleichen.
7. `TODO.md`: Aufgabe abhaken, unter „Jetzt“ Stand + Notiz für die nächste Sitzung (1–3 Zeilen). Doku anpassen, falls sich etwas geändert hat.
8. `git add -A && git commit -m "<ID>: <kurz>"`.
9. Subi in 2–4 Zeilen sagen: was fertig ist, was er selbst ausprobieren soll (genaue Schritte), was als Nächstes kommt. Kosten erwähnen, falls etwas Geld kosten könnte.
