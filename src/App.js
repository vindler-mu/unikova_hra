import React, { useState, useEffect, useCallback } from "react";
import {
  CheckCircle2,
  Lock,
  Clock,
  AlertTriangle,
  BookOpen,
  Database,
  Shield,
  Award,
  Skull,
  Play,
} from "lucide-react";
import "./index.css";

// Import all components and data
import { playSound } from "./utils/sounds";
import {
  faculties,
  GAME_TIME,
  FINAL_CODE,
  TASK_PASSWORDS,
  COLLECTED_DIGITS,
  PENALTY_TASK1,
  PENALTY_OTHER_TASKS,
} from "./data/gameData";

import { getEpilogueData, formatTime, getDamageLevel } from "./utils/gameLogic";
import { useGameTimer } from "./hooks/useGameTimer";
import PersonalizationScreen from "./components/PersonalizationScreen";
import DesktopScreen from "./components/DesktopScreen";
import EmailScreen from "./components/EmailScreen";
import HackerTerminalScreen from "./components/HackerTerminalScreen";
import OverviewScreen from "./components/OverviewScreen";
import TaskScreen from "./components/TaskScreen";
import BriefingScreen from "./components/BriefingScreen"; // Nová komponenta
import DebriefingScreen from "./components/DebriefingScreen"; // Nová komponenta
import LibrarianInterlude from "./components/LibrarianInterlude"; // Nová komponenta
import PasswordPrompt from "./components/PasswordPrompt";
import FinalCodePrompt from "./components/FinalCodePrompt";
import CompletionScreen from "./components/CompletionScreen";
import TimeoutScreen from "./components/TimeoutScreen";

