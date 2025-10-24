import React, { useState, useEffect } from "react";
import {
  Radio,
  Activity,
  Terminal,
  CheckCircle,
  Send,
  AlertTriangle,
  BookOpen,
  Target,
  Key,
  Wrench,
} from "lucide-react";

const LibrarianInterlude = ({
  interludeIndex, // 0, 1, 2 (pro mezihry 1-3)
  playerName,
  selectedFaculty,
  onPasswordSuccess,
  onCancel,
  TASK_PASSWORDS,
}) => {
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [commMessages, setCommMessages] = useState([]);
  const [commInput, setCommInput] = useState("");

  // Obsah pro jednotlivé mezihry
  const interludeData = [
    {
      title: "KNIHOVNICKÁ MEZIHRA 1",
      subtitle: "Cesta ke druhému okruhu",
      storyText:
        "Po úspěšném dokončení prvního okruhu se musíte dostat k dalším informacím. Knihovník vám poskytne klíč k pokračování mise.",
      taskDescription:
        "Vyřešte první knihovnický úkol pro získání hesla k druhému okruhu.",
      placeholder: "Zde bude první knihovnický úkol...",
      passwordHint: "Heslo získáte po vyřešení úkolu s knihovníkem.",
      targetTask: 2,
    },
    {
      title: "KNIHOVNICKÁ MEZIHRA 2",
      subtitle: "Cesta ke třetímu okruhu",
      storyText:
        "Druhý okruh je dokončen. Nyní potřebujete další autorizaci pro přístup k pokročilejším systémům MUNI.",
      taskDescription:
        "Vyřešte druhý knihovnický úkol pro získání hesla ke třetímu okruhu.",
      placeholder: "Zde bude druhý knihovnický úkol...",
      passwordHint: "Heslo získáte po vyřešení úkolu s knihovníkem.",
      targetTask: 3,
    },
    {
      title: "KNIHOVNICKÁ MEZIHRA 3",
      subtitle: "Cesta ke čtvrtému okruhu",
      storyText:
        "Třetí okruh úspěšně dokončen. Finální fáze mise se blíží. Potřebujete nejvyšší úroveň přístupu.",
      taskDescription:
        "Vyřešte třetí knihovnický úkol pro získání hesla ke čtvrtému okruhu.",
      placeholder: "Zde bude třetí knihovnický úkol...",
      passwordHint: "Heslo získáte po vyřešení úkolu s knihovníkem.",
      targetTask: 4,
    },
  ];

  const currentInterlude = interludeData[interludeIndex];

  // Komunikační funkce
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
      const blockedMessage = {
        id: Date.now(),
        type: "system",
        sender: "BEZPEČNOSTNÍ SYSTÉM",
        message:
          "PŘENOS ZPRÁVY POZASTAVEN. Komunikace omezena na příjem instrukcí od knihovníků.",
        timestamp: new Date(),
        isBlocked: true,
      };

      setCommMessages((prev) => [...prev, blockedMessage]);
      setCommInput("");
    }
  };

  // Inicializace komunikačních zpráv pro knihovnickou mezihru
  useEffect(() => {
    if (commMessages.length > 0) return;

    const defaultCommMessages = [
      {
        type: "operative",
        sender: "Dr. Knihová",
        message: `Agente, pro přístup k ${currentInterlude.targetTask}. okruhu musíte projít bezpečnostní ověřením.`,
      },
      {
        type: "operative",
        sender: "Dr. Záložka",
        message:
          "ALGOR kompromitoval naše digitální komunikační kanály. Musíme použít fyzické ověření.",
      },
      {
        type: "system",
        sender: "BEZPEČNOSTNÍ SYSTÉM",
        message:
          "Detekována infiltrace ALGOR algoritmů. Přepínám na externí autentifikaci.",
      },
      {
        type: "operative",
        sender: "Dr. Knihová",
        message:
          "Knihovníci MUNI jsou naše poslední bezpečná linka. Pouze oni mohou předat obnovovací klíče.",
      },
      {
        type: "operative",
        sender: "Dr. Záložka",
        message:
          "Splňte úkol mimo systém. Jedině tak knihovníci poznají, že jste oprávněný agent.",
      },
      {
        type: "operative",
        sender: "Dr. Knihová",
        message:
          "Po splnění úkolu získáte heslo pro pokračování v obnově systému IGRAM.",
      },
    ];

    const messagesWithIds = defaultCommMessages.map((msg, index) => ({
      ...msg,
      id: index + 1,
      timestamp: new Date(),
    }));
    setCommMessages(messagesWithIds);
  }, [interludeIndex, currentInterlude.targetTask]);

  const handlePasswordSubmit = () => {
    const taskKey = `task${currentInterlude.targetTask}`;
    if (passwordInput === TASK_PASSWORDS[taskKey]) {
      onPasswordSuccess(currentInterlude.targetTask);
    } else {
      setPasswordError("Nesprávné heslo. Zkuste znovu.");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handlePasswordSubmit();
    }
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
            muni-agent@library:/interlude_{interludeIndex + 1}$
          </span>
        </div>

        {/* Terminal content */}
        <div className="terminal-content">
          {/* Modern Mission Header - stejný styl jako v OverviewScreen/BriefingScreen */}
          <div className="mission-header">
            <div className="mission-title">
              <span className="mission-brackets">[</span>
              <span className="mission-text">OBNOVA HESLA</span>
              <span className="mission-brackets">]</span>
            </div>
            <div className="mission-subtitle">
              <span className="status-indicator status-warning">●</span>
              KNIHOVNICKÁ MEZIHRA {interludeIndex + 1}:{" "}
              {currentInterlude.subtitle.toUpperCase()}
              <span className="status-indicator status-warning">●</span>
            </div>
          </div>

          {/* INTERMUNICOM - na celou šířku */}
          <div
            style={{
              background: "rgba(255, 255, 255, 0.9)",
              border: "1px solid #0000dc",
              borderRadius: "8px",
              padding: "16px",
              marginBottom: "30px",
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
                  color: "#f59e0b",
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
                    background: "#f59e0b",
                    boxShadow: "0 0 10px rgba(245,158,11,0.5)",
                  }}
                ></div>
                RESTRICTED
              </div>
            </div>

            {/* Zprávy */}
            <div
              style={{
                marginBottom: "15px",
                padding: "8px",
                background: "rgba(248, 249, 255, 0.8)",
                borderRadius: "6px",
                border: "1px solid rgba(0, 0, 220, 0.2)",
                maxHeight: "400px",
                overflowY: "auto",
              }}
            >
              {commMessages.map((msg) => (
                <div key={msg.id} className="comm-message">
                  <div className="comm-message-header">
                    <div
                      className="comm-message-sender"
                      style={{
                        color: msg.isBlocked ? "#ef4444" : "#0000dc",
                      }}
                    >
                      {getTypeIcon(msg.type)}
                      {msg.sender}
                      {msg.isBlocked && (
                        <AlertTriangle size={12} color="#ef4444" />
                      )}
                    </div>
                    <div className="comm-message-time">
                      {msg.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                  <div
                    className="comm-message-content"
                    style={{
                      color: msg.isBlocked ? "#dc2626" : "#333",
                      fontWeight: msg.isBlocked ? "600" : "normal",
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
                borderTop: "1px solid rgba(0, 0, 220, 0.2)",
                paddingTop: "8px",
              }}
            >
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
                <AlertTriangle size={12} color="#ef4444" />
                ODCHOZÍ KOMUNIKACE OMEZENA
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
                  placeholder={`${playerName}@library: zpráva omezena...`}
                  className="comm-input"
                  style={{
                    background: "rgba(239, 68, 68, 0.1)",
                    border: "1px solid #ef4444",
                  }}
                />
                <button
                  onClick={handleCommSend}
                  disabled={!commInput.trim()}
                  className="comm-send-button"
                  style={{
                    background: commInput.trim()
                      ? "#ef4444"
                      : "rgba(239, 68, 68, 0.3)",
                  }}
                  title="Zpráva bude omezena bezpečnostním systémem"
                >
                  <Send size={10} />
                </button>
              </div>
            </div>
          </div>

          {/* Placeholder for actual task - přesunutý pod intercom */}
          <div
            className="status-bar"
            style={{
              backgroundColor: "#fef3c7",
              border: "2px solid #f59e0b",
              marginBottom: "24px",
              textAlign: "center",
              padding: "32px",
            }}
          >
            <div
              className="task-title"
              style={{
                color: "#d97706",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
            >
              <Wrench size={20} color="#d97706" />
              PLACEHOLDER PRO KNIHOVNICKÝ ÚKOL
            </div>
            <div
              className="task-description"
              style={{
                color: "#78350f",
                fontSize: "1.1rem",
                marginTop: "16px",
              }}
            >
              {currentInterlude.placeholder}
            </div>
          </div>

          {/* Password Section - ve stylu log containeru */}
          <div
            className="overview-logs-container"
            style={{ marginBottom: "24px" }}
          >
            <div className="overview-logs-content">
              <div
                className="overview-log-line"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "16px",
                  fontWeight: "bold",
                  fontSize: "1rem",
                }}
              >
                <Key size={20} color="#0000dc" />
                [AUTENTIFIKACE] ZADEJTE HESLO
              </div>

              <div
                className="overview-log-line"
                style={{ marginBottom: "16px", color: "#374151" }}
              >
                {currentInterlude.passwordHint}
              </div>

              <div style={{ marginBottom: "16px" }}>
                <div className="input-container">
                  <span className="terminal-prompt">
                    {playerName}@library-auth:~$
                  </span>
                  <input
                    type="password"
                    value={passwordInput}
                    onChange={(e) => {
                      setPasswordInput(e.target.value);
                      setPasswordError("");
                    }}
                    onKeyPress={handleKeyPress}
                    className="terminal-input"
                    placeholder="zadejte heslo..."
                    autoFocus
                  />
                </div>
              </div>

              {passwordError && (
                <div
                  className="overview-log-line"
                  style={{
                    color: "#dc2626",
                    fontWeight: "bold",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <AlertTriangle size={16} color="#dc2626" />
                  [ERROR] {passwordError}
                </div>
              )}
            </div>
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
            Agent: {playerName} | {selectedFaculty?.shortName} | KNIHOVNICKÁ
            MEZIHRA {interludeIndex + 1}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LibrarianInterlude;
