import React, { useState } from "react";
import { useScenarioPlayer } from "../hooks/useScenarioPlayer";
import { MediaType } from "../types/scenario.types";
import VideoPlayer from "../components/scenario/VideoPlayer";
import ImageDisplay from "../components/scenario/ImageDisplay";
import OptionsOverlay from "../components/scenario/OptionsOverlay";
import CaptionDisplay from "../components/scenario/CaptionDisplay";
import StartScreen from "../components/scenario/StartScreen";
import PageWrapper from "../components/PageWrapper";
import LoadingOverlay from "../components/LoadingOverlay";
import TextDisplay from "../components/scenario/TextDisplay";
import PrimaryButton from "../components/PrimaryButton";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

/**
 * @component ScenarioGame
 * @description Interactive scenario game component with character
 */
const ScenarioGame: React.FC = () => {
  const {
    started,
    currentNode,
    showOptions,
    caption,
    videoRef,
    startScenario,
    resetScenario,
    handleMediaEnd,
    handleOptionSelect,
    handleContinue,
  } = useScenarioPlayer();
  const navigate = useNavigate();
  const [showSpeechBubble, setShowSpeechBubble] = useState(false);
  const [characterHovered, setCharacterHovered] = useState(false);

  // Determine if the game has ended - when it's a TEXT node with no nextNodeId and no options
  const isGameEnded = started && 
    currentNode?.type === MediaType.TEXT && 
    !currentNode.nextNodeId && 
    !showOptions;

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
      {/* Full-screen game background */}
      <div className="absolute inset-0 w-full h-full z-0">
        <img
          src="/game-screen.png"
          alt="Game Screen Background"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
        <div className="container mx-auto relative h-full flex flex-col">
          {/* Character on the left side of the screen with speech bubble */}
          <motion.div
            className="absolute left-0 bottom-32 z-20 hidden md:block cursor-pointer"
            initial={{ opacity: 0, x: -100 }}
            animate={{ 
              opacity: 1, 
              x: 0,
              scale: characterHovered ? [1, 1.02, 1] : 1,
              rotate: characterHovered ? [-1, 1, -1] : 0 
            }}
            transition={{ 
              duration: 1, 
              delay: 0.5,
              scale: {
                duration: 0.5,
                repeat: Infinity,
                repeatType: "reverse"
              },
              rotate: {
                duration: 0.5,
                repeat: Infinity,
                repeatType: "reverse"
              }
            }}
            onMouseEnter={() => {
              setShowSpeechBubble(true);
              setCharacterHovered(true);
            }}
            onMouseLeave={() => {
              setShowSpeechBubble(false);
              setCharacterHovered(false);
            }}
            style={{ width: '30%', maxWidth: '350px' }}
          >
            {/* Speech bubble */}
            <AnimatePresence>
              {showSpeechBubble && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 20 }}
                  transition={{ duration: 0.3 }}
                  className="absolute -top-32 left-20 bg-white text-gray-800 p-4 rounded-2xl max-w-xs shadow-lg"
                  style={{ zIndex: 30 }}
                >
                  <div className="font-medium text-base">
                    See how your decisions play out & the impact of cyberbullying. Choose like it's happening to you!
                  </div>
                  {/* Speech bubble pointer */}
                  <div className="absolute -bottom-4 left-10 w-0 h-0 border-l-[10px] border-r-[10px] border-t-[15px] border-l-transparent border-r-transparent border-t-white"></div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Character image with glow effect */}
            <div className="relative">
              {/* Glow effect for character */}
              <div className={`absolute inset-0 rounded-full bg-cyan-300 blur-xl opacity-0 transition-opacity duration-300 ${characterHovered ? 'opacity-60' : ''}`}></div>
              <img
                src="/character-sitting.png"
                alt="Character"
                className="h-full w-full object-contain relative z-10"
                style={{
                  filter: characterHovered ? 'drop-shadow(0 0 15px rgba(64, 224, 208, 0.8))' : 'drop-shadow(0 0 10px rgba(0,0,0,0.3))'
                }}
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
                        <StartScreen onStart={startScenario} />
                      ) : (
                        <>
                          {currentNode.type === MediaType.VIDEO && (
                            <VideoPlayer
                              src={currentNode.src}
                              onEnded={handleMediaEnd}
                              videoRef={videoRef}
                            />
                          )}

                          {currentNode.type === MediaType.IMAGE && (
                            <ImageDisplay src={currentNode.src} onLoad={handleMediaEnd} />
                          )}

                          {currentNode.type === MediaType.TEXT && (
                            <TextDisplay
                              text={currentNode.caption || ""}
                              title={currentNode.title}
                              onContinue={
                                currentNode.nextNodeId ? handleContinue : undefined
                              }
                            />
                          )}

                          {/* Options overlay - stays in the player area */}
                          {showOptions && currentNode.options && (
                            <OptionsOverlay
                              options={currentNode.options}
                              onSelect={handleOptionSelect}
                            />
                          )}
                          
                          {/* Play Again button - show when game has ended */}
                          {isGameEnded && (
                            <motion.div 
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 1, duration: 0.5 }}
                              className="absolute bottom-8 left-0 right-0 flex justify-center"
                            >
                              <button 
                                onClick={resetScenario}
                                className="bg-gradient-to-r from-cyan-400 to-blue-500 px-6 py-3 rounded-full text-white font-bold cursor-pointer transform transition duration-300 hover:scale-105 shadow-lg hover:shadow-cyan-300/50 flex items-center space-x-2"
                              >
                                <svg 
                                  className="w-5 h-5 animate-pulse" 
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
                              </button>
                            </motion.div>
                          )}
                        </>
                      )}
                    </div>
                  </div>

                  {/* Caption area - outside the player but inside the frame */}
                  {started && caption && (
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                      <div className="w-full px-4">
                        <CaptionDisplay text={caption} />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Button area at the bottom */}
          <div className="flex justify-center mb-8">
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 2.2,
                delay: 0.3,
                type: "spring",
                stiffness: 100,
                damping: 10,
              }}
              className="md:ml-40"
            >
              <PrimaryButton
                variant="cta"
                rotate
                onClick={() => navigate("/story")}
              >
                See Their Story
              </PrimaryButton>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScenarioGame;