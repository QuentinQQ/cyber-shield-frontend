import React from 'react';
import { motion } from 'framer-motion';

interface Option {
  id: string;
  text: string;
}

interface OptionsOverlayProps {
  options: Option[];
  onSelect: (optionId: string) => void;
  incorrectOptions?: string[]; // Array of option IDs that were tried and incorrect
}

/**
 * @component OptionsOverlay
 * @description Displays interactive decision options in the scenario
 */
const OptionsOverlay: React.FC<OptionsOverlayProps> = ({ 
  options, 
  onSelect,
  incorrectOptions = []
}) => {
  return (
    <motion.div 
      className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-80 z-10 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-2xl w-full bg-gray-900 bg-opacity-90 p-6 rounded-xl border border-gray-700 shadow-xl">
        <h3 className="text-xl text-white text-center mb-6 font-bold">What will you do?</h3>
        
        <div className="flex flex-col space-y-4">
          {options.map((option, index) => {
            const isIncorrect = incorrectOptions.includes(option.id);
            
            return (
              <motion.button
                key={option.id}
                className={`
                  px-5 py-4 rounded-lg text-left shadow-lg 
                  hover:shadow-xl transition-all duration-300
                  flex items-center
                  ${isIncorrect 
                    ? 'bg-gradient-to-r from-red-700 to-red-900 text-white opacity-70' 
                    : 'bg-gradient-to-r from-[#4DC0BE] to-[#23A2DA] text-white'
                  }
                `}
                whileHover={{ 
                  scale: isIncorrect ? 1.01 : 1.02, 
                  boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
                  background: isIncorrect 
                    ? "linear-gradient(to right, #9B2C2C, #742A2A)" 
                    : "linear-gradient(to right, #23A2DA, #4DC0BE)"
                }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelect(option.id)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="flex items-center w-full">
                  {isIncorrect && (
                    <span className="mr-3 text-lg font-bold text-red-400">X</span>
                  )}
                  <div className="flex-1">
                    <span className="text-lg font-medium">{option.text}</span>
                    {isIncorrect && (
                      <p className="text-sm text-red-300 mt-1">
                        You've tried this - it's incorrect.
                      </p>
                    )}
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default OptionsOverlay;