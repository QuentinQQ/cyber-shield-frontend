import React from 'react';
import StartScreen from '../components/cleanFeed/StartScreen';
import GameScreen from '../components/cleanFeed/GameScreen';
import ResultScreen from '../components/cleanFeed/ResultScreen';
import { useCleanFeed } from '../hooks/useCleanFeed';

const CleanFeed: React.FC = () => {
  const {
    gameStarted,
    gameOver,
    comments,
    result,
    isLoading,
    error,
    startGame,
    handleGameEnd,
  } = useCleanFeed();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#4DC0BE] to-[#23A2DA] text-white p-4">
      {!gameStarted && !gameOver && <StartScreen onStart={startGame} />}
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
