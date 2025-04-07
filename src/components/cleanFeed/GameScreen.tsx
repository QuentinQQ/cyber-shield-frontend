import React from "react";
import { CommentData, GameSubmission } from "../../types/types";
import CommentCard from "./CommentCard";
import Timer from "./Timer";
import useIsMobile from "@/hooks/useIsMobile";
import { useGameController } from "@/hooks/useGameController";
import { useMockupSize } from "@/hooks/useMockupSize";
import { IPhoneMockup } from "react-device-mockup";

/**
 * @component GameScreen
 * @description
 * Main game screen component for Clean Feed game.
 * Renders comments and like/dislike buttons, styled differently on mobile and desktop.
 *
 * @param {Object} props
 * @param {CommentData[]} props.comments - Array of comment objects to be judged
 * @param {(submissions: GameSubmission[]) => void} props.onFinish - Callback fired when game ends
 *
 * @returns {JSX.Element} Rendered game interface
 */
const GameScreen: React.FC<{
  comments: CommentData[];
  onFinish: (submissions: GameSubmission[]) => void;
}> = ({ comments, onFinish }) => {
  const isMobile = useIsMobile();
  const { currentComment, handleResponse } = useGameController(comments, onFinish);
  const mockupSize = useMockupSize();

  return (
    <div className="flex flex-col items-center space-y-6 max-w-full">
      <Timer duration={60} />

      {isMobile ? (
        // Mobile view: no device mockup
        <div className="w-full px-4 max-w-md mx-auto">
          <CommentCard
            comment={currentComment}
            onLike={() => handleResponse("like")}
            onDislike={() => handleResponse("dislike")}
          />
        </div>
      ) : (
        // Desktop view: wrapped inside phone mockup
        <div className="w-full flex justify-center">
          <IPhoneMockup
            screenWidth={mockupSize.width}
            isLandscape={false}
            screenType="island"
            frameColor="#E76F50"
            hideStatusBar={true}
            transparentNavBar={true}
          >
            <div className="h-full w-full flex items-center justify-center bg-gradient-to-b from-blue-100 to-blue-200 p-4 overflow-hidden">
              <div className="w-full">
                <CommentCard
                  comment={currentComment}
                  onLike={() => handleResponse("like")}
                  onDislike={() => handleResponse("dislike")}
                />
              </div>
            </div>
          </IPhoneMockup>
        </div>
      )}

      {/* Text tip */}
      <div className="text-center max-w-md mx-auto px-4">
        <p className="text-white text-sm opacity-80 mt-4">
          Swipe through comments and indicate whether they are appropriate (Like) or inappropriate (Dislike).
        </p>
      </div>
    </div>
  );
};

export default GameScreen;
