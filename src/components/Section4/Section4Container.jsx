import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import TerminalWrapper from "../Section1/TerminalWrapper";
import Round1_AbstractSentences from "./Round1_AbstractSentences/Round1_AbstractSentences";
import Round2_ChartMatching from "./Round2_ChartMatching/Round2_ChartMatching";
import Round3_PeerReview from "./Round3_PeerReview/Round3_PeerReview";
import Round4_PublicationStrategy from "./Round4_PublicationStrategy/Round4_PublicationStrategy";
import round1Data from "../../data/section4/round1_abstractSentences.json";
import round2Data from "../../data/section4/round2_chartMatching.json";
import round3Data from "../../data/section4/round3_peerReview.json";
import round4Data from "../../data/section4/round4_publicationStrategy.json";
import "../Section1/Section1Terminal.css";
import "./Section4Container.css";

/**
 * Section 4 Container: Komunikace výsledků (Communication of Results)
 * Manages progression through 4 rounds:
 * - Round 1: Abstract Sentences (Drag & Sort)
 * - Round 2: Chart Matching (Data Visualization)
 * - Round 3: Peer Review (Spot the Issues)
 * - Round 4: Publication Strategy (Matching)
 */
const Section4Container = ({ facultyId, facultyColor, onSectionComplete }) => {
  const [currentRound, setCurrentRound] = useState(1); // Start at Round 1
  const [roundResults, setRoundResults] = useState({
    round1: null,
    round2: null,
    round3: null,
    round4: null,
  });
  const [totalScore, setTotalScore] = useState(0);

  // Get faculty-specific data
  const round1Scenario =
    round1Data.facultyVariants[facultyId] || round1Data.facultyVariants.ff;
  const round2Scenario =
    round2Data.facultyVariants[facultyId] || round2Data.facultyVariants.ff;
  const round3Scenario =
    round3Data.facultyVariants[facultyId] || round3Data.facultyVariants.ff;
  const round4Scenario =
    round4Data.facultyVariants[facultyId] || round4Data.facultyVariants.ff;

  const handleRound1Complete = useCallback((result) => {
    setRoundResults((prev) => ({ ...prev, round1: result }));
    setTotalScore((prev) => prev + result.score);
    setCurrentRound(2);
  }, []);

  const handleRound2Complete = useCallback((result) => {
    setRoundResults((prev) => ({ ...prev, round2: result }));
    setTotalScore((prev) => prev + result.score);
    setCurrentRound(3);
  }, []);

  const handleRound3Complete = useCallback((result) => {
    setRoundResults((prev) => ({ ...prev, round3: result }));
    setTotalScore((prev) => prev + result.score);
    setCurrentRound(4);
  }, []);

  const handleRound4Complete = useCallback(
    (result) => {
      setRoundResults((prev) => ({ ...prev, round4: result }));
      const finalScore = totalScore + result.score;
      setTotalScore(finalScore);
      setCurrentRound(5); // Show completion
    },
    [totalScore]
  );

  const handleSectionComplete = useCallback(() => {
    if (onSectionComplete) {
      onSectionComplete({
        totalScore,
        roundResults,
        maxScore: 400, // 100 per round × 4 rounds
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
        roundName="abstract_sentences"
        facultyName={`Section 4 Round 1`}
      >
        <Round1_AbstractSentences
          data={round1Scenario}
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
        roundName="chart_matching"
        facultyName={`Section 4 Round 2`}
      >
        <Round2_ChartMatching
          data={round2Scenario}
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
        roundName="peer_review"
        facultyName={`Section 4 Round 3`}
      >
        <Round3_PeerReview
          data={round3Scenario}
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
        roundName="publication_strategy"
        facultyName={`Section 4 Round 4`}
      >
        <Round4_PublicationStrategy
          data={round4Scenario}
          onComplete={handleRound4Complete}
          facultyColor={facultyColor}
        />
      </TerminalWrapper>
    );
  }

  // currentRound === 5: Section Complete
  if (currentRound === 5) {
    return (
      <div className="section4-complete">
        <div className="completion-wrapper">
          <div
            className="completion-header"
            style={{ borderColor: facultyColor || "#0000dc" }}
          >
            <h2 style={{ color: facultyColor || "#0000dc" }}>
              ✓ Sekce 4 dokončena!
            </h2>
            <p>Komunikace výsledků</p>
          </div>

          <div className="final-summary">
            <h3 style={{ color: facultyColor || "#0000dc" }}>
              Celkové skóre sekce
            </h3>
            <div className="score-display-large">
              <span className="score-number" style={{ color: facultyColor || "#0000dc" }}>
                {totalScore}
              </span>
              <span className="score-separator">/</span>
              <span className="score-max">400</span>
              <span className="score-percentage">
                ({Math.round((totalScore / 400) * 100)}%)
              </span>
            </div>

            <div className="rounds-breakdown">
              {roundResults.round1 && (
                <div className="round-score-item">
                  <span className="round-label">Round 1: Abstract Sentences</span>
                  <span className="round-score">
                    {roundResults.round1.score} / {roundResults.round1.maxScore}
                  </span>
                </div>
              )}
              {roundResults.round2 && (
                <div className="round-score-item">
                  <span className="round-label">Round 2: Chart Matching</span>
                  <span className="round-score">
                    {roundResults.round2.score} / {roundResults.round2.maxScore}
                  </span>
                </div>
              )}
              {roundResults.round3 && (
                <div className="round-score-item">
                  <span className="round-label">Round 3: Peer Review</span>
                  <span className="round-score">
                    {roundResults.round3.score} / {roundResults.round3.maxScore}
                  </span>
                </div>
              )}
              {roundResults.round4 && (
                <div className="round-score-item">
                  <span className="round-label">Round 4: Publication Strategy</span>
                  <span className="round-score">
                    {roundResults.round4.score} / {roundResults.round4.maxScore}
                  </span>
                </div>
              )}
            </div>
          </div>

          <button
            className="complete-section-btn"
            onClick={handleSectionComplete}
            style={{ backgroundColor: facultyColor || "#0000dc" }}
          >
            Dokončit sekci →
          </button>
        </div>
      </div>
    );
  }

  return null;
};

Section4Container.propTypes = {
  facultyId: PropTypes.string.isRequired,
  facultyColor: PropTypes.string,
  onSectionComplete: PropTypes.func.isRequired,
};

Section4Container.defaultProps = {
  facultyColor: "#0000dc",
};

export default Section4Container;
