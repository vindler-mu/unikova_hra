/**
 * Round 4 Utilities: Results Filtering Validation and Scoring
 */

/**
 * Calculate number of results after applying filters
 * @param {number} initialResults - Starting number of results
 * @param {object} appliedFilters - Filters that user selected
 * @param {Array} filterDefinitions - Filter definitions from data
 * @returns {number} Estimated number of results after filtering
 */
export const calculateResultCount = (initialResults, appliedFilters, filterDefinitions) => {
  let resultCount = initialResults;

  filterDefinitions.forEach((filter) => {
    const userValue = appliedFilters[filter.id];

    if (filter.type === "range" || filter.type === "radio") {
      // Single selection filter
      const selectedOption = filter.options.find((opt) => opt.value === userValue);
      if (selectedOption && selectedOption.impact) {
        const reduction = Math.abs(selectedOption.impact) / 100;
        resultCount = Math.floor(resultCount * (1 - reduction));
      }
    } else if (filter.type === "boolean") {
      // Boolean filter
      if (userValue === true) {
        const trueOption = filter.options.find((opt) => opt.value === true);
        if (trueOption && trueOption.impact) {
          const reduction = Math.abs(trueOption.impact) / 100;
          resultCount = Math.floor(resultCount * (1 - reduction));
        }
      }
    } else if (filter.type === "multiselect") {
      // Multi-select filter
      if (Array.isArray(userValue) && userValue.length > 0) {
        // Calculate average impact of selected options
        const selectedOptions = filter.options.filter((opt) =>
          userValue.includes(opt.value)
        );
        const avgImpact =
          selectedOptions.reduce((sum, opt) => sum + Math.abs(opt.impact || 0), 0) /
          selectedOptions.length;
        const reduction = avgImpact / 100;
        resultCount = Math.floor(resultCount * (1 - reduction));
      }
    }
  });

  return Math.max(1, resultCount); // At least 1 result
};

/**
 * Check if user used recommended filters
 * @param {object} appliedFilters - Filters user selected
 * @param {object} recommendedCombination - Recommended filter combination
 * @returns {object} Comparison result
 */
const compareWithRecommended = (appliedFilters, recommendedCombination) => {
  const matches = {};
  let totalFilters = 0;
  let matchingFilters = 0;

  Object.keys(recommendedCombination).forEach((filterId) => {
    totalFilters++;
    const recommended = recommendedCombination[filterId];
    const applied = appliedFilters[filterId];

    if (Array.isArray(recommended)) {
      // Multi-select: check if at least some match
      const matchCount = recommended.filter((val) =>
        Array.isArray(applied) && applied.includes(val)
      ).length;
      matches[filterId] = matchCount > 0;
      if (matchCount >= Math.ceil(recommended.length / 2)) {
        matchingFilters++;
      }
    } else {
      // Single value
      matches[filterId] = applied === recommended;
      if (applied === recommended) {
        matchingFilters++;
      }
    }
  });

  return {
    matches,
    matchingFilters,
    totalFilters,
    percentage: (matchingFilters / totalFilters) * 100,
  };
};

/**
 * Validate user's filter selection
 * @param {object} appliedFilters - Filters user selected
 * @param {number} resultCount - Number of results after filtering
 * @param {object} validation - Validation rules
 * @returns {object} Validation result
 */
export const validateFilters = (appliedFilters, resultCount, validation) => {
  const issues = [];
  let isValid = true;

  // Check if required filters are used
  const missingRequired = validation.requiredFilters.filter(
    (filterId) => !appliedFilters[filterId]
  );

  if (missingRequired.length > 0) {
    issues.push(`Chybí povinné filtry: ${missingRequired.join(", ")}`);
    isValid = false;
  }

  // Check if result count is in target range
  const [minResults, maxResults] = validation.targetRange;
  const inRange = resultCount >= minResults && resultCount <= maxResults;

  if (resultCount > maxResults) {
    issues.push(`Příliš mnoho výsledků (${resultCount}). Cílový rozsah: ${minResults}-${maxResults}.`);
  } else if (resultCount < minResults) {
    issues.push(`Příliš málo výsledků (${resultCount}). Cílový rozsah: ${minResults}-${maxResults}.`);
  }

  // Compare with recommended combination
  const comparison = compareWithRecommended(
    appliedFilters,
    validation.recommendedCombination
  );

  return {
    isValid: isValid && inRange,
    issues,
    resultCount,
    inRange,
    missingRequired,
    recommendedComparison: comparison,
  };
};

