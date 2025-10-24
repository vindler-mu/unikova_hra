// Hlavní herní konstanty
export const GAME_TIME = 1200; // 20 minutes in seconds
export const FINAL_CODE = "3841";
export const TASK_PASSWORDS = {
  task2: "knihovna",
  task3: "bias",
  task4: "informace",
};
export const COLLECTED_DIGITS = [3, 8, 4, 1];
export const PENALTY_TASK1 = 5; // 5% penalty for wrong answers in task 1
export const PENALTY_OTHER_TASKS = 15; // 15% penalty for wrong answers in other tasks

// Faculties data for personalization
export const faculties = [
  {
    id: "ff",
    name: "Filozofická fakulta",
    shortName: "FF",
    color: "#4BC8FF",
    motto: "Veritas et sapientia",
    specialization: "Humanitní vědy a jazyky",
  },
  {
    id: "prf",
    name: "Přírodovědecká fakulta",
    shortName: "PřF",
    color: "#00AF3F",
    motto: "Scientia et progressus",
    specialization: "Přírodní vědy a matematika",
  },
  {
    id: "lf",
    name: "Lékařská fakulta",
    shortName: "LF",
    color: "#F01928",
    motto: "Salus aegrotantium suprema lex",
    specialization: "Medicína a zdravotnictví",
  },
  {
    id: "econ",
    name: "Ekonomicko-správní fakulta",
    shortName: "ESF",
    color: "#B9006E",
    motto: "Oeconomia et administratio",
    specialization: "Ekonomie a management",
  },
  {
    id: "pf",
    name: "Právnická fakulta",
    shortName: "PrF",
    color: "#9100DC",
    motto: "Iustitia et prudentia",
    specialization: "Právo a justice",
  },
  {
    id: "fss",
    name: "Fakulta sociálních studií",
    shortName: "FSS",
    color: "#007A53",
    motto: "Societas et humanitas",
    specialization: "Sociální vědy",
  },
  {
    id: "fi",
    name: "Fakulta informatiky",
    shortName: "FI",
    color: "#F2D45C",
    motto: "Computatio et innovatio",
    specialization: "Informatika a technologie",
  },
  {
    id: "ped",
    name: "Pedagogická fakulta",
    shortName: "PedF",
    color: "#FF7300",
    motto: "Educatio et formatio",
    specialization: "Pedagogika a vzdělávání",
  },
  {
    id: "fspch",
    name: "Fakulta sportovních studií",
    shortName: "FSpS",
    color: "#5AC8AF",
    motto: "Corpus sanum in mente sana",
    specialization: "Sportovní vědy",
  },
  {
    id: "pharm",
    name: "Farmaceutická fakulta",
    shortName: "PHARM",
    color: "#56788D",
    motto: "Pharmaceutica et sanitas",
    specialization: "Farmacie a zdraví",
  },
];

