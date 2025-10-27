/**
 * Round 4 Utilities: Literature Structuring - Validation and Scoring
 */

/**
 * Validate literature structure
 * @param {Object} assignedSources - Sources assigned to sections {sectionId: [sources]}
 * @param {string} gapAnalysisAnswer - User's gap analysis answer
 * @param {Object} data - Round data with correct answers
 * @returns {Object} Validation results with scores
 */
export const validateLiteratureStructure = (assignedSources, gapAnalysisAnswer, data) => {
  let totalScore = 0;
  const breakdown = [];

  // 1. Assignment Score (60%) - Correct section placement
  let assignmentScore = 0;
  let correctAssignments = 0;
  let totalSources = data.sources.length;

  Object.entries(assignedSources).forEach(([sectionId, sources]) => {
    sources.forEach(source => {
      if (source.correctSection === sectionId) {
        correctAssignments++;
      }
    });
  });

  assignmentScore = Math.round((correctAssignments / totalSources) * 60);
  breakdown.push({
    label: `Správně zařazeno ${correctAssignments}/${totalSources} zdrojů`,
    points: assignmentScore,
    earned: true
  });
  totalScore += assignmentScore;

  // 2. Ordering Score (30%) - Only if required
  let orderingScore = 0;
  if (data.requiresOrdering && data.orderingRules) {
    let correctOrderings = 0;
    let totalOrderedSections = 0;

    Object.entries(data.orderingRules || {}).forEach(([sectionId, rule]) => {
      const sectionSources = assignedSources[sectionId] || [];
      if (sectionSources.length > 1) {
        totalOrderedSections++;

        if (rule.rule === 'chronological') {
          const isCorrect = checkChronologicalOrder(sectionSources);
          if (isCorrect) correctOrderings++;
        }
      }
    });

    if (totalOrderedSections > 0) {
      orderingScore = Math.round((correctOrderings / totalOrderedSections) * 30);
    } else {
      orderingScore = 30;
    }
  } else {
    orderingScore = 30; // No ordering required
  }

  breakdown.push({
    label: data.requiresOrdering ? `Pořadí zdrojů` : "Pořadí není vyžadováno",
    points: orderingScore,
    earned: true
  });
  totalScore += orderingScore;

  // 3. Gap Analysis Score (10%)
  let gapScore = 0;
  if (data.gapAnalysisQuestions && data.gapAnalysisQuestions.length > 0) {
    const question = data.gapAnalysisQuestions[0];

    if (question.type === 'multiple-choice') {
      // Check if answer contains correct option
      const hasCorrect = question.correctAnswer.some(
        ans => gapAnalysisAnswer.toLowerCase().includes(ans.toLowerCase())
      );
      gapScore = hasCorrect ? 10 : 0;
    } else {
      // Free text - keyword matching
      const hasKeywords = question.correctAnswer.some(
        keyword => gapAnalysisAnswer.toLowerCase().includes(keyword.toLowerCase())
      );
      gapScore = hasKeywords ? 10 : 0;
    }
  } else {
    gapScore = 10; // No gap analysis
  }

  breakdown.push({
    label: "Gap analysis",
    points: gapScore,
    earned: true
  });
  totalScore += gapScore;

  const maxScore = 100;
  const percentage = Math.round((totalScore / maxScore) * 100);

  return {
    totalScore,
    maxScore,
    percentage,
    assignmentScore,
    orderingScore,
    gapScore,
    breakdown,
    passed: totalScore >= 70
  };
};

/**
 * Check if sources are in chronological order
 * @param {Array} sources - Sources to check
 * @returns {boolean} True if in chronological order
 */
export const checkChronologicalOrder = (sources) => {
  for (let i = 0; i < sources.length - 1; i++) {
    const currentYear = sources[i].displayData?.year || sources[i].orderPriority || 0;
    const nextYear = sources[i + 1].displayData?.year || sources[i + 1].orderPriority || 0;

    if (currentYear > nextYear) {
      return false;
    }
  }
  return true;
};

/**
 * Get feedback for literature structuring performance
 * @param {number} percentage - Score percentage
 * @returns {Object} Feedback message and icon
 */
export const getLiteratureFeedback = (percentage) => {
  if (percentage >= 90) {
    return {
      level: "Vynikající!",
      message: "Perfektní strukturování literatury! Rozumíte organizaci výzkumu.",
      color: "#22c55e",
      icon: "📚"
    };
  } else if (percentage >= 70) {
    return {
      level: "Velmi dobře",
      message: "Dobrá struktura s většinou správně zařazených zdrojů.",
      color: "#3b82f6",
      icon: "✅"
    };
  } else if (percentage >= 50) {
    return {
      level: "Uspokojivě",
      message: "Základy strukturování zvládáte, ale zaměřte se na logiku sekcí.",
      color: "#f59e0b",
      icon: "⚠️"
    };
  } else {
    return {
      level: "Nedostatečně",
      message: "Strukturování potřebuje zlepšení. Zkontrolujte, kam jednotlivé zdroje patří.",
      color: "#ef4444",
      icon: "❌"
    };
  }
};

/**
 * Validate section requirements (min/max sources)
 * @param {Object} section - Section configuration
 * @param {number} sourceCount - Number of sources in section
 * @returns {Object} Validation result { isValid, message }
 */
export const validateSectionRequirements = (section, sourceCount) => {
  const minSources = section.minSources || 0;
  const maxSources = section.maxSources || Infinity;

  if (sourceCount < minSources) {
    return {
      isValid: false,
      message: `Potřebujete alespoň ${minSources} zdroje`
    };
  }

  if (sourceCount > maxSources) {
    return {
      isValid: false,
      message: `Maximálně ${maxSources} zdrojů`
    };
  }

  return {
    isValid: true,
    message: "✓"
  };
};
