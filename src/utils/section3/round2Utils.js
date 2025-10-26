/**
 * Round 2 Utilities: Note-taking & Annotation - Validation and Scoring
 */

/**
 * Validate note-taking and annotation
 * @param {Object} highlights - Highlighted sentences {sentenceId: highlightCategory}
 * @param {Object} tags - Tags assigned to sentences {sentenceId: [tagIds]}
 * @param {string} note - User's synthesis note
 * @param {Object} data - Round data with correct answers
 * @returns {Object} Validation results with scores
 */
export const validateNoteTaking = (highlights, tags, note, data) => {
  let totalScore = 0;
  const breakdown = [];

  // 1. Highlighting Score (50%) - Correct highlight categories
  let highlightScore = 0;
  let correctHighlights = 0;
  const totalSentences = data.articleText.length;

  Object.entries(highlights).forEach(([sentId, highlightCategory]) => {
    const sentence = data.articleText.find(s => s.id === sentId);
    if (sentence && sentence.correctHighlight === highlightCategory) {
      correctHighlights++;
    }
  });

  if (totalSentences > 0) {
    highlightScore = Math.round((correctHighlights / totalSentences) * 50);
    breakdown.push({
      label: `Správně zvýrazněno ${correctHighlights}/${totalSentences} vět`,
      points: highlightScore,
      earned: true
    });
  }
  totalScore += highlightScore;

  // 2. Tagging Score (30%) - Appropriate tags selected
  let taggingScore = 0;
  let correctTags = 0;
  let totalCorrectTags = 0;

  data.articleText.forEach(sentence => {
    if (sentence.correctTags && sentence.correctTags.length > 0) {
      totalCorrectTags += sentence.correctTags.length;
      const sentenceTags = tags[sentence.id] || [];

      sentence.correctTags.forEach(correctTag => {
        if (sentenceTags.includes(correctTag)) {
          correctTags++;
        }
      });
    }
  });

  if (totalCorrectTags > 0) {
    taggingScore = Math.round((correctTags / totalCorrectTags) * 30);
    breakdown.push({
      label: `Správně označeno ${correctTags}/${totalCorrectTags} štítků`,
      points: taggingScore,
      earned: true
    });
  }
  totalScore += taggingScore;

  // 3. Note Writing Score (20%) - Length and keywords
  let noteScore = 0;
  const noteLength = note.length;

  if (noteLength >= 50 && noteLength <= 200) {
    noteScore = 10;
    breakdown.push({
      label: "Délka poznámky (50-200 znaků)",
      points: 10,
      earned: true
    });
  } else {
    breakdown.push({
      label: `Délka poznámky (${noteLength} znaků)`,
      points: 0,
      earned: false
    });
  }

  // Check for keywords
  let keywordCount = 0;
  if (data.noteSynthesisKeywords) {
    data.noteSynthesisKeywords.forEach(keyword => {
      if (note.toLowerCase().includes(keyword.toLowerCase())) {
        keywordCount++;
      }
    });

    if (keywordCount >= 2) {
      noteScore += 10;
      breakdown.push({
        label: `Klíčová slova (${keywordCount}/${data.noteSynthesisKeywords.length})`,
        points: 10,
        earned: true
      });
    } else {
      breakdown.push({
        label: `Klíčová slova (${keywordCount}/${data.noteSynthesisKeywords.length})`,
        points: 0,
        earned: false
      });
    }
  }

  totalScore += noteScore;

  const maxScore = 100;
  const percentage = Math.round((totalScore / maxScore) * 100);

  return {
    totalScore,
    maxScore,
    percentage,
    highlightScore,
    taggingScore,
    noteScore,
    breakdown,
    passed: totalScore >= 70
  };
};

/**
 * Get feedback for note-taking performance
 * @param {number} percentage - Score percentage
 * @returns {Object} Feedback message and icon
 */
export const getNoteTakingFeedback = (percentage) => {
  if (percentage >= 90) {
    return {
      level: "Vynikající!",
      message: "Perfektní poznámky! Rozumíte struktuře vědeckého textu a umíte identifikovat klíčové informace.",
      color: "#22c55e",
      icon: "📝"
    };
  } else if (percentage >= 70) {
    return {
      level: "Velmi dobře",
      message: "Dobrá práce s poznámkami. Většinu klíčových částí jste identifikovali správně.",
      color: "#3b82f6",
      icon: "✅"
    };
  } else if (percentage >= 50) {
    return {
      level: "Uspokojivě",
      message: "Základy poznámkování zvládáte, ale zaměřte se na přesnější identifikaci struktury textu.",
      color: "#f59e0b",
      icon: "⚠️"
    };
  } else {
    return {
      level: "Nedostatečně",
      message: "Poznámkování potřebuje zlepšení. Prostudujte strukturu vědeckého článku (cíl, metody, výsledky, závěry).",
      color: "#ef4444",
      icon: "❌"
    };
  }
};

/**
 * Check if minimum highlighting requirement is met
 * @param {Object} highlights - Current highlights
 * @param {number} minRequired - Minimum required highlights (default 3)
 * @returns {boolean} True if requirement met
 */
export const hasMinimumHighlights = (highlights, minRequired = 3) => {
  return Object.keys(highlights).length >= minRequired;
};

/**
 * Check if minimum tagging requirement is met
 * @param {Object} tags - Current tags
 * @param {number} minRequired - Minimum required tags (default 3)
 * @returns {boolean} True if requirement met
 */
export const hasMinimumTags = (tags, minRequired = 3) => {
  const totalTags = Object.values(tags).reduce((sum, arr) => sum + arr.length, 0);
  return totalTags >= minRequired;
};

/**
 * Get color for highlight category
 * @param {Array} categories - Highlight categories
 * @param {string} categoryId - Category ID
 * @returns {string} Color code
 */
export const getHighlightColor = (categories, categoryId) => {
  const category = categories.find(c => c.id === categoryId);
  return category ? category.color : "#fef08a";
};

/**
 * Count words in text
 * @param {string} text - Text to count
 * @returns {number} Word count
 */
export const countWords = (text) => {
  return text.trim().split(/\s+/).filter(word => word.length > 0).length;
};

/**
 * Validate note length
 * @param {string} note - Note text
 * @param {number} min - Minimum length (default 50)
 * @param {number} max - Maximum length (default 200)
 * @returns {Object} Validation result { valid, message }
 */
export const validateNoteLength = (note, min = 50, max = 200) => {
  const length = note.length;

  if (length < min) {
    return {
      valid: false,
      message: `Příliš krátké (${length}/${min} znaků)`
    };
  }

  if (length > max) {
    return {
      valid: false,
      message: `Příliš dlouhé (${length}/${max} znaků)`
    };
  }

  return {
    valid: true,
    message: `${length}/${max} znaků`
  };
};
