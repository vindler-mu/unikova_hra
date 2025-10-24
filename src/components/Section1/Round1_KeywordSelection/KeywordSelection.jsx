import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import WordBank from "./WordBank";
import SelectionArea from "./SelectionArea";
import ValidationFeedback from "./ValidationFeedback";
import {
  validateSelection,
  calculateScore,
  getPerformanceFeedback,
  canValidate,
  getSelectionStats,
} from "../../../utils/section1/round1Utils";

const KeywordSelection = ({ scenarioData, onComplete, facultyColor }) => {
  const [selectedWords, setSelectedWords] = useState([]);
  const [isValidated, setIsValidated] = useState(false);
  const [validationResult, setValidationResult] = useState(null);
  const [scoreResult, setScoreResult] = useState(null);

  const { scenario, wordBank, validation, scoring } = scenarioData;

  // Handle word selection from word bank
  const handleWordClick = useCallback(
    (word) => {
      setSelectedWords((prev) => {
        const isAlreadySelected = prev.some((w) => w.id === word.id);

        if (isAlreadySelected) {
          // Remove word if already selected
          return prev.filter((w) => w.id !== word.id);
        } else {
          // Add word if not at max
          if (prev.length < validation.maxWords) {
            return [...prev, word];
          }
          return prev;
        }
      });
    },
    [validation.maxWords]
  );

  // Handle word removal from selection area
  const handleRemoveWord = useCallback((word) => {
    setSelectedWords((prev) => prev.filter((w) => w.id !== word.id));
  }, []);

  // Handle validation
  const handleValidate = useCallback(() => {
    const result = validateSelection(selectedWords, validation);
    setValidationResult(result);

    if (result.isValid) {
      const score = calculateScore(selectedWords, scoring);
      setScoreResult(score);
    }

    setIsValidated(true);
  }, [selectedWords, validation, scoring]);

  // Handle continue to next round
  const handleContinue = useCallback(() => {
    if (onComplete) {
      onComplete({
        selectedWords,
        score: scoreResult.score,
        percentage: scoreResult.percentage,
        stats: getSelectionStats(selectedWords),
      });
    }
  }, [selectedWords, scoreResult, onComplete]);

  const canSubmit = canValidate(selectedWords, validation.minCorrect);
  const stats = getSelectionStats(selectedWords);

  return (
    <div className="keyword-selection-container">
      {/* Scenario Card */}
      <div className="scenario-card">
        <div className="scenario-header">
          <h2 className="scenario-title">🎯 VÝZKUMNÁ OTÁZKA</h2>
          <div className="scenario-field">{scenario.field}</div>
        </div>

        <div className="scenario-question">{scenario.question}</div>

        <div className="scenario-context">
          <span className="context-icon">💡</span>
          <span>{scenario.context}</span>
        </div>
      </div>

      {/* Selection Area */}
      <SelectionArea
        selectedWords={selectedWords}
        onRemove={handleRemoveWord}
        maxWords={validation.maxWords}
        minWords={validation.minCorrect}
      />

      {/* Word Bank */}
      <WordBank
        words={wordBank}
        selectedWords={selectedWords}
        onWordClick={handleWordClick}
        maxWords={validation.maxWords}
      />

      {/* Validation Button */}
      {!isValidated && (
        <div className="action-section">
          <button
            className="validate-button"
            onClick={handleValidate}
            disabled={!canSubmit}
          >
            {canSubmit ? "✓ Zkontrolovat výběr" : "⚠️ Vyber alespoň " + validation.minCorrect + " slova"}
          </button>

          {selectedWords.length > 0 && (
            <div className="selection-stats">
              <div className="stat-item">
                <span className="stat-label">Vybrána slova:</span>
                <span className="stat-value">{stats.total}</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Validation Feedback */}
      {isValidated && (
        <>
          <ValidationFeedback
            selectedWords={selectedWords}
            isVisible={isValidated}
          />

          {/* Results Card */}
          {validationResult && (
            <div
              className={`results-card ${
                validationResult.isValid ? "success" : "error"
              }`}
            >
              <div className="results-header">
                <h3 className="results-title">
                  {validationResult.isValid ? "✓ ÚSPĚCH" : "✗ ZKUS ZNOVU"}
                </h3>
              </div>

              <div className="results-message">{validationResult.message}</div>

              {validationResult.isValid && scoreResult && (
                <>
                  <div className="score-display">
                    <div className="score-main">
                      <span className="score-number">{scoreResult.score}</span>
                      <span className="score-max">/ {scoreResult.maxScore}</span>
                    </div>
                    <div className="score-percentage">
                      {scoreResult.percentage}%
                    </div>
                  </div>

                  <div className="score-breakdown">
                    <div className="breakdown-item">
                      <span className="breakdown-label">
                        Správná slova (+{scoring.correctWord} každé):
                      </span>
                      <span className="breakdown-value positive">
                        +{scoreResult.breakdown.correctPoints}
                      </span>
                    </div>
                    {scoreResult.breakdown.academicBonus > 0 && (
                      <div className="breakdown-item">
                        <span className="breakdown-label">
                          Akademický bonus:
                        </span>
                        <span className="breakdown-value positive">
                          +{scoreResult.breakdown.academicBonus}
                        </span>
                      </div>
                    )}
                    {scoreResult.breakdown.incorrectPenalty < 0 && (
                      <div className="breakdown-item">
                        <span className="breakdown-label">
                          Nesprávná slova:
                        </span>
                        <span className="breakdown-value negative">
                          {scoreResult.breakdown.incorrectPenalty}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Performance Feedback */}
                  {(() => {
                    const feedback = getPerformanceFeedback(
                      scoreResult.percentage
                    );
                    return (
                      <div
                        className="performance-feedback"
                        style={{ borderColor: feedback.color }}
                      >
                        <span className="performance-icon">{feedback.icon}</span>
                        <div className="performance-content">
                          <div
                            className="performance-level"
                            style={{ color: feedback.color }}
                          >
                            {feedback.level}
                          </div>
                          <div className="performance-message">
                            {feedback.message}
                          </div>
                        </div>
                      </div>
                    );
                  })()}

                  <button className="continue-button" onClick={handleContinue}>
                    Pokračovat na Kolo 2 →
                  </button>
                </>
              )}

              {!validationResult.isValid && (
                <button
                  className="retry-button"
                  onClick={() => {
                    setIsValidated(false);
                    setValidationResult(null);
                    setSelectedWords([]);
                  }}
                >
                  ↻ Zkusit znovu
                </button>
              )}
            </div>
          )}
        </>
      )}

      <style jsx>{`
        .keyword-selection-container {
          max-width: 1000px;
          margin: 0 auto;
          padding: 2rem 1rem;
        }

        .scenario-card {
          background: white;
          border: 2px solid #0000dc;
          border-radius: 8px;
          padding: 1.5rem;
          margin-bottom: 2rem;
        }

        .scenario-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .scenario-title {
          font-size: 1.3rem;
          font-weight: bold;
          color: #0000dc;
          margin: 0;
          font-family: monospace;
        }

        .scenario-field {
          background: rgba(0, 0, 220, 0.1);
          color: #0000dc;
          padding: 0.4rem 1rem;
          border-radius: 20px;
          font-size: 0.9rem;
          font-weight: bold;
          border: 1px solid #0000dc;
        }

        .scenario-question {
          font-size: 1.1rem;
          line-height: 1.6;
          color: #1f2937;
          margin-bottom: 1rem;
          font-weight: 500;
        }

        .scenario-context {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem;
          background: rgba(245, 158, 11, 0.1);
          border-left: 3px solid #f59e0b;
          border-radius: 4px;
          font-size: 0.95rem;
          color: #78350f;
        }

        .context-icon {
          font-size: 1.2rem;
        }

        .action-section {
          margin: 2rem 0;
          text-align: center;
        }

        .validate-button {
          background: ${facultyColor || "#0000dc"};
          color: white;
          border: none;
          padding: 1rem 2rem;
          font-size: 1.1rem;
          font-weight: bold;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
          font-family: inherit;
        }

        .validate-button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 220, 0.3);
        }

        .validate-button:disabled {
          background: #9ca3af;
          cursor: not-allowed;
          opacity: 0.6;
        }

        .selection-stats {
          margin-top: 1rem;
          display: flex;
          justify-content: center;
          gap: 2rem;
        }

        .stat-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .stat-label {
          color: #6b7280;
          font-size: 0.9rem;
        }

        .stat-value {
          color: #0000dc;
          font-weight: bold;
          font-family: monospace;
        }

        .results-card {
          background: white;
          border: 3px solid;
          border-radius: 8px;
          padding: 2rem;
          margin-top: 2rem;
        }

        .results-card.success {
          border-color: #22c55e;
          background: rgba(34, 197, 94, 0.05);
        }

        .results-card.error {
          border-color: #ef4444;
          background: rgba(239, 68, 68, 0.05);
        }

        .results-header {
          text-align: center;
          margin-bottom: 1.5rem;
        }

        .results-title {
          font-size: 1.5rem;
          font-weight: bold;
          color: #0000dc;
          margin: 0;
          font-family: monospace;
        }

        .results-message {
          text-align: center;
          font-size: 1.1rem;
          color: #374151;
          margin-bottom: 2rem;
          line-height: 1.6;
        }

        .score-display {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2rem;
          padding: 1.5rem;
          background: rgba(0, 0, 220, 0.05);
          border-radius: 8px;
        }

        .score-main {
          font-size: 2.5rem;
          font-weight: bold;
          color: #0000dc;
          font-family: monospace;
        }

        .score-max {
          font-size: 1.5rem;
          color: #6b7280;
        }

        .score-percentage {
          font-size: 2rem;
          font-weight: bold;
          color: #22c55e;
          font-family: monospace;
        }

        .score-breakdown {
          margin-bottom: 2rem;
          padding: 1rem;
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
        }

        .breakdown-item {
          display: flex;
          justify-content: space-between;
          padding: 0.5rem 0;
          border-bottom: 1px solid #f3f4f6;
        }

        .breakdown-item:last-child {
          border-bottom: none;
        }

        .breakdown-label {
          color: #6b7280;
        }

        .breakdown-value {
          font-weight: bold;
          font-family: monospace;
        }

        .breakdown-value.positive {
          color: #22c55e;
        }

        .breakdown-value.negative {
          color: #ef4444;
        }

        .performance-feedback {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          border: 2px solid;
          border-radius: 8px;
          margin-bottom: 2rem;
        }

        .performance-icon {
          font-size: 2rem;
        }

        .performance-content {
          flex: 1;
        }

        .performance-level {
          font-size: 1.2rem;
          font-weight: bold;
          margin-bottom: 0.25rem;
        }

        .performance-message {
          color: #6b7280;
        }

        .continue-button,
        .retry-button {
          width: 100%;
          padding: 1rem 2rem;
          font-size: 1.1rem;
          font-weight: bold;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
          font-family: inherit;
        }

        .continue-button {
          background: #22c55e;
          color: white;
        }

        .continue-button:hover {
          background: #16a34a;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(34, 197, 94, 0.3);
        }

        .retry-button {
          background: #ef4444;
          color: white;
        }

        .retry-button:hover {
          background: #dc2626;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
        }

        @media (max-width: 768px) {
          .keyword-selection-container {
            padding: 1rem 0.5rem;
          }

          .scenario-card {
            padding: 1rem;
          }

          .scenario-title {
            font-size: 1.1rem;
          }

          .scenario-question {
            font-size: 1rem;
          }

          .score-display {
            flex-direction: column;
            gap: 0.5rem;
          }

          .score-main {
            font-size: 2rem;
          }

          .score-percentage {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};

KeywordSelection.propTypes = {
  scenarioData: PropTypes.shape({
    scenario: PropTypes.shape({
      question: PropTypes.string.isRequired,
      field: PropTypes.string.isRequired,
      context: PropTypes.string.isRequired,
    }).isRequired,
    wordBank: PropTypes.array.isRequired,
    validation: PropTypes.shape({
      minCorrect: PropTypes.number.isRequired,
      maxWords: PropTypes.number.isRequired,
      maxIncorrect: PropTypes.number.isRequired,
    }).isRequired,
    scoring: PropTypes.shape({
      correctWord: PropTypes.number.isRequired,
      incorrectWord: PropTypes.number.isRequired,
      academicBonus: PropTypes.number.isRequired,
      maxScore: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
  onComplete: PropTypes.func.isRequired,
  facultyColor: PropTypes.string,
};

export default KeywordSelection;
