import React from "react";
import { User, Building, Lock, Shield } from "lucide-react";

const PersonalizationScreen = ({
  playerName,
  setPlayerName,
  selectedFaculty,
  setSelectedFaculty,
  faculties,
  onComplete,
}) => {
  return (
    <div
      className="desktop-screen"
      style={{
        background:
          "linear-gradient(135deg, #0000dc 0%, #1a1a8a 50%, #000066 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      {/* Login Box */}
      <div
        className="modal-content"
        style={{
          maxWidth: "600px",
          width: "100%",
          backgroundColor: "rgba(255, 255, 255, 0.98)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 20px 40px rgba(0, 0, 220, 0.3)",
          border: "1px solid rgba(0, 0, 220, 0.2)",
          borderRadius: "12px",
          padding: "32px",
        }}
      >
        {/* Header with MUNI branding */}
        <div
          className="modal-header"
          style={{ textAlign: "center", marginBottom: "40px" }}
        >
          <div
            className="modal-icon"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "24px",
            }}
          >
            <img
              src={process.env.PUBLIC_URL + "/media/muni.svg"}
              alt="Logo Masarykovy univerzity"
              style={{
                width: "250px",
                height: "200px",
                display: "block",
                margin: "0 auto",
              }}
            />
          </div>
          <h1
            className="modal-title"
            style={{
              color: "#0000dc",
              fontSize: "1.8rem",
              fontWeight: "700",
              marginBottom: "12px",
              margin: "0 0 12px 0",
            }}
          >
            Přihlášení do systému
          </h1>
          <p
            className="modal-description"
            style={{
              color: "#666",
              fontSize: "1rem",
              margin: "0",
            }}
          >
            Zadejte své přihlašovací údaje pro vstup do univerzitní sítě
          </p>
        </div>

        {/* Login Form */}
        <form className="space-y-5">
          {/* Student Name */}
          <div style={{ marginBottom: "32px" }}>
            <label
              className="status-label"
              style={{
                color: "#0000dc",
                fontWeight: "600",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "12px",
                fontSize: "1rem",
              }}
            >
              <User size={20} color="#0000dc" />
              Jméno a příjmení
            </label>
            <input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              className="answer-button"
              style={{
                width: "100%",
                textAlign: "left",
                padding: "16px 20px",
                marginTop: "8px",
                border: "2px solid #e5e7eb",
                borderRadius: "10px",
                fontSize: "1.1rem",
                transition: "all 0.2s ease",
                backgroundColor: "#fafafa",
                boxSizing: "border-box",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#0000dc";
                e.target.style.backgroundColor = "white";
                e.target.style.boxShadow = "0 0 0 3px rgba(0, 0, 220, 0.1)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#e5e7eb";
                e.target.style.backgroundColor = "#fafafa";
                e.target.style.boxShadow = "none";
              }}
              placeholder="např. Jan Novák"
              required
            />
          </div>

          {/* Faculty Selection */}
          <div style={{ marginBottom: "32px" }}>
            <label
              className="status-label"
              style={{
                color: "#0000dc",
                fontWeight: "600",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "16px",
                fontSize: "1rem",
              }}
            >
              <Building size={20} color="#0000dc" />
              Vyberte svou fakultu
            </label>
            <div
              className="task-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "14px",
                marginTop: "12px",
              }}
            >
              {faculties.map((faculty) => {
                const isSelected = selectedFaculty?.id === faculty.id;
                return (
                  <button
                    key={faculty.id}
                    type="button"
                    onClick={() => setSelectedFaculty(faculty)}
                    className={`task-button ${isSelected ? "active" : ""}`}
                    style={{
                      backgroundColor: isSelected
                        ? faculty.color + "15"
                        : "#f8f9fa",
                      borderColor: isSelected ? faculty.color : "#e5e7eb",
                      borderWidth: "2px",
                      borderStyle: "solid",
                      borderRadius: "12px",
                      padding: "18px 14px",
                      transition: "all 0.2s ease",
                      transform: isSelected ? "scale(1.02)" : "scale(1)",
                      boxShadow: isSelected
                        ? `0 4px 12px ${faculty.color}25`
                        : "0 2px 4px rgba(0,0,0,0.05)",
                      cursor: "pointer",
                      background: "none",
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected) {
                        e.target.style.transform = "scale(1.01)";
                        e.target.style.borderColor = faculty.color;
                        e.target.style.backgroundColor = faculty.color + "08";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) {
                        e.target.style.transform = "scale(1)";
                        e.target.style.borderColor = "#e5e7eb";
                        e.target.style.backgroundColor = "#f8f9fa";
                      }
                    }}
                  >
                    <div
                      className="task-title"
                      style={{
                        color: faculty.color,
                        fontSize: "1rem",
                        fontWeight: "600",
                        marginBottom: "6px",
                      }}
                    >
                      {faculty.shortName}
                    </div>
                    <div
                      className="task-description"
                      style={{
                        fontSize: "0.75rem",
                        color: "#666",
                        lineHeight: "1.3",
                      }}
                    >
                      {faculty.name}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Login Button */}
          <div style={{ marginTop: "40px" }}>
            <button
              type="button"
              onClick={() => {
                if (selectedFaculty && playerName) {
                  onComplete();
                }
              }}
              disabled={!selectedFaculty || !playerName}
              className={`modal-button ${
                selectedFaculty && playerName ? "primary" : "secondary"
              }`}
              style={{
                width: "100%",
                padding: "18px 24px",
                fontSize: "1.1rem",
                fontWeight: "600",
                borderRadius: "12px",
                backgroundColor:
                  selectedFaculty && playerName ? "#0000dc" : "#9ca3af",
                color: "white",
                border: "none",
                cursor:
                  selectedFaculty && playerName ? "pointer" : "not-allowed",
                transition: "all 0.2s ease",
                transform:
                  selectedFaculty && playerName ? "scale(1)" : "scale(0.98)",
                opacity: selectedFaculty && playerName ? 1 : 0.7,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
              }}
              onMouseEnter={(e) => {
                if (selectedFaculty && playerName) {
                  e.target.style.backgroundColor = "#1a1a8a";
                  e.target.style.transform = "scale(1.02)";
                  e.target.style.boxShadow = "0 8px 20px rgba(0, 0, 220, 0.3)";
                }
              }}
              onMouseLeave={(e) => {
                if (selectedFaculty && playerName) {
                  e.target.style.backgroundColor = "#0000dc";
                  e.target.style.transform = "scale(1)";
                  e.target.style.boxShadow = "none";
                }
              }}
            >
              <Lock size={20} />
              Přihlásit se do univerzitní sítě
            </button>
          </div>
        </form>

        {/* Footer */}
        <div
          className="modal-description"
          style={{
            marginTop: "40px",
            paddingTop: "24px",
            borderTop: "1px solid #e5e7eb",
            textAlign: "center",
            backgroundColor: "#f8f9fa",
            margin: "40px -32px -32px -32px",
            padding: "24px 32px",
            borderRadius: "0 0 12px 12px",
          }}
        >
          <p
            style={{ color: "#0000dc", fontWeight: "500", margin: "0 0 8px 0" }}
          >
            © 2024 Masarykova univerzita | domména muni.cz
          </p>
          <p
            style={{
              margin: "0",
              fontSize: "0.8rem",
              color: "#10b981",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
            }}
          >
            <Shield size={16} color="#10b981" />
            Zabezpečené připojení aktivní
            <span
              style={{
                display: "inline-block",
                width: "8px",
                height: "8px",
                backgroundColor: "#10b981",
                borderRadius: "50%",
                animation: "pulse 2s infinite",
              }}
            ></span>
          </p>
        </div>
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

export default PersonalizationScreen;
