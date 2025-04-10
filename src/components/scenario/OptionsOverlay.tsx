import React from 'react';
import { motion } from 'framer-motion';

interface Option {
  id: string;
  text: string;
}

interface OptionsOverlayProps {
  options: Option[];
  onSelect: (optionId: string) => void;
}

/**
 * @component OptionsOverlay
 * @description Displays interactive decision options in the scenario
 */
const OptionsOverlay: React.FC<OptionsOverlayProps> = ({ options, onSelect }) => {
  return (
    <motion.div 
      className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-80 z-10 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-2xl w-full bg-gray-900 bg-opacity-80 p-6 rounded-xl border border-gray-700 shadow-xl">
        <h3 className="text-xl text-white text-center mb-6 font-bold">What will you do?</h3>
        
        <div className="flex flex-col space-y-4">
          {options.map((option, index) => (
            <motion.button
              key={option.id}
              className="px-5 py-4 bg-gradient-to-r from-[#4DC0BE] to-[#23A2DA] text-white rounded-lg text-left shadow-lg"
              whileHover={{ scale: 1.02, boxShadow: "0 5px 15px rgba(0,0,0,0.2)" }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelect(option.id)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              {option.text}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default OptionsOverlay;