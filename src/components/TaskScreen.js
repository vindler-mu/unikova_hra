import React from "react";

const TaskScreen = ({
  currentTask,
  tasks,
  taskStates,
  timeLeft,
  databaseIntegrity,
  wrongAnswersCount,
  collectedDigits,
  playerName,
  selectedFaculty,
  showHint,
  setShowHint,
  formatTime,
  getDamageLevel,
  handleAnswer,
  handleTaskSelect,
  onShowFinalCode,
  COLLECTED_DIGITS,
}) => {
  const currentTaskData = tasks[currentTask];
  const currentTaskState = taskStates[`task${currentTask + 1}`];
  const currentSubtask =
    currentTaskData.subtasks[currentTaskState.currentSubtask];

  return (
    <div className="terminal-container">
      {/* Matrix background */}
      <div className="matrix-background">
        <div className="matrix-rain">
          {Array(50)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="loading-dots">
                {Math.random().toString(2).repeat(150)}
              </div>
            ))}
        </div>
      </div>

      <div
        style={{
          position: "relative",
          zIndex: 10,
          padding: "16px 32px",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {/* Terminal header */}
        <div className="terminal-header">
          <div className="terminal-button close"></div>
          <div className="terminal-button minimize"></div>
          <div className="terminal-button maximize"></div>
          <span className="terminal-prompt">
            muni-agent@emergency:/active_mission$
          </span>
        </div>

        {/* Terminal content */}
        <div className="terminal-content">
          {/* Status bar */}
          <div className="status-bar" style={{ marginBottom: "24px" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "16px",
              }}
            >
              <div className="status-item">
                <div className="status-value">{formatTime(timeLeft)}</div>
                <div className="status-label">ZBÝVAJÍCÍ ČAS</div>
                <div
                  className={`status-indicator ${
                    timeLeft <= 300 ? "status-critical" : "status-success"
                  }`}
                >
                  {timeLeft <= 300 ? "⚠️ KRITICKÝ" : "✓ STABILNÍ"}
                </div>
              </div>

              <div className="status-item">
                <div className="status-value" style={{ color: "#4444ff" }}>
                  {databaseIntegrity}%
                </div>
                <div className="status-label">INTEGRITA DB</div>
                <div
                  className={`status-indicator ${
                    databaseIntegrity < 50
                      ? "status-critical"
                      : "status-success"
                  }`}
                >
                  {getDamageLevel().toUpperCase()}
                </div>
              </div>

              <div className="status-item">
                <div className="status-value status-critical">
                  {wrongAnswersCount}
                </div>
                <div className="status-label">CHYBY</div>
                <div className="status-indicator status-critical">
                  {wrongAnswersCount === 0 ? "PERFEKTNÍ" : "POŠKOZENÍ"}
                </div>
              </div>
            </div>
          </div>

          {/* Current Task Display */}
          <div className="question-card">
            {/* Task Header */}
            <div style={{ marginBottom: "16px" }}>
              <h2 className="question-title">{currentTaskData.title}</h2>
              <p className="question-text" style={{ marginBottom: "8px" }}>
                {currentTaskData.description}
              </p>
              <div
                style={{
                  fontSize: "0.875rem",
                  color: "#6666dd",
                  fontWeight: "500",
                }}
              >
                Podúkol {currentTaskState.currentSubtask + 1} z{" "}
                {currentTaskData.subtasks.length}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{
                  width: `${
                    (currentTaskState.currentSubtask /
                      currentTaskData.subtasks.length) *
                    100
                  }%`,
                }}
              ></div>
            </div>

            {/* Current Question */}
            <div style={{ marginTop: "24px" }}>
              <h3 className="question-title">{currentSubtask.title}</h3>
              <p className="question-text">{currentSubtask.question}</p>

              {/* Answer Options */}
              <div className="answer-options">
                {currentSubtask.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() =>
                      handleAnswer(
                        currentTask,
                        currentTaskState.currentSubtask,
                        index === currentSubtask.correct
                      )
                    }
                    className="answer-button"
                  >
                    <span className="answer-prefix">
                      [{String.fromCharCode(65 + index)}]
                    </span>
                    <span>{option}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Hint Section */}
            {currentSubtask.hint && (
              <div className="hint-section">
                <button
                  onClick={() => setShowHint(!showHint)}
                  className="hint-toggle"
                >
                  {showHint ? "▼" : "▶"} NÁPOVĚDA
                </button>

                {showHint && (
                  <div className="hint-content">💡 {currentSubtask.hint}</div>
                )}
              </div>
            )}
          </div>

          {/* All tasks completed */}
          {collectedDigits.length === 4 && (
            <div style={{ marginTop: "24px", textAlign: "center" }}>
              <div
                className="status-bar"
                style={{
                  backgroundColor: "#d1fae5",
                  border: "2px solid #22c55e",
                  marginBottom: "16px",
                }}
              >
                <div className="task-title status-success">
                  🎉 VŠECHNY OKRUHY DOKONČENY!
                </div>
                <div className="task-description status-success">
                  Máte všechny 4 číslice. Čas použít finální kód proti AI.gor!
                </div>
              </div>

              <button
                onClick={onShowFinalCode}
                className="modal-button primary"
                style={{
                  padding: "16px 32px",
                  fontSize: "1.125rem",
                  fontWeight: "bold",
                }}
              >
                🚀 ZADAT FINÁLNÍ KÓD
              </button>
            </div>
          )}

          {/* Terminal Footer */}
          <div
            style={{
              borderTop: "1px solid #0000dc",
              marginTop: "24px",
              paddingTop: "16px",
              textAlign: "center",
              fontSize: "0.75rem",
              color: "#6666dd",
            }}
          >
            Agent: {playerName} | {selectedFaculty?.shortName} | MUNI EMERGENCY
            DEFENSE SYSTEM
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskScreen;
