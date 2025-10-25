import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import TerminalWrapper from "../Section1/TerminalWrapper";
import CredibilityAssessment from "./Round1_CredibilityAssessment/CredibilityAssessment";
import QualityEvaluation from "./Round2_QualityEvaluation/QualityEvaluation";
import RelevanceJudgment from "./Round3_RelevanceJudgment/RelevanceJudgment";
import FakeNewsDetector from "./Round4_FakeNewsDetector/FakeNewsDetector";
import { getScenarioByFaculty, getFacultyMetadata } from "../../data/section2/section2_data";
import "../Section1/Section1Terminal.css";
import "./Section2Container.css";

/**
 * Section 2 Container: Hodnocení informací (Information Evaluation)
 * Manages progression through 4 rounds:
 * - Round 1: Credibility Assessment
 * - Round 2: Quality Evaluation
 * - Round 3: Relevance Judgment
 * - Round 4: Fake News Detector
 */
const Section2Container = ({ facultyId, facultyColor, onSectionComplete }) => {
  const [currentRound, setCurrentRound] = useState(1);
  const [roundResults, setRoundResults] = useState({
    round1: null,
    round2: null,
    round3: null,
    round4: null
  });
  const [totalScore, setTotalScore] = useState(0);

  // Get faculty-specific scenario
  const scenario = getScenarioByFaculty(facultyId);
  const faculty = getFacultyMetadata(facultyId);

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
        maxScore: 400 // 100 per round
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
        roundName="credibility_assessment"
        facultyName={faculty.name}
      >
        <CredibilityAssessment
          scenarioData={scenario}
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
        roundName="quality_evaluation"
        facultyName={faculty.name}
      >
        <QualityEvaluation
          scenarioData={scenario}
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
        roundName="relevance_judgment"
        facultyName={faculty.name}
      >
        <RelevanceJudgment
          scenarioData={scenario}
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
        roundName="fake_news_detector"
        facultyName={faculty.name}
      >
        <FakeNewsDetector
          scenarioData={scenario}
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
        facultyName={faculty.name}
      >
        <div className="section2-container section-completion">
          <div className="completion-header">
            <h2>🎉 Sekce 2 Dokončena!</h2>
            <h3>Hodnocení informací</h3>
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
                <span className="round-icon">🔍</span>
                <div>
                  <strong>Round 1: Hodnocění věrohodnosti</strong>
                  <div className="round-score">
                    {roundResults.round1?.score || 0} / 100 ({roundResults.round1?.percentage || 0}%)
                  </div>
                </div>
              </div>
              <div className="summary-item">
                <span className="round-icon">🎯</span>
                <div>
                  <strong>Round 2: Hodnocení kvality</strong>
                  <div className="round-score">
                    {roundResults.round2?.score || 0} / 100 ({roundResults.round2?.percentage || 0}%)
                  </div>
                </div>
              </div>
              <div className="summary-item">
                <span className="round-icon">📊</span>
                <div>
                  <strong>Round 3: Posouzení relevance</strong>
                  <div className="round-score">
                    {roundResults.round3?.score || 0} / 100 ({roundResults.round3?.percentage || 0}%)
                  </div>
                </div>
              </div>
              <div className="summary-item">
                <span className="round-icon">🛡️</span>
                <div>
                  <strong>Round 4: Detekce fake news</strong>
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
                ? "Vynikající! Máte perfektní schopnost hodnotit kvalitu a věrohodnost informačních zdrojů."
                : averagePercentage >= 70
                ? "Velmi dobře! Vaše dovednosti v hodnocení informací jsou na vysoké úrovni."
                : averagePercentage >= 50
                ? "Dobře! Základy hodnocení informací zvládáte, ale je prostor pro zlepšení."
                : "Pokračujte v rozvoji kritického myšlení a hodnocení zdrojů."}
            </p>
          </div>

          <div className="action-buttons">
            <button
              className="continue-btn"
              onClick={handleSectionComplete}
              style={{ backgroundColor: facultyColor }}
            >
              Pokračovat na další sekci →
            </button>
          </div>
        </div>
      </TerminalWrapper>
    );
  }

  return null;
};

Section2Container.propTypes = {
  facultyId: PropTypes.string.isRequired,
  facultyColor: PropTypes.string,
  onSectionComplete: PropTypes.func.isRequired
};

Section2Container.defaultProps = {
  facultyColor: "#0000dc"
};

export default Section2Container;
