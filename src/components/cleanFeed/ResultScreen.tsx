import React from "react";
import { GameResult } from "../../types/types";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

/**
 * @component ResultScreen
 * @description
 * Visually enhanced game result screen with motion feedback.
 *
 * @param {Object} props
 * @param {GameResult} props.result - Game result data (score, percent, etc.)
 * @returns {JSX.Element}
 */
const ResultScreen: React.FC<{ 
  result: GameResult
  onRestart: () => void
}> = ({ result, onRestart }) => {
  const navigate = useNavigate();

  /**
   * @function getFeedback
   * @description Returns a feedback string based on score.
   * @returns {string}
   */
  const getFeedback = (): string => {
    // const percentNumber = Number(result.percent);
    const raw = typeof result.percent === "string" ? result.percent : "";
    const percentNumber = Number(raw.replace("%", ""));
    if (percentNumber >= 90) return "Amazing! You're a cyber safety pro!";
    if (percentNumber >= 70) return "Well done! You know your stuff.";
    if (percentNumber >= 50)
      return "Nice try! A bit more practice and you'll ace it.";
    return "Don't worry, it's a great start. Let's try again!";
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4 space-y-6">
      {/* Animated title */}
      <motion.h2
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="text-4xl font-bold text-white"
      >
        Game Over!
      </motion.h2>

      {/* Staggered result stats */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.2,
            },
          },
        }}
        className="space-y-2 text-white text-lg"
      >
        {[
          `You answered ${result.percent} correctly.`,
          `Your score is ${result.score}.`,
          `You performed better than ${result.comparison}% of players.`,
          `Total Answered: ${result.answered}, Correct: ${result.answered_correct}.`,
        ].map((text, i) => (
          <motion.p
            key={i}
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.4 }}
          >
            {text}
          </motion.p>
        ))}
      </motion.div>

      {/* Feedback banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="bg-white text-cyan-700 rounded-xl px-6 py-3 text-lg font-semibold shadow-md max-w-xl"
      >
        {getFeedback()}
      </motion.div>

      {/* Action buttons */}
      <div className="flex gap-4 pt-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onRestart}
          className="px-6 py-2 bg-white text-cyan-700 rounded-lg font-semibold hover:bg-gray-100 transition"
        >
          Try Again
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/")}
          className="px-6 py-2 border border-white text-white rounded-lg font-semibold hover:bg-white hover:text-cyan-700 transition"
        >
          Back to Home
        </motion.button>
      </div>
    </div>
  );
};

export default ResultScreen;
