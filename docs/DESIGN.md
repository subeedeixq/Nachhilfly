# DESIGN – Aussehen, Bauteile, Bewegung

**Wann lesen:** Bevor du ein Bauteil oder einen Bildschirm baust oder Styles änderst.
Stand: 3. November 2026, gewählt von Subi und der SMV-Gruppe. Ergänzt am 15.11.2026 für die SPFx-Umsetzung (weitere Fächerfarben, 12 Avatare, Kontrast-Korrektur bei `--nh-text-2`).
**Vorbild:** `referenz/prototyp-v2.html`. Gleichnamige CSS-Klassen dort zeigen jedes Bauteil fertig. Werte in dieser Datei haben Vorrang.

## Inhalt
1. Kurz gesagt und Grundsätze
2. Farben (Tokens)
3. Schrift
4. Abstände und Formen
5. Bauteile
6. Bewegung
7. Texte
8. Nicht machen
9. Bauteil ↔ Prototyp-Klasse

## 1. Kurz gesagt und Grundsätze
Apple-Stil (iOS) mit einer einzigen eigenen Zutat: dem **Fach-Banner** am linken Bildschirmrand. Hell, ruhig, viel Weiß, Schulblau nur für Aktionen. Keine großen Farbflächen, kein farbiger Kopf.
1. Sieht aus und fühlt sich an wie eine gute iPhone-App: Systemschrift, große Überschrift, feine Trennlinien, Menüs und Blätter (Sheets) wie bei iOS.
2. Farbe hat immer eine Aufgabe: Schulblau = Aktion oder Auswahl, Fachfarbe = Fach, Grün = bestätigt, Bernstein = wartet, Rot = Ablehnen/Zahl-Badge.
3. Nur helles Design. Die App bleibt hell, auch wenn Teams dunkel eingestellt ist.
4. Bewegung zeigt, was passiert (Blatt fährt hoch, Überschrift wandert in die Leiste), nie Deko.
5. Ein Fünftklässler muss alles ohne Hilfe schaffen: kurze Wörter, eine Hauptaktion pro Bildschirm.

## 2. Farben
In `app/src/app/styles/tokens.scss`, gesetzt auf `.nhRoot`. Keine anderen Farben im Code.
```css
.nhRoot {
  /* Marke */
  --nh-blue: #4A5BA6;        /* Schulblau aus dem Logo: Aktionen, aktive Reiter, Auswahl */
  --nh-blue-ink: #2E3B78;    /* Text auf Hellblau, gedrückt */
  --nh-blue-tint: #EEF1FA;   /* ausgewählter Filter, Tags, Hinweis */

  /* Flächen */
  --nh-bg: #FFFFFF;          /* Seiten mit Listen */
  --nh-bg-grouped: #F2F3F7;  /* Blätter, gruppierte Formulare */
  --nh-fill: #F2F3F7;        /* Suchfeld, zweite Knöpfe, gedrückte Zeile */
  --nh-fill-strong: #E4E6EC; /* Segment-Hintergrund, Schalter aus */

  /* Text */
  --nh-text: #111827;
  --nh-text-2: #666B7B;      /* Nebentext (war #6B7080: auf Grau nur 4,45:1, jetzt 4,79:1) */
  --nh-text-off: #9A9FAD;    /* nur für deaktivierte Elemente */

  /* Linien */
  --nh-sep: #D5D8E0;         /* Haarlinie 0.5px */
  --nh-chip-line: #D5DBEA;   /* Rand der Filter-Chips */

  /* Status */
  --nh-ok: #1E6B44;   --nh-ok-tint: #E3F2E9;
  --nh-wait: #8A5300; --nh-wait-tint: #FBF0DD;
  --nh-danger: #B3261E; --nh-danger-tint: #FBE9E7;
  --nh-badge: #D93B30;       /* Zahl auf Reiter */

  /* Fächer: weiße Schrift, alle ≥ 4,5:1 (geprüft) */
  --nh-sub-ma: #4A5BA6;  --nh-sub-de: #2F7D5B;  --nh-sub-en: #B4532A;  --nh-sub-fr: #A23B5B;
  --nh-sub-la: #7A5A1E;  --nh-sub-bio: #6F4FA0; --nh-sub-ch: #8A4B12;  --nh-sub-ph: #0E6F86;
  --nh-sub-nwt: #3F6B2A; --nh-sub-inf: #3D5A80; --nh-sub-ge: #8C3B2E;  --nh-sub-geo: #2D6E73;
  --nh-sub-gk: #5A4E8C;  --nh-sub-wi: #6B5A3A;
  --nh-sub-other: #6B7080; /* Meldungen über Nehmende, Einwilligungen */

  --nh-font: -apple-system, BlinkMacSystemFont, "Segoe UI Variable Text", "Segoe UI", system-ui, Roboto, sans-serif;
  --nh-ease: cubic-bezier(.32, .72, 0, 1);
}
```
Neues Fach: Farbe mit gleicher Helligkeit wählen, weiße Schrift muss 4,5:1 schaffen (mit einem Kontrast-Rechner prüfen), dann hier eintragen.

