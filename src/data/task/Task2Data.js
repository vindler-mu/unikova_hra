// Okruh 2: Hodnocení - data pro úkoly a briefing
export const game2Data = {
  title: "Okruh 2: Hodnocení",
  description: "Kritické myšlení a ověřování informací",
  terminalPrompt: "task2_hodnoceni",

  // Briefing data
  briefing: {
    title: "Okruh 2: Hodnocení",
    subtitle: "Kritické myšlení v digitálním věku",
    importance:
      "V době dezinformací a fake news je schopnost kriticky hodnotit zdroje životně důležitá. Bez této dovednosti se můžete stát obětí manipulace.",
    consequences: [
      "Šíření dezinformací a fake news",
      "Přijímání zaujatých nebo nepravdivých informací",
      "Ztráta akademické kredibility",
      "Rozhodnutí založená na chybných datech",
    ],
    skills: [
      "Ověřování autority a credibility zdrojů",
      "Rozpoznávání bias a manipulace",
      "Analýza kvality obsahů a argumentů",
      "Cross-referencing a faktoring",
    ],
    aiGorThreat:
      "AI.gor bombarduje systém falešnými informacemi! Vaše kritické myšlení je jedinou obranou proti jeho dezinformační kampani.",
    storyReveal: {
      phase: "recognition",
      title: "🤖 POZNÁVÁME ÚTOČNÍKA",
      content:
        'Vzorce útoků AI.gor vypadají povědomě... V archivních záznamech jsme našli zmínky o AI asistentovi knihovny s podobným kódem. Jméno: "IGOR - Intelligent Guidance and Organized Research".',
    },
  },

  // Úkoly pro okruh 2
  subtasks: [
    {
      title: "Hodnocení autority",
      question:
        "Který autor má největší odbornou důvěryhodnost pro téma AI ve zdravotnictví?",
      options: [
        "A) Mgr. T. Horák, učitel dějepisu a blogger",
        "B) Dr. Ana Wu, Ph.D., publikující v Nature Medicine s h-indexem 85",
        "C) J. Novák, influencer se 100k sledujících",
      ],
      correct: 1,
    },
    {
      title: "Obsahová analýza",
      question: "Analyzujte tento text a najděte problematické části.",
      options: [
        "A) Věta obsahuje nerealistické tvrzení o 100% přesnosti",
        "B) Text cituje důvěryhodné zdroje",
        "C) Autor má jasné kvalifikace",
      ],
      correct: 0,
      hint: "AI nikdy nedosahuje 100% přesnosti v reálných aplikacích.",
    },
    {
      title: "Komplexní hodnocení bias",
      question:
        "Analyzujte tento výzkum a identifikujte hlavní problémy metodologie.",
      options: [
        "A) Studie na 50 lidech z jedné nemocnice v Praze tvrdí, že nová AI je lepší než všichni lékaři",
        "B) Randomizovaná kontrolovaná studie na 5000 participantech z 20 zemí s peer review",
        "C) Online průzkum mezi 1000 doktory na Facebooku",
      ],
      hint: "Sledujte velikost vzorku, randomizaci, kontrolní skupinu a reprezentativnost.",
      correct: 1,
    },
  ],

  // Debriefing data
  debriefing: {
    title: "Okruh 2 dokončen!",
    subtitle: "Kritické myšlení aktivováno",
    successMessage:
      "Zastavili jste dezinformační kampaň AI.gor! Systémy nyní dokážou rozpoznat a filtrovat falešné informace.",
    digitObtained: 8,
    nextStep: "Přejděte k okruhu 3: Správa informací",
    storyProgression:
      "Objevili jsme více o původu AI.gor. Původně byl IGOR - pomocník knihovny. Co se pokazilo?",
  },
};
