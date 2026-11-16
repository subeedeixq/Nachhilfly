# SETUP – Computer einrichten und was die IT vorbereitet

**Wann lesen:** Einmal am Anfang (Aufgaben T-0.x) und wenn ein neuer Nachfolger dazukommt.
**Kosten:** Alles hier ist kostenlos, außer Claude Code: Das braucht mindestens das **Claude-Pro-Abo (20 $ im Monat, 17 $ bei Jahreszahlung; Euro-Preise können abweichen)**. Chat und Claude Code teilen sich ein Nutzungslimit pro 5 Stunden und pro Woche. Ist es aufgebraucht: warten (kostenlos) oder Zusatzguthaben bzw. Max-Abo (**kostet extra**). Automatisches Nachladen von Guthaben nicht einschalten.

## Inhalt
1. Was du brauchst
2. Programme installieren (Mac)
3. Projekt öffnen und Claude Code starten
4. SPFx-Skill und Microsoft-Doku für Claude
5. Prüfen, ob alles läuft
6. Was die IT vorbereitet (Checkliste für Frau Hilchentwort)
7. Häufige Probleme

## 1. Was du brauchst
- Einen eigenen Mac (genutzt wird macOS), auf dem du Programme installieren darfst (Schul-Laptops mit Sperren gehen meist nicht).
- Etwa 10 GB freien Speicher.
- Internet ohne Sperren für Entwickler-Downloads (Schul-WLAN blockiert manchmal npm; dann zu Hause einrichten).
- Ein kostenloses GitHub-Konto (github.com) für den Code.
- Dein Claude-Abo (mindestens Pro, siehe Kosten oben).
- Dein Schulkonto mit Zugriff auf die **Testseite** (richtet die IT ein, §6).

## 2. Programme installieren
Gib die Befehle im **Terminal** ein (Programme → Dienstprogramme → Terminal). Nach jeder Installation das Fenster schließen und neu öffnen.

| Programm | Mac | Prüfen mit |
|---|---|---|
| Git | `xcode-select --install` | `git --version` |
| Node.js 26 | `brew install node@26` oder Installer von nodejs.org | `node --version` → beginnt mit `v26.` |
| VS Code | Download von code.visualstudio.com | öffnen |
| SPFx-Werkzeuge | `npm install -g @rushstack/heft yo @microsoft/generator-sharepoint@1.24.1` | `heft --version`, `yo --version` |
| CLI for Microsoft 365 | nicht installieren, läuft über `npx` (immer aktuelle Version): `npx -p @pnp/cli-microsoft365@latest m365 …` | `npx -p @pnp/cli-microsoft365@latest m365 version` |
| Claude Code | Anleitung auf docs.claude.com → Claude Code → Installation | `claude --version` |

