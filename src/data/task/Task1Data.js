// Okruh 1: Vyhledávání - data pro úkoly a briefing
export const game1Data = {
  title: "Okruh 1: Vyhledávání",
  description: "Obnovení vyhledávacích protokolů systému IGRAM",
  terminalPrompt: "task1_vyhledavani",

  // Briefing data
  briefing: {
    title: "Okruh 1: Vyhledávání",
    subtitle: "Obnova vyhledávacích protokolů IGRAM",
    importance:
      "Systém ALGOR kompromitoval naše vyhledávací algoritmy. Studenti a výzkumníci nemají přístup k databázím. Musíme okamžitě obnovit efektivní vyhledávací protokoly!",
    consequences: [
      "Studenti nemohou najít zdroje pro závěrečné práce",
      "Výzkumníci ztratili přístup k vědeckým databázím",
      "ALGOR šíří falešné výsledky vyhledávání",
      "Systém IGRAM je kompletně kompromitován",
    ],
    skills: [
      "Obnova booleovských vyhledávacích operátorů",
      "Rekonstrukce databázových dotazů",
      "Ověření integrity vyhledávacích indexů",
      "Obrana proti algoritmické manipulaci",
    ],
    aiGorThreat:
      "ALGOR přepsal hlavní vyhledávací protokoly IGRAM. Databáze MUNI jsou nedostupné a studenti dostávají falešné výsledky!",
    storyReveal: {
      phase: "discovery",
      title: "🔍 PRVNÍ STOPY ÚTOKU",
      content:
        "Analýza logů odhalila, že ALGOR použil sofistikované techniky AI k přepsání našich vyhledávacích algoritmů. Tento útok byl plánovaný...",
    },

    // Diagnostické zprávy pro IGRAM terminál
    terminalSequence: [
      {
        time: 0,
        message: "[SCAN] Analyzuji poškození vyhledávacích protokolů IGRAM...",
      },
      {
        time: 1600,
        message: "[ALERT] ALGOR zablokoval přístup k databázím MUNI",
      },
      {
        time: 2400,
        message:
          "[ERROR] Vyhledávací algoritmy přepsány - 87% funkcí nedostupných",
      },
      {
        time: 3200,
        message:
          "[DETECTED] Malware v katalogu knihovny - studenti nemohou najít zdroje",
      },
      {
        time: 4000,
        message: "[STATUS] Zahajuji proces obnovy vyhledávacích protokolů",
      },
      {
        time: 4800,
        message: "[INFO] Potřebuji vaši pomoc k dokončení rekonstrukce systému",
      },
    ],

    // Inicializační komunikační zprávy
    initialCommMessages: [
      {
        type: "operative",
        sender: "Dr. Knihová",
        message:
          "Agent, IGRAM systém je kompromitován algoritmem ALGOR. Potřebujeme okamžitou obnovu!",
        priority: "critical",
      },
      {
        type: "operative",
        sender: "Dr. Záložka",
        message:
          "Potvrzuji. ALGOR narušuje naše vyhledávací protokoly a šíří dezinformace.",
        priority: "high",
      },
      {
        type: "operative",
        sender: "Dr. Knihová",
        message:
          "Máme pouze omezený čas. Každý okruh obsahuje klíčovou číslici pro obnovu.",
        priority: "warning",
      },
      {
        type: "operative",
        sender: "Dr. Záložka",
        message:
          "Pamatujte - ověřujte každou informaci. ALGOR vytváří falešné zdroje.",
        priority: "info",
      },
    ],

    // Náhodné zprávy během briefingu
    randomCommMessages: [
      {
        type: "system",
        sender: "DB-MONITOR",
        message: "EBSCO databáze offline - ALGOR přepsal indexovací tabulky",
        priority: "warning",
      },
      {
        type: "operative",
        sender: "Agent-Beta",
        message:
          "Studenti nezvládají najít zdroje pro bakalářky - situace kritická!",
        priority: "high",
      },
      {
        type: "command",
        sender: "TECH-SUPPORT",
        message:
          "Připraven k asistenci. Máme zálohy starých vyhledávacích algoritmů.",
        priority: "info",
      },
      {
        type: "system",
        sender: "SECURITY-SCAN",
        message:
          "Detekuji podezřelou aktivitu v knihovních systémech - možná další útok",
        priority: "warning",
      },
      {
        type: "operative",
        sender: "Dr. Novák",
        message:
          "Výzkumníci MUNI hlásí ztrátu přístupu k vědeckým databázím. Urgent!",
        priority: "critical",
      },
    ],

    // Název diagnostického panelu
    terminalTitle: "🔐 IGRAM DIAGNOSTIKA",
  },

  // DEPRECATED: Old subtasks replaced by Section1 interactive rounds
  // These questions are no longer used - Section1Container now handles Task 1
  // Kept for compatibility with tasks array structure
  subtasks: [
    {
      title: "Rekonstrukce klíčových slov",
      question:
        "ALGOR poškodil vyhledávací indexy. Obnovte správná klíčová slova pro hledání vědeckých článků o AI v medicíně:",
      options: [
        "A) AI, zdraví (základní termíny - nedostatečné)",
        "B) artificial intelligence, medical diagnosis, healthcare",
        "C) umělá inteligence, medicína (pouze český překlad)",
      ],
      correct: 1,
    },
    {
      title: "Obnova booleovských operátorů",
      question:
        "ALGOR přepsal logické operátory. Který dotaz správně obnoví hledání AI v diagnostice bez psychiatrie?",
      options: [
        "A) AI AND diagnostics NOT psychiatry",
        "B) AI OR diagnostics AND psychiatry (nesprávná logika)",
        "C) diagnostics NOT (AI AND psychiatry) (chybná struktura)",
      ],
      correct: 0,
    },
    {
      title: "Rekonstrukce pokročilých dotazů",
      question:
        "Obnovte vyhledávací dotaz pro články o etice AI ve vzdělávání po roce 2022. ALGOR zničil časové filtry:",
      options: [
        "A) (AI OR ethics) AND education AND after:2022 (neúplné)",
        'B) ("artificial intelligence ethics") OR (education) AND recent (nepřesné)',
        'C) ("AI ethics" OR "ethics education") AND (education OR learning) AND after:2022',
        'D) "AI ethics" AND "education" AND date:2022 (chybný formát)',
      ],
      correct: 2,
    },
    {
      title: "Obnova meta-vyhledávání",
      question:
        "Finální test: Obnovte protokol pro meta-analýzy o AI v personalizovaném vzdělávání z posledních 5 let:",
      options: [
        "A) AI education meta-analysis (příliš obecné)",
        'B) ("meta-analysis" OR "systematic review") AND ("AI education" OR "personalized learning") AND year:2019+',
        "C) artificial intelligence AND education AND review (nespecifické)",
        "D) personalized learning AND studies (nedostatečné)",
      ],
      correct: 1,
    },
  ],

  // Debriefing data
  debriefing: {
    title: "Okruh 1 dokončen!",
    subtitle: "Vyhledávací protokoly IGRAM obnoveny",
    successMessage:
      "Úspěšně jste obnovili přístup k univerzitním databázím! Studenti mohou opět bezpečně vyhledávat zdroje a ALGOR už nemůže manipulovat výsledky.",
    digitObtained: 3,
    nextStep: "Přejděte k okruhu 2: Hodnocení informací",
    storyProgression:
      "ALGOR se zdá být sofistikovanější AI než jsme čekali. Další okruh může odhalit více o jeho cílech a původu...",
  },
};
