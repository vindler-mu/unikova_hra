import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import {
  validatePeerReview,
  getPeerReviewFeedback,
  getParagraphFeedback,
  hasMinimumIssues,
  hasMinimumStrengths
} from "../../../utils/section4/round3Utils";
import "./Round3_PeerReview.css";

/**
 * Round 3: Peer Review
 * Identify issues in text and select strengths
 */
const Round3_PeerReview = ({ scenarioData, onComplete, facultyColor }) => {
  const {
    scenario,
    researchContext,
    articleText,
    articleParagraphs,
    issueTypes,
    strengths,
    requiredIssues,
    requiredStrengths
  } = scenarioData;

  const [currentPhase, setCurrentPhase] = useState(1); // 1: Issues, 2: Strengths
  const [identifiedIssues, setIdentifiedIssues] = useState({});
  const [selectedParagraph, setSelectedParagraph] = useState(null);
  const [showIssueModal, setShowIssueModal] = useState(false);
  const [selectedStrengths, setSelectedStrengths] = useState([]);
  const [validated, setValidated] = useState(false);
  const [scoreResult, setScoreResult] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [paragraphFeedback, setParagraphFeedback] = useState({});

  const handleParagraphClick = useCallback((paragraph) => {
    if (validated || currentPhase !== 1) return;

    setSelectedParagraph(paragraph);
    setShowIssueModal(true);
  }, [validated, currentPhase]);

  const handleIssueTypeSelect = useCallback((issueTypeId) => {
    if (!selectedParagraph) return;

    setIdentifiedIssues(prev => ({
      ...prev,
      [selectedParagraph.id]: issueTypeId
    }));

    setShowIssueModal(false);
    setSelectedParagraph(null);
  }, [selectedParagraph]);

  const handleRemoveIssue = useCallback((paragraphId) => {
    if (validated) return;

    setIdentifiedIssues(prev => {
      const newIssues = { ...prev };
      delete newIssues[paragraphId];
      return newIssues;
    });
  }, [validated]);

  const handleNextPhase = useCallback(() => {
    if (hasMinimumIssues(identifiedIssues, requiredIssues)) {
      setCurrentPhase(2);
    }
  }, [identifiedIssues, requiredIssues]);

  const handlePreviousPhase = useCallback(() => {
    if (!validated && currentPhase === 2) {
      setCurrentPhase(1);
    }
  }, [validated, currentPhase]);

  const handleToggleStrength = useCallback((strengthId) => {
    if (validated) return;

    setSelectedStrengths(prev => {
      if (prev.includes(strengthId)) {
        return prev.filter(id => id !== strengthId);
      } else {
        return [...prev, strengthId];
      }
    });
  }, [validated]);

  const handleValidate = useCallback(() => {
    const results = validatePeerReview(identifiedIssues, selectedStrengths, scenarioData);
    const performanceFeedback = getPeerReviewFeedback(results.percentage);

    setScoreResult(results);
    setFeedback(performanceFeedback);
    setValidated(true);

    // Generate feedback for all paragraphs
    const allFeedback = {};
    Object.entries(identifiedIssues).forEach(([paragraphId, issueType]) => {
      const paragraph = articleParagraphs.find(p => p.id === paragraphId);
      allFeedback[paragraphId] = getParagraphFeedback(paragraph, issueType);
    });
    setParagraphFeedback(allFeedback);
  }, [identifiedIssues, selectedStrengths, scenarioData, articleParagraphs]);

  const handleContinue = useCallback(() => {
    if (onComplete && scoreResult) {
      onComplete({
        score: scoreResult.totalScore,
        maxScore: scoreResult.maxScore,
        percentage: scoreResult.percentage
      });
    }
  }, [onComplete, scoreResult]);

  const getIssueTypeName = (issueTypeId) => {
    const issueType = issueTypes.find(t => t.id === issueTypeId);
    return issueType ? issueType.label : "";
  };

  const getIssueTypeIcon = (issueTypeId) => {
    const issueType = issueTypes.find(t => t.id === issueTypeId);
    return issueType ? issueType.icon : "";
  };

  return (
    <div className="peer-review">
      <div className="peer-header">
        <h2>👥 Kolo 3: Peer Review</h2>
        <p className="scenario-text">{scenario}</p>
      </div>

      {/* Research Context */}
      <div className="research-context">
        <h3>{researchContext.title}</h3>
        <div className="context-meta">
          <span className="context-field">{researchContext.field}</span>
        </div>
      </div>

      {/* Phase Progress */}
      <div className="phase-progress">
        <div className={`phase-step ${currentPhase >= 1 ? 'active' : ''} ${currentPhase === 1 ? 'current' : ''}`}>
          <div className="phase-number">1</div>
          <div className="phase-label">Identifikace problémů</div>
        </div>
        <div className="phase-connector"></div>
        <div className={`phase-step ${currentPhase >= 2 ? 'active' : ''} ${currentPhase === 2 ? 'current' : ''}`}>
          <div className="phase-number">2</div>
          <div className="phase-label">Silné stránky</div>
        </div>
      </div>

      {/* Phase 1: Issues Identification */}
      {currentPhase === 1 && (
        <div className="phase-content issues-phase">
          <div className="phase-instructions">
            <h3>Fáze 1: Identifikace problémů</h3>
            <p>Klikni na problematické části textu a označ typ problému. Najdi alespoň {requiredIssues} problémy.</p>
          </div>

          <div className="article-container">
            <h4 className="article-title">Abstrakt článku:</h4>
            <div className="article-paragraphs">
              {articleParagraphs.map(paragraph => {
                const hasIdentifiedIssue = identifiedIssues[paragraph.id];
                const feedbackData = paragraphFeedback[paragraph.id];

                return (
                  <div
                    key={paragraph.id}
                    className={`article-paragraph ${hasIdentifiedIssue ? 'marked' : ''} ${
                      feedbackData?.status || ''
                    }`}
                    onClick={() => handleParagraphClick(paragraph)}
                  >
                    <span className="paragraph-text">{paragraph.text}</span>

                    {hasIdentifiedIssue && (
                      <div className="issue-indicator">
                        <span className="issue-badge">
                          {getIssueTypeIcon(identifiedIssues[paragraph.id])} {getIssueTypeName(identifiedIssues[paragraph.id])}
                        </span>
                        {!validated && (
                          <button
                            className="remove-issue-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveIssue(paragraph.id);
                            }}
                            title="Odebrat"
                          >
                            ✕
                          </button>
                        )}
                      </div>
                    )}

                    {feedbackData && validated && (
                      <div className="paragraph-feedback" style={{ color: feedbackData.color }}>
                        {feedbackData.message}
                        {feedbackData.explanation && (
                          <div className="feedback-explanation">{feedbackData.explanation}</div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="phase-actions">
            <div className="issues-stats">
              Označeno: <strong>{Object.keys(identifiedIssues).length}</strong> problémů
            </div>
            <button
              className="next-phase-btn"
              onClick={handleNextPhase}
              disabled={!hasMinimumIssues(identifiedIssues, requiredIssues)}
              style={{ borderColor: facultyColor, color: facultyColor }}
            >
              Pokračovat na silné stránky →
            </button>
          </div>
        </div>
      )}

      {/* Phase 2: Strengths Selection */}
      {currentPhase === 2 && (
        <div className="phase-content strengths-phase">
          <div className="phase-instructions">
            <h3>Fáze 2: Silné stránky článku</h3>
            <p>Vyber {requiredStrengths}-3 skutečné silné stránky článku.</p>
          </div>

          <div className="strengths-grid">
            {strengths.map(strength => {
              const isSelected = selectedStrengths.includes(strength.id);
              const isCorrect = validated && strength.isCorrect;
              const isIncorrect = validated && !strength.isCorrect && isSelected;

              return (
                <div
                  key={strength.id}
                  className={`strength-card ${isSelected ? 'selected' : ''} ${
                    isCorrect ? 'correct' : ''
                  } ${isIncorrect ? 'incorrect' : ''}`}
                  onClick={() => handleToggleStrength(strength.id)}
                >
                  <div className="strength-checkbox">
                    {isSelected && '✓'}
                  </div>
                  <div className="strength-text">{strength.text}</div>
                </div>
              );
            })}
          </div>

          <div className="phase-actions">
            <button
              className="prev-phase-btn"
              onClick={handlePreviousPhase}
              disabled={validated}
            >
              ← Zpět na problémy
            </button>
            <div className="strengths-stats">
              Vybráno: <strong>{selectedStrengths.length}</strong> silných stránek
            </div>
            {!validated && (
              <button
                className="validate-btn"
                onClick={handleValidate}
                disabled={!hasMinimumStrengths(selectedStrengths, requiredStrengths)}
                style={{ borderColor: facultyColor, color: facultyColor }}
              >
                Zkontrolovat peer review
              </button>
            )}
          </div>
        </div>
      )}

      {/* Issue Type Selection Modal */}
      {showIssueModal && selectedParagraph && (
        <div className="modal-overlay" onClick={() => setShowIssueModal(false)}>
          <div className="issue-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Vyber typ problému</h3>
              <button
                className="close-modal-btn"
                onClick={() => setShowIssueModal(false)}
              >
                ✕
              </button>
            </div>
            <div className="modal-content">
              <p className="selected-text">"{selectedParagraph.text}"</p>
              <div className="issue-types-grid">
                {issueTypes.map(issueType => (
                  <div
                    key={issueType.id}
                    className="issue-type-option"
                    onClick={() => handleIssueTypeSelect(issueType.id)}
                  >
                    <div className="issue-icon">{issueType.icon}</div>
                    <div className="issue-label">{issueType.label}</div>
                    <div className="issue-description">{issueType.description}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
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
            <h3>Výsledky peer review</h3>
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
              Pokračovat na Kolo 4 →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

Round3_PeerReview.propTypes = {
  scenarioData: PropTypes.object.isRequired,
  onComplete: PropTypes.func.isRequired,
  facultyColor: PropTypes.string
};

Round3_PeerReview.defaultProps = {
  facultyColor: "#0000dc"
};

export default Round3_PeerReview;
