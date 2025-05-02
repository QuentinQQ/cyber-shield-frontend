import React, { useState } from "react";
import { useScenarioPlayer } from "../hooks/useScenarioPlayer";
import { MediaType } from "../types/scenario.types";
import VideoPlayer from "../components/scenario/VideoPlayer";
import ImageDisplay from "../components/scenario/ImageDisplay";
import OptionsOverlay from "../components/scenario/OptionsOverlay";
// import CaptionDisplay from "../components/scenario/CaptionDisplay";
import PageWrapper from "../components/PageWrapper";
import LoadingOverlay from "../components/LoadingOverlay";
import TextDisplay from "../components/scenario/TextDisplay";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

// Character Dialog Component with proper type annotation - using the same style as CharacterIntroPage
interface CharacterDialogProps {
  content: React.ReactNode;
  isVisible: boolean;
  className?: string;
  customStyle?: React.CSSProperties;
}

const CharacterDialog: React.FC<CharacterDialogProps> = ({ content, isVisible, className = "", customStyle = {} }) => {
  return isVisible ? (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      className={`speech-bubble relative ${className}`}
      style={{
        position: "relative",
        margin: "0.5em 0",
        padding: "1em",
        width: "15em", 
        minHeight: "4em",
        borderRadius: "0.25em",
        transform: "rotate(-4deg) rotateY(15deg)",
        background: "#629bdd",
        fontFamily: "Century Gothic, Verdana, sans-serif",
        fontSize: "1.5rem",
        textAlign: "center",
        zIndex: 2,
        ...customStyle,
      }}
    >
      {/* Content */}
      <motion.div 
        className="text-lg font-medium text-gray-800 z-10 relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        style={{ position: "relative", zIndex: 5 }}
      >
        {content}
      </motion.div>
    </motion.div>
  ) : null;
};

// Teleport Bubble component - reusable across pages
const TeleportBubble: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="absolute bottom-10 right-20 cursor-pointer z-50"
      onClick={onClick}
      style={{
        width: '150px',
        height: '150px',
      }}
    >
      {/* Teleport bubble animation */}
      <div 
        className="teleport-bubble"
        style={{
          width: '150px',  
          height: '150px',
          background: 'hsl(212, 100%, 71%)',
          border: '13px solid hsl(212, 100%, 81%)',
          position: 'relative',
          overflow: 'visible',
          borderRadius: '48% 40% 62% 47% / 61% 49% 64% 43%',
          animation: 'rotateTeleport 35s infinite linear',
          zIndex: 10
        }}
      >
        {/* Inner layers of the teleport bubble */}
        <div 
          style={{
            content: '',
            position: 'absolute',
            top: '15px',
            left: '15px',
            width: 'calc(100% - 45px)',
            height: 'calc(100% - 45px)',
            background: 'hsl(212, 100%, 51%)',
            border: '10px solid hsl(212, 100%, 61%)',
            borderRadius: '41% 40% 50% 55% / 49% 52% 51% 43%',
            zIndex: -2,
            animation: 'rotateTeleportBefore 35s infinite linear'
          }}
        />
        <div 
          style={{
            content: '',
            position: 'absolute',
            top: '30px',
            left: '30px',
            width: 'calc(100% - 75px)',
            height: 'calc(100% - 75px)',
            background: 'hsl(212, 100%, 31%)',
            border: '7px solid hsl(212, 100%, 41%)',
            borderRadius: '42% 63% 51% 60% / 47% 62% 42% 52%',
            animation: 'rotateTeleportAfter 35s infinite linear'
          }}
        />
      </div>
    </motion.div>
  );
};

/**
 * @component ScenarioGame
 * @description Interactive scenario game component with character
 */
