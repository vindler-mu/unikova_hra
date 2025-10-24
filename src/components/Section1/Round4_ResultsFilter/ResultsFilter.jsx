import React, { useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import { Check, X, Info, Filter as FilterIcon } from "lucide-react";
import {
  calculateResultCount,
  validateFilters,
  calculateScore,
  getFeedback,
  getPerformanceFeedback,
} from "../../../utils/section1/round4Utils";

/**
 * Round 4: Results Filter
 * Interactive component for filtering search results by quality criteria
 */
const ResultsFilter = ({ scenarioData, onComplete, facultyColor }) => {
  const [appliedFilters, setAppliedFilters] = useState({});
  const [resultCount, setResultCount] = useState(scenarioData.initialResults);
  const [validated, setValidated] = useState(false);
  const [validationResult, setValidationResult] = useState(null);
  const [scoreResult, setScoreResult] = useState(null);
  const [showInstructions, setShowInstructions] = useState(true);

  // Recalculate result count when filters change
  useEffect(() => {
    const count = calculateResultCount(
      scenarioData.initialResults,
      appliedFilters,
      scenarioData.filters
    );
    setResultCount(count);
    setValidated(false);
  }, [appliedFilters, scenarioData]);

  // Handle filter change
  const handleFilterChange = useCallback((filterId, value) => {
    setAppliedFilters((prev) => ({
      ...prev,
      [filterId]: value,
    }));
  }, []);

  // Handle multiselect toggle
  const toggleMultiselectOption = useCallback((filterId, optionValue) => {
    setAppliedFilters((prev) => {
      const current = prev[filterId] || [];
      const isSelected = current.includes(optionValue);

      return {
        ...prev,
        [filterId]: isSelected
          ? current.filter((v) => v !== optionValue)
          : [...current, optionValue],
      };
    });
  }, []);

  // Validate filters
  const handleValidate = useCallback(() => {
    const validation = validateFilters(
      appliedFilters,
      resultCount,
      scenarioData.validation
    );
    setValidationResult(validation);

    const score = calculateScore(validation, scenarioData.scoring);
    setScoreResult(score);

    setValidated(true);
  }, [appliedFilters, resultCount, scenarioData]);

  // Handle completion
  const handleContinue = useCallback(() => {
    if (scoreResult && onComplete) {
      onComplete({
        score: scoreResult.score,
        maxScore: scoreResult.maxScore,
        percentage: scoreResult.percentage,
        filters: appliedFilters,
        resultCount,
        isValid: validationResult.isValid,
      });
    }
  }, [scoreResult, validationResult, appliedFilters, resultCount, onComplete]);

  const performanceFeedback = scoreResult
    ? getPerformanceFeedback(scoreResult.percentage)
    : null;

  const feedbackMessage = validationResult
    ? getFeedback(validationResult, scenarioData.feedback)
    : "";

  const [minTarget, maxTarget] = scenarioData.validation.targetRange;

  return (
    <div className="results-filter">
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
            <h3>Jak filtrovat výsledky</h3>
            <button
              onClick={() => setShowInstructions(false)}
              className="close-instructions"
            >
              <X size={16} />
            </button>
          </div>
          <ul className="instructions-list">
            <li>
              <strong>1.</strong> Nastavte filtry pro zúžení výsledků
            </li>
            <li>
              <strong>2.</strong> Sledujte počet výsledků v reálném čase
            </li>
            <li>
              <strong>3.</strong> Cílový počet: {minTarget}-{maxTarget} výsledků
            </li>
            <li>
              <strong>4.</strong> Validujte a získejte zpětnou vazbu
            </li>
          </ul>
        </div>
      )}

      {/* Results Counter */}
      <div className="results-counter">
        <div className="counter-icon">
          <FilterIcon size={24} />
        </div>
        <div className="counter-content">
          <div className="counter-number">{resultCount}</div>
          <div className="counter-label">výsledků po filtraci</div>
        </div>
        <div
          className={`counter-status ${
            resultCount >= minTarget && resultCount <= maxTarget
              ? "status-good"
              : resultCount > maxTarget
              ? "status-too-many"
              : "status-too-few"
          }`}
        >
          {resultCount >= minTarget && resultCount <= maxTarget
            ? "✓ V cílovém rozsahu"
            : resultCount > maxTarget
            ? "⚠ Příliš mnoho"
            : "⚠ Příliš málo"}
        </div>
      </div>

      {/* Filters */}
      <div className="filters-container">
        <h3 className="filters-title">Dostupné filtry</h3>

        {scenarioData.filters.map((filter) => (
          <div key={filter.id} className="filter-group">
            <label className="filter-label">
              {filter.name}
              {scenarioData.validation.requiredFilters.includes(filter.id) && (
                <span className="required-badge">Povinný</span>
              )}
            </label>

            {/* Range / Radio Filter */}
            {(filter.type === "range" || filter.type === "radio") && (
              <div className="filter-options">
                {filter.options.map((option) => (
                  <label key={option.value} className="radio-option">
                    <input
                      type="radio"
                      name={filter.id}
                      value={option.value}
                      checked={appliedFilters[filter.id] === option.value}
                      onChange={() => handleFilterChange(filter.id, option.value)}
                    />
                    <span className="radio-label">
                      {option.label}
                      {option.recommended && (
                        <span className="recommended-badge">Doporučeno</span>
                      )}
                    </span>
                  </label>
                ))}
              </div>
            )}

            {/* Boolean Filter */}
            {filter.type === "boolean" && (
              <div className="filter-options">
                {filter.options.map((option) => (
                  <label key={String(option.value)} className="checkbox-option">
                    <input
                      type="checkbox"
                      checked={appliedFilters[filter.id] === option.value}
                      onChange={() =>
                        handleFilterChange(filter.id, option.value)
                      }
                    />
                    <span className="checkbox-label">
                      {option.label}
                      {option.recommended && (
                        <span className="recommended-badge">Doporučeno</span>
                      )}
                    </span>
                  </label>
                ))}
              </div>
            )}

            {/* Multiselect Filter */}
            {filter.type === "multiselect" && (
              <div className="filter-options multiselect">
                {filter.options.map((option) => {
                  const isSelected =
                    appliedFilters[filter.id] &&
                    appliedFilters[filter.id].includes(option.value);

                  return (
                    <label key={option.value} className="checkbox-option">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() =>
                          toggleMultiselectOption(filter.id, option.value)
                        }
                      />
                      <span className="checkbox-label">
                        {option.label}
                        {option.recommended && (
                          <span className="recommended-badge">Doporučeno</span>
                        )}
                      </span>
                    </label>
                  );
                })}
              </div>
            )}
          </div>
        ))}

        {/* Validate Button */}
        {!validated && (
          <button onClick={handleValidate} className="validate-button">
            <Check size={18} />
            Validovat filtraci
          </button>
        )}

        {/* Validation Results */}
        {validated && validationResult && (
          <div
            className={`validation-result ${
              validationResult.isValid || scoreResult.percentage >= 50
                ? "valid"
                : "invalid"
            }`}
          >
            <div className="validation-header">
              {validationResult.isValid || scoreResult.percentage >= 50 ? (
                <>
                  <Check size={20} className="icon-success" />
                  <h4>Filtrace dokončena</h4>
                </>
              ) : (
                <>
                  <X size={20} className="icon-error" />
                  <h4>Filtrace by mohla být lepší</h4>
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
              Dokončit Oddíl 1 →
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        .results-filter {
          max-width: 900px;
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

        .results-counter {
          background: white;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          padding: 1.5rem;
          margin-bottom: 1.5rem;
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .counter-icon {
          color: ${facultyColor || "#0000dc"};
        }

        .counter-content {
          flex: 1;
        }

        .counter-number {
          font-size: 2.5rem;
          font-weight: bold;
          color: ${facultyColor || "#0000dc"};
          font-family: monospace;
        }

        .counter-label {
          font-size: 0.9rem;
          color: #6b7280;
        }

        .counter-status {
          padding: 0.5rem 1rem;
          border-radius: 6px;
          font-weight: bold;
          font-size: 0.9rem;
        }

        .status-good {
          background: #d1fae5;
          color: #065f46;
        }

        .status-too-many {
          background: #fed7aa;
          color: #92400e;
        }

        .status-too-few {
          background: #fee2e2;
          color: #991b1b;
        }

        .filters-container {
          background: white;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          padding: 1.5rem;
        }

        .filters-title {
          font-size: 1.2rem;
          font-weight: bold;
          color: #374151;
          margin: 0 0 1.5rem 0;
        }

        .filter-group {
          margin-bottom: 1.5rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid #e5e7eb;
        }

        .filter-group:last-child {
          border-bottom: none;
          margin-bottom: 0;
          padding-bottom: 0;
        }

        .filter-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: bold;
          font-size: 1rem;
          color: #1f2937;
          margin-bottom: 0.75rem;
        }

        .required-badge {
          background: #ef4444;
          color: white;
          padding: 0.15rem 0.5rem;
          border-radius: 4px;
          font-size: 0.7rem;
          font-weight: bold;
        }

        .recommended-badge {
          background: #22c55e;
          color: white;
          padding: 0.15rem 0.5rem;
          border-radius: 4px;
          font-size: 0.7rem;
          font-weight: bold;
          margin-left: 0.5rem;
        }

        .filter-options {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .filter-options.multiselect {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 0.5rem;
        }

        .radio-option,
        .checkbox-option {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem;
          border: 1px solid #e5e7eb;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .radio-option:hover,
        .checkbox-option:hover {
          background: #f9fafb;
          border-color: ${facultyColor || "#0000dc"};
        }

        .radio-label,
        .checkbox-label {
          flex: 1;
          display: flex;
          align-items: center;
          font-size: 0.9rem;
          color: #374151;
        }

        input[type="radio"],
        input[type="checkbox"] {
          cursor: pointer;
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
          margin-top: 1.5rem;
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
          .results-filter {
            padding: 1rem;
          }

          .results-counter {
            flex-direction: column;
            text-align: center;
          }

          .filter-options.multiselect {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

ResultsFilter.propTypes = {
  scenarioData: PropTypes.object.isRequired,
  onComplete: PropTypes.func.isRequired,
  facultyColor: PropTypes.string,
};

export default ResultsFilter;
