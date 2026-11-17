// Typen für Zustände (docs/SPEC.md §2, Z-1 … Z-10), Aktionen im Eingang (docs/DATENMODELL.md §5, A-xx)
// und Fehlercodes (docs/TEXTE.md §8, E-xx). Reine Typen, keine Logik.
import type {
  Concern, Day, Grade, GradeBand, GroupSessionMinutes, LessonMinutes, Place,
  ReportReason, SettingKey, Settings, Slot, Subject, View
} from './constants';

// ---------- Zustände ----------

/** Z-1 Nehmende (Profile.LearnerState). */
export type LearnerState = 'restricted' | 'active' | 'suspended' | 'banned';

/** Z-2 Bewerbung (Application.State). */
export type ApplicationState =
  | 'submitted' | 'interview' | 'approved' | 'rejected' | 'appeal' | 'finalRejected' | 'withdrawn';

/** Z-3 Tutor (Application.TutorState, nur bei State = approved). */
export type TutorState = 'active' | 'paused' | 'suspended' | 'banned' | 'quit';

/** Z-4 Nachhilfe (Tutoring.State). Anfrage = Nachhilfe im Zustand open. */
export type TutoringState = 'open' | 'withdrawn' | 'declined' | 'expired' | 'trial' | 'running' | 'ended';
export type TutoringEndedBy = 'tutor' | 'learner' | 'system';
export type TutoringEndReason = 'byUser' | 'noContinue' | 'inactive' | 'unavailable' | 'schoolYearEnd' | 'left';

/** Endzustände der Nachhilfe (Z-4, Spalte „Endzustand?“). */
export const TUTORING_FINAL_STATES: ReadonlyArray<TutoringState> = ['withdrawn', 'declined', 'expired', 'ended'];

/** Z-5 Stunde (Tutoring.Lessons). */
export type LessonState = 'pending' | 'confirmed' | 'disputed' | 'void';

/** Z-6 Meldung (Report.State). */
export type ReportState = 'open' | 'done';
export type ReportDecision = 'noViolation' | 'warned' | 'suspended' | 'handedToTeacher';

/** Z-7 Eingang (Inbox.State). */
export type InboxState = 'new' | 'processing' | 'done' | 'rejected' | 'error';

/** Z-8 Gruppe (Group.State). */
export type GroupState = 'open' | 'closed' | 'done' | 'cancelled';
export type GroupCancelReason = 'byTutor' | 'hidden' | 'unavailable' | 'schoolYearEnd';

/** Z-9 Gruppen-Teilnahme (GroupMember.State). */
export type GroupMemberState = 'joined' | 'left' | 'cancelled' | 'done';

/** Z-10 Gruppen-Termin (Group.Sessions). */
export type SessionState = 'planned' | 'held' | 'cancelled';
/** Anwesenheit je Person (GroupMember.Attendance): Z-5 oder nicht da. */
export type AttendanceState = LessonState | 'absent';

/** Einwilligung im Bewerbungs-/Profilkontext (R-21). */
export type ConsentStatus = 'notNeeded' | 'missing' | 'ok';

// ---------- Bausteine für Payloads ----------

export interface TimeSlot {
  day: Day;
  slot: Slot;
}

/** Steckbrief-Entwurf (Application.Draft, DATENMODELL.md L-05). */
export interface TutorDraft {
  avatar: number;
  bio: string;
  subjects: Subject[];
  mainSubject: Subject;
  gradeBands: GradeBand[];
  helpTypes: Concern[];
  formats: Place[];
  times: TimeSlot[];
  price: number;
  languages: string;
  capacity: number;
}

export interface GroupSessionInput {
  start: string; // ISO, z. B. 2026-11-20T15:00
  minutes: GroupSessionMinutes;
}

export interface GroupInput {
  title: string;
  description: string;
  subject: Subject;
  gradeBands: GradeBand[];
  place: Place;
  placeNote: string;
  sessions: GroupSessionInput[];
  minSize: number;
  maxSize: number;
  price: number;
  signupUntil: string; // ISO
}

type Empty = Record<string, never>;

// ---------- Aktionen im Eingang (DATENMODELL.md §5) ----------

