/**
 * Round 4: Results Filter - Quality Assessment
 *
 * Students filter and evaluate search results based on quality criteria
 */

const round4DataByFaculty = {
  ff: {
    scenario: {
      title: "Filtrace a hodnocení výsledků",
      instruction:
        "Vyhledávání vrátilo 250 výsledků. Použijte filtry k získání kvalitních zdrojů o sociálních médiích a polarizaci.",
      context:
        "Máte k dispozici různé filtry pro zúžení výsledků. Vyberte správnou kombinaci pro akademický výzkum.",
      goal: "Získejte kvalitní, recenzované zdroje z posledních 5 let.",
    },
    initialResults: 250,
    targetResults: "10-30",
    filters: [
      {
        id: "year",
        name: "Rok publikace",
        type: "range",
        options: [
          { value: "all", label: "Vše", impact: 0 },
          { value: "last10", label: "Posledních 10 let", impact: -30 },
          { value: "last5", label: "Posledních 5 let", impact: -60, recommended: true },
          { value: "last3", label: "Posledních 3 let", impact: -75 },
          { value: "last1", label: "Poslední rok", impact: -90 },
        ],
      },
      {
        id: "peerReview",
        name: "Recenzovaný obsah",
        type: "boolean",
        options: [
          { value: false, label: "Vše", impact: 0 },
          { value: true, label: "Pouze peer-reviewed", impact: -70, recommended: true },
        ],
      },
      {
        id: "documentType",
        name: "Typ dokumentu",
        type: "multiselect",
        options: [
          { value: "article", label: "Článek", impact: 0, recommended: true },
          { value: "review", label: "Recenzní studie", impact: -5, recommended: true },
          { value: "book", label: "Kniha", impact: -10 },
          { value: "conference", label: "Konferenční příspěvek", impact: -15 },
          { value: "thesis", label: "Diplomová práce", impact: -20 },
          { value: "magazine", label: "Magazín", impact: -30 },
          { value: "news", label: "Novinový článek", impact: -40 },
        ],
      },
      {
        id: "language",
        name: "Jazyk",
        type: "multiselect",
        options: [
          { value: "en", label: "Angličtina", impact: 0, recommended: true },
          { value: "cs", label: "Čeština", impact: -5, recommended: true },
          { value: "de", label: "Němčina", impact: -10 },
          { value: "other", label: "Ostatní", impact: -15 },
        ],
      },
      {
        id: "access",
        name: "Přístup",
        type: "radio",
        options: [
          { value: "all", label: "Vše", impact: 0 },
          { value: "fullText", label: "Plný text dostupný", impact: -40, recommended: true },
          { value: "openAccess", label: "Open Access", impact: -60 },
        ],
      },
    ],
    validation: {
      requiredFilters: ["peerReview", "year"],
      recommendedCombination: {
        year: "last5",
        peerReview: true,
        documentType: ["article", "review"],
        access: "fullText",
      },
      targetRange: [10, 30],
    },
    scoring: {
      correctFilters: 40, // Used recommended filters
      appropriateResults: 30, // Result count in target range
      qualityCriteria: 20, // Peer-review + recent years
      smartSelection: 10, // Good balance of filters
      maxScore: 100,
    },
    feedback: {
      perfect: "Skvělé! Vyfiltrovali jste kvalitní akademické zdroje s optimálním počtem výsledků.",
      goodFiltering: "Dobrá filtrace. Výsledky jsou relevantní, ale mohli byste je ještě zúžit.",
      tooManyResults: "Máte příliš mnoho výsledků. Použijte přísnější filtry pro lepší přehlednost.",
      tooFewResults: "Příliš přísné filtry vedly k velmi malému počtu výsledků. Zkuste být mírnější.",
      missingQuality: "Nezapomeňte filtrovat podle recenzování a aktuálnosti pro kvalitní zdroje.",
      poor: "Filtrace by měla zahrnout peer-review a časové omezení pro akademický výzkum.",
    },
  },

  prf: {
    scenario: {
      title: "Filtrace a hodnocení výsledků",
      instruction:
        "Získali jste 320 výsledků o klimatické změně. Vyfiltrujte kvalitní přírodovědné zdroje.",
      context:
        "Použijte filtry k získání aktuálních, recenzovaných studií o ekologii.",
      goal: "Získejte 10-30 kvalitních zdrojů z posledních 5 let.",
    },
    initialResults: 320,
    targetResults: "10-30",
    filters: [
      {
        id: "year",
        name: "Rok publikace",
        type: "range",
        options: [
          { value: "all", label: "Vše", impact: 0 },
          { value: "last10", label: "Posledních 10 let", impact: -35 },
          { value: "last5", label: "Posledních 5 let", impact: -65, recommended: true },
          { value: "last3", label: "Posledních 3 let", impact: -80 },
          { value: "last1", label: "Poslední rok", impact: -92 },
        ],
      },
      {
        id: "peerReview",
        name: "Recenzovaný obsah",
        type: "boolean",
        options: [
          { value: false, label: "Vše", impact: 0 },
          { value: true, label: "Pouze peer-reviewed", impact: -75, recommended: true },
        ],
      },
      {
        id: "documentType",
        name: "Typ dokumentu",
        type: "multiselect",
        options: [
          { value: "article", label: "Článek", impact: 0, recommended: true },
          { value: "review", label: "Systematický přehled", impact: -3, recommended: true },
          { value: "book", label: "Kniha", impact: -12 },
          { value: "dataset", label: "Datová sada", impact: -10 },
          { value: "report", label: "Technická zpráva", impact: -25 },
        ],
      },
      {
        id: "language",
        name: "Jazyk",
        type: "multiselect",
        options: [
          { value: "en", label: "Angličtina", impact: 0, recommended: true },
          { value: "cs", label: "Čeština", impact: -8 },
          { value: "other", label: "Ostatní", impact: -12 },
        ],
      },
      {
        id: "access",
        name: "Přístup",
        type: "radio",
        options: [
          { value: "all", label: "Vše", impact: 0 },
          { value: "fullText", label: "Plný text dostupný", impact: -35, recommended: true },
          { value: "openAccess", label: "Open Access", impact: -55 },
        ],
      },
    ],
    validation: {
      requiredFilters: ["peerReview", "year"],
      recommendedCombination: {
        year: "last5",
        peerReview: true,
        documentType: ["article", "review"],
        access: "fullText",
      },
      targetRange: [10, 30],
    },
    scoring: {
      correctFilters: 40,
      appropriateResults: 30,
      qualityCriteria: 20,
      smartSelection: 10,
      maxScore: 100,
    },
    feedback: {
      perfect: "Perfektní filtrace přírodovědných zdrojů!",
      goodFiltering: "Dobrá filtrace, ale zvažte další zúžení.",
      tooManyResults: "Příliš mnoho výsledků. Použijte přísnější filtry.",
      tooFewResults: "Příliš přísné filtry. Zkuste rozšířit kritéria.",
      missingQuality: "Zahrňte peer-review a časové omezení.",
      poor: "Pro přírodní vědy je důležité peer-review a aktuálnost.",
    },
  },

  lf: {
    scenario: {
      title: "Filtrace a hodnocení výsledků",
      instruction:
        "Našli jste 410 výsledků o diabetu. Vyfiltrujte klinické studie a systematické přehledy.",
      context:
        "Medicínský výzkum vyžaduje high-quality evidence. Použijte přísné filtry.",
      goal: "10-25 recenzovaných klinických studií z posledních 5 let.",
    },
    initialResults: 410,
    targetResults: "10-25",
    filters: [
      {
        id: "year",
        name: "Rok publikace",
        type: "range",
        options: [
          { value: "all", label: "Vše", impact: 0 },
          { value: "last10", label: "Posledních 10 let", impact: -40 },
          { value: "last5", label: "Posledních 5 let", impact: -70, recommended: true },
          { value: "last3", label: "Posledních 3 let", impact: -82 },
          { value: "last1", label: "Poslední rok", impact: -93 },
        ],
      },
      {
        id: "peerReview",
        name: "Recenzovaný obsah",
        type: "boolean",
        options: [
          { value: false, label: "Vše", impact: 0 },
          { value: true, label: "Pouze peer-reviewed", impact: -80, recommended: true },
        ],
      },
      {
        id: "documentType",
        name: "Typ dokumentu",
        type: "multiselect",
        options: [
          { value: "clinicalTrial", label: "Klinická studie", impact: -5, recommended: true },
          { value: "systematic", label: "Systematický přehled", impact: -3, recommended: true },
          { value: "meta", label: "Meta-analýza", impact: -2, recommended: true },
          { value: "article", label: "Článek", impact: 0 },
          { value: "case", label: "Case report", impact: -15 },
          { value: "guideline", label: "Klinické guidelines", impact: -10 },
        ],
      },
      {
        id: "language",
        name: "Jazyk",
        type: "multiselect",
        options: [
          { value: "en", label: "Angličtina", impact: 0, recommended: true },
          { value: "cs", label: "Čeština", impact: -10 },
        ],
      },
      {
        id: "access",
        name: "Přístup",
        type: "radio",
        options: [
          { value: "all", label: "Vše", impact: 0 },
          { value: "fullText", label: "Plný text dostupný", impact: -45, recommended: true },
          { value: "openAccess", label: "Open Access", impact: -65 },
        ],
      },
    ],
    validation: {
      requiredFilters: ["peerReview", "year"],
      recommendedCombination: {
        year: "last5",
        peerReview: true,
        documentType: ["clinicalTrial", "systematic", "meta"],
        access: "fullText",
      },
      targetRange: [10, 25],
    },
    scoring: {
      correctFilters: 40,
      appropriateResults: 30,
      qualityCriteria: 20,
      smartSelection: 10,
      maxScore: 100,
    },
    feedback: {
      perfect: "Výborná filtrace medicínských zdrojů s high-quality evidence!",
      goodFiltering: "Dobrá filtrace, ale zkuste zahrnout více typů studií.",
      tooManyResults: "Příliš mnoho výsledků. Zaměřte se na klinické studie.",
      tooFewResults: "Příliš úzké filtry. Rozšiřte typy dokumentů.",
      missingQuality: "Medicínský výzkum vyžaduje peer-review a aktuálnost.",
      poor: "Pro medicínu je klíčové peer-review a evidence-based zdroje.",
    },
  },

  econ: {
    scenario: {
      title: "Filtrace a hodnocení výsledků",
      instruction:
        "Máte 280 výsledků o digitalizaci. Vyfiltrujte ekonomické a business studie.",
      context:
        "Zaměřte se na recenzované ekonomické články a business research.",
      goal: "15-35 kvalitních zdrojů z posledních 7 let.",
    },
    initialResults: 280,
    targetResults: "15-35",
    filters: [
      {
        id: "year",
        name: "Rok publikace",
        type: "range",
        options: [
          { value: "all", label: "Vše", impact: 0 },
          { value: "last10", label: "Posledních 10 let", impact: -32 },
          { value: "last7", label: "Posledních 7 let", impact: -58, recommended: true },
          { value: "last5", label: "Posledních 5 let", impact: -75 },
          { value: "last3", label: "Posledních 3 let", impact: -88 },
        ],
      },
      {
        id: "peerReview",
        name: "Recenzovaný obsah",
        type: "boolean",
        options: [
          { value: false, label: "Vše", impact: 0 },
          { value: true, label: "Pouze peer-reviewed", impact: -68, recommended: true },
        ],
      },
      {
        id: "documentType",
        name: "Typ dokumentu",
        type: "multiselect",
        options: [
          { value: "article", label: "Článek", impact: 0, recommended: true },
          { value: "working", label: "Working paper", impact: -8, recommended: true },
          { value: "report", label: "Ekonomická zpráva", impact: -12 },
          { value: "book", label: "Kniha", impact: -15 },
          { value: "conference", label: "Konference", impact: -18 },
        ],
      },
      {
        id: "language",
        name: "Jazyk",
        type: "multiselect",
        options: [
          { value: "en", label: "Angličtina", impact: 0, recommended: true },
          { value: "cs", label: "Čeština", impact: -6 },
        ],
      },
      {
        id: "access",
        name: "Přístup",
        type: "radio",
        options: [
          { value: "all", label: "Vše", impact: 0 },
          { value: "fullText", label: "Plný text dostupný", impact: -38, recommended: true },
          { value: "openAccess", label: "Open Access", impact: -58 },
        ],
      },
    ],
    validation: {
      requiredFilters: ["peerReview", "year"],
      recommendedCombination: {
        year: "last7",
        peerReview: true,
        documentType: ["article", "working"],
        access: "fullText",
      },
      targetRange: [15, 35],
    },
    scoring: {
      correctFilters: 40,
      appropriateResults: 30,
      qualityCriteria: 20,
      smartSelection: 10,
      maxScore: 100,
    },
    feedback: {
      perfect: "Skvělá filtrace ekonomických zdrojů!",
      goodFiltering: "Dobrá filtrace, ale zvažte working papers.",
      tooManyResults: "Příliš mnoho výsledků. Zúžte časové období.",
      tooFewResults: "Příliš úzké filtry. Zahrňte working papers.",
      missingQuality: "Ekonomický výzkum vyžaduje peer-review.",
      poor: "Zaměřte se na recenzované ekonomické články.",
    },
  },

  pf: {
    scenario: {
      title: "Filtrace a hodnocení výsledků",
      instruction:
        "Našli jste 195 výsledků o GDPR a AI. Vyfiltrujte právní zdroje.",
      context:
        "Právní výzkum vyžaduje aktuální zdroje a judikatur u.",
      goal: "12-28 aktuálních právních zdrojů.",
    },
    initialResults: 195,
    targetResults: "12-28",
    filters: [
      {
        id: "year",
        name: "Rok publikace",
        type: "range",
        options: [
          { value: "all", label: "Vše", impact: 0 },
          { value: "last10", label: "Posledních 10 let", impact: -25 },
          { value: "last5", label: "Posledních 5 let", impact: -55, recommended: true },
          { value: "last3", label: "Posledních 3 let", impact: -72 },
          { value: "last1", label: "Poslední rok", impact: -85 },
        ],
      },
      {
        id: "peerReview",
        name: "Recenzovaný obsah",
        type: "boolean",
        options: [
          { value: false, label: "Vše", impact: 0 },
          { value: true, label: "Pouze peer-reviewed", impact: -65, recommended: true },
        ],
      },
      {
        id: "documentType",
        name: "Typ dokumentu",
        type: "multiselect",
        options: [
          { value: "article", label: "Článek", impact: 0, recommended: true },
          { value: "case", label: "Judikatura", impact: -5, recommended: true },
          { value: "commentary", label: "Komentář", impact: -8 },
          { value: "book", label: "Kniha", impact: -12 },
        ],
      },
      {
        id: "language",
        name: "Jazyk",
        type: "multiselect",
        options: [
          { value: "en", label: "Angličtina", impact: 0, recommended: true },
          { value: "cs", label: "Čeština", impact: -7, recommended: true },
        ],
      },
      {
        id: "access",
        name: "Přístup",
        type: "radio",
        options: [
          { value: "all", label: "Vše", impact: 0 },
          { value: "fullText", label: "Plný text dostupný", impact: -42, recommended: true },
        ],
      },
    ],
    validation: {
      requiredFilters: ["year"],
      recommendedCombination: {
        year: "last5",
        peerReview: true,
        documentType: ["article", "case"],
        access: "fullText",
      },
      targetRange: [12, 28],
    },
    scoring: {
      correctFilters: 40,
      appropriateResults: 30,
      qualityCriteria: 20,
      smartSelection: 10,
      maxScore: 100,
    },
    feedback: {
      perfect: "Výborná filtrace právních zdrojů!",
      goodFiltering: "Dobrá filtrace, ale zvažte judikatur u.",
      tooManyResults: "Příliš mnoho výsledků. Zaměřte se na aktuálnost.",
      tooFewResults: "Příliš úzké filtry. Rozšiřte typy dokumentů.",
      missingQuality: "Právní výzkum vyžaduje aktuální zdroje.",
      poor: "Zaměřte se na aktuální právní články a judikatur u.",
    },
  },

  fss: {
    scenario: {
      title: "Filtrace a hodnocení výsledků",
      instruction:
        "Získali jste 275 výsledků o genderu. Vyfiltrujte sociologické studie.",
      context:
        "Sociologický výzkum vyžaduje kvalitní empirické studie.",
      goal: "15-32 recenzovaných zdrojů z posledních 8 let.",
    },
    initialResults: 275,
    targetResults: "15-32",
    filters: [
      {
        id: "year",
        name: "Rok publikace",
        type: "range",
        options: [
          { value: "all", label: "Vše", impact: 0 },
          { value: "last10", label: "Posledních 10 let", impact: -30 },
          { value: "last8", label: "Posledních 8 let", impact: -56, recommended: true },
          { value: "last5", label: "Posledních 5 let", impact: -73 },
        ],
      },
      {
        id: "peerReview",
        name: "Recenzovaný obsah",
        type: "boolean",
        options: [
          { value: false, label: "Vše", impact: 0 },
          { value: true, label: "Pouze peer-reviewed", impact: -70, recommended: true },
        ],
      },
      {
        id: "documentType",
        name: "Typ dokumentu",
        type: "multiselect",
        options: [
          { value: "article", label: "Článek", impact: 0, recommended: true },
          { value: "empirical", label: "Empirická studie", impact: -4, recommended: true },
          { value: "book", label: "Kniha", impact: -10 },
          { value: "thesis", label: "Disertace", impact: -18 },
        ],
      },
      {
        id: "language",
        name: "Jazyk",
        type: "multiselect",
        options: [
          { value: "en", label: "Angličtina", impact: 0, recommended: true },
          { value: "cs", label: "Čeština", impact: -5, recommended: true },
        ],
      },
      {
        id: "access",
        name: "Přístup",
        type: "radio",
        options: [
          { value: "all", label: "Vše", impact: 0 },
          { value: "fullText", label: "Plný text dostupný", impact: -36, recommended: true },
        ],
      },
    ],
    validation: {
      requiredFilters: ["peerReview", "year"],
      recommendedCombination: {
        year: "last8",
        peerReview: true,
        documentType: ["article", "empirical"],
        access: "fullText",
      },
      targetRange: [15, 32],
    },
    scoring: {
      correctFilters: 40,
      appropriateResults: 30,
      qualityCriteria: 20,
      smartSelection: 10,
      maxScore: 100,
    },
    feedback: {
      perfect: "Skvělá filtrace sociologických zdrojů!",
      goodFiltering: "Dobrá filtrace, ale zvažte empirické studie.",
      tooManyResults: "Příliš mnoho výsledků. Zúžte kritéria.",
      tooFewResults: "Příliš úzké filtry. Rozšiřte časové období.",
      missingQuality: "Sociologie vyžaduje peer-review a empirii.",
      poor: "Zaměřte se na recenzované empirické studie.",
    },
  },

  fi: {
    scenario: {
      title: "Filtrace a hodnocení výsledků",
      instruction:
        "Máte 340 výsledků o ML a NLP. Vyfiltrujte technické články a konference.",
      context:
        "Informatika vyžaduje aktuální technické zdroje a konferenční příspěvky.",
      goal: "18-38 zdrojů z posledních 3 let.",
    },
    initialResults: 340,
    targetResults: "18-38",
    filters: [
      {
        id: "year",
        name: "Rok publikace",
        type: "range",
        options: [
          { value: "all", label: "Vše", impact: 0 },
          { value: "last5", label: "Posledních 5 let", impact: -45 },
          { value: "last3", label: "Posledních 3 let", impact: -68, recommended: true },
          { value: "last2", label: "Posledních 2 let", impact: -82 },
          { value: "last1", label: "Poslední rok", impact: -91 },
        ],
      },
      {
        id: "peerReview",
        name: "Recenzovaný obsah",
        type: "boolean",
        options: [
          { value: false, label: "Vše", impact: 0 },
          { value: true, label: "Pouze peer-reviewed", impact: -62, recommended: true },
        ],
      },
      {
        id: "documentType",
        name: "Typ dokumentu",
        type: "multiselect",
        options: [
          { value: "conference", label: "Konference", impact: -2, recommended: true },
          { value: "article", label: "Článek", impact: 0, recommended: true },
          { value: "preprint", label: "Preprint (arXiv)", impact: -5, recommended: true },
          { value: "book", label: "Kniha", impact: -18 },
        ],
      },
      {
        id: "language",
        name: "Jazyk",
        type: "multiselect",
        options: [
          { value: "en", label: "Angličtina", impact: 0, recommended: true },
        ],
      },
      {
        id: "access",
        name: "Přístup",
        type: "radio",
        options: [
          { value: "all", label: "Vše", impact: 0 },
          { value: "fullText", label: "Plný text dostupný", impact: -40, recommended: true },
          { value: "openAccess", label: "Open Access", impact: -50 },
        ],
      },
    ],
    validation: {
      requiredFilters: ["year"],
      recommendedCombination: {
        year: "last3",
        peerReview: true,
        documentType: ["conference", "article", "preprint"],
        access: "fullText",
      },
      targetRange: [18, 38],
    },
    scoring: {
      correctFilters: 40,
      appropriateResults: 30,
      qualityCriteria: 20,
      smartSelection: 10,
      maxScore: 100,
    },
    feedback: {
      perfect: "Perfektní filtrace CS zdrojů s konferencemi a preprinty!",
      goodFiltering: "Dobrá filtrace, ale zahrňte konferenční příspěvky.",
      tooManyResults: "Příliš mnoho výsledků. Zúžte na poslední 3 roky.",
      tooFewResults: "Příliš úzké. Zahrňte preprinty a konference.",
      missingQuality: "CS vyžaduje aktuální zdroje z konferencí.",
      poor: "Zaměřte se na aktuální konference a preprinty.",
    },
  },

  ped: {
    scenario: {
      title: "Filtrace a hodnocení výsledků",
      instruction:
        "Získali jste 230 výsledků o inkluzi. Vyfiltrujte pedagogické studie.",
      context:
        "Pedagogický výzkum vyžaduje empirické studie a best practices.",
      goal: "12-30 zdrojů z posledních 7 let.",
    },
    initialResults: 230,
    targetResults: "12-30",
    filters: [
      {
        id: "year",
        name: "Rok publikace",
        type: "range",
        options: [
          { value: "all", label: "Vše", impact: 0 },
          { value: "last10", label: "Posledních 10 let", impact: -28 },
          { value: "last7", label: "Posledních 7 let", impact: -54, recommended: true },
          { value: "last5", label: "Posledních 5 let", impact: -72 },
        ],
      },
      {
        id: "peerReview",
        name: "Recenzovaný obsah",
        type: "boolean",
        options: [
          { value: false, label: "Vše", impact: 0 },
          { value: true, label: "Pouze peer-reviewed", impact: -66, recommended: true },
        ],
      },
      {
        id: "documentType",
        name: "Typ dokumentu",
        type: "multiselect",
        options: [
          { value: "article", label: "Článek", impact: 0, recommended: true },
          { value: "empirical", label: "Empirická studie", impact: -3, recommended: true },
          { value: "practice", label: "Best practice", impact: -8 },
          { value: "book", label: "Kniha", impact: -14 },
        ],
      },
      {
        id: "language",
        name: "Jazyk",
        type: "multiselect",
        options: [
          { value: "en", label: "Angličtina", impact: 0, recommended: true },
          { value: "cs", label: "Čeština", impact: -6, recommended: true },
        ],
      },
      {
        id: "access",
        name: "Přístup",
        type: "radio",
        options: [
          { value: "all", label: "Vše", impact: 0 },
          { value: "fullText", label: "Plný text dostupný", impact: -39, recommended: true },
        ],
      },
    ],
    validation: {
      requiredFilters: ["peerReview", "year"],
      recommendedCombination: {
        year: "last7",
        peerReview: true,
        documentType: ["article", "empirical"],
        access: "fullText",
      },
      targetRange: [12, 30],
    },
    scoring: {
      correctFilters: 40,
      appropriateResults: 30,
      qualityCriteria: 20,
      smartSelection: 10,
      maxScore: 100,
    },
    feedback: {
      perfect: "Výborná filtrace pedagogických zdrojů!",
      goodFiltering: "Dobrá filtrace, ale zvažte empirické studie.",
      tooManyResults: "Příliš mnoho výsledků. Zúžte kritéria.",
      tooFewResults: "Příliš úzké filtry. Rozšiřte časové období.",
      missingQuality: "Pedagogika vyžaduje peer-review a empirii.",
      poor: "Zaměřte se na recenzované empirické studie.",
    },
  },

  fspch: {
    scenario: {
      title: "Filtrace a hodnocení výsledků",
      instruction:
        "Našli jste 285 výsledků o HIIT. Vyfiltrujte fyziologické studie.",
      context:
        "Sportovní věda vyžaduje experimentální a fyziologické studie.",
      goal: "14-32 zdrojů z posledních 6 let.",
    },
    initialResults: 285,
    targetResults: "14-32",
    filters: [
      {
        id: "year",
        name: "Rok publikace",
        type: "range",
        options: [
          { value: "all", label: "Vše", impact: 0 },
          { value: "last10", label: "Posledních 10 let", impact: -33 },
          { value: "last6", label: "Posledních 6 let", impact: -59, recommended: true },
          { value: "last3", label: "Posledních 3 let", impact: -78 },
        ],
      },
      {
        id: "peerReview",
        name: "Recenzovaný obsah",
        type: "boolean",
        options: [
          { value: false, label: "Vše", impact: 0 },
          { value: true, label: "Pouze peer-reviewed", impact: -71, recommended: true },
        ],
      },
      {
        id: "documentType",
        name: "Typ dokumentu",
        type: "multiselect",
        options: [
          { value: "experimental", label: "Experimentální studie", impact: -2, recommended: true },
          { value: "article", label: "Článek", impact: 0, recommended: true },
          { value: "review", label: "Přehledová studie", impact: -5 },
          { value: "book", label: "Kniha", impact: -16 },
        ],
      },
      {
        id: "language",
        name: "Jazyk",
        type: "multiselect",
        options: [
          { value: "en", label: "Angličtina", impact: 0, recommended: true },
          { value: "cs", label: "Čeština", impact: -8 },
        ],
      },
      {
        id: "access",
        name: "Přístup",
        type: "radio",
        options: [
          { value: "all", label: "Vše", impact: 0 },
          { value: "fullText", label: "Plný text dostupný", impact: -37, recommended: true },
        ],
      },
    ],
    validation: {
      requiredFilters: ["peerReview", "year"],
      recommendedCombination: {
        year: "last6",
        peerReview: true,
        documentType: ["experimental", "article"],
        access: "fullText",
      },
      targetRange: [14, 32],
    },
    scoring: {
      correctFilters: 40,
      appropriateResults: 30,
      qualityCriteria: 20,
      smartSelection: 10,
      maxScore: 100,
    },
    feedback: {
      perfect: "Skvělá filtrace sportovně-fyziologických zdrojů!",
      goodFiltering: "Dobrá filtrace, ale zvažte experimentální studie.",
      tooManyResults: "Příliš mnoho výsledků. Zaměřte se na experimenty.",
      tooFewResults: "Příliš úzké filtry. Rozšiřte typy dokumentů.",
      missingQuality: "Sportovní věda vyžaduje peer-review a experimenty.",
      poor: "Zaměřte se na recenzované experimentální studie.",
    },
  },

  pharm: {
    scenario: {
      title: "Filtrace a hodnocení výsledků",
      instruction:
        "Máte 365 výsledků o protinádorových léčivech. Vyfiltrujte farmakologické studie.",
      context:
        "Farmakologický výzkum vyžaduje klinické a pre-klinické studie.",
      goal: "10-28 zdrojů z posledních 5 let.",
    },
    initialResults: 365,
    targetResults: "10-28",
    filters: [
      {
        id: "year",
        name: "Rok publikace",
        type: "range",
        options: [
          { value: "all", label: "Vše", impact: 0 },
          { value: "last10", label: "Posledních 10 let", impact: -38 },
          { value: "last5", label: "Posledních 5 let", impact: -69, recommended: true },
          { value: "last3", label: "Posledních 3 let", impact: -84 },
        ],
      },
      {
        id: "peerReview",
        name: "Recenzovaný obsah",
        type: "boolean",
        options: [
          { value: false, label: "Vše", impact: 0 },
          { value: true, label: "Pouze peer-reviewed", impact: -77, recommended: true },
        ],
      },
      {
        id: "documentType",
        name: "Typ dokumentu",
        type: "multiselect",
        options: [
          { value: "clinical", label: "Klinická studie", impact: -3, recommended: true },
          { value: "preclinical", label: "Pre-klinická studie", impact: -4, recommended: true },
          { value: "article", label: "Článek", impact: 0, recommended: true },
          { value: "review", label: "Přehledová studie", impact: -6 },
        ],
      },
      {
        id: "language",
        name: "Jazyk",
        type: "multiselect",
        options: [
          { value: "en", label: "Angličtina", impact: 0, recommended: true },
        ],
      },
      {
        id: "access",
        name: "Přístup",
        type: "radio",
        options: [
          { value: "all", label: "Vše", impact: 0 },
          { value: "fullText", label: "Plný text dostupný", impact: -43, recommended: true },
        ],
      },
    ],
    validation: {
      requiredFilters: ["peerReview", "year"],
      recommendedCombination: {
        year: "last5",
        peerReview: true,
        documentType: ["clinical", "preclinical", "article"],
        access: "fullText",
      },
      targetRange: [10, 28],
    },
    scoring: {
      correctFilters: 40,
      appropriateResults: 30,
      qualityCriteria: 20,
      smartSelection: 10,
      maxScore: 100,
    },
    feedback: {
      perfect: "Perfektní filtrace farmakologických zdrojů!",
      goodFiltering: "Dobrá filtrace, ale zvažte klinické studie.",
      tooManyResults: "Příliš mnoho výsledků. Zaměřte se na studie.",
      tooFewResults: "Příliš úzké filtry. Rozšiřte typy studií.",
      missingQuality: "Farmakologie vyžaduje peer-review a klinické studie.",
      poor: "Zaměřte se na recenzované klinické studie.",
    },
  },
};

/**
 * Get Round 4 data for a specific faculty
 * @param {string} facultyId - Faculty identifier (ff, prf, lf, etc.)
 * @returns {object} Round 4 scenario and filter data
 */
export const getRound4Data = (facultyId) => {
  return round4DataByFaculty[facultyId] || round4DataByFaculty.ff;
};

export default round4DataByFaculty;
