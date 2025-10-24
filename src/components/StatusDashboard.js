import React from "react";
import { Clock, Database, Hash, AlertTriangle } from "lucide-react";

const StatusDashboard = ({
  timeLeft,
  databaseIntegrity,
  collectedDigits,
  wrongAnswersCount,
  selectedFaculty,
  formatTime,
  GAME_TIME,
}) => {
  return (
    <div
      className="terminal-status-dashboard"
      style={{
        border: `1px solid ${selectedFaculty?.color || "#0000dc"}`,
        background: selectedFaculty?.color
          ? `${selectedFaculty.color}15`
          : "rgba(0, 0, 220, 0.08)",
      }}
    >
      <div className="status-row">
        <div className="status-module">
          <div className="module-header">
            <Clock size={16} className="status-icon" />
            <span className="module-label">[TIMER]</span>
          </div>
          <div className="module-value time-critical">
            {formatTime(timeLeft)}
          </div>
          <div className="module-bar">
            <div
              className="bar-fill time-fill"
              style={{
                width: `${(timeLeft / GAME_TIME) * 100}%`,
                background: (() => {
                  const timePercent = (timeLeft / GAME_TIME) * 100;
                  if (timePercent > 70) {
                    return "linear-gradient(90deg, #00ff00, #44ff44)"; // Zelená - dost času
                  } else if (timePercent > 30) {
                    return "linear-gradient(90deg, #ffaa00, #ffcc44)"; // Oranžová - střední čas
                  } else {
                    return "linear-gradient(90deg, #ff4444, #ff6666)"; // Červená - málo času
                  }
                })(),
              }}
            ></div>
          </div>
        </div>

        <div className="status-module">
          <div className="module-header">
            <Database size={16} className="status-icon" />
            <span className="module-label">[DATABASE]</span>
          </div>
          <div className="module-value db-status">{databaseIntegrity}%</div>
          <div className="module-bar">
            <div
              className="bar-fill db-fill"
              style={{
                width: `${databaseIntegrity}%`,
                background: (() => {
                  if (databaseIntegrity > 70) {
                    return "linear-gradient(90deg, #00ff00, #44ff44)"; // Zelená - zdravá databáze
                  } else if (databaseIntegrity > 30) {
                    return "linear-gradient(90deg, #ffaa00, #ffcc44)"; // Oranžová - poškozená databáze
                  } else {
                    return "linear-gradient(90deg, #ff4444, #ff6666)"; // Červená - kriticky poškozená
                  }
                })(),
              }}
            ></div>
          </div>
        </div>

        <div className="status-module">
          <div className="module-header">
            <AlertTriangle size={16} className="status-icon" />
            <span className="module-label">[ERRORS]</span>
          </div>
          <div className="module-value error-count">{wrongAnswersCount}</div>
        </div>

        <div className="status-module">
          <div className="module-header">
            <Hash size={16} className="status-icon" />
            <span className="module-label">[ACCESS_CODE]</span>
          </div>
          <div className="module-value digits-count">
            {collectedDigits.length}/4
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusDashboard;
