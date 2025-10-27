/**
 * Round 1 Utilities: Credibility Assessment - Validation and Scoring
 *
 * Supports two modes:
 * 1. Ranking mode: Rank sources by credibility
 * 2. Detective mode: Identify red flags in a source
 */

/**
 * RANKING MODE UTILITIES
 */

/**
 * Calculate score for ranking mode based on position accuracy
 * Scoring: +20 points for exact position, +10 points for ±1 position
 * @param {Array<string>} userRanking - User's ranking (array of source IDs)
 * @param {Array<object>} sources - All sources with credibilityScore
 * @returns {object} Score breakdown and total
 */
export const calculateRankingScore = (userRanking, sources) => {
  if (!userRanking || userRanking.length === 0) {
    return {
      score: 0,
      maxScore: sources.length * 20,
      percentage: 0,
      breakdown: sources.map((source) => ({
        sourceId: source.id,
        title: source.title,
        points: 20,
        earned: 0,
        feedback: "Nezařazeno do rankingu"
      }))
    };
  }

  // Sort sources by credibilityScore to get correct ranking
  const sortedSources = [...sources].sort((a, b) => b.credibilityScore - a.credibilityScore);
  const correctRanking = sortedSources.map(s => s.id);

  let totalScore = 0;
  const breakdown = [];

  userRanking.forEach((sourceId, userPosition) => {
    const correctPosition = correctRanking.indexOf(sourceId);
    const source = sources.find(s => s.id === sourceId);

    let points = 0;
    let feedback = "";

    if (correctPosition === userPosition) {
      // Exact position
      points = 20;
      feedback = `Perfektní! Zdroj je na správné pozici ${userPosition + 1}.`;
    } else if (Math.abs(correctPosition - userPosition) === 1) {
      // Off by 1 position
      points = 10;
      feedback = `Téměř správně! Zdroj by měl být na pozici ${correctPosition + 1}, vy jste ho umístili na ${userPosition + 1}.`;
    } else {
      // Wrong position
      points = 0;
      feedback = `Nesprávně. Zdroj by měl být na pozici ${correctPosition + 1}, vy jste ho umístili na ${userPosition + 1}.`;
    }

    totalScore += points;
    breakdown.push({
      sourceId,
      title: source?.title || "Unknown",
      userPosition: userPosition + 1,
      correctPosition: correctPosition + 1,
      points: 20,
      earned: points,
      feedback
    });
  });

  const maxScore = sources.length * 20;
  const percentage = Math.round((totalScore / maxScore) * 100);

  return {
    score: totalScore,
    maxScore,
    percentage,
    breakdown,
    correctRanking: correctRanking.map((id, idx) => ({
      position: idx + 1,
      id,
      title: sources.find(s => s.id === id)?.title
    }))
  };
};

/**
 * Get feedback message for ranking performance
 * @param {number} percentage - Score percentage (0-100)
 * @returns {object} Performance feedback
 */
export const getRankingFeedback = (percentage) => {
  if (percentage >= 90) {
    return {
      level: "Vynikající!",
      message: "Perfektní hodnocení věrohodnosti zdrojů! Rozumíte kritériím kvalitního výzkumu.",
      color: "#22c55e",
      icon: "🌟"
    };
  } else if (percentage >= 70) {
    return {
      level: "Velmi dobře",
      message: "Dobrá analýza věrohodnosti, jen drobné nepřesnosti v pořadí.",
      color: "#3b82f6",
      icon: "✅"
    };
  } else if (percentage >= 50) {
    return {
      level: "Uspokojivě",
      message: "Základy hodnocení zdrojů zvládáte, ale věnujte pozornost detailům.",
      color: "#f59e0b",
      icon: "⚠️"
    };
  } else {
    return {
      level: "Nedostatečně",
      message: "Hodnocení věrohodnosti potřebuje zlepšení. Zaměřte se na afiliaci autora, peer-review a citace.",
      color: "#ef4444",
      icon: "❌"
    };
  }
};

/**
 * DETECTIVE MODE UTILITIES
 */

/**
 * Validate identified red flags in detective mode
 * @param {Array<string>} identifiedFlagIds - IDs of red flags user identified
 * @param {Array<object>} allRedFlags - All red flags in the source
 * @returns {object} Validation result
 */
export const validateRedFlags = (identifiedFlagIds, allRedFlags) => {
  const correctFlagIds = allRedFlags.map(f => f.id);
  const identified = identifiedFlagIds || [];

  // True positives: correctly identified red flags
  const truePositives = identified.filter(id => correctFlagIds.includes(id));

  // False positives: incorrectly identified (user marked something that's not a red flag)
  const falsePositives = identified.filter(id => !correctFlagIds.includes(id));

  // False negatives: missed red flags
  const missedFlags = correctFlagIds.filter(id => !identified.includes(id));

  return {
    truePositives,
    falsePositives,
    missedFlags,
    total: allRedFlags.length,
    identified: identified.length,
    correct: truePositives.length
  };
};

/**
 * Calculate score for detective mode
 * Scoring: +15 points per correctly identified red flag
 *          -5 points per false positive
 *          Bonus: +10 if all critical flags found
 * @param {object} validation - Result from validateRedFlags
 * @param {Array<object>} allRedFlags - All red flags with severity
 * @returns {object} Score breakdown and total
 */
