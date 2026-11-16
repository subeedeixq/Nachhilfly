# nachhilfly – Starter-Kit

Die Nachhilfe-Börse der SMV am Evangelischen Heidehof-Gymnasium Stuttgart. Teams-App (SPFx), Daten in SharePoint, Abläufe mit Power Automate. Nicht kommerziell.

## So fängst du an
1. `docs/SETUP.md` lesen und den Computer einrichten (ein Nachmittag).
2. Im Ordner `nachhilfly` das Programm `claude` starten.
3. `/naechster-schritt` eingeben. Claude nimmt die nächste Aufgabe aus `TODO.md`, sagt dir den Plan und legt los.
4. Am Ende jeder Sitzung: Claude hakt ab, schreibt eine Notiz und speichert mit Git. Du probierst aus, was Claude dir sagt.

## Befehle in Claude Code
| Befehl | Was passiert |
|---|---|
| `/naechster-schritt` | nächste Aufgabe planen, bauen, prüfen, abhaken |
| `/naechster-schritt T-4.3` | eine bestimmte Aufgabe |
| `/pruefen` | Code gegen Regeln, Design und Sicherheit prüfen |
| `/flow-anleitung F-03` | Klick-Anleitung für einen Power-Automate-Ablauf |
| `/fortschritt` | Wie weit sind wir? |

## Was liegt wo?
| Ordner/Datei | Inhalt | Für wen |
|---|---|---|
| `CLAUDE.md` | Arbeitsanweisung, harte Regeln, Wegweiser | Claude (liest es immer zuerst) |
| `TODO.md` | Alle Aufgaben in 11 Phasen | beide |
| `docs/SPEC.md` | Rollen, Zustände, alle Bildschirme | beide |
| `docs/REGELN.md` | Jede Regel mit Nummer (R-xx) | beide |
| `docs/DATENMODELL.md` | SharePoint-Listen, Spalten, Rechte, Aktionen | Claude, IT |
| `docs/FLOWS.md` | Alle Power-Automate-Abläufe | Claude, du beim Bauen |
| `docs/ARCHITEKTUR.md` | Aufbau des Codes, Technik, Befehle | Claude |
| `docs/DESIGN.md` | Farben, Schrift, Bauteile | beide |
| `docs/TEXTE.md` | Jeder Text in der App | beide (Texte änderst du hier) |
| `docs/ENTSCHEIDUNGEN.md` | Was entschieden ist, was offen ist | **du pflegst das** |
| `docs/SETUP.md` | Computer einrichten, Checkliste für die IT | du, IT |
| `referenz/` | Prototyp v2, Logo, Produktbeschreibung (nicht ändern) | beide |
| `app/` | Der Code (entsteht ab Aufgabe T-1.1) | Claude |
| `flows/` | Anleitungen zu den Abläufen | du |

## Wichtig
- **Keine echten Schülerdaten** in Code, Git, Chats mit Claude oder Screenshots. Entwickelt wird auf der Testseite mit erfundenen Personen.
- **Entscheidungen** trägst du in `docs/ENTSCHEIDUNGEN.md` ein. Claude richtet sich danach.
- **Kosten:** Alles im Projekt ist kostenlos, außer dem Claude-Abo (mindestens Pro). Offen ist nur, ob das Funktionskonto eine Lizenz braucht, die Geld kostet (O-22). Premium-Bausteine in Power Automate werden nie benutzt.
- **Texte ändern:** in `docs/TEXTE.md` ändern und Claude sagen „Texte aus TEXTE.md übernehmen“.
