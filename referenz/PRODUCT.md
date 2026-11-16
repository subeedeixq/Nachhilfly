# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Final app: SPFx 1.24 web part (SharePoint Framework, React, TypeScript, own CSS – no Fluent UI look) running as a Teams personal app at the Evangelisches Heidehof-Gymnasium Stuttgart; data in SharePoint lists; every write goes through an "Eingang" list and a Power Automate flow under a school function account. SharePoint enforces CSP: no inline scripts, no external font CDNs (no Google Fonts), all assets bundled.
Reference prototype (Prototyp v2): plain HTML/CSS/JS built so it can be moved into SPFx: data layer separated behind a service interface with fake data, no inline handlers, no external fonts, role switcher for testing.

## Users

- Tutors: students from class 8 up to J2 (about 13 to 19 years old) who give paid or free tutoring to other students (any grade they choose, no minimum age gap), one-to-one or in groups. They apply, get confirmed by the Leitungsteam, manage requests, log lessons. **Design priority when needs conflict: tutors** (confirmed by Subi). Without tutors who find the app worth using, there is no offer.
- Learners (Nachhilfe-Nehmende): any student, mostly classes 5 to 10. Classes 5 to 8 are often under 14 and wait for parental consent before they can send requests. They must be able to use the app without help even though tutors have priority.
- Leitungsteam: 3 students from the SMV group. They review applications, manage tutors, handle rule reports. They never see learners' data.
- Betreuende Lehrkraft: one teacher. Enters parental consent, decides on reports about learners, sees the protocol, manages settings (holidays, emergency stop).
- Kinderschutz-Ansprechperson: named by the school leadership, outside the app, receives child-protection reports by mail.

Main situation: on the phone, inside Microsoft Teams, between lessons or in the evening.

## Product Purpose

nachhilfly is the school's own, non-commercial tutoring exchange run by the SMV (student council): students find a confirmed student tutor, send a request, and log lessons that both sides confirm. It exists so that help between students is easy to find, safe, and fair. Success: after the first half-year at least 30 arranged tutoring relationships (proposal, not yet decided).

## Positioning

Built by students for their own school and run inside the school's existing Microsoft 365: no extra login, no external service, tutors confirmed in person by the SMV, a child-protection path to an adult, and data that stays in the school's tenant. Commercial tutoring platforms cannot offer confirmed fellow students from the same school with the school's own rules.

## Operating Context

- Opened as a pinned app in Teams (mobile first, desktop too). Identity comes from the school account; there is no sign-in screen.
- Flow: request in the app → tutor accepts (3 school days) → contact via Teams chat (or in-app message field if student chat is blocked) → free trial lesson → "Weitermachen?" → tutor logs each lesson, learner confirms.
- Group tutoring (since 15.11.2026): a tutor offers a group with a topic, 1–8 fixed dates and limited seats; learners join with one tap; tutor logs each session with attendance.
- Meetings at school, online or at another place the participants agree on (e.g. at home); up to class 8 outside school only with parental consent.
- Payment is private between tutor and family; the platform is free; price recommendation 8–12 € per hour, experienced tutors may charge more; trial lesson always free; the school is not a contract party.
- Version 1 has no calendar; "Stunde eintragen" only. Calendar maybe in version 2.
- Actions are processed by flows, so the UI must show a "wird verarbeitet" state.
- Holidays pause all deadlines; everything ends at the school-year end.

## Capabilities and Constraints

- Roles and screens as defined in "nachhilfly: Produktkonzept" (Version 2, 26.10.2026): Finden · Meine Nachhilfe · Profil · Hilfe & Melden for learners; Status/Lehrmethoden/Steckbrief while applying; Übersicht · Anfragen · Meine Schüler · Steckbrief for confirmed tutors; Bewerbungen · Tutoren · Meldungen · Zahlen for the Leitungsteam; Einwilligungen · Nehmende · Protokoll · Einstellungen for the teacher.
- Avatars instead of photos. No grades, health data, phone numbers, addresses.
- Two report types: rules/app (Leitungsteam or teacher) and "Ich fühle mich unwohl" (only the adult child-protection contact).
- Teams on phones already has its own bottom navigation; in-app navigation placement must be tested on real phones.
- The three formal approvals (school leadership, data protection, technical test) were given (15.11.2026). Remaining detail questions and their defaults: docs/ENTSCHEIDUNGEN.md (O-xx).

## Brand Commitments

- Name: nachhilfly (lowercase).
- Light theme only (confirmed by Subi). Must stay legible when Teams itself runs in dark mode.
- Use the school's logo and the school's blue #4A5BA6 (logo file in referenz/schullogo.jpg, only 200×138 px; a larger file is requested).
- German UI, informal "du", relaxed and friendly but not childish (confirmed).
- No Fortnite names or look (trademark); badges are nachhilfly's own.

## Evidence on Hand

- Concept: "nachhilfly: Produktkonzept" (Version 2) and the review "nachhilfly: Gutachten zum Produktkonzept"; both are condensed into docs/ (SPEC, REGELN, DATENMODELL, FLOWS).
- Accepted prototype: referenz/prototyp-v2.html (design chosen 3.11.2026, see docs/DESIGN.md).
- Old prototypes (Modell A Vermittlung, Modell B Direkt-Kontakt) exist but predate concept v2; they are evidence, not authority.
- No real tutors, testimonials, usage numbers or school assets yet. Do not invent names of real people, statistics or quotes; demo data must be clearly fictional.

## Product Principles

1. Safety before convenience: every flow keeps the adult child-protection path one tap away and never exposes who takes tutoring.
2. Tutors first: being a tutor must feel worthwhile and quick to manage, because the offer depends on them.
3. A fifth-grader must manage alone: plain words, one main action per screen, clear states.
4. The rules live in the system, not in the buttons: the UI shows honest processing and waiting states instead of pretending.
5. Feels like part of the school, not like an outside product.

## Accessibility & Inclusion

Readers from age 10: short sentences, plain German. WCAG 2.2 AA contrast, large touch targets, screen-reader labels, text zoom without breaking layout.
