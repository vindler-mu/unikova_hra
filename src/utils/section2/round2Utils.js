/**
 * Round 2 Utilities: Quality Evaluation - Validation and Scoring
 *
 * Supports two modes:
 * 1. Spot mode: Identify problems in abstract text
 * 2. Checklist mode: Evaluate quality criteria
 */

/**
 * SPOT MODE UTILITIES
 */

/**
 * Validate identified problems in spot mode
 * @param {Array<string>} identifiedProblemIds - IDs of problems user identified
 * @param {Array<object>} allProblems - All problems in the abstract
 * @returns {object} Validation result
 */
export const validateProblems = (identifiedProblemIds, allProblems) => {
  const correctProblemIds = allProblems.map(p => p.id);
  const identified = identifiedProblemIds || [];

  // True positives: correctly identified problems
  const truePositives = identified.filter(id => correctProblemIds.includes(id));

  // False positives: incorrectly identified
  const falsePositives = identified.filter(id => !correctProblemIds.includes(id));

  // Missed problems
  const missedProblems = correctProblemIds.filter(id => !identified.includes(id));

  // Count by severity
  const criticalProblems = allProblems.filter(p => p.severity === "critical");
  const highProblems = allProblems.filter(p => p.severity === "high");
  const mediumProblems = allProblems.filter(p => p.severity === "medium");

  const criticalFound = truePositives.filter(id =>
    criticalProblems.find(p => p.id === id)
  );
  const highFound = truePositives.filter(id =>
    highProblems.find(p => p.id === id)
  );
  const mediumFound = truePositives.filter(id =>
    mediumProblems.find(p => p.id === id)
  );

  return {
    truePositives,
    falsePositives,
    missedProblems,
    total: allProblems.length,
    identified: identified.length,
    correct: truePositives.length,
    bySeverity: {
      critical: {
        total: criticalProblems.length,
        found: criticalFound.length,
        missed: criticalProblems.length - criticalFound.length
      },
      high: {
        total: highProblems.length,
        found: highFound.length,
        missed: highProblems.length - highFound.length
      },
      medium: {
        total: mediumProblems.length,
        found: mediumFound.length,
        missed: mediumProblems.length - mediumFound.length
      }
    }
  };
};

/**
 * Calculate score for spot mode
 * Scoring:
 * - Critical problem found: +20 points
 * - High problem found: +15 points
 * - Medium problem found: +10 points
 * - False positive: -5 points
 * - Bonus: +15 if all critical problems found
 * @param {object} validation - Result from validateProblems
 * @param {Array<object>} allProblems - All problems
 * @returns {object} Score breakdown and total
 */
export const calculateSpotScore = (validation, allProblems) => {
  let score = 0;
  const breakdown = [];

  // Points for correctly identified problems by severity
  const criticalPoints = validation.bySeverity.critical.found * 20;
  const highPoints = validation.bySeverity.high.found * 15;
  const mediumPoints = validation.bySeverity.medium.found * 10;

  if (validation.bySeverity.critical.found > 0) {
    score += criticalPoints;
    breakdown.push({
      label: `${validation.bySeverity.critical.found} kritický problém nalezen`,
      points: criticalPoints,
      earned: true
    });
  }

  if (validation.bySeverity.high.found > 0) {
    score += highPoints;
    breakdown.push({
      label: `${validation.bySeverity.high.found} vysoký problém nalezen`,
      points: highPoints,
      earned: true
    });
  }

  if (validation.bySeverity.medium.found > 0) {
    score += mediumPoints;
    breakdown.push({
      label: `${validation.bySeverity.medium.found} střední problém nalezen`,
      points: mediumPoints,
      earned: true
    });
  }

  // Penalty for false positives
  const falsePositivePenalty = validation.falsePositives.length * 5;
  if (falsePositivePenalty > 0) {
    score -= falsePositivePenalty;
    breakdown.push({
      label: `${validation.falsePositives.length} nesprávně označeno`,
      points: -falsePositivePenalty,
      earned: true,
      isPenalty: true
    });
  }

  // Bonus for finding all critical problems
  if (
    validation.bySeverity.critical.total > 0 &&
    validation.bySeverity.critical.found === validation.bySeverity.critical.total
  ) {
    score += 15;
    breakdown.push({
      label: "Bonus: Všechny kritické problémy nalezeny",
      points: 15,
      earned: true
    });
  }

  // Ensure score is not negative
  score = Math.max(0, score);

  // Max score calculation
  const maxScore =
    validation.bySeverity.critical.total * 20 +
    validation.bySeverity.high.total * 15 +
    validation.bySeverity.medium.total * 10 +
    15; // Bonus

  const percentage = Math.round((score / maxScore) * 100);

  return {
    score,
    maxScore,
    percentage,
    breakdown,
    missedCritical: validation.bySeverity.critical.missed,
    missedHigh: validation.bySeverity.high.missed
  };
};

