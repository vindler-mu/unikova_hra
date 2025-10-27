/**
 * Round 1 Utilities: Abstract Sentences - Validation and Scoring
 */

/**
 * Validate abstract sentence assignments
 * @param {Object} assignedSentences - Sentences assigned to sections {sectionId: [sentences]}
 * @param {Array} allSentences - All available sentences with correctSection
 * @returns {Object} Validation results with scores
 */
export const validateAbstractSentences = (assignedSentences, allSentences) => {
  let totalScore = 0;
  const breakdown = [];

  let correctAssignments = 0;
  let totalAssignments = 0;
  let redHerringsUsed = 0;

  // Count correct assignments
  Object.entries(assignedSentences).forEach(([sectionId, sentences]) => {
    sentences.forEach(sentence => {
      totalAssignments++;

      if (sentence.correctSection === sectionId) {
        correctAssignments++;
      }

      // Check if red herring was used
      if (sentence.isRedHerring) {
        redHerringsUsed++;
      }
    });
  });

  // Scoring: 70% for correct assignments
  const assignmentScore = Math.round((correctAssignments / allSentences.filter(s => !s.isRedHerring).length) * 70);
  totalScore += assignmentScore;

  breakdown.push({
    label: `Správně přiřazeno ${correctAssignments} vět`,
    points: assignmentScore,
    earned: true
  });

  // Penalty for using red herrings: -5 points each
  const redHerringPenalty = redHerringsUsed * 5;
  if (redHerringsUsed > 0) {
    totalScore -= redHerringPenalty;
    breakdown.push({
      label: `Použito ${redHerringsUsed} nevhodných vět`,
      points: -redHerringPenalty,
      earned: false
    });
  }

  // Bonus for perfect order within sections: 30%
  let orderScore = 0;
  Object.entries(assignedSentences).forEach(([sectionId, sentences]) => {
    const correctSentences = sentences.filter(s => s.correctSection === sectionId && !s.isRedHerring);

    if (correctSentences.length > 1) {
      let correctOrder = true;
      for (let i = 1; i < correctSentences.length; i++) {
        if (correctSentences[i].order < correctSentences[i-1].order) {
          correctOrder = false;
          break;
        }
      }

      if (correctOrder) {
        orderScore += 7.5; // 30 points / 4 sections = 7.5 per section
      }
    }
  });

  orderScore = Math.round(orderScore);
  totalScore += orderScore;

  if (orderScore > 0) {
    breakdown.push({
      label: `Správné pořadí vět`,
      points: orderScore,
      earned: true
    });
  }

  const maxScore = 100;
  const percentage = Math.round((totalScore / maxScore) * 100);

  return {
    totalScore: Math.max(0, totalScore),
    maxScore,
    percentage: Math.max(0, percentage),
    correctAssignments,
    totalAssignments,
    redHerringsUsed,
    breakdown,
    passed: totalScore >= 70
  };
};

/**
 * Get feedback for abstract sentence performance
 * @param {number} percentage - Score percentage
 * @returns {Object} Feedback message and icon
 */
export const getAbstractFeedback = (percentage) => {
  if (percentage >= 90) {
    return {
      level: "Vynikající!",
      message: "Perfektně strukturovaný abstrakt! Rozumíte struktuře vědeckého článku.",
      color: "#22c55e",
      icon: "📄"
    };
  } else if (percentage >= 70) {
    return {
      level: "Velmi dobře",
      message: "Dobrá znalost struktury abstraktu, jen pár chyb v přiřazení.",
      color: "#3b82f6",
      icon: "✅"
    };
  } else if (percentage >= 50) {
    return {
      level: "Uspokojivě",
      message: "Základní strukturu zvládáte, ale zaměřte se na rozdíly mezi sekcemi.",
      color: "#f59e0b",
      icon: "⚠️"
    };
  } else {
    return {
      level: "Nedostatečně",
      message: "Struktura abstraktu potřebuje zlepšení. Prostudujte části abstraktu.",
      color: "#ef4444",
      icon: "❌"
    };
  }
};

/**
 * Check if sentence is correctly assigned
 * @param {Object} sentence - Sentence object
 * @param {string} sectionId - Section ID where sentence was placed
 * @returns {boolean} True if correctly assigned
 */
export const isCorrectlyAssigned = (sentence, sectionId) => {
  return sentence.correctSection === sectionId;
};

/**
 * Get inline feedback for sentence placement
 * @param {Object} sentence - Sentence object
 * @param {string} sectionId - Section where sentence was placed
 * @returns {Object} Feedback { correct, message, color }
 */
export const getInlineSentenceFeedback = (sentence, sectionId) => {
  if (sentence.isRedHerring) {
    return {
      correct: false,
      message: "✗ Tato věta nepatří do abstraktu",
      color: "#ef4444"
    };
  }

  const correct = sentence.correctSection === sectionId;

  if (correct) {
    return {
      correct: true,
      message: "✓ Správně!",
      color: "#22c55e"
    };
  } else {
    return {
      correct: false,
      message: "✗ Špatná sekce",
      color: "#ef4444"
    };
  }
};

/**
 * Check if all sentences are assigned
 * @param {Object} assignedSentences - Assigned sentences by section
 * @param {Array} allSentences - All available sentences
 * @returns {boolean} True if all non-red-herring sentences assigned
 */
export const allSentencesAssigned = (assignedSentences, allSentences) => {
  const nonRedHerring = allSentences.filter(s => !s.isRedHerring);
  const assignedCount = Object.values(assignedSentences).reduce(
    (sum, sentences) => sum + sentences.filter(s => !s.isRedHerring).length,
    0
  );
  return assignedCount >= nonRedHerring.length;
};

/**
 * Get section status
 * @param {string} sectionId - Section ID
 * @param {Array} assignedSentences - Sentences in this section
 * @param {Object} sectionConfig - Section configuration
 * @returns {Object} Status { ok, message }
 */
export const getSectionStatus = (sectionId, assignedSentences, sectionConfig) => {
  const count = assignedSentences.length;
  const { minSentences, maxSentences } = sectionConfig;

  if (count < minSentences) {
    return {
      ok: false,
      message: `Potřebuje alespoň ${minSentences} vět`
    };
  }

  if (count > maxSentences) {
    return {
      ok: false,
      message: `Maximum ${maxSentences} vět`
    };
  }

  return {
    ok: true,
    message: `${count} vět`
  };
};
