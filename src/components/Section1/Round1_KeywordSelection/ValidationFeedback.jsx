import React from "react";
import PropTypes from "prop-types";

const ValidationFeedback = ({ selectedWords, isVisible }) => {
  if (!isVisible || selectedWords.length === 0) {
    return null;
  }

  return (
    <div className="validation-feedback">
      <div className="feedback-header">
        <h3 className="section-subtitle">📊 VYHODNOCENÍ VÝBĚRU</h3>
      </div>

      <div className="feedback-list">
        {selectedWords.map((word) => {
          const statusClass = word.isCorrect ? "correct" : "incorrect";
          const icon = word.isCorrect ? "✓" : "✗";
          const academicBadge = word.academicLevel === "high" ? "⭐" : "";

          return (
            <div key={word.id} className={`feedback-item ${statusClass}`}>
              <div className="feedback-item-header">
                <span className={`feedback-icon ${statusClass}`}>{icon}</span>
                <span className="feedback-word">{word.text}</span>
                {academicBadge && (
                  <span
                    className="academic-badge"
                    title="Vysoká akademická úroveň"
                  >
                    {academicBadge}
                  </span>
                )}
              </div>

              <div className="feedback-explanation">
                {word.feedback || word.explanation}
              </div>

              {word.academicLevel && (
                <div className="academic-level">
                  <span className="level-label">Úroveň:</span>
                  <span className={`level-value level-${word.academicLevel}`}>
                    {word.academicLevel === "high" && "Vysoká"}
                    {word.academicLevel === "medium" && "Střední"}
                    {word.academicLevel === "low" && "Nízká"}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <style jsx>{`
        .validation-feedback {
          margin-top: 2rem;
          background: rgba(0, 0, 220, 0.03);
          border: 2px solid #0000dc;
          border-radius: 8px;
          padding: 1.5rem;
        }

        .feedback-header {
          margin-bottom: 1.5rem;
        }

        .section-subtitle {
          font-size: 1.1rem;
          font-weight: bold;
          color: #0000dc;
          font-family: monospace;
          margin: 0;
        }

        .feedback-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .feedback-item {
          background: white;
          border-left: 4px solid;
          border-radius: 4px;
          padding: 1rem;
          transition: all 0.2s ease;
        }

        .feedback-item.correct {
          border-left-color: #22c55e;
          background: rgba(34, 197, 94, 0.05);
        }

        .feedback-item.incorrect {
          border-left-color: #ef4444;
          background: rgba(239, 68, 68, 0.05);
        }

        .feedback-item:hover {
          box-shadow: 0 2px 8px rgba(0, 0, 220, 0.1);
        }

        .feedback-item-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.75rem;
        }

        .feedback-icon {
          font-size: 1.5rem;
          font-weight: bold;
          min-width: 24px;
        }

        .feedback-icon.correct {
          color: #22c55e;
        }

        .feedback-icon.incorrect {
          color: #ef4444;
        }

        .feedback-word {
          font-size: 1.1rem;
          font-weight: bold;
          color: #0000dc;
        }

        .academic-badge {
          margin-left: auto;
          font-size: 1.2rem;
        }

        .feedback-explanation {
          color: #374151;
          line-height: 1.6;
          margin-bottom: 0.5rem;
        }

        .academic-level {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.85rem;
          margin-top: 0.5rem;
        }

        .level-label {
          color: #6b7280;
          font-weight: 500;
        }

        .level-value {
          padding: 0.25rem 0.75rem;
          border-radius: 12px;
          font-weight: bold;
          font-size: 0.75rem;
          text-transform: uppercase;
        }

        .level-high {
          background: rgba(34, 197, 94, 0.1);
          color: #16a34a;
          border: 1px solid #22c55e;
        }

        .level-medium {
          background: rgba(245, 158, 11, 0.1);
          color: #d97706;
          border: 1px solid #f59e0b;
        }

        .level-low {
          background: rgba(239, 68, 68, 0.1);
          color: #dc2626;
          border: 1px solid #ef4444;
        }

        @media (max-width: 768px) {
          .validation-feedback {
            padding: 1rem;
          }

          .feedback-item {
            padding: 0.75rem;
          }

          .feedback-word {
            font-size: 1rem;
          }

          .feedback-explanation {
            font-size: 0.9rem;
          }
        }
      `}</style>
    </div>
  );
};

ValidationFeedback.propTypes = {
  selectedWords: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
      isCorrect: PropTypes.bool.isRequired,
      academicLevel: PropTypes.string,
      feedback: PropTypes.string,
      explanation: PropTypes.string,
    })
  ).isRequired,
  isVisible: PropTypes.bool.isRequired,
};

export default React.memo(ValidationFeedback);
