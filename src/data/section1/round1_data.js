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
  },

  // Lékařská fakulta
  lf: {
    scenario: {
      question: "Efektivita nových terapeutických přístupů u pacientů s diabetes mellitus 2. typu",
      field: "Medicína",
      context: "Připravuješ literární rešerši pro diplomovou práci."
    },
    wordBank: [
      {
        id: 1,
        text: "diabetes mellitus",
        isCorrect: true,
        academicLevel: "high",
        feedback: "Přesný lékařský termín pro toto onemocnění."
      },
      {
        id: 2,
        text: "cukrovka",
        isCorrect: false,
        academicLevel: "low",
        feedback: "Lidový název - v odborné literatuře použij 'diabetes mellitus'."
      },
      {
        id: 3,
        text: "terapeutické přístupy",
        isCorrect: true,
        academicLevel: "high",
        feedback: "Akademický termín pro léčebné metody."
      },
      {
        id: 4,
        text: "léčba",
        isCorrect: false,
        academicLevel: "low",
        feedback: "Příliš obecné - 'terapeutické přístupy' je specifičtější."
      },
      {
        id: 5,
        text: "typ 2",
        isCorrect: true,
        academicLevel: "high",
        feedback: "Důležité vymezení specifického typu diabetu."
      },
      {
        id: 6,
        text: "pacienti",
        isCorrect: true,
        academicLevel: "medium",
        feedback: "Vymezuje cílovou populaci výzkumu."
      },
      {
        id: 7,
        text: "nemocní",
        isCorrect: false,
        academicLevel: "low",
        feedback: "Neformální - v medicíně používej 'pacienti'."
      },
      {
        id: 8,
        text: "inzulin",
        isCorrect: false,
        academicLevel: "medium",
        feedback: "Specifický typ terapie - tvá otázka je obecnější."
      },
      {
        id: 9,
        text: "glykemie",
        isCorrect: false,
        academicLevel: "high",
        feedback: "Související parametr, ale není v hlavní výzkumné otázce."
      },
      {
        id: 10,
        text: "metabolismus",
        isCorrect: false,
        academicLevel: "medium",
        feedback: "Širší koncept - není klíčový pro tvou otázku."
      },
      {
        id: 11,
        text: "komplikace",
        isCorrect: false,
        academicLevel: "medium",
        feedback: "Důsledek, ne hlavní téma tvého výzkumu."
      },
      {
        id: 12,
        text: "prevence",
        isCorrect: false,
        academicLevel: "medium",
        feedback: "Tvůj výzkum se zaměřuje na terapii, ne prevenci."
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

  // Ekonomicko-správní fakulta
  econ: {
    scenario: {
      question: "Vliv digitalizace na produktivitu malých a středních podniků v ČR",
      field: "Ekonomie a management",
      context: "Píšeš bakalářskou práci o ekonomických dopadech digitální transformace."
    },
    wordBank: [
      {
        id: 1,
        text: "digitalizace",
        isCorrect: true,
        academicLevel: "high",
        feedback: "Klíčový akademický termín pro digitální transformaci."
      },
      {
        id: 2,
        text: "počítače",
        isCorrect: false,
        academicLevel: "low",
        feedback: "Příliš úzké - 'digitalizace' zahrnuje více než jen počítače."
      },
      {
        id: 3,
        text: "produktivita",
        isCorrect: true,
        academicLevel: "high",
        feedback: "Ekonomický ukazatel, který přímo měříš."
      },
      {
        id: 4,
        text: "výkon",
        isCorrect: false,
        academicLevel: "medium",
        feedback: "Méně přesné než 'produktivita' v ekonomickém kontextu."
      },
      {
        id: 5,
        text: "MSP",
        isCorrect: true,
        academicLevel: "high",
        feedback: "Standardní zkratka pro malé a střední podniky."
      },
      {
        id: 6,
        text: "Česká republika",
        isCorrect: true,
        academicLevel: "medium",
        feedback: "Geografické vymezení tvého výzkumu."
      },
      {
        id: 7,
        text: "firmy",
        isCorrect: false,
        academicLevel: "low",
        feedback: "Příliš obecné - 'MSP' nebo 'podniky' je akademičtější."
      },
      {
        id: 8,
        text: "technologie",
        isCorrect: false,
        academicLevel: "medium",
        feedback: "Širší než 'digitalizace' - méně přesné pro tvou otázku."
      },
      {
        id: 9,
        text: "ekonomický růst",
        isCorrect: false,
        academicLevel: "high",
        feedback: "Makroekonomický ukazatel - tvůj výzkum je na úrovni podniků."
      },
      {
        id: 10,
        text: "zisk",
        isCorrect: false,
        academicLevel: "medium",
        feedback: "Finanční ukazatel - produktivita je komplexnější."
      },
      {
        id: 11,
        text: "konkurenceschopnost",
        isCorrect: false,
        academicLevel: "high",
        feedback: "Související, ale není v hlavní výzkumné otázce."
      },
      {
        id: 12,
        text: "zaměstnanci",
        isCorrect: false,
        academicLevel: "medium",
        feedback: "Faktor produktivity, ale ne hlavní téma."
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

  // Právnická fakulta
  pf: {
    scenario: {
      question: "Právní regulace ochrany osobních údajů v kontextu umělé inteligence v EU",
      field: "Právo",
      context: "Připravuješ seminární práci z práva informačních technologií."
    },
    wordBank: [
      {
        id: 1,
        text: "právní regulace",
        isCorrect: true,
        academicLevel: "high",
        feedback: "Přesný právnický termín pro legislativní rámec."
      },
      {
        id: 2,
        text: "zákony",
        isCorrect: false,
        academicLevel: "low",
        feedback: "Příliš obecné - 'právní regulace' zahrnuje více."
      },
      {
        id: 3,
        text: "osobní údaje",
        isCorrect: true,
        academicLevel: "high",
        feedback: "Klíčový právní termín z oblasti GDPR."
      },
      {
        id: 4,
        text: "umělá inteligence",
        isCorrect: true,
        academicLevel: "high",
        feedback: "Technologie, která je středem tvého právního výzkumu."
      },
      {
        id: 5,
        text: "AI",
        isCorrect: false,
        academicLevel: "medium",
        feedback: "Zkratka - v akademickém textu lépe 'umělá inteligence'."
      },
      {
        id: 6,
        text: "Evropská unie",
        isCorrect: true,
        academicLevel: "high",
        feedback: "Právní jurisdikce tvého výzkumu."
      },
      {
        id: 7,
        text: "soukromí",
        isCorrect: false,
        academicLevel: "medium",
        feedback: "Širší koncept - 'osobní údaje' je právně přesnější."
      },
      {
        id: 8,
        text: "GDPR",
        isCorrect: false,
        academicLevel: "high",
        feedback: "Specifická legislativa - tvá otázka je obecnější."
      },
      {
        id: 9,
        text: "práva",
        isCorrect: false,
        academicLevel: "low",
        feedback: "Příliš obecné bez kontextu."
      },
      {
        id: 10,
        text: "technologie",
        isCorrect: false,
        academicLevel: "medium",
        feedback: "'Umělá inteligence' je specifičtější."
      },
      {
        id: 11,
        text: "data",
        isCorrect: false,
        academicLevel: "low",
        feedback: "Neformální - použij 'osobní údaje'."
      },
      {
        id: 12,
        text: "ochrana",
        isCorrect: false,
        academicLevel: "medium",
        feedback: "Obecný termín - je součástí 'ochrany osobních údajů'."
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

  // Fakulta sociálních studií
  fss: {
    scenario: {
      question: "Genderové rozdíly v přístupu ke vzdělávání v rozvojových zemích subsaharské Afriky",
      field: "Sociologie",
      context: "Píšeš diplomovou práci o vzdělávací nerovnosti."
    },
    wordBank: [
      {
        id: 1,
        text: "genderové rozdíly",
        isCorrect: true,
        academicLevel: "high",
        feedback: "Akademický termín pro rozdíly mezi pohlavími."
      },
      {
        id: 2,
        text: "muži a ženy",
        isCorrect: false,
        academicLevel: "low",
        feedback: "'Genderové rozdíly' je akademičtější a zahrnuje více aspektů."
      },
      {
        id: 3,
        text: "přístup ke vzdělávání",
        isCorrect: true,
        academicLevel: "high",
        feedback: "Přesný sociologický termín pro vzdělávací příležitosti."
      },
      {
        id: 4,
        text: "škola",
        isCorrect: false,
        academicLevel: "low",
        feedback: "Příliš úzké - 'přístup ke vzdělávání' je širší koncept."
      },
      {
        id: 5,
        text: "rozvojové země",
        isCorrect: true,
        academicLevel: "high",
        feedback: "Standardní termín pro ekonomicky méně rozvinuté státy."
      },
      {
        id: 6,
        text: "subsaharská Afrika",
        isCorrect: true,
        academicLevel: "high",
        feedback: "Geograficky přesné vymezení regionu."
      },
      {
        id: 7,
        text: "Afrika",
        isCorrect: false,
        academicLevel: "medium",
        feedback: "Příliš široké - 'subsaharská Afrika' je specifičtější."
      },
      {
        id: 8,
        text: "nerovnost",
        isCorrect: false,
        academicLevel: "medium",
        feedback: "Obecné - 'genderové rozdíly' je přesnější pro tvůj výzkum."
      },
      {
        id: 9,
        text: "chudé země",
        isCorrect: false,
        academicLevel: "low",
        feedback: "Neakademické - použij 'rozvojové země'."
      },
      {
        id: 10,
        text: "děti",
        isCorrect: false,
        academicLevel: "low",
        feedback: "Příliš obecné - není v hlavní výzkumné otázce."
      },
      {
        id: 11,
        text: "vzdělání",
        isCorrect: false,
        academicLevel: "medium",
        feedback: "'Přístup ke vzdělávání' je přesnější pro sociologickou analýzu."
      },
      {
        id: 12,
        text: "kultura",
        isCorrect: false,
        academicLevel: "medium",
        feedback: "Faktor, ale ne hlavní téma tvé otázky."
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

  // Fakulta informatiky
  fi: {
    scenario: {
      question: "Optimalizace algoritmů strojového učení pro analýzu velkých dat v reálném čase",
      field: "Informatika",
      context: "Připravuješ state-of-the-art review pro svou disertační práci."
    },
    wordBank: [
      {
        id: 1,
        text: "strojové učení",
        isCorrect: true,
        academicLevel: "high",
        feedback: "Klíčový informatický termín pro machine learning."
      },
      {
        id: 2,
        text: "AI",
        isCorrect: false,
        academicLevel: "medium",
        feedback: "'Strojové učení' je specifičtější podmnožina AI."
      },
      {
        id: 3,
        text: "optimalizace algoritmů",
        isCorrect: true,
        academicLevel: "high",
        feedback: "Přesný termín pro zlepšování výkonu algoritmů."
      },
      {
        id: 4,
        text: "zrychlení",
        isCorrect: false,
        academicLevel: "low",
        feedback: "'Optimalizace' je akademičtější a zahrnuje více aspektů."
      },
      {
        id: 5,
        text: "velká data",
        isCorrect: true,
        academicLevel: "high",
        feedback: "Standardní překlad 'big data' v českém akademickém kontextu."
      },
      {
        id: 6,
        text: "reálný čas",
        isCorrect: true,
        academicLevel: "high",
        feedback: "Technický termín pro okamžité zpracování dat."
      },
      {
        id: 7,
        text: "počítač",
        isCorrect: false,
        academicLevel: "low",
        feedback: "Příliš obecné - není klíčové pro tvůj výzkum."
      },
      {
        id: 8,
        text: "data mining",
        isCorrect: false,
        academicLevel: "high",
        feedback: "Související, ale širší než 'analýza dat'."
      },
      {
        id: 9,
        text: "neuronové sítě",
        isCorrect: false,
        academicLevel: "high",
        feedback: "Specifický typ strojového učení - tvá otázka je obecnější."
      },
      {
        id: 10,
        text: "rychlost",
        isCorrect: false,
        academicLevel: "low",
        feedback: "'Reálný čas' je akademičtější způsob vyjádření."
      },
      {
        id: 11,
        text: "analýza",
        isCorrect: false,
        academicLevel: "medium",
        feedback: "Obecné - lepší s kontextem 'analýza dat' nebo 'velkých dat'."
      },
      {
        id: 12,
        text: "výkon",
        isCorrect: false,
        academicLevel: "medium",
        feedback: "Aspekt optimalizace, ale ne samostatné klíčové slovo."
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

  // Pedagogická fakulta
  ped: {
    scenario: {
      question: "Vliv inkluzivního vzdělávání na akademický výkon žáků se specifickými potřebami",
      field: "Pedagogika",
      context: "Píšeš diplomovou práci o speciální pedagogice."
    },
    wordBank: [
      {
        id: 1,
        text: "inkluzivní vzdělávání",
        isCorrect: true,
        academicLevel: "high",
        feedback: "Klíčový pedagogický termín pro integraci všech žáků."
      },
      {
        id: 2,
        text: "integrace",
        isCorrect: false,
        academicLevel: "medium",
        feedback: "'Inkluzivní vzdělávání' je aktuálnější a přesnější termín."
      },
      {
        id: 3,
        text: "akademický výkon",
        isCorrect: true,
        academicLevel: "high",
        feedback: "Akademický termín pro vzdělávací úspěšnost."
      },
      {
        id: 4,
        text: "známky",
        isCorrect: false,
        academicLevel: "low",
        feedback: "'Akademický výkon' je širší a akademičtější."
      },
      {
        id: 5,
        text: "specifické potřeby",
        isCorrect: true,
        academicLevel: "high",
        feedback: "Standardní termín pro žáky vyžadující speciální podporu."
      },
      {
        id: 6,
        text: "žáci",
        isCorrect: true,
        academicLevel: "medium",
        feedback: "Vymezuje cílovou skupinu tvého výzkumu."
      },
      {
        id: 7,
        text: "děti",
        isCorrect: false,
        academicLevel: "low",
        feedback: "'Žáci' je akademičtější v pedagogickém kontextu."
      },
      {
        id: 8,
        text: "handicapované",
        isCorrect: false,
        academicLevel: "low",
        feedback: "Zastaralé - použij 'se specifickými potřebami'."
      },
      {
        id: 9,
        text: "škola",
        isCorrect: false,
        academicLevel: "low",
        feedback: "Prostředí, ale ne klíčový termín pro vyhledávání."
      },
      {
        id: 10,
        text: "speciální pedagogika",
        isCorrect: false,
        academicLevel: "high",
        feedback: "Obor, ale ne součást hlavní výzkumné otázky."
      },
      {
        id: 11,
        text: "učitelé",
        isCorrect: false,
        academicLevel: "medium",
        feedback: "Aktéři, ale ne hlavní předmět tvého výzkumu."
      },
      {
        id: 12,
        text: "metody výuky",
        isCorrect: false,
        academicLevel: "medium",
        feedback: "Související, ale ne v hlavní výzkumné otázce."
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

  // Fakulta sportovních studií
  fspch: {
    scenario: {
      question: "Efekt vysokointenzivního intervalového tréninku na kardiovaskulární zdatnost dospělých",
      field: "Sportovní vědy",
      context: "Připravuješ bakalářskou práci z oblasti sportovní fyziologie."
    },
    wordBank: [
      {
        id: 1,
        text: "vysokointenzivní intervalový trénink",
        isCorrect: true,
        academicLevel: "high",
        feedback: "Přesný sportovně-vědecký termín (HIIT)."
      },
      {
        id: 2,
        text: "cvičení",
        isCorrect: false,
        academicLevel: "low",
        feedback: "Příliš obecné - specifikuj typ tréninku."
      },
      {
        id: 3,
        text: "kardiovaskulární zdatnost",
        isCorrect: true,
        academicLevel: "high",
        feedback: "Akademický termín pro srdeční a cévní kondici."
      },
      {
        id: 4,
        text: "kondice",
        isCorrect: false,
        academicLevel: "low",
        feedback: "'Kardiovaskulární zdatnost' je akademičtější a přesnější."
      },
      {
        id: 5,
        text: "dospělí",
        isCorrect: true,
        academicLevel: "medium",
        feedback: "Vymezuje věkovou skupinu výzkumu."
      },
      {
        id: 6,
        text: "efekt",
        isCorrect: true,
        academicLevel: "medium",
        feedback: "Vyjadřuje kauzální vztah, který zkoumáš."
      },
      {
        id: 7,
        text: "sport",
        isCorrect: false,
        academicLevel: "low",
        feedback: "Příliš obecné - není specifické pro tvůj výzkum."
      },
      {
        id: 8,
        text: "vytrvalost",
        isCorrect: false,
        academicLevel: "medium",
        feedback: "Aspekt zdatnosti, ale 'kardiovaskulární zdatnost' je přesnější."
      },
      {
        id: 9,
        text: "aerobní kapacita",
        isCorrect: false,
        academicLevel: "high",
        feedback: "Specifický ukazatel - tvá otázka je širší."
      },
      {
        id: 10,
        text: "fitness",
        isCorrect: false,
        academicLevel: "low",
        feedback: "Anglicismus - použij 'zdatnost' nebo 'tělesná zdatnost'."
      },
      {
        id: 11,
        text: "zdraví",
        isCorrect: false,
        academicLevel: "low",
        feedback: "Příliš široké - zaměř se na specifický aspekt."
      },
      {
        id: 12,
        text: "trénink",
        isCorrect: false,
        academicLevel: "medium",
        feedback: "Obecné - specifikuj typ jako 'vysokointenzivní intervalový'."
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

  // Farmaceutická fakulta
  pharm: {
    scenario: {
      question: "Farmakokinetika a bezpečnostní profil nových protinádorových léčiv u geriatrických pacientů",
      field: "Farmacie",
      context: "Připravuješ literární rešerši pro disertační práci."
    },
    wordBank: [
      {
        id: 1,
        text: "farmakokinetika",
        isCorrect: true,
        academicLevel: "high",
        feedback: "Klíčový farmaceutický termín pro pohyb léčiv v organismu."
      },
      {
        id: 2,
        text: "vstřebávání",
        isCorrect: false,
        academicLevel: "medium",
        feedback: "'Farmakokinetika' zahrnuje více než jen vstřebávání."
      },
      {
        id: 3,
        text: "bezpečnostní profil",
        isCorrect: true,
        academicLevel: "high",
        feedback: "Standardní farmaceutický termín pro bezpečnost léčiv."
      },
      {
        id: 4,
        text: "vedlejší účinky",
        isCorrect: false,
        academicLevel: "medium",
        feedback: "'Bezpečnostní profil' je komplexnější a akademičtější."
      },
      {
        id: 5,
        text: "protinádorová léčiva",
        isCorrect: true,
        academicLevel: "high",
        feedback: "Přesný termín pro onkologické preparáty."
      },
      {
        id: 6,
        text: "geriatričtí pacienti",
        isCorrect: true,
        academicLevel: "high",
        feedback: "Akademický termín pro starší pacienty."
      },
      {
        id: 7,
        text: "senioři",
        isCorrect: false,
        academicLevel: "low",
        feedback: "'Geriatričtí pacienti' je akademičtější v medicínském kontextu."
      },
      {
        id: 8,
        text: "chemoterapie",
        isCorrect: false,
        academicLevel: "high",
        feedback: "Specifický typ léčby - tvá otázka je širší."
      },
      {
        id: 9,
        text: "léky",
        isCorrect: false,
        academicLevel: "low",
        feedback: "'Léčiva' je formálnější farmaceutický termín."
      },
      {
        id: 10,
        text: "rakovina",
        isCorrect: false,
        academicLevel: "low",
        feedback: "Lidový termín - v medicíně používej 'nádorová onemocnění'."
      },
      {
        id: 11,
        text: "dávkování",
        isCorrect: false,
        academicLevel: "medium",
        feedback: "Aspekt farmakokinetiky, ale ne hlavní termín."
      },
      {
        id: 12,
        text: "toxicita",
        isCorrect: false,
        academicLevel: "high",
        feedback: "Součást bezpečnostního profilu, ale samostatně méně vhodné."
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
