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
  const {
    currentComment,
    nextComment,
    handleResponse,
  } = useGameController(comments, onFinish);

  const [containerWidth, setContainerWidth] = useState(400);
  const containerWidthVW = 60;
  const maxWidthPx = 700;
  const phoneWidthPercent = 55;

  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<"left" | "right" | null>(null);

  useEffect(() => {
    const updateWidth = () => {
      const vw = Math.min(window.innerWidth * (containerWidthVW / 100), maxWidthPx);
      setContainerWidth(vw);
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const handleSlide = (dir: "left" | "right") => {
    if (isAnimating) return;
    setDirection(dir);
    setIsAnimating(true);
    setTimeout(() => {
      handleResponse(dir === "right" ? "like" : "dislike");
      setDirection(null);
      setIsAnimating(false);
    }, 400);
  };

  return (
    <div className="flex flex-col items-center max-w-full">
      <Timer duration={30} />

      {isMobile ? (
        <div className="w-full px-4 max-w-md mx-auto">
          <CommentCard
            comment={currentComment}
            onLike={() => handleSlide("right")}
            onDislike={() => handleSlide("left")}
          />
        </div>
      ) : (
        <div
          className="relative flex justify-center items-center"
          style={{
            width: containerWidth,
            height: containerWidth * 1.35,
          }}
        >
          {/* ✅ 背景手图保持底部固定 */}
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
              <div className="h-full w-full relative bg-gradient-to-b from-blue-100 to-blue-200 overflow-hidden rounded-xl">
                <div className="absolute inset-0 flex items-center justify-center">

                  {/* Next card */}
                  {nextComment && (
                    <motion.div
                      key={nextComment.comment_id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.4 }}
                      exit={{ opacity: 0 }}
                      className="absolute w-full"
                    >
                      <CommentCard comment={nextComment} onLike={() => {}} onDislike={() => {}} />
                    </motion.div>
                  )}

                  {/* Current card */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentComment.comment_id}
                      initial={{ x: 0, opacity: 1 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{
                        x: direction === "right" ? 400 : -400,
                        opacity: 0,
                        transition: { duration: 0.4 },
                      }}
                      className="absolute w-full px-3"
                    >
                      <CommentCard
                        comment={currentComment}
                        onLike={() => handleSlide("right")}
                        onDislike={() => handleSlide("left")}
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </IPhoneMockup>
          </div>
        </div>
      )}

      <div className="text-center max-w-md mx-auto px-4">
        <p className="text-white text-sm opacity-80 mt-4">
          Swipe through comments and indicate whether they are appropriate (Like) or inappropriate (Dislike).
        </p>
      </div>
    </div>
  );
};

export default GameScreen;
