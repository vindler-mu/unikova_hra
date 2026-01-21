import React from "react";
import { AlertTriangle, FileText, BarChart, Users, Send } from "lucide-react";
import "./Section4Placeholder.css";

/**
 * Placeholder component for Section 4: Komunikace výsledků
 * Displays information about what will be implemented in this section
 */
const Section4Placeholder = ({ onComplete, playerName, selectedFaculty }) => {
  const handleSimulateComplete = () => {
    // Simuluje dokončení s průměrným skóre 350/400
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
    onComplete(3, mockResults); // taskIndex 3 = Task 4
  };

  return (
    <div className="section4-placeholder">
      <div className="placeholder-container">
        {/* Header */}
        <div className="placeholder-header">
          <AlertTriangle size={48} className="warning-icon" />
          <h1 className="placeholder-title">
            Task 4: Komunikace výsledků
          </h1>
          <p className="placeholder-subtitle">
            Tato sekce je momentálně ve vývoji
          </p>
        </div>

        {/* Description */}
        <div className="placeholder-content">
          <p className="placeholder-description">
            Ahoj <span className="highlight">{playerName}</span>! Pracujeme na
            implementaci finálního modulu, který bude obsahovat:
          </p>

          {/* Planned Rounds */}
          <div className="planned-rounds">
            <div className="round-item">
              <FileText size={24} className="round-icon" />
              <div className="round-info">
                <h3>Kolo 1: Psaní abstraktu</h3>
                <p>Strukturované psaní akademického abstraktu (4 sekce)</p>
              </div>
            </div>

            <div className="round-item">
              <BarChart size={24} className="round-icon" />
              <div className="round-info">
                <h3>Kolo 2: Vizualizace dat</h3>
                <p>Výběr správného typu grafu pro různá data</p>
              </div>
            </div>

            <div className="round-item">
              <Users size={24} className="round-icon" />
              <div className="round-info">
                <h3>Kolo 3: Peer Review</h3>
                <p>Kritické hodnocení vědecké práce</p>
              </div>
            </div>

            <div className="round-item">
              <Send size={24} className="round-icon" />
              <div className="round-info">
                <h3>Kolo 4: Publikační strategie</h3>
                <p>Výběr vhodného publikačního kanálu</p>
              </div>
            </div>
          </div>

          {/* Simulation Notice */}
          <div className="simulation-notice">
            <p>
              Prozatím můžete simulovat dokončení této sekce pro testovací
              účely. Získáte <strong>350 bodů ze 400</strong> a budete
              pokračovat k finálnímu kódu.
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
              Simulovat dokončení Task 4 (350 bodů)
            </span>
          </button>
        </div>

        {/* Footer */}
        <div className="placeholder-footer">
          <p className="footer-text">
            💡 Pokud jste vývojář, podívejte se do{" "}
            <code>CLAUDE.md</code> pro plán implementace Section 4.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Section4Placeholder;
