import { useEffect, useState } from "react";
import { CommentData, GameResult, GameSubmission } from "../types/types";
import { fetchComments, postGameResult } from "../services/feedGameService";

/**
 * @hook useCleanFeed
 * @description
 * ViewModel hook for Clean Feed Game. Manages game lifecycle, loading comments,
 * submitting answers, restoring result from localStorage, and exposing control handlers.
 *
 * @returns {{
 *   gameStarted: boolean;
 *   gameOver: boolean;
 *   comments: CommentData[];
 *   result: GameResult | null;
 *   isLoading: boolean;
 *   error: string | null;
 *   startGame: () => void;
 *   handleGameEnd: (submissions: GameSubmission[]) => void;
 *   resetGame: () => void;
 * }}
 */
const CLEAN_FEED_RESULT_KEY = "cleanFeedResult";

export const useCleanFeed = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [comments, setComments] = useState<CommentData[]>([]);
  const [result, setResult] = useState<GameResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * @function startGame
   * @description Starts the game session. If a saved result exists, it shows the result screen directly.
   */
  const startGame = () => {
    const saved = localStorage.getItem(CLEAN_FEED_RESULT_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed?.answered > 0) {
        setResult(parsed);
        setGameStarted(true);
        setGameOver(true);
        return;
      }
    }

    setResult(null);
    setGameStarted(true);
    setGameOver(false);
  };

  /**
   * @function resetGame
   * @description Clears game state and removes saved result. Used to restart a new session.
   */
  const resetGame = () => {
    localStorage.removeItem(CLEAN_FEED_RESULT_KEY);
    setResult(null);
    setGameStarted(false);
    setGameOver(false);
    setComments([]);
  };

  /**
   * @function handleGameEnd
   * @description Called when the game ends. If user answered, submits to backend.
   * If no answers, skips submission and shows empty result state.
   *
   * @param {GameSubmission[]} submissions - All user answers
   */
  const handleGameEnd = (submissions: GameSubmission[]) => {
    setGameOver(true);

    if (submissions.length === 0) {
      // No answers, skip submission
      setResult(null);
      return;
    }

    setIsLoading(true);
    postGameResult(submissions)
      .then((res) => {
        setResult(res.data);
        localStorage.setItem(CLEAN_FEED_RESULT_KEY, JSON.stringify(res.data));
      })
      .catch(() => {
        setError("Failed to submit your answers. Please try again.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  /**
   * @effect Load comments when game starts.
   */
  useEffect(() => {
    if (gameStarted && comments.length === 0) {
      setIsLoading(true);
      fetchComments()
        .then((res) => {
          setComments(res.data.data || []);
        })
        .catch(() => {
          setError("Failed to load comments. Please try again.");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [gameStarted]);

  /**
   * @effect Restore game result on first load (refresh-safe).
   */
  useEffect(() => {
    const saved = localStorage.getItem(CLEAN_FEED_RESULT_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed?.answered > 0) {
        setResult(parsed);
        setGameStarted(true);
        setGameOver(true);
      }
    }
  }, []);

  return {
    gameStarted,
    gameOver,
    comments,
    result,
    isLoading,
    error,
    startGame,
    handleGameEnd,
    resetGame,
  };
};