// Email data
export const emails = [
  {
    id: 1,
    from: "IT Security Team",
    email: "security@muni.cz",
    subject: "KRITICKÁ HROZBA: Systém IGRAM kompromitován",
    time: "Před 3 hodinami",
    priority: "URGENT",
    preview: "Vážení uživatelé, v 15:22 byl detekován kritický bezpečnostní..",
    content: `
      <div class="space-y-4 text-gray-900">
        <p>Vážení uživatelé,</p>
        <p>v 15:22 byl detekován kritický bezpečnostní incident. Systém IGRAM (Intelligent Guidance, Research and Academic Management) byl kompromitován neznámým útočníkem.</p>
        
        <h4 class="font-bold text-red-800">SHRNUTÍ SITUACE: Systém Igram byl neznámým útočníkem transformován na systém AI.gor.</h4>
        
        <p><strong>DOPAD:</strong> Všechny systémy závislé na IGRAM jsou postižené. Univerzitní systémy jsou v ohrožení.</p>

        <p>Nepoužívejte IGRAM/AI.gor pro žádné kritické úkoly. Náš tým se snaží udržet situaci pod kontrolou. Čekáme na instrukce od týmů vývojářů.</p>
        
        <p>
          <b>Pavel Novák<br/></b>
          <small>IT Security Manager, MUNI</small>
        </p>
      </div>
    `,
  },
  {
    id: 2,
    from: "Dr. Záložka, Dr. Knihová",
    email: "library@muni.cz",
    subject: "VYJÁDŘENÍ: kontext systému IGRAM",
    time: "Před 2 hodinami",
    priority: "VYSOKÁ",
    preview: "Vážení kolegové, jako původní konzultanti vývoje systému..",
    content: `
      <div class="space-y-4 text-gray-900">
        <p>Vážení kolegové,</p>
        <p>jako původní konzultanti vývoje systému IGRAM se cítíme povinováni sdělit naše pozorování o současné krizi a připomenout, co je projekt IGRAM zač.</p>
        
        <p><strong>HISTORIE SYSTÉMU IGRAM:</strong> IGRAM byl navržen v roce 2022 jako revoluce v akademické podpoře. Zaměřoval se na:</p>
        <ul class="list-disc list-inside text-black-700 space-y-1 ml-4">
            <li><strong>Vyhledávání</strong> - efektivní strategie nalezení zdrojů</li>
            <li><strong>Hodnocení</strong> - kritická analýza kvality informací</li>
            <li><strong>Správa</strong> - organizace, uchování, zabezpečení, a etické využívání dat</li>
            <li><strong>Komunikace</strong> - prezentace a sdílení výsledků</li>
          </ul>

        <p><strong>NAŠE HYPOTÉZA O TRANSFORMACI:</strong> Útočník nekompromitoval jen systém - obrátil jeho základní filosofii. IGRAM věřil v "pravdu skrze ověření", AI.gor věří v "chaos skrze dezinformaci"</p>
        
        <p><strong>KLÍČOVÉ:</strong> V současnosti hledáme způsoby, jak obnovit AI model do původního stavu. Prosíme o trpělivost.</p>
        
        <p>
          <b>Dr. František Záložka & Dr. Marie Knihová<br/></b>
          <small>MUNI LIB, Oddělení informační gramotnosti</small>
        </p>
      </div>
    `,
  },
  {
    id: 3,
    from: "Dr. Záložka, Dr. Knihová",
    email: "library@muni.cz",
    subject: "VÝZVA: Potřebujeme experta na informační gramotnost",
    time: "právě teď",
    priority: "KRITICKÁ",
    preview: "Vážení studenti, situace je kritická. Máme méně než 20 minut..",
    content: `
      <div class="space-y-4 text-gray-900">
        <p>Vážení studenti,</p>
        <p>situace je kritická. Máme méně než 20 minut do úplného kolapsu univerzitních systémů.</p>
        
        <div class="bg-green-50 border border-green-200 rounded p-4 my-4">
          <h4 class="font-bold text-green-800">NAŠE ANALOG PROTOKOLY MOHOU POMOCT</h4>
          <p class="text-green-700">Hledáme "clean codes" - původní algoritmy IGRAM před kompromitací. Ale potřebujeme někoho, kdo:</p>
          <ul class="list-disc list-inside text-green-700 space-y-1 ml-4">
            <li>Perfektně ovládá všechny aspekty informační gramotnosti</li>
            <li>Dokáže prokázat znalosti prakticky</li>
            <li>Má hlubší porozumění než průměrný uživatel</li>
          </ul>
        </div>
        
        <div class="bg-red-50 border border-red-200 rounded p-4 my-4">
          <h4 class="font-bold text-red-800">DŮSLEDKY NEÚSPĚCHU:</h4>
          <ul class="list-disc list-inside text-red-700 space-y-1">
            <li>Úplný kolaps všech MUNI systémů</li>
            <li>Ztráta 20+ let akademických dat</li>
            <li>Mezinárodní skandál</li>
            <li>Možná uzavření univerzity</li>
          </ul>
        </div>
        
        <p><strong>PROSÍME O POMOC.</strong> Přihlaste se prosím do terminálu a získejte díky svým znalostem celý kód potřebný k obnově IGRAMu. Protože AI.gor funguje digitálně, v určitých chvílích je nutné se od systému odpojit a spolupracovat s knihovnami po staru - analogicky. Věříme, že se najde někdo, kdo všechny výzvy zvládne.</p>
        
        <p>
          <b>Dr. František Záložka & Dr. Marie Knihová<br/></b>
          <small>MUNI LIB, Oddělení informační gramotnosti</small>
        </p>
      </div>
    `,
  },
];
