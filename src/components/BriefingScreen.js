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
  Minimize2,
  // NOVÉ: Přidané ikony pro nahrazení emoji
  FileText,
  Target,
  Shield,
  ChevronRight,
  ChevronDown,
  CheckSquare,
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

const BriefingScreen = ({
  taskIndex,
  gameData,
  playerName,
  selectedFaculty,
  onStart,
  // Přidané props pro status bar
  timeLeft,
  databaseIntegrity,
  collectedDigits,
  wrongAnswersCount,
  formatTime,
  getDamageLevel,
  COLLECTED_DIGITS,
  GAME_TIME,
}) => {
  const briefing = gameData.briefing;

  // State pro postupné zobrazování zpráv
  const [terminalMessages, setTerminalMessages] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);

  // State pro komunikační panel
  const [commMessages, setCommMessages] = useState([]);
  const [commInput, setCommInput] = useState("");
  const [commMinimized, setCommMinimized] = useState(false);

  // NOVÉ: State pro toggle sekce
  const [showSkills, setShowSkills] = useState(false);
  const [showConsequences, setShowConsequences] = useState(false);

  // Fallback funkce
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

  const safeGetDamageLevel = () => {
    if (getDamageLevel && typeof getDamageLevel === "function") {
      return getDamageLevel();
    }
    if (wrongAnswersCount === 0) return "STABILNÍ";
    if (wrongAnswersCount <= 2) return "MÍRNÉ POŠKOZENÍ";
    if (wrongAnswersCount <= 4) return "VÁŽNÉ POŠKOZENÍ";
    return "KRITICKÉ POŠKOZENÍ";
  };

  // Komunikační funkce - ZJEDNODUŠENÉ
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
      // NOVÉ: ALGOR blokuje odesílání zpráv
      const blockedMessage = {
        id: Date.now(),
        type: "system",
        sender: "ALGOR SYSTEM",
        message:
          "PŘENOS ZPRÁVY BLOKOVÁN. Komunikační protokoly kompromitovány. Pouze příjem povolen.",
        timestamp: new Date(),
        isBlocked: true, // Speciální flag pro blokované zprávy
      };

      setCommMessages((prev) => [...prev, blockedMessage]);
      setCommInput(""); // Vymaže input
    }
  };

  // Inicializace komunikačních zpráv - POUZE JEDNOU
  useEffect(() => {
    // Pokud už máme zprávy, nebudeme je znovu načítat
    if (commMessages.length > 0) return;

    const defaultCommMessages = [
      {
        type: "operative",
        sender: "Dr. Knihová",
        message:
          "Agent, IGRAM systém je kompromitován algoritmem ALGOR. Potřebujeme okamžitou obnovu!",
      },
      {
        type: "operative",
        sender: "Dr. Záložka",
        message:
          "Potvrzuji. ALGOR narušuje naše vyhledávací protokoly a šíří dezinformace.",
      },
      {
        type: "operative",
        sender: "Dr. Knihová",
        message:
          "Máme pouze omezený čas. Každý okruh obsahuje klíčovou číslici pro obnovu.",
      },
      {
        type: "operative",
        sender: "Dr. Záložka",
        message:
          "Pamatujte - ověřujte každou informaci. ALGOR vytváří falešné zdroje.",
      },
    ];

    const initialMessages = briefing.initialCommMessages || defaultCommMessages;
    const messagesWithIds = initialMessages.map((msg, index) => ({
      ...msg,
      id: index + 1,
      timestamp: new Date(),
    }));
    setCommMessages(messagesWithIds);
  }, [taskIndex]); // ZMĚNĚNO: Závislost pouze na taskIndex

  // Postupné načítání zpráv s novými informacemi o IGRAM/ALGOR - POUZE JEDNOU
  useEffect(() => {
    // Pokud už máme zprávy, nebudeme je znovu načítat
    if (terminalMessages.length > 0) return;

    const igramMessages = [
      "[INIT] Inicializace IGRAM diagnostiky...",
      "[WARN] Detekován útok systému ALGOR na vyhledávací indexy",
      "[ERROR] Poškození databáze: falešné zdroje vloženy do systému",
      "[INFO] ALGOR přepisuje metadata dokumentů",
      "[CRITICAL] Integrita vyhledávání kompromitována - vyžaduje okamžitou obnovu",
      "[SCAN] Analýza poškozených segmentů v průběhu...",
      "[READY] Systém připraven k zahájení obnovy",
    ];

    let currentMessage = 0;
    const logInterval = setInterval(() => {
      if (currentMessage < igramMessages.length) {
        setTerminalMessages((prev) => [
          ...prev,
          {
            time: new Date().toLocaleTimeString(),
            message: igramMessages[currentMessage],
          },
        ]);
        setCurrentStep((prev) => prev + 1);
        currentMessage++;
      } else {
        clearInterval(logInterval);
      }
    }, 1000);

    // Zobrazit briefing detaily hned na začátku
    setTimeout(() => {
      // Briefing detaily jsou nyní vidět hned
    }, 100);

    return () => clearInterval(logInterval);
  }, [taskIndex]); // ZMĚNĚNO: Závislost pouze na taskIndex

  // Získání čistého názvu bez "Okruh X:"
  const getCleanTitle = () => {
    return briefing.title.replace(/^Okruh \d+:\s*/, "");
  };

  return (
    <div className="terminal-container">
      <div
        style={{
          position: "relative",
          zIndex: 10,
          padding: "16px 32px",
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        {/* Terminal header */}
        <div className="terminal-header">
          <div className="terminal-button close"></div>
          <div className="terminal-button minimize"></div>
          <div className="terminal-button maximize"></div>
          <span className="terminal-prompt">
            muni-agent@briefing:/mission_{taskIndex + 1}$
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
              OKRUH {taskIndex + 1}: {getCleanTitle().toUpperCase()}
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
            formatTime={safeFormatTime}
            GAME_TIME={GAME_TIME}
          />

          {/* HORNÍ PANEL - BRIEFING DETAILY - VŽDY VIDITELNÝ */}
          <div
            style={{
              background: "rgba(255,255,255,0.1)",
              border: "2px solid #6666ff",
              borderRadius: "10px",
              padding: "25px",
              marginBottom: "30px",
            }}
          >
            <div
              style={{
                color: "#6666ff",
                textAlign: "center",
                fontWeight: "bold",
                fontSize: "1.3rem",
                marginBottom: "30px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
            >
              <FileText size={24} color="#6666ff" />
              BRIEFING MISE - DETAILY ÚKOLU
            </div>

            {/* POŽADOVANÉ DOVEDNOSTI - SAMOSTATNÝ BOX */}
            <div
              style={{
                marginBottom: "20px",
                border: "1px solid rgba(34, 197, 94, 0.3)",
                borderRadius: "8px",
                overflow: "hidden",
              }}
            >
              {/* Toggle tlačítko přes celou šířku */}
              <button
                onClick={() => setShowSkills(!showSkills)}
                style={{
                  width: "100%",
                  background: showSkills ? "#22c55e" : "rgba(34, 197, 94, 0.2)",
                  color: showSkills ? "white" : "#22c55e",
                  border: "none",
                  padding: "15px 20px",
                  cursor: "pointer",
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                  transition: "all 0.3s ease",
                  textAlign: "left",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <Target size={18} />
                  POŽADOVANÉ DOVEDNOSTI
                </span>
                <span
                  style={{
                    fontSize: "0.8rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  {showSkills ? (
                    <ChevronDown size={14} />
                  ) : (
                    <ChevronRight size={14} />
                  )}
                  {showSkills ? "Skrýt" : "Zobrazit"}
                </span>
              </button>

              {/* Obsah dovedností */}
              {showSkills && (
                <div
                  style={{
                    padding: "20px",
                    background: "rgba(34, 197, 94, 0.1)",
                    animation: "fadeIn 0.3s ease-in",
                  }}
                >
                  {briefing.skills.map((skill, index) => (
                    <div
                      key={index}
                      style={{
                        margin: "10px 0",
                        padding: "10px 15px",
                        background: "rgba(34, 197, 94, 0.15)",
                        borderRadius: "6px",
                        borderLeft: "4px solid #22c55e",
                        fontSize: "0.95rem",
                        lineHeight: "1.4",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <CheckSquare size={16} color="#22c55e" />
                      {skill}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* DŮSLEDKY NEÚSPĚCHU - SAMOSTATNÝ BOX */}
            <div
              style={{
                border: "1px solid rgba(239, 68, 68, 0.3)",
                borderRadius: "8px",
                overflow: "hidden",
              }}
            >
              {/* Toggle tlačítko přes celou šířku */}
              <button
                onClick={() => setShowConsequences(!showConsequences)}
                style={{
                  width: "100%",
                  background: showConsequences
                    ? "#ef4444"
                    : "rgba(239, 68, 68, 0.2)",
                  color: showConsequences ? "white" : "#ef4444",
                  border: "none",
                  padding: "15px 20px",
                  cursor: "pointer",
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                  transition: "all 0.3s ease",
                  textAlign: "left",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <AlertTriangle size={18} />
                  DŮSLEDKY NEÚSPĚCHU
                </span>
                <span
                  style={{
                    fontSize: "0.8rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  {showConsequences ? (
                    <ChevronDown size={14} />
                  ) : (
                    <ChevronRight size={14} />
                  )}
                  {showConsequences ? "Skrýt" : "Zobrazit"}
                </span>
              </button>

              {/* Obsah důsledků */}
              {showConsequences && (
                <div
                  style={{
                    padding: "20px",
                    background: "rgba(239, 68, 68, 0.1)",
                    animation: "fadeIn 0.3s ease-in",
                  }}
                >
                  {briefing.consequences.map((consequence, index) => (
                    <div
                      key={index}
                      style={{
                        margin: "10px 0",
                        padding: "10px 15px",
                        background: "rgba(239, 68, 68, 0.15)",
                        borderRadius: "6px",
                        borderLeft: "4px solid #ef4444",
                        fontSize: "0.95rem",
                        lineHeight: "1.4",
                      }}
                    >
                      {consequence}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Hlavní layout grid - IGRAM DIAGNOSTIKA A KOMUNIKACE - ZAROVNÁNÍ NAHOŘE */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "30px",
              marginBottom: "30px",
              alignItems: "flex-start", // ZMĚNĚNO: Zarovnání kontejnerů nahoře
            }}
          >
            {/* LEVÝ PANEL - IGRAM DIAGNOSTIKA - BEZ SCROLLOVÁNÍ */}
            <div
              className="overview-logs-container"
              style={{
                background: "rgba(255, 255, 255, 0.1)", // ZMĚNĚNO: Světlejší pozadí jako v OverviewScreen
                border: "1px solid #0000dc",
                borderRadius: "8px", // ZMĚNĚNO: Oblé rohy
                padding: "16px",
                minHeight: "auto", // ZMĚNĚNO: Automatická výška
                fontFamily: "monospace",
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
                  fontFamily: "monospace",
                }}
              >
                [IGRAM_DIAGNOSTICS]
              </div>

              <div
                className="overview-logs-content"
                style={{
                  // ODSTRANĚNO: maxHeight a overflowY
                  fontFamily: "monospace",
                  fontSize: "0.85rem",
                  lineHeight: "1.4",
                }}
              >
                {terminalMessages.map((msg, index) => (
                  <div
                    key={index}
                    className="overview-log-line"
                    style={{
                      margin: "4px 0",
                      color: "#0000dc",
                      fontFamily: "monospace",
                    }}
                  >
                    <span style={{ color: "#6666dd" }}>[{msg.time}]</span>{" "}
                    <span style={{ color: "#0000dc" }}>{msg.message}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* PRAVÝ PANEL - INTERMUNICOM - BEZ SCROLLOVÁNÍ */}
            <div
              style={{
                background: "rgba(255, 255, 255, 0.9)", // ZMĚNĚNO: Čistší bílé pozadí
                border: "1px solid #0000dc",
                borderRadius: "8px", // ZMĚNĚNO: Oblé rohy
                padding: "16px",
                minHeight: "auto", // ZMĚNĚNO: Automatická výška
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
                  SECURE
                </div>
              </div>

              {/* Zprávy - bez scrollování */}
              <div
                style={{
                  marginBottom: "15px",
                  padding: "8px",
                  background: "rgba(248, 249, 255, 0.8)", // ZMĚNĚNO: Jemnější pozadí
                  borderRadius: "6px",
                  border: "1px solid rgba(0, 0, 220, 0.2)", // ZMĚNĚNO: Jemnější rámeček
                  // ODSTRANĚNO: maxHeight, overflowY, flex
                }}
              >
                {commMessages.map((msg) => (
                  <div
                    key={msg.id}
                    style={{
                      margin: "8px 0",
                      padding: "10px 12px",
                      borderRadius: "6px",
                      background: msg.isBlocked
                        ? "rgba(239, 68, 68, 0.1)" // ČERVENÉ pozadí pro blokované zprávy
                        : "rgba(0, 0, 220, 0.05)", // Standardní modré pozadí
                      borderLeft: msg.isBlocked
                        ? "3px solid #ef4444" // ČERVENÝ border pro blokované zprávy
                        : "3px solid #0000dc", // Standardní modrý border
                      fontSize: "0.75rem",
                      // NOVÉ: Animace pro blokované zprávy
                      animation: msg.isBlocked
                        ? "shake 0.5s ease-in-out"
                        : "none",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "6px",
                        fontSize: "0.7rem",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                          color: msg.isBlocked ? "#ef4444" : "#0000dc", // ČERVENÁ barva pro blokované zprávy
                          fontWeight: "bold",
                          fontFamily: "monospace",
                        }}
                      >
                        {getTypeIcon(msg.type)}
                        {msg.sender}
                        {msg.isBlocked && (
                          <Shield size={12} color="#ef4444" />
                        )}{" "}
                        {/* NOVÁ ikona místo emoji */}
                      </div>
                      <div style={{ color: "#666", fontSize: "0.65rem" }}>
                        {msg.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                    <div
                      style={{
                        fontSize: "0.75rem",
                        color: msg.isBlocked ? "#dc2626" : "#333", // TMAVŠÍ červená pro text blokovaných zpráv
                        lineHeight: "1.4",
                        fontWeight: msg.isBlocked ? "600" : "normal", // TUČNĚJŠÍ text pro varování
                      }}
                    >
                      {msg.message}
                    </div>
                  </div>
                ))}
              </div>

              {/* Input pro odesílání zpráv - s varováním */}
              <div
                style={{
                  borderTop: "1px solid rgba(0, 0, 220, 0.2)", // ZMĚNĚNO: Jemnější rámeček
                  paddingTop: "8px",
                }}
              >
                {/* NOVÉ: Varování nad inputem */}
                <div
                  style={{
                    fontSize: "0.7rem",
                    color: "#ef4444",
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
                  <Shield size={12} color="#ef4444" />
                  ODCHOZÍ KOMUNIKACE BLOKOVÁNA SYSTÉMEM ALGOR
                </div>

                <div style={{ display: "flex", gap: "8px" }}>
                  <input
                    type="text"
                    value={commInput}
                    onChange={(e) => setCommInput(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        handleCommSend();
                      }
                    }}
                    placeholder={`${playerName}@intermunicom: zpráva blokována...`}
                    style={{
                      flex: 1,
                      padding: "8px",
                      background: "rgba(239, 68, 68, 0.1)", // ZMĚNĚNO: Červené pozadí indikuje blokování
                      border: "1px solid #ef4444", // ZMĚNĚNO: Červený border
                      borderRadius: "4px",
                      color: "#333", // ZMĚNĚNO: Tmavší text
                      fontSize: "0.75rem",
                      outline: "none",
                      fontFamily: "monospace",
                    }}
                  />
                  <button
                    onClick={handleCommSend}
                    disabled={!commInput.trim()}
                    style={{
                      padding: "8px 12px",
                      background: commInput.trim()
                        ? "#ef4444" // ZMĚNĚNO: Červené tlačítko místo modrého
                        : "rgba(239, 68, 68, 0.3)",
                      border: "none",
                      borderRadius: "4px",
                      color: "#fff",
                      cursor: commInput.trim() ? "pointer" : "not-allowed",
                      fontSize: "0.75rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    title="Zpráva bude blokována systémem ALGOR" // NOVÝ tooltip
                  >
                    <Send size={10} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Action Button - UPRAVENÉ */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "32px",
            }}
          >
            <button
              onClick={onStart}
              className="modal-button primary"
              style={{
                background: "linear-gradient(45deg, #22c55e, #16a34a)",
                color: "white",
                border: "none",
                padding: "15px 30px",
                fontSize: "1.2rem",
                borderRadius: "8px",
                cursor: "pointer",
                fontFamily: "inherit",
                boxShadow: "0 0 20px rgba(34,197,94,0.3)",
                transition: "all 0.3s ease",
                fontWeight: "bold",
              }}
              onMouseOver={(e) => {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 0 30px rgba(34,197,94,0.5)";
              }}
              onMouseOut={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 0 20px rgba(34,197,94,0.3)";
              }}
            >
              SPUSTIT PRVNÍ OKRUH
            </button>
          </div>

          {/* Terminal Footer */}
          <div
            style={{
              borderTop: "1px solid #0000dc",
              marginTop: "32px",
              paddingTop: "16px",
              textAlign: "center",
              fontSize: "0.75rem",
              color: "#6666dd",
            }}
          >
            Agent: {playerName} | {selectedFaculty?.shortName} | BRIEFING -{" "}
            {getCleanTitle().toUpperCase()}
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

        .status-indicator {
          display: inline-flex;
          align-items: center;
        }

        .status-critical {
          color: #ef4444;
        }

        .overview-logs-container {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid #0000dc;
          border-radius: 8px;
          padding: 16px;
          margin: 1rem 0;
        }

        .overview-logs-content {
          max-height: 300px;
          overflow-y: auto;
          font-family: monospace;
          font-size: 0.85rem;
          line-height: 1.4;
        }

        .overview-log-line {
          margin: 4px 0;
          color: #0000dc;
          font-family: monospace;
        }

        @media (max-width: 768px) {
          .mission-title {
            font-size: 1.2rem;
          }

          .terminal-content > div:nth-child(4) {
            grid-template-columns: 1fr !important;
          }

          .terminal-content > div:nth-child(5) > div:nth-child(2) > div {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default BriefingScreen;
