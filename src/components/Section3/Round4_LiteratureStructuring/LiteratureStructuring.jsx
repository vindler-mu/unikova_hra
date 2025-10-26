import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import {
  validateLiteratureStructure,
  getLiteratureFeedback,
  validateSectionRequirements
} from "../../../utils/section3/round4Utils";
import "./LiteratureStructuring.css";

/**
 * Round 4: Literature Structuring
 * Drag & drop sources into outline sections
 */
const LiteratureStructuring = ({ scenarioData, onComplete, facultyColor }) => {
  const { scenario, outlineStructure, sources, requiresOrdering, gapAnalysisQuestions } = scenarioData;

  const [sourcesPool, setSourcesPool] = useState([]);
  const [assignedSources, setAssignedSources] = useState({});
  const [draggedSource, setDraggedSource] = useState(null);
  const [gapAnswer, setGapAnswer] = useState('');
  const [validated, setValidated] = useState(false);
  const [scoreResult, setScoreResult] = useState(null);
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    if (sources) {
      setSourcesPool(sources);
      const initial = {};
      outlineStructure.forEach(section => {
        initial[section.id] = [];
      });
      setAssignedSources(initial);
    }
  }, [sources, outlineStructure]);

  const handleDragStart = useCallback((e, source) => {
    setDraggedSource(source);
    e.dataTransfer.effectAllowed = 'move';
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  }, []);

  const handleDrop = useCallback((e, targetSectionId) => {
    e.preventDefault();
    if (!draggedSource) return;

    // Remove from current location
    const newAssigned = { ...assignedSources };
    Object.keys(newAssigned).forEach(sectionId => {
      newAssigned[sectionId] = newAssigned[sectionId].filter(s => s.id !== draggedSource.id);
    });

    // Add to new section
    newAssigned[targetSectionId] = [...newAssigned[targetSectionId], draggedSource];

    // Remove from pool if it was there
    setSourcesPool(prev => prev.filter(s => s.id !== draggedSource.id));
    setAssignedSources(newAssigned);
    setDraggedSource(null);
  }, [draggedSource, assignedSources]);

  const handleReturnToPool = useCallback((source, fromSectionId) => {
    setAssignedSources(prev => ({
      ...prev,
      [fromSectionId]: prev[fromSectionId].filter(s => s.id !== source.id)
    }));
    setSourcesPool(prev => [...prev, source]);
  }, []);

  const handleValidate = useCallback(() => {
    const results = validateLiteratureStructure(assignedSources, gapAnswer, scenarioData);
    const performanceFeedback = getLiteratureFeedback(results.percentage);

    setScoreResult(results);
    setFeedback(performanceFeedback);
    setValidated(true);
  }, [assignedSources, gapAnswer, scenarioData]);

  const handleContinue = useCallback(() => {
    if (onComplete && scoreResult) {
      onComplete({
        score: scoreResult.totalScore,
        maxScore: scoreResult.maxScore,
        percentage: scoreResult.percentage
      });
    }
  }, [onComplete, scoreResult]);

  const allSourcesAssigned = sourcesPool.length === 0;

  return (
    <div className="literature-structuring">
      <div className="structuring-header">
        <h2>📋 Kolo 4: Strukturování literatury</h2>
        <p className="scenario-text">{scenario}</p>
      </div>

      <div className="structuring-layout">
        {/* Sources Pool */}
        <div className="sources-pool">
          <h3>📚 Dostupné zdroje ({sourcesPool.length})</h3>
          <div className="sources-list">
            {sourcesPool.map(source => (
              <div
                key={source.id}
                className="source-card"
                draggable={!validated}
                onDragStart={(e) => handleDragStart(e, source)}
              >
                <div className="source-title">{source.displayData.title}</div>
                <div className="source-meta">
                  <span>{source.displayData.authors}</span>
                  <span className="source-year">({source.displayData.year})</span>
                </div>
                <div className="source-type">{source.displayData.type}</div>
              </div>
            ))}
            {sourcesPool.length === 0 && (
              <div className="empty-pool">
                ✓ Všechny zdroje přiřazeny
              </div>
            )}
          </div>
        </div>

        {/* Outline Structure */}
        <div className="outline-area">
          <h3>📝 Literature Review Outline</h3>
          {outlineStructure.map((section, index) => {
            const sectionSources = assignedSources[section.id] || [];
            const validation = validateSectionRequirements(section, sectionSources.length);

            return (
              <div
                key={section.id}
                className={`section-dropzone ${!validation.isValid ? 'invalid' : 'valid'}`}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, section.id)}
              >
                <div className="section-header">
                  <div className="section-number">{index + 1}</div>
                  <div className="section-info">
                    <h4>{section.title}</h4>
                    <p className="section-desc">{section.description}</p>
                  </div>
                  <div className={`source-count ${validation.isValid ? 'valid' : 'invalid'}`}>
                    {sectionSources.length} / {section.minSources}-{section.maxSources || '∞'}
                  </div>
                </div>

                <div className="drop-area">
                  {sectionSources.length > 0 ? (
                    <div className="section-sources">
                      {sectionSources.map((source) => (
                        <div key={source.id} className="assigned-source">
                          {requiresOrdering && (
                            <div className="order-indicator">{sectionSources.indexOf(source) + 1}</div>
                          )}
                          <div className="source-content">
                            <div className="source-title">{source.displayData.title}</div>
                            <div className="source-meta">
                              {source.displayData.authors} ({source.displayData.year})
                            </div>
                          </div>
                          {!validated && (
                            <button
                              className="remove-btn"
                              onClick={() => handleReturnToPool(source, section.id)}
                              title="Vrátit do poolu"
                            >
                              ✗
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="empty-section">
                      Přetáhni sem relevantní zdroje...
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Gap Analysis */}
      {gapAnalysisQuestions && gapAnalysisQuestions.length > 0 && (
        <div className="gap-analyzer">
          <h3>🔍 Analýza mezer v literatuře</h3>
          <div className="gap-question">
            <p className="question-text">{gapAnalysisQuestions[0].text}</p>
            {gapAnalysisQuestions[0].type === 'multiple-choice' ? (
              <div className="options-list">
                {gapAnalysisQuestions[0].options.map(option => (
                  <button
                    key={option}
                    className={`option-btn ${gapAnswer === option ? 'selected' : ''}`}
                    onClick={() => setGapAnswer(option)}
                    disabled={validated}
                  >
                    {option}
                    {gapAnswer === option && <span className="check">✓</span>}
                  </button>
                ))}
              </div>
            ) : (
              <textarea
                className="text-answer"
                value={gapAnswer}
                onChange={(e) => setGapAnswer(e.target.value)}
                placeholder="Napiš svou odpověď..."
                rows={4}
                disabled={validated}
              />
            )}
          </div>
        </div>
      )}

      {!validated && (
        <div className="action-buttons">
          <button
            className="validate-btn"
            onClick={handleValidate}
            style={{ borderColor: facultyColor, color: facultyColor }}
            disabled={!allSourcesAssigned}
          >
            Dokončit strukturu ✓
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
            <h3>Výsledky strukturování</h3>
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
              Dokončit Section 3 →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

LiteratureStructuring.propTypes = {
  scenarioData: PropTypes.object.isRequired,
  onComplete: PropTypes.func.isRequired,
  facultyColor: PropTypes.string
};

LiteratureStructuring.defaultProps = {
  facultyColor: "#0000dc"
};

export default LiteratureStructuring;
