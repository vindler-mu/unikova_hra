import React, { useState, useEffect } from "react";
import PersonalizationScreen from "./PersonalizationScreen";
import DesktopScreen from "./DesktopScreen";
import EmailScreen from "./EmailScreen";
import HackerTerminalScreen from "./HackerTerminalScreen";
import OverviewScreen from "./OverviewScreen";
import BriefingScreen from "./BriefingScreen";
import DebriefingScreen from "./DebriefingScreen";
import LibrarianInterlude from "./LibrarianInterlude";
import PasswordPrompt from "./PasswordPrompt";
import FinalCodePrompt from "./FinalCodePrompt";
import CompletionScreen from "./CompletionScreen";
import TimeoutScreen from "./TimeoutScreen";
import TaskScreen from "./TaskScreen";
import { faculties, GAME_TIME, FINAL_CODE, TASK_PASSWORDS, COLLECTED_DIGITS } from "../data/gameData";
import { formatTime, getDamageLevel, getEpilogueData } from "../utils/gameLogic";

const ComponentViewer = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showSidebar, setShowSidebar] = useState(true);

  // Mock data for previews
  const mockPlayerName = "Jan Novák";
  const mockFaculty = faculties[0]; // FF
  const mockTimeLeft = 900; // 15 minutes
  const mockDatabaseIntegrity = 75;
  const mockCollectedDigits = [3, 8];
  const mockWrongAnswers = 5;

  const mockTaskStates = {
    task1: { unlocked: true, completed: true, password: "", currentSubtask: 0 },
    task2: { unlocked: true, completed: false, password: "", currentSubtask: 2 },
    task3: { unlocked: false, completed: false, password: "", currentSubtask: 0 },
    task4: { unlocked: false, completed: false, password: "", currentSubtask: 0 },
  };

  const mockTasks = [
    { title: "Akademické vyhledávání", description: "Najděte správné zdroje", subtasks: [] },
    { title: "Hodnocení informací", description: "Vyhodnoťte kvalitu zdrojů", subtasks: [] },
    { title: "Organizace dat", description: "Uspořádejte informace", subtasks: [] },
    { title: "Komunikace výsledků", description: "Prezentujte své poznatky", subtasks: [] },
  ];

  const mockGameData = {
    title: "Akademické vyhledávání",
    description: "Tento úkol testuje vaše schopnosti v oblasti vyhledávání...",
    briefing: "Systém IGRAM potřebuje obnovit modul vyhledávání...",
    debriefing: "Úspěšně jste dokončili modul vyhledávání!",
    subtasks: []
  };

  // Component configurations
  const components = [
    {
      name: "PersonalizationScreen",
      label: "1. Personalizace",
      component: (
        <PersonalizationScreen
          playerName={mockPlayerName}
          setPlayerName={() => {}}
          selectedFaculty={mockFaculty}
          setSelectedFaculty={() => {}}
          faculties={faculties}
          onComplete={() => console.log("Preview mode - no action")}
        />
      )
    },
    {
      name: "DesktopScreen",
      label: "2. Desktop",
      component: (
        <DesktopScreen
          playerName={mockPlayerName}
          selectedFaculty={mockFaculty}
          onEmailClick={() => console.log("Preview mode")}
          onLogout={() => console.log("Preview mode")}
        />
      )
    },
    {
      name: "EmailScreen",
      label: "3. Emaily (Story)",
      component: (
        <EmailScreen
          selectedEmail={null}
          setSelectedEmail={() => {}}
          playerName={mockPlayerName}
          onTerminalAccess={() => console.log("Preview mode")}
        />
      )
    },
    {
      name: "HackerTerminalScreen",
      label: "4. Hacker Terminal",
      component: (
        <HackerTerminalScreen
          terminalInput=""
          setTerminalInput={() => {}}
          terminalError=""
          setTerminalError={() => {}}
          terminalLoading={false}
          loadingStep={7}
          playerName={mockPlayerName}
          selectedFaculty={mockFaculty}
          onComplete={() => console.log("Preview mode")}
        />
      )
    },
    {
      name: "OverviewScreen",
      label: "5. Přehled úkolů",
      component: (
        <OverviewScreen
          timeLeft={mockTimeLeft}
          databaseIntegrity={mockDatabaseIntegrity}
          collectedDigits={mockCollectedDigits}
          wrongAnswersCount={mockWrongAnswers}
          taskStates={mockTaskStates}
          tasks={mockTasks}
          playerName={mockPlayerName}
          selectedFaculty={mockFaculty}
          formatTime={formatTime}
          getDamageLevel={() => getDamageLevel(mockDatabaseIntegrity)}
          COLLECTED_DIGITS={COLLECTED_DIGITS}
          GAME_TIME={GAME_TIME}
          onStart={() => console.log("Preview mode")}
          onTaskSelect={() => console.log("Preview mode")}
        />
      )
    },
    {
      name: "BriefingScreen",
      label: "6. Briefing (úvod úkolu)",
      component: (
        <BriefingScreen
          taskIndex={0}
          gameData={mockGameData}
          playerName={mockPlayerName}
          selectedFaculty={mockFaculty}
          timeLeft={mockTimeLeft}
          databaseIntegrity={mockDatabaseIntegrity}
          collectedDigits={mockCollectedDigits}
          wrongAnswersCount={mockWrongAnswers}
          formatTime={formatTime}
          getDamageLevel={() => getDamageLevel(mockDatabaseIntegrity)}
          COLLECTED_DIGITS={COLLECTED_DIGITS}
          GAME_TIME={GAME_TIME}
          onStart={() => console.log("Preview mode")}
        />
      )
    },
    {
      name: "DebriefingScreen",
      label: "7. Debriefing (výsledky)",
      component: (
        <DebriefingScreen
          taskIndex={0}
          gameData={mockGameData}
          playerName={mockPlayerName}
          selectedFaculty={mockFaculty}
          collectedDigits={mockCollectedDigits}
          onContinue={() => console.log("Preview mode")}
          COLLECTED_DIGITS={COLLECTED_DIGITS}
        />
      )
    },
    {
      name: "LibrarianInterlude",
      label: "8. Knihovník Interlude",
      component: (
        <LibrarianInterlude
          interludeIndex={0}
          playerName={mockPlayerName}
          selectedFaculty={mockFaculty}
          onPasswordSuccess={() => console.log("Preview mode")}
          onCancel={() => console.log("Preview mode")}
          TASK_PASSWORDS={TASK_PASSWORDS}
        />
      )
    },
    {
      name: "PasswordPrompt",
      label: "9. Zadání hesla",
      component: (
        <PasswordPrompt
          taskNumber={2}
          passwordInput=""
          setPasswordInput={() => {}}
          passwordError=""
          onSubmit={() => console.log("Preview mode")}
          onCancel={() => console.log("Preview mode")}
        />
      )
    },
    {
      name: "FinalCodePrompt",
      label: "10. Finální kód",
      component: (
        <FinalCodePrompt
          collectedDigits={[3, 8, 4, 1]}
          finalCodeInput=""
          setFinalCodeInput={() => {}}
          onSubmit={() => console.log("Preview mode")}
          passwordError=""
        />
      )
    },
    {
      name: "CompletionScreen",
      label: "11. Dokončení hry",
      component: (
        <CompletionScreen
          databaseIntegrity={mockDatabaseIntegrity}
          finalTime={600}
          wrongAnswersCount={mockWrongAnswers}
          formatTime={formatTime}
          getEpilogueData={getEpilogueData}
          FINAL_CODE={FINAL_CODE}
        />
      )
    },
    {
      name: "TimeoutScreen",
      label: "12. Timeout (čas vypršel)",
      component: (
        <TimeoutScreen
          completedTasks={2}
          databaseIntegrity={mockDatabaseIntegrity}
        />
      )
    },
    {
      name: "TaskScreen",
      label: "13. Task Screen (legacy)",
      component: (
        <TaskScreen
          currentTask={0}
          taskData={mockGameData}
          tasks={mockTasks}
          taskStates={mockTaskStates}
          timeLeft={mockTimeLeft}
          databaseIntegrity={mockDatabaseIntegrity}
          wrongAnswersCount={mockWrongAnswers}
          collectedDigits={mockCollectedDigits}
          playerName={mockPlayerName}
          selectedFaculty={mockFaculty}
          showHint={false}
          setShowHint={() => {}}
          formatTime={formatTime}
          getDamageLevel={() => getDamageLevel(mockDatabaseIntegrity)}
          handleAnswer={() => console.log("Preview mode")}
          handleTaskSelect={() => console.log("Preview mode")}
          onShowFinalCode={() => console.log("Preview mode")}
          onTaskComplete={() => console.log("Preview mode")}
          COLLECTED_DIGITS={COLLECTED_DIGITS}
        />
      )
    }
  ];

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft" && currentIndex > 0) {
        setCurrentIndex(prev => prev - 1);
      } else if (e.key === "ArrowRight" && currentIndex < components.length - 1) {
        setCurrentIndex(prev => prev + 1);
      } else if (e.key === "s" || e.key === "S") {
        setShowSidebar(prev => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, components.length]);

  return (
    <div style={{
      display: "flex",
      height: "100vh",
      overflow: "hidden",
      fontFamily: "Courier New, monospace"
    }}>
      {/* Sidebar */}
      {showSidebar && (
        <div style={{
          width: "280px",
          background: "#1a1a2e",
          borderRight: "2px solid #00ff00",
          overflowY: "auto",
          padding: "20px",
          boxShadow: "2px 0 10px rgba(0,255,0,0.2)"
        }}>
          <div style={{
            marginBottom: "20px",
            paddingBottom: "15px",
            borderBottom: "1px solid #00ff00"
          }}>
            <h2 style={{
              color: "#00ff00",
              fontSize: "1.2em",
              margin: "0 0 10px 0"
            }}>
              🎮 Component Viewer
            </h2>
            <p style={{
              color: "#00aa00",
              fontSize: "0.8em",
              margin: 0
            }}>
              {components.length} obrazovek
            </p>
            <p style={{
              color: "#00aa00",
              fontSize: "0.7em",
              margin: "5px 0 0 0"
            }}>
              ← → šipky | S = sidebar
            </p>
          </div>

          {components.map((comp, index) => (
            <div
              key={comp.name}
              onClick={() => setCurrentIndex(index)}
              style={{
                padding: "12px",
                marginBottom: "8px",
                background: currentIndex === index ? "#00ff00" : "#0a0a1a",
                color: currentIndex === index ? "#000" : "#00ff00",
                cursor: "pointer",
                borderRadius: "4px",
                border: currentIndex === index ? "2px solid #00ff00" : "1px solid #003300",
                transition: "all 0.2s",
                fontSize: "0.9em",
                fontWeight: currentIndex === index ? "bold" : "normal"
              }}
              onMouseEnter={(e) => {
                if (currentIndex !== index) {
                  e.target.style.background = "#162030";
                  e.target.style.borderColor = "#00aa00";
                }
              }}
              onMouseLeave={(e) => {
                if (currentIndex !== index) {
                  e.target.style.background = "#0a0a1a";
                  e.target.style.borderColor = "#003300";
                }
              }}
            >
              {comp.label}
            </div>
          ))}
        </div>
      )}

      {/* Main content */}
      <div style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden"
      }}>
        {/* Top bar */}
        <div style={{
          background: "#1a1a2e",
          borderBottom: "2px solid #00ff00",
          padding: "15px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            <button
              onClick={() => setShowSidebar(prev => !prev)}
              style={{
                background: "#00ff00",
                color: "#000",
                border: "none",
                padding: "8px 12px",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "0.9em",
                fontFamily: "Courier New, monospace",
                fontWeight: "bold"
              }}
            >
              {showSidebar ? "◀ Hide" : "▶ Show"}
            </button>

            <div style={{ color: "#00ff00" }}>
              <span style={{ fontSize: "1.1em", fontWeight: "bold" }}>
                {components[currentIndex].label}
              </span>
              <span style={{ color: "#00aa00", marginLeft: "10px", fontSize: "0.9em" }}>
                ({currentIndex + 1}/{components.length})
              </span>
            </div>
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            <button
              onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
              disabled={currentIndex === 0}
              style={{
                background: currentIndex === 0 ? "#333" : "#00ff00",
                color: currentIndex === 0 ? "#666" : "#000",
                border: "none",
                padding: "8px 16px",
                borderRadius: "4px",
                cursor: currentIndex === 0 ? "not-allowed" : "pointer",
                fontSize: "1em",
                fontFamily: "Courier New, monospace",
                fontWeight: "bold"
              }}
            >
              ← Prev
            </button>
            <button
              onClick={() => setCurrentIndex(prev => Math.min(components.length - 1, prev + 1))}
              disabled={currentIndex === components.length - 1}
              style={{
                background: currentIndex === components.length - 1 ? "#333" : "#00ff00",
                color: currentIndex === components.length - 1 ? "#666" : "#000",
                border: "none",
                padding: "8px 16px",
                borderRadius: "4px",
                cursor: currentIndex === components.length - 1 ? "not-allowed" : "pointer",
                fontSize: "1em",
                fontFamily: "Courier New, monospace",
                fontWeight: "bold"
              }}
            >
              Next →
            </button>
          </div>
        </div>

        {/* Component display */}
        <div style={{
          flex: 1,
          overflow: "auto",
          background: "#16213e",
          position: "relative"
        }}>
          {components[currentIndex].component}

          {/* Bottom left label */}
          <div style={{
            position: "fixed",
            bottom: "20px",
            left: showSidebar ? "300px" : "20px",
            background: "rgba(0, 0, 0, 0.8)",
            border: "2px solid #00ff00",
            borderRadius: "8px",
            padding: "10px 15px",
            color: "#00ff00",
            fontSize: "0.85em",
            fontFamily: "Courier New, monospace",
            backdropFilter: "blur(5px)",
            boxShadow: "0 4px 12px rgba(0, 255, 0, 0.3)",
            transition: "left 0.3s"
          }}>
            <div style={{ fontWeight: "bold", marginBottom: "3px" }}>
              {components[currentIndex].name}
            </div>
            <div style={{ color: "#00aa00", fontSize: "0.9em" }}>
              Komponenta {currentIndex + 1} z {components.length}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComponentViewer;
