import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import {
  validateConceptMap,
  getConceptMapFeedback,
  connectionExists,
  calculateLinePosition
} from "../../../utils/section3/round3Utils";
import "./ConceptMapping.css";

/**
 * Round 3: Concept Mapping
 * Simplified version with grid-based placement
 */
const ConceptMapping = ({ scenarioData, onComplete, facultyColor }) => {
  const { scenario, concepts, relationshipTypes, correctConnections } = scenarioData;

  const [placedConcepts, setPlacedConcepts] = useState([]);
  const [connections, setConnections] = useState([]);
  const [selectedMilestones, setSelectedMilestones] = useState([]);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionStart, setConnectionStart] = useState(null);
  const [showRelationshipSelector, setShowRelationshipSelector] = useState(false);
  const [pendingConnection, setPendingConnection] = useState(null);
  const [validated, setValidated] = useState(false);
  const [scoreResult, setScoreResult] = useState(null);
  const [feedback, setFeedback] = useState(null);

  // Auto-place concepts in grid
  useEffect(() => {
    if (concepts && concepts.length > 0) {
      const gridCols = 4;
      const placed = concepts.map((concept, index) => ({
        id: `placed-${concept.id}`,
        conceptId: concept.id,
        x: (index % gridCols) * 150 + 50,
        y: Math.floor(index / gridCols) * 120 + 50,
        concept
      }));
      setPlacedConcepts(placed);
    }
  }, [concepts]);

  const handleStartConnection = useCallback((nodeId) => {
    setIsConnecting(true);
    setConnectionStart(nodeId);
  }, []);

  const handleEndConnection = useCallback((nodeId) => {
    if (isConnecting && connectionStart && connectionStart !== nodeId) {
      // Check if connection already exists
      const conceptStart = placedConcepts.find(pc => pc.id === connectionStart);
      const conceptEnd = placedConcepts.find(pc => pc.id === nodeId);

      if (conceptStart && conceptEnd &&
          !connectionExists(connections, conceptStart.conceptId, conceptEnd.conceptId)) {
        setPendingConnection({ from: conceptStart.conceptId, to: conceptEnd.conceptId });
        setShowRelationshipSelector(true);
      }
    }
    setIsConnecting(false);
    setConnectionStart(null);
  }, [isConnecting, connectionStart, placedConcepts, connections]);

  const handleSelectRelationship = useCallback((relationshipId) => {
    if (pendingConnection) {
      setConnections(prev => [
        ...prev,
        {
          from: pendingConnection.from,
          to: pendingConnection.to,
          relationship: relationshipId
        }
      ]);
    }
    setShowRelationshipSelector(false);
    setPendingConnection(null);
  }, [pendingConnection]);

  const handleToggleMilestone = useCallback((nodeId) => {
    setSelectedMilestones(prev =>
      prev.includes(nodeId)
        ? prev.filter(id => id !== nodeId)
        : [...prev, nodeId]
    );
  }, []);

  const handleRemoveConnection = useCallback((index) => {
    setConnections(prev => prev.filter((_, i) => i !== index));
  }, []);

  const handleValidate = useCallback(() => {
    const results = validateConceptMap(placedConcepts, connections, selectedMilestones, scenarioData);
    const performanceFeedback = getConceptMapFeedback(results.percentage);

    setScoreResult(results);
    setFeedback(performanceFeedback);
    setValidated(true);
  }, [placedConcepts, connections, selectedMilestones, scenarioData]);

  const handleContinue = useCallback(() => {
    if (onComplete && scoreResult) {
      onComplete({
        score: scoreResult.totalScore,
        maxScore: scoreResult.maxScore,
        percentage: scoreResult.percentage
      });
    }
  }, [onComplete, scoreResult]);

  return (
    <div className="concept-mapping">
      <div className="mapping-header">
        <h2>🗺️ Kolo 3: Concept Mapping</h2>
        <p className="scenario-text">{scenario}</p>
      </div>

      <div className="mapping-instructions">
        <div className="instruction-card">
          <strong>1. Vytvoř propojení:</strong> Klikni na koncept → Klikni na druhý koncept → Vyber typ vztahu
        </div>
        <div className="instruction-card">
          <strong>2. Označ milníky:</strong> Klikni na hvězdičku u klíčových konceptů
        </div>
      </div>

      <div className="canvas-container">
        <svg className="connections-layer">
          {connections.map((conn, index) => {
            const fromNode = placedConcepts.find(pc => pc.conceptId === conn.from);
            const toNode = placedConcepts.find(pc => pc.conceptId === conn.to);
            if (!fromNode || !toNode) return null;

            const line = calculateLinePosition(fromNode, toNode);
            const relationship = relationshipTypes.find(r => r.id === conn.relationship);

            return (
              <g key={index}>
                <line
                  x1={line.x1}
                  y1={line.y1}
                  x2={line.x2}
                  y2={line.y2}
                  stroke={relationship?.color || "#3b82f6"}
                  strokeWidth="3"
                  markerEnd="url(#arrowhead)"
                />
                <text
                  x={(line.x1 + line.x2) / 2}
                  y={(line.y1 + line.y2) / 2}
                  fill="#1f2937"
                  fontSize="12"
                  fontWeight="600"
                  textAnchor="middle"
                >
                  {relationship?.label}
                </text>
                {!validated && (
                  <circle
                    cx={(line.x1 + line.x2) / 2 + 40}
                    cy={(line.y1 + line.y2) / 2}
                    r="10"
                    fill="#ef4444"
                    cursor="pointer"
                    onClick={() => handleRemoveConnection(index)}
                  >
                    <title>Odstranit propojení</title>
                  </circle>
                )}
              </g>
            );
          })}
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
              <polygon points="0 0, 10 3, 0 6" fill="#3b82f6" />
            </marker>
          </defs>
        </svg>

        <div className="concepts-layer">
          {placedConcepts.map(placed => (
            <div
              key={placed.id}
              className={`concept-node ${isConnecting && connectionStart === placed.id ? 'connecting' : ''}
                         ${selectedMilestones.includes(placed.id) ? 'milestone' : ''}`}
              style={{
                left: `${placed.x}px`,
                top: `${placed.y}px`
              }}
            >
              <div className="concept-content" onClick={() => {
                if (isConnecting) {
                  handleEndConnection(placed.id);
                } else {
                  handleStartConnection(placed.id);
                }
              }}>
                <div className="concept-text">{placed.concept.text}</div>
                <div className="concept-category">{placed.concept.category}</div>
              </div>
              <button
                className={`milestone-toggle ${selectedMilestones.includes(placed.id) ? 'active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleToggleMilestone(placed.id);
                }}
                disabled={validated}
                title="Označit jako milník"
              >
                ⭐
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="mapping-stats">
        <div className="stat-item">
          <span>Propojení:</span> <strong>{connections.length}</strong>
        </div>
        <div className="stat-item">
          <span>Milníky:</span> <strong>{selectedMilestones.length}</strong>
        </div>
      </div>

      {showRelationshipSelector && (
        <div className="relationship-selector-overlay">
          <div className="relationship-selector">
            <h3>Vyber typ vztahu</h3>
            <div className="relationship-options">
              {relationshipTypes.map(rel => (
                <button
                  key={rel.id}
                  className="relationship-option"
                  style={{ borderColor: rel.color }}
                  onClick={() => handleSelectRelationship(rel.id)}
                >
                  <span className="rel-color" style={{ background: rel.color }}></span>
                  {rel.label}
                </button>
              ))}
            </div>
            <button
              className="cancel-btn"
              onClick={() => {
                setShowRelationshipSelector(false);
                setPendingConnection(null);
              }}
            >
              Zrušit
            </button>
          </div>
        </div>
      )}

      {!validated && (
        <div className="action-buttons">
          <button
            className="validate-btn"
            onClick={handleValidate}
            style={{ borderColor: facultyColor, color: facultyColor }}
            disabled={connections.length === 0}
          >
            Zkontrolovat mapu
          </button>
        </div>
      )}

      {validated && feedback && (
        <div className="results-section">
          <div className="performance-feedback" style={{ borderLeftColor: feedback.color }}>
            <div className="feedback-header">
              <span className="feedback-icon">{feedback.icon}</span>
              <h3>{feedback.level}</h3>
            </div>
            <p>{feedback.message}</p>
          </div>

          <div className="score-summary">
            <h3>Výsledky mapování</h3>
            <div className="score-display">
              <div className="score-number">{scoreResult.totalScore} / {scoreResult.maxScore}</div>
              <div className="score-percentage">{scoreResult.percentage}%</div>
            </div>

            <div className="score-breakdown">
              {scoreResult.breakdown.map((item, idx) => (
                <div key={idx} className="breakdown-item">
                  <span className="breakdown-label">{item.label}</span>
                  <span className="breakdown-points">+{item.points} bodů</span>
                </div>
              ))}
            </div>
          </div>

          <div className="action-buttons">
            <button
              className="continue-btn"
              onClick={handleContinue}
              style={{ backgroundColor: facultyColor }}
            >
              Pokračovat na Kolo 4 →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

ConceptMapping.propTypes = {
  scenarioData: PropTypes.object.isRequired,
  onComplete: PropTypes.func.isRequired,
  facultyColor: PropTypes.string
};

ConceptMapping.defaultProps = {
  facultyColor: "#0000dc"
};

export default ConceptMapping;
