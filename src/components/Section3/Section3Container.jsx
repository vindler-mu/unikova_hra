import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import TerminalWrapper from "../Section1/TerminalWrapper";
import Round1_CitationManagement from "./Round1_CitationManagement/Round1_CitationManagement";
import Round2_NoteTaking from "./Round2_NoteTaking/Round2_NoteTaking";
import ConceptMapping from "./Round3_ConceptMapping/ConceptMapping";
import LiteratureStructuring from "./Round4_LiteratureStructuring/LiteratureStructuring";
import round1Data from "../../data/section3/round1_citationManagement.json";
import round2Data from "../../data/section3/round2_noteTaking.json";
import round3Data from "../../data/section3/round3_conceptMapping.json";
import round4Data from "../../data/section3/round4_literatureStructuring.json";
import "../Section1/Section1Terminal.css";
import "./Section3Container.css";

/**
 * Section 3 Container: Organizace informací (Information Organization)
 * Manages progression through 4 rounds:
 * - Round 1: Citation Management
 * - Round 2: Note-taking & Annotation
 * - Round 3: Concept Mapping
 * - Round 4: Literature Structuring
 */
const Section3Container = ({ facultyId, facultyColor, onSectionComplete }) => {
  const [currentRound, setCurrentRound] = useState(1); // Start at Round 1
  const [roundResults, setRoundResults] = useState({
    round1: null,
    round2: null,
    round3: null,
    round4: null
  });
  const [totalScore, setTotalScore] = useState(0);

  // Get faculty-specific data
  const round1Scenario = round1Data.facultyVariants[facultyId] || round1Data.facultyVariants.ff;
  const round2Scenario = round2Data.facultyVariants[facultyId] || round2Data.facultyVariants.ff;
  const round3Scenario = round3Data.facultyVariants[facultyId] || round3Data.facultyVariants.ff;
  const round4Scenario = round4Data.facultyVariants[facultyId] || round4Data.facultyVariants.ff;

  const handleRound1Complete = useCallback((result) => {
    setRoundResults(prev => ({ ...prev, round1: result }));
    setTotalScore(prev => prev + result.score);
    setCurrentRound(2);
  }, []);

  const handleRound2Complete = useCallback((result) => {
    setRoundResults(prev => ({ ...prev, round2: result }));
    setTotalScore(prev => prev + result.score);
    setCurrentRound(3);
  }, []);

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
        maxScore: 400 // 100 per round × 4 rounds
      });
    }
  }, [onSectionComplete, totalScore, roundResults]);

  /**
   * RENDER ROUNDS
   */
  if (currentRound === 1) {
    return (
      <TerminalWrapper
        roundNumber={1}
        roundName="citation_management"
        facultyName={`Section 3 Round 1`}
      >
        <Round1_CitationManagement
          scenarioData={round1Scenario}
          onComplete={handleRound1Complete}
          facultyColor={facultyColor}
        />
      </TerminalWrapper>
    );
  }

  if (currentRound === 2) {
    return (
      <TerminalWrapper
        roundNumber={2}
        roundName="note_taking"
        facultyName={`Section 3 Round 2`}
      >
        <Round2_NoteTaking
          scenarioData={round2Scenario}
          onComplete={handleRound2Complete}
          facultyColor={facultyColor}
        />
      </TerminalWrapper>
    );
  }

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
      (Object.values(roundResults).reduce((sum, r) => sum + (r?.percentage || 0), 0)) / 4
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
            <h3>Organizace informací</h3>
          </div>

          <div className="final-score">
            <div className="score-card">
              <div className="score-label">Celkové skóre</div>
              <div className="score-value">{totalScore} / 400</div>
              <div className="score-percentage">{Math.round((totalScore / 400) * 100)}%</div>
            </div>
          </div>

          <div className="rounds-summary">
            <h3>Přehled kol:</h3>
            <div className="summary-grid">
              <div className="summary-item">
                <span className="round-icon">📚</span>
                <div>
                  <strong>Round 1: Správa citací</strong>
                  <div className="round-score">
                    {roundResults.round1?.score || 0} / 100 ({roundResults.round1?.percentage || 0}%)
                  </div>
                </div>
              </div>
              <div className="summary-item">
                <span className="round-icon">📝</span>
                <div>
                  <strong>Round 2: Poznámkování</strong>
                  <div className="round-score">
                    {roundResults.round2?.score || 0} / 100 ({roundResults.round2?.percentage || 0}%)
                  </div>
                </div>
              </div>
              <div className="summary-item">
                <span className="round-icon">🗺️</span>
                <div>
                  <strong>Round 3: Konceptuální mapa</strong>
                  <div className="round-score">
                    {roundResults.round3?.score || 0} / 100 ({roundResults.round3?.percentage || 0}%)
                  </div>
                </div>
              </div>
              <div className="summary-item">
                <span className="round-icon">📋</span>
                <div>
                  <strong>Round 4: Struktura literatury</strong>
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
                ? "Vynikající! Ovládáte pokročilé metody organizace informací."
                : averagePercentage >= 70
                ? "Velmi dobře! Vaše dovednosti v organizaci informací jsou na dobré úrovni."
                : averagePercentage >= 50
                ? "Dobře! Základy organizace informací zvládáte."
                : "Pokračujte v rozvoji dovedností v organizaci informací."}
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
