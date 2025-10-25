import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { validateCategorization, calculateScore, getFeedback, getCategoryBadge } from "../../../utils/section2/round4Utils";
import "./FakeNewsDetector.css";

/**
 * Round 4: Fake News Detector - Sort sources into categories
 */
const FakeNewsDetector = ({ scenarioData, onComplete, facultyColor }) => {
  const { instruction, sources } = scenarioData.round4;

  const categories = ["credible", "news", "questionable", "fake"];

  const [sourceCategories, setSourceCategories] = useState(
    sources.reduce((acc, source) => {
      acc[source.id] = null; // Start uncategorized
      return acc;
    }, {})
  );

  const [validated, setValidated] = useState(false);
  const [scoreResult, setScoreResult] = useState(null);
  const [feedback, setFeedback] = useState(null);

  const handleDragEnd = useCallback((result) => {
    if (!result.destination) return;

    const sourceId = result.draggableId;
    const destCategory = result.destination.droppableId;

    setSourceCategories(prev => ({
      ...prev,
      [sourceId]: destCategory === "uncategorized" ? null : destCategory
    }));

    setValidated(false);
  }, []);

  const handleValidate = useCallback(() => {
    const validation = validateCategorization(sourceCategories, sources);
    const score = calculateScore(validation, sources);
    const performanceFeedback = getFeedback(score.percentage, score.missedFake);

    setScoreResult({ ...score, validation });
    setFeedback(performanceFeedback);
    setValidated(true);
  }, [sourceCategories, sources]);

  const handleContinue = useCallback(() => {
    if (onComplete && scoreResult) {
      onComplete({
        score: scoreResult.score,
        maxScore: scoreResult.maxScore,
        percentage: scoreResult.percentage
      });
    }
  }, [onComplete, scoreResult]);

  const getSourcesByCategory = (category) => {
    return sources.filter(s => sourceCategories[s.id] === category);
  };

  const getUncategorized = () => {
    return sources.filter(s => !sourceCategories[s.id]);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="fake-news-detector">
        <div className="detector-header">
          <h2>Round 4: Detekce Fake News</h2>
          <p className="instruction">{instruction}</p>
          <div className="detector-hint">
            🛡️ Tip: Přetáhněte zdroje do správných kategorií. Dávejte pozor na senzační nadpisy,
            anonymní autory, emotivní jazyk a nedostatek důkazů.
          </div>
        </div>

        <div className="categories-container">
          {categories.map(category => {
            const badge = getCategoryBadge(category);
            const categorySource = getSourcesByCategory(category);

            return (
              <Droppable key={category} droppableId={category}>
                {(provided, snapshot) => (
                  <div
                    className={`category-zone ${snapshot.isDraggingOver ? 'dragging-over' : ''}`}
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <div className="category-header" style={{ borderColor: badge.color }}>
                      <span className="category-icon">{badge.icon}</span>
                      <div>
                        <h3>{badge.label}</h3>
                        <p className="category-desc">{badge.description}</p>
                      </div>
                      <span className="category-count">{categorySource.length}</span>
                    </div>

                    <div className="category-sources">
                      {categorySource.map((source, index) => (
                        <Draggable
                          key={source.id}
                          draggableId={source.id}
                          index={index}
                          isDragDisabled={validated}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`source-item ${snapshot.isDragging ? 'dragging' : ''} ${validated ? (source.correctCategory === category ? 'correct' : 'incorrect') : ''}`}
                            >
                              <h4>{source.title}</h4>
                              <div className="source-meta">
                                <span>📝 {source.author}</span>
                                <span>📚 {source.publication}</span>
                                <span>📅 {source.year}</span>
                              </div>
                              {validated && source.correctCategory !== category && (
                                <div className="correct-category-hint">
                                  → Správně: {getCategoryBadge(source.correctCategory).label}
                                </div>
                              )}
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  </div>
                )}
              </Droppable>
            );
          })}
        </div>

        <Droppable droppableId="uncategorized">
          {(provided, snapshot) => (
            <div
              className={`uncategorized-zone ${snapshot.isDraggingOver ? 'dragging-over' : ''}`}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <h3>Zdroje k zařazení ({getUncategorized().length})</h3>
              <div className="uncategorized-sources">
                {getUncategorized().map((source, index) => (
                  <Draggable
                    key={source.id}
                    draggableId={source.id}
                    index={index}
                    isDragDisabled={validated}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`source-item ${snapshot.isDragging ? 'dragging' : ''}`}
                      >
                        <h4>{source.title}</h4>
                        <div className="source-meta">
                          <span>📝 {source.author}</span>
                          <span>📚 {source.publication}</span>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            </div>
          )}
        </Droppable>

        {!validated && (
          <div className="action-buttons">
            <button
              className="validate-btn"
              onClick={handleValidate}
              style={{ borderColor: facultyColor, color: facultyColor }}
              disabled={getUncategorized().length > 0}
            >
              Zkontrolovat zařazení
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
              <h3>Výsledky detekce</h3>
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
                Dokončit sekci →
              </button>
            </div>
          </div>
        )}
      </div>
    </DragDropContext>
  );
};

FakeNewsDetector.propTypes = {
  scenarioData: PropTypes.object.isRequired,
  onComplete: PropTypes.func.isRequired,
  facultyColor: PropTypes.string
};

FakeNewsDetector.defaultProps = {
  facultyColor: "#0000dc"
};

export default FakeNewsDetector;
