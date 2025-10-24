import { useState, useEffect } from "react";

/**
 * Custom hook for managing game timer
 * @param {number} initialTime - Initial time in seconds
 * @param {boolean} gameStarted - Whether the game has started
 * @param {boolean} isGameComplete - Whether the game is complete
 * @returns {Object} - { timeLeft, gameTimedOut }
 */
export const useGameTimer = (initialTime, gameStarted, isGameComplete) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [gameTimedOut, setGameTimedOut] = useState(false);

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

  return { timeLeft, gameTimedOut, setTimeLeft };
};