/**
 * Get feedback for spot mode performance
 * @param {number} percentage - Score percentage (0-100)
 * @param {number} missedCritical - Number of missed critical problems
 * @returns {object} Performance feedback
 */
export const getSpotFeedback = (percentage, missedCritical = 0) => {
  if (missedCritical > 0) {
    return {
      level: "Pozor!",
      message: `Přehlédli jste ${missedCritical} kritický problém v metodologii! Zaměřte se na velikost vzorku, délku studie a silná tvrzení.`,
      color: "#ef4444",
      icon: "⚠️"
    };
  }

  if (percentage >= 90) {
    return {
      level: "Vynikající!",
      message: "Perfektní identifikace problémů v abstraktu! Rozumíte metodologickým chybám.",
      color: "#22c55e",
      icon: "🎯"
    };
  } else if (percentage >= 70) {
    return {
      level: "Velmi dobře",
      message: "Většinu metodologických problémů jste odhalili.",
      color: "#3b82f6",
      icon: "✅"
    };
  } else if (percentage >= 50) {
    return {
      level: "Uspokojivě",
      message: "Některé problémy jste našli, ale zaměřte se více na detaily metodologie.",
      color: "#f59e0b",
      icon: "⚠️"
    };
  } else {
    return {
      level: "Nedostatečně",
      message: "Většina metodologických problémů nebyla identifikována. Zkontrolujte vzorek, dobu studie a sílu tvrzení.",
      color: "#ef4444",
      icon: "❌"
    };
  }
};

/**
 * CHECKLIST MODE UTILITIES
 */

/**
 * Validate checklist selections
 * @param {Object} userSelections - Object with checklistItemId: boolean
 * @param {Array<object>} checklistItems - All checklist items
 * @returns {object} Validation result
 */
export const validateChecklist = (userSelections, checklistItems) => {
  let correctCount = 0;
  let incorrectCount = 0;
  const details = [];

  checklistItems.forEach(item => {
    const userAnswer = userSelections[item.id];
    const correctAnswer = item.isCorrect;
    const isCorrect = userAnswer === correctAnswer;

    if (isCorrect) {
      correctCount++;
    } else {
      incorrectCount++;
    }

    details.push({
      itemId: item.id,
      label: item.label,
      category: item.category,
      importance: item.importance,
      userAnswer,
      correctAnswer,
      isCorrect,
      explanation: item.explanation
    });
  });

  // Count by importance
  const highImportance = details.filter(d => d.importance === "high");
  const highCorrect = highImportance.filter(d => d.isCorrect).length;

  return {
    total: checklistItems.length,
    correct: correctCount,
    incorrect: incorrectCount,
    percentage: Math.round((correctCount / checklistItems.length) * 100),
    details,
    highImportance: {
      total: highImportance.length,
      correct: highCorrect,
      percentage: Math.round((highCorrect / highImportance.length) * 100)
    }
  };
};

/**
 * Calculate score for checklist mode
 * Scoring:
 * - High importance correct: +15 points
 * - Medium importance correct: +10 points
 * - Low importance correct: +5 points
 * - Bonus: +10 if all high importance correct
 * @param {object} validation - Result from validateChecklist
 * @param {Array<object>} checklistItems - All checklist items
 * @returns {object} Score breakdown and total
 */
