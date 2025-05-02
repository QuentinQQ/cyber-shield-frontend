// CleanFeed.tsx
import React, { useEffect } from "react";
import StartScreen from "../components/cleanFeed/StartScreen";
import GameScreen from "../components/cleanFeed/GameScreen";
import ResultScreen from "../components/cleanFeed/ResultScreen";
import { useCleanFeed } from "../hooks/useCleanFeed";
import PageWrapper from "../components/PageWrapper";
import EmptyAnswerScreen from "../components/cleanFeed/EmptyAnswerScreen";
import LoadingOverlay from "../components/LoadingOverlay";
// import { useNavigate } from "react-router-dom";


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
  // const navigate = useNavigate();
  // const handleTeleport = () => {
  //   navigate("/safe-people");
  // };


  // Auto-start game when skipIntro is true
  useEffect(() => {
    if (skipIntro && !gameStarted && !gameOver) {
      startGame();
    }
  }, [skipIntro, gameStarted, gameOver, startGame]);

  // Determine which screen to show when game is over
  const renderGameOverScreen = () => {
    if (isLoading) {
      return <LoadingOverlay message="Loading result..." />;
    }
    
    if (!result) {
      // Handle case where result is null but game is over
      return <EmptyAnswerScreen onRestart={startGame} />;
    }
    
    return result.answered > 0 
      ? <ResultScreen result={result} onRestart={resetGame} /> 
      : <EmptyAnswerScreen onRestart={startGame} />;
  };

  return (
    <PageWrapper className={`min-h-screen ${(!gameStarted || gameOver || isLoading || error || comments.length === 0) ? 'bg-gradient-to-b from-[#4DC0BE] to-[#23A2DA]' : 'bg-[#ACE3FC]'} text-white p-4`}>
      {/* Content container */}
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

        {/* Game Over Screens */}
        {gameOver && renderGameOverScreen()}
      </div>
    </PageWrapper>
  );
};

export default CleanFeed;