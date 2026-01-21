/**
 * Placeholder data for Sections 1-3
 * Describes what each section will contain
 */

export const SECTION_PLACEHOLDER_DATA = [
  // Section 1: Akademické vyhledávání
  {
    taskIndex: 0,
    taskTitle: "Task 1: Akademické vyhledávání",
    taskDescription: "Efektivní vyhledávání v akademických databázích",
    rounds: [
      {
        title: "Výběr klíčových slov",
        description: "Drag & drop relevantních slov z word banku",
      },
      {
        title: "Booleovské operátory",
        description: "Sestavení vyhledávacího dotazu s AND/OR/NOT",
      },
      {
        title: "Výběr databáze",
        description: "Seřazení databází podle vhodnosti",
      },
      {
        title: "Filtrování výsledků",
        description: "Nastavení filtrů (rok, typ, peer-review)",
      },
    ],
  },

  // Section 2: Hodnocení informací
  {
    taskIndex: 1,
    taskTitle: "Task 2: Hodnocení informací",
    taskDescription: "Kritické hodnocení kvality a relevance zdrojů",
    rounds: [
      {
        title: "Posouzení důvěryhodnosti",
        description: "Třídění zdrojů do kategorií důvěryhodné/nedůvěryhodné",
      },
      {
        title: "Hodnocení kvality",
        description: "Hodnocení 6 kritérií pro 3 zdroje (škála 1-5)",
      },
      {
        title: "Posouzení relevance",
        description: "Hodnocení abstraktů podle relevance",
      },
      {
        title: "Detektor fake news",
        description: "Identifikace red flags v článku",
      },
    ],
  },

  // Section 3: Organizace informací
  {
    taskIndex: 2,
    taskTitle: "Task 3: Organizace informací",
    taskDescription: "Správa citací, poznámkování, strukturování",
    rounds: [
      {
        title: "Správa citací",
        description: "Třídění zdrojů do kategorií (knihy, články, weby)",
      },
      {
        title: "Poznámkování",
        description: "3-fázový workflow: zvýraznění, tagging, syntéza",
      },
      {
        title: "Konceptuální mapa",
        description: "Umístění konceptů a vytvoření propojení",
      },
      {
        title: "Strukturování literatury",
        description: "Přiřazení zdrojů do struktury dokumentu",
      },
    ],
  },
];

/**
 * Get placeholder data for specific section
 * @param {number} taskIndex - Task index (0-2)
 * @returns {Object} Section placeholder data
 */
export const getSectionPlaceholderData = (taskIndex) => {
  if (taskIndex < 0 || taskIndex >= SECTION_PLACEHOLDER_DATA.length) {
    console.error(`Invalid taskIndex: ${taskIndex}`);
    return SECTION_PLACEHOLDER_DATA[0]; // Fallback
  }
  return SECTION_PLACEHOLDER_DATA[taskIndex];
};