export const calculateDetectiveScore = (validation, allRedFlags) => {
  let score = 0;
  const breakdown = [];

  // Points for correctly identified red flags
  const correctPoints = validation.truePositives.length * 15;
  score += correctPoints;

  if (validation.truePositives.length > 0) {
    breakdown.push({
      label: `Správně identifikováno ${validation.truePositives.length} problémů`,
      points: correctPoints,
      earned: true
    });
  }

  // Penalty for false positives
  const falsePositivePenalty = validation.falsePositives.length * 5;
  score -= falsePositivePenalty;

  if (validation.falsePositives.length > 0) {
    breakdown.push({
      label: `Nesprávně označeno ${validation.falsePositives.length} míst`,
      points: -falsePositivePenalty,
      earned: true,
      isPenalty: true
    });
  }

  // Bonus for finding all critical flags
  const criticalFlags = allRedFlags.filter(f => f.severity === "critical");
  const criticalFlagsFound = validation.truePositives.filter(id =>
    criticalFlags.find(f => f.id === id)
  );

  if (criticalFlags.length > 0 && criticalFlagsFound.length === criticalFlags.length) {
    score += 10;
    breakdown.push({
      label: "Bonus: Všechny kritické problémy nalezeny",
      points: 10,
      earned: true
    });
  }

  // Ensure score is not negative
  score = Math.max(0, score);

  const maxScore = allRedFlags.length * 15 + 10; // Max points + bonus
  const percentage = Math.round((score / maxScore) * 100);

  return {
    score,
    maxScore,
    percentage,
    breakdown,
    missedCritical: criticalFlags.length - criticalFlagsFound.length
  };
};

/**
 * Get feedback for detective mode performance
 * @param {number} percentage - Score percentage (0-100)
 * @param {number} missedCritical - Number of missed critical red flags
 * @returns {object} Performance feedback
 */
export const getDetectiveFeedback = (percentage, missedCritical = 0) => {
  if (missedCritical > 0) {
    return {
      level: "Pozor!",
      message: `Přehlédli jste ${missedCritical} kritický problém! Věnujte pozornost afiliaci autora a typu publikace.`,
      color: "#ef4444",
      icon: "⚠️"
    };
  }

  if (percentage >= 90) {
    return {
      level: "Vynikající!",
      message: "Perfektní identifikace všech problémů ve zdroji!",
      color: "#22c55e",
      icon: "🕵️"
    };
  } else if (percentage >= 70) {
    return {
      level: "Velmi dobře",
      message: "Většinu problémů jste odhalili, jen pár detailů vám uniklo.",
      color: "#3b82f6",
      icon: "✅"
    };
  } else if (percentage >= 50) {
    return {
      level: "Uspokojivě",
      message: "Některé problémy jste našli, ale zaměřte se více na detaily.",
      color: "#f59e0b",
      icon: "⚠️"
    };
  } else {
    return {
      level: "Nedostatečně",
      message: "Většina problémů nebyla identifikována. Zkuste se zaměřit na autora, publikaci a metody.",
      color: "#ef4444",
      icon: "❌"
    };
  }
};

/**
 * Get hint for remaining red flags
 * @param {Array<string>} missedFlagIds - IDs of missed red flags
 * @param {Array<object>} allRedFlags - All red flags
 * @returns {string} Hint message
 */
export const getHint = (missedFlagIds, allRedFlags) => {
  if (missedFlagIds.length === 0) {
    return "Výborně! Našli jste všechny problémy.";
  }

  const missedFlags = allRedFlags.filter(f => missedFlagIds.includes(f.id));
  const highestSeverity = missedFlags.reduce((max, flag) => {
    const severityRank = { critical: 3, high: 2, medium: 1, low: 0 };
    return severityRank[flag.severity] > severityRank[max.severity] ? flag : max;
  }, missedFlags[0]);

  const hints = {
    author: "Zkontrolujte sekci o autorech - je něco podezřelého?",
    publication: "Podívejte se na název a typ publikace - je to věrohodný zdroj?",
    metrics: "Zkontrolujte citace a impact faktor - odpovídají kvalitnímu výzkumu?",
    content: "Přečtěte si název a abstrakt - nejsou tam přehnané tvrzení?"
  };

  return hints[highestSeverity.type] || "Ještě zbývá najít některé problémy.";
};

/**
 * SHARED UTILITIES
 */

/**
 * Get credibility level badge info based on score
 * @param {number} credibilityScore - Score 0-100
 * @returns {object} Badge information
 */
export const getCredibilityBadge = (credibilityScore) => {
  if (credibilityScore >= 90) {
    return {
      label: "Vysoce věrohodný",
      color: "#22c55e",
      icon: "✓✓✓"
    };
  } else if (credibilityScore >= 70) {
    return {
      label: "Věrohodný",
      color: "#3b82f6",
      icon: "✓✓"
    };
  } else if (credibilityScore >= 40) {
    return {
      label: "Sporný",
      color: "#f59e0b",
      icon: "⚠"
    };
  } else {
    return {
      label: "Nevěrohodný",
      color: "#ef4444",
      icon: "✗✗"
    };
  }
};

/**
 * Get severity badge for red flag
 * @param {string} severity - critical, high, medium, low
 * @returns {object} Severity badge info
 */
export const getSeverityBadge = (severity) => {
  const badges = {
    critical: {
      label: "Kritický",
      color: "#dc2626",
      icon: "⚠️"
    },
    high: {
      label: "Vysoký",
      color: "#ea580c",
      icon: "⚠"
    },
    medium: {
      label: "Střední",
      color: "#f59e0b",
      icon: "!"
    },
    low: {
      label: "Nízký",
      color: "#eab308",
      icon: "i"
    }
  };

  return badges[severity] || badges.medium;
};
