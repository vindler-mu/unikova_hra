import React, { useState, useEffect } from "react";

const DesktopScreen = ({
  playerName,
  selectedFaculty,
  onEmailClick,
  onLogout,
}) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [startMenuOpen, setStartMenuOpen] = useState(false);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const showHackedAlert = (appName) => {
    alert(
      `⚠️ SYSTÉM KOMPROMITOVÁN ⚠️\n\n${appName} neodpovídá.\n\nChyba: Přístup odepřen\nKód: 0x80070005\n\nSystém byl napaden malwarem.\nKontaktujte IT podporu.`
    );
  };

  const iconRows = {
    row1: [
      {
        id: "email",
        icon: "📧",
        label: "MUNI\nMail",
        notification: 3,
        onClick: onEmailClick,
      },
    ],
    row2: [
      {
        id: "folder",
        icon: "📁",
        label: "Dokumenty",
        onClick: () => showHackedAlert("Dokumenty"),
      },
      {
        id: "onedrive",
        icon: "☁️",
        label: "OneDrive",
        onClick: () => showHackedAlert("OneDrive"),
      },
    ],
    row3: [
      {
        id: "browser",
        icon: "🌐",
        label: "Microsoft\nEdge",
        onClick: () => showHackedAlert("Microsoft Edge"),
      },
      {
        id: "word",
        icon: "📝",
        label: "Microsoft\nWord",
        onClick: () => showHackedAlert("Microsoft Word"),
      },
      {
        id: "excel",
        icon: "📊",
        label: "Microsoft\nExcel",
        onClick: () => showHackedAlert("Microsoft Excel"),
      },
      {
        id: "teams",
        icon: "💬",
        label: "Microsoft\nTeams",
        onClick: () => showHackedAlert("Microsoft Teams"),
      },
    ],
    row4: [
      {
        id: "recycle",
        icon: "🗑️",
        label: "Koš",
        onClick: () => showHackedAlert("Koš"),
      },
    ],
  };

  // Jednotná komponenta pro ikonu - bez bílého rámečku
  const DesktopIcon = ({ iconData }) => (
    <div
      className="desktop-icon"
      onClick={iconData.onClick}
      style={{
        display: "inline-block",
        marginRight: "16px",
        textAlign: "center",
        width: "80px",
        cursor: "pointer",
        transition: "transform 0.2s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
      }}
    >
      <div
        className="desktop-icon-image"
        style={{
          background: "transparent",
          position: "relative",
          width: "64px",
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 8px auto",
          filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))",
        }}
      >
        {iconData.id === "email" ? (
          <img
            src={`${process.env.PUBLIC_URL}/media/outlook.webp`}
            alt="MUNI Mail"
            style={{ width: "48px", height: "48px", objectFit: "contain" }}
          />
        ) : iconData.id === "onedrive" ? (
          <img
            src={`${process.env.PUBLIC_URL}/media/onedrive.jpg`}
            alt="OneDrive"
            style={{ width: "48px", height: "48px", objectFit: "contain" }}
          />
        ) : iconData.id === "browser" ? (
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/9/98/Microsoft_Edge_logo_%282019%29.svg"
            alt="Microsoft Edge"
            style={{ width: "48px", height: "48px", objectFit: "contain" }}
          />
        ) : iconData.id === "word" ? (
          <img
            src={`${process.env.PUBLIC_URL}/media/word.png`}
            alt="Microsoft Word"
            style={{ width: "48px", height: "48px", objectFit: "contain" }}
          />
        ) : iconData.id === "excel" ? (
          <img
            src={`${process.env.PUBLIC_URL}/media/excel.png`}
            alt="Microsoft Excel"
            style={{ width: "48px", height: "48px", objectFit: "contain" }}
          />
        ) : iconData.id === "teams" ? (
          <img
            src={`${process.env.PUBLIC_URL}/media/teams.svg`}
            alt="Microsoft Teams"
            style={{ width: "48px", height: "48px", objectFit: "contain" }}
          />
        ) : (
          <span style={{ fontSize: "3rem" }}>{iconData.icon}</span>
        )}

        {/* Notification badge pro email */}
        {iconData.notification && (
          <div
            className="notification-badge"
            style={{
              position: "absolute",
              top: "-8px",
              right: "-8px",
              background: "#ef4444",
              color: "white",
              borderRadius: "50%",
              width: "24px",
              height: "24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.75rem",
              fontWeight: "bold",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
              zIndex: 10,
            }}
          >
            {iconData.notification}
          </div>
        )}
      </div>

      {/* Text pod ikonou - jednotný pro všechny */}
      <div
        style={{
          textShadow: "1px 1px 2px rgba(0,0,0,0.8)",
          fontSize: "0.8rem",
          fontWeight: "500",
          textAlign: "center",
          whiteSpace: "pre-line",
          lineHeight: "1.1",
          color: "white",
          width: "100%",
        }}
      >
        {iconData.label}
      </div>
    </div>
  );

  return (
    <div
      className="desktop-screen"
      style={{
        background: `linear-gradient(135deg, 
        ${selectedFaculty?.color || "#0078d4"} 0%, 
        ${selectedFaculty?.color || "#0078d4"}88 50%, 
        ${selectedFaculty?.color || "#0078d4"}66 100%)`,
      }}
    >
      {/* Desktop Icons - Organizovaný layout s jednotným stylováním */}
      <div style={{ position: "absolute", top: "32px", left: "32px" }}>
        {/* Row 1: Email samostatně */}
        <div style={{ marginBottom: "24px" }}>
          {iconRows.row1.map((iconData) => (
            <DesktopIcon key={iconData.id} iconData={iconData} />
          ))}
        </div>

        {/* Row 2: Dokumenty a OneDrive */}
        <div style={{ marginBottom: "24px" }}>
          {iconRows.row2.map((iconData) => (
            <DesktopIcon key={iconData.id} iconData={iconData} />
          ))}
        </div>

        {/* Row 3: Ostatní aplikace v jednom řádku */}
        <div style={{ marginBottom: "24px" }}>
          {iconRows.row3.map((iconData) => (
            <DesktopIcon key={iconData.id} iconData={iconData} />
          ))}
        </div>

        {/* Row 4: Koš */}
        <div>
          {iconRows.row4.map((iconData) => (
            <DesktopIcon key={iconData.id} iconData={iconData} />
          ))}
        </div>
      </div>

      {/* Email Notification popup */}
      <div
        className="desktop-notification"
        onClick={onEmailClick}
        style={{
          background: "rgba(255, 255, 255, 0.98)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(0,0,0,0.1)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
          <div
            className="desktop-icon-image"
            style={{
              width: "40px",
              height: "40px",
              fontSize: "1.25rem",
              background: "#0078d4",
              color: "white",
            }}
          >
            📧
          </div>
          <div style={{ flex: 1 }}>
            <h4
              className="email-from"
              style={{
                margin: "0 0 4px 0",
                fontSize: "0.9rem",
                fontWeight: "600",
              }}
            >
              MUNI Mail
            </h4>
            <p
              className="email-subject"
              style={{ margin: "0 0 4px 0", fontSize: "0.85rem" }}
            >
              <strong>Máte 3 nepřečtené zprávy</strong>
            </p>
            <p
              className="email-time"
              style={{ margin: "0", fontSize: "0.75rem", color: "#d32f2f" }}
            >
              🚨 Kritické: Systém IGRAM kompromitován
            </p>
          </div>
        </div>
      </div>

      {/* Welcome text */}
      <div
        style={{
          position: "absolute",
          bottom: "120px",
          left: "50%",
          transform: "translateX(-50%)",
          textAlign: "center",
          background: "rgba(0,0,0,0.3)",
          backdropFilter: "blur(8px)",
          borderRadius: "12px",
          padding: "16px 24px",
          border: "1px solid rgba(255,255,255,0.2)",
        }}
      >
        <h1
          style={{
            color: "white",
            fontSize: "1.5rem",
            fontWeight: "300",
            marginBottom: "8px",
            textShadow: "0 2px 4px rgba(0,0,0,0.5)",
          }}
        >
          Vítejte, {playerName}
        </h1>
        <p
          style={{
            color: "#e2e8f0",
            fontSize: "0.9rem",
            margin: "0",
          }}
        >
          {selectedFaculty?.name} | MUNI Student Workspace
        </p>
      </div>

      {/* Start Menu */}
      {startMenuOpen && (
        <div
          style={{
            position: "absolute",
            bottom: "48px",
            left: "12px",
            width: "320px",
            height: "400px",
            background: "rgba(255, 255, 255, 0.98)",
            backdropFilter: "blur(10px)",
            borderRadius: "8px",
            border: "1px solid rgba(0,0,0,0.1)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
            padding: "16px",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              borderBottom: "1px solid #e5e7eb",
              paddingBottom: "12px",
              marginBottom: "12px",
            }}
          >
            <h3 style={{ margin: "0", color: "#0078d4", fontSize: "1rem" }}>
              Microsoft Office
            </h3>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "8px",
            }}
          >
            {[
              { icon: "word", name: "Word", color: "#2b579a" },
              { icon: "excel", name: "Excel", color: "#217346" },
              { icon: "powerpoint", name: "PowerPoint", color: "#d24726" },
              { icon: "outlook", name: "Outlook", color: "#0078d4" },
              { icon: "teams", name: "Teams", color: "#6264a7" },
              { icon: "onedrive", name: "OneDrive", color: "#0078d4" },
            ].map((app, index) => (
              <div
                key={index}
                style={{
                  padding: "12px",
                  borderRadius: "6px",
                  cursor: "pointer",
                  transition: "background-color 0.2s",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "#f3f4f6")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = "transparent")
                }
                onClick={() => showHackedAlert(app.name)}
              >
                {app.icon === "word" ? (
                  <img
                    src={`${process.env.PUBLIC_URL}/media/word.png`}
                    alt="Word"
                    style={{ width: "20px", height: "20px" }}
                  />
                ) : app.icon === "excel" ? (
                  <img
                    src={`${process.env.PUBLIC_URL}/media/excel.png`}
                    alt="Excel"
                    style={{ width: "20px", height: "20px" }}
                  />
                ) : app.icon === "powerpoint" ? (
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/0/0d/Microsoft_Office_PowerPoint_%282019–present%29.svg"
                    alt="PowerPoint"
                    style={{ width: "20px", height: "20px" }}
                  />
                ) : app.icon === "outlook" ? (
                  <img
                    src={`${process.env.PUBLIC_URL}/media/outlook.webp`}
                    alt="Outlook"
                    style={{ width: "20px", height: "20px" }}
                  />
                ) : app.icon === "teams" ? (
                  <img
                    src={`${process.env.PUBLIC_URL}/media/teams.svg`}
                    alt="Teams"
                    style={{ width: "20px", height: "20px" }}
                  />
                ) : app.icon === "onedrive" ? (
                  <img
                    src={`${process.env.PUBLIC_URL}/media/onedrive.jpg`}
                    alt="OneDrive"
                    style={{ width: "20px", height: "20px" }}
                  />
                ) : (
                  <span style={{ fontSize: "1.2rem" }}>📝</span>
                )}
                <span style={{ fontSize: "0.85rem", color: app.color }}>
                  {app.name}
                </span>
              </div>
            ))}
          </div>

          <div
            style={{
              position: "absolute",
              bottom: "16px",
              left: "16px",
              right: "16px",
              borderTop: "1px solid #e5e7eb",
              paddingTop: "12px",
            }}
          >
            <button
              style={{
                width: "100%",
                padding: "8px",
                background: "#dc3545",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "0.85rem",
              }}
              onClick={onLogout}
            >
              🔓 Odhlásit se
            </button>
          </div>
        </div>
      )}

      {/* Windows Taskbar */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "48px",
          background: "rgba(0, 0, 0, 0.8)",
          backdropFilter: "blur(10px)",
          borderTop: "1px solid rgba(255,255,255,0.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 12px",
          zIndex: 999,
        }}
      >
        {/* Start Button */}
        <button
          onClick={() => setStartMenuOpen(!startMenuOpen)}
          style={{
            background: startMenuOpen ? "rgba(255,255,255,0.2)" : "transparent",
            border: "none",
            color: "white",
            padding: "8px 16px",
            borderRadius: "4px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "0.9rem",
            fontWeight: "500",
            transition: "background-color 0.2s",
          }}
          onMouseEnter={(e) => {
            if (!startMenuOpen)
              e.target.style.background = "rgba(255,255,255,0.1)";
          }}
          onMouseLeave={(e) => {
            if (!startMenuOpen) e.target.style.background = "transparent";
          }}
        >
          <div
            style={{
              width: "20px",
              height: "20px",
              background: "#0078d4",
              borderRadius: "2px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "10px",
              fontWeight: "bold",
            }}
          >
            ⊞
          </div>
          Start
        </button>

        {/* Taskbar Apps */}
        <div
          style={{ display: "flex", gap: "4px", flex: 1, marginLeft: "16px" }}
        >
          {/* Running apps */}
          <div
            onClick={onEmailClick}
            style={{
              background: "rgba(255,255,255,0.15)",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: "4px",
              padding: "8px 12px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "0.85rem",
              color: "white",
            }}
          >
            📧 MUNI Mail
            <div
              style={{
                background: "#dc3545",
                color: "white",
                borderRadius: "10px",
                padding: "2px 6px",
                fontSize: "0.7rem",
                fontWeight: "bold",
              }}
            >
              3
            </div>
          </div>
        </div>

        {/* System Tray */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            color: "white",
            fontSize: "0.85rem",
          }}
        >
          {/* Network */}
          <div style={{ cursor: "pointer" }} title="Připojeno k MUNI síti">
            📶
          </div>

          {/* Volume */}
          <div style={{ cursor: "pointer" }} title="Hlasitost">
            🔊
          </div>

          {/* Time and Date */}
          <div
            style={{
              textAlign: "right",
              lineHeight: "1.2",
              minWidth: "80px",
              cursor: "pointer",
            }}
          >
            <div style={{ fontWeight: "500" }}>
              {currentTime.toLocaleTimeString("cs-CZ", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
            <div style={{ fontSize: "0.75rem", opacity: 0.8 }}>
              {currentTime.toLocaleDateString("cs-CZ", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Click outside to close start menu */}
      {startMenuOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 998,
          }}
          onClick={() => setStartMenuOpen(false)}
        />
      )}
    </div>
  );
};

export default DesktopScreen;
