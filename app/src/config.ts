// Feste Einstellungen der App. Keine Geheimnisse (CLAUDE.md, Regel 12).
// Fachliche Einstellungen (Fristen, Ferien, Grenzen) stehen NICHT hier,
// sondern in der Liste NhSettings (docs/ENTSCHEIDUNGEN.md §4).

/**
 * Adresse der nachhilfly-Website mit allen Listen (docs/ARCHITEKTUR.md §10).
 * Immer diese Adresse für Daten nutzen, nie pageContext.web.absoluteUrl.
 * PLATZHALTER: Testseite = Website des Teams „nachhilfly“ (T-0.3). Adresse eintragen, sobald bekannt.
 */
export const SITE_URL: string = 'https://example.sharepoint.com/sites/nachhilfly';

/** Interne Listennamen (docs/DATENMODELL.md §2, L-01 … L-14). */
export const LISTS = {
  inbox: 'NhInbox', // L-01, die einzige Liste, in die die App schreibt
  settings: 'NhSettings', // L-02
  profiles: 'NhProfiles', // L-03
  consents: 'NhConsents', // L-04
  applications: 'NhApplications', // L-05
  tutorCards: 'NhTutorCards', // L-06
  tutorings: 'NhTutorings', // L-07
  reports: 'NhReports', // L-08
  log: 'NhLog', // L-09
  stats: 'NhStats', // L-10
  notify: 'NhNotify', // L-11
  caseNotes: 'NhCaseNotes', // L-12
  groups: 'NhGroups', // L-13
  groupMembers: 'NhGroupMembers' // L-14
} as const;

export type ListKey = keyof typeof LISTS;

/** Senden über den Eingang (docs/ARCHITEKTUR.md §6). Werte vorläufig, O-32 misst sie im Technik-Test. */
export const SEND_POLL_FAST_MS: number = 1500; // in den ersten 10 s
export const SEND_POLL_FAST_UNTIL_MS: number = 10000;
export const SEND_POLL_SLOW_MS: number = 4000; // danach
export const SEND_SLOW_MS: number = 20000; // dann „Dauert länger als sonst …“
export const SEND_GIVEUP_MS: number = 120000; // dann nur noch beim nächsten Öffnen nachsehen

/** Lage der Tab-Leiste (O-30, Standard unten). */
export type TabbarPlacement = 'bottom' | 'top';
export const TABBAR_PLACEMENT: TabbarPlacement = 'bottom';
