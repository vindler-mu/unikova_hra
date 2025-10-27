import React, { useState, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import {
  validateProblems,
  calculateSpotScore,
  getSpotFeedback,
  validateChecklist,
  calculateChecklistScore,
  getChecklistFeedback,
  getSpotHint
} from "../../../utils/section2/round2Utils";
import "./QualityEvaluation.css";

/**
 * Round 2: Quality Evaluation Component
 * Supports spot mode (identify problems in abstract) and checklist mode (quality criteria)
 */
const QualityEvaluation = ({ scenarioData, onComplete, facultyColor }) => {
  const { mode, article } = scenarioData.round2;

  // Spot mode state
  const [identifiedProblems, setIdentifiedProblems] = useState([]);

  // Checklist mode state
  const [checklistAnswers, setChecklistAnswers] = useState({});

  // Shared state
  const [validated, setValidated] = useState(false);
  const [scoreResult, setScoreResult] = useState(null);
  const [feedback, setFeedback] = useState(null);

  /**
   * SPOT MODE - Render abstract with clickable problem areas
   */
  const renderSpotModeAbstract = useMemo(() => {
    if (mode !== "spot") return null;

    const { abstract, problems } = article;
    const segments = [];
    let lastIndex = 0;

    // Sort problems by startIndex
    const sortedProblems = [...problems].sort((a, b) => a.startIndex - b.startIndex);

    sortedProblems.forEach((problem) => {
      // Add text before problem
      if (problem.startIndex > lastIndex) {
        segments.push({
          type: "normal",
          text: abstract.substring(lastIndex, problem.startIndex)
        });
      }

      // Add problem text
      segments.push({
        type: "problem",
        text: problem.text,
        problem: problem,
        isIdentified: identifiedProblems.includes(problem.id)
      });

      lastIndex = problem.endIndex;
    });

    // Add remaining text
    if (lastIndex < abstract.length) {
      segments.push({
        type: "normal",
        text: abstract.substring(lastIndex)
      });
    }

    return segments;
  }, [mode, article, identifiedProblems]);

  const handleToggleProblem = useCallback((problemId) => {
    setIdentifiedProblems(prev => {
      if (prev.includes(problemId)) {
        return prev.filter(id => id !== problemId);
      } else {
        return [...prev, problemId];
      }
    });
    setValidated(false);
  }, []);

  const handleValidateSpot = useCallback(() => {
    const validation = validateProblems(identifiedProblems, article.problems);
    const score = calculateSpotScore(validation, article.problems);
    const performanceFeedback = getSpotFeedback(score.percentage, score.missedCritical);

    setScoreResult(score);
    setFeedback(performanceFeedback);
    setValidated(true);
  }, [identifiedProblems, article]);

  /**
   * CHECKLIST MODE
   */
  const handleToggleChecklistItem = useCallback((itemId) => {
    setChecklistAnswers(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
    setValidated(false);
  }, []);

  const handleValidateChecklist = useCallback(() => {
    const validation = validateChecklist(checklistAnswers, article.checklistItems);
    const score = calculateChecklistScore(validation, article.checklistItems);
    const performanceFeedback = getChecklistFeedback(score.percentage, validation.highImportance.percentage);

    setScoreResult({ ...score, validation });
    setFeedback(performanceFeedback);
    setValidated(true);
  }, [checklistAnswers, article]);

  const handleContinue = useCallback(() => {
    if (onComplete && scoreResult) {
      onComplete({
        score: scoreResult.score,
        maxScore: scoreResult.maxScore,
        percentage: scoreResult.percentage,
        mode
      });
    }
  }, [onComplete, scoreResult, mode]);

  /**
   * SPOT MODE RENDER
   */
  if (mode === "spot") {
    return (
      <div className="quality-evaluation spot-mode">
        <div className="evaluation-header">
          <h2>Round 2: Hodnocení kvality výzkumu</h2>
          <p className="instruction">
            Přečtěte si následující abstrakt a kliknutím označte všechny problematické části.
          </p>
          <div className="spot-hint">
            🎯 Tip: Hledejte problémyvědecké metodologie, přehnané tvrzení, malé vzorky,
            krátkou dobu studie, konflikt zájmů.
          </div>
        </div>

        <div className="article-display">
          <h3 className="article-title">{article.title}</h3>
          <div className="abstract-text">
            {renderSpotModeAbstract.map((segment, idx) => {
              if (segment.type === "normal") {
                return <span key={idx}>{segment.text}</span>;
              } else {
                return (
                  <span
                    key={idx}
                    className={`problem-segment ${segment.isIdentified ? 'identified' : ''} ${validated ? 'revealed' : ''}`}
                    onClick={() => !validated && handleToggleProblem(segment.problem.id)}
                    title={validated ? segment.problem.explanation : "Klikněte pro označení"}
                  >
                    {segment.text}
                  </span>
                );
              }
            })}
          </div>
        </div>

        <div className="problem-counter">
          <strong>Označených problémů:</strong> {identifiedProblems.length} / {article.problems.length}
        </div>

        {!validated && (
          <div className="action-buttons">
            <button
              className="validate-btn"
              onClick={handleValidateSpot}
              style={{ borderColor: facultyColor, color: facultyColor }}
              disabled={identifiedProblems.length === 0}
            >
              Zkontrolovat
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
              <h3>Výsledky hodnocení</h3>
              <div className="score-display">
                <div className="score-number">{scoreResult.score} / {scoreResult.maxScore}</div>
                <div className="score-percentage">{scoreResult.percentage}%</div>
              </div>

              <div className="score-breakdown">
                {scoreResult.breakdown.map((item, idx) => (
                  <div key={idx} className={`breakdown-item ${item.isPenalty ? 'penalty' : 'bonus'}`}>
                    <span className="breakdown-label">{item.label}</span>
                    <span className="breakdown-points">
                      {item.isPenalty ? '' : '+'}{item.points} bodů
                    </span>
                  </div>
                ))}
              </div>

              <div className="problems-revealed">
                <h4>Problémy v abstraktu:</h4>
                {article.problems.map((problem) => {
                  const wasIdentified = identifiedProblems.includes(problem.id);
                  return (
                    <div key={problem.id} className={`problem-item ${wasIdentified ? 'found' : 'missed'}`}>
                      <div className="problem-header">
                        <span className={`severity-badge ${problem.severity}`}>
                          {problem.severity === "critical" ? "⚠️" : problem.severity === "high" ? "⚠" : "!"}
                          {problem.severity}
                        </span>
                        <span className={`status-badge ${wasIdentified ? 'found' : 'missed'}`}>
                          {wasIdentified ? "✓ Nalezeno" : "✗ Přehlédnuto"}
                        </span>
                      </div>
                      <div className="problem-text">"{problem.text}"</div>
                      <div className="problem-explanation">{problem.explanation}</div>
                      <div className="problem-recommendation">{problem.recommendation}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="action-buttons">
              <button
                className="continue-btn"
                onClick={handleContinue}
                style={{ backgroundColor: facultyColor }}
              >
                Pokračovat na Round 3 →
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  /**
   * CHECKLIST MODE RENDER
   */
  if (mode === "checklist") {
    return (
      <div className="quality-evaluation checklist-mode">
        <div className="evaluation-header">
          <h2>Round 2: Kontrola kvality výzkumu</h2>
          <p className="instruction">
            Přečtěte si abstrakt a označte, které kvalitativní kritéria jsou splněny.
          </p>
        </div>

        <div className="article-display">
          <h3 className="article-title">{article.title}</h3>
          <div className="abstract-text">{article.abstract}</div>
        </div>

        <div className="checklist">
          <h3>Kontrolní seznam kvality:</h3>
          {article.checklistItems.map((item) => (
            <div key={item.id} className={`checklist-item ${checklistAnswers[item.id] ? 'checked' : ''}`}>
              <label className="checklist-label">
                <input
                  type="checkbox"
                  checked={checklistAnswers[item.id] || false}
                  onChange={() => handleToggleChecklistItem(item.id)}
                  disabled={validated}
                />
                <span className="checkbox-custom"></span>
                <span className="item-text">
                  {item.label}
                  {item.importance === "high" && <span className="importance-badge">Klíčové</span>}
                </span>
              </label>

              {validated && (
                <div className={`item-result ${(checklistAnswers[item.id] === item.isCorrect) ? 'correct' : 'incorrect'}`}>
                  {(checklistAnswers[item.id] === item.isCorrect) ? "✓" : "✗"}
                  <div className="item-explanation">{item.explanation}</div>
                </div>
              )}
            </div>
          ))}
        </div>

        {!validated && (
          <div className="action-buttons">
            <button
              className="validate-btn"
              onClick={handleValidateChecklist}
              style={{ borderColor: facultyColor, color: facultyColor }}
            >
              Zkontrolovat
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
              <h3>Výsledky hodnocení</h3>
              <div className="score-display">
                <div className="score-number">{scoreResult.score} / {scoreResult.maxScore}</div>
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
                Pokračovat na Round 3 →
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return <div>Unknown mode: {mode}</div>;
};

QualityEvaluation.propTypes = {
  scenarioData: PropTypes.object.isRequired,
  onComplete: PropTypes.func.isRequired,
  facultyColor: PropTypes.string
};

QualityEvaluation.defaultProps = {
  facultyColor: "#0000dc"
};

export default QualityEvaluation;
