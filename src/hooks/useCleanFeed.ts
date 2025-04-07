import { useEffect, useState } from 'react';
import { CommentData, GameResult, GameSubmission } from '../types/types';
import { fetchComments, postGameResult } from '../services/feedGameService';

/**
 * @function useCleanFeed
 * @description
 * Custom hook that manages the full lifecycle of the Clean Feed game session.
 * It loads initial data (comments), tracks the game start/finish state,
 * and submits results to the server after the game ends.
 *
 * @returns {{
 *   gameStarted: boolean,
 *   gameOver: boolean,
 *   comments: CommentData[],
 *   result: GameResult | null,
 *   isLoading: boolean,
 *   error: string | null,
 *   startGame: () => void,
 *   handleGameEnd: (submissions: GameSubmission[]) => void
 * }}
 */
export const useCleanFeed = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [comments, setComments] = useState<CommentData[]>([]);
  const [result, setResult] = useState<GameResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * @effect Loads comments from the server when the game starts.
   * If comments have already been loaded, this effect does nothing.
   */
  useEffect(() => {
    if (gameStarted && comments.length === 0) {
      setIsLoading(true);
      fetchComments()
        .then((res) => {
          setComments(res.data.data || []);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setError('Failed to load comments. Please try again.');
          setIsLoading(false);
        });
    }
  }, [gameStarted]);

  /**
   * @function startGame
   * @description Marks the game as started.
   * @returns {void}
   */
  const startGame = () => setGameStarted(true);

  /**
   * @function handleGameEnd
   * @description Called when the game ends. Posts all user responses to the backend.
   *
   * @param {GameSubmission[]} submissions - All responses recorded during the game.
   * @returns {void}
   */
  const handleGameEnd = (submissions: GameSubmission[]) => {
    if (submissions.length === 0) {
      setResult(null);
      setGameOver(true);
      return;
    }
    setIsLoading(true);
    postGameResult(submissions)
      .then((res) => setResult(res.data))
      .catch(console.error)
      .finally(() => {
        setIsLoading(false)
        setGameOver(true);
      });
  };

  return {
    gameStarted,
    gameOver,
    comments,
    result,
    isLoading,
    error,
    startGame,
    handleGameEnd,
  };
};
