import React from 'react';
import { motion } from 'framer-motion';

interface TextDisplayProps {
  text: string;
  title?: string;
  onContinue?: () => void;
}

/**
 * @component TextDisplay
 * @description Displays text-based results or endings
 */
const TextDisplay: React.FC<TextDisplayProps> = ({ text, title, onContinue }) => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-black bg-opacity-90">
      <motion.div 
        className="max-w-2xl w-full bg-gray-900 p-8 rounded-xl shadow-xl border border-gray-700 text-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {title && (
          <h3 className="text-2xl font-bold text-center mb-4 text-red-400">{title}</h3>
        )}
        
        <p className="text-lg leading-relaxed whitespace-pre-line">{text}</p>
        
        {onContinue && (
          <div className="mt-8 flex justify-center">
            <motion.button
              className="px-6 py-3 bg-gradient-to-r from-[#4DC0BE] to-[#23A2DA] text-white font-bold rounded-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onContinue}
            >
              Continue
            </motion.button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default TextDisplay;