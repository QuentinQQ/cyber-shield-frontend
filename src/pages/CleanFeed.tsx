import React, { useEffect, useState } from 'react';
import axios from 'axios';
import StartScreen from '../components/cleanFeed/StartScreen';
import GameScreen from '../components/cleanFeed/GameScreen';
import ResultScreen from '../components/cleanFeed/ResultScreen';
import { CommentData, GameSubmission, GameResult } from '../types/types';

const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;
const COMMENTS_API = `${BASE_URL}/api/feed-game/get-all-comments`;
const RESULTS_API = `${BASE_URL}/api/feed-game/postResults`;

const CleanFeed: React.FC = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [comments, setComments] = useState<CommentData[]>([]);
  const [result, setResult] = useState<GameResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (gameStarted && comments.length === 0) {
      setIsLoading(true);
      axios
        .get(COMMENTS_API, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        })
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
  

  const handleGameEnd = (submissions: GameSubmission[]) => {
    setGameOver(true);
  
    axios
      .post(RESULTS_API, { submission: submissions })
      .then((res) => setResult(res.data))
      .catch(console.error);
  };
  

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#4DC0BE] to-[#23A2DA] text-white p-4">
      {!gameStarted && !gameOver && <StartScreen onStart={() => setGameStarted(true)} />}
      
      {gameStarted && !gameOver && (
        <>
          {isLoading && <p className="text-center text-xl mt-10">Loading comments...</p>}
          {error && (
            <div className="text-center mt-10 space-y-4">
              <p className="text-red-200 text-lg">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-white text-cyan-700 rounded-lg font-semibold"
              >
                Retry
              </button>
            </div>
          )}
          {!isLoading && !error && comments.length > 0 && (
            <GameScreen comments={comments} onFinish={handleGameEnd} />
          )}
        </>
      )}
  
      {gameOver && result && <ResultScreen result={result} />}
    </div>
  );
};

export default CleanFeed;
