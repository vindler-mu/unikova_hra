import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import {
  validateChartMatching,
  getChartMatchingFeedback,
  getDatasetFeedback,
  allDatasetsAssigned
} from "../../../utils/section4/round2Utils";
import "./Round2_ChartMatching.css";

/**
 * Round 2: Chart Matching
 * Match datasets to appropriate chart types
 */
const Round2_ChartMatching = ({ scenarioData, onComplete, facultyColor }) => {
  const { scenario, researchContext, datasets, chartTypes } = scenarioData;

  const [assignments, setAssignments] = useState({});
  const [selectedDataset, setSelectedDataset] = useState(null);
  const [validated, setValidated] = useState(false);
  const [scoreResult, setScoreResult] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [datasetFeedback, setDatasetFeedback] = useState({});

  const handleDatasetClick = useCallback((dataset) => {
    if (!validated) {
      setSelectedDataset(dataset);
    }
  }, [validated]);

  const handleChartSelect = useCallback((chartId) => {
    if (!selectedDataset || validated) return;

    setAssignments(prev => ({
      ...prev,
      [selectedDataset.id]: chartId
    }));

    setSelectedDataset(null);
  }, [selectedDataset, validated]);

  const handleRemoveAssignment = useCallback((datasetId) => {
    if (validated) return;

    setAssignments(prev => {
      const newAssignments = { ...prev };
      delete newAssignments[datasetId];
      return newAssignments;
    });
  }, [validated]);

  const handleValidate = useCallback(() => {
    const results = validateChartMatching(assignments, datasets);
    const performanceFeedback = getChartMatchingFeedback(results.percentage);

    setScoreResult(results);
    setFeedback(performanceFeedback);
    setValidated(true);

    // Generate feedback for each dataset
    const allFeedback = {};
    datasets.forEach(dataset => {
      allFeedback[dataset.id] = getDatasetFeedback(dataset, assignments[dataset.id]);
    });
    setDatasetFeedback(allFeedback);
  }, [assignments, datasets]);

  const handleContinue = useCallback(() => {
    if (onComplete && scoreResult) {
      onComplete({
        score: scoreResult.totalScore,
        maxScore: scoreResult.maxScore,
        percentage: scoreResult.percentage
      });
    }
  }, [onComplete, scoreResult]);

  const getChartName = (chartId) => {
    const chart = chartTypes.find(c => c.id === chartId);
    return chart ? chart.name : "";
  };

  const getChartIcon = (chartId) => {
    const chart = chartTypes.find(c => c.id === chartId);
    return chart ? chart.icon : "";
  };

  return (
    <div className="chart-matching">
      <div className="chart-header">
        <h2>📊 Kolo 2: Vizualizace dat</h2>
        <p className="scenario-text">{scenario}</p>
      </div>

      {/* Research Context */}
      <div className="research-context">
        <h3>{researchContext.title}</h3>
        <div className="context-meta">
          <span className="context-field">{researchContext.field}</span>
        </div>
      </div>

      <div className="matching-workspace">
        {/* Datasets */}
        <div className="datasets-section">
          <h3>📁 Datové sady</h3>
          <p className="section-instructions">
            Klikni na dataset a pak vyber vhodný typ grafu
          </p>
          <div className="datasets-list">
            {datasets.map(dataset => {
              const assignedChart = assignments[dataset.id];
              const isSelected = selectedDataset?.id === dataset.id;
              const feedback = datasetFeedback[dataset.id];

              return (
                <div
                  key={dataset.id}
                  className={`dataset-card ${isSelected ? 'selected' : ''} ${
                    assignedChart ? 'assigned' : ''
                  } ${feedback?.status || ''}`}
                  onClick={() => handleDatasetClick(dataset)}
                >
                  <div className="dataset-content">
                    <h4>{dataset.title}</h4>
                    <p className="dataset-description">{dataset.description}</p>

                    {assignedChart && (
                      <div className="assigned-chart">
                        <span className="chart-badge">
                          {getChartIcon(assignedChart)} {getChartName(assignedChart)}
                        </span>
                        {!validated && (
                          <button
                            className="remove-assignment-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveAssignment(dataset.id);
                            }}
                            title="Odebrat přiřazení"
                          >
                            ✕
                          </button>
                        )}
                      </div>
                    )}

                    {feedback && validated && (
                      <div
                        className="dataset-feedback"
                        style={{ color: feedback.color }}
                      >
                        {feedback.message}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Chart Types */}
        <div className="charts-section">
          <h3>📈 Typy grafů</h3>
          {selectedDataset && !validated && (
            <div className="selected-indicator">
              Vyber graf pro: <strong>{selectedDataset.title}</strong>
            </div>
          )}
          <div className="chart-types-grid">
            {chartTypes.map(chart => {
              const isAssignable = selectedDataset && !validated;

              return (
                <div
                  key={chart.id}
                  className={`chart-type-card ${isAssignable ? 'selectable' : ''}`}
                  onClick={() => isAssignable && handleChartSelect(chart.id)}
                >
                  <div className="chart-icon">{chart.icon}</div>
                  <h4>{chart.name}</h4>
                  <p className="chart-description">{chart.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Validation Button */}
      {!validated && allDatasetsAssigned(assignments, datasets) && (
        <div className="action-buttons">
          <button
            className="validate-btn"
            onClick={handleValidate}
            style={{ borderColor: facultyColor, color: facultyColor }}
          >
            Zkontrolovat přiřazení
          </button>
        </div>
      )}

      {/* Results */}
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
            <h3>Výsledky vizualizace</h3>
            <div className="score-display">
              <div className="score-number">{scoreResult.totalScore} / {scoreResult.maxScore}</div>
              <div className="score-percentage">{scoreResult.percentage}%</div>
            </div>

            <div className="score-breakdown">
              {scoreResult.breakdown.map((item, idx) => (
                <div key={idx} className="breakdown-item">
                  <span className="breakdown-label">{item.label}</span>
                  <span className={`breakdown-points ${item.earned ? 'earned' : 'not-earned'}`}>
                    {item.earned ? '+' : ''}{item.points} bodů
                  </span>
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
              Pokračovat na Kolo 3 →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

Round2_ChartMatching.propTypes = {
  scenarioData: PropTypes.object.isRequired,
  onComplete: PropTypes.func.isRequired,
  facultyColor: PropTypes.string
};

Round2_ChartMatching.defaultProps = {
  facultyColor: "#0000dc"
};

export default Round2_ChartMatching;
