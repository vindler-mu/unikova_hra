# 🎮 Herní Flow - Úniková hra MUNI

## 📊 Aktuální vs. Požadovaný stav

### ✅ Hotové obrazovky
- PersonalizationScreen
- DesktopScreen
- EmailScreen
- HackerTerminalScreen
- OverviewScreen
- LibrarianInterlude
- FinalCodePrompt
- CompletionScreen
- TimeoutScreen

### ❌ Chybějící/Nefunkční
- **BriefingScreen** - existuje ale není správně propojený
- **Section1Container** - existuje ale není propojený
- **Section2Container** - existuje ale není propojený
- **Section3Container** - existuje ale není propojený
- **Section4Container** - neexistuje (TODO)
- **DebriefingScreen** - existuje ale není správně propojený

---

## 🔄 Kompletní herní flow

```
┌─────────────────────────────────────────────────────────────────────┐
│                        SETUP PHASE (Úvod)                           │
└─────────────────────────────────────────────────────────────────────┘

1. PersonalizationScreen
   │ Zadá jméno + fakulta
   ↓
2. DesktopScreen
   │ Klikne na Gmail ikonu
   ↓
3. EmailScreen (3 emaily o krizi)
   │ Přečte emaily + klikne na Terminal ikonu
   ↓
4. HackerTerminalScreen
   │ Zadá příkaz: "run restore protocol"
   ↓
5. OverviewScreen (mission_overview$)
   │
   └──────────────────────────────────────────────────────────────────┐
                                                                       │
┌──────────────────────────────────────────────────────────────────────┘
│                    TASK LOOP (4x opakování)                         │
└─────────────────────────────────────────────────────────────────────┘

6. OverviewScreen
   │ Vybere Task 1-4 (pokud odemčený)
   │ Zadá příkaz: "run defense [1-4]"
   ↓
7. BriefingScreen ⚠️ CHYBÍ PROPOJENÍ
   │ Přečte zadání úkolu
   │ Klikne "Start Mission"
   ↓
8. Section Container (Task 1/2/3/4) ⚠️ CHYBÍ PROPOJENÍ
   │ Round 1 → Round 2 → Round 3 → Round 4
   │ Získá skóre za každé kolo
   ↓
9. DebriefingScreen ⚠️ CHYBÍ PROPOJENÍ
   │ Zobrazí celkové skóre sekce
   │ Získá číslici kódu (např. Task 1 → "3")
   │ Klikne "Continue"
   ↓
10. LibrarianInterlude ✅ FUNGUJE
    │ Dr. Záložka gratuluje
    │ Zadá heslo pro další task (např. "knihovna")
    │
    ├─→ Pro Task 1, 2, 3: Odemkne další task
    │   ↓
    │   Návrat na OverviewScreen (bod 6)
    │
    └─→ Po Task 4: Všechny tasky hotové
        ↓

┌─────────────────────────────────────────────────────────────────────┐
│                      COMPLETION PHASE (Závěr)                       │
└─────────────────────────────────────────────────────────────────────┘

11. FinalCodePrompt ✅ FUNGUJE
    │ Zadá finální kód: 3841
    ↓
12. CompletionScreen ✅ FUNGUJE
    │ Epilog na základě výkonu
    │ Statistiky hry

┌─────────────────────────────────────────────────────────────────────┐
│                         TIMEOUT PATH                                │
└─────────────────────────────────────────────────────────────────────┘

Kdykoliv: timeLeft === 0
   ↓
TimeoutScreen ✅ FUNGUJE
```

---

## 🐛 Současné problémy v App.js

### Problém 1: BriefingScreen se okamžitě ruší

**Lokace:** App.js řádky 361-365

```javascript
// ❌ ŠPATNĚ:
if (showBriefing !== null) {
  setShowBriefing(null);
  setShowOverview(true);
}
```

**Co se stane:**
1. OverviewScreen volá `setShowBriefing(0)` pro Task 1
2. React re-render
3. Podmínka `showBriefing !== null` je true
4. Okamžitě se volá `setShowBriefing(null)` a vrací na Overview

**Oprava:** Vrátit správný JSX s BriefingScreen komponentou

---

### Problém 2: DebriefingScreen se okamžitě ruší

**Lokace:** App.js řádky 367-371

```javascript
// ❌ ŠPATNĚ:
if (showDebriefing !== null) {
  setShowDebriefing(null);
  setShowOverview(true);
}
```

**Stejný problém jako u BriefingScreen.**

---

### Problém 3: Section Containers nejsou propojené

