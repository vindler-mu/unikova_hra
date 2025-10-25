/**
 * Round 3 Utilities: Relevance Judgment - Validation and Scoring
 * Article selection based on relevance to research question
 */

/**
 * Validate selected articles based on relevance
 * @param {Array<string>} selectedArticleIds - User's selected article IDs
 * @param {Array<object>} allArticles - All available articles with relevance scores
 * @param {object} validation - Validation rules (minSelection, maxSelection)
 * @returns {object} Validation result
 */
export const validateSelection = (selectedArticleIds, allArticles, validation) => {
  const selected = selectedArticleIds || [];
  const issues = [];
  let isValid = true;

  // Check selection count
  if (selected.length < validation.minSelection) {
    issues.push(`Vyberte alespoň ${validation.minSelection} články.`);
    isValid = false;
  }

  if (selected.length > validation.maxSelection) {
    issues.push(`Vyberte maximálně ${validation.maxSelection} článků.`);
    isValid = false;
  }

  if (selected.length === 0) {
    return {
      isValid: false,
      issues: ["Nevybrali jste žádné články."],
      selectedArticles: [],
      relevanceBreakdown: {}
    };
  }

  // Get selected articles
  const selectedArticles = selected
    .map(id => allArticles.find(a => a.id === id))
    .filter(Boolean);

  // Count by relevance level (5 = highly relevant, 0 = irrelevant)
  const relevanceBreakdown = {
    highlyRelevant: selectedArticles.filter(a => a.relevance === 5).length, // relevance 5
    relevant: selectedArticles.filter(a => a.relevance === 4 || a.relevance === 3).length, // relevance 3-4
    lowRelevance: selectedArticles.filter(a => a.relevance <= 2).length, // relevance 0-2
  };

  // Identify missed highly relevant articles
  const highlyRelevantArticles = allArticles.filter(a => a.relevance === 5);
  const missedHighlyRelevant = highlyRelevantArticles.filter(
    a => !selected.includes(a.id)
  );

  return {
    isValid,
    issues,
    selectedArticles,
    relevanceBreakdown,
    missedHighlyRelevant: missedHighlyRelevant.length,
    totalHighlyRelevant: highlyRelevantArticles.length
  };
};

/**
 * Calculate score for article selection
 * Scoring:
 * - Highly relevant (5): +20 points
 * - Relevant (3-4): +10 points
 * - Low relevance (0-2): -10 points (penalty)
 * - Bonus: +15 if all highly relevant articles selected
 * @param {object} validationResult - Result from validateSelection
 * @param {object} scoring - Scoring rules
 * @returns {object} Score breakdown and total
 */
export const calculateScore = (validationResult, scoring) => {
  let score = 0;
  const breakdown = [];

  const { relevanceBreakdown, missedHighlyRelevant, totalHighlyRelevant } = validationResult;

  // Points for highly relevant articles
  if (relevanceBreakdown.highlyRelevant > 0) {
    const points = relevanceBreakdown.highlyRelevant * 20;
    score += points;
    breakdown.push({
      label: `${relevanceBreakdown.highlyRelevant} vysoce relevantní článek`,
      points,
      earned: true
    });
  }

  // Points for relevant articles
  if (relevanceBreakdown.relevant > 0) {
    const points = relevanceBreakdown.relevant * 10;
    score += points;
    breakdown.push({
      label: `${relevanceBreakdown.relevant} relevantní článek`,
      points,
      earned: true
    });
  }

  // Penalty for low relevance articles
  if (relevanceBreakdown.lowRelevance > 0) {
    const penalty = relevanceBreakdown.lowRelevance * 10;
    score -= penalty;
    breakdown.push({
      label: `${relevanceBreakdown.lowRelevance} nízce relevantní článek`,
      points: -penalty,
      earned: true,
      isPenalty: true
    });
  }

  // Bonus for selecting all highly relevant articles
  if (totalHighlyRelevant > 0 && missedHighlyRelevant === 0) {
    score += 15;
    breakdown.push({
      label: "Bonus: Všechny klíčové články vybrány",
      points: 15,
      earned: true
    });
  }

  // Ensure score is not negative
  score = Math.max(0, score);

  // Max score: all highly relevant (20 each) + bonus (15)
  const maxScore = totalHighlyRelevant * 20 + 15;
  const percentage = Math.round((score / maxScore) * 100);

  return {
    score,
    maxScore,
    percentage,
    breakdown,
    missedHighlyRelevant
  };
};

/**
 * Get feedback for article selection
 * @param {number} percentage - Score percentage (0-100)
 * @param {number} missedHighlyRelevant - Number of missed highly relevant articles
 * @returns {object} Performance feedback
 */
export const getFeedback = (percentage, missedHighlyRelevant = 0) => {
  if (missedHighlyRelevant > 0) {
    return {
      level: "Pozor!",
      message: `Přehlédli jste ${missedHighlyRelevant} klíčový článek! Zaměřte se na články, které přímo odpovídají na výzkumnou otázku.`,
      color: "#f59e0b",
      icon: "⚠️"
    };
  }

  if (percentage >= 90) {
    return {
      level: "Vynikající!",
      message: "Perfektní výběr relevantních zdrojů! Rozumíte hodnocení relevance pro výzkum.",
      color: "#22c55e",
      icon: "🎯"
    };
  } else if (percentage >= 70) {
    return {
      level: "Velmi dobře",
      message: "Dobrý výběr článků, jen několik menších nepřesností.",
      color: "#3b82f6",
      icon: "✅"
    };
  } else if (percentage >= 50) {
    return {
      level: "Uspokojivě",
      message: "Základní výběr v pořádku, ale zaměřte se více na přímou relevanci k výzkumné otázce.",
      color: "#f59e0b",
      icon: "⚠️"
    };
  } else {
    return {
      level: "Nedostatečně",
      message: "Výběr potřebuje zlepšení. Zkontrolujte, jak články odpovídají na výzkumnou otázku.",
      color: "#ef4444",
      icon: "❌"
    };
  }
};

/**
 * Get relevance badge for article
 * @param {number} relevance - Relevance score (0-5)
 * @returns {object} Badge information
 */
export const getRelevanceBadge = (relevance) => {
  if (relevance === 5) {
    return {
      label: "Vysoce relevantní",
      color: "#22c55e",
      icon: "⭐⭐⭐"
    };
  } else if (relevance >= 3) {
    return {
      label: "Relevantní",
      color: "#3b82f6",
      icon: "⭐⭐"
    };
  } else if (relevance >= 1) {
    return {
      label: "Částečně relevantní",
      color: "#f59e0b",
      icon: "⭐"
    };
  } else {
    return {
      label: "Nerelevantní",
      color: "#ef4444",
      icon: "✗"
    };
  }
};
