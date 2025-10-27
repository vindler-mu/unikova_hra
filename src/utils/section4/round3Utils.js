/**
 * Round 3 Utilities: Peer Review - Validation and Scoring
 */

/**
 * Validate peer review (issues + strengths)
 * @param {Object} identifiedIssues - Issues identified {paragraphId: issueType}
 * @param {Array} selectedStrengths - Selected strength IDs
 * @param {Object} data - Round data with correct answers
 * @returns {Object} Validation results with scores
 */
export const validatePeerReview = (identifiedIssues, selectedStrengths, data) => {
  let totalScore = 0;
  const breakdown = [];

  // 1. Issues identification (75 points)
  const paragraphsWithIssues = data.articleParagraphs.filter(p => p.hasIssue);
  let correctIssues = 0;
  let incorrectIdentifications = 0;

  paragraphsWithIssues.forEach(paragraph => {
    const identifiedType = identifiedIssues[paragraph.id];

    if (identifiedType === paragraph.issueType) {
      correctIssues++;
    }
  });

  // Check for false positives (clicking paragraphs without issues)
  Object.keys(identifiedIssues).forEach(paragraphId => {
    const paragraph = data.articleParagraphs.find(p => p.id === paragraphId);
    if (paragraph && !paragraph.hasIssue) {
      incorrectIdentifications++;
    }
  });

  // Scoring: 15 points per correctly identified issue
  const issuesScore = correctIssues * 15;
  totalScore += issuesScore;

  breakdown.push({
    label: `Správně identifikováno ${correctIssues}/${paragraphsWithIssues.length} problémů`,
    points: issuesScore,
    earned: true
  });

  // Penalty for false positives: -5 points each
  if (incorrectIdentifications > 0) {
    const penalty = incorrectIdentifications * 5;
    totalScore -= penalty;
    breakdown.push({
      label: `Falešně označeno ${incorrectIdentifications} problémů`,
      points: -penalty,
      earned: false
    });
  }

  // 2. Strengths selection (25 points)
  const correctStrengths = data.strengths.filter(s => s.isCorrect);
  let correctlySelected = 0;
  let incorrectlySelected = 0;

  selectedStrengths.forEach(strengthId => {
    const strength = data.strengths.find(s => s.id === strengthId);
    if (strength && strength.isCorrect) {
      correctlySelected++;
    } else {
      incorrectlySelected++;
    }
  });

  // Scoring: 10 points per correct strength, -5 per incorrect
  const strengthsScore = (correctlySelected * 10) - (incorrectlySelected * 5);
  totalScore += strengthsScore;

  breakdown.push({
    label: `Silné stránky: ${correctlySelected} správných, ${incorrectlySelected} chybných`,
    points: strengthsScore,
    earned: strengthsScore > 0
  });

  const maxScore = 100;
  const percentage = Math.round((totalScore / maxScore) * 100);

  return {
    totalScore: Math.max(0, totalScore),
    maxScore,
    percentage: Math.max(0, percentage),
    correctIssues,
    totalIssues: paragraphsWithIssues.length,
    incorrectIdentifications,
    correctlySelected,
    incorrectlySelected,
    breakdown,
    passed: totalScore >= 70
  };
};

/**
 * Get feedback for peer review performance
 * @param {number} percentage - Score percentage
 * @returns {Object} Feedback message and icon
 */
export const getPeerReviewFeedback = (percentage) => {
  if (percentage >= 90) {
    return {
      level: "Vynikající!",
      message: "Perfektní peer review! Máte vynikající kritické myšlení a schopnost hodnotit vědeckou práci.",
      color: "#22c55e",
      icon: "👥"
    };
  } else if (percentage >= 70) {
    return {
      level: "Velmi dobře",
      message: "Dobrá schopnost identifikace problémů. Většinu jste zachytili správně.",
      color: "#3b82f6",
      icon: "✅"
    };
  } else if (percentage >= 50) {
    return {
      level: "Uspokojivě",
      message: "Základy peer review zvládáte, ale zaměřte se na detaily a kritické čtení.",
      color: "#f59e0b",
      icon: "⚠️"
    };
  } else {
    return {
      level: "Nedostatečně",
      message: "Peer review potřebuje zlepšení. Procvičte kritické hodnocení vědeckých textů.",
      color: "#ef4444",
      icon: "❌"
    };
  }
};

/**
 * Get feedback for paragraph issue identification
 * @param {Object} paragraph - Paragraph object
 * @param {string} identifiedType - Identified issue type
 * @returns {Object} Feedback { status, message, color }
 */
export const getParagraphFeedback = (paragraph, identifiedType) => {
  if (!identifiedType) {
    return null;
  }

  if (!paragraph.hasIssue) {
    return {
      status: "false_positive",
      message: "✗ Tato část je v pořádku",
      color: "#ef4444"
    };
  }

  const isCorrect = paragraph.issueType === identifiedType;

  if (isCorrect) {
    return {
      status: "correct",
      message: "✓ Správně identifikováno!",
      color: "#22c55e",
      explanation: paragraph.explanation
    };
  } else {
    return {
      status: "wrong_type",
      message: "✗ Problém je jiného typu",
      color: "#ef4444"
    };
  }
};

/**
 * Check if minimum issues are identified
 * @param {Object} identifiedIssues - Current identified issues
 * @param {number} required - Required minimum
 * @returns {boolean} True if requirement met
 */
export const hasMinimumIssues = (identifiedIssues, required = 4) => {
  return Object.keys(identifiedIssues).length >= required;
};

/**
 * Check if minimum strengths are selected
 * @param {Array} selectedStrengths - Selected strength IDs
 * @param {number} required - Required minimum
 * @returns {boolean} True if requirement met
 */
export const hasMinimumStrengths = (selectedStrengths, required = 2) => {
  return selectedStrengths.length >= required;
};
