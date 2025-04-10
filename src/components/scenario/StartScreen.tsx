import React from 'react';
import { motion } from 'framer-motion';

interface StartScreenProps {
  onStart: () => void;
}

/**
 * @component StartScreen
 * @description Initial screen for the scenario game with start button
 */
const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      <img
        src="/scenarioGame/scenarioStart.png"
        alt="Start screen"
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      <motion.div 
        className="z-10 bg-black bg-opacity-80 p-8 rounded-lg text-center max-w-lg shadow-xl border border-gray-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-white mb-4">Interactive Cyberbullying Scenario</h2>
        <p className="text-white mb-6">
          Experience a real-life scenario about cyberbullying and make meaningful choices that affect the outcome.
          Your decisions will reveal different consequences and perspectives.
        </p>
        <motion.button
          onClick={onStart}
          className="px-6 py-3 bg-gradient-to-r from-[#4DC0BE] to-[#23A2DA] text-white font-bold rounded-lg hover:opacity-90 transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Begin Experience
        </motion.button>
      </motion.div>
    </div>
  );
};

export default StartScreen;