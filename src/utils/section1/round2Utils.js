/**
 * Round 2 Utilities: Query Validation and Scoring
 */

/**
 * Convert query tree to readable string for display
 * @param {object} queryTree - Query tree structure
 * @returns {string} Human-readable query string
 */
export const queryToString = (queryTree) => {
  if (!queryTree) return "";

  if (queryTree.type === "term") {
    return `"${queryTree.value}"`;
  }

  if (queryTree.type === "NOT") {
    const child = queryToString(queryTree.children[0]);
    return `NOT ${child}`;
  }

  if (queryTree.type === "AND" || queryTree.type === "OR") {
    const childStrings = queryTree.children.map(queryToString);
    return `(${childStrings.join(` ${queryTree.type} `)})`;
  }

  return "";
};

/**
 * Extract all terms from query tree
 * @param {object} queryTree - Query tree structure
 * @returns {Array<string>} Array of term values
 */
export const extractTerms = (queryTree) => {
  if (!queryTree) return [];

  if (queryTree.type === "term") {
    return [queryTree.value];
  }

  if (queryTree.children && Array.isArray(queryTree.children)) {
    return queryTree.children.flatMap(extractTerms);
  }

  return [];
};

/**
 * Extract excluded terms (those under NOT operators)
 * @param {object} queryTree - Query tree structure
 * @returns {Array<string>} Array of excluded term values
 */
export const extractExcludedTerms = (queryTree) => {
  if (!queryTree) return [];

  if (queryTree.type === "NOT") {
    return extractTerms(queryTree);
  }

  if (queryTree.children && Array.isArray(queryTree.children)) {
    return queryTree.children.flatMap(extractExcludedTerms);
  }

  return [];
};

/**
 * Count operators in query tree
 * @param {object} queryTree - Query tree structure
 * @returns {number} Number of operators
 */
export const countOperators = (queryTree) => {
  if (!queryTree) return 0;

  let count = 0;

  if (queryTree.type === "AND" || queryTree.type === "OR" || queryTree.type === "NOT") {
    count = 1;
  }

  if (queryTree.children && Array.isArray(queryTree.children)) {
    count += queryTree.children.reduce((sum, child) => sum + countOperators(child), 0);
  }

  return count;
};

/**
 * Validate user's query against requirements
 * @param {object} userQuery - User's constructed query tree
 * @param {object} validation - Validation rules
 * @returns {object} Validation result with feedback
 */
export const validateQuery = (userQuery, validation) => {
  const issues = [];
  let isValid = true;

  if (!userQuery || !userQuery.type) {
    return {
      isValid: false,
      issues: ["Dotaz je prázdný. Začněte výběrem pojmů a operátorů."],
      feedback: validation.feedback.tooSimple,
    };
  }

  // Extract terms from query
  const allTerms = extractTerms(userQuery);
  const excludedTerms = extractExcludedTerms(userQuery);
  const includedTerms = allTerms.filter(term => !excludedTerms.includes(term));

  // Check required terms
  const missingRequired = validation.requiredTerms.filter(
    (term) => !includedTerms.includes(term)
  );

  if (missingRequired.length > 0) {
    isValid = false;
    issues.push(`Chybějící povinné pojmy: ${missingRequired.join(", ")}`);
  }

  // Check forbidden terms are excluded
  const forbiddenNotExcluded = validation.forbiddenTerms.filter(
    (term) => includedTerms.includes(term)
  );

  if (forbiddenNotExcluded.length > 0) {
    isValid = false;
    issues.push(`Tyto pojmy by měly být vyloučeny: ${forbiddenNotExcluded.join(", ")}`);
  }

  const forbiddenNotPresent = validation.forbiddenTerms.filter(
    (term) => !excludedTerms.includes(term) && !allTerms.includes(term)
  );

  if (forbiddenNotPresent.length > 0) {
    isValid = false;
    issues.push(`Nezapomněli jste vyloučit: ${forbiddenNotPresent.join(", ")}?`);
  }

  // Check complexity
  const operatorCount = countOperators(userQuery);
  if (operatorCount < validation.minComplexity) {
    isValid = false;
    issues.push(`Dotaz je příliš jednoduchý. Použijte alespoň ${validation.minComplexity} operátory.`);
  }

  // Determine feedback message
  let feedback = validation.feedback.excellent;
  if (!isValid) {
    if (missingRequired.length > 0) {
      feedback = validation.feedback.missingRequired;
    } else if (forbiddenNotExcluded.length > 0 || forbiddenNotPresent.length > 0) {
      feedback = validation.feedback.notExcludingForbidden;
    } else if (operatorCount < validation.minComplexity) {
      feedback = validation.feedback.tooSimple;
    }
  }

  return {
    isValid,
    issues,
    feedback,
    includedTerms,
    excludedTerms,
    operatorCount,
  };
};

