import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import TerminalWrapper from "./TerminalWrapper";
import KeywordSelection from "./Round1_KeywordSelection/KeywordSelection";
import BooleanQueryBuilder from "./Round2_BooleanOperators/BooleanQueryBuilder";
import DatabaseRanking from "./Round3_DatabaseSelection/DatabaseRanking";
import ResultsFilter from "./Round4_ResultsFilter/ResultsFilter";
import { getRound1Data } from "../../data/section1/round1_data";
import { getRound2Data } from "../../data/section1/round2_data";
import { getRound3Data } from "../../data/section1/round3_data";
import { getRound4Data } from "../../data/section1/round4_data";
import "./Section1Terminal.css";

/**
 * Container component for Section 1: Academic Information Search
 * Manages progression through 4 rounds:
 * 1. Keyword Selection
 * 2. Boolean Operators (TODO)
 * 3. Database Selection (TODO)
 * 4. Results Filter (TODO)
 */
const Section1Container = ({ facultyId, facultyColor, onSectionComplete }) => {
  const [currentRound, setCurrentRound] = useState(1);
  const [roundResults, setRoundResults] = useState({
    round1: null,
    round2: null,
    round3: null,
    round4: null,
  });
  const [totalScore, setTotalScore] = useState(0);

  // Handle completion of Round 1
  const handleRound1Complete = useCallback(
    (data) => {
      setRoundResults((prev) => ({
        ...prev,
        round1: data,
      }));
      setTotalScore((prev) => prev + data.score);

      // Move to Round 2
      setCurrentRound(2);
    },
    []
  );

  // Handle completion of Round 2
  const handleRound2Complete = useCallback((data) => {
    setRoundResults((prev) => ({
      ...prev,
      round2: data,
    }));
    setTotalScore((prev) => prev + data.score);
    // Move to Round 3
    setCurrentRound(3);
  }, []);

  // Handle completion of Round 3
  const handleRound3Complete = useCallback((data) => {
    setRoundResults((prev) => ({
      ...prev,
      round3: data,
    }));
    setTotalScore((prev) => prev + data.score);
    // Move to Round 4
    setCurrentRound(4);
  }, []);

  // Handle completion of Round 4
  const handleRound4Complete = useCallback((data) => {
    setRoundResults((prev) => ({
      ...prev,
      round4: data,
    }));
    setTotalScore((prev) => prev + data.score);
    setCurrentRound(5);
  }, []);

  // Handle final completion of entire section
  const handleFinalComplete = useCallback(() => {
    if (onSectionComplete) {
      onSectionComplete({
        totalScore,
        maxScore: 400, // 100 points per round
        percentage: Math.round((totalScore / 400) * 100),
        roundResults,
      });
    }
  }, [totalScore, roundResults, onSectionComplete]);

  return (
    <div className="section1-container">
      {/* Progress Indicator */}
      <div className="section-progress">
        <div className="progress-header">
          <h2 className="progress-title">ODDÍL 1: AKADEMICKÉ VYHLEDÁVÁNÍ</h2>
          <div className="progress-rounds">
            Kolo {currentRound} / 4
          </div>
        </div>
        <div className="progress-bar-container">
          <div
            className="progress-bar-fill"
            style={{ width: `${((currentRound - 1) / 4) * 100}%` }}
          />
        </div>
        <div className="progress-labels">
          <span className={currentRound >= 1 ? "active" : ""}>
            1. Klíčová slova
          </span>
          <span className={currentRound >= 2 ? "active" : ""}>
            2. Operátory
          </span>
          <span className={currentRound >= 3 ? "active" : ""}>
            3. Databáze
          </span>
          <span className={currentRound >= 4 ? "active" : ""}>
            4. Filtrace
          </span>
        </div>
      </div>

      {/* Round 1: Keyword Selection */}
      {currentRound === 1 && (
        <TerminalWrapper
          roundNumber={1}
          roundName="keywords"
          facultyName={facultyId?.toUpperCase()}
        >
          <KeywordSelection
            scenarioData={getRound1Data(facultyId)}
            onComplete={handleRound1Complete}
            facultyColor={facultyColor}
          />
        </TerminalWrapper>
      )}

      {/* Round 2: Boolean Operators */}
      {currentRound === 2 && (
        <TerminalWrapper
          roundNumber={2}
          roundName="boolean"
          facultyName={facultyId?.toUpperCase()}
        >
          <BooleanQueryBuilder
            scenarioData={getRound2Data(facultyId)}
            onComplete={handleRound2Complete}
            facultyColor={facultyColor}
          />
        </TerminalWrapper>
      )}

      {/* Round 3: Database Selection */}
      {currentRound === 3 && (
        <TerminalWrapper
          roundNumber={3}
          roundName="databases"
          facultyName={facultyId?.toUpperCase()}
        >
          <DatabaseRanking
            scenarioData={getRound3Data(facultyId)}
            onComplete={handleRound3Complete}
            facultyColor={facultyColor}
          />
        </TerminalWrapper>
      )}

      {/* Round 4: Results Filter */}
      {currentRound === 4 && (
        <TerminalWrapper
          roundNumber={4}
          roundName="filter"
          facultyName={facultyId?.toUpperCase()}
        >
          <ResultsFilter
            scenarioData={getRound4Data(facultyId)}
            onComplete={handleRound4Complete}
            facultyColor={facultyColor}
          />
        </TerminalWrapper>
      )}

      {/* Completion Screen */}
      {currentRound === 5 && (
        <TerminalWrapper
          roundNumber={5}
          roundName="complete"
          facultyName={facultyId?.toUpperCase()}
        >
          <div className="completion-screen">
            <div className="completion-card">
              <h2 className="completion-title">🎯 ODDÍL 1 DOKONČEN!</h2>
              <div className="completion-score">
                <div className="score-display">
                  <span className="score-number">{totalScore}</span>
                  <span className="score-max">/ 400</span>
                </div>
                <div className="score-percentage">
                  {Math.round((totalScore / 400) * 100)}%
                </div>
              </div>
              <div className="completion-message">
                Výborně! Dokončil jsi první oddíl akademického vyhledávání.
              </div>
              <button className="continue-button" onClick={handleFinalComplete}>
                Pokračovat → Debriefing
              </button>
            </div>
          </div>
        </TerminalWrapper>
      )}

      <style jsx>{`
        .section1-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #f8f9ff 0%, #e8e9ff 100%);
          padding: 2rem 1rem;
        }

        .section-progress {
          max-width: 1000px;
          margin: 0 auto 2rem;
          background: white;
          border: 2px solid #0000dc;
          border-radius: 8px;
          padding: 1.5rem;
        }

        .progress-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .progress-title {
          font-size: 1.3rem;
          font-weight: bold;
          color: #0000dc;
          margin: 0;
          font-family: monospace;
        }

        .progress-rounds {
          background: rgba(0, 0, 220, 0.1);
          padding: 0.4rem 1rem;
          border-radius: 20px;
          font-weight: bold;
          color: #0000dc;
          font-family: monospace;
        }

        .progress-bar-container {
          height: 8px;
          background: rgba(0, 0, 220, 0.1);
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: 1rem;
        }

        .progress-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, #0000dc, #4d4dff);
          transition: width 0.5s ease;
        }

        .progress-labels {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0.5rem;
          font-size: 0.85rem;
        }

        .progress-labels span {
          text-align: center;
          color: #9ca3af;
          transition: color 0.3s ease;
        }

        .progress-labels span.active {
          color: #0000dc;
          font-weight: bold;
        }

        .placeholder-round {
          max-width: 600px;
          margin: 4rem auto;
          text-align: center;
          padding: 3rem;
          background: white;
          border: 2px dashed #9ca3af;
          border-radius: 8px;
        }

        .placeholder-round h3 {
          color: #0000dc;
          margin-bottom: 1rem;
        }

        .placeholder-round p {
          color: #6b7280;
          margin-bottom: 2rem;
        }

        .skip-button {
          background: #6b7280;
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 6px;
          cursor: pointer;
          font-family: inherit;
        }

        .skip-button:hover {
          background: #4b5563;
        }

        .completion-screen {
          max-width: 800px;
          margin: 4rem auto;
        }

        .completion-card {
          background: white;
          border: 3px solid #22c55e;
          border-radius: 12px;
          padding: 3rem;
          text-align: center;
        }

        .completion-title {
          font-size: 2rem;
          font-weight: bold;
          color: #0000dc;
          margin-bottom: 2rem;
        }

        .completion-score {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 2rem;
          margin-bottom: 2rem;
          padding: 2rem;
          background: rgba(34, 197, 94, 0.05);
          border-radius: 8px;
        }

        .score-display {
          font-size: 3rem;
          font-weight: bold;
          color: #0000dc;
          font-family: monospace;
        }

        .score-max {
          font-size: 1.5rem;
          color: #6b7280;
        }

        .score-percentage {
          font-size: 2.5rem;
          font-weight: bold;
          color: #22c55e;
          font-family: monospace;
        }

        .completion-message {
          font-size: 1.2rem;
          color: #374151;
          margin-bottom: 2rem;
        }

        .continue-button {
          background: #22c55e;
          color: white;
          border: none;
          padding: 1rem 2rem;
          font-size: 1.1rem;
          font-weight: bold;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
          font-family: inherit;
        }

        .continue-button:hover {
          background: #16a34a;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(34, 197, 94, 0.3);
        }

        @media (max-width: 768px) {
          .section1-container {
            padding: 1rem 0.5rem;
          }

          .section-progress {
            padding: 1rem;
          }

          .progress-title {
            font-size: 1rem;
          }

          .progress-labels {
            font-size: 0.75rem;
          }

          .completion-card {
            padding: 2rem 1rem;
          }

          .completion-title {
            font-size: 1.5rem;
          }

          .completion-score {
            flex-direction: column;
            gap: 1rem;
          }

          .score-display {
            font-size: 2rem;
          }

          .score-percentage {
            font-size: 2rem;
          }
        }
      `}</style>
    </div>
  );
};

Section1Container.propTypes = {
  facultyId: PropTypes.string.isRequired,
  facultyColor: PropTypes.string,
  onSectionComplete: PropTypes.func.isRequired,
};

export default Section1Container;
