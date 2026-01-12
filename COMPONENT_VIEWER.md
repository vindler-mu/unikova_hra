# 🎮 Component Viewer

Nástroj pro prohlížení všech obrazovek/komponent aplikace bez nutnosti procházet herní flow.

## 🚀 Jak spustit

### Metoda 1: URL parametr
Přidej `?viewer=true` na konec URL:
```
http://localhost:3000/?viewer=true
```

### Metoda 2: Během vývoje
Upravit `package.json` a přidat script:
```json
"scripts": {
  "viewer": "REACT_APP_VIEWER=true npm start"
}
```

## 🎯 Funkce

### Navigace
- **← →** šipky na klávesnici - pohyb mezi komponentami
- **Tlačítka Prev/Next** - navigace myší
- **Kliknutí v menu** - přímý přechod na komponentu
- **Klávesa S** - skrýt/zobrazit sidebar

### Rozhraní
- **Levý sidebar** - seznam všech 13 obrazovek
- **Top bar** - název aktuální komponenty + navigační tlačítka
- **Levý dolní roh** - technický název komponenty a číslo

## 📋 Seznam komponent

1. **PersonalizationScreen** - Zadání jména a výběr fakulty
2. **DesktopScreen** - Simulace Windows desktopu
3. **EmailScreen** - 3 emaily s příběhem
4. **HackerTerminalScreen** - Hacker terminál s bootovacími zprávami
5. **OverviewScreen** - Přehled úkolů a stavu hry
6. **BriefingScreen** - Úvod do úkolu (před začátkem)
7. **DebriefingScreen** - Výsledky úkolu (po dokončení)
8. **LibrarianInterlude** - Knihovník mezi úkoly (s heslem)
9. **PasswordPrompt** - Zadání hesla pro odemčení úkolu
10. **FinalCodePrompt** - Zadání finálního master kódu
11. **CompletionScreen** - Epilog dle výkonu
12. **TimeoutScreen** - Game over při timeoutu
13. **TaskScreen** - Legacy task screen

## 🎨 Výhody

✅ Rychlý přehled všech obrazovek
✅ Žádná nutnost procházet herní flow
✅ Perfektní pro testování UI
✅ Užitečné pro prezentaci
✅ Mock data pro všechny komponenty

## 💡 Poznámky

- Všechny akce (kliknutí na tlačítka) jsou v preview módu vypnuté (console.log)
- Mock data simulují běžnou situaci ve hře
- Komponenty jsou zobrazeny se všemi props
- Scroll funguje normálně pro dlouhé komponenty
