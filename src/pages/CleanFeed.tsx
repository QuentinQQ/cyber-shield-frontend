// CleanFeed.tsx
import React, { useEffect } from "react";
import StartScreen from "../components/cleanFeed/StartScreen";
import GameScreen from "../components/cleanFeed/GameScreen";
import ResultScreen from "../components/cleanFeed/ResultScreen";
import { useCleanFeed } from "../hooks/useCleanFeed";
import PageWrapper from "../components/PageWrapper";
import EmptyAnswerScreen from "../components/cleanFeed/EmptyAnswerScreen";
import LoadingOverlay from "../components/LoadingOverlay";

interface CleanFeedProps {
  skipIntro?: boolean;
}

const CleanFeed: React.FC<CleanFeedProps> = ({ skipIntro = false }) => {
  const {
    gameStarted,
    gameOver,
    comments,
    result,
    isLoading,
    error,
    startGame,
    handleGameEnd,
    resetGame,
  } = useCleanFeed();

  // Auto-start game when skipIntro is true
  useEffect(() => {
    if (skipIntro && !gameStarted && !gameOver) {
      startGame();
    }
  }, [skipIntro, gameStarted, gameOver, startGame]);

  return (
    <PageWrapper className={`min-h-screen ${(!gameStarted || gameOver || isLoading || error || comments.length === 0) ? 'bg-gradient-to-b from-[#4DC0BE] to-[#23A2DA]' : ''} text-white p-4`}>
      {/* Phone background (only shown during active game) */}
      {gameStarted && !gameOver && !isLoading && !error && comments.length > 0 && (
        <div
          className="fixed inset-0 z-0"
          style={{
            backgroundImage: "url('/phone.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
      )}
      
      {/* Content container with appropriate z-index */}
      <div className="relative z-10">
        {/* Onboarding Screen - only show if not skipping intro */}
        {!skipIntro && !gameStarted && !gameOver && (
          <StartScreen onStart={startGame} />
        )}

        {/* Game Screen */}
        {gameStarted && !gameOver && (
          <>
            {isLoading && <LoadingOverlay message="Loading..." />}

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

        {/* Result Screen */}
        {gameOver && result && result.answered > 0 && (
          <ResultScreen result={result} onRestart={resetGame} />
        )}

        {/* Loading result screen */}
        {gameOver && !result && isLoading && (
          <LoadingOverlay message="Loading result..." />
        )}

        {/* If user didn't answer any question */}
        {gameOver && result && result.answered === 0 && (
          <EmptyAnswerScreen onRestart={startGame} />
        )}
      </div>
    </PageWrapper>
  );
};

export default CleanFeed;