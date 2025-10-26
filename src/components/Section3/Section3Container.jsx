import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import TerminalWrapper from "../Section1/TerminalWrapper";
import ConceptMapping from "./Round3_ConceptMapping/ConceptMapping";
import LiteratureStructuring from "./Round4_LiteratureStructuring/LiteratureStructuring";
import round3Data from "../../data/section3/round3_conceptMapping.json";
import round4Data from "../../data/section3/round4_literatureStructuring.json";
import "../Section1/Section1Terminal.css";
import "./Section3Container.css";

/**
 * Section 3 Container: Výzkumné dovednosti (Research Skills)
 * Manages progression through 2 rounds:
 * - Round 3: Concept Mapping
 * - Round 4: Literature Structuring
 */
const Section3Container = ({ facultyId, facultyColor, onSectionComplete }) => {
  const [currentRound, setCurrentRound] = useState(3); // Start at Round 3
  const [roundResults, setRoundResults] = useState({
    round3: null,
    round4: null
  });
  const [totalScore, setTotalScore] = useState(0);

  // Get faculty-specific data
  const round3Scenario = round3Data.facultyVariants[facultyId] || round3Data.facultyVariants.ff;
  const round4Scenario = round4Data.facultyVariants[facultyId] || round4Data.facultyVariants.ff;

  const handleRound3Complete = useCallback((result) => {
    setRoundResults(prev => ({ ...prev, round3: result }));
    setTotalScore(prev => prev + result.score);
    setCurrentRound(4);
  }, []);

  const handleRound4Complete = useCallback((result) => {
    setRoundResults(prev => ({ ...prev, round4: result }));
    const finalScore = totalScore + result.score;
    setTotalScore(finalScore);
    setCurrentRound(5); // Show completion
  }, [totalScore]);

  const handleSectionComplete = useCallback(() => {
    if (onSectionComplete) {
      onSectionComplete({
        totalScore,
        roundResults,
        maxScore: 200 // 100 per round
      });
    }
  }, [onSectionComplete, totalScore, roundResults]);

  /**
   * RENDER ROUNDS
   */
  if (currentRound === 3) {
    return (
      <TerminalWrapper
        roundNumber={3}
        roundName="concept_mapping"
        facultyName={`Section 3 Round 3`}
      >
        <ConceptMapping
          scenarioData={round3Scenario}
          onComplete={handleRound3Complete}
          facultyColor={facultyColor}
        />
      </TerminalWrapper>
    );
  }

  if (currentRound === 4) {
    return (
      <TerminalWrapper
        roundNumber={4}
        roundName="literature_structuring"
        facultyName={`Section 3 Round 4`}
      >
        <LiteratureStructuring
          scenarioData={round4Scenario}
          onComplete={handleRound4Complete}
          facultyColor={facultyColor}
        />
      </TerminalWrapper>
    );
  }

  /**
   * COMPLETION SCREEN
   */
  if (currentRound === 5) {
    const averagePercentage = Math.round(
      (Object.values(roundResults).reduce((sum, r) => sum + (r?.percentage || 0), 0)) / 2
    );

    return (
      <TerminalWrapper
        roundNumber={5}
        roundName="section_complete"
        facultyName={`Section 3 Complete`}
      >
        <div className="section3-container section-completion">
          <div className="completion-header">
            <h2>🎓 Section 3 Dokončena!</h2>
            <h3>Výzkumné dovednosti</h3>
          </div>

          <div className="final-score">
            <div className="score-card">
              <div className="score-label">Celkové skóre</div>
              <div className="score-value">{totalScore} / 200</div>
              <div className="score-percentage">{Math.round((totalScore / 200) * 100)}%</div>
            </div>
          </div>

          <div className="rounds-summary">
            <h3>Přehled kol:</h3>
            <div className="summary-grid">
              <div className="summary-item">
                <span className="round-icon">🗺️</span>
                <div>
                  <strong>Round 3: Concept Mapping</strong>
                  <div className="round-score">
                    {roundResults.round3?.score || 0} / 100 ({roundResults.round3?.percentage || 0}%)
                  </div>
                </div>
              </div>
              <div className="summary-item">
                <span className="round-icon">📋</span>
                <div>
                  <strong>Round 4: Literature Structuring</strong>
                  <div className="round-score">
                    {roundResults.round4?.score || 0} / 100 ({roundResults.round4?.percentage || 0}%)
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="completion-message">
            <p>
              {averagePercentage >= 90
                ? "Vynikající! Máte pokročilé výzkumné dovednosti."
                : averagePercentage >= 70
                ? "Velmi dobře! Vaše výzkumné dovednosti jsou na dobré úrovni."
                : averagePercentage >= 50
                ? "Dobře! Základní výzkumné dovednosti zvládáte."
                : "Pokračujte v rozvoji výzkumných dovedností."}
            </p>
          </div>

          <div className="action-buttons">
            <button
              className="continue-btn"
              onClick={handleSectionComplete}
              style={{ backgroundColor: facultyColor }}
            >
              Pokračovat na další úkol →
            </button>
          </div>
        </div>
      </TerminalWrapper>
    );
  }

  return null;
};

Section3Container.propTypes = {
  facultyId: PropTypes.string.isRequired,
  facultyColor: PropTypes.string,
  onSectionComplete: PropTypes.func.isRequired
};

Section3Container.defaultProps = {
  facultyColor: "#0000dc"
};

export default Section3Container;
