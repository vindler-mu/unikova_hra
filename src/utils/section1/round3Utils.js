/**
 * Round 3 Utilities: Database Selection Validation and Scoring
 */

/**
 * Check if arrays are equal (order matters)
 * @param {Array} arr1 - First array
 * @param {Array} arr2 - Second array
 * @returns {boolean} True if arrays are equal
 */
const arraysEqual = (arr1, arr2) => {
  if (arr1.length !== arr2.length) return false;
  return arr1.every((val, index) => val === arr2[index]);
};

/**
 * Calculate similarity between two arrays (order doesn't matter)
 * @param {Array} arr1 - First array
 * @param {Array} arr2 - Second array
 * @returns {number} Similarity percentage (0-1)
 */
const calculateSimilarity = (arr1, arr2) => {
  const matches = arr1.filter((item) => arr2.includes(item)).length;
  return matches / Math.max(arr1.length, arr2.length);
};

/**
 * Validate user's database selection
 * @param {Array} selectedDatabases - User's selected database IDs in order
 * @param {Array} allDatabases - All available databases
 * @param {object} validation - Validation rules
 * @returns {object} Validation result with feedback
 */
export const validateSelection = (selectedDatabases, allDatabases, validation) => {
  const issues = [];
  let isValid = true;

  // Check if user selected the right number
  if (selectedDatabases.length !== validation.maxSelection) {
    issues.push(`Vyberte přesně ${validation.maxSelection} databáze.`);
    isValid = false;
  }

  if (selectedDatabases.length === 0) {
    return {
      isValid: false,
      issues: ["Nevybrali jste žádné databáze."],
      feedback: "Vyberte databáze kliknutím na ně.",
      selectedRelevance: {},
    };
  }

  // Get selected database objects
  const selected = selectedDatabases
    .map((id) => allDatabases.find((db) => db.id === id))
    .filter(Boolean);

  // Count relevance levels
  const relevanceCount = {
    high: selected.filter((db) => db.relevance === "high").length,
    medium: selected.filter((db) => db.relevance === "medium").length,
    low: selected.filter((db) => db.relevance === "low").length,
  };

  // Check if all selected are high relevance
  if (relevanceCount.high < validation.requiredHigh) {
    issues.push(
      `Potřebujete vybrat ${validation.requiredHigh} vysoce relevantní databáze. Máte pouze ${relevanceCount.high}.`
    );
    isValid = false;
  }

  // Check if any low relevance databases were selected
  if (relevanceCount.low > 0) {
    issues.push(`Vybrali jste ${relevanceCount.low} nízce relevantní databáze.`);
    isValid = false;
  }

  // Check order if all are high relevance
  let orderCorrect = false;
  let partialOrder = false;

  if (relevanceCount.high === validation.requiredHigh && relevanceCount.low === 0) {
    // Check perfect order
    orderCorrect = arraysEqual(selectedDatabases, validation.correctRanking);

    // Check acceptable alternatives
    if (!orderCorrect && validation.acceptableAlternatives) {
      orderCorrect = validation.acceptableAlternatives.some((alt) =>
        arraysEqual(selectedDatabases, alt)
      );
    }

    // Check partial order (has correct databases, wrong order)
    if (!orderCorrect) {
      const similarity = calculateSimilarity(
        selectedDatabases,
        validation.correctRanking
      );
      partialOrder = similarity >= 0.66; // At least 2/3 correct
    }
  }

  return {
    isValid,
    issues,
    relevanceCount,
    orderCorrect,
    partialOrder,
    selectedRelevance: {
      high: relevanceCount.high,
      medium: relevanceCount.medium,
      low: relevanceCount.low,
    },
  };
};

/**
 * Calculate score for database selection
 * @param {object} validationResult - Result from validateSelection
 * @param {object} scoring - Scoring rules
 * @returns {object} Score breakdown and total
 */