Hinweise:
- Wenn `npm install -g` „permission denied“ meldet: nicht mit `sudo` arbeiten, sondern Node über `brew` oder `nvm` installieren.
- Microsoft unterstützt für SPFx 1.24 Node 22, 24 und 26. Wir nehmen **Node 26** (`.nvmrc` im Projekt, legt T-1.1 an).
- Geprüfter Stand (16.11.2026): SPFx 1.24.1, Node 26.13.1, yo 7.0.1, heft 1.3.5.
- Nachfolger mit Windows: gleiche Programme, Installation per `winget` in PowerShell; Pfade mit `\` statt `/`.
- Git einmal einrichten: `git config --global user.name "Subi"` und `git config --global user.email "<deine GitHub-Adresse>"`.

## 3. Projekt öffnen und Claude Code starten
1. Den Starter-Kit-Ordner `nachhilfly` an einen festen Ort legen: `~/Projekte/nachhilfly`. Nicht in iCloud- oder OneDrive-Synchronisierung (macht `node_modules` langsam).
2. Im Terminal: `cd ~/Projekte/nachhilfly`.
3. Git-Repo anlegen: `git init`, dann `git add -A` und `git commit -m "Starter-Kit"`.
4. Auf github.com ein **privates** Repository `nachhilfly` anlegen (ohne README). Dann die zwei Befehle, die GitHub anzeigt (`git remote add origin …` und `git push -u origin main`).
5. `claude` eingeben. Beim ersten Start anmelden (Browser öffnet sich). Claude liest automatisch `CLAUDE.md`.
6. Ersten Befehl eingeben: `/naechster-schritt`.

Wenn Claude fragt, ob es einen Befehl ausführen darf: lesen, was da steht. Bei `npm`, `heft`, `git` in diesem Ordner ist das normal. Bei allem, was Dateien außerhalb des Projekts löscht oder etwas bezahlt: nein.

## 4. SPFx-Skill und Microsoft-Doku für Claude
**Microsoft SPFx Dev Skill** (offiziell, Vorschau, kostenlos): bringt Claude die aktuellen SPFx-Regeln bei.
```
git clone https://github.com/SharePoint/spfx-dev-skills.git ../spfx-dev-skills
```
```
mkdir -p .claude/skills && cp -r ../spfx-dev-skills/plugins/spfx/skills/spfx .claude/skills/spfx
```
Danach Claude Code neu starten. Den Ordner `.claude/skills/spfx` mit ins Git nehmen.

**Microsoft-Learn-Doku** (kostenlos): Die Datei `.mcp.json` im Projekt verbindet Claude mit der offiziellen Microsoft-Doku. Beim ersten Start fragt Claude Code, ob es den Server `microsoft-learn` nutzen darf: zustimmen.

## 5. Prüfen, ob alles läuft
Claude macht das in Aufgabe T-0.2 mit dir:
- `npx -p @pnp/cli-microsoft365@latest m365 spfx doctor` → alles grün oder Claude erklärt, was fehlt.
- `node --version` (v26.x), `git --version`, `heft --version`.

## 6. Was die IT vorbereitet (Checkliste für Frau Hilchentwort)
Zum Ausdrucken oder als Mail. Alles bitte zuerst nur für die **Testseite**.
1. **Testseite** (SharePoint-Teamwebsite oder Kommunikationswebsite) „nachhilfly-test“. Subi als Besitzer.
2. **Websitesammlungs-App-Katalog** auf der Testseite aktivieren (PowerShell: `Add-SPOSiteCollectionAppCatalog -Site <URL>`), damit Subi Testversionen selbst hochladen kann.
3. **Testkonten** für jede Rolle (siehe TODO.md T-0.3): 1 Fünftklässler, 1 Siebtklässler, 1 Tutor, 1 Leitungsteam-Mitglied, 1 Lehrkraft. Ohne echte Daten.
4. **SharePoint-Gruppen** auf der Testseite: „nachhilfly Schüler“, „nachhilfly Leitungsteam“, „nachhilfly Lehrkraft“, „nachhilfly Entwicklung“ (Rechte siehe DATENMODELL.md §2).
5. **Funktionskonto** (O-22) mit Lizenz, die Power Automate mit Standard-Konnektoren erlaubt. **Kostenfrage klären.**
6. **Power Automate** für Subi auf der Testumgebung erlaubt (Standard-Konnektoren: SharePoint, Outlook, Teams).
7. Später für den Start: echte Website „nachhilfly“, Paket in den App-Katalog der Schule, „Mit Teams synchronisieren“, im Teams Admin Center erlauben und per App-Einrichtungsrichtlinie für Schüler anheften (O-24), Gruppen befüllen (O-31).
8. Fragen aus ENTSCHEIDUNGEN.md: O-12, O-20, O-21, O-22, O-23, O-24, O-31, O-33.

## 7. Häufige Probleme
| Problem | Lösung |
|---|---|
| `npm` meldet Netzwerkfehler | Anderes WLAN (zu Hause), Proxy der Schule umgehen geht nicht |
| `heft start`: Zertifikat nicht vertraut | `heft trust-dev-cert`, Browser neu starten |
| Falsche Node-Version | Node 26 installieren, Fenster neu öffnen, `node --version` |
| Claude-Limit erreicht | warten bis zum Zurücksetzen (Uhrzeit zeigt Claude an). Zusatzguthaben kostet Geld. |
| Schul-PC verbietet Installation | eigenen Computer nehmen |
| `m365 spfx doctor` meldet falsche Version | Versionen so installieren, wie doctor es sagt |
| `m365: command not found` | Normal, die CLI ist nicht global installiert. Immer mit `npx -p @pnp/cli-microsoft365@latest m365 …` aufrufen. |