const EscapeRoomGame = () => {
  // Tasks array placeholder
  const tasks = [
    { title: "Task 1", description: "Task 1 description", subtasks: [] },
    { title: "Task 2", description: "Task 2 description", subtasks: [] },
    { title: "Task 3", description: "Task 3 description", subtasks: [] },
    { title: "Task 4", description: "Task 4 description", subtasks: [] }
  ];

  // Screen navigation state
  const [gameStarted, setGameStarted] = useState(false);
  const [showStoryIntro, setShowStoryIntro] = useState(true);
  const [showHackerTerminal, setShowHackerTerminal] = useState(false);
  const [showPersonalization, setShowPersonalization] = useState(true);
  const [showDesktop, setShowDesktop] = useState(false);
  const [showOverview, setShowOverview] = useState(false);
  const [currentTask, setCurrentTask] = useState(0);
  const [isGameComplete, setIsGameComplete] = useState(false);

  // Player data
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [playerName, setPlayerName] = useState("");

  // Game timer
  const { timeLeft, gameTimedOut, setTimeLeft } = useGameTimer(
    GAME_TIME,
    gameStarted,
    isGameComplete
  );

  // Game state
  const [taskStates, setTaskStates] = useState({
    task1: {
      unlocked: true,
      completed: false,
      password: "",
      currentSubtask: 0,
    },
    task2: {
      unlocked: false,
      completed: false,
      password: "",
      currentSubtask: 0,
    },
    task3: {
      unlocked: false,
      completed: false,
      password: "",
      currentSubtask: 0,
    },
    task4: {
      unlocked: false,
      completed: false,
      password: "",
      currentSubtask: 0,
    },
  });
  const [collectedDigits, setCollectedDigits] = useState([]);
  const [databaseIntegrity, setDatabaseIntegrity] = useState(100);
  const [wrongAnswersCount, setWrongAnswersCount] = useState(0);
  const [finalTime, setFinalTime] = useState(0);

  // UI state
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(null);
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showFinalCodePrompt, setShowFinalCodePrompt] = useState(false);
  const [finalCodeInput, setFinalCodeInput] = useState("");
  const [finalCodeError, setFinalCodeError] = useState(""); // NOVÉ: Error state pro FinalCodePrompt
  const [showHint, setShowHint] = useState(false);
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalError, setTerminalError] = useState("");
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [terminalLoading, setTerminalLoading] = useState(true);
  const [loadingStep, setLoadingStep] = useState(0);

  // Additional state from original
  const [completedTasks, setCompletedTasks] = useState(0);
  const [showLibrarianPrompt, setShowLibrarianPrompt] = useState(false);
  const [showBriefing, setShowBriefing] = useState(null);
  const [showDebriefing, setShowDebriefing] = useState(null);
  const [showLibrarianInterlude, setShowLibrarianInterlude] = useState(null);
  const [unlockedStorySegments, setUnlockedStorySegments] = useState([]);

  // Booting instructions effect
  useEffect(() => {
    if (terminalLoading && showHackerTerminal) {
      const timer = setInterval(() => {
        setLoadingStep((prev) => {
          if (prev >= 6) {
            clearInterval(timer);
            return prev;
          }
          return prev + 1;
        });
      }, 1200);
      return () => clearInterval(timer);
    }
  }, [terminalLoading, showHackerTerminal]);

  // Reset scroll effect
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [
    showPersonalization,
    showDesktop,
    showStoryIntro,
    showHackerTerminal,
    showOverview,
    showBriefing,
    showDebriefing,
    showLibrarianInterlude,
    isGameComplete,
    gameTimedOut,
  ]);

  // NOVÉ: Vymazat error při psaní final kódu
  useEffect(() => {
    if (finalCodeInput) {
      setFinalCodeError("");
    }
  }, [finalCodeInput]);

  // Memoized damage level calculator
  const getDamageLevelText = useCallback(() => {
    return getDamageLevel(databaseIntegrity);
  }, [databaseIntegrity]);

  // Handle answer submission - removed (no game mechanics)
  const handleAnswer = useCallback(
    (taskIndex, subtaskIndex, isCorrect) => {
      console.log("handleAnswer called but game mechanics are removed");
    },
    []
  );

  // Handle password submission from LibrarianInterlude
  const handleLibrarianPasswordSuccess = useCallback((taskNumber) => {
    const taskKey = `task${taskNumber}`;
    setTaskStates((prev) => ({
      ...prev,
      [taskKey]: { ...prev[taskKey], unlocked: true, currentSubtask: 0 },
    }));
    setShowLibrarianInterlude(null);
    setShowBriefing(taskNumber - 1);
  }, []);

  // UPRAVENO: Handle final code submission s error handling
  const handleFinalCodeSubmit = useCallback(() => {
    if (finalCodeInput === FINAL_CODE) {
      setFinalTime(GAME_TIME - timeLeft);
      setIsGameComplete(true);
      setShowFinalCodePrompt(false);
      setFinalCodeError(""); // Vymazat error
    } else {
      setFinalCodeError("Nesprávný master kód! Zkuste znovu."); // Nastavit error
    }
  }, [finalCodeInput, timeLeft]);

  // Handle task selection
  const handleTaskSelect = useCallback(
    (index) => {
      const taskKey = `task${index + 1}`;
      const state = taskStates[taskKey];

      if (state.unlocked) {
        if (!state.completed) {
          setShowOverview(false);
          setShowBriefing(index);
        } else {
          setCurrentTask(index);
        }
      } else if (index > 0) {
        setShowPasswordPrompt(index + 1);
        setPasswordError("");
      }
    },
    [taskStates]
  );

  // Handle password submission
  const handlePasswordSubmit = useCallback(
    (taskNumber) => {
      const taskKey = `task${taskNumber}`;
      const expectedPassword = TASK_PASSWORDS[taskKey];

      if (passwordInput.toLowerCase().trim() === expectedPassword) {
        playSound("success");
        setTaskStates((prev) => ({
          ...prev,
          [taskKey]: { ...prev[taskKey], unlocked: true, currentSubtask: 0 },
        }));
        setShowPasswordPrompt(null);
        setPasswordInput("");
        setPasswordError("");
        setShowBriefing(taskNumber - 1);
      } else {
        playSound("error");
        setPasswordError("Nesprávné heslo! Zkuste znovu.");
      }
    },
    [passwordInput]
  );

  // Handle task completion (for debriefing)
  const handleTaskComplete = useCallback((taskIndex) => {
    setShowDebriefing(taskIndex);
    setCurrentTask(null);
  }, []);

  // Screen rendering logic
  if (showPersonalization) {
    return (
      <PersonalizationScreen
        playerName={playerName}
        setPlayerName={setPlayerName}
        selectedFaculty={selectedFaculty}
        setSelectedFaculty={setSelectedFaculty}
        faculties={faculties}
        onComplete={() => {
          setShowPersonalization(false);
          setShowDesktop(true);
          playSound("typing");
        }}
      />
    );
  }

  if (showDesktop) {
    return (
      <DesktopScreen
        playerName={playerName}
        selectedFaculty={selectedFaculty}
        onEmailClick={() => {
          setShowDesktop(false);
          setShowStoryIntro(true);
        }}
        onLogout={() => {
          setShowDesktop(false);
          setShowPersonalization(true);
        }}
      />
    );
  }

  if (!gameStarted && showStoryIntro) {
    return (
      <EmailScreen
        selectedEmail={selectedEmail}
        setSelectedEmail={setSelectedEmail}
        playerName={playerName}
        onTerminalAccess={() => {
          setShowStoryIntro(false);
          setShowHackerTerminal(true);
        }}
      />
    );
  }

  if (showHackerTerminal) {
    return (
      <HackerTerminalScreen
        terminalInput={terminalInput}
        setTerminalInput={setTerminalInput}
        terminalError={terminalError}
        setTerminalError={setTerminalError}
        terminalLoading={terminalLoading}
        loadingStep={loadingStep}
        playerName={playerName}
        selectedFaculty={selectedFaculty}
        onComplete={() => {
          setShowHackerTerminal(false);
          setShowOverview(true);
        }}
      />
    );
  }

  if (showOverview) {
    return (
      <OverviewScreen
        timeLeft={timeLeft}
        databaseIntegrity={databaseIntegrity}
        collectedDigits={collectedDigits}
        wrongAnswersCount={wrongAnswersCount}
        taskStates={taskStates}
        tasks={tasks} // Pass reconstructed tasks array
        playerName={playerName}
        selectedFaculty={selectedFaculty}
        formatTime={formatTime}
        getDamageLevel={getDamageLevelText}
        COLLECTED_DIGITS={COLLECTED_DIGITS}
        GAME_TIME={GAME_TIME}
        onStart={() => {
          setShowOverview(false);
          setGameStarted(true);
        }}
        onTaskSelect={handleTaskSelect}
      />
    );
  }

  // Briefing Screen - removed (no game data)
  if (showBriefing !== null) {
    setShowBriefing(null);
    setShowOverview(true);
  }

  // Debriefing Screen - removed (no game data)
  if (showDebriefing !== null) {
    setShowDebriefing(null);
    setShowOverview(true);
  }

  // Librarian Interlude Screen
  if (showLibrarianInterlude !== null) {
    return (
      <LibrarianInterlude
        interludeIndex={showLibrarianInterlude}
        playerName={playerName}
        selectedFaculty={selectedFaculty}
        onPasswordSuccess={handleLibrarianPasswordSuccess}
        onCancel={() => {
          setShowLibrarianInterlude(null);
          setShowOverview(true);
        }}
        TASK_PASSWORDS={TASK_PASSWORDS}
      />
    );
  }

  if (gameTimedOut) {
    return (
      <TimeoutScreen
        completedTasks={completedTasks}
        databaseIntegrity={databaseIntegrity}
      />
    );
  }

  if (isGameComplete) {
    return (
      <CompletionScreen
        databaseIntegrity={databaseIntegrity}
        finalTime={finalTime}
        wrongAnswersCount={wrongAnswersCount}
        formatTime={formatTime}
        getEpilogueData={getEpilogueData}
        FINAL_CODE={FINAL_CODE}
      />
    );
  }

  // Password prompt
  if (showPasswordPrompt) {
    return (
      <PasswordPrompt
        taskNumber={showPasswordPrompt}
        passwordInput={passwordInput}
        setPasswordInput={setPasswordInput}
        passwordError={passwordError}
        onSubmit={() => handlePasswordSubmit(showPasswordPrompt)}
        onCancel={() => setShowPasswordPrompt(null)}
      />
    );
  }

  // UPRAVENO: Final code prompt s passwordError prop
  if (showFinalCodePrompt) {
    return (
      <FinalCodePrompt
        collectedDigits={collectedDigits}
        finalCodeInput={finalCodeInput}
        setFinalCodeInput={setFinalCodeInput}
        onSubmit={handleFinalCodeSubmit}
        passwordError={finalCodeError} // ← PŘIDÁNO: Předání error state
      />
    );
  }

  // Main game interface - game mechanics removed
  // Placeholder: show overview or message that tasks are not yet implemented
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
      color: '#00ff00',
      fontFamily: 'Courier New, monospace',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        textAlign: 'center',
        maxWidth: '600px'
      }}>
        <h1 style={{ fontSize: '2em', marginBottom: '20px' }}>
          Herní mechanismy byly odstraněny
        </h1>
        <p style={{ fontSize: '1.2em', lineHeight: '1.6' }}>
          Sekce 1-4 a jejich data byly kompletně odstraněny z projektu.
          Základní flow (personalizace, desktop, emaily, terminal) zůstává funkční.
        </p>
      </div>
    </div>
  );
};

export default EscapeRoomGame;
