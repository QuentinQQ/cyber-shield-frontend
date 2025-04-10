import React from 'react';
import { useScenarioPlayer } from '../hooks/useScenarioPlayer';
import { MediaType } from '../types/scenario.types';
import VideoPlayer from '../components/scenario/VideoPlayer';
import ImageDisplay from '../components/scenario/ImageDisplay';
import OptionsOverlay from '../components/scenario/OptionsOverlay';
import CaptionDisplay from '../components/scenario/CaptionDisplay';
import StartScreen from '../components/scenario/StartScreen';
import PageWrapper from '../components/PageWrapper';
import LoadingOverlay from '../components/LoadingOverlay';

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
  } = useScenarioPlayer();

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
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
          Cyberbullying Interactive Scenario
        </h1>
        
        {/* Player container with separate video and caption sections */}
        <div className="w-full max-w-4xl mx-auto bg-gray-900 rounded-xl overflow-hidden shadow-2xl">
          {/* Video/Image container */}
          <div className="relative w-full aspect-video bg-black">
            {!started ? (
              <StartScreen onStart={startScenario} />
            ) : (
              <>
                {currentNode.type === MediaType.VIDEO ? (
                  <VideoPlayer
                    src={currentNode.src}
                    onEnded={handleMediaEnd}
                    videoRef={videoRef}
                  />
                ) : (
                  <ImageDisplay
                    src={currentNode.src}
                    onLoad={handleMediaEnd}
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
            Your decisions in this scenario will influence the outcome and demonstrate the impact of cyberbullying.
          </p>
          <p className="text-white text-opacity-70 text-sm mt-2">
            Watch the videos and make choices that reflect how you would respond in real life.
          </p>
        </div>
      </div>
    </PageWrapper>
  );
};

export default ScenarioGame;