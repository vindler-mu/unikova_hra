import React from "react";
import PropTypes from "prop-types";

const WordBank = ({ words, selectedWords, onWordClick, maxWords }) => {
  const isWordSelected = (wordId) => {
    return selectedWords.some((w) => w.id === wordId);
  };

  const isMaxReached = selectedWords.length >= maxWords;

  return (
    <div className="word-bank">
      <div className="word-bank-header">
        <h3 className="section-subtitle">💬 BANKA SLOV</h3>
        <p className="instruction-text">
          Klikni na slova, která považuješ za klíčová pro vyhledávání
        </p>
      </div>

      <div className="word-grid">
        {words.map((word) => {
          const selected = isWordSelected(word.id);
          const disabled = !selected && isMaxReached;

          return (
            <button
              key={word.id}
              className={`word-card ${selected ? "selected" : ""} ${
                disabled ? "disabled" : ""
              }`}
              onClick={() => !disabled && onWordClick(word)}
              disabled={disabled}
              aria-label={`Slovo: ${word.text}${
                selected ? ", vybráno" : ""
              }`}
            >
              <span className="word-text">{word.text}</span>
              {selected && <span className="check-icon">✓</span>}
            </button>
          );
        })}
      </div>

      <style jsx>{`
        .word-bank {
          margin-bottom: 2rem;
        }

        .word-bank-header {
          margin-bottom: 1rem;
        }

        .section-subtitle {
          font-size: 1.1rem;
          font-weight: bold;
          color: #0000dc;
          margin-bottom: 0.5rem;
          font-family: monospace;
        }

        .instruction-text {
          color: #6666dd;
          font-size: 0.9rem;
        }

        .word-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
          gap: 0.75rem;
        }

        .word-card {
          position: relative;
          padding: 0.75rem 1rem;
          background: white;
          border: 2px solid #0000dc;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.2s ease;
          font-family: inherit;
          font-size: 0.95rem;
          text-align: center;
          min-height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .word-card:hover:not(.disabled) {
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0, 0, 220, 0.2);
          border-color: #4d4dff;
        }

        .word-card.selected {
          background: rgba(0, 0, 220, 0.1);
          border-color: #0000dc;
          font-weight: bold;
        }

        .word-card.disabled {
          opacity: 0.4;
          cursor: not-allowed;
          background: #f5f5f5;
        }

        .word-text {
          flex: 1;
        }

        .check-icon {
          position: absolute;
          top: 4px;
          right: 8px;
          color: #22c55e;
          font-size: 1.2rem;
          font-weight: bold;
        }

        @media (max-width: 768px) {
          .word-grid {
            grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
            gap: 0.5rem;
          }

          .word-card {
            padding: 0.6rem 0.8rem;
            font-size: 0.85rem;
            min-height: 45px;
          }
        }
      `}</style>
    </div>
  );
};

WordBank.propTypes = {
  words: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
      isCorrect: PropTypes.bool.isRequired,
      academicLevel: PropTypes.string.isRequired,
      explanation: PropTypes.string.isRequired,
    })
  ).isRequired,
  selectedWords: PropTypes.array.isRequired,
  onWordClick: PropTypes.func.isRequired,
  maxWords: PropTypes.number.isRequired,
};

export default React.memo(WordBank);
