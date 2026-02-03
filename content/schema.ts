export const schemaMeta = {
  title: "Schema",
  description:
    "Een helder weekschema om Norwegian Singles praktisch in te passen: subdrempel, lange duurloop en veel rustige kilometers.",
};

export const schemaHeader = {
  title: "Norwegian Singles schema",
  description: "Hoe stel je jouw Norwegian Singles trainingsschema op?",
  intro:
    "Je wisselt om de dag tussen een subthreshold-training en een herstelloop. Eén keer per week verleng je een herstelloop tot een long run. Naarmate je vooruitgang boekt, pas je zowel de duur als de snelheid van de trainingen aan. De weekindeling blijft daarbij gelijk. De kracht van de methode zit in het maanden- tot jarenlang consistent hetzelfde schema kunnen uitvoeren. ",
};

export const buildSchema = {
  title: "Jouw schema opbouwen",
  firstParagraph: {
    beforeStrong:
      "Afhankelijk van je huidige niveau besteed je ongeveer 20–25% (maximaal 30%) van je totale trainings",
    strong: "tijd",
    afterStrong:
      " aan subthreshold-training. ",
  },
  secondParagraph:
    "Loop je bijvoorbeeld 65 km in 6 uur per week, dan komt dit neer op 72 tot 90 minuten subthreshold per week. Verdeeld over drie sessies betekent dat ongeveer 25–30 minuten per training. Je kunt deze subthreshold-sessies dan invullen met wekelijks één keer 10 × 3 minuten, één keer 5 × 6 minuten en één keer 3 × 10 minuten. ",
};

export const weeklySchedule = {
  title: "Weekschema suggestie",
  days: [
    { day: "Ma", workout: "Herstelloop", type: "easy" },
    { day: "Di", workout: "Subthreshold", type: "quality" },
    { day: "Wo", workout: "Herstelloop", type: "easy" },
    { day: "Do", workout: "Subthreshold", type: "quality" },
    { day: "Vr", workout: "Herstelloop", type: "easy" },
    { day: "Za", workout: "Subthreshold", type: "quality" },
    { day: "Zo", workout: "Duurloop", type: "long" },
  ],
};

export const voorbeeldSessieTitle = "Voorbeeld sessie";

export const voorbeeldSessieSteps = [
  {
    title: "Warming-up",
    description: "10 minuten",
    variant: "default",
  },
  {
    title: "Hoofdtraining",
    description: "5× (6 min op tempo + 1 min makkelijk joggen)",
    variant: "primary",
  },
  {
    title: "Cooling-down",
    description: "10 minuten uitlopen",
    variant: "default",
  },
];

export const voorbeeldSessieStats = [
  { value: "35m", label: "subthreshold", tone: "primary" },
  { value: "55m", label: "totaal", tone: "default" },
];

export const paceGuidance = {
  title: "Pace Norwegian Singles",
  intro:
    "Het doel van deze trainingsmethode is om gedurende langere tijd consistent te kunnen trainen. Het belangrijkste binnen het schema is dan ook dat je niet teveel en niet te hard traint.",
  linkParagraph: {
    beforeLink: "Je pace voor de subthreshold intervallen kun je ",
    linkText: "hier berekenen",
    afterLink:
      ". Dit tempo is een benadering. Met dit tempo streef je naar een lactaatwaarde net onder je lactaatdrempel; de gevoelde inspanning (RPE) ligt rond de 6 op een schaal van 1 tot 10 en je kan bij deze inspanning nog in volledige zinnen spreken. Voelt het te zwaar, schakel dan iets terug. Tussen de intervallen kun je stilstaan, wandelen of zeer rustig joggen.",
  },
  recoveryParagraph:
    "Je herstelloopjes zijn veel langzamer dan je normale tempo. Richt je op ongeveer 65% van je VO2-max, maar voel vooral: dit mag geen moeite kosten. Zo blijf je fris genoeg om de volgende dag weer kwaliteit te leveren.",
};

export const beginnersGuidance = {
  title: "Starters en beginners",
  paragraphs: [
    "Het Norwegian Singles schema is bedoelt voor ervaren hardlopers, die minimaal zo'n 50km per week trainen en hierin al kwaliteitstrainingen hebben opgenomen. Loop je minder, dan is het meestal niet verstandig om direct drie subthreshold-trainingen per week te doen. Het lichaam heeft eerst tijd nodig om te wennen aan de trainingsbelasting. Start daarom met één, eventueel twee subthreshold-sessies per week en vul de rest van de trainingen aan met rustige herstelloopjes.",
    "Voor beginnende hardlopers is subthreshold-training niet nodig. In deze fase ligt de focus beter op het opbouwen van loopvolume en algemene belastbaarheid. Pas wanneer je structureel meerdere keren per week kunt lopen zonder klachten, heeft het toevoegen van gerichte subthreshold-intervallen zin.",
  ],
};
