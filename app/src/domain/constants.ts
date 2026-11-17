// Feste Wertelisten und Grenzen (docs/DATENMODELL.md §6, docs/REGELN.md).
// Anzeige-Texte stehen NICHT hier, sondern in app/texts.ts unter labels.*.
// Einstellbare Werte (O-xx) stehen in NhSettings, hier nur ihre Standardwerte (DEFAULT_SETTINGS).

// ---------- Wertelisten (DATENMODELL.md §6) ----------

/** Fächer (O-13: 14 Fächer, Entwurf angenommen). */
export const SUBJECTS = ['Ma', 'De', 'En', 'Fr', 'La', 'Bio', 'Ch', 'Ph', 'NwT', 'Inf', 'Ge', 'Geo', 'Gk', 'Wi'] as const;
export type Subject = (typeof SUBJECTS)[number];

/** Stufen, die ein Tutor unterrichtet (R-24). */
export const GRADE_BANDS = ['5-6', '7-8', '9-10', 'KS'] as const;
export type GradeBand = (typeof GRADE_BANDS)[number];

/** Klassen. J1/J2 = Kursstufe. */
export const GRADES = ['5', '6', '7', '8', '9', '10', 'J1', 'J2'] as const;
export type Grade = (typeof GRADES)[number];

/** Klasse als Zahl zum Vergleichen (J1 = 11, J2 = 12). */
export const GRADE_NUMBER: Readonly<Record<Grade, number>> = {
  '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, J1: 11, J2: 12
};

/** Zu welcher Stufe gehört eine Klasse. */
export const GRADE_TO_BAND: Readonly<Record<Grade, GradeBand>> = {
  '5': '5-6', '6': '5-6', '7': '7-8', '8': '7-8', '9': '9-10', '10': '9-10', J1: 'KS', J2: 'KS'
};

/** Anliegen / Art der Hilfe. */
export const CONCERNS = ['basics', 'exam', 'homework', 'learning'] as const;
export type Concern = (typeof CONCERNS)[number];

/** Format / Ort (D-25, R-16). */
export const PLACES = ['school', 'online', 'elsewhere'] as const;
export type Place = (typeof PLACES)[number];

/** Schultage. */
export const DAYS = ['Mo', 'Di', 'Mi', 'Do', 'Fr'] as const;
export type Day = (typeof DAYS)[number];

/** Zeitfenster, für alle Formate wählbar (R-25, D-29). */
export const SLOTS = ['13-14', '14-15', '15-16', '16-17', '17-18', '18-19'] as const;
export type Slot = (typeof SLOTS)[number];

/** Dauer einer Stunde in Minuten. */
export const LESSON_MINUTES = [45, 60] as const;
export type LessonMinutes = (typeof LESSON_MINUTES)[number];

/** Dauer eines Gruppen-Termins in Minuten (R-101). */
export const GROUP_SESSION_MINUTES = [45, 60, 90] as const;
export type GroupSessionMinutes = (typeof GROUP_SESSION_MINUTES)[number];

/** Meldegründe (A-50). */
export const REPORT_REASONS = ['noShow', 'messages', 'money', 'profile', 'app', 'other'] as const;
export type ReportReason = (typeof REPORT_REASONS)[number];

/** Ablehnungsgründe für eine Anfrage (A-23). */
export const DECLINE_REASONS = ['noTime', 'notFitting', 'none'] as const;
export type DeclineReason = (typeof DECLINE_REASONS)[number];

/** Ansichten bzw. Rollen (R-02, Profile.LastView). */
export const VIEWS = ['learner', 'applicant', 'tutor', 'lead', 'teacher'] as const;
export type View = (typeof VIEWS)[number];

/** Avatare: 12 Farbpaare Hintergrund/Schrift (docs/DESIGN.md §Avatare, alle ≥ 6:1). Index = Avatar-Nummer. */
export const AVATARS: ReadonlyArray<{ readonly bg: string; readonly fg: string }> = [
  { bg: '#FCE6C9', fg: '#7A4300' },
  { bg: '#DCEFE6', fg: '#1E5A3F' },
  { bg: '#E5E0F5', fg: '#4B3685' },
  { bg: '#FFE3E0', fg: '#8A2B20' },
  { bg: '#D9ECF7', fg: '#1D4F6E' },
  { bg: '#FDE8F1', fg: '#8A2155' },
  { bg: '#DDF1F4', fg: '#0E4F5F' },
  { bg: '#E3E7EE', fg: '#3A4256' },
  { bg: '#EEF0D6', fg: '#545A12' },
  { bg: '#F3E4F7', fg: '#6A2C7A' },
  { bg: '#FFF0D1', fg: '#6E4A00' },
  { bg: '#E2ECFF', fg: '#2B4C8C' }
];

/** Anzahl der Lehrmethoden (TEXTE.md §4, texts.methods). */
export const METHODS_COUNT: number = 9;

