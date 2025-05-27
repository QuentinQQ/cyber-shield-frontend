import { useEffect, useState } from "react";
import { CommentData, GameResultV2, GameSubmission } from "../types/types";
import { fetchCommentsWithSession, postGameResultV2WithSession } from "../services/feedGameService";

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
 *   result: GameResultV2 | null;
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
  const [result, setResult] = useState<GameResultV2 | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sessionInfo, setSessionInfo] = useState<{
    session_id?: string;
    total_questions?: number
  } | null>(null);

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
      setResult(null);
      return;
    }
  
    setIsLoading(true);
    postGameResultV2WithSession(submissions)
      .then((res) => {
        setResult(res);
        localStorage.setItem(CLEAN_FEED_RESULT_KEY, JSON.stringify(res));
      })
      .catch((error) => {
        if (error.response?.status === 401) {
          setError("Your session has expired. Please refresh the page and try again.");
        } else {
          setError("Failed to submit your answers. Please try again.");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  /**
   * @effect Load comments when game starts.
   */
  useEffect(() => {
    if (gameStarted && comments.length === 0 && !gameOver) {
      setIsLoading(true);
      setError(null);
  
      fetchCommentsWithSession()
        .then((res) => {
          setComments(res.comments);
          setSessionInfo({
            session_id: res.session_id,
            total_questions: res.total_questions
          });
        })
        .catch((error) => {
          if (error.response?.status === 401) {
            setError("Your session has expired. Please refresh the page and try again.");
          } else {
            setError("Failed to load comments. Please refresh the page and try again.");
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [gameStarted, comments.length, gameOver]);


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
    sessionInfo,
  };
};
