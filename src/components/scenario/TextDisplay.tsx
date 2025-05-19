import React from 'react';
import { motion } from 'framer-motion';

interface TextDisplayProps {
  text: string;
  title?: string;
  onContinue?: () => void;
  isFeedback?: boolean;
}

/**
 * @component TextDisplay
 * @description Displays text-based results, endings, or feedback messages
 */
const TextDisplay: React.FC<TextDisplayProps> = ({ text, title, onContinue, isFeedback = false }) => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-black bg-opacity-90">
      <motion.div 
        className={`max-w-2xl w-full p-8 rounded-xl shadow-xl border ${
          isFeedback 
            ? 'bg-red-900/90 border-red-700' 
            : 'bg-gray-900 border-gray-700'
        } text-white`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {title && (
          <h3 className={`text-2xl font-bold text-center mb-4 ${
            isFeedback ? 'text-red-400' : 'text-blue-400'
          }`}>
            {title}
          </h3>
        )}
        
        <p className="text-lg leading-relaxed whitespace-pre-line">{text}</p>
        
        {onContinue && (
          <div className="mt-8 flex justify-center">
            <motion.button
              className={`px-6 py-3 font-bold rounded-lg ${
                isFeedback
                  ? 'bg-red-600 hover:bg-red-700'
                  : 'bg-gradient-to-r from-[#4DC0BE] to-[#23A2DA] hover:opacity-90'
              } text-white`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onContinue}
            >
              {isFeedback ? 'Try Again' : 'Continue'}
            </motion.button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default TextDisplay;