import React, { useState, useEffect } from "react";
import { CommentData, GameSubmission } from "../../types/types";
import CommentCard from "./CommentCard";
import Timer from "./Timer";
import useIsMobile from "@/hooks/useIsMobile";
import { useGameController } from "@/hooks/useGameController";
import { IPhoneMockup } from "react-device-mockup";
import { AnimatePresence, motion } from "framer-motion";

const GameScreen: React.FC<{
  comments: CommentData[];
  onFinish: (submissions: GameSubmission[]) => void;
}> = ({ comments, onFinish }) => {
  const isMobile = useIsMobile();
  const { currentComment, handleResponse } = useGameController(
    comments,
    onFinish
  );
  const [isAnimating, setIsAnimating] = useState(false);

  // Optional: you can tweak this width percentage or maxWidth value
  const containerWidthVW = 60;
  const maxWidthPx = 700;
  const phoneWidthPercent = 55; // phone is narrower than hand image

  const [containerWidth, setContainerWidth] = useState(400);

  useEffect(() => {
    const updateWidth = () => {
      const vw = Math.min(
        window.innerWidth * (containerWidthVW / 100),
        maxWidthPx
      );
      setContainerWidth(vw);
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const handleDelayedResponse = (action: "like" | "dislike") => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      handleResponse(action);
      setIsAnimating(false);
    }, 300);
  };

  return (
    <div className="flex flex-col items-center max-w-full">
      <Timer duration={30} />

      {isMobile ? (
        <div className="w-full px-4 max-w-md mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentComment.comment_id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <CommentCard
                comment={currentComment}
                onLike={() => handleDelayedResponse("like")}
                onDislike={() => handleDelayedResponse("dislike")}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      ) : (
        <div
          className="relative flex justify-center items-center"
          style={{
            width: containerWidth,
            height: containerWidth * 1.35,
          }}
        >
          // Hand image
          <img
            src="/cleanFeed/hand-2.png"
            alt="Hand"
            className="absolute w-full z-10 pointer-events-none"
            style={{
              bottom: 0,
              left: 0,
              right: 0,
              position: "absolute",
            }}
          />

          // Phone mockup
          <div
            className="absolute z-20"
            style={{
              width: `${phoneWidthPercent}%`,
              left: "50%",
              transform: "translateX(-50%) translateY(-5%)",
            }}
          >
            <IPhoneMockup
              screenWidth={containerWidth * (phoneWidthPercent / 100)}
              isLandscape={false}
              screenType="island"
              frameColor="#E76F50"
              hideStatusBar={true}
              transparentNavBar={true}
            >
              <div className="h-full w-full flex items-center justify-center bg-gradient-to-b from-blue-100 to-blue-200 p-4 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentComment.comment_id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="w-full"
                  >
                    <CommentCard
                      comment={currentComment}
                      onLike={() => handleDelayedResponse("like")}
                      onDislike={() => handleDelayedResponse("dislike")}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </IPhoneMockup>
          </div>
        </div>
      )}

      <div className="text-center max-w-md mx-auto px-4">
        <p className="text-white text-sm opacity-80 mt-4">
          Swipe through comments and indicate whether they are appropriate
          (Like) or inappropriate (Dislike).
        </p>
      </div>
    </div>
  );
};

export default GameScreen;