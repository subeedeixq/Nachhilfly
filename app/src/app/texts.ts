// ALLE Texte der App (CLAUDE.md, Regel 6). Quelle: docs/TEXTE.md, gleiche Schlüssel
// (z. B. texts.ok.request, texts.err['E-FULL'], texts.empty.mine.title).
// Neue oder geänderte Texte: zuerst in TEXTE.md, dann hier.
// Abweichungen von der TEXTE.md-Form:
// - Leere Zustände (§6) als { title, text, button }, „–“ = ''.
// - Listen aus §3/§4 als kodex.items, methods, guide.
// - Zustände (§9) unter states.*, Farbe der Pille in domain/constants.ts (STATE_PILL).
// - Beschriftungen (§11) aus DATENMODELL.md §6 unter labels.*.
// - Vermerke wie „(Entwurf, O-36)“ stehen nur in TEXTE.md, nicht in der App.
// Platzhalter {name} mit fmt() füllen.

export const texts = {
  common: {
    cancel: 'Abbrechen',
    done: 'Fertig',
    save: 'Sichern',
    next: 'Weiter',
    back: 'Zurück',
    retry: 'Erneut versuchen',
    help: 'Hilfe und Melden',
    report: 'Melden',
    contact: 'Kontakt',
    free: 'kostenlos',
    priceUnit: '{preis} €',
    freeSeats: 'Plätze frei',
    noSeats: 'gerade keine Plätze',
    paused: 'macht gerade Pause',
    trialFree: 'Probestunde kostenlos',
    onlineAllowed: 'online erlaubt: {jaNein}',
    outsideAllowed: 'außerhalb der Schule erlaubt: {jaNein}',
    placeHint: 'Den genauen Ort sprecht ihr im Chat ab. Er wird nicht in nachhilfly gespeichert.',
    searchPlaceholder: 'Fach oder Name suchen',
    logoAlt: 'Evangelisches Heidehof-Gymnasium',
    freeTextHint: 'Keine Noten, keine Gesundheit, keine Kontaktdaten.',
    counter: '{n} / {max}',
    loadError: 'Verbindung fehlgeschlagen.',
    crash: 'Da ist etwas schiefgegangen.',
    reload: 'Neu laden'
  },
  welcome: {
    title: 'Willkommen bei nachhilfly',
    p1: {
      title: 'Tutoren aus deiner Schule',
      text: 'Schüler deiner Schule, die das Leitungsteam persönlich bestätigt hat.'
    },
    p2: {
      title: 'Einzeln oder in der Gruppe',
      text: 'Einzeln ist die erste Stunde kostenlos. Für Klassenarbeiten gibt es auch Gruppen. Jeder Tutor legt seinen Preis selbst fest.'
    },
    p3: {
      title: 'Sicher und vertraulich',
      text: 'Niemand sieht, wer Nachhilfe nimmt. Bei Problemen hilft eine Lehrkraft.'
    },
    asLearner: 'Ich suche Nachhilfe',
    asTutor: 'Ich will Nachhilfe geben'
  },
  reg: {
    avatar: {
      title: 'Dein Avatar'
    },
    grade: {
      label: 'Deine Klasse',
      fromAccount: 'Aus deinem Schulkonto'
    },
    rules: {
      title: 'Regeln',
      subtitle: 'So läuft es bei uns',
      check: 'Ich halte mich an die Regeln.'
    },
    privacy: {
      checkUnder: 'Ich habe den Datenschutzhinweis gelesen.',
      checkOver: 'Ich habe den Datenschutzhinweis gelesen und bin einverstanden.'
    },
    finish: {
      title: 'Fast geschafft',
      parents: {
        title: 'Deine Eltern bekommen ein Formular',
        text: 'Die Schule schickt es über den üblichen Weg. Sobald es zurück ist, trägt die betreuende Lehrkraft das ein.'
      },
      browse: {
        title: 'Bis dahin kannst du stöbern',
        text: 'Du siehst alle Tutoren. Anfragen geht, sobald die Zustimmung da ist.'
      },
      tutorNext: 'Als Nächstes: deine Bewerbung als Tutor',
      button: 'Fertig'
    }
  },
  kodex: {
    footer: 'Wer sich nicht daran hält, kann ausgesetzt werden. Bei etwas Unangenehmem: Hilfe und Melden.',
    notContract: 'Die Schule ist nicht Vertragspartner. Bezahlt wird privat zwischen Tutor und Familie.',
    outside: 'Treffen außerhalb der Schule sind private Verabredungen. Sagt euren Eltern, wann und wo ihr euch trefft.',
    items: [
      'Ihr trefft euch in der Schule, online über Teams oder an einem Ort, den ihr gemeinsam absprecht (z. B. zuhause oder in der Bücherei). Bis Klasse 8 außerhalb der Schule nur, wenn deine Eltern das erlaubt haben.',
      'Die Kamera ist freiwillig. Keine Aufnahmen.',
      'Kein Kontakt über Instagram, WhatsApp, Snapchat und keine privaten Nummern.',
      'Geld nur nach der Stunde, nie im Voraus. Die Probestunde ist kostenlos.'
    ]
  },
  privacy: {
    title: 'Datenschutz',
    short: {
      owner: 'Verantwortlich: die Schule',
      purpose: 'Zweck: Nachhilfe vermitteln',
      basis: 'Grundlage: Einwilligung',
      who: 'Wer sieht was: nur Beteiligte',
      deletion: 'Löschung: spätestens zum Schuljahresende'
    },
    long: 'Der ausführliche Hinweis folgt.'
  },
  leave: {
    title: 'nachhilfly verlassen',
    text: 'Dein Profil wird gelöscht, alle Anfragen und Nachhilfen werden beendet. Deine Tutoren bekommen eine kurze Nachricht ohne Grund. Deine Einwilligung gilt als widerrufen.',
    note: 'Bestätigte Stunden bleiben bis zum Schuljahresende für Bescheinigungen gespeichert und werden dann gelöscht.',
    button: 'nachhilfly verlassen'
  },
  apply: {
    welcome: {
      p1: {
        title: '1 bis 3 Stunden pro Woche',
        text: 'Du legst Zeiten, Plätze und Preis selbst fest und kannst jederzeit pausieren.'
      },
      p2: {
        title: 'Kurzes Kennenlerngespräch',
        text: 'Etwa 10 Minuten mit dem Leitungsteam. Keine Noten, kein Test, nur ein kleines Erklär-Beispiel.'
      },
      p3: {
        title: 'Dann ist dein Steckbrief sichtbar',
        text: 'Andere Schüler finden dich und fragen an. Du entscheidest, wen du annimmst, und kannst auch Gruppen anbieten.'
      }
    },
    priceHint: 'Empfehlung: 8 bis 12 € pro Stunde. Wer viel Erfahrung hat, kann auch etwas mehr nehmen. Die Probestunde ist immer kostenlos, bezahlt wird nach der Stunde.',
    check: {
      rules: 'Ich halte mich an die Regeln und den Verhaltenskodex.',
      methods: 'Ich lese vor dem Gespräch die Lehrmethoden.'
    },
    bioPlaceholder: 'Was machst du gern, wie erklärst du?',
    locked: 'Dein Steckbrief ist bis zur Entscheidung gesperrt. So bestätigt das Leitungsteam genau das, was es gesehen hat.',
    status: {
      sent: 'Abgeschickt',
      interview: 'Gespräch',
      decision: 'Entscheidung'
    },
    rejected: {
      reapply: 'Neu bewerben ab {datum}'
    },
    appeal: {
      hint: 'Schreib, warum die Entscheidung noch einmal geprüft werden soll. Ein anderes Mitglied entscheidet.',
      pending: 'Dein Einspruch wird geprüft.'
    },
    final: 'Endgültig abgelehnt. Im nächsten Schuljahr kannst du dich neu bewerben.'
  },
  note: {
    holidays: '**Ferien.** Anfragen bleiben offen, die Antwortfrist läuft nach den Ferien weiter.',
    restricted: 'Deine Eltern bekommen ein Formular. Sobald es da ist, kannst du anfragen.',
    restrictedButton: 'Anfragen geht, sobald deine Eltern zugestimmt haben',
    tutorPaused: 'Du machst gerade Pause. Niemand kann dich neu anfragen. Deine Schüler bleiben.',
    pendingChange: 'Deine Änderung wartet auf Freigabe. Bis dahin sehen andere die alte Version.',
    fullCannotAccept: 'Alle deine Plätze sind belegt. Erhöhe deine Plätze oder beende eine Nachhilfe.',
    consentMissingApprove: 'Bestätigen geht erst, wenn die Einwilligung der Eltern vorliegt.',
    selfCase: 'Bei diesem Fall entscheidest du nicht mit.',
    conflictCase: 'Du bist befangen. Ein anderes Mitglied entscheidet.'
  },
  pause: {
    title: 'nachhilfly macht gerade Pause',
    text: 'Die betreuende Lehrkraft hat die App kurz angehalten. Bei Fragen: {lehrkraft} oder die SMV.'
  },
  suspended: {
    title: 'Du bist gerade ausgesetzt',
    text: 'Bei Fragen wende dich an {lehrkraft}.'
  },
  banned: {
    title: 'Du bist gesperrt',
    text: 'Wenn du das für falsch hältst, kannst du einmal Einspruch einlegen.'
  },
  unavailable: {
    text: 'Tutor nicht mehr verfügbar',
    button: 'Neuen Tutor finden'
  },
  end: {
    ask: '**Wirklich beenden?** Der Platz wird frei. {name} bekommt eine kurze Nachricht ohne Grund.'
  },
  continue: {
    ask: 'Weitermachen mit {name}?',
    hint: 'Ein Nein beendet die Nachhilfe. {name} erfährt keinen Grund.'
  },
  decline: {
    hint: '{name} bekommt Bescheid und kann jemand anderen anfragen. Der Grund ist freiwillig.'
  },
  reject: {
    placeholder: 'Sachlich und freundlich. {name} liest das.'
  },
  suspend: {
    hint: 'Aussetzen wirkt sofort und beendet laufende Nachhilfen mit dem Hinweis „Tutor nicht mehr verfügbar“, ohne Grund. Eine Sperre braucht ein zweites Mitglied oder die Lehrkraft. Die Lehrkraft wird immer informiert.'
  },
  report: {
    kind1: {
      label: 'Problem mit Regeln oder App',
      hint: 'Geht an das Leitungsteam (über Tutoren) oder an die Lehrkraft (über Schüler). Wer gemeldet hat, sieht nur die Lehrkraft.'
    },
    kind2: {
      label: 'Ich fühle mich unwohl',
      hint: 'Geht nur an {kinderschutz}. Niemand aus der SMV sieht das.'
    }
  },
  settings: {
    pauseHint: 'Alle anderen sehen dann nur „nachhilfly macht gerade Pause“.'
  },
  empty: {
    noTutorsYet: {
      title: 'Bald geht’s los!',
      text: 'Die ersten Tutoren werden gerade bestätigt.',
      button: 'Selbst Tutor werden'
    },
    filter: {
      title: 'Kein Tutor passt',
      text: 'Probier es mit weniger Filtern.',
      button: 'Filter zurücksetzen'
    },
    growing: {
      title: 'Es kommen laufend neue Tutoren dazu',
      text: 'Schau bald wieder vorbei. Vielleicht ist dann jemand für dich dabei.',
      button: ''
    },
    mine: {
      title: 'Noch keine Nachhilfe',
      text: 'Such dir einen Tutor aus. Die erste Stunde ist immer kostenlos.',
      button: 'Tutor finden'
    },
    requests: {
      title: 'Keine neuen Anfragen',
      text: 'Dein Steckbrief ist sichtbar. Sobald jemand anfragt, bekommst du Bescheid.',
      button: ''
    },
    requestsPaused: {
      title: 'Keine neuen Anfragen',
      text: 'Du machst gerade Pause.',
      button: ''
    },
    students: {
      title: 'Noch keine Schüler',
      text: 'Wenn du eine Anfrage annimmst, erscheint dein Schüler hier.',
      button: ''
    },
    lessons: {
      title: 'Noch keine Stunden eingetragen',
      text: '',
      button: 'Stunde eintragen'
    },
    done: {
      title: 'Alles erledigt',
      text: '',
      button: ''
    },
    consents: {
      title: 'Keine offenen Einwilligungen',
      text: '',
      button: ''
    },
    log: {
      title: 'Noch keine Einträge',
      text: '',
      button: ''
    },
    groups: {
      title: 'Gerade keine Gruppen',
      text: 'Frag einen Tutor, ob er eine Gruppe für dein Thema anbietet.',
      button: 'Tutoren ansehen'
    },
    myGroups: {
      title: 'Noch keine Gruppen',
      text: 'Biete eine Gruppe an, zum Beispiel vor einer Klassenarbeit.',
      button: 'Gruppe anbieten'
    }
  },
  pending: {
    toast: 'Wird verarbeitet …',
    slow: 'Dauert länger als sonst. Du bekommst Bescheid, sobald es fertig ist.'
  },
  ok: {
    register: 'Willkommen bei nachhilfly!',
    avatar: 'Avatar geändert',
    leave: 'Du hast nachhilfly verlassen.',
    addLearner: 'Du kannst jetzt auch Nachhilfe bekommen.',
    apply: 'Bewerbung abgeschickt. Das Leitungsteam meldet sich.',
    saved: 'Gespeichert',
    withdrawApplication: 'Bewerbung zurückgezogen',
    appeal: 'Einspruch abgeschickt',
    request: 'Anfrage an {name} gesendet',
    withdrawRequest: 'Anfrage zurückgezogen',
    accept: '{name} ist jetzt dein Schüler. Verabredet die Probestunde im Chat.',
    decline: 'Anfrage abgelehnt',
    logLesson: 'Stunde eingetragen',
    confirmLesson: 'Stunde bestätigt',
    disputeLesson: 'Stunde bestritten. {name} bekommt Bescheid.',
    continueYes: 'Schön! Ihr macht weiter.',
    continueNo: 'Nachhilfe beendet',
    end: 'Nachhilfe beendet',
    feedback: 'Danke für deine Rückmeldung',
    pauseOn: 'Pause gestartet',
    pauseOff: 'Pause beendet. Du bist wieder sichtbar.',
    changeRequest: 'Änderung beantragt. Sie geht zur Freigabe.',
    quit: 'Du bist kein Tutor mehr. Danke für deine Hilfe!',
    schedule: 'Gespräch vereinbart. {name} bekommt Bescheid.',
    approve: 'Bestätigt. {name} ist jetzt Tutor.',
    reject: 'Abgelehnt. Die Nachricht mit Grund geht raus.',
    conflict: 'Du bist bei diesem Fall raus.',
    suspend: 'Ausgesetzt. Die Lehrkraft ist informiert.',
    unsuspend: 'Wieder freigegeben. Startet pausiert.',
    banVote: 'Sperre beantragt. Es braucht ein zweites Mitglied oder die Lehrkraft.',
    ban: 'Gesperrt. Die Lehrkraft ist informiert.',
    approveChange: 'Änderung freigegeben',
    rejectChange: 'Änderung abgelehnt',
    badge: 'Abzeichen vergeben',
    report: 'Meldung gesendet',
    childProtection: 'Gesendet. {kinderschutz} meldet sich bei dir.',
    decideReport: 'Entschieden',
    consent: 'Einwilligung eingetragen',
    createGroup: 'Gruppe angeboten. Sie ist jetzt in Finden sichtbar.',
    cancelSession: 'Termin abgesagt. Alle Angemeldeten bekommen Bescheid.',
    cancelGroup: 'Gruppe abgesagt. Alle Angemeldeten bekommen Bescheid.',
    joinGroup: 'Du bist dabei!',
    leaveGroup: 'Du bist abgemeldet.',
    hideGroup: 'Gruppe ausgeblendet. Die Lehrkraft ist informiert.'
  },
  err: {
    'E-PAUSED': 'nachhilfly macht gerade Pause.',
    'E-NO-PROFILE': 'Bitte registriere dich zuerst.',
    'E-EXISTS': 'Das gibt es schon.',
    'E-INVALID': 'Da fehlt noch etwas. Bitte prüf deine Eingaben.',
    'E-CONTACT': 'Bitte keine Kontaktdaten oder Links im Text.',
    'E-CONSENT': 'Deine Eltern müssen erst zustimmen.',
    'E-GRADE': 'Dieser Tutor unterrichtet deine Klasse nicht.',
    'E-FULL': 'Dieser Tutor ist gerade voll geworden.',
    'E-UNAVAILABLE': 'Dieser Tutor ist gerade nicht verfügbar.',
    'E-DUPLICATE': 'Du hast schon eine offene Anfrage bei {name}.',
    'E-TOO-MANY': 'Du hast schon {max} offene Anfragen.',
    'E-ONLINE': 'Online-Nachhilfe ist für dich noch nicht freigegeben.',
    'E-PLACE': 'Treffen außerhalb der Schule sind hier noch nicht von den Eltern erlaubt.',
    'E-SELF': 'Bei diesem Fall darfst du nicht entscheiden.',
    'E-CONFLICT': 'Du hast dich bei diesem Fall als befangen gemeldet.',
    'E-LOCKED': 'Der Steckbrief ist bis zur Entscheidung gesperrt.',
    'E-TOO-EARLY': 'Neu bewerben geht erst ab {datum}.',
    'E-GONE': 'Das ist schon erledigt oder abgelaufen.',
    'E-NOT-ALLOWED': 'Das darfst du hier nicht.',
    'E-NETWORK': 'Keine Verbindung. Deine Eingaben sind noch da. Bitte versuch es noch einmal.',
    'E-SERVER': 'Das hat nicht geklappt. Bitte versuch es später noch einmal.'
  },
  group: {
    segment: {
      tutors: 'Tutoren',
      groups: 'Gruppen'
    },
    offer: 'Gruppe anbieten',
    with: 'mit {tutor}',
    moreSessions: '+{n} Termine',
    seats: '{frei} von {max} frei · ab {min} Personen',
    full: 'voll',
    pricePerPerson: '{preis} € pro Person und Termin',
    priceHint: 'Empfehlung: {groupPriceHint}. Bei Gruppen gibt es keine kostenlose Probestunde. Bezahlt wird nach dem Termin.',
    signupUntil: 'Anmeldung bis {datum}',
    join: 'Mitmachen',
    leave: 'Abmelden',
    leaveLate: 'Die Anmeldung ist schon geschlossen. Sag {tutor} bitte kurz Bescheid.',
    privacy: 'Die anderen in der Gruppe sehen deinen Namen, wenn ihr euch trefft oder im Gruppen-Chat schreibt. In der App sieht man nur, wie viele angemeldet sind.',
    chat: 'Gruppen-Chat starten',
    logSession: 'Termin eintragen',
    held: 'Hat stattgefunden',
    notHeld: 'Ist ausgefallen',
    attendance: 'Wer war da?',
    cancelSession: 'Termin absagen',
    cancelAll: 'Ganze Gruppe absagen',
    cancelAsk: '**Wirklich absagen?** Alle Angemeldeten bekommen Bescheid.',
    minNotReached: 'Noch unter der Mindestzahl. Du entscheidest, ob die Gruppe trotzdem stattfindet.',
    locked: 'Seit sich jemand angemeldet hat, kannst du nur noch Beschreibung, Raum, neue Termine und mehr Plätze ändern.',
    hide: 'Gruppe ausblenden',
    cancelled: 'abgesagt',
    step1: 'Was',
    step2: 'Wann und wo',
    step3: 'Plätze und Preis',
    titlePlaceholder: 'z. B. Klassenarbeit Bruchrechnung',
    addSession: '+ Termin'
  },
  methods: [
    {
      title: 'Erst fragen, dann erklären',
      text: 'Lass dir zeigen, wo es hakt, bevor du loslegst.'
    },
    {
      title: 'Selbst rechnen lassen',
      text: 'Dein Schüler hält den Stift, du gibst Tipps.'
    },
    {
      title: 'Laut denken',
      text: 'Lass erklären, wie gedacht wird. So findest du Denkfehler.'
    },
    {
      title: 'Kleine Schritte',
      text: 'Eine Sache pro Stunde richtig verstehen ist besser als drei halb.'
    },
    {
      title: 'Beispiele aus dem Alltag',
      text: 'Geld, Sport, Handy: Alltag macht Abstraktes greifbar.'
    },
    {
      title: 'Wiederholen mit Abstand',
      text: 'Den Stoff der letzten Stunde kurz wiederholen.'
    },
    {
      title: 'Fehler sind Hinweise',
      text: 'Ein Fehler zeigt, was als Nächstes dran ist.'
    },
    {
      title: 'Zusammenfassen lassen',
      text: 'Am Ende erklärt dein Schüler dir das Thema.'
    },
    {
      title: 'Pausen einplanen',
      text: 'Nach 25 Minuten kurz durchatmen.'
    }
  ],
  guide: {
    criteria: [
      'Kann eine Aufgabe aus dem eigenen Fach verständlich erklären (kurze Probe im Gespräch)',
      'Hat Regeln und Verhaltenskodex verstanden',
      'Ist zuverlässig erreichbar und kennt den Aufwand',
      'Noten werden nicht abgefragt.'
    ],
    steps: [
      {
        text: 'Begrüßen, Ablauf erklären',
        minutes: 1
      },
      {
        text: 'Warum willst du Nachhilfe geben?',
        minutes: 2
      },
      {
        text: 'Erklär-Probe: eine Aufgabe für Klasse 6',
        minutes: 4
      },
      {
        text: 'Regeln durchgehen, Fragen klären',
        minutes: 2
      },
      {
        text: 'Sagen, wann die Entscheidung kommt',
        minutes: 1
      }
    ],
    manyApplicants: 'Bei vielen Bewerbungen: Gruppengespräche mit 4 bis 5 Personen.'
  },
  states: {
    tutoring: {
      open: 'offen · Antwort bis {datum}',
      trial: 'Probe',
      running: 'läuft',
      declined: 'Anfrage abgelehnt',
      expired: 'Keine Antwort, abgelaufen',
      withdrawn: 'zurückgezogen',
      ended: 'beendet'
    },
    lesson: {
      pending: 'wartet auf Bestätigung',
      confirmed: 'bestätigt',
      disputed: 'bestritten',
      void: 'nicht bestätigt'
    },
    application: {
      submitted: 'wartet',
      interview: 'Gespräch vereinbart',
      approved: 'bestätigt',
      rejected: 'abgelehnt',
      appeal: 'Einspruch',
      finalRejected: 'endgültig abgelehnt'
    },
    tutor: {
      active: 'aktiv',
      paused: 'pausiert',
      suspended: 'ausgesetzt',
      banned: 'gesperrt'
    },
    consent: {
      notNeeded: 'nicht nötig',
      missing: 'fehlt',
      ok: 'liegt vor'
    },
    group: {
      open: 'Anmeldung offen',
      closed: 'läuft',
      done: 'vorbei',
      cancelled: 'abgesagt'
    },
    session: {
      held: 'hat stattgefunden',
      cancelled: 'abgesagt'
    },
    attendance: {
      absent: 'nicht da'
    },
    views: {
      learner: 'Nachhilfe bekommen',
      applicant: 'Bewerbung',
      tutor: 'Tutor',
      lead: 'Leitungsteam',
      teacher: 'Lehrkraft'
    }
  },
  notify: {
    title: 'Neues in nachhilfly',
    text: 'Öffne nachhilfly, um es zu sehen.'
  },
  labels: {
    subjects: {
      Ma: 'Mathe',
      De: 'Deutsch',
      En: 'Englisch',
      Fr: 'Französisch',
      La: 'Latein',
      Bio: 'Biologie',
      Ch: 'Chemie',
      Ph: 'Physik',
      NwT: 'NwT',
      Inf: 'Informatik',
      Ge: 'Geschichte',
      Geo: 'Geografie',
      Gk: 'Gemeinschaftskunde',
      Wi: 'Wirtschaft'
    },
    gradeBands: {
      '5-6': 'Klasse 5–6',
      '7-8': 'Klasse 7–8',
      '9-10': 'Klasse 9–10',
      KS: 'Kursstufe'
    },
    concerns: {
      basics: 'Grundlagen',
      exam: 'Klassenarbeit vorbereiten',
      homework: 'Hausaufgaben verstehen',
      learning: 'Lernen lernen'
    },
    places: {
      school: 'in der Schule',
      online: 'online über Teams',
      elsewhere: 'anderer Ort (z. B. zuhause, Bücherei)'
    },
    reportReasons: {
      noShow: 'Nicht erschienen',
      messages: 'Unpassende Nachrichten',
      money: 'Streit ums Geld',
      profile: 'Unpassender Steckbrief',
      app: 'Problem mit der App',
      other: 'Etwas anderes'
    },
    declineReasons: {
      noTime: 'Keine Zeit mehr',
      notFitting: 'Passt fachlich nicht',
      none: 'Ohne Grund'
    }
  }
} as const;

export type Texts = typeof texts;

/** Platzhalter füllen: fmt(texts.ok.request, { name: 'Lena' }). Unbekannte Platzhalter bleiben stehen. */
export function fmt(text: string, vars: Readonly<Record<string, string | number>>): string {
  return text.replace(/\{(\w+)\}/g, (whole: string, key: string) =>
    Object.prototype.hasOwnProperty.call(vars, key) ? String(vars[key]) : whole
  );
}
