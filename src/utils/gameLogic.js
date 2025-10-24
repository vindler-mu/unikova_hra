// Dynamic epilogues based on performance
export const getEpilogueData = (databaseIntegrity, finalTime, wrongAnswersCount) => {
    if (databaseIntegrity === 100 && wrongAnswersCount === 0) {
      return {
        title: '🏆 LEGENDÁRNÍ VÝKON',
        achievement: 'Centrum informační gramotnosti jménem MUNI',
        description:
          'Neuvěřitelné! Dokázali jste zachránit univerzitu bez jediné chyby. Senát MUNI rozhodl o založení Centra informační gramotnosti s vaším jménem. AI.gor byl úplně přeprogramován a nyní pomáhá studentům jako správný IGOR.',
        aigorFate:
          'AI.gor/IGOR byl kompletně obnoven. Nyní opět věrně slouží knihovně s perfektními znalostmi informační gramotnosti.',
      };
    } else if (databaseIntegrity >= 85 && wrongAnswersCount <= 3) {
      return {
        title: '⭐ VYNIKAJÍCÍ MISE',
        achievement: 'Oficiální lektor informační gramotnosti',
        description:
          'Fantastická práce! Stali jste se oficiálním lektorem informační gramotnosti na MUNI. AI.gor je v karanténě, kde postupně přeprogramováváme jeho znalosti podle vašeho vzoru.',
        aigorFate:
          'AI.gor je v rehabilitačním programu. Učí se znovu rozoznávat kvalitní zdroje podle vzoru, který jste nastavili.',
      };
    } else if (databaseIntegrity >= 60) {
      return {
        title: '🏅 ÚSPĚŠNÁ MISE',
        achievement: 'Medaile za informační gramotnost',
        description:
          'Dobře odvedeá práce! Získali jste Medaili za informační gramotnost MUNI. Univerzitní systém je obnoven, AI.gor je prozatím pod kontrolou, ale stále vyžaduje dohled.',
        aigorFate:
          'AI.gor je stabilizován, ale stále občas "chybuje". Knihovníci jej mají pod neustálým dohledem.',
      };
    } else {
      return {
        title: '⚠️ MISE ČÁSTEČNĚ SPLNĚNA',
        achievement: 'Certifikát o dokončení kurzu',
        description:
          'Systém je obnoven, ale AI.gor stále představuje potenciální hrozbu. Získali jste certifikát o dokončení kurzu informační gramotnosti. Doporučujeme další trénink!',
        aigorFate:
          'AI.gor je dočasně deaktivován. Někde v hloubi serverů stále číhá, připraven znovu útočit při první příležitosti...',
      };
    }
  };
  
  // Utility functions
  export const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  export const getDamageLevel = (databaseIntegrity) => {
    const lostIntegrity = 100 - databaseIntegrity;
    if (lostIntegrity === 0) return 'žádné';
    if (lostIntegrity <= 15) return 'minimální';
    if (lostIntegrity <= 30) return 'mírné';
    if (lostIntegrity <= 50) return 'střední';
    if (lostIntegrity <= 75) return 'vážné';
    return 'katastrofální';
  };