import React from "react";
import PropTypes from "prop-types";

const SelectionArea = ({ selectedWords, onRemove, maxWords, minWords }) => {
  const progress = (selectedWords.length / maxWords) * 100;
  const hasMinimum = selectedWords.length >= minWords;

  return (
    <div className="selection-area">
      <div className="selection-header">
        <h3 className="section-subtitle">✓ VYBRANÁ KLÍČOVÁ SLOVA</h3>
        <div className="selection-count">
          <span
            className={`count-number ${hasMinimum ? "valid" : "invalid"}`}
          >
            {selectedWords.length}
          </span>
          <span className="count-separator">/</span>
          <span className="count-max">{maxWords}</span>
        </div>
      </div>

      <div className="progress-container">
        <div className="progress-bar-track">
          <div
            className="progress-bar-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="progress-hint">
          {selectedWords.length === 0 && "Začni výběrem slov z banky"}
          {selectedWords.length > 0 && selectedWords.length < minWords &&
            `Vyber ještě alespoň ${minWords - selectedWords.length} ${
              minWords - selectedWords.length === 1 ? "slovo" : "slova"
            }`}
          {hasMinimum && selectedWords.length < maxWords && "Můžeš přidat další slova"}
          {selectedWords.length === maxWords && "Maximální počet dosažen"}
        </div>
      </div>

      <div className="selected-words-container">
        {selectedWords.length === 0 ? (
          <div className="empty-state">
            <span className="empty-icon">📝</span>
            <p>Žádná slova nebyla vybrána</p>
          </div>
        ) : (
          <div className="selected-words-list">
            {selectedWords.map((word, index) => (
              <div key={word.id} className="selected-word-chip">
                <span className="chip-number">{index + 1}.</span>
                <span className="chip-text">{word.text}</span>
                <button
                  className="chip-remove"
                  onClick={() => onRemove(word)}
                  aria-label={`Odstranit slovo ${word.text}`}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        .selection-area {
          background: rgba(0, 0, 220, 0.05);
          border: 2px solid #0000dc;
          border-radius: 8px;
          padding: 1.5rem;
          margin-bottom: 2rem;
        }

        .selection-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .section-subtitle {
          font-size: 1.1rem;
          font-weight: bold;
          color: #0000dc;
          font-family: monospace;
          margin: 0;
        }

        .selection-count {
          font-size: 1.3rem;
          font-weight: bold;
          font-family: monospace;
        }

        .count-number {
          color: #0000dc;
        }

        .count-number.valid {
          color: #22c55e;
        }

        .count-number.invalid {
          color: #ef4444;
        }

        .count-separator {
          color: #6666dd;
          margin: 0 0.25rem;
        }

        .count-max {
          color: #6666dd;
        }

        .progress-container {
          margin-bottom: 1.5rem;
        }

        .progress-bar-track {
          height: 8px;
          background: rgba(0, 0, 220, 0.1);
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: 0.5rem;
        }

        .progress-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, #0000dc, #4d4dff);
          transition: width 0.3s ease;
        }

        .progress-hint {
          font-size: 0.85rem;
          color: #6666dd;
          text-align: center;
          font-style: italic;
        }

        .selected-words-container {
          min-height: 80px;
        }

        .empty-state {
          text-align: center;
          padding: 2rem 1rem;
          color: #6666dd;
        }

        .empty-icon {
          font-size: 2rem;
          display: block;
          margin-bottom: 0.5rem;
        }

        .empty-state p {
          margin: 0;
          font-style: italic;
        }

        .selected-words-list {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
        }

        .selected-word-chip {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: white;
          border: 2px solid #0000dc;
          border-radius: 20px;
          padding: 0.5rem 1rem;
          font-size: 0.95rem;
          transition: all 0.2s ease;
        }

        .selected-word-chip:hover {
          box-shadow: 0 2px 8px rgba(0, 0, 220, 0.2);
        }

        .chip-number {
          font-weight: bold;
          color: #4d4dff;
          font-family: monospace;
        }

        .chip-text {
          color: #0000dc;
          font-weight: 500;
        }

        .chip-remove {
          background: none;
          border: none;
          color: #ef4444;
          font-size: 1.5rem;
          line-height: 1;
          cursor: pointer;
          padding: 0;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          transition: all 0.2s ease;
        }

        .chip-remove:hover {
          background: rgba(239, 68, 68, 0.1);
          transform: scale(1.1);
        }

        @media (max-width: 768px) {
          .selection-area {
            padding: 1rem;
          }

          .selection-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
          }

          .selected-words-list {
            gap: 0.5rem;
          }

          .selected-word-chip {
            font-size: 0.85rem;
            padding: 0.4rem 0.8rem;
          }
        }
      `}</style>
    </div>
  );
};

SelectionArea.propTypes = {
  selectedWords: PropTypes.array.isRequired,
  onRemove: PropTypes.func.isRequired,
  maxWords: PropTypes.number.isRequired,
  minWords: PropTypes.number.isRequired,
};

export default React.memo(SelectionArea);
