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

  // Error handling to prevent page crashes
  if (!currentNode) {
    return (
      <PageWrapper className="min-h-screen bg-gradient-to-b from-[#4DC0BE] to-[#23A2DA] text-white p-4">
        <LoadingOverlay message="Loading scenario..." />
      </PageWrapper>
    );
  }

  return (
    <PageWrapper className="min-h-screen bg-gradient-to-b from-[#4DC0BE] to-[#23A2DA] text-white p-4">
      <div className="container mx-auto py-8 flex flex-col items-center relative">
        {/* Character on the left side of the screen with speech bubble */}
        <motion.div 
          className="absolute left-4 bottom-4 z-10 hidden md:block cursor-pointer" 
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          onMouseEnter={() => setShowSpeechBubble(true)}
          onMouseLeave={() => setShowSpeechBubble(false)}
        >
          {/* Speech bubble */}
          <AnimatePresence>
            {showSpeechBubble && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                transition={{ duration: 0.3 }}
                className="absolute -top-40 left-20 bg-white text-gray-800 p-4 rounded-2xl max-w-xs shadow-lg"
                style={{ zIndex: 20 }}
              >
                <div className="font-medium text-base">
                Check out how your choices online can play out with cyberbullying. Think about how it'd feel if it was happening to you before you send stuff.
                </div>
                {/* Speech bubble pointer */}
                <div className="absolute -bottom-4 left-10 w-0 h-0 border-l-[10px] border-r-[10px] border-t-[15px] border-l-transparent border-r-transparent border-t-white"></div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Character image */}
          <img 
            src="/character-sitting.png" 
            alt="Character" 
            className="h-full object-contain"
            style={{ 
              maxHeight: '50vh',
              filter: 'drop-shadow(0 0 10px rgba(0,0,0,0.3))'
            }}
          />
        </motion.div>

        {/* Player container moved to the right */}
        <div className="w-full max-w-4xl mx-auto bg-gray-900 rounded-xl overflow-hidden shadow-2xl md:ml-40">
          {/* Video/Image/Text container */}
          <div className="relative w-full aspect-video bg-black">
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

          {/* Caption area - outside the player */}
          {started && <CaptionDisplay text={caption} />}
        </div>

        <div className="mt-16 text-center">
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
            className="mt-4 md:mt-0"
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
    </PageWrapper>
  );
};

export default ScenarioGame;