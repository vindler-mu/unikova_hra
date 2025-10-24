/**
 * Utility functions for Round 1: Keyword Selection
 * Handles validation and scoring logic
 */

/**
 * Validates the selected keywords against requirements
 * @param {Array} selectedWords - Array of selected word objects
 * @param {Object} validation - Validation rules {minCorrect, maxWords, maxIncorrect}
 * @returns {Object} - {isValid, correctCount, incorrectCount, message}
 */
export const validateSelection = (selectedWords, validation) => {
  const correctWords = selectedWords.filter((word) => word.isCorrect);
  const incorrectWords = selectedWords.filter((word) => !word.isCorrect);

  const correctCount = correctWords.length;
  const incorrectCount = incorrectWords.length;

  // Check minimum correct words
  if (correctCount < validation.minCorrect) {
    return {
      isValid: false,
      correctCount,
      incorrectCount,
      message: `Potřebuješ vybrat alespoň ${validation.minCorrect} správných klíčových slov. Máš ${correctCount}.`,
    };
  }

  // Check maximum incorrect words
  if (incorrectCount > validation.maxIncorrect) {
    return {
      isValid: false,
      correctCount,
      incorrectCount,
      message: `Máš příliš mnoho nesprávných slov (${incorrectCount}). Maximum je ${validation.maxIncorrect}.`,
    };
  }

  // Success
  return {
    isValid: true,
    correctCount,
    incorrectCount,
    message: "Výborně! Tvůj výběr klíčových slov je správný.",
  };
};

/**
 * Calculates score based on selection quality
 * @param {Array} selectedWords - Array of selected word objects
 * @param {Object} scoring - Scoring rules {correctWord, incorrectWord, academicBonus, maxScore}
 * @returns {Object} - {score, breakdown, percentage}
 */
export const calculateScore = (selectedWords, scoring) => {
  let score = 0;
  const breakdown = {
    correctPoints: 0,
    incorrectPenalty: 0,
    academicBonus: 0,
  };

  selectedWords.forEach((word) => {
    if (word.isCorrect) {
      // Points for correct word
      breakdown.correctPoints += scoring.correctWord;
      score += scoring.correctWord;

      // Bonus for high academic level
      if (word.academicLevel === "high") {
        breakdown.academicBonus += scoring.academicBonus;
        score += scoring.academicBonus;
      }
    } else {
      // Penalty for incorrect word
      breakdown.incorrectPenalty += scoring.incorrectWord;
      score += scoring.incorrectWord; // This will be negative
    }
  });

  // Ensure score doesn't go below 0
  score = Math.max(0, score);

  // Calculate percentage
  const percentage = Math.round((score / scoring.maxScore) * 100);

  return {
    score,
    breakdown,
    percentage,
    maxScore: scoring.maxScore,
  };
};

/**
 * Gets performance feedback based on score
 * @param {number} percentage - Score as percentage (0-100)
 * @returns {Object} - {level, message, color}
 */
export const getPerformanceFeedback = (percentage) => {
  if (percentage >= 90) {
    return {
      level: "Vynikající",
      message: "Perfektní výběr klíčových slov! Máš skvělé akademické dovednosti.",
      color: "#22c55e",
      icon: "🏆",
    };
  } else if (percentage >= 75) {
    return {
      level: "Velmi dobré",
      message: "Výborná práce! Tvůj výběr je kvalitní a akademicky přesný.",
      color: "#3b82f6",
      icon: "⭐",
    };
  } else if (percentage >= 60) {
    return {
      level: "Dobré",
      message: "Slušný výběr. Zkus příště více akademických termínů.",
      color: "#f59e0b",
      icon: "✓",
    };
  } else if (percentage >= 40) {
    return {
      level: "Průměrné",
      message: "Základy máš, ale potřebuješ zlepšit výběr klíčových slov.",
      color: "#ef4444",
      icon: "⚠️",
    };
  } else {
    return {
      level: "Nedostatečné",
      message: "Zkus se více zaměřit na akademické termíny a relevanci.",
      color: "#dc2626",
      icon: "✗",
    };
  }
};

/**
 * Checks if selection meets minimum requirements to validate
 * @param {Array} selectedWords - Array of selected word objects
 * @param {number} minWords - Minimum required words
 * @returns {boolean}
 */
export const canValidate = (selectedWords, minWords) => {
  return selectedWords.length >= minWords;
};

/**
 * Generates summary statistics for the selection
 * @param {Array} selectedWords - Array of selected word objects
 * @returns {Object} - Statistics object
 */
export const getSelectionStats = (selectedWords) => {
  const correct = selectedWords.filter((w) => w.isCorrect).length;
  const incorrect = selectedWords.filter((w) => !w.isCorrect).length;
  const highAcademic = selectedWords.filter(
    (w) => w.academicLevel === "high"
  ).length;
  const mediumAcademic = selectedWords.filter(
    (w) => w.academicLevel === "medium"
  ).length;
  const lowAcademic = selectedWords.filter(
    (w) => w.academicLevel === "low"
  ).length;

  return {
    total: selectedWords.length,
    correct,
    incorrect,
    correctPercentage: selectedWords.length
      ? Math.round((correct / selectedWords.length) * 100)
      : 0,
    academicLevels: {
      high: highAcademic,
      medium: mediumAcademic,
      low: lowAcademic,
    },
  };
};