export const calculateScore = (validationResult, scoring) => {
  let score = 0;
  const breakdown = [];

  const { relevanceCount, orderCorrect, partialOrder, isValid } = validationResult;

  // Points for selecting all high relevance databases
  if (relevanceCount.high === 3 && relevanceCount.low === 0) {
    score += scoring.allHighRelevance;
    breakdown.push({
      label: "Všechny vysoce relevantní databáze",
      points: scoring.allHighRelevance,
      earned: true,
    });
  } else {
    // Partial credit for selecting some high relevance
    const partialPoints = Math.floor(
      (relevanceCount.high / 3) * scoring.allHighRelevance
    );
    if (partialPoints > 0) {
      score += partialPoints;
      breakdown.push({
        label: `${relevanceCount.high}/3 vysoce relevantních databází`,
        points: partialPoints,
        earned: true,
      });
    } else {
      breakdown.push({
        label: "Výběr relevantních databází",
        points: scoring.allHighRelevance,
        earned: false,
      });
    }
  }

  // Points for correct order
  if (orderCorrect) {
    score += scoring.correctOrder;
    breakdown.push({
      label: "Správné pořadí databází",
      points: scoring.correctOrder,
      earned: true,
    });
  } else if (partialOrder) {
    score += scoring.partialOrder;
    breakdown.push({
      label: "Částečně správné pořadí",
      points: scoring.partialOrder,
      earned: true,
    });
  } else {
    breakdown.push({
      label: "Pořadí databází",
      points: scoring.correctOrder,
      earned: false,
    });
  }

  // Points for not including low relevance databases
  if (relevanceCount.low === 0) {
    score += scoring.noLowRelevance;
    breakdown.push({
      label: "Žádné nerelevantní databáze",
      points: scoring.noLowRelevance,
      earned: true,
    });
  } else {
    breakdown.push({
      label: "Vyloučení nerelevantních databází",
      points: scoring.noLowRelevance,
      earned: false,
    });
  }

  // Bonus for optimal selection
  if (orderCorrect && relevanceCount.high === 3 && relevanceCount.low === 0) {
    score += scoring.bonusOptimal;
    breakdown.push({
      label: "Bonus za optimální výběr",
      points: scoring.bonusOptimal,
      earned: true,
    });
  }

  const percentage = Math.round((score / scoring.maxScore) * 100);

  return {
    score,
    maxScore: scoring.maxScore,
    percentage,
    breakdown,
  };
};

/**
 * Get feedback message based on validation result
 * @param {object} validationResult - Validation result
 * @param {object} feedbackMessages - Feedback message templates
 * @returns {string} Appropriate feedback message
 */
export const getFeedback = (validationResult, feedbackMessages) => {
  const { relevanceCount, orderCorrect, partialOrder, isValid } = validationResult;

  if (relevanceCount.high === 3 && relevanceCount.low === 0 && orderCorrect) {
    return feedbackMessages.perfect;
  }

  if (relevanceCount.high === 3 && relevanceCount.low === 0 && partialOrder) {
    return feedbackMessages.wrongOrder;
  }

  if (relevanceCount.high === 3 && relevanceCount.low === 0) {
    return feedbackMessages.goodChoice;
  }

  if (relevanceCount.low > 0) {
    return feedbackMessages.includedIrrelevant;
  }

  return feedbackMessages.poor;
};

/**
 * Get performance feedback based on score percentage
 * @param {number} percentage - Score percentage (0-100)
 * @returns {object} Performance feedback
 */
export const getPerformanceFeedback = (percentage) => {
  if (percentage >= 90) {
    return {
      level: "Vynikající!",
      message: "Perfektní výběr a řazení databází!",
      color: "#22c55e",
      icon: "🌟",
    };
  } else if (percentage >= 70) {
    return {
      level: "Velmi dobře",
      message: "Dobrý výběr databází s menšími nedostatky.",
      color: "#3b82f6",
      icon: "✅",
    };
  } else if (percentage >= 50) {
    return {
      level: "Uspokojivě",
      message: "Základní výběr v pořádku, ale zkuste vylepšit.",
      color: "#f59e0b",
      icon: "⚠️",
    };
  } else {
    return {
      level: "Nedostatečně",
      message: "Výběr potřebuje výrazné zlepšení.",
      color: "#ef4444",
      icon: "❌",
    };
  }
};
