import React, { useState, useEffect } from "react";
import {
  Mail,
  Search,
  Archive,
  Trash2,
  Flag,
  Reply,
  MoreHorizontal,
  Star,
  Settings,
} from "lucide-react";
import { emails } from "../data/gameData";

const EmailScreen = ({
  selectedEmail,
  setSelectedEmail,
  playerName,
  onTerminalAccess,
  onEmailRead,
}) => {
  // Stav pro sledování přečtených emailů
  const [readEmails, setReadEmails] = useState(new Set());
  // Stav pro glitch efekt
  const [isGlitching, setIsGlitching] = useState(false);

  // Funkce pro spuštění glitch efektu - bez nebezpečného blikání
  const triggerGlitch = () => {
    setIsGlitching(true);
    // Jednoduché vypnutí po 2 sekundách
    setTimeout(() => setIsGlitching(false), 2000);
  };

  const selectedEmailData =
    emails.find((e) => e.id === selectedEmail) || emails[0];

  // Automaticky označit první email jako přečtený při načtení komponenty
  useEffect(() => {
    if (emails.length > 0) {
      const firstEmailId = emails[0].id;

      // Pokud není žádný email vybraný, vybere první
      if (!selectedEmail) {
        setSelectedEmail(firstEmailId);
      }

      // Označí první email jako přečtený
      setReadEmails((prev) => new Set([...prev, firstEmailId]));
    }
  }, []); // Spustí se pouze při prvním načtení komponenty

  // Funkce pro kliknutí na email - označí jako přečtený
  const handleEmailClick = (emailId) => {
    const wasAlreadyRead = readEmails.has(emailId);
    setSelectedEmail(emailId);
    setReadEmails((prev) => new Set([...prev, emailId]));
    
    // Pokud email nebyl přečtený, zavolej callback pro aktualizaci počtu
    if (!wasAlreadyRead && onEmailRead) {
      onEmailRead();
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "URGENT":
        return "#FF4444";
      case "KRITICKÁ":
        return "#FF0000";
      case "VYSOKÁ":
        return "#FF8800";
      default:
        return "#666";
    }
  };

  const getPriorityIcon = (priority) => {
    if (
      priority === "URGENT" ||
      priority === "KRITICKÁ" ||
      priority === "VYSOKÁ"
    ) {
      return (
        <Flag
          size={12}
          fill={getPriorityColor(priority)}
          color={getPriorityColor(priority)}
        />
      );
    }
    return null;
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        backgroundColor: "#f3f2f1",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        position: "relative",
      }}
    >
      {/* Vylepšený Glitch Overlay - černý motiv */}
      {isGlitching && (
        <>
          {/* Hlavní černý overlay */}
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.3)",
              pointerEvents: "none",
              zIndex: 1000,
            }}
          />

          {/* Diagonální glitch pruhy - více variant */}
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: `
                repeating-linear-gradient(
                  45deg,
                  transparent 0px,
                  transparent 30px,
                  rgba(255, 255, 255, 0.15) 30px,
                  rgba(255, 255, 255, 0.15) 32px
                ),
                repeating-linear-gradient(
                  -45deg,
                  transparent 0px,
                  transparent 60px,
                  rgba(128, 128, 128, 0.1) 60px,
                  rgba(128, 128, 128, 0.1) 62px
                )
              `,
              pointerEvents: "none",
              zIndex: 999,
            }}
          />

          {/* Více horizontálních glitch linek */}
          <div
            style={{
              position: "fixed",
              top: "15%",
              left: 0,
              width: "100%",
              height: "2px",
              backgroundColor: "#FFFFFF",
              pointerEvents: "none",
              zIndex: 1001,
              boxShadow: "0 0 4px #FFFFFF",
            }}
          />

          <div
            style={{
              position: "fixed",
              top: "25%",
              left: 0,
              width: "100%",
              height: "1px",
              backgroundColor: "#CCCCCC",
              pointerEvents: "none",
              zIndex: 1001,
              boxShadow: "0 0 3px #CCCCCC",
            }}
          />

          <div
            style={{
              position: "fixed",
              top: "35%",
              left: 0,
              width: "100%",
              height: "3px",
              backgroundColor: "#888888",
              pointerEvents: "none",
              zIndex: 1001,
              boxShadow: "0 0 6px #888888",
            }}
          />

          <div
            style={{
              position: "fixed",
              top: "55%",
              left: 0,
              width: "100%",
              height: "1px",
              backgroundColor: "#DDDDDD",
              pointerEvents: "none",
              zIndex: 1001,
              boxShadow: "0 0 2px #DDDDDD",
            }}
          />

          <div
            style={{
              position: "fixed",
              top: "65%",
              left: 0,
              width: "100%",
              height: "2px",
              backgroundColor: "#AAAAAA",
              pointerEvents: "none",
              zIndex: 1001,
              boxShadow: "0 0 5px #AAAAAA",
            }}
          />

          <div
            style={{
              position: "fixed",
              top: "80%",
              left: 0,
              width: "100%",
              height: "1px",
              backgroundColor: "#FFFFFF",
              pointerEvents: "none",
              zIndex: 1001,
              boxShadow: "0 0 3px #FFFFFF",
            }}
          />

          {/* Vertikální glitch čáry */}
          <div
            style={{
              position: "fixed",
              top: 0,
              left: "20%",
              width: "2px",
              height: "100%",
              backgroundColor: "#BBBBBB",
              pointerEvents: "none",
              zIndex: 1001,
              boxShadow: "0 0 4px #BBBBBB",
            }}
          />

          <div
            style={{
              position: "fixed",
              top: 0,
              left: "60%",
              width: "1px",
              height: "100%",
              backgroundColor: "#DDDDDD",
              pointerEvents: "none",
              zIndex: 1001,
              boxShadow: "0 0 2px #DDDDDD",
            }}
          />

          <div
            style={{
              position: "fixed",
              top: 0,
              left: "85%",
              width: "3px",
              height: "100%",
              backgroundColor: "#999999",
              pointerEvents: "none",
              zIndex: 1001,
              boxShadow: "0 0 6px #999999",
            }}
          />

          {/* Grayscale posun efekt */}
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              pointerEvents: "none",
              zIndex: 997,
              mixBlendMode: "overlay",
              background:
                "linear-gradient(90deg, rgba(0,0,0,0.1) 0%, rgba(128,128,128,0.05) 33%, rgba(255,255,255,0.1) 66%, rgba(64,64,64,0.08) 100%)",
            }}
          />

          {/* Výrazná glitchnutá chybová hláška */}
          <div
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "rgba(0, 0, 0, 0.95)",
              color: "#FFFFFF",
              padding: "30px 40px",
              border: "2px solid #FFFFFF",
              fontFamily: "monospace",
              fontSize: "16px",
              pointerEvents: "none",
              zIndex: 1002,
              textAlign: "center",
              boxShadow: "0 0 20px rgba(255, 255, 255, 0.3)",
            }}
          >
            <div
              style={{
                marginBottom: "12px",
                letterSpacing: "3px",
                fontSize: "18px",
                fontWeight: "bold",
                color: "#FF0000",
              }}
            >
              SY█TÉ█ █ED█S██PNÝ
            </div>

            <div
              style={{
                fontSize: "14px",
                color: "#CCCCCC",
                marginBottom: "10px",
                letterSpacing: "1px",
              }}
            >
              ER█O█: 0x█0█2█F█8█A
            </div>

            <div
              style={{
                fontSize: "15px",
                color: "#FFAAAA",
                fontWeight: "bold",
                letterSpacing: "2px",
              }}
            >
              █EZ█Á█Á ██YBA
            </div>

            <div
              style={{
                fontSize: "12px",
                color: "#888888",
                marginTop: "15px",
                letterSpacing: "1px",
              }}
            >
              ┌─ SYSTÉM NESTABILNÍ ─┐
            </div>
          </div>

          {/* Další glitch elementy - roztroušené blocky */}
          <div
            style={{
              position: "fixed",
              top: "10%",
              right: "10%",
              width: "80px",
              height: "3px",
              backgroundColor: "#FFFFFF",
              pointerEvents: "none",
              zIndex: 1001,
              boxShadow: "0 0 8px #FFFFFF",
            }}
          />

          <div
            style={{
              position: "fixed",
              bottom: "20%",
              left: "15%",
              width: "60px",
              height: "2px",
              backgroundColor: "#AAAAAA",
              pointerEvents: "none",
              zIndex: 1001,
              boxShadow: "0 0 6px #AAAAAA",
            }}
          />

          <div
            style={{
              position: "fixed",
              top: "70%",
              right: "30%",
              width: "100px",
              height: "1px",
              backgroundColor: "#DDDDDD",
              pointerEvents: "none",
              zIndex: 1001,
              boxShadow: "0 0 4px #DDDDDD",
            }}
          />
        </>
      )}

      {/* Top Navigation Bar */}
      <div
        style={{
          backgroundColor: "#0078d4",
          color: "white",
          padding: "8px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Mail size={20} />
          <span style={{ fontSize: "16px", fontWeight: "600" }}>Outlook</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <span style={{ fontSize: "14px" }}>{playerName}@mail.muni.cz</span>
          <Settings size={16} />
        </div>
      </div>

      {/* Main Toolbar */}
      <div
        style={{
          backgroundColor: "#ffffff",
          borderBottom: "1px solid #e1dfdd",
          padding: "12px 16px",
          display: "flex",
          alignItems: "center",
          gap: "16px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <button
            onClick={triggerGlitch}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "8px 12px",
              backgroundColor: "#f3f2f1",
              border: "1px solid #d2d0ce",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "14px",
              color: "#000000",
            }}
          >
            <Archive size={16} color="#000000" />
            Archivovat
          </button>
          <button
            onClick={triggerGlitch}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "8px 12px",
              backgroundColor: "#f3f2f1",
              border: "1px solid #d2d0ce",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "14px",
              color: "#000000",
            }}
          >
            <Trash2 size={16} color="#000000" />
            Odstranit
          </button>
          <button
            onClick={triggerGlitch}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "8px 12px",
              backgroundColor: "#f3f2f1",
              border: "1px solid #d2d0ce",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "14px",
              color: "#000000",
            }}
          >
            <Reply size={16} color="#000000" />
            Odpovědět
          </button>
        </div>

        <div
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            maxWidth: "400px",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "300px",
            }}
          >
            <Search
              size={16}
              style={{
                position: "absolute",
                left: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#605e5c",
              }}
            />
            <input
              type="text"
              placeholder="Hledat v mailboxu"
              onClick={triggerGlitch}
              style={{
                width: "100%",
                padding: "8px 12px 8px 36px",
                border: "1px solid #d2d0ce",
                borderRadius: "4px",
                fontSize: "14px",
                backgroundColor: "#ffffff",
                boxSizing: "border-box",
              }}
            />
          </div>
        </div>
      </div>

      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {/* Left Sidebar */}
        <div
          style={{
            width: "200px",
            backgroundColor: "#faf9f8",
            borderRight: "1px solid #e1dfdd",
            padding: "16px 0",
          }}
        >
          <div style={{ padding: "0 16px", marginBottom: "16px" }}>
            <h3
              style={{
                margin: "0 0 12px 0",
                fontSize: "14px",
                fontWeight: "600",
                color: "#323130",
              }}
            >
              Složky
            </h3>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                padding: "8px 16px",
                backgroundColor: "#deecf9",
                borderRight: "3px solid #0078d4",
                color: "#0078d4",
                fontWeight: "600",
                fontSize: "14px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <Mail size={16} />
              Doručená pošta
              <span
                style={{
                  marginLeft: "auto",
                  backgroundColor: "#0078d4",
                  color: "white",
                  borderRadius: "10px",
                  padding: "2px 6px",
                  fontSize: "12px",
                  minWidth: "20px",
                  textAlign: "center",
                }}
              >
                {emails.length - readEmails.size}
              </span>
            </div>

            <div
              onClick={triggerGlitch}
              style={{
                padding: "8px 16px",
                fontSize: "14px",
                color: "#605e5c",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                cursor: "pointer",
              }}
            >
              <Star size={16} />
              Označené
            </div>

            <div
              onClick={triggerGlitch}
              style={{
                padding: "8px 16px",
                fontSize: "14px",
                color: "#605e5c",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                cursor: "pointer",
              }}
            >
              <Archive size={16} />
              Archiv
            </div>

            <div
              onClick={triggerGlitch}
              style={{
                padding: "8px 16px",
                fontSize: "14px",
                color: "#605e5c",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                cursor: "pointer",
              }}
            >
              <Trash2 size={16} />
              Koš
            </div>
          </div>
        </div>

        {/* Email List */}
        <div
          style={{
            width: "350px",
            backgroundColor: "#ffffff",
            borderRight: "1px solid #e1dfdd",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              padding: "12px 16px",
              borderBottom: "1px solid #e1dfdd",
              backgroundColor: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <h2
              style={{
                margin: "0",
                fontSize: "15px",
                fontWeight: "600",
                color: "#323130",
              }}
            >
              Doručená pošta
            </h2>
            <span
              style={{
                fontSize: "13px",
                color: "#605e5c",
              }}
            >
              {emails.length - readEmails.size} nepřečtených
            </span>
          </div>

          <div style={{ overflow: "auto", flex: 1 }}>
            {emails.map((email) => (
              <div
                key={email.id}
                onClick={() => handleEmailClick(email.id)}
                style={{
                  padding: "12px 16px",
                  borderBottom: "1px solid #f3f2f1",
                  cursor: "pointer",
                  backgroundColor:
                    selectedEmail === email.id
                      ? "#e8f4f8"
                      : readEmails.has(email.id)
                      ? "#ffffff"
                      : "#fef6e6",
                  borderLeft:
                    selectedEmail === email.id
                      ? "4px solid #0078d4"
                      : readEmails.has(email.id)
                      ? "4px solid transparent"
                      : "4px solid #ffaa44",
                  transition: "all 0.15s ease",
                  borderRight: selectedEmail === email.id ? "1px solid #cce8f0" : "none",
                }}
                onMouseEnter={(e) => {
                  if (selectedEmail !== email.id) {
                    e.currentTarget.style.backgroundColor = "#f3f2f1";
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedEmail !== email.id) {
                    e.currentTarget.style.backgroundColor = readEmails.has(email.id)
                      ? "#ffffff"
                      : "#fef6e6";
                  }
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "8px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <div
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        backgroundColor: "#0078d4",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                        fontSize: "16px",
                        fontWeight: "600",
                        flexShrink: 0,
                        marginRight: "12px",
                      }}
                    >
                      {email.from.charAt(0).toUpperCase()}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          fontSize: "15px",
                          fontWeight: readEmails.has(email.id) ? "400" : "600",
                          color: "#323130",
                          marginBottom: "4px",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {email.from}
                      </div>
                      <div
                        style={{
                          fontSize: "14px",
                          fontWeight: readEmails.has(email.id) ? "400" : "600",
                          color: "#323130",
                          marginBottom: "6px",
                          lineHeight: "1.3",
                        }}
                      >
                        {email.subject}
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      flexShrink: 0,
                    }}
                  >
                    {getPriorityIcon(email.priority)}
                    <span
                      style={{
                        fontSize: "12px",
                        color: "#605e5c",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {email.time}
                    </span>
                  </div>
                </div>

                <p
                  style={{
                    margin: "0",
                    fontSize: "13px",
                    color: "#605e5c",
                    lineHeight: "1.4",
                    overflow: "hidden",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    marginTop: "4px",
                  }}
                >
                  {email.content
                    ? email.content.replace(/<[^>]*>/g, "").substring(0, 120) +
                      "..."
                    : ""}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Email Detail */}
        <div
          style={{
            flex: 1,
            backgroundColor: "#ffffff",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {selectedEmailData ? (
            <>
              <div
                style={{
                  padding: "20px 24px",
                  borderBottom: "1px solid #e1dfdd",
                  backgroundColor: "#ffffff",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "16px",
                  }}
                >
                  <h1
                    style={{
                      margin: "0 0 16px 0",
                      fontSize: "22px",
                      fontWeight: "400",
                      color: "#323130",
                      lineHeight: "1.3",
                    }}
                  >
                    {selectedEmailData.subject}
                  </h1>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <button
                      onClick={triggerGlitch}
                      style={{
                        padding: "6px 12px",
                        backgroundColor: "#0078d4",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                        fontSize: "14px",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      <Reply size={14} />
                      Odpovědět
                    </button>
                    <button
                      onClick={triggerGlitch}
                      style={{
                        padding: "6px",
                        backgroundColor: "#f3f2f1",
                        border: "1px solid #d2d0ce",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                    >
                      <MoreHorizontal size={14} />
                    </button>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "12px",
                    paddingTop: "12px",
                    borderTop: "1px solid #e1dfdd",
                  }}
                >
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "50%",
                      backgroundColor: "#0078d4",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      fontSize: "18px",
                      fontWeight: "600",
                      flexShrink: 0,
                    }}
                  >
                    {selectedEmailData.from.charAt(0).toUpperCase()}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontSize: "15px",
                        fontWeight: "600",
                        color: "#323130",
                        marginBottom: "4px",
                      }}
                    >
                      {selectedEmailData.from}
                    </div>
                    <div
                      style={{
                        fontSize: "13px",
                        color: "#605e5c",
                        marginBottom: "8px",
                      }}
                    >
                      {selectedEmailData.email}
                    </div>
                    <div
                      style={{
                        fontSize: "12px",
                        color: "#8a8886",
                      }}
                    >
                      {selectedEmailData.time}
                    </div>
                  </div>
                  {getPriorityIcon(selectedEmailData.priority) && (
                    <div
                      style={{
                        marginLeft: "auto",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                        padding: "4px 8px",
                        backgroundColor:
                          getPriorityColor(selectedEmailData.priority) + "15",
                        borderRadius: "12px",
                        fontSize: "12px",
                        color: getPriorityColor(selectedEmailData.priority),
                      }}
                    >
                      {getPriorityIcon(selectedEmailData.priority)}
                      {selectedEmailData.priority}
                    </div>
                  )}
                </div>
              </div>

              <div
                style={{
                  flex: 1,
                  padding: "24px",
                  overflow: "auto",
                }}
              >
                <div
                  style={{
                    fontSize: "14px",
                    lineHeight: "1.6",
                    color: "#323130",
                  }}
                  dangerouslySetInnerHTML={{
                    __html: selectedEmailData.content,
                  }}
                />

                {selectedEmailData.id === 3 && (
                  <div
                    style={{
                      marginTop: "32px",
                      textAlign: "center",
                      padding: "20px",
                      backgroundColor: "#ffffff",
                      borderRadius: "4px",
                      border: "2px solid #0000dc",
                      boxShadow: "0 0 10px rgba(0, 0, 220, 0.3)",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "13px",
                        color: "#00ff00",
                        fontFamily: "monospace",
                        marginBottom: "8px",
                        fontWeight: "bold",
                        letterSpacing: "1px",
                      }}
                    >
                      [INFO] TERMINÁLOVÝ PŘÍSTUP POVOLEN
                    </div>

                    <div
                      style={{
                        fontSize: "12px",
                        color: "#4d4dff",
                        fontFamily: "monospace",
                        marginBottom: "16px",
                        letterSpacing: "0.5px",
                      }}
                    >
                      ssh://terminal.muni.cz:22 • AES-256 SECURED
                    </div>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "8px",
                        marginBottom: "12px",
                      }}
                    >
                      <span
                        style={{
                          color: "#0000dc",
                          fontFamily: "monospace",
                          fontSize: "14px",
                        }}
                      >
                        muni-agent@emergency:~$
                      </span>
                      <button
                        onClick={onTerminalAccess}
                        style={{
                          padding: "8px 16px",
                          fontSize: "13px",
                          fontWeight: "bold",
                          backgroundColor: "rgba(0, 0, 220, 0.1)",
                          color: "#0000dc",
                          border: "1px solid #0000dc",
                          borderRadius: "2px",
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                          fontFamily: "monospace",
                          letterSpacing: "0.5px",
                        }}
                        onMouseOver={(e) => {
                          e.target.style.backgroundColor = "#0000dc";
                          e.target.style.color = "white";
                          e.target.style.boxShadow =
                            "0 0 8px rgba(0, 0, 220, 0.4)";
                        }}
                        onMouseOut={(e) => {
                          e.target.style.backgroundColor =
                            "rgba(0, 0, 220, 0.1)";
                          e.target.style.color = "#0000dc";
                          e.target.style.boxShadow = "none";
                        }}
                      >
                        run terminal_access
                      </button>
                    </div>

                    <div
                      style={{
                        fontSize: "11px",
                        color: "#666699",
                        fontFamily: "monospace",
                        borderTop: "1px solid rgba(0, 0, 220, 0.2)",
                        paddingTop: "8px",
                      }}
                    >
                      ┌─ SECURE CONNECTION ESTABLISHED ─┐
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#605e5c",
              }}
            >
              <div style={{ textAlign: "center" }}>
                <Mail
                  size={48}
                  style={{ marginBottom: "16px", color: "#d2d0ce" }}
                />
                <p>Vyberte email pro zobrazení</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailScreen;
