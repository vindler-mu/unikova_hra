// Data pro Kolo 1: Identifikace klíčových slov
// Struktura pro různé fakulty

export const round1Data = {
  // Filozofická fakulta - příklad
  ff: {
    scenario: {
      question: "Vliv sociálních médií na politickou polarizaci mladých dospělých v České republice",
      field: "Politologie",
      context: "Píšeš bakalářskou práci a potřebuješ najít relevantní akademickou literaturu."
    },
    wordBank: [
      {
        id: 1,
        text: "sociální média",
        isCorrect: true,
        academicLevel: "high",
        explanation: "Přesný akademický termín pro digitální komunikační platformy."
      },
      {
        id: 2,
        text: "Facebook",
        isCorrect: false,
        academicLevel: "low",
        explanation: "Příliš specifické - lepší použít obecnější termín 'sociální média'."
      },
      {
        id: 3,
        text: "politická polarizace",
        isCorrect: true,
        academicLevel: "high",
        explanation: "Klíčový akademický koncept - přesně popisuje jev, který zkoumáš."
      },
      {
        id: 4,
        text: "mladí dospělí",
        isCorrect: true,
        academicLevel: "medium",
        explanation: "Vhodné vymezení cílové skupiny. Alternativně 'emerging adults'."
      },
      {
        id: 5,
        text: "teenageři",
        isCorrect: false,
        academicLevel: "low",
        explanation: "Nesprávná věková kategorie - tvůj výzkum se zaměřuje na mladé dospělé."
      },
      {
        id: 6,
        text: "Česká republika",
        isCorrect: true,
        academicLevel: "medium",
        explanation: "Geografické vymezení pomůže najít lokálně relevantní studie."
      },
      {
        id: 7,
        text: "internet",
        isCorrect: false,
        academicLevel: "low",
        explanation: "Příliš široký termín - 'sociální média' je přesnější."
      },
      {
        id: 8,
        text: "politika",
        isCorrect: false,
        academicLevel: "low",
        explanation: "Příliš obecné - 'politická polarizace' je specifičtější."
      },
      {
        id: 9,
        text: "digitální komunikace",
        isCorrect: false,
        academicLevel: "medium",
        explanation: "Relevantní, ale 'sociální média' je přesnější pro tvůj výzkum."
      },
      {
        id: 10,
        text: "veřejné mínění",
        isCorrect: false,
        academicLevel: "medium",
        explanation: "Související koncept, ale není klíčový pro tvou výzkumnou otázku."
      },
      {
        id: 11,
        text: "volby",
        isCorrect: false,
        academicLevel: "medium",
        explanation: "Souvisí s politikou, ale není nutné pro obecný výzkum polarizace."
      },
      {
        id: 12,
        text: "dezinformace",
        isCorrect: false,
        academicLevel: "medium",
        explanation: "Zajímavý dílčí aspekt, ale není v hlavní výzkumné otázce."
      }
    ],
    validation: {
      minCorrect: 3,
      maxWords: 5,
      maxIncorrect: 2
    },
    scoring: {
      correctWord: 20,
      incorrectWord: -10,
      academicBonus: 10,
      maxScore: 100
    }
  },

  // Přírodovědecká fakulta - příklad
  prf: {
    scenario: {
      question: "Dopad klimatických změn na biodiverzitu v lesních ekosystémech České republiky",
      field: "Ekologie",
      context: "Připravuješ přehledovou studii pro seminární práci."
    },
    wordBank: [
      {
        id: 1,
        text: "klimatické změny",
        isCorrect: true,
        academicLevel: "high",
        explanation: "Správný akademický termín pro dlouhodobé změny klimatu."
      },
      {
        id: 2,
        text: "globální oteplování",
        isCorrect: false,
        academicLevel: "medium",
        explanation: "Užší než 'klimatické změny' - zahrnuje jen oteplování, ne další změny."
      },
      {
        id: 3,
        text: "biodiverzita",
        isCorrect: true,
        academicLevel: "high",
        explanation: "Klíčový ekologický koncept - přesně vystihuje to, co zkoumáš."
      },
      {
        id: 4,
        text: "lesní ekosystémy",
        isCorrect: true,
        academicLevel: "high",
        explanation: "Specifické prostředí tvého výzkumu - akademicky přesný termín."
      },
      {
        id: 5,
        text: "lesy",
        isCorrect: false,
        academicLevel: "low",
        explanation: "Příliš obecné - 'lesní ekosystémy' je akademičtější."
      },
      {
        id: 6,
        text: "Česká republika",
        isCorrect: true,
        academicLevel: "medium",
        explanation: "Geografické vymezení studie."
      },
      {
        id: 7,
        text: "zvířata",
        isCorrect: false,
        academicLevel: "low",
        explanation: "Příliš obecné - 'biodiverzita' zahrnuje všechny organismy."
      },
      {
        id: 8,
        text: "ekosystémové služby",
        isCorrect: false,
        academicLevel: "high",
        explanation: "Související koncept, ale není v hlavní výzkumné otázce."
      },
      {
        id: 9,
        text: "ochrana přírody",
        isCorrect: false,
        academicLevel: "medium",
        explanation: "Relevantní, ale není klíčový aspekt tvé otázky."
      },
      {
        id: 10,
        text: "počasí",
        isCorrect: false,
        academicLevel: "low",
        explanation: "Krátké meteorologické jevy - ne to samé jako 'klima'."
      },
      {
        id: 11,
        text: "druhy",
        isCorrect: false,
        academicLevel: "medium",
        explanation: "Součást biodiverzity, ale 'biodiverzita' je komplexnější."
      },
      {
        id: 12,
        text: "adaptace",
        isCorrect: false,
        academicLevel: "high",
        explanation: "Zajímavý aspekt, ale není v hlavní výzkumné otázce."
      }
    ],
    validation: {
      minCorrect: 3,
      maxWords: 5,
      maxIncorrect: 2
    },
    scoring: {
      correctWord: 20,
      incorrectWord: -10,
      academicBonus: 10,
      maxScore: 100
    }
  }
};

// Helper funkce pro získání dat podle fakulty
export const getRound1Data = (facultyId) => {
  return round1Data[facultyId] || round1Data.ff; // fallback na FF
};
