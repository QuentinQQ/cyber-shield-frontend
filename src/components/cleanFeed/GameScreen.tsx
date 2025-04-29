import React, { useState } from "react";
import { CommentData, GameSubmission } from "../../types/types";
import CommentCard from "./CommentCard";
import Timer from "./Timer";
import useIsMobile from "@/hooks/useIsMobile";
import { useGameController } from "@/hooks/useGameController";
import { useMockupSize } from "@/hooks/useMockupSize";
import { IPhoneMockup } from "react-device-mockup";
import { AnimatePresence, motion } from "framer-motion";

/**
 * @component GameScreen
 * @description
 * Main game screen for Clean Feed. Contains comment judgment with transition animations.
 *
 * @param {CommentData[]} comments - List of comments to judge
 * @param {(submissions: GameSubmission[]) => void} onFinish - Called when game ends
 */
const GameScreen: React.FC<{
  comments: CommentData[];
  onFinish: (submissions: GameSubmission[]) => void;
}> = ({ comments, onFinish }) => {
  const isMobile = useIsMobile();
  const mockupSize = useMockupSize();
  const { currentComment, handleResponse } = useGameController(comments, onFinish);

  const [isAnimating, setIsAnimating] = useState(false);

  /**
   * Triggers comment change with animation delay to allow button + card transition.
   */
  const handleDelayedResponse = (action: "like" | "dislike") => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      handleResponse(action);
      setIsAnimating(false);
    }, 300); // Match exit animation duration
  };

  return (
    <div className="flex flex-col items-center space-y-6 max-w-full">
      <Timer duration={60} />

      {isMobile ? (
        // 📱 Mobile view
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
        // 💻 Desktop view
        <div className="w-full flex justify-center">
          <div className="flex items-center justify-center w-full">
            <div style={{ width: mockupSize.width }}>
              <IPhoneMockup
                screenWidth={mockupSize.width}
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
        </div>
      )}

      {/* Tip Text */}
      <div className="text-center max-w-md mx-auto px-4">
        <p className="text-white text-sm opacity-80 mt-4">
          Swipe through comments and indicate whether they are appropriate (Like) or inappropriate (Dislike).
        </p>
      </div>
    </div>
  );
};

export default GameScreen;