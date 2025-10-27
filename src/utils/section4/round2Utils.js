/**
 * Round 2 Utilities: Chart Matching - Validation and Scoring
 */

/**
 * Validate chart matching assignments
 * @param {Object} assignments - Chart assignments {datasetId: chartId}
 * @param {Array} datasets - All datasets with correctCharts
 * @returns {Object} Validation results with scores
 */
export const validateChartMatching = (assignments, datasets) => {
  let totalScore = 0;
  const breakdown = [];
  let perfectMatches = 0;
  let acceptableMatches = 0;
  let incorrectMatches = 0;

  // Evaluate each assignment
  datasets.forEach(dataset => {
    const assignedChart = assignments[dataset.id];

    if (!assignedChart) {
      incorrectMatches++;
      return;
    }

    // Check if assigned chart is in correctCharts array
    const isCorrect = dataset.correctCharts.includes(assignedChart);
    const isPrimary = dataset.primaryChart === assignedChart;

    if (isPrimary) {
      perfectMatches++;
      totalScore += 20; // Full points for primary choice
    } else if (isCorrect) {
      acceptableMatches++;
      totalScore += 15; // Partial points for acceptable alternative
    } else {
      incorrectMatches++;
    }
  });

  // Breakdown
  if (perfectMatches > 0) {
    breakdown.push({
      label: `Optimální volba grafu (${perfectMatches}×)`,
      points: perfectMatches * 20,
      earned: true
    });
  }

  if (acceptableMatches > 0) {
    breakdown.push({
      label: `Přijatelná alternativa (${acceptableMatches}×)`,
      points: acceptableMatches * 15,
      earned: true
    });
  }

  if (incorrectMatches > 0) {
    breakdown.push({
      label: `Nesprávná volba (${incorrectMatches}×)`,
      points: 0,
      earned: false
    });
  }

  const maxScore = 100;
  const percentage = Math.round((totalScore / maxScore) * 100);

  return {
    totalScore,
    maxScore,
    percentage,
    perfectMatches,
    acceptableMatches,
    incorrectMatches,
    breakdown,
    passed: totalScore >= 70
  };
};

/**
 * Get feedback for chart matching performance
 * @param {number} percentage - Score percentage
 * @returns {Object} Feedback message and icon
 */
export const getChartMatchingFeedback = (percentage) => {
  if (percentage >= 90) {
    return {
      level: "Vynikající!",
      message: "Perfektní výběr vizualizací! Rozumíte principům datové vizualizace.",
      color: "#22c55e",
      icon: "📊"
    };
  } else if (percentage >= 70) {
    return {
      level: "Velmi dobře",
      message: "Dobrá znalost vizualizací, většina voleb byla správná.",
      color: "#3b82f6",
      icon: "✅"
    };
  } else if (percentage >= 50) {
    return {
      level: "Uspokojivě",
      message: "Základy vizualizace znáte, ale zaměřte se na rozdíly mezi typy grafů.",
      color: "#f59e0b",
      icon: "⚠️"
    };
  } else {
    return {
      level: "Nedostatečně",
      message: "Výběr vizualizací potřebuje zlepšení. Prostudujte typy grafů a jejich použití.",
      color: "#ef4444",
      icon: "❌"
    };
  }
};

/**
 * Get feedback for specific dataset assignment
 * @param {Object} dataset - Dataset object
 * @param {string} assignedChartId - ID of assigned chart
 * @returns {Object} Feedback { status, message, color }
 */
export const getDatasetFeedback = (dataset, assignedChartId) => {
  if (!assignedChartId) {
    return {
      status: "pending",
      message: "Přiřaď graf",
      color: "#9ca3af"
    };
  }

  const isPrimary = dataset.primaryChart === assignedChartId;
  const isCorrect = dataset.correctCharts.includes(assignedChartId);

  if (isPrimary) {
    return {
      status: "perfect",
      message: "✓ Optimální volba!",
      color: "#22c55e"
    };
  } else if (isCorrect) {
    return {
      status: "acceptable",
      message: "✓ Přijatelná alternativa",
      color: "#3b82f6"
    };
  } else {
    return {
      status: "incorrect",
      message: "✗ Nevhodný typ grafu",
      color: "#ef4444"
    };
  }
};

/**
 * Check if all datasets have assigned charts
 * @param {Object} assignments - Current assignments
 * @param {Array} datasets - All datasets
 * @returns {boolean} True if all assigned
 */
export const allDatasetsAssigned = (assignments, datasets) => {
  return datasets.every(dataset => assignments[dataset.id]);
};

/**
 * Get chart type recommendation
 * @param {string} dataType - Type of data
 * @param {Array} chartTypes - Available chart types
 * @returns {Object} Recommended chart
 */
export const getChartRecommendation = (dataType, chartTypes) => {
  return chartTypes.find(chart =>
    chart.useCases.includes(dataType)
  );
};
