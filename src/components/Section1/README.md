# Section 1: Akademické vyhledávání informací

## 📋 Přehled

Section 1 obsahuje 4 propojená kola, která simulují kompletní proces akademického vyhledávání:

1. **Round 1: Identifikace klíčových slov** ✅ HOTOVO
2. **Round 2: Booleovské operátory** 🚧 TODO
3. **Round 3: Výběr databáze** 🚧 TODO
4. **Round 4: Filtrace výsledků** 🚧 TODO

## ✅ Round 1: Implementováno

### Komponenty

```
Section1/
├── Round1_KeywordSelection/
│   ├── KeywordSelection.jsx        # Hlavní komponenta
│   ├── WordBank.jsx                # Banka slov
│   ├── SelectionArea.jsx           # Vybraná slova
│   ├── ValidationFeedback.jsx      # Feedback
│   └── index.js                    # Export
├── Section1Container.jsx           # Wrapper pro všechna kola
└── README.md                       # Tato dokumentace
```

### Datová struktura

Data jsou v `/src/data/section1/round1_data.js`:

```javascript
{
  scenario: {
    question: "Výzkumná otázka...",
    field: "Obor",
    context: "Kontext úkolu..."
  },
  wordBank: [
    {
      id: 1,
      text: "sociální média",
      isCorrect: true,
      academicLevel: "high",
      feedback: "Vysvětlení..."
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
```

## 🔧 Integrace do App.js

### Varianta 1: Nahradit Task1 (doporučeno)

V `App.js`, nahraďte použití `TaskScreen` pro task1 s `Section1Container`:

```javascript
import Section1Container from "./components/Section1/Section1Container";

// V render části, místo TaskScreen pro task 1:
if (currentTask === 0 && !taskStates.task1.completed) {
  return (
    <Section1Container
      facultyId={selectedFaculty?.id || "ff"}
      facultyColor={selectedFaculty?.color}
      onSectionComplete={(result) => {
        // Zpracuj dokončení Section 1
        handleTaskComplete(0); // Mark task 1 as complete
        setCollectedDigits((prev) => [...prev, COLLECTED_DIGITS[0]]);
        setCompletedTasks((prev) => prev + 1);

        // Přejdi na debriefing
        setShowDebriefing(0);
      }}
    />
  );
}
```

### Varianta 2: Přidat jako nový režim

Nebo přidejte jako alternativní režim/easter egg:

```javascript
// V App.js state
const [showSection1, setShowSection1] = useState(false);

// V BriefingScreen pro task 1, přidat tlačítko:
<button onClick={() => setShowSection1(true)}>
  🎮 Interaktivní režim
</button>

// V render:
if (showSection1) {
  return (
    <Section1Container
      facultyId={selectedFaculty?.id}
      facultyColor={selectedFaculty?.color}
      onSectionComplete={(result) => {
        setShowSection1(false);
        handleTaskComplete(0);
      }}
    />
  );
}
```

## 📊 Scoring System

### Body za Round 1:
- **+20 bodů** za každé správné slovo
- **-10 bodů** za každé nesprávné slovo
- **+10 bodů** bonus za "high" academic level
- **Maximum: 100 bodů**

### Performance tiers:
- 90-100%: 🏆 Vynikající
- 75-89%: ⭐ Velmi dobré
- 60-74%: ✓ Dobré
- 40-59%: ⚠️ Průměrné
- 0-39%: ✗ Nedostatečné

## 🎨 Přizpůsobení

### Fakultní barvy

Section1Container přijímá `facultyColor` prop pro theming:

```javascript
<Section1Container
  facultyId="ff"
  facultyColor="#4BC8FF"  // Barva FF
  onSectionComplete={...}
/>
```

### Vlastní data

Upravte `/src/data/section1/round1_data.js` a přidejte data pro vaše fakulty:

```javascript
export const round1Data = {
  ff: { ... },    // Filozofická
  prf: { ... },   // Přírodovědecká
  lf: { ... },    // Lékařská
  // atd.
};
```

## 🧪 Testování

### Standalone test:

```javascript
// Vytvořte test soubor nebo použijte v App.js dočasně
import Section1Container from "./components/Section1/Section1Container";

function TestSection1() {
  return (
    <Section1Container
      facultyId="ff"
      facultyColor="#4BC8FF"
      onSectionComplete={(result) => {
        console.log("Section 1 completed:", result);
        // result obsahuje:
        // - totalScore
        // - maxScore
        // - percentage
        // - roundResults
      }}
    />
  );
}
```

### Console testing:

Otevřete console a sledujte:
- Výběr slov
- Validaci
- Výpočet skóre

## 🚀 Další kroky

### Implementace dalších kol:

1. **Round 2: Boolean Operators**
   - Komponenty: BooleanBuilder, SearchBar, OperatorButtons, ResultsCounter
   - Simulace počtu výsledků podle operátorů

2. **Round 3: Database Selection**
   - Komponenty: DatabaseSelection, SourceCard, RankingInterface
   - Drag & drop pro ranking

3. **Round 4: Results Filter**
   - Komponenty: ResultsFilter, FilterPanel, ResultsList
   - Dynamické filtrování

### Priority:

1. ✅ Round 1 hotovo - můžete testovat
2. Připravit vaše data pro všechny fakulty
3. Integrovat Round 1 do game flow
4. Implementovat Round 2, 3, 4 postupně

## 📝 API Reference

### Section1Container Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `facultyId` | string | Yes | ID fakulty (ff, prf, lf, ...) |
| `facultyColor` | string | No | Hex barva pro theming |
| `onSectionComplete` | function | Yes | Callback po dokončení všech kol |

### onSectionComplete Data

```javascript
{
  totalScore: 85,        // Celkové body
  maxScore: 400,         // Maximum (100 per round)
  percentage: 21,        // Procenta
  roundResults: {
    round1: {
      selectedWords: [...],
      score: 85,
      percentage: 85,
      stats: { ... }
    },
    round2: null,
    round3: null,
    round4: null
  }
}
```

## 🐛 Známé problémy

- [ ] Round 2, 3, 4 nejsou implementovány (zobrazí se placeholder)
- [ ] Mobile responsive design může potřebovat další testování
- [ ] Accessibility (ARIA labels) může být vylepšeno

## 💡 Tips

1. **Začněte s testováním**: Použijte standalone Section1Container
2. **Upravte data**: Přidejte vlastní slova pro vaše fakulty
3. **Sledujte score**: Console.log vám pomůže debugovat
4. **Fakultní theming**: Každá fakulta může mít vlastní barvy

---

**Autor:** Claude Code
**Verze:** 1.0.0 (Round 1 complete)
**Datum:** 2025-10-24
