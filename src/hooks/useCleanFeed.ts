import { useEffect, useState } from 'react';
import { CommentData, GameResult, GameSubmission } from '../types/types';
import { fetchComments, postGameResult } from '../services/feedGameService';

export const useCleanFeed = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [comments, setComments] = useState<CommentData[]>([]);
  const [result, setResult] = useState<GameResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  const startGame = () => setGameStarted(true);

  const handleGameEnd = (submissions: GameSubmission[]) => {
    setGameOver(true);
    postGameResult(submissions)
      .then((res) => setResult(res.data))
      .catch(console.error);
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
