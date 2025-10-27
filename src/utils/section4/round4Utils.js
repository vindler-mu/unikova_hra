/**
 * Section 4 - Round 4: Publication Strategy
 * Validation and scoring utilities
 */

/**
 * Validate publication strategy assignments
 * @param {Object} assignments - User's assignments {projectId: channelId}
 * @param {Array} projects - Research projects data
 * @returns {Object} Validation results with scores
 */
export const validatePublicationStrategy = (assignments, projects) => {
  let totalScore = 0;
  const breakdown = [];
  const projectFeedback = {};

  projects.forEach((project) => {
    const userChannel = assignments[project.id];
    const isPrimary = userChannel === project.primaryChannel;
    const isAcceptable = project.correctChannels.includes(userChannel);

    if (isPrimary) {
      // Perfect choice - full points
      totalScore += 20;
      breakdown.push({
        label: `${project.title.substring(0, 40)}... - Optimální volba`,
        points: 20,
        earned: true,
      });
      projectFeedback[project.id] = {
        status: "perfect",
        message: "Výborně! Ideální publikační kanál.",
      };
    } else if (isAcceptable) {
      // Acceptable alternative - partial points
      totalScore += 15;
      breakdown.push({
        label: `${project.title.substring(0, 40)}... - Přijatelná volba`,
        points: 15,
        earned: true,
      });
      projectFeedback[project.id] = {
        status: "acceptable",
        message: "Dobré! Přijatelná alternativa.",
      };
    } else {
      // Wrong choice - no points
      breakdown.push({
        label: `${project.title.substring(0, 40)}... - Nevhodná volba`,
        points: 0,
        earned: false,
      });
      projectFeedback[project.id] = {
        status: "incorrect",
        message: "Nevhodný kanál pro tento typ výzkumu.",
      };
    }
  });

  const maxScore = projects.length * 20;
  const percentage = Math.round((totalScore / maxScore) * 100);

  return {
    totalScore,
    maxScore,
    percentage,
    breakdown,
    projectFeedback,
    passed: totalScore >= maxScore * 0.7,
  };
};

/**
 * Get feedback based on performance percentage
 * @param {number} percentage - Score percentage
 * @returns {Object} Feedback message and styling
 */
export const getPublicationFeedback = (percentage) => {
  if (percentage >= 90) {
    return {
      level: "Vynikající!",
      message:
        "Perfektní výběr publikačních kanálů! Rozumíš strategii šíření výzkumu.",
      color: "#22c55e",
      icon: "🎯",
    };
  } else if (percentage >= 75) {
    return {
      level: "Velmi dobré",
      message:
        "Většinu publikačních strategií jsi zvládl správně. Dobré pochopení akademického publikování.",
      color: "#3b82f6",
      icon: "✓",
    };
  } else if (percentage >= 60) {
    return {
      level: "Uspokojivé",
      message:
        "Základní pochopení publikačních kanálů, ale některé volby nebyly optimální.",
      color: "#f59e0b",
      icon: "~",
    };
  } else {
    return {
      level: "Nedostatečné",
      message:
        "Potřebuješ lépe pochopit, které výzkumy patří do kterých publikačních kanálů.",
      color: "#ef4444",
      icon: "✗",
    };
  }
};

/**
 * Get project-specific feedback
 * @param {string} projectId - Project ID
 * @param {Object} projectFeedback - Feedback object from validation
 * @returns {Object} Feedback styling
 */
export const getProjectFeedback = (projectId, projectFeedback) => {
  if (!projectFeedback || !projectFeedback[projectId]) {
    return null;
  }

  const feedback = projectFeedback[projectId];

  switch (feedback.status) {
    case "perfect":
      return {
        className: "perfect",
        color: "#22c55e",
        icon: "✓",
        message: feedback.message,
      };
    case "acceptable":
      return {
        className: "acceptable",
        color: "#3b82f6",
        icon: "~",
        message: feedback.message,
      };
    case "incorrect":
      return {
        className: "incorrect",
        color: "#ef4444",
        icon: "✗",
        message: feedback.message,
      };
    default:
      return null;
  }
};
