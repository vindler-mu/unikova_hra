/**
 * Round 1 Utilities: Citation Management - Validation and Scoring
 */

/**
 * Validate citation management
 * @param {Object} assignedSources - Sources assigned to categories {categoryId: [sources]}
 * @param {Object} data - Round data with correct answers
 * @returns {Object} Validation results with scores
 */
export const validateCitationManagement = (assignedSources, data) => {
  let totalScore = 0;
  const breakdown = [];
  let correctAssignments = 0;
  const totalSources = data.sources.length;

  // Check each assigned source
  Object.entries(assignedSources).forEach(([categoryId, sources]) => {
    sources.forEach(source => {
      if (source.correctCategory === categoryId) {
        correctAssignments++;
      }
    });
  });

  // 100% - All sources must be correctly categorized
  const percentage = Math.round((correctAssignments / totalSources) * 100);
  totalScore = percentage;

  breakdown.push({
    label: `Správně zařazeno ${correctAssignments}/${totalSources} zdrojů`,
    points: totalScore,
    earned: true
  });

  const maxScore = 100;

  return {
    totalScore,
    maxScore,
    percentage,
    correctAssignments,
    totalSources,
    breakdown,
    passed: totalScore >= 70
  };
};

/**
 * Get feedback for citation management performance
 * @param {number} percentage - Score percentage
 * @returns {Object} Feedback message and icon
 */
export const getCitationFeedback = (percentage) => {
  if (percentage >= 90) {
    return {
      level: "Vynikající!",
      message: "Perfektní třídění zdrojů! Rozumíte typům publikací.",
      color: "#22c55e",
      icon: "📚"
    };
  } else if (percentage >= 70) {
    return {
      level: "Velmi dobře",
      message: "Dobrá znalost typů publikací, jen pár chyb.",
      color: "#3b82f6",
      icon: "✅"
    };
  } else if (percentage >= 50) {
    return {
      level: "Uspokojivě",
      message: "Základy zvládáte, ale zaměřte se na rozdíly mezi typy zdrojů.",
      color: "#f59e0b",
      icon: "⚠️"
    };
  } else {
    return {
      level: "Nedostatečně",
      message: "Třídění zdrojů potřebuje zlepšení. Prostudujte typy publikací.",
      color: "#ef4444",
      icon: "❌"
    };
  }
};

/**
 * Check if source is in correct category
 * @param {Object} source - Source object
 * @param {string} categoryId - Category ID
 * @returns {boolean} True if correctly placed
 */
export const isCorrectCategory = (source, categoryId) => {
  return source.correctCategory === categoryId;
};

/**
 * Get inline feedback for source placement
 * @param {Object} source - Source object
 * @param {string} categoryId - Category where source was placed
 * @returns {Object} Feedback { correct, message }
 */
export const getInlineFeedback = (source, categoryId) => {
  const correct = source.correctCategory === categoryId;

  if (correct) {
    return {
      correct: true,
      message: "✓ Správně!",
      color: "#22c55e"
    };
  } else {
    return {
      correct: false,
      message: "✗ Nesprávně",
      color: "#ef4444"
    };
  }
};

/**
 * Format citation for preview
 * @param {Object} citationData - Citation data
 * @param {string} style - Citation style (apa/iso690)
 * @returns {string} Formatted citation
 */
export const formatCitation = (citationData, style = "apa") => {
  return citationData[style.toLowerCase()] || citationData.apa;
};

/**
 * Check if all sources are assigned
 * @param {Object} assignedSources - Assigned sources by category
 * @param {number} totalSources - Total number of sources
 * @returns {boolean} True if all sources assigned
 */
export const allSourcesAssigned = (assignedSources, totalSources) => {
  const assignedCount = Object.values(assignedSources).reduce(
    (sum, sources) => sum + sources.length,
    0
  );
  return assignedCount === totalSources;
};