/** Payload je Aktionscode. Der Schlüssel ist der Wert der Spalte Action. */
export interface ActionPayloads {
  register: { as: 'learner' | 'tutor'; avatar: number; grade: Grade; rulesAccepted: true; privacyAccepted: true }; // A-01
  setAvatar: { avatar: number }; // A-02
  leave: Empty; // A-03
  setView: { view: View }; // A-04
  addLearner: Empty; // A-05
  apply: { draft: TutorDraft; interviewSlots: string[]; rulesAccepted: true; methodsAccepted: true }; // A-10
  updateApplication: { draft: TutorDraft; interviewSlots: string[] }; // A-11
  withdrawApplication: Empty; // A-12
  methodRead: { index: number; read: boolean }; // A-13
  appeal: { text: string }; // A-14
  appealBan: { text: string }; // A-15
  request: { subject: Subject; concern: Concern; times: TimeSlot[]; places: Place[]; message: string }; // A-20
  withdrawRequest: Empty; // A-21
  accept: Empty; // A-22
  decline: { reason: string }; // A-23
  logLesson: { date: string; minutes: LessonMinutes; place: Place }; // A-24
  answerLesson: { lessonId: string; ok: boolean }; // A-25
  continue: { yes: boolean }; // A-26
  end: Empty; // A-27
  feedback: { fits: boolean; text: string }; // A-28
  message: { text: string }; // A-29 (Version 1.1, O-20)
  pause: { on: boolean }; // A-30
  changeQuick: Partial<{ times: TimeSlot[]; price: number; capacity: number }>; // A-31
  changeRequest: Partial<{ bio: string; subjects: Subject[]; gradeBands: GradeBand[]; helpTypes: Concern[] }>; // A-32
  quit: Empty; // A-34
  scheduleInterview: { at: string; place: string }; // A-40
  approve: Empty; // A-41
  reject: { reason: string }; // A-42
  conflict: Empty; // A-43
  suspendTutor: { reason: string }; // A-44
  unsuspendTutor: Empty; // A-45
  banTutor: { reason: string }; // A-46
  approveChange: Empty; // A-47
  rejectChange: { reason: string }; // A-48
  badge: { badge: string }; // A-49
  report: { aboutType: 'tutor' | 'learner' | 'app'; aboutEmail: string; context: string; reason: ReportReason; text: string }; // A-50
  childProtection: { text: string; context: string }; // A-51
  decideReport: { decision: ReportDecision }; // A-52
  consent: { receivedOn: string; onlineAllowed: boolean; outsideAllowed: boolean }; // A-60
  setGrade: { grade: Grade }; // A-61
  learnerState: { state: LearnerState; reason: string }; // A-62
  setting: { [K in SettingKey]: { key: K; value: Settings[K] } }[SettingKey]; // A-63
  createGroup: GroupInput; // A-70
  updateGroup: Partial<GroupInput> & { addSessions?: GroupSessionInput[] }; // A-71
  cancelGroup: { sessionId?: string; reason: string }; // A-72 (ohne sessionId = ganze Gruppe)
  joinGroup: Empty; // A-73
  leaveGroup: Empty; // A-74
  logGroupSession: { sessionId: string; held: boolean; absent: number[] }; // A-75
  answerGroupSession: { sessionId: string; ok: boolean }; // A-76
  hideGroup: { reason: string }; // A-77
}

/** Aktionscode (Spalte Action in NhInbox). */
export type ActionCode = keyof ActionPayloads;

/** Payload zu einer Aktion, z. B. PayloadOf<'request'>. */
export type PayloadOf<A extends ActionCode> = ActionPayloads[A];

/** Zuordnung Aktionscode → A-ID (für Kommentare, Protokoll, Tests). */
export const ACTION_IDS: Readonly<Record<ActionCode, string>> = {
  register: 'A-01', setAvatar: 'A-02', leave: 'A-03', setView: 'A-04', addLearner: 'A-05',
  apply: 'A-10', updateApplication: 'A-11', withdrawApplication: 'A-12', methodRead: 'A-13', appeal: 'A-14', appealBan: 'A-15',
  request: 'A-20', withdrawRequest: 'A-21', accept: 'A-22', decline: 'A-23', logLesson: 'A-24', answerLesson: 'A-25',
  continue: 'A-26', end: 'A-27', feedback: 'A-28', message: 'A-29',
  pause: 'A-30', changeQuick: 'A-31', changeRequest: 'A-32', quit: 'A-34',
  scheduleInterview: 'A-40', approve: 'A-41', reject: 'A-42', conflict: 'A-43', suspendTutor: 'A-44',
  unsuspendTutor: 'A-45', banTutor: 'A-46', approveChange: 'A-47', rejectChange: 'A-48', badge: 'A-49',
  report: 'A-50', childProtection: 'A-51', decideReport: 'A-52',
  consent: 'A-60', setGrade: 'A-61', learnerState: 'A-62', setting: 'A-63',
  createGroup: 'A-70', updateGroup: 'A-71', cancelGroup: 'A-72', joinGroup: 'A-73', leaveGroup: 'A-74',
  logGroupSession: 'A-75', answerGroupSession: 'A-76', hideGroup: 'A-77'
};

// ---------- Fehlercodes (TEXTE.md §8) ----------

export const ERROR_CODES = [
  'E-PAUSED', 'E-NO-PROFILE', 'E-EXISTS', 'E-INVALID', 'E-CONTACT', 'E-CONSENT', 'E-GRADE', 'E-FULL',
  'E-UNAVAILABLE', 'E-DUPLICATE', 'E-TOO-MANY', 'E-ONLINE', 'E-PLACE', 'E-SELF', 'E-CONFLICT', 'E-LOCKED',
  'E-TOO-EARLY', 'E-GONE', 'E-NOT-ALLOWED', 'E-NETWORK', 'E-SERVER'
] as const;
export type ErrorCode = (typeof ERROR_CODES)[number];

// ---------- Ergebnis beim Senden (ARCHITEKTUR.md §6) ----------

export type SendResult<T = unknown> =
  | { ok: true; data: T }
  | { ok: false; code: ErrorCode }
  | { ok: 'slow'; inboxId: number };
