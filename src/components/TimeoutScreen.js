import React from "react";
import { Clock, AlertTriangle, Database } from "lucide-react";

const TimeoutScreen = ({
  completedTasks,
  databaseIntegrity,
  wrongAnswersCount,
  collectedDigits,
}) => {
  return (
    <div
      className="desktop-screen"
      style={{
        background: "linear-gradient(135deg, #dc2626 0%, #991b1b 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        minHeight: "100vh",
      }}
    >
      <div
        className="modal-content"
        style={{
          maxWidth: "700px",
          width: "100%",
          backgroundColor: "rgba(255, 255, 255, 0.98)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 20px 40px rgba(220, 38, 38, 0.4)",
          border: "2px solid #dc2626",
          borderRadius: "12px",
          padding: "40px",
          textAlign: "center",
        }}
      >
        {/* Icon */}
        <div style={{ marginBottom: "24px" }}>
          <Clock
            size={80}
            color="#dc2626"
            style={{
              animation: "pulse 2s infinite",
            }}
          />
        </div>

        {/* Title */}
        <h1
          style={{
            color: "#dc2626",
            fontSize: "2.5rem",
            fontWeight: "700",
            marginBottom: "16px",
            fontFamily: "'Courier New', monospace",
          }}
        >
          [ ČAS VYPRŠEL ]
        </h1>

        {/* Message */}
        <p
          style={{
            color: "#666",
            fontSize: "1.2rem",
            marginBottom: "32px",
            lineHeight: "1.6",
          }}
        >
          Bohužel se ti nepodařilo obnovit systém IGRAM včas. AI.gor ovládl
          univerzitní síť a šíří dezinformace...
        </p>

        {/* Stats */}
        <div
          style={{
            backgroundColor: "#f3f4f6",
            borderRadius: "12px",
            padding: "24px",
            marginBottom: "32px",
          }}
        >
          <h3
            style={{
              color: "#0000dc",
              fontSize: "1.2rem",
              marginBottom: "16px",
              fontWeight: "600",
            }}
          >
            Tvoje statistiky:
          </h3>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
              gap: "16px",
              textAlign: "left",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <AlertTriangle size={20} color="#f59e0b" />
              <div>
                <div style={{ fontSize: "0.9rem", color: "#666" }}>
                  Dokončené úkoly
                </div>
                <div
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "700",
                    color: "#0000dc",
                  }}
                >
                  {completedTasks}/4
                </div>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Database size={20} color="#10b981" />
              <div>
                <div style={{ fontSize: "0.9rem", color: "#666" }}>
                  Integrita DB
                </div>
                <div
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "700",
                    color:
                      databaseIntegrity >= 70
                        ? "#10b981"
                        : databaseIntegrity >= 40
                        ? "#f59e0b"
                        : "#dc2626",
                  }}
                >
                  {databaseIntegrity}%
                </div>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Clock size={20} color="#6366f1" />
              <div>
                <div style={{ fontSize: "0.9rem", color: "#666" }}>
                  Získané číslice
                </div>
                <div
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "700",
                    color: "#0000dc",
                  }}
                >
                  {collectedDigits.length}/4
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Message */}
        <div
          style={{
            backgroundColor: "#fef2f2",
            border: "1px solid #fecaca",
            borderRadius: "8px",
            padding: "16px",
            marginBottom: "24px",
          }}
        >
          <p
            style={{
              color: "#991b1b",
              fontSize: "1rem",
              margin: 0,
              lineHeight: "1.5",
            }}
          >
            💡 <strong>Tip:</strong> Při dalším pokusu se zaměř na rychlé
            rozhodování a správné odpovědi na první pokus. Každá chyba snižuje
            integritu databáze!
          </p>
        </div>

        {/* Reload button */}
        <button
          onClick={() => window.location.reload()}
          style={{
            width: "100%",
            padding: "18px 24px",
            fontSize: "1.1rem",
            fontWeight: "600",
            borderRadius: "12px",
            backgroundColor: "#0000dc",
            color: "white",
            border: "none",
            cursor: "pointer",
            transition: "all 0.2s ease",
            fontFamily: "'Courier New', monospace",
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "#1a1a8a";
            e.target.style.transform = "scale(1.02)";
            e.target.style.boxShadow = "0 8px 20px rgba(0, 0, 220, 0.3)";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "#0000dc";
            e.target.style.transform = "scale(1)";
            e.target.style.boxShadow = "none";
          }}
        >
          🔄 Zkusit znovu
        </button>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
};

export default TimeoutScreen;
