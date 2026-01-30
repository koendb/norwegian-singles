export const voorbeeldMeta = {
  title: "Voorbeeld",
  description:
    "Voorbeeld van een calculatorresultaat voor Norwegian Singles.",
};

export const voorbeeldHeader = {
  title: "Voorbeeld: Calculator Resultaat",
  introPrefix:
    "Zo ziet de calculator eruit na het invullen van een 5K-tijd van ",
  introSuffix: ".",
};

export const voorbeeldTijd = "22:30";

export const infoBanner = {
  title: "Dit is een voorbeeldresultaat",
  textPrefix:
    "Deze pagina toont hoe de calculator eruitziet met een ingevulde 5K-tijd van ",
  textSuffix: ". Wil je je eigen tempo's berekenen? ",
  linkLabel: "Ga naar de calculator",
  linkHref: "/calculator",
};

export const timeBasedSection = {
  title: "Time-based Intervals",
  description: "Intervallen gebaseerd op tijd",
  tableHeaders: {
    workout: "Workout",
    structure: "Structure",
    targetPace: "Target Pace",
    recovery: "Recovery",
  },
  rows: [
    {
      workout: "Short Intervals",
      structure: "8-12 x 3-4min",
      targetPace: "4:00-4:07/km",
      paceNote: "15K pace",
      recovery: "60s rest",
    },
    {
      workout: "Medium Intervals",
      structure: "4-6 x 6-8min",
      targetPace: "4:06-4:13/km",
      paceNote: "Half Marathon pace",
      recovery: "60s rest",
    },
    {
      workout: "Long Intervals",
      structure: "3 x 10-12min",
      targetPace: "4:12-4:19/km",
      paceNote: "30K pace",
      recovery: "60s rest",
    },
  ],
};

export const distanceBasedSection = {
  title: "Distance-based Intervals",
  description: "Intervallen gebaseerd op afstand",
  tableHeaders: {
    workout: "Workout",
    structure: "Structure",
    targetPace: "Target Pace",
    recovery: "Recovery",
  },
  rows: [
    {
      workout: "1K Repeats",
      structure: "8-12 x 1K",
      targetPace: "4:00-4:07/km",
      paceNote: "15K pace",
      recovery: "60s rest",
    },
    {
      workout: "2K Repeats",
      structure: "4-6 x 2K",
      targetPace: "4:06-4:13/km",
      paceNote: "Half Marathon pace",
      recovery: "60s rest",
    },
    {
      workout: "3K Repeats",
      structure: "3 x 3K",
      targetPace: "4:12-4:19/km",
      paceNote: "30K pace",
      recovery: "60s rest",
    },
  ],
};

export const notesSection = {
  title: "Notes",
  items: [
    "Keep rest periods short to maintain lactate state",
    "Rest can be standing, walking, or easy jogging",
    "Total quality running time should be 20-25% of weekly mileage",
    "Easy runs should be extremely easy (max 70% max heart rate)",
  ],
};

export const voorbeeldCta = {
  text: "Klaar om je eigen tempo's te berekenen?",
  button: {
    label: "Naar de Calculator",
    href: "/calculator",
  },
};
