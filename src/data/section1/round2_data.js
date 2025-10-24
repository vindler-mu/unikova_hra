/**
 * Round 2: Boolean Operators - Query Builder
 *
 * Students build search queries using boolean operators (AND, OR, NOT)
 * to refine their research based on keywords from Round 1
 */

const round2DataByFaculty = {
  ff: {
    scenario: {
      title: "Konstrukce vyhledávacího dotazu",
      instruction:
        "Pomocí booleovských operátorů sestavte přesný vyhledávací dotaz pro výzkum vlivu sociálních médií na politiku.",
      context:
        "Máte k dispozici klíčová slova z předchozího kola. Nyní je musíte zkombinovat pomocí operátorů AND, OR a NOT, abyste získali relevantní výsledky.",
      goal: "Vytvořte dotaz, který najde články o polarizaci na sociálních médiích, ale vyloučí příspěvky o televizní politice.",
    },
    availableTerms: [
      { id: 1, text: "sociální média", category: "main" },
      { id: 2, text: "politická polarizace", category: "main" },
      { id: 3, text: "dezinformace", category: "main" },
      { id: 4, text: "Facebook", category: "specific" },
      { id: 5, text: "Twitter", category: "specific" },
      { id: 6, text: "televize", category: "exclude" },
      { id: 7, text: "volby", category: "context" },
      { id: 8, text: "echo chambers", category: "concept" },
    ],
    operators: [
      { id: "AND", label: "AND", description: "Oba výrazy musí být přítomny" },
      { id: "OR", label: "OR", description: "Alespoň jeden výraz" },
      { id: "NOT", label: "NOT", description: "Vyloučit výraz" },
    ],
    correctQuery: {
      // Reprezentace správného dotazu jako strom
      type: "AND",
      children: [
        {
          type: "OR",
          children: [
            { type: "term", value: "sociální média" },
            { type: "term", value: "Facebook" },
            { type: "term", value: "Twitter" },
          ],
        },
        { type: "term", value: "politická polarizace" },
        { type: "NOT", children: [{ type: "term", value: "televize" }] },
      ],
    },
    alternativeCorrectQueries: [
      // Jiné přijatelné varianty
      {
        type: "AND",
        children: [
          { type: "term", value: "sociální média" },
          { type: "term", value: "politická polarizace" },
          { type: "NOT", children: [{ type: "term", value: "televize" }] },
        ],
      },
    ],
    validation: {
      requiredTerms: ["sociální média", "politická polarizace"],
      forbiddenTerms: ["televize"],
      minComplexity: 2, // Minimální počet operátorů
      feedback: {
        missingRequired: "Dotaz musí obsahovat klíčové pojmy o sociálních médiích a polarizaci.",
        notExcludingForbidden: "Nezapomeňte vyloučit televizi pomocí operátoru NOT.",
        tooSimple: "Dotaz je příliš jednoduchý. Použijte více operátorů pro přesnější vyhledávání.",
        excellent: "Výborně! Váš dotaz přesně cílí na sociální média a polarizaci, zatímco vylučuje televizi.",
      },
    },
    scoring: {
      correctStructure: 40,
      includesAllRequired: 30,
      excludesForbidden: 20,
      useComplexity: 10,
      maxScore: 100,
    },
  },

  prf: {
    scenario: {
      title: "Konstrukce vyhledávacího dotazu",
      instruction:
        "Vytvořte přesný vyhledávací dotaz pro výzkum klimatické změny a biodiverzity.",
      context:
        "Použijte booleovské operátory k sestavení dotazu, který kombinuje ekologické a klimatologické pojmy.",
      goal: "Vytvořte dotaz, který najde studie o dopadech klimatické změny na biodiverzitu, ale vyloučí články pouze o meteorologii.",
    },
    availableTerms: [
      { id: 1, text: "klimatická změna", category: "main" },
      { id: 2, text: "biodiverzita", category: "main" },
      { id: 3, text: "ekosystém", category: "main" },
      { id: 4, text: "vymírání druhů", category: "specific" },
      { id: 5, text: "ochrana přírody", category: "context" },
      { id: 6, text: "meteorologie", category: "exclude" },
      { id: 7, text: "globální oteplování", category: "specific" },
      { id: 8, text: "adaptace", category: "concept" },
    ],
    operators: [
      { id: "AND", label: "AND", description: "Oba výrazy musí být přítomny" },
      { id: "OR", label: "OR", description: "Alespoň jeden výraz" },
      { id: "NOT", label: "NOT", description: "Vyloučit výraz" },
    ],
    correctQuery: {
      type: "AND",
      children: [
        {
          type: "OR",
          children: [
            { type: "term", value: "klimatická změna" },
            { type: "term", value: "globální oteplování" },
          ],
        },
        { type: "term", value: "biodiverzita" },
        { type: "NOT", children: [{ type: "term", value: "meteorologie" }] },
      ],
    },
    validation: {
      requiredTerms: ["klimatická změna", "biodiverzita"],
      forbiddenTerms: ["meteorologie"],
      minComplexity: 2,
      feedback: {
        missingRequired: "Dotaz musí obsahovat 'klimatická změna' a 'biodiverzita'.",
        notExcludingForbidden: "Vyloučte čistě meteorologické studie pomocí NOT.",
        tooSimple: "Použijte více operátorů pro přesnější výsledky.",
        excellent: "Skvělý dotaz! Kombinuje klimatické a biologické aspekty.",
      },
    },
    scoring: {
      correctStructure: 40,
      includesAllRequired: 30,
      excludesForbidden: 20,
      useComplexity: 10,
      maxScore: 100,
    },
  },

  lf: {
    scenario: {
      title: "Konstrukce vyhledávacího dotazu",
      instruction:
        "Sestavte vyhledávací dotaz pro výzkum diabetu 2. typu a léčebných metod.",
      context:
        "Kombinujte klinické a farmakologické pojmy pro přesné vyhledávání.",
      goal: "Vytvořte dotaz, který najde studie o léčbě diabetu 2. typu, ale vyloučí pediatrické případy.",
    },
    availableTerms: [
      { id: 1, text: "diabetes mellitus typ 2", category: "main" },
      { id: 2, text: "léčba", category: "main" },
      { id: 3, text: "metformin", category: "specific" },
      { id: 4, text: "inzulín", category: "specific" },
      { id: 5, text: "klinická studie", category: "context" },
      { id: 6, text: "pediatrie", category: "exclude" },
      { id: 7, text: "glykemická kontrola", category: "concept" },
      { id: 8, text: "dospělí pacienti", category: "context" },
    ],
    operators: [
      { id: "AND", label: "AND", description: "Oba výrazy musí být přítomny" },
      { id: "OR", label: "OR", description: "Alespoň jeden výraz" },
      { id: "NOT", label: "NOT", description: "Vyloučit výraz" },
    ],
    correctQuery: {
      type: "AND",
      children: [
        { type: "term", value: "diabetes mellitus typ 2" },
        {
          type: "OR",
          children: [
            { type: "term", value: "léčba" },
            { type: "term", value: "metformin" },
            { type: "term", value: "inzulín" },
          ],
        },
        { type: "NOT", children: [{ type: "term", value: "pediatrie" }] },
      ],
    },
    validation: {
      requiredTerms: ["diabetes mellitus typ 2", "léčba"],
      forbiddenTerms: ["pediatrie"],
      minComplexity: 2,
      feedback: {
        missingRequired: "Zahrňte 'diabetes mellitus typ 2' a 'léčba'.",
        notExcludingForbidden: "Vyloučte pediatrické případy pomocí NOT.",
        tooSimple: "Dotaz vyžaduje větší specifičnost.",
        excellent: "Přesný dotaz pro klinický výzkum diabetu u dospělých!",
      },
    },
    scoring: {
      correctStructure: 40,
      includesAllRequired: 30,
      excludesForbidden: 20,
      useComplexity: 10,
      maxScore: 100,
    },
  },

  econ: {
    scenario: {
      title: "Konstrukce vyhledávacího dotazu",
      instruction:
        "Vytvořte dotaz pro výzkum digitalizace a její ekonomické dopady.",
      context:
        "Zkombinujte technologické a ekonomické pojmy pro analýzu produktivity.",
      goal: "Najděte studie o digitalizaci a produktivitě, ale vyloučte čistě technické manuály.",
    },
    availableTerms: [
      { id: 1, text: "digitalizace", category: "main" },
      { id: 2, text: "produktivita", category: "main" },
      { id: 3, text: "automatizace", category: "specific" },
      { id: 4, text: "ekonomický růst", category: "context" },
      { id: 5, text: "Industry 4.0", category: "concept" },
      { id: 6, text: "technický manuál", category: "exclude" },
      { id: 7, text: "inovace", category: "context" },
      { id: 8, text: "efektivita", category: "concept" },
    ],
    operators: [
      { id: "AND", label: "AND", description: "Oba výrazy musí být přítomny" },
      { id: "OR", label: "OR", description: "Alespoň jeden výraz" },
      { id: "NOT", label: "NOT", description: "Vyloučit výraz" },
    ],
    correctQuery: {
      type: "AND",
      children: [
        {
          type: "OR",
          children: [
            { type: "term", value: "digitalizace" },
            { type: "term", value: "automatizace" },
          ],
        },
        { type: "term", value: "produktivita" },
        { type: "NOT", children: [{ type: "term", value: "technický manuál" }] },
      ],
    },
    validation: {
      requiredTerms: ["digitalizace", "produktivita"],
      forbiddenTerms: ["technický manuál"],
      minComplexity: 2,
      feedback: {
        missingRequired: "Zahrňte 'digitalizace' a 'produktivita'.",
        notExcludingForbidden: "Vyloučte technické manuály pomocí NOT.",
        tooSimple: "Přidejte více operátorů pro přesnější výsledky.",
        excellent: "Výborný dotaz pro ekonomickou analýzu digitalizace!",
      },
    },
    scoring: {
      correctStructure: 40,
      includesAllRequired: 30,
      excludesForbidden: 20,
      useComplexity: 10,
      maxScore: 100,
    },
  },

  pf: {
    scenario: {
      title: "Konstrukce vyhledávacího dotazu",
      instruction:
        "Sestavte dotaz pro výzkum GDPR a umělé inteligence v právním kontextu.",
      context:
        "Kombinujte právní a technologické pojmy pro analýzu regulace AI.",
      goal: "Najděte studie o GDPR a AI, ale vyloučte obecné články o e-commerce.",
    },
    availableTerms: [
      { id: 1, text: "GDPR", category: "main" },
      { id: 2, text: "umělá inteligence", category: "main" },
      { id: 3, text: "ochrana osobních údajů", category: "context" },
      { id: 4, text: "automatizované rozhodování", category: "specific" },
      { id: 5, text: "právní compliance", category: "concept" },
      { id: 6, text: "e-commerce", category: "exclude" },
      { id: 7, text: "soukromí", category: "context" },
      { id: 8, text: "algoritmy", category: "specific" },
    ],
    operators: [
      { id: "AND", label: "AND", description: "Oba výrazy musí být přítomny" },
      { id: "OR", label: "OR", description: "Alespoň jeden výraz" },
      { id: "NOT", label: "NOT", description: "Vyloučit výraz" },
    ],
    correctQuery: {
      type: "AND",
      children: [
        { type: "term", value: "GDPR" },
        {
          type: "OR",
          children: [
            { type: "term", value: "umělá inteligence" },
            { type: "term", value: "automatizované rozhodování" },
          ],
        },
        { type: "NOT", children: [{ type: "term", value: "e-commerce" }] },
      ],
    },
    validation: {
      requiredTerms: ["GDPR", "umělá inteligence"],
      forbiddenTerms: ["e-commerce"],
      minComplexity: 2,
      feedback: {
        missingRequired: "Zahrňte 'GDPR' a 'umělá inteligence'.",
        notExcludingForbidden: "Vyloučte e-commerce pomocí NOT.",
        tooSimple: "Dotaz potřebuje více operátorů.",
        excellent: "Přesný právní dotaz o regulaci AI!",
      },
    },
    scoring: {
      correctStructure: 40,
      includesAllRequired: 30,
      excludesForbidden: 20,
      useComplexity: 10,
      maxScore: 100,
    },
  },

  fss: {
    scenario: {
      title: "Konstrukce vyhledávacího dotazu",
      instruction:
        "Vytvořte dotaz pro výzkum genderu a vzdělávání v sociologickém kontextu.",
      context:
        "Kombinujte genderové studie s pedagogickými pojmy.",
      goal: "Najděte studie o genderových nerovnostech ve vzdělávání, ale vyloučte biologické studie.",
    },
    availableTerms: [
      { id: 1, text: "gender", category: "main" },
      { id: 2, text: "vzdělávání", category: "main" },
      { id: 3, text: "rovné příležitosti", category: "context" },
      { id: 4, text: "stereotypy", category: "specific" },
      { id: 5, text: "sociální nerovnosti", category: "concept" },
      { id: 6, text: "biologie", category: "exclude" },
      { id: 7, text: "škola", category: "context" },
      { id: 8, text: "intersekce", category: "concept" },
    ],
    operators: [
      { id: "AND", label: "AND", description: "Oba výrazy musí být přítomny" },
      { id: "OR", label: "OR", description: "Alespoň jeden výraz" },
      { id: "NOT", label: "NOT", description: "Vyloučit výraz" },
    ],
    correctQuery: {
      type: "AND",
      children: [
        { type: "term", value: "gender" },
        {
          type: "OR",
          children: [
            { type: "term", value: "vzdělávání" },
            { type: "term", value: "škola" },
          ],
        },
        { type: "NOT", children: [{ type: "term", value: "biologie" }] },
      ],
    },
    validation: {
      requiredTerms: ["gender", "vzdělávání"],
      forbiddenTerms: ["biologie"],
      minComplexity: 2,
      feedback: {
        missingRequired: "Zahrňte 'gender' a 'vzdělávání'.",
        notExcludingForbidden: "Vyloučte biologické studie pomocí NOT.",
        tooSimple: "Použijte komplexnější strukturu dotazu.",
        excellent: "Vynikající sociologický dotaz o genderu ve vzdělávání!",
      },
    },
    scoring: {
      correctStructure: 40,
      includesAllRequired: 30,
      excludesForbidden: 20,
      useComplexity: 10,
      maxScore: 100,
    },
  },

  fi: {
    scenario: {
      title: "Konstrukce vyhledávacího dotazu",
      instruction:
        "Sestavte dotaz pro výzkum strojového učení a zpracování jazyka.",
      context:
        "Kombinujte AI a NLP pojmy pro přesné vyhledávání.",
      goal: "Najděte studie o strojovém učení v NLP, ale vyloučte základní tutoriály.",
    },
    availableTerms: [
      { id: 1, text: "machine learning", category: "main" },
      { id: 2, text: "natural language processing", category: "main" },
      { id: 3, text: "deep learning", category: "specific" },
      { id: 4, text: "transformers", category: "specific" },
      { id: 5, text: "neural networks", category: "concept" },
      { id: 6, text: "tutorial", category: "exclude" },
      { id: 7, text: "BERT", category: "specific" },
      { id: 8, text: "sentiment analysis", category: "context" },
    ],
    operators: [
      { id: "AND", label: "AND", description: "Oba výrazy musí být přítomny" },
      { id: "OR", label: "OR", description: "Alespoň jeden výraz" },
      { id: "NOT", label: "NOT", description: "Vyloučit výraz" },
    ],
    correctQuery: {
      type: "AND",
      children: [
        {
          type: "OR",
          children: [
            { type: "term", value: "machine learning" },
            { type: "term", value: "deep learning" },
          ],
        },
        { type: "term", value: "natural language processing" },
        { type: "NOT", children: [{ type: "term", value: "tutorial" }] },
      ],
    },
    validation: {
      requiredTerms: ["machine learning", "natural language processing"],
      forbiddenTerms: ["tutorial"],
      minComplexity: 2,
      feedback: {
        missingRequired: "Zahrňte 'machine learning' a 'natural language processing'.",
        notExcludingForbidden: "Vyloučte tutoriály pomocí NOT.",
        tooSimple: "Dotaz vyžaduje větší komplexitu.",
        excellent: "Přesný dotaz pro pokročilý výzkum NLP!",
      },
    },
    scoring: {
      correctStructure: 40,
      includesAllRequired: 30,
      excludesForbidden: 20,
      useComplexity: 10,
      maxScore: 100,
    },
  },

  ped: {
    scenario: {
      title: "Konstrukce vyhledávacího dotazu",
      instruction:
        "Vytvořte dotaz pro výzkum inkluzivního vzdělávání a metod podpory.",
      context:
        "Kombinujte inkluzivní a speciálně pedagogické pojmy.",
      goal: "Najděte studie o inkluzi a podpůrných metodách, ale vyloučte články pouze o segregaci.",
    },
    availableTerms: [
      { id: 1, text: "inkluzivní vzdělávání", category: "main" },
      { id: 2, text: "podpůrná opatření", category: "main" },
      { id: 3, text: "individualizace", category: "specific" },
      { id: 4, text: "speciální potřeby", category: "context" },
      { id: 5, text: "asistent pedagoga", category: "specific" },
      { id: 6, text: "segregace", category: "exclude" },
      { id: 7, text: "diferenciace", category: "concept" },
      { id: 8, text: "mainstreaming", category: "concept" },
    ],
    operators: [
      { id: "AND", label: "AND", description: "Oba výrazy musí být přítomny" },
      { id: "OR", label: "OR", description: "Alespoň jeden výraz" },
      { id: "NOT", label: "NOT", description: "Vyloučit výraz" },
    ],
    correctQuery: {
      type: "AND",
      children: [
        { type: "term", value: "inkluzivní vzdělávání" },
        {
          type: "OR",
          children: [
            { type: "term", value: "podpůrná opatření" },
            { type: "term", value: "individualizace" },
          ],
        },
        { type: "NOT", children: [{ type: "term", value: "segregace" }] },
      ],
    },
    validation: {
      requiredTerms: ["inkluzivní vzdělávání", "podpůrná opatření"],
      forbiddenTerms: ["segregace"],
      minComplexity: 2,
      feedback: {
        missingRequired: "Zahrňte 'inkluzivní vzdělávání' a 'podpůrná opatření'.",
        notExcludingForbidden: "Vyloučte segregaci pomocí NOT.",
        tooSimple: "Dotaz vyžaduje více operátorů.",
        excellent: "Skvělý dotaz pro inkluzivní pedagogiku!",
      },
    },
    scoring: {
      correctStructure: 40,
      includesAllRequired: 30,
      excludesForbidden: 20,
      useComplexity: 10,
      maxScore: 100,
    },
  },

  fspch: {
    scenario: {
      title: "Konstrukce vyhledávacího dotazu",
      instruction:
        "Sestavte dotaz pro výzkum HIIT tréninku a jeho fyziologických efektů.",
      context:
        "Kombinujte tréninkové a fyziologické pojmy.",
      goal: "Najděte studie o HIIT a fyziologii, ale vyloučte rekreační sportování.",
    },
    availableTerms: [
      { id: 1, text: "HIIT", category: "main" },
      { id: 2, text: "fyziologie", category: "main" },
      { id: 3, text: "VO2max", category: "specific" },
      { id: 4, text: "aerobní kapacita", category: "concept" },
      { id: 5, text: "metabolismus", category: "context" },
      { id: 6, text: "rekreace", category: "exclude" },
      { id: 7, text: "trénink", category: "context" },
      { id: 8, text: "adaptace", category: "concept" },
    ],
    operators: [
      { id: "AND", label: "AND", description: "Oba výrazy musí být přítomny" },
      { id: "OR", label: "OR", description: "Alespoň jeden výraz" },
      { id: "NOT", label: "NOT", description: "Vyloučit výraz" },
    ],
    correctQuery: {
      type: "AND",
      children: [
        { type: "term", value: "HIIT" },
        {
          type: "OR",
          children: [
            { type: "term", value: "fyziologie" },
            { type: "term", value: "VO2max" },
          ],
        },
        { type: "NOT", children: [{ type: "term", value: "rekreace" }] },
      ],
    },
    validation: {
      requiredTerms: ["HIIT", "fyziologie"],
      forbiddenTerms: ["rekreace"],
      minComplexity: 2,
      feedback: {
        missingRequired: "Zahrňte 'HIIT' a 'fyziologie'.",
        notExcludingForbidden: "Vyloučte rekreační sport pomocí NOT.",
        tooSimple: "Dotaz potřebuje větší komplexitu.",
        excellent: "Vynikající dotaz pro sportovní fyziologii!",
      },
    },
    scoring: {
      correctStructure: 40,
      includesAllRequired: 30,
      excludesForbidden: 20,
      useComplexity: 10,
      maxScore: 100,
    },
  },

  pharm: {
    scenario: {
      title: "Konstrukce vyhledávacího dotazu",
      instruction:
        "Vytvořte dotaz pro výzkum protinádorových léčiv a jejich mechanismů.",
      context:
        "Kombinujte farmakologické a onkologické pojmy.",
      goal: "Najděte studie o protinádorových léčivech, ale vyloučte preventivní medicínu.",
    },
    availableTerms: [
      { id: 1, text: "protinádorová léčiva", category: "main" },
      { id: 2, text: "mechanismus účinku", category: "main" },
      { id: 3, text: "chemoterapie", category: "specific" },
      { id: 4, text: "cílená terapie", category: "specific" },
      { id: 5, text: "farmakodynamika", category: "concept" },
      { id: 6, text: "prevence", category: "exclude" },
      { id: 7, text: "onkologie", category: "context" },
      { id: 8, text: "apoptóza", category: "concept" },
    ],
    operators: [
      { id: "AND", label: "AND", description: "Oba výrazy musí být přítomny" },
      { id: "OR", label: "OR", description: "Alespoň jeden výraz" },
      { id: "NOT", label: "NOT", description: "Vyloučit výraz" },
    ],
    correctQuery: {
      type: "AND",
      children: [
        {
          type: "OR",
          children: [
            { type: "term", value: "protinádorová léčiva" },
            { type: "term", value: "chemoterapie" },
          ],
        },
        { type: "term", value: "mechanismus účinku" },
        { type: "NOT", children: [{ type: "term", value: "prevence" }] },
      ],
    },
    validation: {
      requiredTerms: ["protinádorová léčiva", "mechanismus účinku"],
      forbiddenTerms: ["prevence"],
      minComplexity: 2,
      feedback: {
        missingRequired: "Zahrňte 'protinádorová léčiva' a 'mechanismus účinku'.",
        notExcludingForbidden: "Vyloučte prevenci pomocí NOT.",
        tooSimple: "Dotaz vyžaduje složitější strukturu.",
        excellent: "Precizní farmakologický dotaz!",
      },
    },
    scoring: {
      correctStructure: 40,
      includesAllRequired: 30,
      excludesForbidden: 20,
      useComplexity: 10,
      maxScore: 100,
    },
  },
};

/**
 * Get Round 2 data for a specific faculty
 * @param {string} facultyId - Faculty identifier (ff, prf, lf, etc.)
 * @returns {object} Round 2 scenario and query data
 */
export const getRound2Data = (facultyId) => {
  return round2DataByFaculty[facultyId] || round2DataByFaculty.ff;
};

export default round2DataByFaculty;
