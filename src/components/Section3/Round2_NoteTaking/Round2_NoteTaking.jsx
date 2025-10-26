import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import {
  validateNoteTaking,
  getNoteTakingFeedback,
  hasMinimumHighlights,
  hasMinimumTags,
  getHighlightColor,
  validateNoteLength
} from "../../../utils/section3/round2Utils";
import "./Round2_NoteTaking.css";

/**
 * Round 2: Note-taking & Annotation
 * Three-phase workflow: Highlighting → Tagging → Note Writing
 */
const Round2_NoteTaking = ({ scenarioData, onComplete, facultyColor }) => {
  const {
    scenario,
    articleText,
    highlightCategories,
    availableTags,
    noteSynthesisPrompt
  } = scenarioData;

  const [currentPhase, setCurrentPhase] = useState(1); // 1: Highlighting, 2: Tagging, 3: Note Writing
  const [highlights, setHighlights] = useState({});
  const [tags, setTags] = useState({});
  const [note, setNote] = useState("");
  const [selectedHighlightCategory, setSelectedHighlightCategory] = useState(null);
  const [selectedSentenceForTagging, setSelectedSentenceForTagging] = useState(null);
  const [validated, setValidated] = useState(false);
  const [scoreResult, setScoreResult] = useState(null);
  const [feedback, setFeedback] = useState(null);

  const handleHighlightSentence = useCallback((sentenceId) => {
    if (currentPhase !== 1 || !selectedHighlightCategory) return;

    setHighlights(prev => ({
      ...prev,
      [sentenceId]: selectedHighlightCategory
    }));
  }, [currentPhase, selectedHighlightCategory]);

  const handleRemoveHighlight = useCallback((sentenceId) => {
    if (currentPhase !== 1) return;

    setHighlights(prev => {
      const newHighlights = { ...prev };
      delete newHighlights[sentenceId];
      return newHighlights;
    });
  }, [currentPhase]);

  const handleNextPhase = useCallback(() => {
    if (currentPhase === 1) {
      if (hasMinimumHighlights(highlights, 3)) {
        setCurrentPhase(2);
      }
    } else if (currentPhase === 2) {
      if (hasMinimumTags(tags, 3)) {
        setCurrentPhase(3);
      }
    }
  }, [currentPhase, highlights, tags]);

  const handlePreviousPhase = useCallback(() => {
    if (currentPhase > 1 && !validated) {
      setCurrentPhase(prev => prev - 1);
    }
  }, [currentPhase, validated]);

  const handleToggleTag = useCallback((sentenceId, tagId) => {
    setTags(prev => {
      const sentenceTags = prev[sentenceId] || [];
      const newTags = { ...prev };

      if (sentenceTags.includes(tagId)) {
        newTags[sentenceId] = sentenceTags.filter(t => t !== tagId);
      } else {
        newTags[sentenceId] = [...sentenceTags, tagId];
      }

      return newTags;
    });
  }, []);

  const handleValidate = useCallback(() => {
    const results = validateNoteTaking(highlights, tags, note, scenarioData);
    const performanceFeedback = getNoteTakingFeedback(results.percentage);

    setScoreResult(results);
    setFeedback(performanceFeedback);
    setValidated(true);
  }, [highlights, tags, note, scenarioData]);

  const handleContinue = useCallback(() => {
    if (onComplete && scoreResult) {
      onComplete({
        score: scoreResult.totalScore,
        maxScore: scoreResult.maxScore,
        percentage: scoreResult.percentage
      });
    }
  }, [onComplete, scoreResult]);

  const noteLengthValidation = validateNoteLength(note);

  return (
    <div className="note-taking">
      <div className="note-taking-header">
        <h2>📝 Kolo 2: Poznámkování a anotace</h2>
        <p className="scenario-text">{scenario}</p>
      </div>

      {/* Phase Progress */}
      <div className="phase-progress">
        <div className={`phase-step ${currentPhase >= 1 ? 'active' : ''} ${currentPhase === 1 ? 'current' : ''}`}>
          <div className="phase-number">1</div>
          <div className="phase-label">Zvýraznění</div>
        </div>
        <div className="phase-connector"></div>
        <div className={`phase-step ${currentPhase >= 2 ? 'active' : ''} ${currentPhase === 2 ? 'current' : ''}`}>
          <div className="phase-number">2</div>
          <div className="phase-label">Štítky</div>
        </div>
        <div className="phase-connector"></div>
        <div className={`phase-step ${currentPhase >= 3 ? 'active' : ''} ${currentPhase === 3 ? 'current' : ''}`}>
          <div className="phase-number">3</div>
          <div className="phase-label">Poznámka</div>
        </div>
      </div>

      {/* Phase 1: Highlighting */}
      {currentPhase === 1 && (
        <div className="phase-content highlighting-phase">
          <div className="phase-instructions">
            <h3>Fáze 1: Zvýraznění klíčových částí</h3>
            <p>Vyber kategorii a klikni na věty, které chceš zvýraznit. Zvýrazni alespoň 3 věty.</p>
          </div>

          <div className="highlight-palette">
            {highlightCategories.map(category => (
              <button
                key={category.id}
                className={`highlight-category-btn ${selectedHighlightCategory === category.id ? 'selected' : ''}`}
                style={{
                  background: selectedHighlightCategory === category.id ? category.color : 'white',
                  borderColor: category.color
                }}
                onClick={() => setSelectedHighlightCategory(category.id)}
              >
                <strong>{category.label}</strong>
                <span className="category-desc">{category.description}</span>
              </button>
            ))}
          </div>

          <div className="article-text">
            {articleText.map(sentence => (
              <div
                key={sentence.id}
                className={`sentence ${highlights[sentence.id] ? 'highlighted' : ''}`}
                style={{
                  backgroundColor: highlights[sentence.id]
                    ? getHighlightColor(highlightCategories, highlights[sentence.id])
                    : 'transparent'
                }}
                onClick={() => {
                  if (highlights[sentence.id]) {
                    handleRemoveHighlight(sentence.id);
                  } else {
                    handleHighlightSentence(sentence.id);
                  }
                }}
              >
                {sentence.text}
                {highlights[sentence.id] && (
                  <span className="highlight-label">
                    {highlightCategories.find(c => c.id === highlights[sentence.id])?.label}
                  </span>
                )}
              </div>
            ))}
          </div>

          <div className="phase-actions">
            <div className="highlight-stats">
              Zvýrazněno: <strong>{Object.keys(highlights).length}</strong> vět
            </div>
            <button
              className="next-phase-btn"
              onClick={handleNextPhase}
              disabled={!hasMinimumHighlights(highlights, 3)}
              style={{ borderColor: facultyColor, color: facultyColor }}
            >
              Pokračovat na štítky →
            </button>
          </div>
        </div>
      )}

      {/* Phase 2: Tagging */}
      {currentPhase === 2 && (
        <div className="phase-content tagging-phase">
          <div className="phase-instructions">
            <h3>Fáze 2: Označení štítky</h3>
            <p>Klikni na zvýrazněnou větu a přiřaď jí relevantní štítky. Přiřaď alespoň 3 štítky celkem.</p>
          </div>

          <div className="article-text">
            {articleText.map(sentence => {
              const isHighlighted = highlights[sentence.id];
              const isSelected = selectedSentenceForTagging === sentence.id;

              return (
                <div
                  key={sentence.id}
                  className={`sentence ${isHighlighted ? 'highlighted' : 'not-highlighted'} ${isSelected ? 'selected' : ''}`}
                  style={{
                    backgroundColor: isHighlighted
                      ? getHighlightColor(highlightCategories, highlights[sentence.id])
                      : '#f3f4f6'
                  }}
                  onClick={() => {
                    if (isHighlighted) {
                      setSelectedSentenceForTagging(isSelected ? null : sentence.id);
                    }
                  }}
                >
                  {sentence.text}
                  {isHighlighted && (
                    <div className="sentence-tags">
                      {(tags[sentence.id] || []).map(tagId => {
                        const tag = availableTags.find(t => t.id === tagId);
                        return (
                          <span key={tagId} className="tag-badge">
                            {tag?.label}
                          </span>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {selectedSentenceForTagging && (
            <div className="tag-selector">
              <h4>Vyber štítky pro tuto větu:</h4>
              <div className="tag-options">
                {availableTags.map(tag => {
                  const isActive = (tags[selectedSentenceForTagging] || []).includes(tag.id);
                  return (
                    <button
                      key={tag.id}
                      className={`tag-option ${isActive ? 'active' : ''}`}
                      onClick={() => handleToggleTag(selectedSentenceForTagging, tag.id)}
                    >
                      {tag.label}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <div className="phase-actions">
            <button
              className="prev-phase-btn"
              onClick={handlePreviousPhase}
            >
              ← Zpět na zvýraznění
            </button>
            <div className="tag-stats">
              Celkem štítků: <strong>{Object.values(tags).reduce((sum, arr) => sum + arr.length, 0)}</strong>
            </div>
            <button
              className="next-phase-btn"
              onClick={handleNextPhase}
              disabled={!hasMinimumTags(tags, 3)}
              style={{ borderColor: facultyColor, color: facultyColor }}
            >
              Pokračovat na poznámku →
            </button>
          </div>
        </div>
      )}

      {/* Phase 3: Note Writing */}
      {currentPhase === 3 && (
        <div className="phase-content note-writing-phase">
          <div className="phase-instructions">
            <h3>Fáze 3: Syntéza poznámek</h3>
            <p>{noteSynthesisPrompt}</p>
          </div>

          <div className="annotation-summary">
            <h4>📋 Tvoje anotace:</h4>
            <div className="summary-highlights">
              {highlightCategories.map(category => {
                const categoryHighlights = Object.entries(highlights).filter(
                  ([_, cat]) => cat === category.id
                );

                if (categoryHighlights.length === 0) return null;

                return (
                  <div key={category.id} className="category-summary">
                    <div
                      className="category-badge"
                      style={{ backgroundColor: category.color }}
                    >
                      {category.label} ({categoryHighlights.length})
                    </div>
                    <div className="category-sentences">
                      {categoryHighlights.map(([sentId]) => {
                        const sentence = articleText.find(s => s.id === sentId);
                        const sentenceTags = tags[sentId] || [];

                        return (
                          <div key={sentId} className="summary-sentence">
                            {sentence.text}
                            {sentenceTags.length > 0 && (
                              <div className="sentence-tags-inline">
                                {sentenceTags.map(tagId => {
                                  const tag = availableTags.find(t => t.id === tagId);
                                  return (
                                    <span key={tagId} className="tag-badge-small">
                                      {tag?.label}
                                    </span>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="note-input-section">
            <h4>✍️ Napiš stručnou syntézu:</h4>
            <textarea
              className="note-textarea"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Začni psát svou syntézu..."
              maxLength={200}
              disabled={validated}
            />
            <div className="note-meta">
              <span className={noteLengthValidation.valid ? 'valid' : 'invalid'}>
                {noteLengthValidation.message}
              </span>
            </div>
          </div>

          <div className="phase-actions">
            <button
              className="prev-phase-btn"
              onClick={handlePreviousPhase}
              disabled={validated}
            >
              ← Zpět na štítky
            </button>
            {!validated && (
              <button
                className="validate-btn"
                onClick={handleValidate}
                disabled={!noteLengthValidation.valid}
                style={{ borderColor: facultyColor, color: facultyColor }}
              >
                Zkontrolovat poznámky
              </button>
            )}
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
            <h3>Výsledky poznámkování</h3>
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

Round2_NoteTaking.propTypes = {
  scenarioData: PropTypes.object.isRequired,
  onComplete: PropTypes.func.isRequired,
  facultyColor: PropTypes.string
};

Round2_NoteTaking.defaultProps = {
  facultyColor: "#0000dc"
};

export default Round2_NoteTaking;
