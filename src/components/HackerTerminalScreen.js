import React from "react";

const HackerTerminalScreen = ({
  terminalInput,
  setTerminalInput,
  terminalError,
  setTerminalError,
  terminalLoading,
  loadingStep,
  playerName,
  selectedFaculty,
  onComplete,
}) => {
  // Uložení časů pro jednotlivé kroky
  const [stepTimes, setStepTimes] = React.useState({});

  // State pro zobrazení/skrytí hintu
  const [showHint, setShowHint] = React.useState(false);

  // NOVÉ: State pro dynamické logy jako v OverviewScreen
  const [dynamicLogs, setDynamicLogs] = React.useState([]);

  React.useEffect(() => {
    document.body.style.overflow = "visible";
    document.documentElement.style.overflow = "visible";
    document.body.style.height = "auto";
    document.documentElement.style.height = "auto";
  }, []);

  // Efekt pro uložení času při zobrazení nového kroku
  React.useEffect(() => {
    if (loadingStep >= 0 && !stepTimes[loadingStep]) {
      setStepTimes((prev) => ({
        ...prev,
        [loadingStep]: new Date().toLocaleTimeString(),
      }));
    }
  }, [loadingStep, stepTimes]);

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

  // NOVÉ: Funkce pro přehrání zvuku (dočasná implementace)
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

  // NOVÉ: Funkce pro zpracování příkazů s logy a zvuky
  const handleCommand = (e) => {
    if (e.key === "Enter") {
      const cmd = terminalInput.toLowerCase().trim();

      if (cmd === "run restore protocol") {
        // Úspěšný příkaz
        playSound("success");
        setDynamicLogs((prev) => [
          ...prev,
          {
            time: new Date().toLocaleTimeString(),
            message: "[EXEC] Aktivace obranného systému - spouštění mise...",
          },
        ]);

        setTimeout(() => {
          setDynamicLogs((prev) => [
            ...prev,
            {
              time: new Date().toLocaleTimeString(),
              message: "[OK] Protokol aktivován - přesun do mise",
            },
          ]);

          setTimeout(() => {
            playSound("complete");
            onComplete();
          }, 1000);
        }, 800);
      } else {
        // Chybný příkaz
        playSound("error");
        setDynamicLogs((prev) => [
          ...prev,
          {
            time: new Date().toLocaleTimeString(),
            message: `[ERROR] bash: ${terminalInput}: command not found`,
          },
        ]);

        setTerminalError(`bash: ${terminalInput}: command not found`);
        setTimeout(() => setTerminalError(""), 3000);
      }

      setTerminalInput("");
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
            root@muni-security:/emergency_protocol$
          </span>
        </div>

        {/* Terminal content */}
        <div className="terminal-content">
          {/* ASCII Art */}
          <pre className="ascii-art">
            {`
███╗   ███╗ ██╗   ██╗ ███╗   ██╗ ██╗
████╗ ████║ ██║   ██║ ████╗  ██║ ██║
██╔████╔██║ ██║   ██║ ██╔██╗ ██║ ██║
██║╚██╔╝██║ ██║   ██║ ██║╚██╗██║ ██║
██║ ╚═╝ ██║ ╚██████╔╝ ██║ ╚████║ ██║
╚═╝     ╚═╝  ╚═════╝  ╚═╝  ╚═══╝ ╚═╝

  [MASARYK UNIVERSITY | CRISIS PROTOCOL]
`}
          </pre>

          <div className="terminal-section">
            <div className="command-line">
              <span className="terminal-prompt">$</span>
              <span className="command-text">
                inicializace_krizoveho_protokolu
              </span>
              <span className="status-connected">[PŘIPOJEN]</span>
            </div>

            {/* Loading sequence s přeuspořádanými logy */}
            <div className="loading-section">
              <div className="log-container">
                <div className="log-content">
                  {loadingStep >= 0 && (
                    <div className="log-line">
                      <span className="log-timestamp">
                        [{stepTimes[0] || new Date().toLocaleTimeString()}]
                      </span>{" "}
                      {formatLogMessage(
                        "[INFO] Načítání mise: Obnovení systému IGRAM"
                      )}
                    </div>
                  )}

                  {loadingStep >= 1 && (
                    <div className="log-line" style={{ marginBottom: "24px" }}>
                      <span className="log-timestamp">
                        [{stepTimes[1] || new Date().toLocaleTimeString()}]
                      </span>{" "}
                      {formatLogMessage(
                        "[INIT] Inicializace systémového záznamu"
                      )}
                    </div>
                  )}

                  {/* ZOBRAZIT SYSTEM LOG BOX AŽ PO DRUHÉM KROKU */}
                  {loadingStep >= 2 && (
                    <div
                      className="system-status-bar compromised"
                      style={{ marginBottom: "24px" }}
                    >
                      <div className="status-header">[system log]</div>
                      <div className="status-content">
                        <div>
                          {">"} Stav IGRAM:{" "}
                          <span className="status-compromised">NAPADENO</span>
                        </div>
                        <div>
                          {">"} Databáze MUNI:{" "}
                          <span className="status-compromised">
                            KOMPROMITOVÁNO
                          </span>
                        </div>
                        <div>
                          {">"} Obnovovací číselná kód:{" "}
                          <span className="status-compromised">
                            NEDOSTUPNÉ - NUTNÉ ZÍSKAT
                          </span>
                        </div>
                        <div>
                          {">"} Komunikace:{" "}
                          <span className="status-authenticated">
                            ČÁSTEČNĚ OBNOVENA
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {loadingStep >= 2 && (
                    <div className="log-line">
                      <span className="log-timestamp">
                        [{stepTimes[2] || new Date().toLocaleTimeString()}]
                      </span>{" "}
                      {formatLogMessage(
                        "[ERROR] Analýza poškození: 4 okruhy kompromitovány"
                      )}
                    </div>
                  )}

                  {loadingStep >= 3 && (
                    <div className="log-line" style={{ marginBottom: "24px" }}>
                      <span className="log-timestamp">
                        [{stepTimes[3] || new Date().toLocaleTimeString()}]
                      </span>{" "}
                      {formatLogMessage(
                        "[INIT] Inicializace defenzivních protokolů"
                      )}
                    </div>
                  )}

                  {/* ZOBRAZIT TASK LOG BOX AŽ PO ČTVRTÉM KROKU */}
                  {loadingStep >= 4 && (
                    <div
                      className="system-status-bar"
                      style={{ marginBottom: "24px" }}
                    >
                      <div className="status-header">[task log]</div>
                      <div className="status-content">
                        <div>
                          {">"} <b>SITUACE: </b> Systém IGRAM byl napaden a
                          tranformován do systému Algor
                        </div>
                        <div>
                          {">"} <b>MISE:</b> Obnova systému IGRAM do původní
                          podoby
                        </div>
                        <div>
                          {">"} <b>AGENT:</b> {playerName} -{" "}
                          {selectedFaculty?.shortName}
                        </div>
                        <div>
                          {">"} <b>STATUS:</b>{" "}
                          <span className="status-authenticated">
                            VERIFIKOVÁNO
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {loadingStep >= 4 && (
                    <div className="log-line">
                      <span className="log-timestamp">
                        [{stepTimes[4] || new Date().toLocaleTimeString()}]
                      </span>{" "}
                      {formatLogMessage(
                        "[WARN] Upozornění: Nestabilita v odpovědích povede k destrukci databáze"
                      )}
                    </div>
                  )}

                  {loadingStep >= 5 && (
                    <div className="log-line">
                      <span className="log-timestamp">
                        [{stepTimes[5] || new Date().toLocaleTimeString()}]
                      </span>{" "}
                      {formatLogMessage(
                        "[INFO] Při nejasnostech volej knihovníka."
                      )}
                    </div>
                  )}

                  {loadingStep >= 6 && (
                    <div className="log-line">
                      <span className="log-timestamp">
                        [{stepTimes[6] || new Date().toLocaleTimeString()}]
                      </span>{" "}
                      {formatLogMessage("[WARN] Čas do kolapsu 20:00 minut")}
                    </div>
                  )}

                  {loadingStep >= 6 && (
                    <div className="log-line ready">
                      <span className="log-timestamp">
                        [{stepTimes[7] || new Date().toLocaleTimeString()}]
                      </span>{" "}
                      {formatLogMessage(
                        "[READY] SYSTÉM PŘIPRAVEN. Zadejte aktivační příkaz."
                      )}
                    </div>
                  )}

                  {/* NOVÉ: Dynamické logy */}
                  {dynamicLogs.map((log, index) => (
                    <div key={`dynamic-${index}`} className="log-line">
                      <span className="log-timestamp">[{log.time}]</span>{" "}
                      {formatLogMessage(log.message)}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Terminal input - NYNÍ VŽDY VIDITELNÝ */}
            <div className="terminal-input-section">
              <div className="input-container">
                <span className="terminal-prompt">
                  muni-agent@emergency:~${" "}
                </span>
                <input
                  type="text"
                  value={terminalInput}
                  onChange={(e) => setTerminalInput(e.target.value)}
                  onKeyPress={handleCommand}
                  className="terminal-input"
                  placeholder="zadejte příkaz..."
                  autoFocus
                  disabled={loadingStep < 6}
                  style={{
                    opacity: loadingStep < 6 ? 0.5 : 1,
                    cursor: loadingStep < 6 ? "not-allowed" : "text",
                  }}
                />
              </div>

              {terminalError && (
                <div className="terminal-error">{terminalError}</div>
              )}

              {loadingStep >= 7 && (
                <div className="hint-container">
                  <div
                    onClick={() => setShowHint(!showHint)}
                    className="hint-toggle"
                  >
                    <span className="hint-arrow">{showHint ? "▼" : "▶"}</span>
                    Hint
                  </div>
                  {showHint && (
                    <div className="hint-content">
                      Zkuste 'run restore protocol' pro aktivaci obranného
                      systému
                    </div>
                  )}
                </div>
              )}
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
    </div>
  );
};

export default HackerTerminalScreen;
