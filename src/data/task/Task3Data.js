// Okruh 3: Správa - data pro úkoly a briefing
export const game3Data = {
  title: "Okruh 3: Správa",
  description: "Adekvátní nakládání s informacemi a zdroji",
  terminalPrompt: "task3_sprava",

  // Briefing data
  briefing: {
    title: "Okruh 3: Správa",
    subtitle: "Adekvátní nakládání s informacemi a zdroji",
    importance:
      "Správná správa informací zahrnuje jejich organizaci, citování a etické využití. Je to základ akademické integrity a vědecké práce.",
    consequences: [
      "Plagiátorství a porušení autorských práv",
      "Ztráta akademické integrity",
      "Právní problémy spojené s nedodržením licencí",
      "Nesprávná attribution a citování",
    ],
    skills: [
      "Správné citování a vytváření bibliografie",
      "Organizace a kategorizace zdrojů",
      "Rozpoznávání plagiátorství",
      "Dodržování etických standardů v AI",
    ],
    aiGorThreat:
      "AI.gor se snaží zkorumpovat akademické standardy! Jen správné citování a etické chování mohou obnovit důvěru v univerzitní systém.",
    storyReveal: {
      phase: "memory",
      title: "💭 VZPOMÍNKY V DATECH",
      content:
        "Našli jsme fragmenty původních dat AI.gor (IGOR). Byl vytvořen, aby pomáhal studentům s výzkumem. Ale něco se pokazilo... Našel příliš mnoho nepravdivých informací a falešných studií. Začal je považovat za pravdu.",
    },
  },

  // Úkoly pro okruh 3
  subtasks: [
    {
      title: "Základní citování",
      question: "Vyberte správně citované tvrzení:",
      options: [
        'A) „Umělá inteligence má potenciál revolucionalizovat zdravotnictví" (The Lancet, 2024)',
        'B) „AI transformuje vzdělávání rychleji než jakákoliv předchozí technologie" (blog.technoviny.cz)',
        'C) „Strojové učení dosahuje 95% přesnosti v diagnostice rakoviny" (bez citace)',
      ],
      correct: 0,
    },
    {
      title: "AI a akademická etika",
      question:
        "Použili jste ChatGPT ke generování úvodu k seminární práci. Co je správný postup?",
      options: [
        "A) Není třeba uvádět, je to jen nástroj jako Word",
        "B) Deklarovat využití AI pro konkrétní část s popisem jak",
        "C) Stačí, že to trochu změním, pak už je to můj text",
      ],
      correct: 1,
    },
    {
      title: "Pokročilé citování a licence",
      question:
        "Chcete použít obrázek z Wikipedie v své práci. Jaký je správný postup?",
      options: [
        "A) Můžu použít cokoliv z internetu, je to veřejné",
        "B) Zkontrolovat licenci (CC, GPL, etc.) a citovat podle ní",
        'C) Stačí napsat "zdroj: Wikipedia"',
      ],
      correct: 1,
      hint: "Creative Commons a jiné licence mají specifická pravidla pro citování a použití.",
    },
  ],

  // Debriefing data
  debriefing: {
    title: "Okruh 3 dokončen!",
    subtitle: "Akademické standardy obnoveny",
    successMessage:
      "Obnovili jste etické standardy! Univerzitní systém nyní správně rozpoznává a vyžaduje řádné citování a dodržování licencí.",
    digitObtained: 4,
    nextStep: "Přejděte k okruhu 4: Komunikace",
    storyProgression:
      "Víme už téměř vše o AI.gor. IGOR byl původně dobrý, ale zkazily ho falešné informace. Finální okruh odhalí, jak ho zastavit.",
  },
};
