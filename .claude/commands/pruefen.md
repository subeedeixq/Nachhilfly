---
description: Geänderten Code gegen Regeln, Design, Sicherheit und Fertig-Check prüfen
argument-hint: "[optional: Datei oder Ordner]"
---
Prüfe die Änderungen seit dem letzten Commit (`git diff HEAD`) oder $ARGUMENTS. Berichte nur echte Probleme, sortiert nach Schwere, je eine Zeile mit Datei:Zeile, Problem, Vorschlag. Danach fragen, ob du sie beheben sollst.

Prüfpunkte:
1. **Sicherheit:** Schreibt Code irgendwo außer `NhInbox`? Nimmt etwas die Identität aus Payload? Echte Namen/E-Mails? Externe URLs, CDNs, Fonts, Inline-Skripte?
2. **R-36:** Kann im Leitungs-Bereich irgendein Name/eine Klasse einer/eines Nehmenden erscheinen?
3. **Regeln:** Jede Prüfung mit R-ID kommentiert und gleich wie in `docs/REGELN.md`? Werte mit O-Nummer einstellbar statt fest?
4. **Texte:** Alle sichtbaren Texte aus `texts.ts`? Gibt es sie in `docs/TEXTE.md`?
5. **Design:** Nur Tokens aus `docs/DESIGN.md`, keine festen Farben, keine Emojis, Maße wie in DESIGN.md §4–§5?
6. **Zustände:** Laden, leer, Fehler, „Wird verarbeitet“ vorhanden? Eingaben bleiben bei Fehler erhalten?
7. **Barrierefreiheit:** Beschriftungen, Rollen (`dialog`, `menu`, `switch`), Fokus, Touch-Ziele ≥ 44 px.
8. **Schichten:** Importiert ein Bildschirm PnPjs oder MockService direkt? Logik in `domain/` statt im Bildschirm?
9. **Tests:** `npm test` grün? Neue Regeln mit Test?
