import React, { useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import {
  validateCitationManagement,
  getCitationFeedback,
  getInlineFeedback,
  formatCitation,
  allSourcesAssigned
} from "../../../utils/section3/round1Utils";
import "./Round1_CitationManagement.css";

/**
 * Round 1: Citation Management
 * Drag & drop sources into correct categories
 */
const Round1_CitationManagement = ({ scenarioData, onComplete, facultyColor }) => {
  const { scenario, categories, sources, citationStyle } = scenarioData;

  const [sourcesPool, setSourcesPool] = useState(sources);
  const [assignedSources, setAssignedSources] = useState(() => {
    const initial = {};
    categories.forEach(cat => {
      initial[cat.id] = [];
    });
    return initial;
  });
  const [draggedSource, setDraggedSource] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [previewSource, setPreviewSource] = useState(null);
  const [validated, setValidated] = useState(false);
  const [scoreResult, setScoreResult] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [inlineFeedback, setInlineFeedback] = useState({});

  // Auto-validate when all sources are assigned
  useEffect(() => {
    if (allSourcesAssigned(assignedSources, sources.length) && !validated) {
      handleValidate();
    }
  }, [assignedSources, sources.length, validated]);

  const handleDragStart = useCallback((e, source) => {
    setDraggedSource(source);
    e.dataTransfer.effectAllowed = "move";
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }, []);

  const handleDrop = useCallback((e, targetCategoryId) => {
    e.preventDefault();
    if (!draggedSource) return;

    // Remove from pool
    setSourcesPool(prev => prev.filter(s => s.id !== draggedSource.id));

    // Remove from other categories
    const newAssigned = { ...assignedSources };
    Object.keys(newAssigned).forEach(catId => {
      newAssigned[catId] = newAssigned[catId].filter(s => s.id !== draggedSource.id);
    });

    // Add to target category
    newAssigned[targetCategoryId] = [...newAssigned[targetCategoryId], draggedSource];
    setAssignedSources(newAssigned);

    // Show inline feedback
    const feedbackResult = getInlineFeedback(draggedSource, targetCategoryId);
    setInlineFeedback(prev => ({
      ...prev,
      [draggedSource.id]: feedbackResult
    }));

    setDraggedSource(null);
  }, [draggedSource, assignedSources]);

  const handleRemoveSource = useCallback((source, categoryId) => {
    if (validated) return;

    // Remove from category
    const newAssigned = { ...assignedSources };
    newAssigned[categoryId] = newAssigned[categoryId].filter(s => s.id !== source.id);
    setAssignedSources(newAssigned);

    // Add back to pool
    setSourcesPool(prev => [...prev, source]);

    // Remove inline feedback
    setInlineFeedback(prev => {
      const newFeedback = { ...prev };
      delete newFeedback[source.id];
      return newFeedback;
    });
  }, [assignedSources, validated]);

  const handleShowPreview = useCallback((source) => {
    setPreviewSource(source);
    setShowPreview(true);
  }, []);

  const handleValidate = useCallback(() => {
    const results = validateCitationManagement(assignedSources, scenarioData);
    const performanceFeedback = getCitationFeedback(results.percentage);

    setScoreResult(results);
    setFeedback(performanceFeedback);
    setValidated(true);
  }, [assignedSources, scenarioData]);

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
    <div className="citation-management">
      <div className="citation-header">
        <h2>📚 Kolo 1: Správa citací</h2>
        <p className="scenario-text">{scenario}</p>
      </div>

      <div className="citation-instructions">
        <div className="instruction-card">
          <strong>Instrukce:</strong> Přetáhni zdroje do správných kategorií podle typu publikace.
          Klikni na "Zobrazit citaci" pro náhled formátované citace.
        </div>
      </div>

      <div className="citation-workspace">
        {/* Sources Pool */}
        <div className="sources-pool">
          <h3>📥 Dostupné zdroje ({sourcesPool.length})</h3>
          <div className="sources-list">
            {sourcesPool.map(source => (
              <div
                key={source.id}
                className="source-card draggable"
                draggable={!validated}
                onDragStart={(e) => handleDragStart(e, source)}
              >
                <div className="source-info">
                  <div className="source-authors">{source.displayData.authors}</div>
                  <div className="source-year">({source.displayData.year})</div>
                  <div className="source-title">{source.displayData.title}</div>
                  <div className="source-type-badge">{source.displayData.type}</div>
                </div>
                <button
                  className="preview-btn"
                  onClick={() => handleShowPreview(source)}
                  title="Zobrazit citaci"
                >
                  👁️
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div className="categories-section">
          <h3>📂 Kategorie zdrojů</h3>
          <div className="categories-grid">
            {categories.map(category => (
              <div
                key={category.id}
                className="category-dropzone"
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, category.id)}
              >
                <div className="category-header">
                  <span className="category-icon">{category.icon}</span>
                  <div className="category-info">
                    <h4>{category.label}</h4>
                    <p className="category-description">{category.description}</p>
                  </div>
                </div>

                <div className="category-content">
                  {assignedSources[category.id].length === 0 ? (
                    <div className="empty-category">
                      Přetáhni sem zdroje...
                    </div>
                  ) : (
                    <div className="assigned-sources">
                      {assignedSources[category.id].map(source => (
                        <div
                          key={source.id}
                          className={`source-card assigned ${
                            inlineFeedback[source.id]?.correct ? 'correct' : 'incorrect'
                          }`}
                        >
                          <div className="source-info">
                            <div className="source-authors">{source.displayData.authors}</div>
                            <div className="source-year">({source.displayData.year})</div>
                            <div className="source-title">{source.displayData.title}</div>
                          </div>

                          {inlineFeedback[source.id] && (
                            <div
                              className="inline-feedback"
                              style={{ color: inlineFeedback[source.id].color }}
                            >
                              {inlineFeedback[source.id].message}
                            </div>
                          )}

                          {!validated && (
                            <button
                              className="remove-btn"
                              onClick={() => handleRemoveSource(source, category.id)}
                              title="Vrátit zpět"
                            >
                              ↩️
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="category-counter">
                  {assignedSources[category.id].length} zdrojů
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Citation Preview Modal */}
      {showPreview && previewSource && (
        <div className="citation-preview-overlay" onClick={() => setShowPreview(false)}>
          <div className="citation-preview-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Náhled citace</h3>
              <button
                className="close-btn"
                onClick={() => setShowPreview(false)}
              >
                ✕
              </button>
            </div>

            <div className="modal-content">
              <div className="source-details">
                <p><strong>Autor:</strong> {previewSource.displayData.authors}</p>
                <p><strong>Rok:</strong> {previewSource.displayData.year}</p>
                <p><strong>Název:</strong> {previewSource.displayData.title}</p>
                <p><strong>Typ:</strong> {previewSource.displayData.type}</p>
              </div>

              <div className="citation-formats">
                <div className="citation-format">
                  <h4>APA 7</h4>
                  <div className="citation-text">
                    {formatCitation(previewSource.citationData, "apa")}
                  </div>
                </div>

                <div className="citation-format">
                  <h4>ISO 690</h4>
                  <div className="citation-text">
                    {formatCitation(previewSource.citationData, "iso690")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Validation Button */}
      {!validated && sourcesPool.length === 0 && (
        <div className="action-buttons">
          <button
            className="validate-btn"
            onClick={handleValidate}
            style={{ borderColor: facultyColor, color: facultyColor }}
          >
            Zkontrolovat kategorizaci
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
            <h3>Výsledky kategorizace</h3>
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
              Pokračovat na Kolo 2 →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

Round1_CitationManagement.propTypes = {
  scenarioData: PropTypes.object.isRequired,
  onComplete: PropTypes.func.isRequired,
  facultyColor: PropTypes.string
};

Round1_CitationManagement.defaultProps = {
  facultyColor: "#0000dc"
};

export default Round1_CitationManagement;
