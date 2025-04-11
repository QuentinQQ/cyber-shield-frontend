import React from "react";
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
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

/**
 * @component ScenarioGame
 * @description Interactive scenario game component
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
      <div className="container mx-auto py-8 flex flex-col items-center">
        {/* Player container with separate video and caption sections */}
        <div className="w-full max-w-4xl mx-auto bg-gray-900 rounded-xl overflow-hidden shadow-2xl">
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

        <div className="mt-6 max-w-2xl text-center">
          <p className="text-white text-opacity-90 text-lg">
            See how your decisions play out & the impact of cyberbullying.
            Choose like it's happening to you.
          </p>
        </div>

        <div className="mt-6 max-w-2xl text-center">
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
