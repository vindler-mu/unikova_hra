import React from "react";
import { BookOpen, Key, AlertTriangle, X } from "lucide-react";

const PasswordPrompt = ({
  taskNumber,
  passwordInput,
  setPasswordInput,
  passwordError,
  onSubmit,
  onCancel,
}) => {
  return (
    <div className="modal-overlay">
      <div
        className="terminal-container"
        style={{
          padding: "0",
          minHeight: "auto",
          background: "transparent",
          maxWidth: "600px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            position: "relative",
            zIndex: 10,
          }}
        >
          {/* Terminal header */}
          <div className="terminal-header">
            <div className="terminal-button close"></div>
            <div className="terminal-button minimize"></div>
            <div className="terminal-button maximize"></div>
            <span className="terminal-prompt">
              muni-library@auth:/password_required$
            </span>
          </div>

          {/* Terminal content */}
          <div className="terminal-content">
            {/* Mission Header */}
            <div className="mission-header">
              <div className="mission-title">
                <span className="mission-brackets">[</span>
                <span className="mission-text">KNIHOVNICKÁ AUTENTIFIKACE</span>
                <span className="mission-brackets">]</span>
              </div>
              <div className="mission-subtitle">
                <span className="status-indicator status-warning">●</span>
                POŽADOVÁNO HESLO PRO OKRUH {taskNumber}
                <span className="status-indicator status-warning">●</span>
              </div>
            </div>

            {/* Log-style message from librarian */}
            <div
              className="overview-logs-container"
              style={{ marginBottom: "20px" }}
            >
              <div className="overview-logs-content">
                <div
                  className="overview-log-line"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "12px",
                    fontWeight: "bold",
                  }}
                >
                  <BookOpen size={16} color="#0000dc" />
                  [KNIHOVNÍK] Dr. Záložka
                </div>

                <div
                  className="overview-log-line"
                  style={{
                    color: "#374151",
                    marginBottom: "8px",
                    paddingLeft: "24px",
                  }}
                >
                  "Agente, pro přístup k okruhu {taskNumber} potřebujete heslo z
                  analogového úkolu."
                </div>

                <div
                  className="overview-log-line"
                  style={{
                    color: "#6b7280",
                    fontSize: "0.875rem",
                    paddingLeft: "24px",
                  }}
                >
                  "Vyřešte úkol mimo systém a zadejte heslo pro pokračování."
                </div>
              </div>
            </div>

            {/* Password input section */}
            <div
              className="overview-logs-container"
              style={{ marginBottom: "20px" }}
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
                  }}
                >
                  <Key size={16} color="#0000dc" />
                  [AUTENTIFIKACE] VSTUPNÍ HESLO
                </div>

                <div style={{ marginBottom: "16px" }}>
                  <div className="input-container">
                    <span className="terminal-prompt">
                      agent@library-auth:~$
                    </span>
                    <input
                      type="password"
                      value={passwordInput}
                      onChange={(e) => setPasswordInput(e.target.value)}
                      className="terminal-input"
                      placeholder="zadejte heslo..."
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          onSubmit();
                        }
                      }}
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

            {/* Terminal-style action buttons */}
            <div
              style={{
                display: "flex",
                gap: "12px",
                justifyContent: "center",
                marginTop: "24px",
              }}
            >
              <div
                className="input-container"
                style={{
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  flex: "0 0 auto",
                }}
                onClick={onCancel}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(239, 68, 68, 0.1)";
                  e.currentTarget.style.borderColor = "#ef4444";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "white";
                  e.currentTarget.style.borderColor = "#0000dc";
                }}
              >
                <span className="terminal-prompt" style={{ color: "#ef4444" }}>
                  cancel@library:~$
                </span>
                <span
                  className="terminal-input"
                  style={{
                    color: "#ef4444",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                >
                  zrušit
                </span>
              </div>

              <div
                className="input-container"
                style={{
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  flex: "0 0 auto",
                }}
                onClick={onSubmit}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(34, 197, 94, 0.1)";
                  e.currentTarget.style.borderColor = "#22c55e";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "white";
                  e.currentTarget.style.borderColor = "#0000dc";
                }}
              >
                <span className="terminal-prompt" style={{ color: "#22c55e" }}>
                  unlock@library:~$
                </span>
                <span
                  className="terminal-input"
                  style={{
                    color: "#22c55e",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                >
                  odemknout
                </span>
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
              Knihovnická autentifikace | Okruh {taskNumber} | MUNI DEFENSE GRID
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordPrompt;
