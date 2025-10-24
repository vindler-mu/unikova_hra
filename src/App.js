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

// Import individual game data
import { game1Data } from "./data/task/Task1Data";
import { game2Data } from "./data/task/Task2Data";
import { game3Data } from "./data/task/Task3Data";
import { game4Data } from "./data/task/Task4Data";

import { getEpilogueData } from "./utils/gameLogic";
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
  // Create game data array for easy access
  const gameDataArray = [game1Data, game2Data, game3Data, game4Data];

  // Reconstruct tasks array for components that still need it (like OverviewScreen)
  const tasks = gameDataArray.map((gameData) => ({
    title: gameData.title,
    description: gameData.description,
    subtasks: gameData.subtasks,
  }));

  // Screen navigation state
  const [gameStarted, setGameStarted] = useState(false);
  const [showStoryIntro, setShowStoryIntro] = useState(true);
  const [showHackerTerminal, setShowHackerTerminal] = useState(false);
  const [showPersonalization, setShowPersonalization] = useState(true);
  const [showDesktop, setShowDesktop] = useState(false);
  const [showOverview, setShowOverview] = useState(false);
  const [currentTask, setCurrentTask] = useState(0);
  const [isGameComplete, setIsGameComplete] = useState(false);
  const [gameTimedOut, setGameTimedOut] = useState(false);

  // Player data
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [playerName, setPlayerName] = useState("");

  // Game state
  const [timeLeft, setTimeLeft] = useState(GAME_TIME);
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

  // Timer effect
  useEffect(() => {
    if (!gameStarted || isGameComplete || gameTimedOut) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setGameTimedOut(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameStarted, isGameComplete, gameTimedOut]);

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

  // Helper functions
  const formatTime = useCallback((seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  }, []);

  const getDamageLevel = useCallback(() => {
    const lostIntegrity = 100 - databaseIntegrity;
    if (lostIntegrity === 0) return "žádné";
    if (lostIntegrity <= 15) return "minimální";
    if (lostIntegrity <= 30) return "mírné";
    if (lostIntegrity <= 50) return "střední";
    if (lostIntegrity <= 75) return "vážné";
    return "katastrofální";
  }, [databaseIntegrity]);

  // Handle answer submission
  const handleAnswer = useCallback(
    (taskIndex, subtaskIndex, isCorrect) => {
      const currentTaskData = gameDataArray[taskIndex];

      if (!isCorrect) {
        playSound("error");
        setWrongAnswersCount((prev) => prev + 1);
        const penalty = taskIndex === 0 ? PENALTY_TASK1 : PENALTY_OTHER_TASKS;
        setDatabaseIntegrity((prev) => Math.max(0, prev - penalty));
        if (databaseIntegrity - penalty <= 25) {
          playSound("aigor-attack");
        }
        return;
      }

      playSound("success");
      const newTaskStates = { ...taskStates };
      const taskKey = `task${taskIndex + 1}`;

      if (subtaskIndex === currentTaskData.subtasks.length - 1) {
        // Task completed
        newTaskStates[taskKey].completed = true;
        setCollectedDigits((prev) => [...prev, COLLECTED_DIGITS[taskIndex]]);
        setCompletedTasks((prev) => prev + 1);
        setTaskStates(newTaskStates);
        setUnlockedStorySegments((prev) => [...prev, taskIndex]);

        // Show debriefing
        setTimeout(() => {
          setShowDebriefing(taskIndex);
        }, 100);
      } else {
        // Move to next subtask
        if (subtaskIndex < currentTaskData.subtasks.length - 1) {
          newTaskStates[taskKey].currentSubtask = subtaskIndex + 1;
          setTaskStates(newTaskStates);
        }
      }
    },
    [taskStates, databaseIntegrity, gameDataArray]
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
      console.log("=== handleTaskSelect START ===");
      console.log("Called with index:", index);
      console.log("Current taskStates:", taskStates);
      console.log("Current showBriefing:", showBriefing);
      console.log("Current showOverview:", showOverview);

      const taskKey = `task${index + 1}`;
      const state = taskStates[taskKey];

      console.log("taskKey:", taskKey);
      console.log("state:", state);

      if (state.unlocked) {
        if (!state.completed) {
          console.log("Setting showBriefing to:", index);
          console.log("Setting showOverview to: false");
          setShowOverview(false); // ← PŘIDÁNO!
          setShowBriefing(index);
          console.log("showBriefing should be set to:", index);
        } else {
          console.log("Task completed, setting currentTask to:", index);
          setCurrentTask(index);
        }
      } else if (index > 0) {
        console.log("Showing password prompt for task:", index + 1);
        setShowPasswordPrompt(index + 1);
        setPasswordError("");
      }
      console.log("=== handleTaskSelect END ===");
    },
    [taskStates, showBriefing, showOverview]
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
        getDamageLevel={getDamageLevel}
        COLLECTED_DIGITS={COLLECTED_DIGITS}
        GAME_TIME={GAME_TIME}
        onStart={() => {
          setShowOverview(false);
          setGameStarted(true);
        }}
        onTaskSelect={handleTaskSelect} // ← PŘIDÁNO
      />
    );
  }

  // Briefing Screen - OPRAVENO: přidány všechny potřebné props
  if (showBriefing !== null) {
    return (
      <BriefingScreen
        taskIndex={showBriefing}
        gameData={gameDataArray[showBriefing]}
        playerName={playerName}
        selectedFaculty={selectedFaculty}
        timeLeft={timeLeft}
        databaseIntegrity={databaseIntegrity}
        collectedDigits={collectedDigits}
        wrongAnswersCount={wrongAnswersCount}
        formatTime={formatTime}
        getDamageLevel={getDamageLevel}
        COLLECTED_DIGITS={COLLECTED_DIGITS}
        GAME_TIME={GAME_TIME}
        onStart={() => {
          setShowBriefing(null);
          setCurrentTask(showBriefing);
        }}
      />
    );
  }

  // Debriefing Screen
  if (showDebriefing !== null) {
    return (
      <DebriefingScreen
        taskIndex={showDebriefing}
        gameData={gameDataArray[showDebriefing]}
        playerName={playerName}
        selectedFaculty={selectedFaculty}
        collectedDigits={collectedDigits}
        onContinue={() => {
          setShowDebriefing(null);
          // Check if all tasks completed
          if (collectedDigits.length === 4) {
            setShowFinalCodePrompt(true);
          } else {
            // Show librarian interlude for next task
            setShowLibrarianInterlude(showDebriefing);
          }
        }}
        COLLECTED_DIGITS={COLLECTED_DIGITS}
      />
    );
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

  // Main game interface - TaskScreen with current task data
  const currentTaskData = gameDataArray[currentTask];

  return (
    <TaskScreen
      currentTask={currentTask}
      taskData={currentTaskData} // Pass specific task data instead of all tasks
      tasks={tasks} // Keep this for backward compatibility if needed
      taskStates={taskStates}
      timeLeft={timeLeft}
      databaseIntegrity={databaseIntegrity}
      wrongAnswersCount={wrongAnswersCount}
      collectedDigits={collectedDigits}
      playerName={playerName}
      selectedFaculty={selectedFaculty}
      showHint={showHint}
      setShowHint={setShowHint}
      formatTime={formatTime}
      getDamageLevel={getDamageLevel}
      handleAnswer={handleAnswer}
      handleTaskSelect={handleTaskSelect}
      onShowFinalCode={() => setShowFinalCodePrompt(true)}
      onTaskComplete={handleTaskComplete}
      COLLECTED_DIGITS={COLLECTED_DIGITS}
    />
  );
};

export default EscapeRoomGame;
