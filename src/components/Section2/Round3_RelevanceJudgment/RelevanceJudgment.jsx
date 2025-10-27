import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import { validateSelection, calculateScore, getFeedback, getRelevanceBadge } from "../../../utils/section2/round3Utils";
import "./RelevanceJudgment.css";

/**
 * Round 3: Relevance Judgment - Select relevant articles for research question
 */
const RelevanceJudgment = ({ scenarioData, onComplete, facultyColor }) => {
  const { researchQuestion, context, minSelection, maxSelection, articles } = scenarioData.round3;

  const [selectedArticles, setSelectedArticles] = useState([]);
  const [validated, setValidated] = useState(false);
  const [scoreResult, setScoreResult] = useState(null);
  const [feedback, setFeedback] = useState(null);

  const toggleArticle = useCallback((articleId) => {
    setSelectedArticles(prev => {
      if (prev.includes(articleId)) {
        return prev.filter(id => id !== articleId);
      } else {
        if (prev.length >= maxSelection) {
          return prev; // Don't add more than max
        }
        return [...prev, articleId];
      }
    });
    setValidated(false);
  }, [maxSelection]);

  const handleValidate = useCallback(() => {
    const validation = validateSelection(selectedArticles, articles, { minSelection, maxSelection });
    const score = calculateScore(validation, {});
    const performanceFeedback = getFeedback(score.percentage, score.missedHighlyRelevant);

    setScoreResult({ ...score, validation });
    setFeedback(performanceFeedback);
    setValidated(true);
  }, [selectedArticles, articles, minSelection, maxSelection]);

  const handleContinue = useCallback(() => {
    if (onComplete && scoreResult) {
      onComplete({
        score: scoreResult.score,
        maxScore: scoreResult.maxScore,
        percentage: scoreResult.percentage
      });
    }
  }, [onComplete, scoreResult]);

  return (
    <div className="relevance-judgment">
      <div className="judgment-header">
        <h2>Round 3: Posouzení relevance článků</h2>
        <div className="research-context">
          <h3>Výzkumná otázka:</h3>
          <p className="research-question">{researchQuestion}</p>
          <div className="context-info">
            <span><strong>Fakulta:</strong> {context.faculty}</span>
            <span><strong>Typ práce:</strong> {context.workType}</span>
            <span><strong>Obor:</strong> {context.field}</span>
          </div>
        </div>
        <p className="instruction">
          Vyberte {minSelection}-{maxSelection} nejrelevantnějších článků pro tuto výzkumnou otázku.
        </p>
      </div>

      <div className="articles-grid">
        {articles.map(article => {
          const isSelected = selectedArticles.includes(article.id);
          const relevanceBadge = getRelevanceBadge(article.relevance);

          return (
            <div
              key={article.id}
              className={`article-card ${isSelected ? 'selected' : ''} ${validated ? 'validated' : ''}`}
              onClick={() => !validated && toggleArticle(article.id)}
            >
              {isSelected && <div className="selected-indicator">✓</div>}

              <h4 className="article-title">{article.title}</h4>

              <div className="article-meta">
                <div className="authors">{article.authors.join(", ")}</div>
                <div className="journal-year">
                  <span>{article.journal}</span>
                  <span>({article.year})</span>
                </div>
                <div className="citations">📊 {article.citations} citací</div>
              </div>

              <p className="article-abstract">{article.abstract}</p>

              {validated && (
                <div className="relevance-reveal" style={{ borderColor: relevanceBadge.color }}>
                  <span className="relevance-badge" style={{ background: relevanceBadge.color }}>
                    {relevanceBadge.icon} {relevanceBadge.label}
                  </span>
                  <div className="relevance-feedback">
                    <strong>{article.relevanceFeedback.reason}</strong>
                    {article.relevanceFeedback.strengths.length > 0 && (
                      <div className="feedback-strengths">
                        ✓ {article.relevanceFeedback.strengths.join(", ")}
                      </div>
                    )}
                    {article.relevanceFeedback.limitations.length > 0 && (
                      <div className="feedback-limitations">
                        ⚠ {article.relevanceFeedback.limitations.join(", ")}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="selection-counter">
        <strong>Vybrané články:</strong> {selectedArticles.length} / {maxSelection}
      </div>

      {!validated && (
        <div className="action-buttons">
          <button
            className="validate-btn"
            onClick={handleValidate}
            style={{ borderColor: facultyColor, color: facultyColor }}
            disabled={selectedArticles.length < minSelection}
          >
            Zkontrolovat výběr
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
          </div>

          <div className="action-buttons">
            <button
              className="continue-btn"
              onClick={handleContinue}
              style={{ backgroundColor: facultyColor }}
            >
              Pokračovat na Round 4 →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

RelevanceJudgment.propTypes = {
  scenarioData: PropTypes.object.isRequired,
  onComplete: PropTypes.func.isRequired,
  facultyColor: PropTypes.string
};

RelevanceJudgment.defaultProps = {
  facultyColor: "#0000dc"
};

export default RelevanceJudgment;
