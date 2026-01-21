import React from "react";
import { CheckCircle, AlertCircle } from "lucide-react";
import "./SectionPlaceholder.css";

/**
 * Universal placeholder component for Sections 1-3
 * Shows information and allows simulation of completion
 */
const SectionPlaceholder = ({
  taskIndex,
  taskTitle,
  taskDescription,
  rounds,
  onComplete,
  playerName,
  selectedFaculty,
}) => {
  const handleSimulateComplete = () => {
    // Simuluje dokončení s průměrným skóre
    const mockResults = {
      totalScore: 350,
      maxScore: 400,
      roundResults: {
        round1: { score: 85, percentage: 85 },
        round2: { score: 90, percentage: 90 },
        round3: { score: 80, percentage: 80 },
        round4: { score: 95, percentage: 95 },
      },
    };
    onComplete(taskIndex, mockResults);
  };

  return (
    <div className="section-placeholder">
      <div className="placeholder-container">
        {/* Header */}
        <div className="placeholder-header">
          <AlertCircle size={48} className="info-icon" />
          <h1 className="placeholder-title">{taskTitle}</h1>
          <p className="placeholder-subtitle">{taskDescription}</p>
        </div>

        {/* Content */}
        <div className="placeholder-content">
          <p className="placeholder-description">
            Ahoj <span className="highlight">{playerName}</span>! Tato sekce
            obsahuje následující kola:
          </p>

          {/* Rounds */}
          <div className="rounds-list">
            {rounds.map((round, index) => (
              <div key={index} className="round-item">
                <CheckCircle size={20} className="round-icon" />
                <div className="round-info">
                  <h3>Kolo {index + 1}: {round.title}</h3>
                  <p>{round.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Simulation Notice */}
          <div className="simulation-notice">
            <p>
              Pro testování můžete simulovat dokončení této sekce. Získáte{" "}
              <strong>350 bodů ze 400</strong> a budete pokračovat dál.
            </p>
          </div>

          {/* Action Button */}
          <button
            className="simulate-button"
            onClick={handleSimulateComplete}
            style={{
              borderColor: selectedFaculty?.color || "#0000dc",
              color: selectedFaculty?.color || "#0000dc",
            }}
          >
            <span className="button-text">
              Simulovat dokončení (350/400 bodů)
            </span>
          </button>
        </div>

        {/* Footer */}
        <div className="placeholder-footer">
          <p className="footer-text">
            💡 Tato sekce je připravena k implementaci. Viz <code>CLAUDE.md</code>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SectionPlaceholder;
