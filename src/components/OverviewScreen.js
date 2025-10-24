import React, { useState, useEffect } from "react";
import {
  CheckCircle,
  Circle,
  XCircle,
  ArrowRight,
  Clock,
  Database,
  Hash,
  AlertTriangle,
} from "lucide-react";

// Status Dashboard komponenta
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

const OverviewScreen = ({
  timeLeft,
  databaseIntegrity,
  collectedDigits,
  wrongAnswersCount,
  taskStates,
  tasks,
  playerName,
  selectedFaculty,
  formatTime,
  getDamageLevel,
  COLLECTED_DIGITS,
  GAME_TIME,
  onStart,
  onTaskSelect,
}) => {
  const [logs, setLogs] = useState([]);
  const [commandInput, setCommandInput] = useState("");

  // NOVÉ: Funkce pro přehrání zvuku
  const playSound = (soundType) => {
    try {
      const audioContext = new (window.AudioContext ||
        window.webkitAudioContext)();

      let frequency, duration, type;

      switch (soundType) {
        case "success":
          frequency = 600;
          duration = 200;
          type = "sine";
          break;
        case "error":
          frequency = 200;
          duration = 400;
          type = "sawtooth";
          break;
        case "aigor-attack":
          frequency = 100;
          duration = 600;
          type = "triangle";
          break;
        case "typing":
          frequency = 800;
          duration = 100;
          type = "square";
          break;
        case "complete":
          frequency = 700;
          duration = 300;
          type = "sine";
          break;
        default:
          return;
      }

      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.value = frequency;
      oscillator.type = type;

      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        audioContext.currentTime + duration / 1000
      );

      oscillator.start();
      oscillator.stop(audioContext.currentTime + duration / 1000);
    } catch (e) {
      console.log("Sound not supported:", e);
    }
  };

  // Funkce pro obarvení log zpráv podle typu
  const getLogColor = (message) => {
    if (!message || typeof message !== "string") {
      return "#0000dc";
    }

    if (message.includes("[OK]") || message.includes("[READY]")) {
      return "#22c55e";
    } else if (message.includes("[INFO]")) {
      return "#3b82f6";
    } else if (message.includes("[WARN]") || message.includes("[ERROR]")) {
      return "#ef4444";
    } else if (message.includes("[INIT]")) {
      return "#f59e0b";
    } else if (message.includes("[EXEC]")) {
      return "#8b5cf6";
    }
    return "#0000dc";
  };

  // Funkce pro rozdělení a obarvení zprávy
  const formatLogMessage = (message) => {
    if (!message || typeof message !== "string") {
      return <span style={{ color: "#0000dc" }}></span>;
    }

    // Speciální handling pro ASCII mission briefing
    if (message === "ASCII_MISSION_BRIEFING") {
      return (
        <div className="ascii-mission-briefing">
          <pre>{` 
              ╔══════════════════════════════════════════════════╗
              ║            SYSTÉM PŘIPRAVEN K ZAHÁJENÍ           ║
              ║                                                  ║
              ║  Časový limit: 20 minut
              )} | Okruhy: 4 | Kód: 4 čísl.  ║
              ╚══════════════════════════════════════════════════╝
              `}</pre>
        </div>
      );
    }

    const parts = message.split(/(\[[^\]]+\])/);

    return (
      <span>
        {parts.map((part, index) => {
          if (part.match(/^\[[^\]]+\]$/)) {
            return (
              <span
                key={index}
                style={{ color: getLogColor(part), fontWeight: "bold" }}
              >
                {part}
              </span>
            );
          } else {
            return (
              <span key={index} style={{ color: "#0000dc", fontWeight: "500" }}>
                {part}
              </span>
            );
          }
        })}
      </span>
    );
  };

  // Simulace systémových logů
  useEffect(() => {
    const systemLogs = [
      "[INIT] Inicializace defenzivních protokolů...",
      "[OK] Kontrola integrity databáze: " + databaseIntegrity + "%",
      "[INFO] Ověření přihlašovacích údajů agenta",
      "[WARN] Systém IGRAM kompromitován - vyžaduje okamžitou obnovu",
      "[READY] Moduly mise načteny - čekání na aktivační příkaz...",
    ];

    let currentLog = 0;
    const logInterval = setInterval(() => {
      if (currentLog < systemLogs.length) {
        setLogs((prev) => [
          ...prev,
          {
            time: new Date().toLocaleTimeString(),
            message: systemLogs[currentLog],
          },
        ]);
        currentLog++;
      } else {
        setTimeout(() => {
          setLogs((prev) => [
            ...prev,
            {
              time: new Date().toLocaleTimeString(),
              message: "ASCII_MISSION_BRIEFING",
            },
          ]);

          setTimeout(() => {
            setLogs((prev) => [
              ...prev,
              {
                time: new Date().toLocaleTimeString(),
                message: "[INFO] Zadejte příkaz pro aktivaci",
              },
            ]);
          }, 500);
        }, 2000);
        clearInterval(logInterval);
      }
    }, 800);

    return () => clearInterval(logInterval);
  }, [databaseIntegrity]);

  const handleCommand = (e) => {
    if (e.key === "Enter") {
      const cmd = commandInput.toLowerCase().trim();
      if (
        cmd === "run defense" ||
        cmd === "run restore protocol" ||
        cmd === "activate mission"
      ) {
        playSound("success"); // NOVÉ: Zvuk úspěchu
        setLogs((prev) => [
          ...prev,
          {
            time: new Date().toLocaleTimeString(),
            message: "[EXEC] Aktivace obranného systému - spouštění mise...",
          },
        ]);
        setTimeout(() => {
          playSound("complete"); // NOVÉ: Zvuk dokončení
          onTaskSelect(0);
        }, 1000);
      } else {
        playSound("error"); // NOVÉ: Zvuk chyby
        setLogs((prev) => [
          ...prev,
          {
            time: new Date().toLocaleTimeString(),
            message: `[ERROR] bash: ${commandInput}: command not found`,
          },
        ]);
      }
      setCommandInput("");
    }
  };

  return (
    <div className="terminal-container terminal-fixed">
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

      <div className="terminal-wrapper">
        {/* Terminal header */}
        <div className="terminal-header">
          <div className="terminal-button close"></div>
          <div className="terminal-button minimize"></div>
          <div className="terminal-button maximize"></div>
          <span className="terminal-prompt">
            root@muni-defense:/mission_overview$
          </span>
        </div>

        {/* Terminal content */}
        <div className="terminal-content">
          {/* Modern Mission Header */}
          <div className="mission-header">
            <div className="mission-title">
              <span className="mission-brackets">[</span>
              <span className="mission-text">MISE: ZÁCHRANA MUNI</span>
              <span className="mission-brackets">]</span>
            </div>
            <div className="mission-subtitle">
              <span className="status-indicator status-critical">●</span>
              Obnovení systému IGRAM
              <span className="status-indicator status-critical">●</span>
            </div>
          </div>

          {/* Status Dashboard komponenta */}
          <StatusDashboard
            timeLeft={timeLeft}
            databaseIntegrity={databaseIntegrity}
            collectedDigits={collectedDigits}
            wrongAnswersCount={wrongAnswersCount}
            selectedFaculty={selectedFaculty}
            formatTime={formatTime}
            GAME_TIME={GAME_TIME}
          />
          {/* Mission Objectives Grid */}
          <div className="task-grid overview-task-grid">
            {tasks.map((task, index) => {
              const taskKey = `task${index + 1}`;
              const state = taskStates[taskKey];

              return (
                <div
                  key={index}
                  className={`task-button overview-task-button ${
                    state.completed
                      ? "completed"
                      : state.unlocked
                      ? "unlocked"
                      : "locked"
                  }`}
                >
                  <div>
                    <div className="task-header">
                      <h3 className="task-title">OKRUH {index + 1}</h3>
                      <div
                        className={`status-indicator ${
                          state.completed
                            ? "status-success"
                            : state.unlocked
                            ? "status-warning"
                            : "status-critical"
                        }`}
                      >
                        {state.completed ? (
                          <CheckCircle size={16} />
                        ) : state.unlocked ? (
                          <Circle size={16} />
                        ) : (
                          <XCircle size={16} />
                        )}
                      </div>
                    </div>
                    <div className="task-title task-subtitle">{task.title}</div>

                    {state.completed && (
                      <div className="status-indicator status-success">
                        <ArrowRight size={14} className="status-arrow" />
                        ZÍSKANÁ ČÍSLICE: {COLLECTED_DIGITS[index]}
                      </div>
                    )}

                    {!state.unlocked && index > 0 && (
                      <div className="status-indicator status-critical">
                        <ArrowRight size={14} className="status-arrow" />
                        VYŽADUJE HESLO Z KNIHOVNY
                      </div>
                    )}

                    {state.unlocked && !state.completed && (
                      <div>
                        <div className="status-indicator status-warning">
                          <ArrowRight size={14} className="status-arrow" />
                          AKTIVUJTE OBRANU
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* System Logs */}
          <div className="overview-logs-container">
            <div className="overview-logs-content">
              {logs.map((log, index) => (
                <div key={index} className="overview-log-line">
                  {log.message === "ASCII_MISSION_BRIEFING" ? (
                    formatLogMessage(log.message)
                  ) : (
                    <>
                      <span className="log-timestamp">[{log.time}]</span>{" "}
                      {formatLogMessage(log.message)}
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Terminal Command Interface */}
          <div className="overview-command-section">
            <div className="input-container">
              <span className="terminal-prompt">muni-agent@emergency:~$ </span>
              <input
                type="text"
                value={commandInput}
                onChange={(e) => setCommandInput(e.target.value)}
                onKeyPress={handleCommand}
                className="terminal-input"
                placeholder="zadejte příkaz..."
                autoFocus
              />
            </div>

            <div className="terminal-footer">
              ┌─ MUNI ACADEMIC DEFENSE GRID ─┐
              <br />
              │ Síla v znalostech • Pravda v ověřování │<br />
              └─ Connection secured: AES-256 ─┘
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .mission-header {
          text-align: center;
          margin: 1rem 0 2rem 0;
        }

        .mission-title {
          font-size: 1.5rem;
          font-weight: bold;
          color: #0000dc;
          margin-bottom: 0.5rem;
        }

        .mission-brackets {
          color: #4d4dff;
        }

        .mission-subtitle {
          color: #0000dc;
          font-size: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        .terminal-status-dashboard {
          margin: 1rem 0;
          padding: 1rem;
        }

        .status-row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 1rem;
        }

        .status-module {
          border: 1px solid #0000dc;
          padding: 0.75rem;
          background: rgba(0, 0, 220, 0.1);
          border-radius: 2px;
        }

        .module-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.5rem;
          color: #0000dc;
          font-size: 0.8rem;
          font-weight: bold;
        }

        .module-label {
          font-family: monospace;
        }

        .module-value {
          font-size: 1.2rem;
          font-weight: bold;
          margin-bottom: 0.5rem;
          font-family: monospace;
        }

        .time-critical {
          color: #0000dc;
        }
        .db-status {
          color: #0000dc;
        }
        .error-count {
          color: #8080ff;
        }
        .digits-count {
          color: #4d4dff;
        }

        .module-bar {
          height: 4px;
          background: rgba(0, 0, 220, 0.2);
          overflow: hidden;
          border-radius: 2px;
        }

        .bar-fill {
          height: 100%;
          transition: width 0.3s ease;
        }

        .time-fill {
          background: linear-gradient(90deg, #0000dc, #4d4dff);
        }
        .db-fill {
          background: linear-gradient(90deg, #0000dc, #6666ff);
        }

        .module-status {
          font-size: 0.8rem;
          color: #8080ff;
          font-weight: bold;
          margin-top: 0.25rem;
        }

        .digit-sequence {
          display: flex;
          gap: 0.25rem;
          margin-top: 0.5rem;
        }

        .digit-slot {
          font-family: monospace;
          font-weight: bold;
          padding: 0.25rem 0.5rem;
          border: 1px solid #0000dc;
          background: rgba(0, 0, 0, 0.5);
          min-width: 1.5rem;
          text-align: center;
          border-radius: 2px;
        }

        .digit-slot.active {
          color: #4d4dff;
          border-color: #4d4dff;
          background: rgba(77, 77, 255, 0.1);
        }

        .digit-slot.empty {
          color: #666699;
        }

        @media (max-width: 768px) {
          .mission-title {
            font-size: 1.2rem;
          }

          .status-row {
            grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          }

          .module-value {
            font-size: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default OverviewScreen;
