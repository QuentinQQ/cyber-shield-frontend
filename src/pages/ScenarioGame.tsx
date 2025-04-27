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
    handleMediaEnd,
    handleOptionSelect,
    handleContinue,
  } = useScenarioPlayer();
  const navigate = useNavigate();
  const [showSpeechBubble, setShowSpeechBubble] = useState(false);
  const [characterHovered, setCharacterHovered] = useState(false);

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
                        </>
                      )}
                    </div>
                  </div>

                  {/* Caption area - outside the player but inside the frame */}
                  {started && (
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