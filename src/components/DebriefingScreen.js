import React, { useState, useEffect } from "react";
import {
  Clock,
  Database,
  Hash,
  AlertTriangle,
  Radio,
  Activity,
  Terminal,
  CheckCircle,
  Send,
  ArrowRight,
  Zap,
  Circle,
  XCircle,
} from "lucide-react";

// StatusDashboard komponenta (stejná jako v BriefingScreen)
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
                  if (timePercent > 70)
                    return "linear-gradient(90deg, #00ff00, #44ff44)";
                  else if (timePercent > 30)
                    return "linear-gradient(90deg, #ffaa00, #ffcc44)";
                  else return "linear-gradient(90deg, #ff4444, #ff6666)";
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
                  if (databaseIntegrity > 70)
                    return "linear-gradient(90deg, #00ff00, #44ff44)";
                  else if (databaseIntegrity > 30)
                    return "linear-gradient(90deg, #ffaa00, #ffcc44)";
                  else return "linear-gradient(90deg, #ff4444, #ff6666)";
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

const DebriefingScreen = ({
  taskIndex,
  gameData,
  playerName,
  selectedFaculty,
  collectedDigits,
  onContinue,
  COLLECTED_DIGITS,
  timeLeft,
  databaseIntegrity,
  wrongAnswersCount,
  formatTime,
  GAME_TIME,
}) => {
  // Fallback pro prázdná game data
  const debriefing = gameData?.debriefing || {
    title: `Okruh ${taskIndex + 1}: Test debriefing`,
    digitObtained: "X",
    successMessage: "Úkol byl úspěšně dokončen.",
    storyProgression: "Pokračujeme v misi...",
    nextStep: "Připravte se na další výzvu.",
  };
  const [terminalMessages, setTerminalMessages] = useState([]);
  const [commMessages, setCommMessages] = useState([]);
  const [commInput, setCommInput] = useState("");

  const safeFormatTime = (seconds) => {
    if (formatTime && typeof formatTime === "function") {
      return formatTime(seconds);
    }
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "system":
        return <Activity size={12} />;
      case "command":
        return <Radio size={12} />;
      case "operative":
        return <Terminal size={12} />;
      case "agent":
        return <CheckCircle size={12} />;
      default:
        return <AlertTriangle size={12} />;
    }
  };

  const handleCommSend = () => {
    if (commInput.trim()) {
      const successMessage = {
        id: Date.now(),
        type: "system",
        sender: "IGRAM SYSTÉM",
        message: `Úkol ${taskIndex + 1} úspěšně dokončen. Číslice ${
          debriefing.digitObtained
        } získána. Databáze částečně obnovena.`,
        timestamp: new Date(),
        isSuccess: true,
      };
      setCommMessages((prev) => [...prev, successMessage]);
      setCommInput("");
    }
  };

  // Inicializace komunikačních zpráv
  useEffect(() => {
    if (commMessages.length > 0) return;

    const defaultCommMessages = [
      {
        type: "operative",
        sender: "Dr. Knihová",
        message: `Výborná práce, agente! Okruh ${
          taskIndex + 1
        } byl úspěšně dokončen.`,
      },
      {
        type: "operative",
        sender: "Dr. Záložka",
        message: `Číslice ${debriefing.digitObtained} byla bezpečně integrována do systému.`,
      },
      {
        type: "system",
        sender: "IGRAM SYSTÉM",
        message:
          "Databáze integrity zvýšena. Pokračujte v obnově dalších segmentů.",
      },
      {
        type: "operative",
        sender: "Dr. Knihová",
        message:
          collectedDigits.length < 4
            ? "Připravte se na další okruh. ALGOR stále představuje hrozbu."
            : "Všechny číslice získány! Připravte se na finální sekvenzi.",
      },
    ];

    const messagesWithIds = defaultCommMessages.map((msg, index) => ({
      ...msg,
      id: index + 1,
      timestamp: new Date(),
    }));
    setCommMessages(messagesWithIds);
  }, [taskIndex, debriefing.digitObtained, collectedDigits.length]);

  // Postupné načítání zpráv
  useEffect(() => {
    if (terminalMessages.length > 0) return;

    const debriefingMessages = [
      "[SUCCESS] Okruh úspěšně dokončen",
      `[DIGIT] Číslice ${debriefing.digitObtained} bezpečně získána`,
      "[RESTORE] Částečná obnova databáze v průběhu...",
      "[UPDATE] Integrita systému zvýšena",
      `[PROGRESS] Celkový postup: ${collectedDigits.length}/4 číslic`,
      collectedDigits.length < 4
        ? "[NEXT] Příprava dalšího okruhu..."
        : "[FINAL] Všechny číslice získány - připravte finální kód",
      "[READY] Systém připraven k pokračování",
    ];

    let currentMessage = 0;
    const logInterval = setInterval(() => {
      if (currentMessage < debriefingMessages.length) {
        setTerminalMessages((prev) => [
          ...prev,
          {
            time: new Date().toLocaleTimeString(),
            message: debriefingMessages[currentMessage],
          },
        ]);
        currentMessage++;
      } else {
        clearInterval(logInterval);
      }
    }, 800);

    return () => clearInterval(logInterval);
  }, [taskIndex, debriefing.digitObtained, collectedDigits.length]);

  const getCleanTitle = () => {
    return debriefing.title.replace(/^Okruh \d+:\s*/, "").replace(/✅\s*/, "");
  };

  return (
    <div className="terminal-container">
      <div className="terminal-wrapper" style={{ maxWidth: "1400px" }}>
        {/* Terminal header */}
        <div className="terminal-header">
          <div className="terminal-button close"></div>
          <div className="terminal-button minimize"></div>
          <div className="terminal-button maximize"></div>
          <span className="terminal-prompt">
            muni-agent@debriefing:/mission_{taskIndex + 1}_complete$
          </span>
        </div>

        {/* Terminal content */}
        <div className="terminal-content">
          {/* Mission Header */}
          <div className="mission-header">
            <div className="mission-title">
              <span className="mission-brackets">[</span>
              <span className="mission-text">MISE: ÚSPĚŠNĚ DOKONČENA</span>
              <span className="mission-brackets">]</span>
            </div>
            <div className="mission-subtitle">
              <span className="status-indicator status-success">●</span>
              OKRUH {taskIndex + 1}: {getCleanTitle().toUpperCase()}
              <span className="status-indicator status-success">●</span>
            </div>
          </div>

          {/* Mission Objectives Grid - převzato z OverviewScreen */}
          <div className="task-grid overview-task-grid">
            {[0, 1, 2, 3].map((index) => {
              const isCompleted = index <= taskIndex; // Aktuální a předchozí okruhy jsou dokončené
              const isUnlocked = index <= taskIndex + 1; // Další okruh je odemčený

              return (
                <div
                  key={index}
                  className={`task-button overview-task-button ${
                    isCompleted
                      ? "completed"
                      : isUnlocked
                      ? "unlocked"
                      : "locked"
                  }`}
                >
                  <div>
                    <div className="task-header">
                      <h3 className="task-title">OKRUH {index + 1}</h3>
                      <div
                        className={`status-indicator ${
                          isCompleted
                            ? "status-success"
                            : isUnlocked
                            ? "status-warning"
                            : "status-critical"
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle size={16} />
                        ) : isUnlocked ? (
                          <Circle size={16} />
                        ) : (
                          <XCircle size={16} />
                        )}
                      </div>
                    </div>
                    <div className="task-title task-subtitle">
                      {index === 0 && "Vyhledávání"}
                      {index === 1 && "Hodnocení"}
                      {index === 2 && "Správa"}
                      {index === 3 && "Komunikace"}
                    </div>

                    {isCompleted && (
                      <div className="status-indicator status-success task-status-right">
                        ZÍSKANÁ ČÍSLICE:{" "}
                        {COLLECTED_DIGITS && COLLECTED_DIGITS[index]
                          ? COLLECTED_DIGITS[index]
                          : index + 1}
                        <ArrowRight size={14} className="status-arrow-right" />
                      </div>
                    )}

                    {!isUnlocked && index > 0 && (
                      <div className="status-indicator status-critical task-status-right">
                        VYŽADUJE PŘEDCHOZÍ OKRUH
                        <ArrowRight size={14} className="status-arrow-right" />
                      </div>
                    )}

                    {isUnlocked && !isCompleted && (
                      <div className="task-status-right">
                        <div className="status-indicator status-warning">
                          PŘIPRAVEN K AKTIVACI
                          <ArrowRight
                            size={14}
                            className="status-arrow-right"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Získaná číslice - zvýrazněný box */}
          <div
            style={{
              marginBottom: "30px",
              border: "2px solid #f59e0b",
              borderRadius: "8px",
              overflow: "hidden",
              background: "rgba(245, 158, 11, 0.1)",
            }}
          >
            <div
              style={{
                background: "#f59e0b",
                color: "white",
                padding: "15px 20px",
                fontSize: "1.1rem",
                fontWeight: "bold",
                textAlign: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
            >
              <Hash size={18} />
              ZÍSKANÁ ČÍSLICE ACCESS KÓDU
            </div>
            <div style={{ padding: "30px 20px", textAlign: "center" }}>
              <div
                style={{
                  fontSize: "4rem",
                  fontWeight: "bold",
                  color: "#92400e",
                  marginBottom: "10px",
                  textShadow: "0 0 20px rgba(146, 64, 14, 0.3)",
                }}
              >
                {debriefing.digitObtained}
              </div>
              <div
                style={{
                  fontSize: "1.1rem",
                  color: "#78350f",
                  fontWeight: "600",
                }}
              >
                {debriefing.successMessage}
              </div>
            </div>
          </div>

          {/* Grid layout - diagnostika a komunikace */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "30px",
              marginBottom: "30px",
              alignItems: "flex-start",
            }}
          >
            {/* IGRAM výsledky */}
            <div className="overview-logs-container">
              <div
                style={{
                  fontSize: "1.1rem",
                  marginBottom: "15px",
                  paddingBottom: "8px",
                  borderBottom: "1px solid #0000dc",
                  fontWeight: "bold",
                  color: "#0000dc",
                  fontFamily: "monospace",
                }}
              >
                [IGRAM_RESULTS]
              </div>
              <div className="overview-logs-content">
                {terminalMessages.map((msg, index) => (
                  <div
                    key={index}
                    className="overview-log-line"
                    style={{
                      margin: "4px 0",
                      color:
                        (msg.message && msg.message.includes("[SUCCESS]")) ||
                        (msg.message && msg.message.includes("[READY]"))
                          ? "#22c55e"
                          : (msg.message && msg.message.includes("[DIGIT]")) ||
                            (msg.message && msg.message.includes("[PROGRESS]"))
                          ? "#f59e0b"
                          : "#0000dc",
                      fontFamily: "monospace",
                    }}
                  >
                    <span style={{ color: "#6666dd" }}>[{msg.time}]</span>{" "}
                    <span>{msg.message || ""}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Intermunicom */}
            <div
              style={{
                background: "rgba(255, 255, 255, 0.9)",
                border: "1px solid #0000dc",
                borderRadius: "8px",
                padding: "16px",
                minHeight: "auto",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  fontSize: "1.1rem",
                  marginBottom: "15px",
                  paddingBottom: "8px",
                  borderBottom: "1px solid #0000dc",
                  fontWeight: "bold",
                  color: "#0000dc",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  fontFamily: "monospace",
                }}
              >
                <span>[INTERMUNICOM]</span>
                <div
                  style={{
                    fontSize: "0.7rem",
                    color: "#22c55e",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <div
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      background: "#22c55e",
                      boxShadow: "0 0 10px rgba(34,197,94,0.5)",
                    }}
                  ></div>
                  RESTORED
                </div>
              </div>

              <div
                style={{
                  marginBottom: "15px",
                  padding: "8px",
                  background: "rgba(248, 249, 255, 0.8)",
                  borderRadius: "6px",
                  border: "1px solid rgba(0, 0, 220, 0.2)",
                }}
              >
                {commMessages.map((msg) => (
                  <div key={msg.id} className="comm-message">
                    <div className="comm-message-header">
                      <div className="comm-message-sender">
                        {getTypeIcon(msg.type)}
                        {msg.sender}
                        {msg.isSuccess && (
                          <CheckCircle size={12} color="#22c55e" />
                        )}
                      </div>
                      <div className="comm-message-time">
                        {msg.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                    <div className="comm-message-content">{msg.message}</div>
                  </div>
                ))}
              </div>

              <div
                style={{
                  borderTop: "1px solid rgba(0, 0, 220, 0.2)",
                  paddingTop: "8px",
                }}
              >
                <div
                  style={{
                    fontSize: "0.7rem",
                    color: "#22c55e",
                    marginBottom: "8px",
                    textAlign: "center",
                    fontFamily: "monospace",
                    fontWeight: "bold",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px",
                  }}
                >
                  <CheckCircle size={12} color="#22c55e" />
                  KOMUNIKAČNÍ KANÁL OBNOVEN
                </div>

                <div style={{ display: "flex", gap: "8px" }}>
                  <input
                    type="text"
                    value={commInput}
                    onChange={(e) => setCommInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleCommSend()}
                    placeholder={`${playerName}@intermunicom: zpráva k velitelství...`}
                    className="comm-input"
                  />
                  <button
                    onClick={handleCommSend}
                    disabled={!commInput.trim()}
                    className="comm-send-button"
                    title="Odeslat zprávu k velitelství"
                  >
                    <Send size={10} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Další krok - vycentrováno */}
          <div style={{ textAlign: "center", marginBottom: "30px" }}>
            <div
              style={{
                background:
                  collectedDigits.length < 4
                    ? "rgba(59, 130, 246, 0.1)"
                    : "rgba(239, 68, 68, 0.1)",
                border:
                  collectedDigits.length < 4
                    ? "2px solid #3b82f6"
                    : "2px solid #ef4444",
                borderRadius: "10px",
                padding: "25px",
                display: "inline-block",
                minWidth: "400px",
              }}
            >
              <div
                style={{
                  color: collectedDigits.length < 4 ? "#1d4ed8" : "#dc2626",
                  fontWeight: "bold",
                  fontSize: "1.3rem",
                  marginBottom: "15px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                }}
              >
                {collectedDigits.length < 4 ? (
                  <>
                    <ArrowRight size={24} />
                    DALŠÍ OKRUH ČEKÁ
                  </>
                ) : (
                  <>
                    <Zap size={24} />
                    FINÁLNÍ SEKVENCE
                  </>
                )}
              </div>
              <div
                style={{
                  fontSize: "1.1rem",
                  color: collectedDigits.length < 4 ? "#1e40af" : "#b91c1c",
                  lineHeight: "1.4",
                }}
              >
                {debriefing.nextStep}
              </div>
            </div>
          </div>

          {/* Action Button - na celou šířku */}
          <div style={{ marginTop: "32px" }}>
            <button
              onClick={onContinue}
              className="modal-button primary"
              style={{
                background:
                  collectedDigits.length < 4
                    ? "linear-gradient(45deg, #3b82f6, #1d4ed8)"
                    : "linear-gradient(45deg, #ef4444, #dc2626)",
                color: "white",
                border: "none",
                padding: "15px 30px",
                fontSize: "1.2rem",
                borderRadius: "8px",
                cursor: "pointer",
                fontFamily: "inherit",
                boxShadow:
                  collectedDigits.length < 4
                    ? "0 0 20px rgba(59,130,246,0.3)"
                    : "0 0 20px rgba(239,68,68,0.3)",
                transition: "all 0.3s ease",
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                width: "100%", // Na celou šířku kontejneru
              }}
            >
              {collectedDigits.length < 4 ? (
                <>
                  <ArrowRight size={18} />
                  DALŠÍ OKRUH
                </>
              ) : (
                <>
                  <Zap size={18} />
                  FINÁLNÍ KÓD
                </>
              )}
            </button>
          </div>

          {/* Terminal Footer */}
          <div className="terminal-footer">
            Agent: {playerName} | {selectedFaculty?.shortName} | DEBRIEFING -{" "}
            {getCleanTitle().toUpperCase()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DebriefingScreen;
