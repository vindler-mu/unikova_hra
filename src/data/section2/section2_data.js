/**
 * Section 2: Information Evaluation Data
 * Hodnocení informací - Úniková hra zaměřená na informační gramotnost
 *
 * Round 1: Credibility Assessment (ranking/detective mode)
 * Round 2: Quality Evaluation (spot/checklist mode)
 * Round 3: Relevance Judgment (article selection)
 * Round 4: Fake News Detector (sorting game)
 */

const section2Data = {
  faculties: {
    ff: {
      code: "FF",
      name: "Filozofická fakulta",
      color: "#8B4513",
      icon: "📚",
      scenarios: [
        {
          id: "ff_eval_scenario_1",
          title: "Hodnocení zdrojů o sociálních médiích",
          difficulty: "medium",
          round1: {
            mode: "ranking",
            instruction: "Seřaď následující zdroje podle věrohodnosti od nejvěrohodnějšího po nejméně věrohodný.",
            sources: [
              {
                id: "ff_r1_s1",
                title: "Echo Chambers and Political Polarization on Social Media",
                authors: [
                  {
                    name: "Dr. Sarah Johnson",
                    affiliation: "Oxford University, Department of Politics",
                    credentials: "PhD in Political Science"
                  },
                  {
                    name: "Prof. Michael Chen",
                    affiliation: "Stanford University, Communication Department",
                    credentials: "PhD in Communication Studies"
                  }
                ],
                publication: {
                  name: "Political Communication",
                  type: "peer-reviewed journal",
                  impactFactor: 8.7,
                  isOpenAccess: false,
                  isPredatory: false
                },
                year: 2023,
                citations: 78,
                doi: "10.1080/10584609.2023.123456",
                credibilityScore: 95,
                redFlags: []
              },
              {
                id: "ff_r1_s2",
                title: "How Facebook Algorithms Shape Political Discourse",
                authors: [
                  {
                    name: "Jane Smith",
                    affiliation: "Independent Researcher",
                    credentials: null
                  }
                ],
                publication: {
                  name: "Medium.com",
                  type: "blog platform",
                  impactFactor: null,
                  isOpenAccess: true,
                  isPredatory: false
                },
                year: 2024,
                citations: 0,
                doi: null,
                credibilityScore: 25,
                redFlags: [
                  {
                    id: "no_peer_review",
                    type: "publication",
                    severity: "high",
                    description: "Není peer-reviewed, jen blogový příspěvek",
                    location: "journal_name"
                  },
                  {
                    id: "no_affiliation",
                    type: "author",
                    severity: "medium",
                    description: "Autor nemá instituční afiliaci",
                    location: "author_section"
                  }
                ]
              },
              {
                id: "ff_r1_s3",
                title: "Social Media Effects on Democracy: A Review",
                authors: [
                  {
                    name: "Dr. Emma Williams",
                    affiliation: "Harvard Kennedy School",
                    credentials: "PhD in Public Policy"
                  }
                ],
                publication: {
                  name: "Annual Review of Political Science",
                  type: "peer-reviewed journal",
                  impactFactor: 12.4,
                  isOpenAccess: false,
                  isPredatory: false
                },
                year: 2022,
                citations: 156,
                doi: "10.1146/annurev-polisci-051120-104415",
                credibilityScore: 98,
                redFlags: []
              },
              {
                id: "ff_r1_s4",
                title: "The Truth About Social Media Manipulation",
                authors: [
                  {
                    name: "Alex Conspiracy",
                    affiliation: null,
                    credentials: null
                  }
                ],
                publication: {
                  name: "TruthSeeker.net",
                  type: "conspiracy website",
                  impactFactor: null,
                  isOpenAccess: true,
                  isPredatory: false
                },
                year: 2024,
                citations: 0,
                doi: null,
                credibilityScore: 5,
                redFlags: [
                  {
                    id: "suspicious_domain",
                    type: "publication",
                    severity: "critical",
                    description: "Podezřelá doména spojená s konspiračními teoriemi",
                    location: "journal_name"
                  },
                  {
                    id: "anonymous_author",
                    type: "author",
                    severity: "critical",
                    description: "Pseudonymní autor bez jakékoliv afiliace",
                    location: "author_section"
                  }
                ]
              },
              {
                id: "ff_r1_s5",
                title: "Online Polarization in the Digital Age",
                authors: [
                  {
                    name: "Dr. Robert Kumar",
                    affiliation: "University of Mumbai",
                    credentials: "PhD in Sociology"
                  }
                ],
                publication: {
                  name: "International Journal of Social Media Studies",
                  type: "predatory journal",
                  impactFactor: null,
                  isOpenAccess: true,
                  isPredatory: true
                },
                year: 2023,
                citations: 3,
                doi: "10.5555/ijsms.2023.789",
                credibilityScore: 35,
                redFlags: [
                  {
                    id: "predatory_journal",
                    type: "publication",
                    severity: "critical",
                    description: "Predátorský časopis - přijímá články bez řádného recenzního řízení za poplatek",
                    location: "journal_name"
                  }
                ]
              }
            ]
          },
          round2: {
            mode: "spot",
            article: {
              title: "Impact of Social Media on Youth Political Engagement",
              abstract: "We conducted a groundbreaking study examining the effects of social media on political engagement. Our research PROVES that social media causes increased political participation among young people. We studied 12 university students over a period of 2 weeks using a survey method. The results show that 100% of participants became more politically active after using social media. These findings demonstrate the undeniable power of social media platforms. Our study was funded by a major social media company, but this had no influence on our results. The implications are clear: social media is the solution to youth political apathy.",
              problems: [
                {
                  id: "ff_r2_p1",
                  type: "small_sample",
                  severity: "high",
                  startIndex: 156,
                  endIndex: 177,
                  text: "12 university students",
                  explanation: "Vzorek 12 studentů je příliš malý pro zobecnění výsledků na celou populaci mladých lidí.",
                  hint: "Kolik účastníků měla studie?",
                  recommendation: "Pro zobecnitelné výsledky by bylo potřeba alespoň 100-200 účastníků z různých skupin."
                },
                {
                  id: "ff_r2_p2",
                  type: "strong_claim",
                  severity: "high",
                  startIndex: 80,
                  endIndex: 87,
                  text: "PROVES",
                  explanation: "Slovo 'PROVES' (dokazuje) je příliš silné tvrzení. Výzkum ukazuje korelaci, ne kauzalitu.",
                  hint: "Může observační studie něco 'dokázat'?",
                  recommendation: "Použít opatrnější formulace jako 'naznačuje', 'koreluje s', 'je spojeno s'."
                },
                {
                  id: "ff_r2_p3",
                  type: "short_duration",
                  severity: "medium",
                  startIndex: 189,
                  endIndex: 203,
                  text: "2 weeks",
                  explanation: "Dvoutýdenní studie je příliš krátká na měření změn v politickém chování.",
                  hint: "Jak dlouhá byla studie?",
                  recommendation: "Pro studium změn v chování je potřeba longitudinální design (měsíce až roky)."
                },
                {
                  id: "ff_r2_p4",
                  type: "perfect_results",
                  severity: "high",
                  startIndex: 244,
                  endIndex: 248,
                  text: "100%",
                  explanation: "100% efekt je v sociálních vědách extrémně nepravděpodobný a naznačuje problém s metodologií.",
                  hint: "Je realistické, že všichni účastníci reagovali stejně?",
                  recommendation: "Realistické studie ukazují variabilitu v odpovědích."
                },
                {
                  id: "ff_r2_p5",
                  type: "conflict_of_interest",
                  severity: "critical",
                  startIndex: 390,
                  endIndex: 449,
                  text: "funded by a major social media company",
                  explanation: "Financování od social media firmy představuje významný konflikt zájmů.",
                  hint: "Kdo financoval výzkum?",
                  recommendation: "Mělo by být diskutováno jako limitace studie."
                },
                {
                  id: "ff_r2_p6",
                  type: "overgeneralization",
                  severity: "medium",
                  startIndex: 506,
                  endIndex: 563,
                  text: "social media is the solution to youth political apathy",
                  explanation: "Příliš široké zobecnění z malé a krátké studie.",
                  hint: "Může jedna malá studie prokázat 'řešení'?",
                  recommendation: "Zdůraznit potřebu dalšího výzkumu a uvést limitace."
                }
              ]
            }
          },
          round3: {
            researchQuestion: "Jak sociální média ovlivňují politickou polarizaci v demokratických společnostech?",
            context: {
              faculty: "FF",
              workType: "Diplomová práce",
              field: "Politologie"
            },
            minSelection: 3,
            maxSelection: 5,
            articles: [
              {
                id: "ff_r3_a1",
                title: "Echo Chambers in Social Media: Mechanisms and Effects on Political Polarization",
                authors: ["Johnson, S.", "Chen, M."],
                year: 2023,
                journal: "Political Communication",
                abstract: "This study examines how algorithmic curation creates echo chambers that reinforce existing political beliefs. Using a mixed-methods approach with 500 participants, we find strong evidence for increased polarization in users exposed to algorithmically filtered content.",
                relevance: 5,
                perspective: "mechanisms",
                citations: 78,
                type: "empirical_study",
                isOpenAccess: false,
                relevanceFeedback: {
                  level: "highly_relevant",
                  reason: "Přímo odpovídá na výzkumnou otázku, zkoumá mechanismy polarizace na sociálních médiích.",
                  strengths: ["Empirická data", "Velký vzorek", "Aktuální výzkum"],
                  limitations: []
                }
              },
              {
                id: "ff_r3_a2",
                title: "The Role of Facebook Algorithms in Content Curation",
                authors: ["Williams, A."],
                year: 2022,
                journal: "New Media & Society",
                abstract: "An analysis of Facebook's algorithmic systems and their impact on what content users see. The study focuses on technical aspects of content filtering.",
                relevance: 3,
                perspective: "technical",
                citations: 45,
                type: "technical_analysis",
                isOpenAccess: true,
                relevanceFeedback: {
                  level: "relevant",
                  reason: "Relevantní pro pochopení mechanismů, ale nezkoumá přímo polarizaci.",
                  strengths: ["Technický detail", "Konkrétní platforma"],
                  limitations: ["Nezaměřuje se na politiku"]
                }
              },
              {
                id: "ff_r3_a3",
                title: "History of Television and Political Campaigns in the 20th Century",
                authors: ["Brown, R."],
                year: 2015,
                journal: "Journal of Communication History",
                abstract: "A comprehensive history of how television shaped political campaigns from the 1960s to 2000.",
                relevance: 0,
                perspective: "historical",
                citations: 234,
                type: "historical_analysis",
                isOpenAccess: false,
                relevanceFeedback: {
                  level: "irrelevant",
                  reason: "Jiné médium (televize), jiná éra. Není relevantní pro sociální média.",
                  strengths: ["Kvalitní historická analýza"],
                  limitations: ["Neřeší sociální média ani současnost"]
                }
              },
              {
                id: "ff_r3_a4",
                title: "Democracy in the Digital Age: A Comprehensive Review",
                authors: ["Kumar, P.", "Lee, S."],
                year: 2021,
                journal: "Annual Review of Political Science",
                abstract: "A systematic review of research on digital media and democracy, including sections on polarization, misinformation, and civic engagement.",
                relevance: 5,
                perspective: "overview",
                citations: 312,
                type: "review",
                isOpenAccess: false,
                relevanceFeedback: {
                  level: "highly_relevant",
                  reason: "Systematický přehled poskytuje teoretický základ a kontextualizuje problematiku polarizace.",
                  strengths: ["Komplexní přehled", "Hodně citací", "Foundational source"],
                  limitations: []
                }
              },
              {
                id: "ff_r3_a5",
                title: "Combating Political Polarization: Policy Recommendations",
                authors: ["Taylor, M."],
                year: 2024,
                journal: "Policy Studies Journal",
                abstract: "This paper proposes policy interventions to reduce political polarization, based on existing research findings.",
                relevance: 4,
                perspective: "solutions",
                citations: 12,
                type: "policy_analysis",
                isOpenAccess: true,
                relevanceFeedback: {
                  level: "relevant",
                  reason: "Relevantní pro diskusní část o možných řešeních, ale ne pro základní výzkum mechanismů.",
                  strengths: ["Aktuální", "Praktické implikace"],
                  limitations: ["Zaměřeno na řešení, ne analýzu problému"]
                }
              },
              {
                id: "ff_r3_a6",
                title: "Social Media Marketing Strategies for Political Campaigns",
                authors: ["Davis, J."],
                year: 2023,
                journal: "Journal of Political Marketing",
                abstract: "Best practices for political campaigns using social media platforms to reach voters.",
                relevance: 1,
                perspective: "marketing",
                citations: 28,
                type: "practical_guide",
                isOpenAccess: false,
                relevanceFeedback: {
                  level: "irrelevant",
                  reason: "Zaměřeno na marketing, ne na polarizaci. Jiný výzkumný záměr.",
                  strengths: [],
                  limitations: ["Praktický, ne akademický záměr", "Neřeší polarizaci"]
                }
              },
              {
                id: "ff_r3_a7",
                title: "Filter Bubbles and Selective Exposure: A Meta-Analysis",
                authors: ["Garcia, L.", "Wong, T."],
                year: 2022,
                journal: "Communication Research",
                abstract: "A meta-analysis of 47 studies examining the filter bubble effect and selective exposure to political information online.",
                relevance: 5,
                perspective: "meta-analysis",
                citations: 156,
                type: "meta-analysis",
                isOpenAccess: true,
                relevanceFeedback: {
                  level: "highly_relevant",
                  reason: "Meta-analýza poskytuje silný důkazní základ pro fenomén filtračních bublin.",
                  strengths: ["Vysoká důkazní síla", "Syntéza mnoha studií"],
                  limitations: []
                }
              },
              {
                id: "ff_r3_a8",
                title: "Youth Engagement on Instagram and TikTok",
                authors: ["Miller, K."],
                year: 2023,
                journal: "Youth Studies",
                abstract: "Explores how young people use Instagram and TikTok for entertainment and social connection.",
                relevance: 1,
                perspective: "youth_culture",
                citations: 34,
                type: "ethnography",
                isOpenAccess: false,
                relevanceFeedback: {
                  level: "partially_relevant",
                  reason: "Zkoumá sociální média a mladé lidi, ale nezaměřuje se na politiku ani polarizaci.",
                  strengths: ["Kvalitativní data"],
                  limitations: ["Jiné téma", "Nezaměřeno na politiku"]
                }
              },
              {
                id: "ff_r3_a9",
                title: "Affective Polarization in Online Political Discourse",
                authors: ["Anderson, B.", "Martinez, C."],
                year: 2024,
                journal: "Political Psychology",
                abstract: "Examines how emotional content on social media contributes to affective polarization between political groups.",
                relevance: 5,
                perspective: "psychological",
                citations: 23,
                type: "empirical_study",
                isOpenAccess: false,
                relevanceFeedback: {
                  level: "highly_relevant",
                  reason: "Zkoumá psychologické mechanismy polarizace na sociálních médiích.",
                  strengths: ["Aktuální", "Psychologická perspektiva"],
                  limitations: []
                }
              },
              {
                id: "ff_r3_a10",
                title: "Misinformation and Fake News on Social Media",
                authors: ["Peterson, R."],
                year: 2021,
                journal: "Information Society",
                abstract: "A study of how false information spreads on social media platforms and its impact on public discourse.",
                relevance: 3,
                perspective: "misinformation",
                citations: 189,
                type: "empirical_study",
                isOpenAccess: true,
                relevanceFeedback: {
                  level: "relevant",
                  reason: "Související téma - dezinformace mohou přispívat k polarizaci, ale není to hlavní zaměření.",
                  strengths: ["Důležité související téma", "Hodně citací"],
                  limitations: ["Není primárně o polarizaci"]
                }
              }
            ]
          },
          round4: {
            instruction: "Roztřiď následující zdroje do správných kategorií podle jejich věrohodnosti.",
            sources: [
              {
                id: "ff_r4_s1",
                title: "Political Polarization in the Age of Social Media",
                type: "Academic Article",
                url: "https://doi.org/10.1080/10584609.2023.123456",
                author: "Dr. Sarah Johnson, Oxford University",
                authorAffiliation: "Department of Politics, Oxford University",
                publication: "Political Communication (peer-reviewed)",
                year: 2023,
                citations: 78,
                isPeerReviewed: true,
                excerpt: "Using longitudinal data from 2,000 participants, we examine the relationship between social media use and political polarization...",
                correctCategory: "credible",
                explanation: "Peer-reviewed článek z renomovaného časopisu, autor má akademickou afiliaci, vysoký počet citací.",
                redFlags: []
              },
              {
                id: "ff_r4_s2",
                title: "Social Media's Impact on Democracy - Expert Analysis",
                type: "News Article",
                url: "https://www.bbc.com/news/technology/social-media-democracy",
                author: "Jane Reporter, BBC Technology Correspondent",
                authorAffiliation: "BBC News",
                publication: "BBC News",
                year: 2024,
                citations: null,
                isPeerReviewed: false,
                excerpt: "Experts warn that social media platforms may be contributing to increased political division. According to a new study published in Political Communication...",
                correctCategory: "news",
                explanation: "Seriózní zpravodajský zdroj (BBC), reportuje o akademickém výzkumu, ale není sám akademickým zdrojem.",
                redFlags: []
              },
              {
                id: "ff_r4_s3",
                title: "The Hidden Truth About Social Media Mind Control",
                type: "Blog Post",
                url: "https://truthawakening.blog/social-media-mind-control",
                author: "Anonymous Whistleblower",
                authorAffiliation: null,
                publication: "Truth Awakening Blog",
                year: 2024,
                citations: 0,
                isPeerReviewed: false,
                excerpt: "THEY don't want you to know this! Social media companies are using SECRET algorithms to CONTROL your thoughts and make you vote for their chosen candidates...",
                correctCategory: "fake",
                explanation: "Konspirace, anonymní autor, senzační jazyk, žádné důkazy, podezřelá doména.",
                redFlags: [
                  "Senzační kapitalizovaný text (THEY, SECRET, CONTROL)",
                  "Anonymní autor bez afiliace",
                  "Konspiratická rétorika",
                  "Žádné citace zdrojů",
                  "Podezřelá doména"
                ]
              },
              {
                id: "ff_r4_s4",
                title: "Impact of Digital Communication on Modern Society",
                type: "Academic Article",
                url: "https://www.ijdcs.com/article/2023/digital-communication",
                author: "Dr. Raj Patel",
                authorAffiliation: "University of Mumbai",
                publication: "International Journal of Digital Communication Studies",
                year: 2023,
                citations: 2,
                isPeerReviewed: true,
                excerpt: "This groundbreaking study reveals the profound effects of digital media...",
                correctCategory: "questionable",
                explanation: "Predátorský časopis (International Journal of...), velmi málo citací, přehnané tvrzení ('groundbreaking').",
                redFlags: [
                  "Podezřelý název časopisu (generický 'International Journal of...')",
                  "Velmi málo citací pro článek z roku 2023",
                  "Žádný impact faktor",
                  "Pravděpodobně predátorský časopis"
                ]
              },
              {
                id: "ff_r4_s5",
                title: "How I Quit Social Media and Found Happiness",
                type: "Personal Blog",
                url: "https://medium.com/@johndoe/quit-social-media",
                author: "John Doe",
                authorAffiliation: "Freelance Writer",
                publication: "Medium.com",
                year: 2024,
                citations: 0,
                isPeerReviewed: false,
                excerpt: "After 30 days without social media, my life completely changed. Here's my personal journey...",
                correctCategory: "questionable",
                explanation: "Osobní zkušenost, ne výzkum. Blog bez peer-review. Může být zajímavý, ale ne akademický zdroj.",
                redFlags: [
                  "Osobní anekdota, ne výzkum",
                  "Není peer-reviewed",
                  "Žádná metodologie",
                  "Blogová platforma"
                ]
              },
              {
                id: "ff_r4_s6",
                title: "Study: Social Media Use Linked to Political Engagement",
                type: "News Article",
                url: "https://www.theguardian.com/technology/2024/social-media-study",
                author: "Emma Wilson, Technology Editor",
                authorAffiliation: "The Guardian",
                publication: "The Guardian",
                year: 2024,
                citations: null,
                isPeerReviewed: false,
                excerpt: "A new peer-reviewed study from Stanford University suggests that social media use correlates with increased political engagement among young adults...",
                correctCategory: "news",
                explanation: "Kvalitní zpravodajství (The Guardian) reportující o peer-reviewed výzkumu. Ne primární zdroj, ale věrohodný.",
                redFlags: []
              },
              {
                id: "ff_r4_s7",
                title: "BOMBSHELL: Big Tech Caught Rigging Elections!",
                type: "Alternative News Site",
                url: "https://patriotnewsnetwork.com/big-tech-election-rigging",
                author: "Staff Writer",
                authorAffiliation: "Patriot News Network",
                publication: "Patriot News Network",
                year: 2024,
                citations: 0,
                isPeerReviewed: false,
                excerpt: "EXPLOSIVE documents reveal how Silicon Valley elites are manipulating elections through censorship and algorithm manipulation. Share this before it's deleted!",
                correctCategory: "fake",
                explanation: "Fake news web, senzační nadpis, emotivní jazyk, žádné důkazy, výzvy ke sdílení.",
                redFlags: [
                  "Clickbait nadpis (BOMBSHELL, EXPLOSIVE)",
                  "Emotivní manipulativní jazyk",
                  "Výzvy ke sdílení 'předtím než to smažou'",
                  "Žádné citace konkrétních zdrojů",
                  "Podezřelá doména s politickým názvem"
                ]
              },
              {
                id: "ff_r4_s8",
                title: "A Meta-Analysis of Social Media Effects on Political Attitudes",
                type: "Academic Review",
                url: "https://doi.org/10.1146/annurev-polisci-2024",
                author: "Prof. Maria Garcia, Harvard University",
                authorAffiliation: "Harvard Kennedy School",
                publication: "Annual Review of Political Science",
                year: 2024,
                citations: 234,
                isPeerReviewed: true,
                excerpt: "This comprehensive meta-analysis synthesizes findings from 127 studies examining social media's influence on political attitudes and behaviors...",
                correctCategory: "credible",
                explanation: "Vysoce prestižní časopis (Annual Review), meta-analýza, renomovaný autor z Harvard, vysoký počet citací.",
                redFlags: []
              }
            ]
          }
        }
      ]
    },
    prf: {
      code: "PrF",
      name: "Přírodovědecká fakulta",
      color: "#2E8B57",
      icon: "🔬",
      scenarios: [
        {
          id: "prf_eval_scenario_1",
          title: "Hodnocení klimatického výzkumu",
          difficulty: "medium",
          round1: {
            mode: "detective",
            instruction: "Prozkoumej následující zdroj a označ všechny problematické části (red flags).",
            source: {
              id: "prf_r1_detective",
              title: "Rapid Climate Change Effects on Marine Ecosystems",
              authors: [
                {
                  name: "Dr. John Smith",
                  affiliation: null,
                  credentials: "PhD"
                }
              ],
              publication: {
                name: "Global Science Journal",
                type: "open access journal",
                impactFactor: null,
                isOpenAccess: true,
                isPredatory: true
              },
              year: 2024,
              citations: 1,
              doi: "10.5555/gsj.2024.001",
              redFlags: [
                {
                  id: "no_affiliation",
                  type: "author",
                  severity: "high",
                  description: "Autor nemá uvedenou instituční afiliaci - nemůžeme ověřit jeho identitu a expertízu.",
                  location: "author_section"
                },
                {
                  id: "predatory_journal",
                  type: "publication",
                  severity: "critical",
                  description: "'Global Science Journal' je predátorský časopis - publikuje bez řádného peer-review za poplatek.",
                  location: "journal_name"
                },
                {
                  id: "no_impact_factor",
                  type: "publication",
                  severity: "medium",
                  description: "Časopis nemá impact faktor, což naznačuje nízký vliv v oboru.",
                  location: "journal_name"
                },
                {
                  id: "very_few_citations",
                  type: "metrics",
                  severity: "medium",
                  description: "Pouze 1 citace pro článek publikovaný v roce 2024 naznačuje nízký vliv.",
                  location: "metrics_section"
                }
              ]
            }
          },
          round2: {
            mode: "checklist",
            article: {
              title: "Temperature Effects on Coral Reef Biodiversity",
              abstract: "We studied coral reefs at three locations over six months. Temperature measurements showed an increase of 2°C. We observed some changes in fish populations. The data suggests that warming affects biodiversity.",
              checklistItems: [
                {
                  id: "prf_cl_1",
                  category: "methodology",
                  label: "Jasně definovaná výzkumná otázka",
                  isCorrect: false,
                  importance: "high",
                  explanation: "Výzkumná otázka není jasně formulována - 'studovali jsme' je vague."
                },
                {
                  id: "prf_cl_2",
                  category: "methodology",
                  label: "Dostatečná velikost vzorku",
                  isCorrect: false,
                  importance: "high",
                  explanation: "3 lokace a 6 měsíců je nedostatečné pro zobecnění."
                },
                {
                  id: "prf_cl_3",
                  category: "methodology",
                  label: "Detailně popsaná metodologie",
                  isCorrect: false,
                  importance: "high",
                  explanation: "Metodologie je velmi vague - chybí detaily měření, sampling strategie."
                },
                {
                  id: "prf_cl_4",
                  category: "results",
                  label: "Statistická analýza výsledků",
                  isCorrect: false,
                  importance: "high",
                  explanation: "Žádná zmínka o statistických testech nebo p-hodnotách."
                },
                {
                  id: "prf_cl_5",
                  category: "results",
                  label: "Kvantitativní data",
                  isCorrect: false,
                  importance: "medium",
                  explanation: "'Některé změny' je kvalitativní a vague - chybí konkrétní čísla."
                },
                {
                  id: "prf_cl_6",
                  category: "discussion",
                  label: "Diskuse limitací studie",
                  isCorrect: false,
                  importance: "high",
                  explanation: "Žádná diskuse limitací - krátká doba studie, malý vzorek."
                },
                {
                  id: "prf_cl_7",
                  category: "discussion",
                  label: "Opatrné formulace závěrů",
                  isCorrect: false,
                  importance: "medium",
                  explanation: "'Data naznačuje' je OK, ale chybí upozornění na limitace zobecnění."
                },
                {
                  id: "prf_cl_8",
                  category: "ethics",
                  label: "Etické schválení (pokud relevantní)",
                  isCorrect: true,
                  importance: "low",
                  explanation: "Pro observační environmentální studii typicky není potřeba."
                },
                {
                  id: "prf_cl_9",
                  category: "ethics",
                  label: "Prohlášení o střetu zájmů",
                  isCorrect: false,
                  importance: "medium",
                  explanation: "Chybí prohlášení o financování a konfliktu zájmů."
                },
                {
                  id: "prf_cl_10",
                  category: "methodology",
                  label: "Replicability - dostatek detailů pro zopakování",
                  isCorrect: false,
                  importance: "high",
                  explanation: "Velmi málo detailů - studie by nemohla být zopakována."
                }
              ]
            }
          },
          round3: {
            researchQuestion: "Jak klimatická změna ovlivňuje migrační vzorce mořských želv?",
            context: {
              faculty: "PřF",
              workType: "Bakalářská práce",
              field: "Ekologie"
            },
            minSelection: 3,
            maxSelection: 5,
            articles: [
              {
                id: "prf_r3_a1",
                title: "Ocean Warming and Sea Turtle Migration: A 20-Year Study",
                authors: ["Wallace, B.P.", "DiMatteo, A.D."],
                year: 2023,
                journal: "Global Change Biology",
                abstract: "Long-term tracking data from 1,200 sea turtles shows significant shifts in migration patterns correlated with ocean temperature changes.",
                relevance: 5,
                perspective: "empirical",
                citations: 134,
                type: "empirical_study",
                isOpenAccess: false,
                relevanceFeedback: {
                  level: "highly_relevant",
                  reason: "Přímo odpovídá na otázku - dlouhodobá studie migrace želv v kontextu klimatu.",
                  strengths: ["Velký dataset", "Longitudinální", "Peer-reviewed"],
                  limitations: []
                }
              },
              {
                id: "prf_r3_a2",
                title: "Climate Change Impacts on Marine Biodiversity",
                authors: ["Smith, J."],
                year: 2020,
                journal: "Nature Climate Change",
                abstract: "Comprehensive review of climate effects on various marine species including fish, mammals, and reptiles.",
                relevance: 3,
                perspective: "broad_review",
                citations: 456,
                type: "review",
                isOpenAccess: true,
                relevanceFeedback: {
                  level: "relevant",
                  reason: "Poskytuje kontext, ale mořské želvy jsou jen část širšího tématu.",
                  strengths: ["Vysoké citace", "Komplexní přehled"],
                  limitations: ["Není zaměřeno specificky na želvy"]
                }
              },
              {
                id: "prf_r3_a3",
                title: "Nesting Beach Selection by Loggerhead Turtles",
                authors: ["Garcia, M."],
                year: 2022,
                journal: "Marine Ecology Progress Series",
                abstract: "Study of factors influencing beach selection for nesting, including sand temperature and beach morphology.",
                relevance: 2,
                perspective: "nesting",
                citations: 23,
                type: "empirical_study",
                isOpenAccess: false,
                relevanceFeedback: {
                  level: "partially_relevant",
                  reason: "Souvisí s želvami a klimatem, ale zaměřuje se na hnízdění, ne migraci.",
                  strengths: ["Konkrétní druh", "Relevantní aspekt klimatu"],
                  limitations: ["Není o migraci"]
                }
              },
              {
                id: "prf_r3_a4",
                title: "Effects of Ocean Acidification on Coral Reefs",
                authors: ["Brown, T.", "Lee, K."],
                year: 2023,
                journal: "Science",
                abstract: "Experimental study showing how decreased pH affects coral calcification rates.",
                relevance: 0,
                perspective: "ocean_chemistry",
                citations: 289,
                type: "experimental",
                isOpenAccess: false,
                relevanceFeedback: {
                  level: "irrelevant",
                  reason: "Jiné téma - korály, ne želvy. Jiný aspekt klimatu - acidifikace, ne teplota.",
                  strengths: [],
                  limitations: ["Úplně jiný organismus a proces"]
                }
              }
            ]
          },
          round4: {
            instruction: "Roztřiď následující vědecké zdroje podle jejich věrohodnosti.",
            sources: [
              {
                id: "prf_r4_s1",
                title: "Climate-Driven Changes in Sea Turtle Migrations",
                type: "Research Article",
                url: "https://doi.org/10.1111/gcb.15234",
                author: "Dr. Emily Chen, Marine Biology Institute",
                publication: "Global Change Biology (IF: 11.5)",
                year: 2023,
                isPeerReviewed: true,
                correctCategory: "credible",
                explanation: "Vysoce kvalitní peer-reviewed časopis s vysokým IF, renomovaný autor.",
                redFlags: []
              },
              {
                id: "prf_r4_s2",
                title: "New Study Shows Sea Turtles Affected by Warming",
                type: "Science News",
                url: "https://www.sciencedaily.com/releases/2024/01/turtle-study",
                author: "Science Daily Staff",
                publication: "Science Daily",
                year: 2024,
                isPeerReviewed: false,
                correctCategory: "news",
                explanation: "Vědecký zpravodajský portál reportující o peer-reviewed výzkumu.",
                redFlags: []
              },
              {
                id: "prf_r4_s3",
                title: "SHOCKING: Climate Hoax Exposed by Turtle Data!",
                type: "Blog Post",
                url: "https://climateskeptic.org/turtle-hoax",
                author: "Climate Truth Warrior",
                publication: "Climate Skeptic Blog",
                year: 2024,
                isPeerReviewed: false,
                correctCategory: "fake",
                explanation: "Konspirace popírající klimatickou změnu, anonymní autor, senzační jazyk.",
                redFlags: [
                  "Clickbait nadpis",
                  "Popírá vědecký konsenzus",
                  "Anonymní autor",
                  "Podezřelá doména"
                ]
              }
            ]
          }
        }
      ]
    },
    lf: {
      code: "LF",
      name: "Lékařská fakulta",
      color: "#DC143C",
      icon: "⚕️",
      scenarios: [
        {
          id: "lf_eval_scenario_1",
          title: "Hodnocení klinického výzkumu",
          difficulty: "hard",
          round1: {
            mode: "ranking",
            instruction: "Seřaď následující medicínské zdroje podle věrohodnosti.",
            sources: [
              {
                id: "lf_r1_s1",
                title: "Efficacy of Intermittent Fasting in Type 2 Diabetes: A Randomized Controlled Trial",
                authors: [
                  {
                    name: "Dr. Sarah Johnson",
                    affiliation: "Mayo Clinic, Rochester, MN",
                    credentials: "MD, PhD, Endocrinology"
                  }
                ],
                publication: {
                  name: "The Lancet Diabetes & Endocrinology",
                  type: "peer-reviewed journal",
                  impactFactor: 44.5,
                  isOpenAccess: false,
                  isPredatory: false
                },
                year: 2023,
                citations: 156,
                doi: "10.1016/S2213-8587(23)00234-5",
                credibilityScore: 98,
                redFlags: []
              },
              {
                id: "lf_r1_s2",
                title: "Amazing Weight Loss Miracle: Intermittent Fasting Cures Diabetes!",
                authors: [
                  {
                    name: "Dr. Wellness",
                    affiliation: null,
                    credentials: "Natural Health Expert"
                  }
                ],
                publication: {
                  name: "HealthyLiving.com",
                  type: "commercial health website",
                  impactFactor: null,
                  isOpenAccess: true,
                  isPredatory: false
                },
                year: 2024,
                citations: 0,
                doi: null,
                credibilityScore: 10,
                redFlags: [
                  {
                    id: "sensational_claims",
                    type: "content",
                    severity: "critical",
                    description: "'Miracle cure' je nerealistické a zavádějící tvrzení",
                    location: "title"
                  },
                  {
                    id: "fake_credentials",
                    type: "author",
                    severity: "critical",
                    description: "'Natural Health Expert' není medicínská kvalifikace",
                    location: "author_section"
                  }
                ]
              },
              {
                id: "lf_r1_s3",
                title: "Intermittent Fasting and Metabolic Health: A Systematic Review",
                authors: [
                  {
                    name: "Prof. Maria Garcia",
                    affiliation: "Johns Hopkins University School of Medicine",
                    credentials: "MD, PhD"
                  }
                ],
                publication: {
                  name: "Cochrane Database of Systematic Reviews",
                  type: "systematic review database",
                  impactFactor: 12.0,
                  isOpenAccess: true,
                  isPredatory: false
                },
                year: 2023,
                citations: 289,
                doi: "10.1002/14651858.CD013496.pub2",
                credibilityScore: 100,
                redFlags: []
              }
            ]
          },
          round2: {
            mode: "spot",
            article: {
              title: "Revolutionary Treatment for Diabetes Through Intermittent Fasting",
              abstract: "We conducted a study on the effects of intermittent fasting on diabetes. Our research PROVES that fasting CURES diabetes in all patients. We studied 8 patients over 10 days. Results showed that 100% of participants had lower blood sugar after fasting. These findings are GROUNDBREAKING and will change medicine forever. This study was partially funded by a supplement company selling fasting aids, which had no influence on results. Our treatment protocol is now available for purchase on our website.",
              problems: [
                {
                  id: "lf_r2_p1",
                  type: "extremely_small_sample",
                  severity: "critical",
                  startIndex: 102,
                  endIndex: 112,
                  text: "8 patients",
                  explanation: "8 pacientů je extrémně malý vzorek pro klinickou studii. Minimum by bylo 30-50.",
                  recommendation: "Pro klinickou studii diabetes je potřeba alespoň 50-100 pacientů."
                },
                {
                  id: "lf_r2_p2",
                  type: "overly_strong_claim",
                  severity: "critical",
                  startIndex: 47,
                  endIndex: 68,
                  text: "CURES diabetes",
                  explanation: "Diabetes typ 2 nelze 'vyléčit', pouze řídit. Toto je nebezpečně zavádějící tvrzení.",
                  recommendation: "Použít 'může pomoci řídit' nebo 'zlepšit kontrolu glukózy'."
                },
                {
                  id: "lf_r2_p3",
                  type: "insufficient_duration",
                  severity: "high",
                  startIndex: 118,
                  endIndex: 126,
                  text: "10 days",
                  explanation: "10 dní je nedostatečné pro hodnocení dlouhodobých efektů na diabetes.",
                  recommendation: "Minimálně 3-6 měsíců pro diabetes studie."
                },
                {
                  id: "lf_r2_p4",
                  type: "unrealistic_results",
                  severity: "high",
                  startIndex: 150,
                  endIndex: 154,
                  text: "100%",
                  explanation: "100% odpověď je v medicíně extrémně nepravděpodobná.",
                  recommendation: "Realistické studie ukazují variabilitu v odpovědích pacientů."
                },
                {
                  id: "lf_r2_p5",
                  type: "commercial_conflict",
                  severity: "critical",
                  startIndex: 280,
                  endIndex: 340,
                  text: "funded by a supplement company selling fasting aids",
                  explanation: "Závažný konflikt zájmů - firma profituje z pozitivních výsledků.",
                  recommendation: "Takový konflikt zájmů diskvalifikuje studii bez nezávislé replikace."
                },
                {
                  id: "lf_r2_p6",
                  type: "commercial_promotion",
                  severity: "critical",
                  startIndex: 392,
                  endIndex: 450,
                  text: "protocol is now available for purchase on our website",
                  explanation: "Akademický výzkum neprodává 'protokoly'. Toto je komerční propagace.",
                  recommendation: "Výzkum by měl být sdílen otevřeně, ne prodáván."
                }
              ]
            }
          },
          round3: {
            researchQuestion: "Jaké jsou účinky intermitentního hladovění na metabolismus a inzulínovou rezistenci?",
            context: {
              faculty: "LF",
              workType: "Diplomová práce",
              field: "Preventivní medicína"
            },
            minSelection: 3,
            maxSelection: 5,
            articles: [
              {
                id: "lf_r3_a1",
                title: "Intermittent Fasting and Insulin Sensitivity: A Meta-Analysis of Clinical Trials",
                authors: ["Martinez, C.", "Schmidt, K."],
                year: 2023,
                journal: "Diabetes Care",
                abstract: "Meta-analysis of 24 RCTs examining intermittent fasting effects on insulin sensitivity and glucose metabolism.",
                relevance: 5,
                perspective: "meta-analysis",
                citations: 178,
                type: "meta-analysis",
                isOpenAccess: false,
                relevanceFeedback: {
                  level: "highly_relevant",
                  reason: "Meta-analýza poskytuje nejsilnější důkaz - přímo odpovídá na otázku.",
                  strengths: ["Nejvyšší úroveň důkazů", "Syntéza mnoha RCT"],
                  limitations: []
                }
              },
              {
                id: "lf_r3_a2",
                title: "Time-Restricted Eating in Adults with Prediabetes: A Randomized Controlled Trial",
                authors: ["Liu, Y.", "Patel, S."],
                year: 2024,
                journal: "JAMA Internal Medicine",
                abstract: "12-week RCT of 150 adults with prediabetes examining effects of time-restricted eating on metabolic markers.",
                relevance: 5,
                perspective: "empirical_rct",
                citations: 45,
                type: "rct",
                isOpenAccess: true,
                relevanceFeedback: {
                  level: "highly_relevant",
                  reason: "RCT je zlatý standard - přímo testuje intermittent fasting na metabolismus.",
                  strengths: ["Randomizovaná kontrola", "Relevantní populace"],
                  limitations: []
                }
              },
              {
                id: "lf_r3_a3",
                title: "Nutrition and Exercise in Diabetes Management",
                authors: ["Brown, R."],
                year: 2020,
                journal: "New England Journal of Medicine",
                abstract: "Comprehensive review of lifestyle interventions for diabetes, including diet and exercise.",
                relevance: 2,
                perspective: "broad_lifestyle",
                citations: 890,
                type: "review",
                isOpenAccess: false,
                relevanceFeedback: {
                  level: "partially_relevant",
                  reason: "Pokrývá nutrici, ale intermittent fasting je jen malá část.",
                  strengths: ["Vysoké citace", "Prestižní časopis"],
                  limitations: ["Není zaměřeno na IF"]
                }
              }
            ]
          },
          round4: {
            instruction: "Roztřiď následující medicínské zdroje podle věrohodnosti.",
            sources: [
              {
                id: "lf_r4_s1",
                title: "Intermittent Fasting and Metabolic Health: A Systematic Review",
                type: "Systematic Review",
                url: "https://doi.org/10.1002/14651858.CD013496",
                author: "Cochrane Collaboration",
                publication: "Cochrane Database of Systematic Reviews",
                year: 2023,
                isPeerReviewed: true,
                correctCategory: "credible",
                explanation: "Cochrane reviews jsou zlatý standard evidence-based medicine.",
                redFlags: []
              },
              {
                id: "lf_r4_s2",
                title: "Fasting Miracle: Lose Weight Without Trying!",
                type: "Advertisement",
                url: "https://fastingmiraclepills.com/buy-now",
                author: "FastingMiracle LLC",
                publication: "Commercial Website",
                year: 2024,
                isPeerReviewed: false,
                correctCategory: "fake",
                explanation: "Komerční reklama vydávající se za vědecký obsah.",
                redFlags: [
                  "Prodej produktu",
                  "'Miracle' claims",
                  "Nerealistická tvrzení",
                  "Žádná vědecká evidence"
                ]
              }
            ]
          }
        }
      ]
    },
    prf_law: {
      code: "PrF_law",
      name: "Právnická fakulta",
      color: "#1E3A8A",
      icon: "⚖️",
      scenarios: [
        {
          id: "prf_law_eval_scenario_1",
          title: "Hodnocení právních zdrojů",
          difficulty: "medium",
          round1: {
            mode: "ranking",
            instruction: "Seřaď následující právní zdroje podle věrohodnosti.",
            sources: [
              {
                id: "prflaw_r1_s1",
                title: "The Right to Privacy in the Digital Age: A Comparative Analysis",
                authors: [
                  {
                    name: "Prof. Anna Schmidt",
                    affiliation: "Max Planck Institute for Innovation and Competition",
                    credentials: "Dr. iur., Professor of Law"
                  }
                ],
                publication: {
                  name: "European Law Journal",
                  type: "peer-reviewed journal",
                  impactFactor: 3.2,
                  isOpenAccess: false,
                  isPredatory: false
                },
                year: 2023,
                citations: 67,
                doi: "10.1111/eulj.12456",
                credibilityScore: 95,
                redFlags: []
              },
              {
                id: "prflaw_r1_s2",
                title: "GDPR Implementation Guide",
                authors: [
                  {
                    name: "European Commission",
                    affiliation: "European Union",
                    credentials: "Official EU Body"
                  }
                ],
                publication: {
                  name: "EUR-Lex",
                  type: "official EU documentation",
                  impactFactor: null,
                  isOpenAccess: true,
                  isPredatory: false
                },
                year: 2024,
                citations: 2340,
                doi: null,
                credibilityScore: 100,
                redFlags: []
              },
              {
                id: "prflaw_r1_s3",
                title: "Privacy Law in Practice",
                authors: [
                  {
                    name: "John Legal Blogger",
                    affiliation: null,
                    credentials: "JD"
                  }
                ],
                publication: {
                  name: "LegalBlog.com",
                  type: "legal blog",
                  impactFactor: null,
                  isOpenAccess: true,
                  isPredatory: false
                },
                year: 2024,
                citations: 0,
                doi: null,
                credibilityScore: 40,
                redFlags: [
                  {
                    id: "no_peer_review",
                    type: "publication",
                    severity: "medium",
                    description: "Blog není peer-reviewed",
                    location: "journal_name"
                  }
                ]
              }
            ]
          },
          round2: {
            mode: "checklist",
            article: {
              title: "Analysis of GDPR Enforcement Practices",
              abstract: "This paper discusses GDPR enforcement. We looked at some cases. The data shows enforcement is happening. GDPR is important for privacy.",
              checklistItems: [
                {
                  id: "law_cl_1",
                  category: "methodology",
                  label: "Jasně definovaný výzkumný záměr",
                  isCorrect: false,
                  importance: "high",
                  explanation: "Výzkumný záměr je velmi vague."
                },
                {
                  id: "law_cl_2",
                  category: "methodology",
                  label: "Detailní analýza judikatury",
                  isCorrect: false,
                  importance: "high",
                  explanation: "'Některé případy' není specifické - chybí konkrétní rozsudky."
                },
                {
                  id: "law_cl_3",
                  category: "results",
                  label: "Citace konkrétních právních předpisů",
                  isCorrect: false,
                  importance: "high",
                  explanation: "Obecná zmínka GDPR bez citace konkrétních článků."
                },
                {
                  id: "law_cl_4",
                  category: "discussion",
                  label: "Kritická analýza právní úpravy",
                  isCorrect: false,
                  importance: "medium",
                  explanation: "'GDPR je důležité' není kritická analýza."
                }
              ]
            }
          },
          round3: {
            researchQuestion: "Jak Evropská unie reguluje ochranu osobních údajů prostřednictvím GDPR?",
            context: {
              faculty: "PrF",
              workType: "Diplomová práce",
              field: "Evropské právo"
            },
            minSelection: 3,
            maxSelection: 5,
            articles: [
              {
                id: "prflaw_r3_a1",
                title: "The General Data Protection Regulation: A Commentary",
                authors: ["Kuner, C.", "Bygrave, L."],
                year: 2020,
                journal: "Oxford University Press",
                abstract: "Comprehensive article-by-article commentary on GDPR provisions.",
                relevance: 5,
                perspective: "comprehensive_commentary",
                citations: 456,
                type: "book",
                isOpenAccess: false,
                relevanceFeedback: {
                  level: "highly_relevant",
                  reason: "Autoritativní komentář k GDPR - foundational source.",
                  strengths: ["Komplexní", "Autoritativní autoři"],
                  limitations: []
                }
              }
            ]
          },
          round4: {
            instruction: "Roztřiď následující právní zdroje.",
            sources: [
              {
                id: "prflaw_r4_s1",
                title: "GDPR Compliance Guide",
                type: "Official Document",
                url: "https://eur-lex.europa.eu/eli/reg/2016/679",
                author: "European Union",
                publication: "EUR-Lex",
                year: 2016,
                isPeerReviewed: false,
                correctCategory: "credible",
                explanation: "Oficiální právní dokument EU.",
                redFlags: []
              },
              {
                id: "prflaw_r4_s2",
                title: "How to Avoid GDPR Fines - Secret Loopholes!",
                type: "Blog Post",
                url: "https://gdpr-loopholes.biz/secrets",
                author: "Privacy Hacker",
                publication: "Underground Privacy Blog",
                year: 2024,
                isPeerReviewed: false,
                correctCategory: "fake",
                explanation: "Podezřelý obsah nabízející 'loopholes' v zákoně.",
                redFlags: [
                  "Clickbait",
                  "Právně problematické rady",
                  "Podezřelá doména"
                ]
              }
            ]
          }
        }
      ]
    },
    esf: {
      code: "ESF",
      name: "Ekonomicko-správní fakulta",
      color: "#FF8C00",
      icon: "💼",
      scenarios: [
        {
          id: "esf_eval_scenario_1",
          title: "Hodnocení ekonomického výzkumu",
          difficulty: "medium",
          round1: {
            mode: "ranking",
            instruction: "Seřaď následující ekonomické zdroje.",
            sources: [
              {
                id: "esf_r1_s1",
                title: "ESG Criteria and Corporate Financial Performance: A Meta-Analysis",
                authors: [
                  {
                    name: "Prof. Robert Anderson",
                    affiliation: "MIT Sloan School of Management",
                    credentials: "PhD in Finance"
                  }
                ],
                publication: {
                  name: "Journal of Finance",
                  type: "peer-reviewed journal",
                  impactFactor: 8.3,
                  isOpenAccess: false,
                  isPredatory: false
                },
                year: 2023,
                citations: 234,
                doi: "10.1111/jofi.13156",
                credibilityScore: 98,
                redFlags: []
              },
              {
                id: "esf_r1_s2",
                title: "Get Rich Quick with ESG Investing!",
                authors: [
                  {
                    name: "Money Guru",
                    affiliation: null,
                    credentials: "Financial Influencer"
                  }
                ],
                publication: {
                  name: "InvestmentGuru.blog",
                  type: "investment blog",
                  impactFactor: null,
                  isOpenAccess: true,
                  isPredatory: false
                },
                year: 2024,
                citations: 0,
                doi: null,
                credibilityScore: 15,
                redFlags: [
                  {
                    id: "get_rich_quick",
                    type: "content",
                    severity: "high",
                    description: "'Get rich quick' je red flag pro nerealistická očekávání",
                    location: "title"
                  }
                ]
              }
            ]
          },
          round2: {
            mode: "spot",
            article: {
              title: "ESG Investment Returns Study",
              abstract: "We analyzed ESG investment returns. Our data PROVES that ESG investing guarantees higher returns. We studied 5 companies over 3 months. Results show ESG funds always outperform. This study was funded by an ESG investment firm.",
              problems: [
                {
                  id: "esf_r2_p1",
                  type: "overpromise",
                  severity: "high",
                  startIndex: 47,
                  endIndex: 72,
                  text: "guarantees higher returns",
                  explanation: "Žádná investice nemůže 'garantovat' výnosy - zavádějící tvrzení.",
                  recommendation: "Použít 'může být spojena s' nebo 'ukazuje korelaci'."
                },
                {
                  id: "esf_r2_p2",
                  type: "tiny_sample",
                  severity: "critical",
                  startIndex: 84,
                  endIndex: 95,
                  text: "5 companies",
                  explanation: "5 firem je nereprezentativní vzorek.",
                  recommendation: "Pro zobecnitelné závěry potřeba stovky firem."
                },
                {
                  id: "esf_r2_p3",
                  type: "short_period",
                  severity: "high",
                  startIndex: 101,
                  endIndex: 110,
                  text: "3 months",
                  explanation: "3 měsíce je příliš krátké pro hodnocení investičních výnosů.",
                  recommendation: "Minimálně 5-10 let pro meaningful analýzu."
                },
                {
                  id: "esf_r2_p4",
                  type: "conflict",
                  severity: "critical",
                  startIndex: 167,
                  endIndex: 205,
                  text: "funded by an ESG investment firm",
                  explanation: "Závažný konflikt zájmů - firma profituje z pozitivních výsledků.",
                  recommendation: "Takový konflikt zájmů vyžaduje nezávislou replikaci."
                }
              ]
            }
          },
          round3: {
            researchQuestion: "Jak ESG kritéria ovlivňují finanční výkonnost firem?",
            context: {
              faculty: "ESF",
              workType: "Diplomová práce",
              field: "Finanční management"
            },
            minSelection: 3,
            maxSelection: 5,
            articles: [
              {
                id: "esf_r3_a1",
                title: "ESG and Firm Performance: Empirical Evidence from 2000 Companies",
                authors: ["Kim, S.", "Nguyen, T."],
                year: 2023,
                journal: "Strategic Management Journal",
                abstract: "Large-scale empirical study examining relationship between ESG scores and financial metrics.",
                relevance: 5,
                perspective: "empirical",
                citations: 145,
                type: "empirical_study",
                isOpenAccess: false,
                relevanceFeedback: {
                  level: "highly_relevant",
                  reason: "Velká empirická studie přímo odpovídající na otázku.",
                  strengths: ["Velký dataset", "Přímá relevance"],
                  limitations: []
                }
              }
            ]
          },
          round4: {
            instruction: "Roztřiď následující ekonomické zdroje.",
            sources: [
              {
                id: "esf_r4_s1",
                title: "ESG Integration and Financial Performance: A Meta-Analysis",
                type: "Research Article",
                url: "https://doi.org/10.1111/jbfa.12555",
                author: "Prof. Sarah Chen, Harvard Business School",
                publication: "Journal of Business Finance & Accounting",
                year: 2023,
                isPeerReviewed: true,
                correctCategory: "credible",
                explanation: "Peer-reviewed meta-analýza z prestižní instituce.",
                redFlags: []
              },
              {
                id: "esf_r4_s2",
                title: "ESG is a Scam - The Truth Big Finance Hides!",
                type: "Blog Post",
                url: "https://finance-truth.net/esg-scam",
                author: "Truth Seeker 2024",
                publication: "Alternative Finance Blog",
                year: 2024,
                isPeerReviewed: false,
                correctCategory: "fake",
                explanation: "Konspirace bez důkazů, anonymní autor, emotivní jazyk.",
                redFlags: [
                  "Konspiratická rétorika",
                  "Anonymní autor",
                  "Žádné citace",
                  "Emotivní manipulace"
                ]
              }
            ]
          }
        }
      ]
    }
  },
  metadata: {
    version: "1.0",
    created: "2024-10-24",
    description: "Datová struktura pro Oddíl 2: Hodnocení informací - Úniková hra zaměřená na informační gramotnost",
    totalFaculties: 5,
    roundsPerScenario: 4,
    evaluationSkills: [
      "Hodnocení věrohodnosti autora a zdroje",
      "Hodnocení kvality obsahu a metodologie",
      "Posouzení relevance pro výzkum",
      "Detekce fake news a dezinformací"
    ]
  }
};

/**
 * Get scenario data for a specific faculty
 * @param {string} facultyId - Faculty ID (ff, prf, lf, prf_law, esf)
 * @returns {object} Scenario data for the faculty
 */
export const getScenarioByFaculty = (facultyId) => {
  const normalizedId = facultyId.toLowerCase();
  const faculty = section2Data.faculties[normalizedId];

  if (!faculty) {
    console.warn(`Faculty not found: ${facultyId}, defaulting to FF`);
    return section2Data.faculties.ff.scenarios[0];
  }

  return faculty.scenarios[0]; // Return first scenario
};

/**
 * Get faculty metadata
 * @param {string} facultyId - Faculty ID
 * @returns {object} Faculty metadata (name, color, icon)
 */
export const getFacultyMetadata = (facultyId) => {
  const normalizedId = facultyId.toLowerCase();
  const faculty = section2Data.faculties[normalizedId];

  if (!faculty) {
    return section2Data.faculties.ff;
  }

  return {
    code: faculty.code,
    name: faculty.name,
    color: faculty.color,
    icon: faculty.icon
  };
};

export default section2Data;