const ScenarioGame: React.FC = () => {
  const navigate = useNavigate();
  const {
    started,
    currentNode,
    showOptions,
    // caption,
    videoRef,
    startScenario,
    resetScenario,
    handleMediaEnd,
    handleOptionSelect,
    handleContinue,
  } = useScenarioPlayer();
  const [showCharacterDialog, setShowCharacterDialog] = useState(true);
  const [dialogStage] = useState(1);

  // Auto-hide the speech bubble after a few seconds
  React.useEffect(() => {
    // Show the bubble initially
    setShowCharacterDialog(true);
    
    // Hide it after 5 seconds
    const timer = setTimeout(() => {
      setShowCharacterDialog(false);
    }, 5000);
    
    // Clean up on unmount
    return () => clearTimeout(timer);
  }, []);

  // Handle character click to show the speech bubble again
  const handleCharacterClick = () => {
    setShowCharacterDialog(true);
    
    // Hide it again after 5 seconds
    const timer = setTimeout(() => {
      setShowCharacterDialog(false);
    }, 5000);
    
    return () => clearTimeout(timer);
  };

  // Determine if the game has ended - when it's a TEXT node with no nextNodeId and no options
  const isGameEnded = started && 
    currentNode?.type === MediaType.TEXT && 
    !currentNode.nextNodeId && 
    !showOptions;

  // Handle teleport to story page
  const handleTeleport = () => {
    navigate("/story");
  };

  // Get dialog content based on stage
  const getDialogContent = (stageNum: number) => {
    if (stageNum === 1) {
      return "See how your decisions play out & the impact of cyberbullying. Choose like it's happening to you!";
    }
    return "";
  };

  // Get position styles for each dialog
  const getDialogPositionStyle = (stageNum: number) => {
    if (stageNum === 1) {
      return {
        top: "-180px",
        left: "30px",
        position: "absolute" as const,
      };
    }
    return {};
  };

  // Error handling to prevent page crashes
  if (!currentNode) {
    return (
      <PageWrapper className="min-h-screen bg-gradient-to-b from-[#4DC0BE] to-[#23A2DA] text-white p-4">
        <LoadingOverlay message="Loading scenario..." />
      </PageWrapper>
    );
  }

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Keyframe animations for teleport bubble and speech bubble */}
      <style>{`
        @keyframes rotateTeleport {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes rotateTeleportBefore {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(-720deg); }
        }
        @keyframes rotateTeleportAfter {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(720deg); }
        }
        
        /* Global styles for the speech bubble */
        .speech-bubble:before, .speech-bubble:after {
          position: absolute;
          z-index: -1;
          content: '';
        }
        
        .speech-bubble:after {
          top: 0; 
          right: 0; 
          bottom: 0; 
          left: 0;
          border-radius: inherit;
          transform: rotate(2deg) translate(.35em, -.15em) scale(1.02);
          background: #f4fbfe;
        }
        
        .speech-bubble:before {
          border: solid 0 transparent;
          border-right: solid 3.5em #f4fbfe;
          border-bottom: solid .25em #629bdd;
          bottom: .25em; 
          left: 1.25em;
          width: 0; 
          height: 1em;
          transform: rotate(45deg) skewX(75deg);
        }
      `}</style>

      {/* Full-screen game background */}
      <div className="absolute inset-0 w-full h-full z-0">
        <img
          src="/game-screen.png"
          alt="Game Screen Background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Teleport Bubble - always visible */}
      <TeleportBubble onClick={handleTeleport} />

      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
        <div className="container mx-auto relative h-full flex flex-col">
          {/* Character on the left side of the screen with speech bubble */}
          <motion.div
            className="absolute left-0 bottom-32 z-20 hidden md:block cursor-pointer"
            initial={{ opacity: 0, x: -100 }}
            animate={{ 
              opacity: 1, 
              x: 0
            }}
            transition={{ 
              duration: 1, 
              delay: 0.5
            }}
            onClick={handleCharacterClick}
            style={{ width: '30%', maxWidth: '350px' }}
          >
            {/* Character Dialog - using the new component */}
            <AnimatePresence>
              {showCharacterDialog && (
                <CharacterDialog
                  key={`dialog-${dialogStage}`}
                  content={getDialogContent(dialogStage)}
                  isVisible={true}
                  className="ml-4"
                  customStyle={getDialogPositionStyle(dialogStage)}
                />
              )}
            </AnimatePresence>

            {/* Character image without glow effect */}
            <div className="relative">
              <img
                src="/character-sitting.gif"
                alt="Character"
                className="h-full w-full object-contain relative z-10"
              />
            </div>
          </motion.div>

          {/* Game content container positioned in the center of screen */}
          <div className="flex-1 flex items-center justify-center">
            <div className="w-full max-w-4xl mx-auto md:ml-40">
              {/* Content area positioned to align with the screen in the background */}
              <div className="relative aspect-video">
                {/* Screen glow effect */}
                <div className="absolute top-[15%] left-[10%] right-[3%] bottom-[10%] -z-1 bg-cyan-400 blur-xl opacity-30 animate-pulse"></div>
                
                {/* Player container */}
                <div className="absolute top-[20%] left-[15%] right-[8%] bottom-[15%] flex items-center justify-center">
                  {/* Screen border glow */}
                  <div className="absolute inset-0 rounded-md bg-cyan-200 blur-md opacity-70 animate-pulse"></div>
                  
                  <div className="w-full h-full bg-gray-900 overflow-hidden relative z-10" style={{ borderRadius: '4px' }}>
                    {/* Video/Image/Text container */}
                    <div className="relative w-full h-full bg-black">
                      {!started ? (
                        // Updated StartScreen with Planet Bounce button
                        <div className="flex flex-col items-center justify-center h-full w-full bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6">
                          <div className="relative">
                            {/* Shadow beneath the button */}
                            <motion.div 
                              className="absolute w-full h-4 bg-black/20 rounded-full blur-md bottom-0 left-0"
                              animate={{
                                width: ['90%', '60%', '90%'],
                                x: ['5%', '20%', '5%']
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                repeatType: "reverse"
                              }}
                            />
                            
                            <motion.button
                              onClick={startScenario}
                              className="relative bg-[#C2E764] text-black font-bold py-4 px-8 rounded-full z-10 shadow-lg"
                              whileHover={{ 
                                scale: 1.05,
                              }}
                              whileTap={{ 
                                scale: 0.95,
                              }}
                              // Combined initial and animate states with transitions
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ 
                                opacity: 1, 
                                y: [0, -8, 0] 
                              }}
                              transition={{
                                opacity: { duration: 0.5, delay: 0.3 },
                                y: {
                                  duration: 1.2,
                                  repeat: Infinity,
                                  ease: "easeInOut",
                                  delay: 0.3
                                }
                              }}
                            >
                              Begin the Experience
                              
                              {/* Ring orbits */}
                              <motion.div
                                className="absolute inset-0 border-2 border-black/10 rounded-full"
                                animate={{ scale: [1, 1.1, 1], opacity: [0.7, 0.5, 0.7] }}
                                transition={{ duration: 3, repeat: Infinity }}
                              />
                              <motion.div
                                className="absolute inset-0 border-2 border-black/5 rounded-full"
                                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.3, 0.5] }}
                                transition={{ duration: 3, delay: 0.2, repeat: Infinity }}
                              />
                            </motion.button>
                          </div>
                        </div>
                      ) : (
                        <>
                          {currentNode.type === MediaType.VIDEO && (
                            <VideoPlayer src={currentNode.src} onEnded={handleMediaEnd} videoRef={videoRef} />
                          )}
                          {currentNode.type === MediaType.IMAGE && (
                            <ImageDisplay src={currentNode.src} onLoad={handleMediaEnd} />
                          )}
                          {currentNode.type === MediaType.TEXT && (
                            <TextDisplay
                              text={currentNode.title ?? ""}   // 🔄 UPDATED — 直接用 title
                              onContinue={currentNode.nextNodeId ? handleContinue : undefined}
                            />
                          )}

                          {/* Options overlay - stays in the player area */}
                          {showOptions && currentNode.options && (
                            <OptionsOverlay options={currentNode.options} onSelect={handleOptionSelect} />
                          )}
                          
                          {/* Updated Play Again button with Planet Bounce style */}
                          {isGameEnded && (
                            <motion.div 
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 1, duration: 0.5 }}
                              className="absolute bottom-8 left-0 right-0 flex justify-center"
                            >
                              <div className="relative">
                                {/* Shadow beneath the button */}
                                <motion.div 
                                  className="absolute w-full h-4 bg-black/20 rounded-full blur-md bottom-0 left-0"
                                  animate={{
                                    width: ['90%', '60%', '90%'],
                                    x: ['5%', '20%', '5%']
                                  }}
                                  transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    repeatType: "reverse"
                                  }}
                                />
                                
                                <motion.button 
                                  onClick={resetScenario}
                                  className="relative bg-[#C2E764] text-black px-6 py-3 rounded-full font-bold cursor-pointer z-10 shadow-lg flex items-center space-x-2"
                                  whileHover={{ 
                                    scale: 1.05,
                                  }}
                                  whileTap={{ 
                                    scale: 0.95,
                                  }}
                                  // Add a bouncing animation for the button
                                  animate={{
                                    y: [0, -8, 0],
                                  }}
                                  transition={{
                                    y: {
                                      duration: 1.2,
                                      repeat: Infinity,
                                      ease: "easeInOut"
                                    }
                                  }}
                                >
                                  <svg 
                                    className="w-5 h-5" 
                                    viewBox="0 0 24 24"
                                    fill="none" 
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path 
                                      d="M1 4V10H7" 
                                      stroke="currentColor" 
                                      strokeWidth="2" 
                                      strokeLinecap="round" 
                                      strokeLinejoin="round"
                                    />
                                    <path 
                                      d="M3.51 15C4.15839 17.0732 5.38734 18.8954 7.0718 20.2066C8.75625 21.5178 10.8431 22.2583 12.9999 22.3116C15.1567 22.365 17.2783 21.7297 19.0272 20.5087C20.7761 19.2877 22.0789 17.5433 22.7973 15.5128C23.5157 13.4824 23.6138 11.264 23.0783 9.1701C22.5429 7.07615 21.3986 5.20785 19.7964 3.81318C18.1941 2.41851 16.2109 1.56634 14.1176 1.36788C12.0243 1.16943 9.92526 1.63427 8.12 2.7" 
                                      stroke="currentColor" 
                                      strokeWidth="2" 
                                      strokeLinecap="round" 
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                  <span>Give it another try?</span>
                                  
                                  {/* Ring orbits */}
                                  <motion.div
                                    className="absolute inset-0 border-2 border-black/10 rounded-full"
                                    animate={{ scale: [1, 1.1, 1], opacity: [0.7, 0.5, 0.7] }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                  />
                                  <motion.div
                                    className="absolute inset-0 border-2 border-black/5 rounded-full"
                                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.3, 0.5] }}
                                    transition={{ duration: 3, delay: 0.2, repeat: Infinity }}
                                  />
                                </motion.button>
                              </div>
                            </motion.div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScenarioGame;