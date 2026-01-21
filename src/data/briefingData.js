/**
 * Briefing data for all 4 tasks
 * Structure for BriefingScreen component
 */

export const BRIEFINGS = [
  // TASK 1: Akademické vyhledávání
  {
    title: "Okruh 1: Akademické vyhledávání",
    initialCommMessages: [
      {
        sender: "Dr. Záložka",
        message:
          "Vítejte v prvním modulu obnovy. AI.gor znehodnotil systém vyhledávání v databázích. Musíte prokázat, že umíte efektivně vyhledávat akademické zdroje.",
        timestamp: "00:01",
      },
      {
        sender: "Systém",
        message:
          "Čeká vás 4 kola: výběr klíčových slov, booleovské operátory, výběr databází a filtrování výsledků.",
        timestamp: "00:02",
      },
      {
        sender: "Dr. Záložka",
        message: "Hodně štěstí! Každé správné rozhodnutí posiluje databázi.",
        timestamp: "00:03",
      },
    ],
    skills: [
      "Identifikace relevantních klíčových slov",
      "Použití booleovských operátorů (AND, OR, NOT)",
      "Výběr vhodných akademických databází",
      "Nastavení filtrů pro kvalitní výsledky",
    ],
    consequences: [
      "Obnovíte vyhledávací modul systému IGRAM",
      "Získáte první číslici master kódu",
      "Odemknete přístup k dalšímu modulu",
    ],
  },

  // TASK 2: Hodnocení informací
  {
    title: "Okruh 2: Hodnocení informací",
    initialCommMessages: [
      {
        sender: "Dr. Knihová",
        message:
          "Modul kritického hodnocení byl kompromitován. AI.gor šíří dezinformace a falešné zdroje. Musíte prokázat schopnost rozlišit kvalitní zdroje.",
        timestamp: "00:01",
      },
      {
        sender: "Systém",
        message:
          "4 kola: posouzení důvěryhodnosti, hodnocení kvality, posouzení relevance a detekce fake news.",
        timestamp: "00:02",
      },
      {
        sender: "Dr. Knihová",
        message: "Buďte kritičtí. Každý správný úsudek zvyšuje integritu databáze.",
        timestamp: "00:03",
      },
    ],
    skills: [
      "Rozpoznání důvěryhodných vs. nedůvěryhodných zdrojů",
      "Hodnocení kvality podle 6 kritérií",
      "Posouzení relevance abstraktů",
      "Identifikace red flags v článcích",
    ],
    consequences: [
      "Obnovíte hodnotící modul systému IGRAM",
      "Získáte druhou číslici master kódu",
      "Posílíte obranu proti dezinformacím",
    ],
  },

  // TASK 3: Organizace informací
  {
    title: "Okruh 3: Organizace informací",
    initialCommMessages: [
      {
        sender: "Pavel Novák",
        message:
          "Organizační struktura univerzitní knihovny je v chaosu. AI.gor promíchal citace, poznámky a koncepty. Musíte vše znovu uspořádat.",
        timestamp: "00:01",
      },
      {
        sender: "Systém",
        message:
          "4 kola: správa citací, poznámkování, konceptuální mapování a strukturování literatury.",
        timestamp: "00:02",
      },
      {
        sender: "Pavel Novák",
        message: "Organizace je klíč k úspěchu. Bez ní je i nejlepší výzkum marný.",
        timestamp: "00:03",
      },
    ],
    skills: [
      "Správné zařazení citací do kategorií",
      "Anotace a tagging odborných textů",
      "Vytvoření konceptuální mapy výzkumu",
      "Strukturování literatury do kapitol",
    ],
    consequences: [
      "Obnovíte organizační modul systému IGRAM",
      "Získáte třetí číslici master kódu",
      "Zpřístupníte finální obranný modul",
    ],
  },

  // TASK 4: Komunikace výsledků
  {
    title: "Okruh 4: Komunikace výsledků",
    initialCommMessages: [
      {
        sender: "Dr. Záložka",
        message:
          "Finální modul! AI.gor zablokoval komunikační kanály univerzity. Musíte prokázat dovednost prezentovat a sdílet výzkumné výsledky.",
        timestamp: "00:01",
      },
      {
        sender: "Systém",
        message:
          "4 kola: psaní abstraktu, vizualizace dat, peer review a publikační strategie.",
        timestamp: "00:02",
      },
      {
        sender: "Dr. Záložka",
        message: "Toto je poslední překážka. Po dokončení získáte finální číslici kódu!",
        timestamp: "00:03",
      },
    ],
    skills: [
      "Strukturované psaní akademického abstraktu",
      "Výběr správné vizualizace pro různá data",
      "Kritické hodnocení vědecké práce",
      "Volba vhodného publikačního kanálu",
    ],
    consequences: [
      "Obnovíte komunikační modul systému IGRAM",
      "Získáte čtvrtou a poslední číslici master kódu",
      "Budete připraveni zadat finální kód a zachránit univerzitu!",
    ],
  },
];

/**
 * Get briefing data for specific task
 * @param {number} taskIndex - Task index (0-3)
 * @returns {Object} Briefing data
 */
export const getBriefingData = (taskIndex) => {
  if (taskIndex < 0 || taskIndex >= BRIEFINGS.length) {
    console.error(`Invalid taskIndex: ${taskIndex}`);
    return BRIEFINGS[0]; // Fallback to Task 1
  }
  return BRIEFINGS[taskIndex];
};

/**
 * Get all briefings
 * @returns {Array} All briefing data
 */
export const getAllBriefings = () => {
  return BRIEFINGS;
};
