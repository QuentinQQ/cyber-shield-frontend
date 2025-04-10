import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CaptionDisplayProps {
  text: string | null;
}

/**
 * @component CaptionDisplay
 * @description Displays captions/subtitles below the player
 */
const CaptionDisplay: React.FC<CaptionDisplayProps> = ({ text }) => {
  return (
    <div className="w-full bg-gray-800 rounded-b-lg min-h-[60px] p-3">
      <AnimatePresence>
        {text ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="text-white text-center text-lg"
          >
            {text}
          </motion.div>
        ) : (
          <div className="h-6"></div> // Empty space holder to maintain height
        )}
      </AnimatePresence>
    </div>
  );
};

export default CaptionDisplay;