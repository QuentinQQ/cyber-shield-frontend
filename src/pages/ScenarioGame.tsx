import React, { useState, useEffect } from "react";
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
import { TeleportBubble } from "@/components/TeleportBubble";


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
    videoRef,
    wrongOptions,
    isShowingFeedback,
    originalNodeId,
    skipVideoPlayback,
    isFinalVideoCompleted,
    startScenario,
    resetScenario,
    handleMediaEnd,
    handleOptionSelect,
    handleContinue,
  } = useScenarioPlayer();
  const [showCharacterDialog, setShowCharacterDialog] = useState(true);
  const [dialogStage, setDialogStage] = useState(1);
  const [feedbackMessage, setFeedbackMessage] = useState("");

  // Auto-hide the speech bubble after a few seconds
  useEffect(() => {
    setShowCharacterDialog(true);
    const timer = setTimeout(() => {
      setShowCharacterDialog(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  // Update feedback message when a feedback video is shown
  useEffect(() => {
    if (isShowingFeedback) {
      setFeedbackMessage("That's not quite right. Let's think about this again.");
      setDialogStage(2); // Update dialog to show feedback in character speech bubble
      setShowCharacterDialog(true);
    } else {
      setDialogStage(1);
    }
  }, [isShowingFeedback]);

  // Handle character click to show the speech bubble again
  const handleCharacterClick = () => {
    setShowCharacterDialog(true);
    const timer = setTimeout(() => {
      setShowCharacterDialog(false);
    }, 5000);
    return () => clearTimeout(timer);
  };

  // Determine if the game has ended
  const isGameEnded = started && 
    (
      // Original condition
      (currentNode?.type === MediaType.TEXT && !currentNode.nextNodeId && !showOptions) ||
      // Additional condition: If current node is A012, has no nextNodeId, and the video has completed
      (currentNode?.id === "A012" && !currentNode.nextNodeId && isFinalVideoCompleted)
    );

  // Handle teleport to story page
  const handleTeleportNext = () => {
    navigate("/clean-feed");
  };

  const handleTeleportBack = () => {
    navigate(-1);
  };

  // Get dialog content based on stage
  const getDialogContent = (stageNum: number) => {
    if (stageNum === 1) {
      return "See how your decisions play out & the impact of cyberbullying. Choose like it's happening to you!";
    } else if (stageNum === 2) {
      return "That choice wasn't right. Try a different option!";
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
    } else if (stageNum === 2) {
      return {
        top: "-180px",
        left: "30px",
        position: "absolute" as const,
        background: "#e74c3c",
      };
    }
    return {};
  };

  // Get incorrect options for the current node
  const getIncorrectOptions = () => {
    if (!originalNodeId && currentNode) {
      return wrongOptions[currentNode.id] || [];
    }
    return originalNodeId ? (wrongOptions[originalNodeId] || []) : [];
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
      <TeleportBubble onClick={handleTeleportNext} color="blue" position="right" text="Clean Feed" />
      <TeleportBubble onClick={handleTeleportBack} color="purple" position="left" text="Back" />

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
                            <VideoPlayer 
                              src={currentNode.src} 
                              onEnded={handleMediaEnd} 
                              videoRef={videoRef}
                              skipPlayback={skipVideoPlayback}
                            />
                          )}
                          {currentNode.type === MediaType.IMAGE && (
                            <ImageDisplay src={currentNode.src} onLoad={handleMediaEnd} />
                          )}
                          {currentNode.type === MediaType.TEXT && (
                            <TextDisplay
                              text={currentNode.title ?? ""}
                              onContinue={currentNode.nextNodeId ? handleContinue : undefined}
                              isFeedback={isShowingFeedback}
                              title={isShowingFeedback ? feedbackMessage : undefined}
                            />
                          )}

                          {/* Options overlay - stays in the player area */}
                          {showOptions && currentNode.options && (
                            <OptionsOverlay 
                              options={currentNode.options} 
                              onSelect={handleOptionSelect}
                              incorrectOptions={getIncorrectOptions()}
                            />
                          )}
                          
                          {/* Updated Play Again button with Planet Bounce style */}
                          {isGameEnded && (
                            <motion.div 
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.5, duration: 0.5 }}
                              className="absolute bottom-8 left-0 right-0 flex justify-center z-20"
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
                                  Try Again
                                  
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