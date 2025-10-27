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

import { getEpilogueData, formatTime, getDamageLevel } from "./utils/gameLogic";
import { useGameTimer } from "./hooks/useGameTimer";
import Section1Container from "./components/Section1/Section1Container";
import Section2Container from "./components/Section2/Section2Container";
import Section3Container from "./components/Section3/Section3Container";
import Section4Container from "./components/Section4/Section4Container";
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
        getDamageLevel={getDamageLevelText}
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

  // Main game interface - Section1 for task 0, TaskScreen for others

  // Task 1: Use new Section1 (interactive keyword selection)
  if (currentTask === 0) {
    return (
      <Section1Container
        facultyId={selectedFaculty?.id || "ff"}
        facultyColor={selectedFaculty?.color}
        onSectionComplete={(result) => {
          console.log("Section 1 completed with score:", result.totalScore);

          // Mark task as completed
          setTaskStates((prev) => ({
            ...prev,
            task1: { ...prev.task1, completed: true },
          }));

          // Add collected digit
          setCollectedDigits((prev) => [...prev, COLLECTED_DIGITS[0]]);

          // Increase completed tasks
          setCompletedTasks((prev) => prev + 1);

          // Add to unlocked story segments
          setUnlockedStorySegments((prev) => [...prev, 0]);

          // Show debriefing
          setTimeout(() => {
            setShowDebriefing(0);
          }, 100);
        }}
      />
    );
  }

  // Task 2: Use Section2 (information evaluation)
  if (currentTask === 1) {
    return (
      <Section2Container
        facultyId={selectedFaculty?.id || "ff"}
        facultyColor={selectedFaculty?.color}
        onSectionComplete={(result) => {
          console.log("Section 2 completed with score:", result.totalScore);

          // Mark task as completed
          setTaskStates((prev) => ({
            ...prev,
            task2: { ...prev.task2, completed: true },
          }));

          // Add collected digit
          setCollectedDigits((prev) => [...prev, COLLECTED_DIGITS[1]]);

          // Increase completed tasks
          setCompletedTasks((prev) => prev + 1);

          // Add to unlocked story segments
          setUnlockedStorySegments((prev) => [...prev, 1]);

          // Show debriefing
          setTimeout(() => {
            setShowDebriefing(1);
          }, 100);
        }}
      />
    );
  }

  // Task 3: Use Section3 (research skills - concept mapping & literature structuring)
  if (currentTask === 2) {
    return (
      <Section3Container
        facultyId={selectedFaculty?.id || "ff"}
        facultyColor={selectedFaculty?.color}
        onSectionComplete={(result) => {
          console.log("Section 3 completed with score:", result.totalScore);

          // Mark task as completed
          setTaskStates((prev) => ({
            ...prev,
            task3: { ...prev.task3, completed: true },
          }));

          // Add collected digit
          setCollectedDigits((prev) => [...prev, COLLECTED_DIGITS[2]]);

          // Increase completed tasks
          setCompletedTasks((prev) => prev + 1);

          // Add to unlocked story segments
          setUnlockedStorySegments((prev) => [...prev, 2]);

          // Show debriefing
          setTimeout(() => {
            setShowDebriefing(2);
          }, 100);
        }}
      />
    );
  }

  // Task 4: Use Section4 (communication of results)
  if (currentTask === 3) {
    return (
      <Section4Container
        facultyId={selectedFaculty?.id || "ff"}
        facultyColor={selectedFaculty?.color}
        onSectionComplete={(result) => {
          console.log("Section 4 completed with score:", result.totalScore);

          // Mark task as completed
          setTaskStates((prev) => ({
            ...prev,
            task4: { ...prev.task4, completed: true },
          }));

          // Add collected digit
          setCollectedDigits((prev) => [...prev, COLLECTED_DIGITS[3]]);

          // Increase completed tasks
          setCompletedTasks((prev) => prev + 1);

          // Add to unlocked story segments
          setUnlockedStorySegments((prev) => [...prev, 3]);

          // Show debriefing
          setTimeout(() => {
            setShowDebriefing(3);
          }, 100);
        }}
      />
    );
  }

  // Fallback: Use traditional TaskScreen (should not be reached)
  const currentTaskData = gameDataArray[currentTask];

  return (
    <TaskScreen
      currentTask={currentTask}
      taskData={currentTaskData}
      tasks={tasks}
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
      getDamageLevel={getDamageLevelText}
      handleAnswer={handleAnswer}
      handleTaskSelect={handleTaskSelect}
      onShowFinalCode={() => setShowFinalCodePrompt(true)}
      onTaskComplete={handleTaskComplete}
      COLLECTED_DIGITS={COLLECTED_DIGITS}
    />
  );
};

export default EscapeRoomGame;