/**
 * Calculate score for filter selection
 * @param {object} validationResult - Result from validateFilters
 * @param {object} scoring - Scoring rules
 * @returns {object} Score breakdown and total
 */
export const calculateScore = (validationResult, scoring) => {
  let score = 0;
  const breakdown = [];

  const { inRange, missingRequired, recommendedComparison } = validationResult;

  // Points for using recommended filters
  if (recommendedComparison.percentage >= 80) {
    score += scoring.correctFilters;
    breakdown.push({
      label: "Správné filtry použity",
      points: scoring.correctFilters,
      earned: true,
    });
  } else if (recommendedComparison.percentage >= 50) {
    const partialPoints = Math.floor(scoring.correctFilters * 0.6);
    score += partialPoints;
    breakdown.push({
      label: "Částečně správné filtry",
      points: partialPoints,
      earned: true,
    });
  } else {
    breakdown.push({
      label: "Optimální filtry",
      points: scoring.correctFilters,
      earned: false,
    });
  }

  // Points for appropriate result count
  if (inRange) {
    score += scoring.appropriateResults;
    breakdown.push({
      label: "Vhodný počet výsledků",
      points: scoring.appropriateResults,
      earned: true,
    });
  } else {
    breakdown.push({
      label: "Vhodný počet výsledků",
      points: scoring.appropriateResults,
      earned: false,
    });
  }

  // Points for quality criteria (peer-review + year)
  const hasPeerReview = recommendedComparison.matches.peerReview;
  const hasYearFilter = recommendedComparison.matches.year;

  if (hasPeerReview && hasYearFilter) {
    score += scoring.qualityCriteria;
    breakdown.push({
      label: "Kvalitní zdroje (peer-review + aktuálnost)",
      points: scoring.qualityCriteria,
      earned: true,
    });
  } else if (hasPeerReview || hasYearFilter) {
    const partialPoints = Math.floor(scoring.qualityCriteria * 0.5);
    score += partialPoints;
    breakdown.push({
      label: "Částečná kvalita zdrojů",
      points: partialPoints,
      earned: true,
    });
  } else {
    breakdown.push({
      label: "Kvalitní zdroje",
      points: scoring.qualityCriteria,
      earned: false,
    });
  }

  // Points for smart selection (balance)
  const smartSelection =
    inRange &&
    recommendedComparison.percentage >= 60 &&
    missingRequired.length === 0;

  if (smartSelection) {
    score += scoring.smartSelection;
    breakdown.push({
      label: "Chytrý výběr filtrů",
      points: scoring.smartSelection,
      earned: true,
    });
  } else {
    breakdown.push({
      label: "Vyvážený výběr filtrů",
      points: scoring.smartSelection,
      earned: false,
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
  const { inRange, resultCount, recommendedComparison, missingRequired } =
    validationResult;
  const [minResults, maxResults] = [10, 30]; // Default range

  if (
    inRange &&
    recommendedComparison.percentage >= 80 &&
    missingRequired.length === 0
  ) {
    return feedbackMessages.perfect;
  }

  if (missingRequired.length > 0 || recommendedComparison.percentage < 50) {
    return feedbackMessages.missingQuality;
  }

  if (resultCount > maxResults) {
    return feedbackMessages.tooManyResults;
  }

  if (resultCount < minResults) {
    return feedbackMessages.tooFewResults;
  }

  if (inRange && recommendedComparison.percentage >= 60) {
    return feedbackMessages.goodFiltering;
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
      level: "Perfektní!",
      message: "Výborná filtrace s optimálními výsledky!",
      color: "#22c55e",
      icon: "🌟",
    };
  } else if (percentage >= 70) {
    return {
      level: "Velmi dobře",
      message: "Dobrá filtrace s několika drobnými nedostatky.",
      color: "#3b82f6",
      icon: "✅",
    };
  } else if (percentage >= 50) {
    return {
      level: "Uspokojivě",
      message: "Základní filtrace v pořádku, ale zkuste vylepšit.",
      color: "#f59e0b",
      icon: "⚠️",
    };
  } else {
    return {
      level: "Nedostatečně",
      message: "Filtrace potřebuje výrazné zlepšení.",
      color: "#ef4444",
      icon: "❌",
    };
  }
};
