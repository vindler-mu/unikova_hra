import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import SourceCard from "./SourceCard";
import {
  calculateRankingScore,
  getRankingFeedback,
  calculateDetectiveScore,
  validateRedFlags,
  getDetectiveFeedback,
  getHint
} from "../../../utils/section2/round1Utils";
import "./CredibilityAssessment.css";

/**
 * Round 1: Credibility Assessment Component
 * Supports two modes:
 * - ranking: Drag-and-drop ranking of sources by credibility
 * - detective: Identify red flags in a single source
 */
const CredibilityAssessment = ({ scenarioData, onComplete, facultyColor }) => {
  const { mode, instruction, sources, source } = scenarioData.round1;

  // State for ranking mode
  const [rankedSources, setRankedSources] = useState(
    mode === "ranking" ? [...sources] : []
  );

  // State for detective mode
  const [identifiedFlags, setIdentifiedFlags] = useState([]);

  // Validation state
  const [validated, setValidated] = useState(false);
  const [scoreResult, setScoreResult] = useState(null);
  const [feedback, setFeedback] = useState(null);

  /**
   * RANKING MODE HANDLERS
   */
  const handleDragEnd = useCallback((result) => {
    if (!result.destination) return;

    const items = Array.from(rankedSources);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setRankedSources(items);
    setValidated(false); // Reset validation when order changes
  }, [rankedSources]);

  const handleValidateRanking = useCallback(() => {
    const userRanking = rankedSources.map(s => s.id);
    const score = calculateRankingScore(userRanking, sources);
    const performanceFeedback = getRankingFeedback(score.percentage);

    setScoreResult(score);
    setFeedback(performanceFeedback);
    setValidated(true);
  }, [rankedSources, sources]);

  /**
   * DETECTIVE MODE HANDLERS
   */
  const handleToggleFlag = useCallback((flagId) => {
    setIdentifiedFlags(prev => {
      if (prev.includes(flagId)) {
        return prev.filter(id => id !== flagId);
      } else {
        return [...prev, flagId];
      }
    });
    setValidated(false); // Reset validation when flags change
  }, []);

  const handleValidateDetective = useCallback(() => {
    const validation = validateRedFlags(identifiedFlags, source.redFlags);
    const score = calculateDetectiveScore(validation, source.redFlags);
    const performanceFeedback = getDetectiveFeedback(score.percentage, score.missedCritical);

    setScoreResult(score);
    setFeedback(performanceFeedback);
    setValidated(true);
  }, [identifiedFlags, source]);

  /**
   * COMPLETE ROUND
   */
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
   * RANKING MODE RENDER
   */
  if (mode === "ranking") {
    return (
      <div className="credibility-assessment">
        <div className="assessment-header">
          <h2>Round 1: Hodnocení věrohodnosti zdrojů</h2>
          <p className="instruction">{instruction}</p>
          <div className="ranking-hint">
            💡 Tip: Přetáhněte zdroje do pořadí od nejvěrohodnějšího (nahoře) po nejméně věrohodný (dole)
          </div>
        </div>

        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="sources">
            {(provided, snapshot) => (
              <div
                className={`sources-list ${snapshot.isDraggingOver ? 'dragging-over' : ''}`}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {rankedSources.map((sourceItem, index) => (
                  <Draggable
                    key={sourceItem.id}
                    draggableId={sourceItem.id}
                    index={index}
                    isDragDisabled={validated}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`draggable-source ${snapshot.isDragging ? 'dragging' : ''}`}
                      >
                        <SourceCard
                          source={sourceItem}
                          rank={index + 1}
                          mode="ranking"
                          showResult={validated}
                          scoreInfo={
                            validated && scoreResult
                              ? scoreResult.breakdown.find(b => b.sourceId === sourceItem.id)
                              : null
                          }
                          facultyColor={facultyColor}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        {!validated && (
          <div className="action-buttons">
            <button
              className="validate-btn"
              onClick={handleValidateRanking}
              style={{ borderColor: facultyColor, color: facultyColor }}
            >
              Zkontrolovat pořadí
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
                <div className="score-number">
                  {scoreResult.score} / {scoreResult.maxScore}
                </div>
                <div className="score-percentage">{scoreResult.percentage}%</div>
              </div>

              <div className="correct-order">
                <h4>Správné pořadí:</h4>
                <ol>
                  {scoreResult.correctRanking.map((item) => (
                    <li key={item.id}>
                      <strong>{item.title}</strong>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <div className="action-buttons">
              <button
                className="continue-btn"
                onClick={handleContinue}
                style={{ backgroundColor: facultyColor }}
              >
                Pokračovat na Round 2 →
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  /**
   * DETECTIVE MODE RENDER
   */
  if (mode === "detective") {
    return (
      <div className="credibility-assessment detective-mode">
        <div className="assessment-header">
          <h2>Round 1: Detekce problémů ve zdroji</h2>
          <p className="instruction">{instruction}</p>
          <div className="detective-hint">
            🕵️ Tip: Klikněte na různé sekce zdroje pro označení problémů (red flags)
          </div>
        </div>

        <div className="detective-source">
          <SourceCard
            source={source}
            mode="detective"
            identifiedFlags={identifiedFlags}
            onToggleFlag={handleToggleFlag}
            facultyColor={facultyColor}
            showResult={validated}
          />
        </div>

        <div className="flag-counter">
          <strong>Označených problémů:</strong> {identifiedFlags.length} / {source.redFlags.length}
        </div>

        {!validated && (
          <div className="action-buttons">
            <button
              className="validate-btn"
              onClick={handleValidateDetective}
              style={{ borderColor: facultyColor, color: facultyColor }}
              disabled={identifiedFlags.length === 0}
            >
              Zkontrolovat výsledky
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
                <div className="score-number">
                  {scoreResult.score} / {scoreResult.maxScore}
                </div>
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

              {scoreResult.missedCritical > 0 && (
                <div className="missed-critical-warning">
                  ⚠️ Pozor: Přehlédli jste {scoreResult.missedCritical} kritický problém!
                </div>
              )}
            </div>

            <div className="action-buttons">
              <button
                className="continue-btn"
                onClick={handleContinue}
                style={{ backgroundColor: facultyColor }}
              >
                Pokračovat na Round 2 →
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return <div>Unknown mode: {mode}</div>;
};

CredibilityAssessment.propTypes = {
  scenarioData: PropTypes.shape({
    round1: PropTypes.shape({
      mode: PropTypes.oneOf(["ranking", "detective"]).isRequired,
      instruction: PropTypes.string.isRequired,
      sources: PropTypes.arrayOf(PropTypes.object), // For ranking mode
      source: PropTypes.object // For detective mode
    }).isRequired
  }).isRequired,
  onComplete: PropTypes.func.isRequired,
  facultyColor: PropTypes.string
};

CredibilityAssessment.defaultProps = {
  facultyColor: "#0000dc"
};

export default CredibilityAssessment;
