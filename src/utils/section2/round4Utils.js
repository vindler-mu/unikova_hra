/**
 * Round 4 Utilities: Fake News Detector - Sorting game validation and scoring
 */

/**
 * Validate source categorization
 * @param {Object} userCategories - Object mapping sourceId to category
 * @param {Array<object>} sources - All sources with correctCategory
 * @returns {object} Validation result
 */
export const validateCategorization = (userCategories, sources) => {
  let correctCount = 0;
  let incorrectCount = 0;
  const details = [];

  sources.forEach(source => {
    const userCategory = userCategories[source.id];
    const correctCategory = source.correctCategory;
    const isCorrect = userCategory === correctCategory;

    if (isCorrect) {
      correctCount++;
    } else if (userCategory) {
      incorrectCount++;
    }

    details.push({
      sourceId: source.id,
      title: source.title,
      userCategory,
      correctCategory,
      isCorrect,
      explanation: source.explanation,
      redFlags: source.redFlags || []
    });
  });

  const uncategorized = sources.length - correctCount - incorrectCount;

  return {
    total: sources.length,
    correct: correctCount,
    incorrect: incorrectCount,
    uncategorized,
    percentage: Math.round((correctCount / sources.length) * 100),
    details
  };
};

/**
 * Calculate score for categorization
 * Scoring:
 * - Correct categorization: +12 points
 * - Bonus: +10 if all fake news identified
 * - Bonus: +10 if all credible sources identified
 * @param {object} validation - Result from validateCategorization
 * @param {Array<object>} sources - All sources
 * @returns {object} Score breakdown and total
 */
export const calculateScore = (validation, sources) => {
  let score = 0;
  const breakdown = [];

  // Points for correct categorizations
  const correctPoints = validation.correct * 12;
  if (validation.correct > 0) {
    score += correctPoints;
    breakdown.push({
      label: `${validation.correct} správně zařazeno`,
      points: correctPoints,
      earned: true
    });
  }

  // Check if all fake news identified
  const fakeNewsSources = validation.details.filter(d => d.correctCategory === "fake");
  const fakeNewsCorrect = fakeNewsSources.filter(d => d.isCorrect).length;
  if (fakeNewsSources.length > 0 && fakeNewsCorrect === fakeNewsSources.length) {
    score += 10;
    breakdown.push({
      label: "Bonus: Všechny fake news identifikovány",
      points: 10,
      earned: true
    });
  }

  // Check if all credible sources identified
  const credibleSources = validation.details.filter(d => d.correctCategory === "credible");
  const credibleCorrect = credibleSources.filter(d => d.isCorrect).length;
  if (credibleSources.length > 0 && credibleCorrect === credibleSources.length) {
    score += 10;
    breakdown.push({
      label: "Bonus: Všechny věrohodné zdroje identifikovány",
      points: 10,
      earned: true
    });
  }

  const maxScore = sources.length * 12 + 20; // +20 for bonuses
  const percentage = Math.round((score / maxScore) * 100);

  return {
    score,
    maxScore,
    percentage,
    breakdown,
    missedFake: fakeNewsSources.length - fakeNewsCorrect,
    missedCredible: credibleSources.length - credibleCorrect
  };
};

/**
 * Get feedback for categorization performance
 * @param {number} percentage - Score percentage (0-100)
 * @param {number} missedFake - Number of missed fake news
 * @returns {object} Performance feedback
 */
export const getFeedback = (percentage, missedFake = 0) => {
  if (missedFake > 0) {
    return {
      level: "Pozor!",
      message: `Přehlédli jste ${missedFake} fake news! Dávejte pozor na senzační nadpisy, anonymní autory a emotivní jazyk.`,
      color: "#ef4444",
      icon: "⚠️"
    };
  }

  if (percentage >= 90) {
    return {
      level: "Vynikající!",
      message: "Perfektní detekce fake news a věrohodných zdrojů! Máte vynikající mediální gramotnost.",
      color: "#22c55e",
      icon: "🛡️"
    };
  } else if (percentage >= 70) {
    return {
      level: "Velmi dobře",
      message: "Dobrá schopnost rozlišit věrohodné a nevěrohodné zdroje.",
      color: "#3b82f6",
      icon: "✅"
    };
  } else if (percentage >= 50) {
    return {
      level: "Uspokojivě",
      message: "Základy rozlišování fake news zvládáte, ale věnujte pozornost detailům.",
      color: "#f59e0b",
      icon: "⚠️"
    };
  } else {
    return {
      level: "Nedostatečně",
      message: "Detekce fake news potřebuje zlepšení. Zaměřte se na zdroj, autora a kvalitu argumentace.",
      color: "#ef4444",
      icon: "❌"
    };
  }
};

/**
 * Get category badge info
 * @param {string} category - credible, news, questionable, fake
 * @returns {object} Badge information
 */
export const getCategoryBadge = (category) => {
  const badges = {
    credible: {
      label: "Věrohodné",
      color: "#22c55e",
      icon: "✓✓✓",
      description: "Peer-reviewed výzkum z renomovaných institucí"
    },
    news: {
      label: "Zpravodajství",
      color: "#3b82f6",
      icon: "📰",
      description: "Seriózní zpravodajské zdroje reportující o výzkumu"
    },
    questionable: {
      label: "Sporné",
      color: "#f59e0b",
      icon: "?",
      description: "Osobní blogy, predátorské časopisy, nízká kvalita"
    },
    fake: {
      label: "Fake News",
      color: "#ef4444",
      icon: "⚠️",
      description: "Dezinformace, konspirace, zavádějící obsah"
    }
  };

  return badges[category] || badges.questionable;
};
