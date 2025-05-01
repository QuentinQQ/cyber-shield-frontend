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
    <div className="flex flex-col items-center space-y-6 max-w-full">
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
          className="relative flex justify-center items-center py-12"
          style={{
            width: containerWidth,
            height: containerWidth * 1.6, // 固定高度用于定位
          }}
        >
          {/* 🖐 手图贴底部 */}
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

          {/* 📱 手机放中间，用 translateY 调位置 */}
          <div
            className="absolute z-20"
            style={{
              width: `${phoneWidthPercent}%`,
              left: "50%",
              transform: "translateX(-50%) translateY(-5%)", // 轻微上移避开手指遮挡
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

// import React, { useState, useEffect } from "react";
// import { CommentData, GameSubmission } from "../../types/types";
// import CommentCard from "./CommentCard";
// import Timer from "./Timer";
// import useIsMobile from "@/hooks/useIsMobile";
// import { useGameController } from "@/hooks/useGameController";
// import { IPhoneMockup } from "react-device-mockup";
// import { AnimatePresence, motion } from "framer-motion";

// /**
//  * @component GameScreen
//  * @description Clean Feed game screen (hand + phone layout in desktop mode)
//  */
// const GameScreen: React.FC<{
//   comments: CommentData[];
//   onFinish: (submissions: GameSubmission[]) => void;
// }> = ({ comments, onFinish }) => {
//   const isMobile = useIsMobile();
//   const { currentComment, handleResponse } = useGameController(comments, onFinish);
//   const [isAnimating, setIsAnimating] = useState(false);

//   const [comboWidth, setComboWidth] = useState(360); // hand + phone shared width

//   useEffect(() => {
//     const updateWidth = () => {
//       const width = Math.min(window.innerWidth * 0.6, 600); // up to 60vw, max 600px
//       setComboWidth(width);
//     };
//     updateWidth();
//     window.addEventListener("resize", updateWidth);
//     return () => window.removeEventListener("resize", updateWidth);
//   }, []);

//   const handleDelayedResponse = (action: "like" | "dislike") => {
//     if (isAnimating) return;
//     setIsAnimating(true);
//     setTimeout(() => {
//       handleResponse(action);
//       setIsAnimating(false);
//     }, 300);
//   };

//   return (
//     <div className="flex flex-col items-center space-y-6 max-w-full">
//       <Timer duration={30} />

//       {isMobile ? (
//         // 📱 Mobile view
//         <div className="w-full px-4 max-w-md mx-auto">
//           <AnimatePresence mode="wait">
//             <motion.div
//               key={currentComment.comment_id}
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               transition={{ duration: 0.3 }}
//             >
//               <CommentCard
//                 comment={currentComment}
//                 onLike={() => handleDelayedResponse("like")}
//                 onDislike={() => handleDelayedResponse("dislike")}
//               />
//             </motion.div>
//           </AnimatePresence>
//         </div>
//       ) : (
//         // 🖥️ Desktop view with hand + phone combo
//         <div className="relative w-full flex justify-center items-end py-12">
//           <div className="relative flex justify-center items-end" style={{ width: comboWidth }}>
//             {/* 🖐 Hand Image */}
//             <img
//               src="/cleanFeed/hand.png"
//               alt="Hand"
//               className="absolute w-full bottom-[-12%] z-10 pointer-events-none"
//             />

//             {/* 📱 Phone Mockup */}
//             <div className="relative z-20 w-full">
//               <IPhoneMockup
//                 screenWidth={comboWidth}
//                 isLandscape={false}
//                 screenType="island"
//                 frameColor="#E76F50"
//                 hideStatusBar={true}
//                 transparentNavBar={true}
//               >
//                 <div className="h-full w-full flex items-center justify-center bg-gradient-to-b from-blue-100 to-blue-200 p-4 overflow-hidden">
//                   <AnimatePresence mode="wait">
//                     <motion.div
//                       key={currentComment.comment_id}
//                       initial={{ opacity: 0, y: 30 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0, y: -20 }}
//                       transition={{ duration: 0.3 }}
//                       className="w-full"
//                     >
//                       <CommentCard
//                         comment={currentComment}
//                         onLike={() => handleDelayedResponse("like")}
//                         onDislike={() => handleDelayedResponse("dislike")}
//                       />
//                     </motion.div>
//                   </AnimatePresence>
//                 </div>
//               </IPhoneMockup>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* 📝 Instruction Text */}
//       <div className="text-center max-w-md mx-auto px-4">
//         <p className="text-white text-sm opacity-80 mt-4">
//           Swipe through comments and indicate whether they are appropriate (Like) or inappropriate (Dislike).
//         </p>
//       </div>
//     </div>
//   );
// };

// export default GameScreen;

// // import React, { useState } from "react";
// // import { CommentData, GameSubmission } from "../../types/types";
// // import CommentCard from "./CommentCard";
// // import Timer from "./Timer";
// // import useIsMobile from "@/hooks/useIsMobile";
// // import { useGameController } from "@/hooks/useGameController";
// // import { useMockupSize } from "@/hooks/useMockupSize";
// // import { IPhoneMockup } from "react-device-mockup";
// // import { AnimatePresence, motion } from "framer-motion";

// // /**
// //  * @component GameScreen
// //  * @description
// //  * Main game screen for Clean Feed. Contains comment judgment with transition animations.
// //  *
// //  * @param {CommentData[]} comments - List of comments to judge
// //  * @param {(submissions: GameSubmission[]) => void} onFinish - Called when game ends
// //  */
// // const GameScreen: React.FC<{
// //   comments: CommentData[];
// //   onFinish: (submissions: GameSubmission[]) => void;
// // }> = ({ comments, onFinish }) => {
// //   const isMobile = useIsMobile();
// //   const mockupSize = useMockupSize();
// //   const { currentComment, handleResponse } = useGameController(
// //     comments,
// //     onFinish
// //   );

// //   const [isAnimating, setIsAnimating] = useState(false);

// //   /**
// //    * Triggers comment change with animation delay to allow button + card transition.
// //    */
// //   const handleDelayedResponse = (action: "like" | "dislike") => {
// //     if (isAnimating) return;
// //     setIsAnimating(true);
// //     setTimeout(() => {
// //       handleResponse(action);
// //       setIsAnimating(false);
// //     }, 300); // Match exit animation duration
// //   };

// //   return (
// //     <div className="flex flex-col items-center space-y-6 max-w-full">
// //       <Timer duration={30} />

// //       {isMobile ? (
// //         // 📱 Mobile view
// //         <div className="w-full px-4 max-w-md mx-auto">
// //           <AnimatePresence mode="wait">
// //             <motion.div
// //               key={currentComment.comment_id}
// //               initial={{ opacity: 0, y: 30 }}
// //               animate={{ opacity: 1, y: 0 }}
// //               exit={{ opacity: 0, y: -20 }}
// //               transition={{ duration: 0.3 }}
// //             >
// //               <CommentCard
// //                 comment={currentComment}
// //                 onLike={() => handleDelayedResponse("like")}
// //                 onDislike={() => handleDelayedResponse("dislike")}
// //               />
// //             </motion.div>
// //           </AnimatePresence>
// //         </div>
// //       ) : (
// //         // 🖥️ Desktop view
// //         <div className="relative w-[60vw] max-w-[600px] flex justify-center items-end">
// //           {/* Hand 图层 */}
// //           <img
// //             src="/cleanFeed/hand.png"
// //             alt="Hand"
// //             className="absolute w-full bottom-[-12%] z-10 pointer-events-none"
// //           />

// //           {/* Phone 图层 */}
// //           <div className="relative z-20 w-full">
// //             <IPhoneMockup
// //               screenWidth="100%"
// //               isLandscape={false}
// //               screenType="island"
// //               frameColor="#E76F50"
// //               hideStatusBar={true}
// //               transparentNavBar={true}
// //             >
// //               <div className="h-full w-full flex items-center justify-center bg-gradient-to-b from-blue-100 to-blue-200 p-4 overflow-hidden">
// //                 <AnimatePresence mode="wait">
// //                   <motion.div
// //                     key={currentComment.comment_id}
// //                     initial={{ opacity: 0, y: 30 }}
// //                     animate={{ opacity: 1, y: 0 }}
// //                     exit={{ opacity: 0, y: -20 }}
// //                     transition={{ duration: 0.3 }}
// //                     className="w-full"
// //                   >
// //                     <CommentCard
// //                       comment={currentComment}
// //                       onLike={() => handleDelayedResponse("like")}
// //                       onDislike={() => handleDelayedResponse("dislike")}
// //                     />
// //                   </motion.div>
// //                 </AnimatePresence>
// //               </div>
// //             </IPhoneMockup>
// //           </div>
// //         </div>
// //       )}

// //       {/* Tip Text */}
// //       <div className="text-center max-w-md mx-auto px-4">
// //         <p className="text-white text-sm opacity-80 mt-4">
// //           Swipe through comments and indicate whether they are appropriate
// //           (Like) or inappropriate (Dislike).
// //         </p>
// //       </div>
// //     </div>
// //   );
// // };

// // export default GameScreen;
