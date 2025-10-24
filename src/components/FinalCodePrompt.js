import React from "react";

const FinalCodePrompt = ({
  collectedDigits,
  finalCodeInput,
  setFinalCodeInput,
  onSubmit,
  passwordError,
}) => {
  return (
    <div className="modal-overlay">
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
              muni-defense@final:/code_assembly$
            </span>
          </div>

          {/* Terminal content */}
          <div className="terminal-content">
            {/* Mission Header */}
            <div className="mission-header">
              <div className="mission-title">
                <span className="mission-brackets">[</span>
                <span className="mission-text">FINÁLNÍ AKTIVACE</span>
                <span className="mission-brackets">]</span>
              </div>
              <div className="mission-subtitle">
                <span className="status-indicator status-critical">●</span>
                SESTAVENÍ MASTER KÓDU
                <span className="status-indicator status-critical">●</span>
              </div>
            </div>

            {/* System log */}
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
                [DEFENSE_LOG]
              </div>
              <div className="overview-logs-content">
                <div className="overview-log-line">
                  <span className="log-timestamp">[09:42:31]</span> [SYSTEM]
                  OBRANNÝ PROTOKOL
                </div>

                <div className="overview-log-line">
                  <span className="log-timestamp">[09:42:32]</span> [INFO]
                  Všechny okruhy dokončeny. Sestavte číslice v pořadí získání.
                </div>

                <div className="overview-log-line">
                  <span className="log-timestamp">[09:42:33]</span> [WARN]
                  Čekání na aktivaci původního zdrojového kódu...
                </div>

                <div className="overview-log-line">
                  <span className="log-timestamp">[09:42:34]</span> [DATA]
                  Získané číslice:
                  <span
                    style={{
                      marginLeft: "12px",
                      display: "inline-flex",
                      gap: "8px",
                    }}
                  >
                    {collectedDigits.map((digit, index) => (
                      <span
                        key={index}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "32px",
                          height: "32px",
                          border: "1px solid #0000dc",
                          borderRadius: "4px",
                          fontSize: "1rem",
                          fontWeight: "bold",
                          background: "rgba(0, 0, 220, 0.1)",
                          color: "#0000dc",
                          fontFamily: "monospace",
                        }}
                      >
                        {digit}
                      </span>
                    ))}
                  </span>
                </div>

                <div className="overview-log-line">
                  <span className="log-timestamp">[09:42:35]</span> [DEBUG]
                  sequence_checksum: 0x
                  {collectedDigits
                    .map((d) => d.toString(16))
                    .join("")
                    .toUpperCase()}
                </div>
              </div>
            </div>

            {/* IGRAM diagnostic */}
            <div
              className="overview-logs-container"
              style={{ marginBottom: "20px" }}
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
              <div className="overview-logs-content">
                <div className="overview-log-line">
                  <span className="log-timestamp">[09:42:36]</span> [IGOR]
                  Databázové moduly: ONLINE
                </div>

                <div className="overview-log-line">
                  <span className="log-timestamp">[09:42:37]</span> [IGOR]
                  Bezpečnostní protokoly: AKTIVNÍ
                </div>

                <div className="overview-log-line">
                  <span className="log-timestamp">[09:42:38]</span> [IGOR]
                  Obranné systémy: PŘIPRAVENY
                </div>
              </div>
            </div>

            {/* Restore protocol */}
            <div
              className="overview-logs-container"
              style={{ marginBottom: "20px" }}
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
                [DEFENSE_PROTOCOL]
              </div>
              <div className="overview-logs-content">
                <div className="overview-log-line">
                  <span className="log-timestamp">[09:42:39]</span> [INPUT]
                  MASTER KÓD
                </div>

                <div className="overview-log-line" style={{ marginTop: "8px" }}>
                  <span className="log-timestamp">[09:42:40]</span> [WARN]
                  Zadejte všechny 4 číslice
                </div>

                {passwordError && (
                  <div
                    className="overview-log-line"
                    style={{ marginTop: "8px", color: "#ef4444" }}
                  >
                    <span className="log-timestamp">[09:42:41]</span> [ERROR]{" "}
                    {passwordError}
                  </div>
                )}
              </div>
            </div>

            {/* Terminal input section - přesunuto na konec */}
            <div style={{ marginBottom: "20px" }}>
              <div className="input-container">
                <span className="terminal-prompt">master@defense:~$</span>
                <input
                  type="text"
                  value={finalCodeInput}
                  onChange={(e) => setFinalCodeInput(e.target.value)}
                  className="terminal-input"
                  style={{
                    fontSize: "2rem",
                    fontWeight: "bold",
                    letterSpacing: "0.5rem",
                    textAlign: "center",
                  }}
                  placeholder="----"
                  maxLength={4}
                  onKeyPress={(e) => {
                    if (e.key === "Enter" && finalCodeInput.length === 4) {
                      onSubmit();
                    }
                  }}
                  autoFocus
                />
              </div>
            </div>

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
              Finální aktivace | Master kód: {finalCodeInput.length}/4 | MUNI
              DEFENSE GRID
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinalCodePrompt;