/**
 * Calculate score for user's query
 * @param {object} validationResult - Result from validateQuery
 * @param {object} scoring - Scoring rules
 * @returns {object} Score breakdown and total
 */
export const calculateScore = (validationResult, scoring) => {
  let score = 0;
  const breakdown = [];

  if (validationResult.isValid) {
    // Full points for correct structure
    score += scoring.correctStructure;
    breakdown.push({
      label: "Správná struktura dotazu",
      points: scoring.correctStructure,
      earned: true,
    });

    // Points for including all required terms
    score += scoring.includesAllRequired;
    breakdown.push({
      label: "Všechny povinné pojmy zahrnuty",
      points: scoring.includesAllRequired,
      earned: true,
    });

    // Points for excluding forbidden terms
    score += scoring.excludesForbidden;
    breakdown.push({
      label: "Nežádoucí pojmy vyloučeny",
      points: scoring.excludesForbidden,
      earned: true,
    });

    // Points for complexity
    score += scoring.useComplexity;
    breakdown.push({
      label: "Přiměřená komplexita",
      points: scoring.useComplexity,
      earned: true,
    });
  } else {
    // Partial credit based on what's correct

    // Structure partial credit (20% of full)
    breakdown.push({
      label: "Struktura dotazu",
      points: scoring.correctStructure,
      earned: false,
    });

    // Required terms partial credit
    const hasRequiredTerms = validationResult.issues.every(
      issue => !issue.includes("Chybějící povinné pojmy")
    );
    if (hasRequiredTerms) {
      score += scoring.includesAllRequired;
      breakdown.push({
        label: "Povinné pojmy zahrnuty",
        points: scoring.includesAllRequired,
        earned: true,
      });
    } else {
      breakdown.push({
        label: "Povinné pojmy zahrnuty",
        points: scoring.includesAllRequired,
        earned: false,
      });
    }

    // Exclusion partial credit
    const hasExclusions = validationResult.excludedTerms && validationResult.excludedTerms.length > 0;
    if (hasExclusions) {
      score += Math.floor(scoring.excludesForbidden * 0.5);
      breakdown.push({
        label: "Pokus o vyloučení pojmů",
        points: Math.floor(scoring.excludesForbidden * 0.5),
        earned: true,
      });
    } else {
      breakdown.push({
        label: "Vyloučení pojmů",
        points: scoring.excludesForbidden,
        earned: false,
      });
    }

    // Complexity partial credit
    if (validationResult.operatorCount >= 1) {
      score += Math.floor(scoring.useComplexity * 0.5);
      breakdown.push({
        label: "Použití operátorů",
        points: Math.floor(scoring.useComplexity * 0.5),
        earned: true,
      });
    } else {
      breakdown.push({
        label: "Komplexita dotazu",
        points: scoring.useComplexity,
        earned: false,
      });
    }
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
 * Get performance feedback based on score percentage
 * @param {number} percentage - Score percentage (0-100)
 * @returns {object} Performance feedback
 */
export const getPerformanceFeedback = (percentage) => {
  if (percentage >= 90) {
    return {
      level: "Výborně!",
      message: "Perfektní ovládání booleovských operátorů!",
      color: "#22c55e",
      icon: "🌟",
    };
  } else if (percentage >= 70) {
    return {
      level: "Dobře",
      message: "Dobrá práce s dotazy, drobné nedostatky.",
      color: "#3b82f6",
      icon: "✅",
    };
  } else if (percentage >= 50) {
    return {
      level: "Uspokojivě",
      message: "Základy jsou v pořádku, ale zkuste dotaz vylepšit.",
      color: "#f59e0b",
      icon: "⚠️",
    };
  } else {
    return {
      level: "Nedostatečně",
      message: "Dotaz potřebuje výrazné vylepšení.",
      color: "#ef4444",
      icon: "❌",
    };
  }
};
