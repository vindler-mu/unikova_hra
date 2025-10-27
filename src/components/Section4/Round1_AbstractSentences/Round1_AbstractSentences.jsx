import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import {
  validateAbstractSentences,
  getAbstractFeedback,
  getInlineSentenceFeedback,
  allSentencesAssigned,
  getSectionStatus
} from "../../../utils/section4/round1Utils";
import "./Round1_AbstractSentences.css";

/**
 * Round 1: Abstract Sentences
 * Drag & drop sentences into correct abstract sections
 */
const Round1_AbstractSentences = ({ scenarioData, onComplete, facultyColor }) => {
  const { scenario, researchContext, abstractSections, sentences } = scenarioData;

  const [sentencesPool, setSentencesPool] = useState(sentences);
  const [assignedSentences, setAssignedSentences] = useState(() => {
    const initial = {};
    abstractSections.forEach(section => {
      initial[section.id] = [];
    });
    return initial;
  });
  const [draggedSentence, setDraggedSentence] = useState(null);
  const [validated, setValidated] = useState(false);
  const [scoreResult, setScoreResult] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [inlineFeedback, setInlineFeedback] = useState({});

  const handleDragStart = useCallback((sentence) => {
    setDraggedSentence(sentence);
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
  }, []);

  const handleDrop = useCallback((e, targetSectionId) => {
    e.preventDefault();
    if (!draggedSentence) return;

    // Remove from pool
    setSentencesPool(prev => prev.filter(s => s.id !== draggedSentence.id));

    // Remove from other sections
    const newAssigned = { ...assignedSentences };
    Object.keys(newAssigned).forEach(sectionId => {
      newAssigned[sectionId] = newAssigned[sectionId].filter(s => s.id !== draggedSentence.id);
    });

    // Add to target section
    newAssigned[targetSectionId] = [...newAssigned[targetSectionId], draggedSentence];
    setAssignedSentences(newAssigned);

    // Show inline feedback after validation
    if (validated) {
      const feedbackResult = getInlineSentenceFeedback(draggedSentence, targetSectionId);
      setInlineFeedback(prev => ({
        ...prev,
        [draggedSentence.id]: feedbackResult
      }));
    }

    setDraggedSentence(null);
  }, [draggedSentence, assignedSentences, validated]);

  const handleRemoveSentence = useCallback((sentence, sectionId) => {
    if (validated) return;

    // Remove from section
    const newAssigned = { ...assignedSentences };
    newAssigned[sectionId] = newAssigned[sectionId].filter(s => s.id !== sentence.id);
    setAssignedSentences(newAssigned);

    // Add back to pool
    setSentencesPool(prev => [...prev, sentence]);

    // Remove inline feedback
    setInlineFeedback(prev => {
      const newFeedback = { ...prev };
      delete newFeedback[sentence.id];
      return newFeedback;
    });
  }, [assignedSentences, validated]);

  const handleValidate = useCallback(() => {
    const results = validateAbstractSentences(assignedSentences, sentences);
    const performanceFeedback = getAbstractFeedback(results.percentage);

    setScoreResult(results);
    setFeedback(performanceFeedback);
    setValidated(true);

    // Generate inline feedback for all sentences
    const allFeedback = {};
    Object.entries(assignedSentences).forEach(([sectionId, sectionSentences]) => {
      sectionSentences.forEach(sentence => {
        allFeedback[sentence.id] = getInlineSentenceFeedback(sentence, sectionId);
      });
    });
    setInlineFeedback(allFeedback);
  }, [assignedSentences, sentences]);

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
    <div className="abstract-sentences">
      <div className="abstract-header">
        <h2>📄 Kolo 1: Vytvoření abstraktu</h2>
        <p className="scenario-text">{scenario}</p>
      </div>

      {/* Research Context */}
      <div className="research-context">
        <h3>{researchContext.title}</h3>
        <div className="context-meta">
          <span className="context-field">{researchContext.field}</span>
          <span className="context-topic">{researchContext.topic}</span>
        </div>
      </div>

      <div className="abstract-workspace">
        {/* Sentences Pool */}
        <div className="sentences-pool">
          <h3>📥 Dostupné věty ({sentencesPool.length})</h3>
          <div className="pool-instructions">
            Přetáhni věty do správných sekcí abstraktu. Některé věty nepatří nikam!
          </div>
          <div className="sentences-list">
            {sentencesPool.map(sentence => (
              <div
                key={sentence.id}
                className="sentence-card draggable"
                draggable={!validated}
                onDragStart={() => handleDragStart(sentence)}
              >
                {sentence.text}
              </div>
            ))}
          </div>
        </div>

        {/* Abstract Sections */}
        <div className="abstract-sections">
          <h3>📝 Struktura abstraktu</h3>
          {abstractSections.map(section => {
            const sectionSentences = assignedSentences[section.id] || [];
            const status = getSectionStatus(section.id, sectionSentences, section);

            return (
              <div
                key={section.id}
                className="abstract-section"
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, section.id)}
              >
                <div className="section-header">
                  <div>
                    <h4>{section.label}</h4>
                    <p className="section-description">{section.description}</p>
                  </div>
                  <div className={`section-status ${status.ok ? 'ok' : 'warning'}`}>
                    {status.message}
                  </div>
                </div>

                <div className="section-content">
                  {sectionSentences.length === 0 ? (
                    <div className="empty-section">
                      Přetáhni sem věty...
                    </div>
                  ) : (
                    <div className="assigned-sentences">
                      {sectionSentences.map((sentence, index) => (
                        <div
                          key={sentence.id}
                          className={`sentence-card assigned ${
                            inlineFeedback[sentence.id]?.correct ? 'correct' :
                            validated ? 'incorrect' : ''
                          }`}
                        >
                          <div className="sentence-number">{index + 1}.</div>
                          <div className="sentence-text">{sentence.text}</div>

                          {inlineFeedback[sentence.id] && (
                            <div
                              className="inline-feedback"
                              style={{ color: inlineFeedback[sentence.id].color }}
                            >
                              {inlineFeedback[sentence.id].message}
                            </div>
                          )}

                          {!validated && (
                            <button
                              className="remove-btn"
                              onClick={() => handleRemoveSentence(sentence, section.id)}
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
              </div>
            );
          })}
        </div>
      </div>

      {/* Validation Button */}
      {!validated && allSentencesAssigned(assignedSentences, sentences) && (
        <div className="action-buttons">
          <button
            className="validate-btn"
            onClick={handleValidate}
            style={{ borderColor: facultyColor, color: facultyColor }}
          >
            Zkontrolovat abstrakt
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
            <h3>Výsledky strukturování</h3>
            <div className="score-display">
              <div className="score-number">{scoreResult.totalScore} / {scoreResult.maxScore}</div>
              <div className="score-percentage">{scoreResult.percentage}%</div>
            </div>

            <div className="score-breakdown">
              {scoreResult.breakdown.map((item, idx) => (
                <div key={idx} className="breakdown-item">
                  <span className="breakdown-label">{item.label}</span>
                  <span className={`breakdown-points ${item.earned ? 'earned' : 'penalty'}`}>
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
              Pokračovat na Kolo 2 →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

Round1_AbstractSentences.propTypes = {
  scenarioData: PropTypes.object.isRequired,
  onComplete: PropTypes.func.isRequired,
  facultyColor: PropTypes.string
};

Round1_AbstractSentences.defaultProps = {
  facultyColor: "#0000dc"
};

export default Round1_AbstractSentences;
