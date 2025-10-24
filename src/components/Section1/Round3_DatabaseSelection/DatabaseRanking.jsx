import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import { Check, X, Info, ChevronUp, ChevronDown, Trash2 } from "lucide-react";
import {
  validateSelection,
  calculateScore,
  getFeedback,
  getPerformanceFeedback,
} from "../../../utils/section1/round3Utils";

/**
 * Round 3: Database Ranking
 * Interactive component for selecting and ranking databases by relevance
 */
const DatabaseRanking = ({ scenarioData, onComplete, facultyColor }) => {
  const [selectedDatabases, setSelectedDatabases] = useState([]);
  const [validated, setValidated] = useState(false);
  const [validationResult, setValidationResult] = useState(null);
  const [scoreResult, setScoreResult] = useState(null);
  const [showInstructions, setShowInstructions] = useState(true);

  // Toggle database selection
  const toggleDatabase = useCallback(
    (database) => {
      setSelectedDatabases((prev) => {
        const isSelected = prev.includes(database.id);

        if (isSelected) {
          // Remove from selection
          return prev.filter((id) => id !== database.id);
        } else {
          // Add to selection if not at max
          if (prev.length < scenarioData.validation.maxSelection) {
            return [...prev, database.id];
          }
          return prev;
        }
      });
      setValidated(false);
    },
    [scenarioData.validation.maxSelection]
  );

  // Move database up in ranking
  const moveUp = useCallback((databaseId) => {
    setSelectedDatabases((prev) => {
      const index = prev.indexOf(databaseId);
      if (index <= 0) return prev;

      const newList = [...prev];
      [newList[index - 1], newList[index]] = [newList[index], newList[index - 1]];
      return newList;
    });
    setValidated(false);
  }, []);

  // Move database down in ranking
  const moveDown = useCallback((databaseId) => {
    setSelectedDatabases((prev) => {
      const index = prev.indexOf(databaseId);
      if (index === -1 || index >= prev.length - 1) return prev;

      const newList = [...prev];
      [newList[index], newList[index + 1]] = [newList[index + 1], newList[index]];
      return newList;
    });
    setValidated(false);
  }, []);

  // Remove database from selection
  const removeDatabase = useCallback((databaseId) => {
    setSelectedDatabases((prev) => prev.filter((id) => id !== databaseId));
    setValidated(false);
  }, []);

  // Validate selection
  const handleValidate = useCallback(() => {
    const validation = validateSelection(
      selectedDatabases,
      scenarioData.databases,
      scenarioData.validation
    );
    setValidationResult(validation);

    const score = calculateScore(validation, scenarioData.scoring);
    setScoreResult(score);

    setValidated(true);
  }, [selectedDatabases, scenarioData]);

  // Handle completion
  const handleContinue = useCallback(() => {
    if (scoreResult && onComplete) {
      onComplete({
        score: scoreResult.score,
        maxScore: scoreResult.maxScore,
        percentage: scoreResult.percentage,
        selection: selectedDatabases,
        isValid: validationResult.isValid,
      });
    }
  }, [scoreResult, validationResult, selectedDatabases, onComplete]);

  const performanceFeedback = scoreResult
    ? getPerformanceFeedback(scoreResult.percentage)
    : null;

  const feedbackMessage = validationResult
    ? getFeedback(validationResult, scenarioData.feedback)
    : "";

  // Get database object by ID
  const getDatabaseById = (id) => {
    return scenarioData.databases.find((db) => db.id === id);
  };

  return (
    <div className="database-ranking">
      {/* Scenario Header */}
      <div className="scenario-header">
        <h2 className="scenario-title">{scenarioData.scenario.title}</h2>
        <p className="scenario-instruction">
          {scenarioData.scenario.instruction}
        </p>
        <div className="scenario-goal">
          <Info size={18} />
          <span>{scenarioData.scenario.goal}</span>
        </div>
      </div>

      {/* Instructions Panel */}
      {showInstructions && (
        <div className="instructions-panel">
          <div className="instructions-header">
            <h3>Jak vybrat databáze</h3>
            <button
              onClick={() => setShowInstructions(false)}
              className="close-instructions"
            >
              <X size={16} />
            </button>
          </div>
          <ul className="instructions-list">
            <li>
              <strong>1.</strong> Klikněte na databázi pro přidání do výběru
            </li>
            <li>
              <strong>2.</strong> Vyberte {scenarioData.validation.maxSelection}{" "}
              nejrelevantnější databáze
            </li>
            <li>
              <strong>3.</strong> Seřaďte je pomocí šipek od nejlepší po nejhorší
            </li>
            <li>
              <strong>4.</strong> Validujte výběr a získejte zpětnou vazbu
            </li>
          </ul>
        </div>
      )}

      <div className="ranking-layout">
        {/* Left: Available Databases */}
        <div className="database-pool">
          <h3 className="pool-title">
            Dostupné databáze
            <span className="pool-count">
              ({scenarioData.databases.length} celkem)
            </span>
          </h3>

          <div className="databases-list">
            {scenarioData.databases.map((database) => {
              const isSelected = selectedDatabases.includes(database.id);

              return (
                <div
                  key={database.id}
                  className={`database-card ${isSelected ? "selected" : ""} ${
                    !isSelected &&
                    selectedDatabases.length >=
                      scenarioData.validation.maxSelection
                      ? "disabled"
                      : ""
                  }`}
                  onClick={() =>
                    !isSelected ||
                    selectedDatabases.length <
                      scenarioData.validation.maxSelection
                      ? toggleDatabase(database)
                      : null
                  }
                >
                  <div className="card-header">
                    <span className="database-icon">{database.icon}</span>
                    <div className="database-name">{database.name}</div>
                    {isSelected && (
                      <div className="selected-badge">
                        <Check size={14} />
                      </div>
                    )}
                  </div>

                  <div className="database-description">
                    {database.description}
                  </div>

                  <div className="database-specialty">
                    <strong>Zaměření:</strong> {database.specialty}
                  </div>

                  <div className="database-detail">{database.detail}</div>

                  {validated && (
                    <div
                      className={`relevance-indicator relevance-${database.relevance}`}
                    >
                      {database.relevance === "high" && "Vysoce relevantní"}
                      {database.relevance === "medium" && "Středně relevantní"}
                      {database.relevance === "low" && "Málo relevantní"}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Selected Ranking */}
        <div className="ranking-panel">
          <div className="panel-header">
            <h3>Váš výběr</h3>
            <div className="selection-count">
              {selectedDatabases.length} / {scenarioData.validation.maxSelection}
            </div>
          </div>

          {selectedDatabases.length === 0 ? (
            <div className="empty-selection">
              <p>Klikněte na databáze vlevo pro výběr</p>
              <p className="hint">
                Vyberte {scenarioData.validation.maxSelection} nejrelevantnější
                databáze
              </p>
            </div>
          ) : (
            <div className="ranked-list">
              {selectedDatabases.map((dbId, index) => {
                const database = getDatabaseById(dbId);
                if (!database) return null;

                return (
                  <div key={dbId} className="ranked-item">
                    <div className="rank-number">{index + 1}</div>

                    <div className="ranked-content">
                      <div className="ranked-header">
                        <span className="ranked-icon">{database.icon}</span>
                        <div className="ranked-name">{database.name}</div>
                      </div>
                      <div className="ranked-specialty">{database.specialty}</div>
                    </div>

                    <div className="rank-controls">
                      <button
                        onClick={() => moveUp(dbId)}
                        disabled={index === 0}
                        className="rank-button"
                        title="Posunout nahoru"
                      >
                        <ChevronUp size={16} />
                      </button>
                      <button
                        onClick={() => moveDown(dbId)}
                        disabled={index === selectedDatabases.length - 1}
                        className="rank-button"
                        title="Posunout dolů"
                      >
                        <ChevronDown size={16} />
                      </button>
                      <button
                        onClick={() => removeDatabase(dbId)}
                        className="rank-button remove"
                        title="Odstranit"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Validate Button */}
          {selectedDatabases.length > 0 && !validated && (
            <button onClick={handleValidate} className="validate-button">
              <Check size={18} />
              Validovat výběr
            </button>
          )}

          {/* Validation Results */}
          {validated && validationResult && (
            <div
              className={`validation-result ${
                validationResult.isValid ? "valid" : "invalid"
              }`}
            >
              <div className="validation-header">
                {validationResult.isValid ||
                scoreResult.percentage >= 50 ? (
                  <>
                    <Check size={20} className="icon-success" />
                    <h4>Výběr dokončen</h4>
                  </>
                ) : (
                  <>
                    <X size={20} className="icon-error" />
                    <h4>Výběr by mohl být lepší</h4>
                  </>
                )}
              </div>

              <p className="validation-feedback">{feedbackMessage}</p>

              {validationResult.issues.length > 0 && (
                <div className="validation-issues">
                  <h5>Poznámky:</h5>
                  <ul>
                    {validationResult.issues.map((issue, idx) => (
                      <li key={idx}>{issue}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Score Display */}
              {scoreResult && (
                <div className="score-panel">
                  <div className="score-header">
                    <span className="score-number">{scoreResult.score}</span>
                    <span className="score-max">/ {scoreResult.maxScore}</span>
                    <span className="score-percentage">
                      ({scoreResult.percentage}%)
                    </span>
                  </div>

                  {performanceFeedback && (
                    <div
                      className="performance-badge"
                      style={{ backgroundColor: performanceFeedback.color }}
                    >
                      <span>{performanceFeedback.icon}</span>
                      <span>{performanceFeedback.level}</span>
                    </div>
                  )}

                  <div className="score-breakdown">
                    {scoreResult.breakdown.map((item, idx) => (
                      <div key={idx} className="breakdown-item">
                        <span className="breakdown-label">{item.label}</span>
                        <span
                          className={`breakdown-points ${
                            item.earned ? "earned" : "not-earned"
                          }`}
                        >
                          {item.earned ? "+" : ""}
                          {item.points}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Continue Button */}
              <button onClick={handleContinue} className="continue-button">
                Pokračovat na další kolo →
              </button>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .database-ranking {
          max-width: 1400px;
          margin: 0 auto;
          padding: 2rem;
        }

        .scenario-header {
          background: white;
          border: 2px solid ${facultyColor || "#0000dc"};
          border-radius: 8px;
          padding: 1.5rem;
          margin-bottom: 1.5rem;
        }

        .scenario-title {
          font-size: 1.5rem;
          font-weight: bold;
          color: ${facultyColor || "#0000dc"};
          margin: 0 0 1rem 0;
        }

        .scenario-instruction {
          font-size: 1.05rem;
          color: #374151;
          margin: 0 0 1rem 0;
          line-height: 1.5;
        }

        .scenario-goal {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem;
          background: rgba(59, 130, 246, 0.1);
          border-left: 3px solid #3b82f6;
          border-radius: 4px;
          color: #1e40af;
          font-size: 0.95rem;
        }

        .instructions-panel {
          background: #f8f9ff;
          border: 1px solid #e0e7ff;
          border-radius: 8px;
          padding: 1rem;
          margin-bottom: 1.5rem;
        }

        .instructions-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.75rem;
        }

        .instructions-header h3 {
          font-size: 1rem;
          font-weight: bold;
          color: #1e40af;
          margin: 0;
        }

        .close-instructions {
          background: none;
          border: none;
          cursor: pointer;
          color: #6b7280;
          padding: 0.25rem;
        }

        .close-instructions:hover {
          color: #374151;
        }

        .instructions-list {
          margin: 0;
          padding-left: 1.5rem;
          color: #4b5563;
          font-size: 0.9rem;
          line-height: 1.6;
        }

        .instructions-list li {
          margin: 0.5rem 0;
        }

        .ranking-layout {
          display: grid;
          grid-template-columns: 1fr 400px;
          gap: 1.5rem;
          align-items: start;
        }

        .database-pool {
          background: white;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          padding: 1.5rem;
        }

        .pool-title {
          font-size: 1.1rem;
          font-weight: bold;
          color: #374151;
          margin: 0 0 1.5rem 0;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .pool-count {
          font-size: 0.85rem;
          font-weight: normal;
          color: #6b7280;
        }

        .databases-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .database-card {
          background: white;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          padding: 1rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .database-card:hover:not(.disabled) {
          border-color: ${facultyColor || "#0000dc"};
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .database-card.selected {
          border-color: ${facultyColor || "#0000dc"};
          background: rgba(0, 0, 220, 0.05);
        }

        .database-card.disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .card-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.75rem;
        }

        .database-icon {
          font-size: 1.5rem;
        }

        .database-name {
          flex: 1;
          font-weight: bold;
          font-size: 1rem;
          color: #1f2937;
        }

        .selected-badge {
          background: #22c55e;
          color: white;
          border-radius: 50%;
          padding: 0.25rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .database-description {
          color: #4b5563;
          font-size: 0.9rem;
          margin-bottom: 0.5rem;
          line-height: 1.4;
        }

        .database-specialty {
          font-size: 0.85rem;
          color: #6b7280;
          margin-bottom: 0.5rem;
        }

        .database-detail {
          font-size: 0.8rem;
          color: #9ca3af;
          font-style: italic;
        }

        .relevance-indicator {
          margin-top: 0.75rem;
          padding: 0.5rem;
          border-radius: 4px;
          font-size: 0.8rem;
          font-weight: bold;
          text-align: center;
        }

        .relevance-high {
          background: #d1fae5;
          color: #065f46;
        }

        .relevance-medium {
          background: #fed7aa;
          color: #92400e;
        }

        .relevance-low {
          background: #fee2e2;
          color: #991b1b;
        }

        .ranking-panel {
          background: white;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          padding: 1.5rem;
          position: sticky;
          top: 1rem;
        }

        .panel-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
          padding-bottom: 0.75rem;
          border-bottom: 2px solid #e5e7eb;
        }

        .panel-header h3 {
          font-size: 1.1rem;
          font-weight: bold;
          color: #374151;
          margin: 0;
        }

        .selection-count {
          background: ${facultyColor || "#0000dc"};
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 12px;
          font-size: 0.85rem;
          font-weight: bold;
        }

        .empty-selection {
          text-align: center;
          padding: 3rem 1rem;
          color: #9ca3af;
        }

        .empty-selection p {
          margin: 0.5rem 0;
        }

        .hint {
          font-size: 0.85rem;
          color: #6b7280;
        }

        .ranked-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }

        .ranked-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 6px;
          padding: 0.75rem;
        }

        .rank-number {
          background: ${facultyColor || "#0000dc"};
          color: white;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          flex-shrink: 0;
        }

        .ranked-content {
          flex: 1;
          min-width: 0;
        }

        .ranked-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.25rem;
        }

        .ranked-icon {
          font-size: 1.2rem;
        }

        .ranked-name {
          font-weight: bold;
          font-size: 0.9rem;
          color: #1f2937;
        }

        .ranked-specialty {
          font-size: 0.75rem;
          color: #6b7280;
        }

        .rank-controls {
          display: flex;
          gap: 0.25rem;
          flex-shrink: 0;
        }

        .rank-button {
          background: white;
          border: 1px solid #d1d5db;
          border-radius: 4px;
          padding: 0.25rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .rank-button:hover:not(:disabled) {
          background: #f3f4f6;
          border-color: #9ca3af;
        }

        .rank-button:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }

        .rank-button.remove {
          color: #dc2626;
        }

        .rank-button.remove:hover:not(:disabled) {
          background: #fef2f2;
          border-color: #dc2626;
        }

        .validate-button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          width: 100%;
          padding: 0.75rem;
          background: ${facultyColor || "#0000dc"};
          color: white;
          border: none;
          border-radius: 6px;
          font-size: 1rem;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.2s ease;
          margin-top: 1rem;
        }

        .validate-button:hover {
          opacity: 0.9;
          transform: translateY(-1px);
        }

        .validation-result {
          margin-top: 1.5rem;
          padding: 1.5rem;
          border-radius: 8px;
          border: 2px solid;
        }

        .validation-result.valid {
          background: #f0fdf4;
          border-color: #22c55e;
        }

        .validation-result.invalid {
          background: #fef2f2;
          border-color: #ef4444;
        }

        .validation-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }

        .validation-header h4 {
          margin: 0;
          font-size: 1.1rem;
        }

        .icon-success {
          color: #22c55e;
        }

        .icon-error {
          color: #ef4444;
        }

        .validation-feedback {
          color: #374151;
          margin: 0 0 1rem 0;
          font-size: 0.95rem;
          line-height: 1.5;
        }

        .validation-issues {
          background: rgba(239, 68, 68, 0.1);
          padding: 1rem;
          border-radius: 6px;
          margin-bottom: 1rem;
        }

        .validation-issues h5 {
          margin: 0 0 0.5rem 0;
          font-size: 0.9rem;
          color: #dc2626;
        }

        .validation-issues ul {
          margin: 0;
          padding-left: 1.5rem;
          color: #991b1b;
          font-size: 0.85rem;
        }

        .validation-issues li {
          margin: 0.25rem 0;
        }

        .score-panel {
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 1.5rem;
          margin-bottom: 1rem;
        }

        .score-header {
          display: flex;
          align-items: baseline;
          justify-content: center;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }

        .score-number {
          font-size: 2.5rem;
          font-weight: bold;
          color: ${facultyColor || "#0000dc"};
          font-family: monospace;
        }

        .score-max {
          font-size: 1.2rem;
          color: #6b7280;
          font-family: monospace;
        }

        .score-percentage {
          font-size: 1rem;
          color: #9ca3af;
          font-family: monospace;
        }

        .performance-badge {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.75rem;
          border-radius: 6px;
          color: white;
          font-weight: bold;
          margin-bottom: 1rem;
        }

        .score-breakdown {
          border-top: 1px solid #e5e7eb;
          padding-top: 1rem;
        }

        .breakdown-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.5rem 0;
          font-size: 0.9rem;
        }

        .breakdown-label {
          color: #6b7280;
        }

        .breakdown-points {
          font-weight: bold;
          font-family: monospace;
        }

        .breakdown-points.earned {
          color: #22c55e;
        }

        .breakdown-points.not-earned {
          color: #ef4444;
        }

        .continue-button {
          width: 100%;
          padding: 1rem;
          background: #22c55e;
          color: white;
          border: none;
          border-radius: 6px;
          font-size: 1.05rem;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .continue-button:hover {
          background: #16a34a;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(34, 197, 94, 0.3);
        }

        @media (max-width: 768px) {
          .ranking-layout {
            grid-template-columns: 1fr;
          }

          .ranking-panel {
            position: relative;
            top: 0;
          }

          .database-ranking {
            padding: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

DatabaseRanking.propTypes = {
  scenarioData: PropTypes.object.isRequired,
  onComplete: PropTypes.func.isRequired,
  facultyColor: PropTypes.string,
};

export default DatabaseRanking;