### Avatare
Kreis mit Initialen (zwei Buchstaben), Hintergrund Pastell, Schrift dunkel aus derselben Farbfamilie. Keine Fotos. 12 Paare (Hintergrund / Schrift), alle ≥ 6:1:
`#FCE6C9/#7A4300` · `#DCEFE6/#1E5A3F` · `#E5E0F5/#4B3685` · `#FFE3E0/#8A2B20` · `#D9ECF7/#1D4F6E` · `#FDE8F1/#8A2155` · `#DDF1F4/#0E4F5F` · `#E3E7EE/#3A4256` · `#EEF0D6/#545A12` · `#F3E4F7/#6A2C7A` · `#FFF0D1/#6E4A00` · `#E2ECFF/#2B4C8C`
Größen: 40 px (Liste), 24 px (Rollen-Knopf), 56 px (Auswahl), 76 px (Steckbrief-Kopf).

## 3. Schrift
- Familie: `var(--nh-font)`. Keine Web-Fonts (SharePoint-CSP, Teams-Gefühl).
- Größen (iOS-Skala): Großer Titel 34/41 fett · Blatt-Titel 24 fett · Standard 17 · Nebenzeile 15 · Abschnitt/Fußnote 13 · Tab-Beschriftung 10.5.
- Zahlen in Preisen und Zählern: `font-variant-numeric: tabular-nums`.
- Gewichte: 400 normal, 600 Namen/Titel, 700 große Titel. Nie Großbuchstaben-Überschriften, keine Kicker über Überschriften.
- Großer Titel: `letter-spacing: -.022em`, `text-wrap: balance`.

## 4. Abstände und Formen
- Seitenrand 16 px. Raster 4/8.
- Zeilen mindestens 48 px, Listenzeilen mit Banner 14 px oben/unten.
- Ecken: Suchfeld 12 · Chips 17 (Pille) · Knöpfe groß 12, klein 18 (Pille) · Blätter 14 oben · Menüs 13 · Gruppen 12 · Banner `0 6px 6px 0`.
- Trennlinien: 0.5 px `--nh-sep`, eingerückt bis zum Text (nicht über Banner und Avatar: links 104 px bei Zeilen mit Banner, 16 px sonst).
- Touch-Ziele mindestens 44 × 44 px.
- Navigationsleiste oben 52 px, Tab-Leiste unten 82 px inkl. sicherer Bereich (`env(safe-area-inset-bottom)`).

## 5. Bauteile
**Fach-Banner (Signatur).** 40 px breit, mindestens 64 px hoch, klebt am linken Bildschirmrand, Ecken rechts 6 px rund. Fachkürzel weiß, 12 px, fett, oben mit 10 px Abstand. Zwischen zwei Bannern immer Abstand (Zeilen-Padding), nie aneinander. Steht vor jeder Zeile, die zu einem Fach gehört: Tutoren in Finden, Anfragen, Schüler, Stunden, Bewerbungen (Hauptfach). Bei „voll“ oder deaktiviert: 45 % Deckkraft. `title`/`aria-label` mit Fachname.

