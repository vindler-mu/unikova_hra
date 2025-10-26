/**
 * Round 3 Utilities: Concept Mapping - Validation and Scoring
 */

/**
 * Validate concept map
 * @param {Array} placedConcepts - Concepts placed on canvas
 * @param {Array} connections - Connections between concepts
 * @param {Array} selectedMilestones - Selected milestone concepts
 * @param {Object} data - Round data with correct answers
 * @returns {Object} Validation results with scores
 */
export const validateConceptMap = (placedConcepts, connections, selectedMilestones, data) => {
  let totalScore = 0;
  const breakdown = [];

  // 1. Placement Score (30%) - All concepts placed
  let placementScore = 0;
  if (placedConcepts.length === data.concepts.length) {
    placementScore = 30;
    breakdown.push({ label: "Všechny koncepty umístěny", points: 30, earned: true });
  } else {
    placementScore = Math.round((placedConcepts.length / data.concepts.length) * 30);
    breakdown.push({
      label: `Umístěno ${placedConcepts.length}/${data.concepts.length} konceptů`,
      points: placementScore,
      earned: true
    });
  }
  totalScore += placementScore;

  // 2. Connections Score (50%) - Correct connections
  let connectionScore = 0;
  const correctConnections = connections.filter(conn => {
    return data.correctConnections.some(correct =>
      (correct.from === conn.from && correct.to === conn.to && correct.relationship === conn.relationship) ||
      (correct.to === conn.from && correct.from === conn.to && correct.relationship === conn.relationship)
    );
  });

  if (data.correctConnections.length > 0) {
    connectionScore = Math.round((correctConnections.length / data.correctConnections.length) * 50);
    breakdown.push({
      label: `Správně propojeno ${correctConnections.length}/${data.correctConnections.length}`,
      points: connectionScore,
      earned: true
    });
  }
  totalScore += connectionScore;

  // 3. Milestones Score (20%) - Correct milestones identified
  let milestoneScore = 0;
  const correctMilestones = selectedMilestones.filter(nodeId => {
    const placedConcept = placedConcepts.find(pc => pc.id === nodeId);
    if (!placedConcept) return false;
    const concept = data.concepts.find(c => c.id === placedConcept.conceptId);
    return concept && concept.isMilestone;
  });

  const totalMilestones = data.concepts.filter(c => c.isMilestone).length;
  if (totalMilestones > 0) {
    milestoneScore = Math.round((correctMilestones.length / totalMilestones) * 20);
    breakdown.push({
      label: `Označeno ${correctMilestones.length}/${totalMilestones} milníků`,
      points: milestoneScore,
      earned: true
    });
  }
  totalScore += milestoneScore;

  const maxScore = 100;
  const percentage = Math.round((totalScore / maxScore) * 100);

  return {
    totalScore,
    maxScore,
    percentage,
    placementScore,
    connectionScore,
    milestoneScore,
    breakdown,
    passed: totalScore >= 70
  };
};

/**
 * Get feedback for concept mapping performance
 * @param {number} percentage - Score percentage
 * @returns {Object} Feedback message and icon
 */
export const getConceptMapFeedback = (percentage) => {
  if (percentage >= 90) {
    return {
      level: "Vynikající!",
      message: "Perfektní konceptuální mapa! Rozumíte vztahům mezi koncepty.",
      color: "#22c55e",
      icon: "🗺️"
    };
  } else if (percentage >= 70) {
    return {
      level: "Velmi dobře",
      message: "Dobrá mapa s většinou správných propojení.",
      color: "#3b82f6",
      icon: "✅"
    };
  } else if (percentage >= 50) {
    return {
      level: "Uspokojivě",
      message: "Základní vztahy zvládáte, ale zaměřte se na logiku propojení.",
      color: "#f59e0b",
      icon: "⚠️"
    };
  } else {
    return {
      level: "Nedostatečně",
      message: "Konceptuální mapa potřebuje zlepšení. Zkontrolujte vztahy mezi koncepty.",
      color: "#ef4444",
      icon: "❌"
    };
  }
};

/**
 * Check if a connection already exists
 * @param {Array} connections - Existing connections
 * @param {string} from - From concept ID
 * @param {string} to - To concept ID
 * @returns {boolean} True if connection exists
 */
export const connectionExists = (connections, from, to) => {
  return connections.some(
    conn => (conn.from === from && conn.to === to) || (conn.from === to && conn.to === from)
  );
};

/**
 * Calculate line position between two nodes
 * @param {Object} node1 - First node with x, y coordinates
 * @param {Object} node2 - Second node with x, y coordinates
 * @returns {Object} Line coordinates { x1, y1, x2, y2 }
 */
export const calculateLinePosition = (node1, node2) => {
  const nodeSize = 120; // Width/height of node
  const halfSize = nodeSize / 2;

  return {
    x1: node1.x + halfSize,
    y1: node1.y + halfSize,
    x2: node2.x + halfSize,
    y2: node2.y + halfSize
  };
};
