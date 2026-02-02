export const calculatorHeader = {
  title: "Norwegian Singles Calculator",
  description:
    "Voer je 5K-tijd in en ontvang je persoonlijke tempo's voor effectieve Norwegian Singles trainingen.",
};


export type PaceTarget =
  | { type: "range"; minKm: number; maxKm: number }
  | { type: "single"; km: number };

type IntervalRow = {
  workout: string;
  structure: string;
  targetPace: string;
  paceTarget?: PaceTarget;
  paceNote: string;
  recovery: string;
};

export const timeBasedSection: {
  title: string;
  description: string;
  tableHeaders: {
    workout: string;
    structure: string;
    targetPace: string;
    recovery: string;
  };
  rows: IntervalRow[];
} = {
  title: "Tijd-intervallen",
  description: "Intervallen gebaseerd op tijd",
  tableHeaders: {
    workout: "Workout",
    structure: "Intervallen",
    targetPace: "Pace",
    recovery: "Herstel",
  },
  rows: [
    {
      workout: "Korte intervallen",
      structure: "8-12 x 3-4min",
      targetPace: "4:00-4:07/km",
      paceTarget: { type: "single", km: 15 },
      paceNote: "15K pace",
      recovery: "60s",
    },
    {
      workout: "Medium intervallen",
      structure: "4-6 x 6-8min",
      targetPace: "4:06-4:13/km",
      paceTarget: { type: "single", km: 21.0975 },
      paceNote: "HM pace",
      recovery: "60s",
    },
    {
      workout: "Lange intervallen",
      structure: "3-4 x 10-12min",
      targetPace: "4:12-4:19/km",
      paceTarget: { type: "single", km: 30 },
      paceNote: "30K pace",
      recovery: "60s",
    },
  ],
};

export const distanceBasedSection: {
  title: string;
  description: string;
  tableHeaders: {
    workout: string;
    structure: string;
    targetPace: string;
    recovery: string;
  };
  rows: IntervalRow[];
} = {
  title: "Afstand-intervallen",
  description: "Intervallen gebaseerd op afstand",
  tableHeaders: {
    workout: "Oefening",
    structure: "Intervallen",
    targetPace: "Pace",
    recovery: "Herstel",
  },
  rows: [
    {
      workout: "1K intervallen",
      structure: "8-12 x 1K",
      targetPace: "4:00-4:07/km",
      paceTarget: { type: "single", km: 15 },
      paceNote: "15K pace",
      recovery: "60s",
    },
    {
      workout: "2K intervallen",
      structure: "4-6 x 2K",
      targetPace: "4:06-4:13/km",
      paceTarget: { type: "single", km: 21.0975 },
      paceNote: "HM pace",
      recovery: "60s",
    },
    {
      workout: "3K intervallen",
      structure: "3-4 x 3K",
      targetPace: "4:12-4:19/km",
      paceTarget: { type: "single", km: 30 },
      paceNote: "30K pace",
      recovery: "60s",
    },
  ],
};

export const notesSection = {
  title: "Kernprincipes van Norwegian Singles",
  items: [
    "Je verbetert door consistentie, niet door af te zien.",
    "Je moet de training 48u later kunnen herhalen",
    "Herstel trainingen moeten extreem langzaam voelen",
    "Je moet altijd fris starten, zo niet; doe rustig aan",

  ],
};

