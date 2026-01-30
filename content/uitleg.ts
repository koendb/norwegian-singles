// content/uitleg.ts

export const uitlegMeta = {
  title: "Uitleg",
  description:
    "Leer wat Norwegian Singles zijn, hoe je ze uitvoert, en voor wie deze trainingsmethode geschikt is.",
};

export const uitlegHeaderTitle = "Wat zijn Norwegian Singles?";

export const uitlegIntro = `
Norwegian Singles is een trainingsmethode gebaseerd op
frequente, gecontroleerde drempeltraining.
Het doel is maximale adaptatie zonder uitputting.
`;

export const keyPrinciplesTitle = "De drie pijlers";

export const keyPrinciples = [
  {
    icon: "target",
    title: "Submaximale intensiteit",
    description:
      "Je loopt op ongeveer 85% van je maximale inspanning. Hard genoeg om effect te hebben, maar niet zo hard dat je volledig uitgeput raakt.",
  },
  {
    icon: "clock",
    title: "Langere intervallen",
    description:
      "Intervallen van 5-8 minuten in plaats van de traditionele korte sprints. Dit traint je lichaam om lactaat efficiënt te verwerken.",
  },
  {
    icon: "gauge",
    title: "Actief herstel",
    description:
      "Tussen de intervallen jog je rustig door (60-90 seconden). Dit houdt je bloedsomloop actief en versnelt het herstel.",
  },
];

export const voorbeeldSessieTitle = "Voorbeeld sessie";

export const voorbeeldSessieSteps = [
  {
    title: "Warming-up",
    description: "10-15 minuten makkelijk joggen + dynamisch rekken",
    variant: "default",
  },
  {
    title: "Hoofdtraining",
    description: "5× (6 min op tempo + 1 min makkelijk joggen)",
    variant: "primary",
  },
  {
    title: "Cooling-down",
    description: "10-15 minuten uitlopen + stretchen",
    variant: "default",
  },
];

export const voorbeeldSessieStats = [
  { value: "35", label: "min hoofdtraining", tone: "primary" },
  { value: "55-65", label: "min totaal", tone: "default" },
  { value: "30", label: "min op tempo", tone: "default" },
];

export const regelsTitle = "De regels";

export const regels = [
  "Loop de intervallen op een tempo dat je als \"comfortabel hard\" ervaart",
  "Je moet na elke interval nog 1-2 kunnen herhalen",
  "Het herstel is ECHT rustig - langzamer dan je denkt",
  "Gebruik een stopwatch of GPS, geen afstand",
  "Begin met kortere intervallen en bouw op",
  "Doe niet meer dan 1-2 Norwegian Singles per week",
  "Combineer met makkelijke duurlopen op andere dagen",
  "Luister naar je lichaam en pas aan indien nodig",
];

export const voorWieTitle = "Voor wie?";

export const voorWie = `
Geschikt voor lopers met enige basisconditie die
minimaal 3 keer per week trainen.
`;

export const geschiktTitle = "Geschikt voor";

export const geschiktVoor = [
  "Hardlopers met een goede basisconditie (30+ min aan één stuk)",
  "Marathonlopers die hun tempo willen verbeteren",
  "Lopers die blessures willen voorkomen",
  "Atleten die meer volume willen toevoegen",
  "Mensen die van gestructureerde training houden",
];

export const nietGeschiktTitle = "Niet geschikt voor";

export const nietGeschiktVoor = [
  "Complete beginners (bouw eerst basis op)",
  "Lopers met acute blessures",
  "Tijdens een verkoudheid of ziekte",
  "Direct voor of na een wedstrijd",
  "Als vervanging voor ALLE andere training",
];

export const cta = {
  title: "Klaar om te beginnen?",
  description: "Bereken je persoonlijke tempo's op basis van je 5K-tijd.",
  primary: {
    label: "Naar de calculator",
    href: "/calculator",
  },
  secondary: {
    label: "Lees de wetenschap",
    href: "/achtergrond",
  },
};