**Listenzeile.** Raster: Banner 40 · Avatar 40 · Text · rechts Preis/Status · Pfeil 14 (Abstand 12). Name 17/600, Nebenzeilen 15 `--nh-text-2`. Gedrückt: Hintergrund `--nh-fill`.

**Gruppen-Zeile.** Wie Listenzeile, aber statt Avatar ein Kreis 40 px in `--nh-blue-tint` mit Gruppen-Symbol (`people`) in `--nh-blue`. Rechts Preis „{n} € p. P.“ und darunter „{frei} frei“ (grün) bzw. „voll“ (grau). Volle Gruppe: Banner 45 %.

**Umschalter Tutoren/Gruppen.** Segment-Umschalter direkt unter dem großen Titel in Finden, volle Breite minus 16 px Rand.

**Einfache Zeile (iOS-Liste).** Mindestens 48 px, links Beschriftung, rechts Wert grau, optional Pfeil oder Schalter. Rot für gefährliche Aktionen („nachhilfly verlassen“).

**Gruppe.** Weiße Fläche, Radius 12, 16 px Rand, auf `--nh-bg-grouped`. Überschrift darüber 13 px grau, Fußnote darunter 13 px grau.

**Suchfeld.** 44 px hoch, `--nh-fill`, Lupe links, Platzhalter „Fach oder Name suchen“.

**Filter-Chips.** Seitlich wischbar. Auswahl-Chips mit Pfeil (Fach, Klasse) öffnen ein Menü; Schalt-Chips (in der Schule, online, anderer Ort, kostenlos, freie Plätze) an/aus. Höhe 34. Aktiv: `--nh-blue-tint`, Rand 1.5 px `--nh-blue`, Text `--nh-blue-ink` 600. Gedrückt: Skalierung 0.96.

**Menü (Pull-down).** 240 px breit, durchscheinend weiß mit Blur, Schatten, Zeilen 44 px, Häkchen links in Schulblau bei der aktuellen Wahl. Öffnet mit Skalierung 0.88 → 1 vom Chip aus.

**Blatt (Sheet).** Fährt von unten hoch, Hintergrund `--nh-bg-grouped`, Inhalte in weißen Gruppen. Kopf 52 px: links „Abbrechen“, Mitte Titel, rechts „Fertig“/„Sichern“. Hauptknopf unten fest. Hoch (`tall`) bei Steckbrief, Anfrage, Bewerbung. Abdunkelung `rgba(17,24,39,.3)`.

**Knöpfe.** Haupt: 50 px, Schulblau, weiß, 17/600, volle Breite. Klein: Pille 36 px. Zweitrangig: `--nh-fill` mit dunkler Schrift. Gefahr: `--nh-danger-tint` mit `--nh-danger`. Deaktiviert: `--nh-fill-strong` mit `--nh-text-off`. Gedrückt: Skalierung 0.97. Text-Knopf: Schulblau ohne Fläche.

**Segment-Umschalter.** In Formularen (Dauer, Ort). Hintergrund `--nh-fill-strong`, aktives Segment weiß mit Schatten, Höhe 32.

**Schalter.** iOS-Schalter 51 × 31, an = Schulblau. `role="switch"`.

**Ankreuzfeld.** Rund 26 px, an = Schulblau mit weißem Häkchen.

**Stepper.** −/+ mit Zahl, für Plätze und Fristen.

**Zeitraster.** Tage als Spalten (Mo–Fr), Zeitfenster als Zeilen, Zellen 36 px hoch, gewählt = Schulblau. `18-19` nur aktiv, wenn „online“ gewählt ist (R-25).

**Pille (Status).** 22 px, Radius 11, 12.5/600: ok grün, wartet bernstein, rot, blau, grau.

**Hinweis (Note).** Fläche mit Symbol links, Radius 12: blau (Info), bernstein (wartet), grün (ok), rot (Gefahr). Für Ferien, eingeschränkt, Pause.

