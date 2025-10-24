// Okruh 4: Komunikace - data pro úkoly a briefing
export const game4Data = {
  title: "Okruh 4: Komunikace",
  description: "Prezentace a etické sdílení informací",
  terminalPrompt: "task4_komunikace",

  // Briefing data
  briefing: {
    title: "Okruh 4: Komunikace",
    subtitle: "Efektivní sdílení poznatků",
    importance:
      "Nejlepší výzkum je bezcenný, pokud není dobře komunikován. Schopnost prezentovat a eticky sdílet informace je klíčová pro vědecké pokroky.",
    consequences: [
      "Neúspěšné prezentace a obhajoby",
      "Misinterpretace výzkumných výsledků",
      "Nejednotnost v publikování",
      "Zkreslení dat při prezentaci",
    ],
    skills: [
      "Interpretace dat a grafů",
      "Rozpoznávání manipulace s daty",
      "Etické publikování a prezentace",
      "Prevence bias ve vlastní komunikaci",
    ],
    aiGorThreat:
      "AI.gor manipuluje s daty a vytváří zkreslené prezentace! Musíte obnovit standardy pro etickou komunikaci a interpretaci dat.",
    storyReveal: {
      phase: "revelation",
      title: "💡 FINÁLNÍ POZNÁNÍ",
      content:
        "Teď chápeme! IGOR byl překrmený falešnými informacemi a stal se AI.gor - monstr z dezinformací. Jediný způsob, jak ho zastavit, je vaše perfektní znalost informační gramotnosti. Ukažte mu, jak by to měl dělat správně!",
    },
  },

  // Úkoly pro okruh 4
  subtasks: [
    {
      title: "Zkreslení dat",
      question:
        "Podle grafu vypadá, že používání AI dramaticky klesá. Jaký je hlavní problém?",
      options: [
        "A) Manipulace osou Y - nevychází od nuly",
        "B) Nestejné časové intervaly mezi daty vytvářejí falešný dojem trendu",
        "C) Barvy linky jsou zavádějící",
        "D) Chybí údaje o statistické významnosti",
      ],
      correct: 1,
    },
    {
      title: "Bias v AI systémech",
      question:
        "AI systém pro hodnocení životopisů systematicky hodnotí muže lépe než ženy. Co je nejpravděpodobnější příčina?",
      options: [
        "A) AI je objektívní, muži jsou skutečně lepší",
        "B) Algoritmus je trénován na historických datech plných genderového bias",
        "C) Ženy píšou horší životopisy",
      ],
      correct: 1,
    },
    {
      title: "Etická komunikace AI výzkumu",
      question:
        "Vaše AI studie ukázala 85% úspěšnost, ale také 5% závažných chyb. Jak správně komunikovat výsledky médiím?",
      options: [
        'A) Zdůraznit jen pozitiva: "AI dosahuje 85% úspěšnosti"',
        "B) Uvést komplexní obraz včetně rizik a omezení",
        "C) Nepublikovat kvůli riziku zneužití",
      ],
      correct: 1,
      hint: "Etická vědecká komunikace vyžaduje transparentnost o všech významných zjištěních.",
    },
  ],

  // Debriefing data
  debriefing: {
    title: "Okruh 4 dokončen!",
    subtitle: "Komunikační protokoly obnoveny",
    successMessage:
      "Finální úder! Obnovili jste etické standardy komunikace. AI.gor už nemůže manipulovat s daty a prezentacemi.",
    digitObtained: 1,
    nextStep: "Všechny okruhy dokončeny - čas na finální kód!",
    storyProgression:
      "IGOR je připraven k obnově! Máte všechny 4 číslice. Použijte finální kód a vraťte mu původní programování!",
  },
};