**Co chybí:**
- Import Section1Container, Section2Container, Section3Container
- Podmínka pro zobrazení Section containerů
- Handlery pro dokončení sekce (onComplete callback)

---

## 🔧 Plán opravy

### Krok 1: Opravit BriefingScreen propojení
```javascript
if (showBriefing !== null) {
  return (
    <BriefingScreen
      taskIndex={showBriefing}
      playerName={playerName}
      selectedFaculty={selectedFaculty}
      onStart={() => {
        setShowBriefing(null);
        setCurrentTask(showBriefing); // Spustí section
      }}
      onBack={() => {
        setShowBriefing(null);
        setShowOverview(true);
      }}
    />
  );
}
```

### Krok 2: Přidat Section Container routing
```javascript
if (currentTask !== null && !showDebriefing) {
  // Import Section containers
  const Section1Container = lazy(() => import('./components/Section1/Section1Container'));
  const Section2Container = lazy(() => import('./components/Section2/Section2Container'));
  const Section3Container = lazy(() => import('./components/Section3/Section3Container'));

  return (
    <Suspense fallback={<LoadingScreen />}>
      {currentTask === 0 && <Section1Container onComplete={handleTaskComplete} />}
      {currentTask === 1 && <Section2Container onComplete={handleTaskComplete} />}
      {currentTask === 2 && <Section3Container onComplete={handleTaskComplete} />}
      {currentTask === 3 && <Section4Placeholder onComplete={handleTaskComplete} />}
    </Suspense>
  );
}
```

### Krok 3: Opravit DebriefingScreen propojení
```javascript
if (showDebriefing !== null) {
  return (
    <DebriefingScreen
      taskIndex={showDebriefing}
      taskScore={/* získat z výsledků */}
      maxScore={400}
      digit={COLLECTED_DIGITS[showDebriefing]}
      onContinue={() => {
        // Přidat číslici
        setCollectedDigits(prev => [...prev, COLLECTED_DIGITS[showDebriefing]]);

        // Označit task jako dokončený
        const taskKey = `task${showDebriefing + 1}`;
        setTaskStates(prev => ({
          ...prev,
          [taskKey]: { ...prev[taskKey], completed: true }
        }));

        setCompletedTasks(prev => prev + 1);

        // Pokud je to Task 4, jdi na final code
        if (showDebriefing === 3) {
          setShowDebriefing(null);
          setShowFinalCodePrompt(true);
        } else {
          // Jinak jdi na Librarian Interlude
          setShowDebriefing(null);
          setShowLibrarianInterlude(showDebriefing);
        }
      }}
    />
  );
}
```

---

## 📝 Placeholder komponenty k vytvoření

### Section4Placeholder
Jednoduchá komponenta s informací, že Section 4 ještě není implementována.

```javascript
const Section4Placeholder = ({ onComplete }) => (
  <div style={/* terminal style */}>
    <h1>Task 4: Komunikace výsledků</h1>
    <p>Tato sekce je zatím ve vývoji.</p>
    <button onClick={() => onComplete(3, 350)}>
      Simulovat dokončení (350 bodů)
    </button>
  </div>
);
```

---

## ✅ Kontrolní seznam

- [ ] Opravit BriefingScreen rendering v App.js
- [ ] Importovat Section containers do App.js
- [ ] Přidat routing pro Section containers
- [ ] Opravit DebriefingScreen rendering v App.js
- [ ] Vytvořit Section4Placeholder komponentu
- [ ] Propojit onComplete callbacky
- [ ] Otestovat celý flow od začátku do konce
- [ ] Ověřit správné předávání skóre mezi komponentami
- [ ] Ověřit správné odemykání tasků hesly

---

## 🎯 Očekávané chování po opravě

1. ✅ Uživatel vybere Task 1 v OverviewScreen
2. ✅ Zobrazí se BriefingScreen s úvodem k Task 1
3. ✅ Klikne "Start" → Zobrazí se Section1Container
4. ✅ Projde 4 kola, získá skóre
5. ✅ Po dokončení → DebriefingScreen ukáže výsledky + číslici "3"
6. ✅ Klikne "Continue" → LibrarianInterlude požádá o heslo
7. ✅ Zadá "knihovna" → Odemkne Task 2
8. ✅ Vrátí se na OverviewScreen
9. 🔄 Opakuje pro Tasks 2, 3, 4
10. ✅ Po Task 4 → FinalCodePrompt místo dalšího interlude
11. ✅ Zadá 3841 → CompletionScreen

---

**Poslední aktualizace:** 2026-01-21
**Status:** 🚧 Ve vývoji - oprava navazujících obrazovek