**Leerzustand.** Mitte, Titel 17/600, Text 15 grau, optional kleiner Knopf.

**Platzhalter (Laden).** Graue Balken (`--nh-fill`) in Form der echten Zeilen, sanftes Pulsieren (aus bei reduzierter Bewegung).

**Toast.** Unten über der Tab-Leiste, dunkel (`rgba(28,32,44,.94)`), weiß, Radius 14, Spinner bei „Wird verarbeitet“. `role="status"`.

**Navigation.** Oben: kleines Schullogo links, rechts Rollen-Knopf (Avatar + Ansicht + Pfeil, nur bei mehreren Ansichten) und Hilfe-Knopf. Beim Scrollen über 30 px erscheint der Titel klein in der Mitte und die Leiste wird milchig (Blur). Unten: Tab-Leiste, durchscheinend, aktives Symbol Schulblau, rote Zahl. Ausweichlösung für Teams-Handy (O-30): Tabs als Segment-Umschalter unter der Navigationsleiste.

**Symbole.** Linien-SVGs, 1.75 px Strich, runde Enden, 22 px (klein 16/14). Keine Emojis.

## 6. Bewegung
- Standardkurve: `var(--nh-ease)` (iOS-Federgefühl).
- Blatt hoch/runter 0.5 s · Menü 0.32 s · Titel in Leiste 0.35 s · Farbwechsel 0.15–0.25 s · Druck-Feedback 0.15 s.
- Neue Einträge: von 8 px unten einblenden, 0.45 s.
- `prefers-reduced-motion`: alle Übergänge praktisch aus (0.01 ms).

## 7. Texte
Du-Form (Lehrkraft-Bereich: Sie), kurz, freundlich, nicht kindisch. Knöpfe sagen, was passiert („Anfrage an Jonas senden“, „Stunde eintragen“). Leere Zustände erklären den nächsten Schritt. Neben Freitextfeldern: „Keine Noten, keine Gesundheit, keine Kontaktdaten.“ Alle Texte: TEXTE.md.

## 8. Nicht machen
Große farbige Kopfbereiche · Farbverläufe · Karten in Karten · farbige Ränder links an Karten · Emojis als Icons · Web-Fonts · dunkles Design · Fortnite-artige Abzeichen · Fluent-UI-Optik · Spinner ohne Text · „Erfolgreich!“ bevor der Flow fertig ist.

## 9. Bauteil ↔ Prototyp-Klasse
| Komponente | Klasse im Prototyp | | Komponente | Klasse im Prototyp |
|---|---|---|---|---|
| `NavBar` | `.nb`, `.ctitle`, `.logo`, `.nbtn`, `.rolebtn` | | `Segmented` | `.sg` |
| `TabBar` | `.tb`, `.badge` | | `Switch` | `.sw` |
| `LargeTitle` | `.lt`, `.lsub` | | `Checkbox` | `.cb`, `.cbrow` |
| `SectionHeader` | `.sh`, `.gh`, `.gf` | | `Stepper` | `.stepper` |
| `Row`, `SubjectBanner`, `Avatar` | `.row`, `.ban`, `.av` | | `TimeGrid` | `.grid5`, `.tslot` |
| `ListItem` | `.it` | | `Pill` | `.pill` |
| `Group` | `.grp` | | `Note` | `.note` |
| `SearchField` | `.search` | | `Empty` | `.empty` |
| `Chip` | `.chip`, `.chips` | | `Toast` | `.toast`, `.spin` |
| `Menu` | `.menu`, `.mi`, `.catch` | | `Steps`, `ProgressSteps` | `.steps`, `.prog`, `.pstep` |
| `Sheet` | `.sheet`, `.shd`, `.sin`, `.sft`, `.back` | | `AvatarPicker` | `.avpick` |
| `Button` | `.btn`, `.pb`, `.tbtn` | | `Field` | `.field`, `.cnt`, `.err-t` |
| Pause-Bildschirm | `.pause-screen` | | Willkommen-Punkte | `.welcome-pts`, `.wp` |