export const calculateChecklistScore = (validation, checklistItems) => {
  let score = 0;
  const breakdown = [];

  // Group by importance
  const highItems = validation.details.filter(d => d.importance === "high" && d.isCorrect);
  const mediumItems = validation.details.filter(d => d.importance === "medium" && d.isCorrect);
  const lowItems = validation.details.filter(d => d.importance === "low" && d.isCorrect);

  // Points by importance
  const highPoints = highItems.length * 15;
  const mediumPoints = mediumItems.length * 10;
  const lowPoints = lowItems.length * 5;

  if (highItems.length > 0) {
    score += highPoints;
    breakdown.push({
      label: `${highItems.length} vysoká důležitost správně`,
      points: highPoints,
      earned: true
    });
  }

  if (mediumItems.length > 0) {
    score += mediumPoints;
    breakdown.push({
      label: `${mediumItems.length} střední důležitost správně`,
      points: mediumPoints,
      earned: true
    });
  }

  if (lowItems.length > 0) {
    score += lowPoints;
    breakdown.push({
      label: `${lowItems.length} nízká důležitost správně`,
      points: lowPoints,
      earned: true
    });
  }

  // Bonus for all high importance correct
  const totalHigh = checklistItems.filter(i => i.importance === "high").length;
  if (totalHigh > 0 && highItems.length === totalHigh) {
    score += 10;
    breakdown.push({
      label: "Bonus: Všechny klíčové položky správně",
      points: 10,
      earned: true
    });
  }

  // Max score
  const maxHigh = totalHigh * 15;
  const maxMedium = checklistItems.filter(i => i.importance === "medium").length * 10;
  const maxLow = checklistItems.filter(i => i.importance === "low").length * 5;
  const maxScore = maxHigh + maxMedium + maxLow + 10; // +10 for bonus

  const percentage = Math.round((score / maxScore) * 100);

  return {
    score,
    maxScore,
    percentage,
    breakdown
  };
};

/**
 * Get feedback for checklist mode performance
 * @param {number} percentage - Score percentage (0-100)
 * @param {number} highPercentage - Percentage of high importance items correct
 * @returns {object} Performance feedback
 */
export const getChecklistFeedback = (percentage, highPercentage) => {
  if (highPercentage < 70) {
    return {
      level: "Pozor!",
      message: "Klíčové metodologické požadavky nejsou splněny. Zaměřte se na výzkumnou otázku, velikost vzorku a metodologii.",
      color: "#ef4444",
      icon: "⚠️"
    };
  }

  if (percentage >= 90) {
    return {
      level: "Vynikající!",
      message: "Perfektní hodnocení kvality výzkumu!",
      color: "#22c55e",
      icon: "✅"
    };
  } else if (percentage >= 70) {
    return {
      level: "Velmi dobře",
      message: "Dobrá analýza kvality, jen drobné nepřesnosti.",
      color: "#3b82f6",
      icon: "✅"
    };
  } else if (percentage >= 50) {
    return {
      level: "Uspokojivě",
      message: "Základy hodnocení kvality zvládáte, ale věnujte pozornost detailům.",
      color: "#f59e0b",
      icon: "⚠️"
    };
  } else {
    return {
      level: "Nedostatečně",
      message: "Hodnocení kvality potřebuje zlepšení. Zaměřte se na metodologii a výzkumný design.",
      color: "#ef4444",
      icon: "❌"
    };
  }
};

/**
 * Get hint for spot mode
 * @param {Array<string>} missedProblemIds - IDs of missed problems
 * @param {Array<object>} allProblems - All problems
 * @returns {string} Hint message
 */
export const getSpotHint = (missedProblemIds, allProblems) => {
  if (missedProblemIds.length === 0) {
    return "Výborně! Našli jste všechny problémy.";
  }

  const missedProblems = allProblems.filter(p => missedProblemIds.includes(p.id));
  const highestSeverity = missedProblems.reduce((max, problem) => {
    const severityRank = { critical: 3, high: 2, medium: 1 };
    return severityRank[problem.severity] > severityRank[max.severity] ? problem : max;
  }, missedProblems[0]);

  if (highestSeverity.hint) {
    return highestSeverity.hint;
  }

  const hints = {
    small_sample: "Zkontrolujte velikost vzorku - je dostatečná?",
    strong_claim: "Jsou v textu příliš silná tvrzení jako 'PROVES' nebo 'CURES'?",
    short_duration: "Kolik času trvala studie?",
    perfect_results: "Jsou výsledky realistické, nebo příliš perfektní (např. 100%)?",
    conflict_of_interest: "Kdo financoval výzkum? Je tam konflikt zájmů?",
    overgeneralization: "Nejsou závěry příliš široké pro danou studii?"
  };

  return hints[highestSeverity.type] || "Hledejte problémy v metodologii a síle tvrzení.";
};