// ---------- Feste Grenzen (keine O-Punkte, darum hier) ----------

export const LIMITS = {
  bio: 200, // R-23, R-80
  message: 300, // R-80
  declineReason: 300, // R-80
  appeal: 500, // R-80
  report: 1000, // R-80
  capacityMin: 1, // R-26
  capacityMax: 5, // R-26
  priceMin: 0, // R-62
  priceMax: 30, // R-62
  groupTitleMin: 3, // R-101
  groupTitleMax: 60, // R-101
  groupDescription: 300, // R-101
  groupPlaceNote: 40, // R-101
  groupMinSize: 2, // R-101
  groupPriceMax: 15 // R-101
} as const;

// ---------- Einstellungen (NhSettings, docs/ENTSCHEIDUNGEN.md §4) ----------

export interface Holiday {
  from: string; // ISO-Datum
  to: string;
  name: string;
}

export interface Contacts {
  teacher: string;
  childProtection: string;
  trust: string[];
  smv: string;
}

export interface Settings {
  paused: boolean; // R-05
  holidays: Holiday[]; // R-06, R-90 (O-29)
  consentUntilGrade: number; // R-11 (O-09)
  tutorMinGrade: number; // R-20 (O-01)
  maxOpenRequests: number; // R-41 (O-02)
  requestDeadlineSchoolDays: number; // R-45 (O-02)
  reapplyDays: number; // R-27
  interviewWithinSchoolDays: number; // R-29
  continueReminderDays: number; // R-51
  continueEndDays: number; // R-51
  lessonConfirmDays: number; // R-53
  inactiveReminderWeeks: number; // R-55
  inactiveEndWeeks: number; // R-55
  minTutorsToOpen: number; // R-49 (O-18, D-30)
  priceHint: string; // R-62
  schoolYearEnd: string; // R-58 (O-29), ISO-Datum, leer = nicht gesetzt
  abiPauseFrom: string; // R-59 (O-29)
  examReminderDates: string[]; // R-59
  groupMaxSize: number; // R-101 (O-37)
  groupMaxSessions: number; // R-101 (O-37)
  maxActiveGroupsPerTutor: number; // R-102 (O-37)
  maxGroupsPerLearner: number; // R-104 (O-37)
  groupPriceHint: string; // R-110 (O-37)
  contacts: Contacts; // R-74 (O-11, O-15)
}

export type SettingKey = keyof Settings;

/** Standardwerte, solange NhSettings nichts anderes sagt. */
export const DEFAULT_SETTINGS: Readonly<Settings> = {
  paused: false,
  holidays: [],
  consentUntilGrade: 8,
  tutorMinGrade: 8,
  maxOpenRequests: 3,
  requestDeadlineSchoolDays: 3,
  reapplyDays: 7,
  interviewWithinSchoolDays: 10,
  continueReminderDays: 7,
  continueEndDays: 14,
  lessonConfirmDays: 7,
  inactiveReminderWeeks: 3,
  inactiveEndWeeks: 5,
  minTutorsToOpen: 0, // D-30: Finden sofort offen
  priceHint: '8–12 €',
  schoolYearEnd: '',
  abiPauseFrom: '',
  examReminderDates: [],
  groupMaxSize: 8,
  groupMaxSessions: 8,
  maxActiveGroupsPerTutor: 3,
  maxGroupsPerLearner: 5,
  groupPriceHint: '3–6 € pro Person',
  contacts: { teacher: '', childProtection: '', trust: [], smv: 'SMV-Raum, große Pause' }
};

/** Automatische Abzeichen ab so vielen bestätigten Stunden (R-65, O-19). */
export const AUTO_BADGE_HOURS = [10, 20, 50] as const;

// ---------- Farbe der Zustands-Pille (TEXTE.md §9, Spalte „Pille“; Texte in texts.states) ----------

export type Pill = 'wait' | 'blue' | 'ok' | 'grey' | 'red';

export const STATE_PILL = {
  tutoring: { open: 'wait', trial: 'blue', running: 'ok', declined: 'grey', expired: 'grey', withdrawn: 'grey', ended: 'grey' },
  lesson: { pending: 'wait', confirmed: 'ok', disputed: 'red', void: 'grey' },
  application: { submitted: 'wait', interview: 'blue', approved: 'ok', rejected: 'red', appeal: 'wait', finalRejected: 'red' },
  tutor: { active: 'ok', paused: 'grey', suspended: 'red', banned: 'red' },
  consent: { notNeeded: 'grey', missing: 'wait', ok: 'ok' },
  group: { open: 'blue', closed: 'ok', done: 'grey', cancelled: 'red' },
  session: { held: 'ok', cancelled: 'red' },
  attendance: { absent: 'grey' }
} as const satisfies Record<string, Record<string, Pill>>;
