// File: src/pages/CharacterIntroPage.tsx

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import PageWrapper from "@/components/PageWrapper";
import PrimaryButton from "@/components/PrimaryButton";

// Add proper TypeScript interfaces
interface CharacterDialogProps {
  content: string;
  isVisible: boolean;
  className?: string;
}

// Character Dialog Component with proper type annotation
const CharacterDialog: React.FC<CharacterDialogProps> = ({ content, isVisible, className = "" }) => {
  return isVisible ? (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      className={`bg-white/90 backdrop-blur-sm rounded-2xl p-6 max-w-md mx-auto shadow-lg border-4 border-blue-300 relative ${className}`}
    >
      {/* Speech bubble pointer */}
      <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[10px] border-r-[10px] border-t-[15px] border-l-transparent border-r-transparent border-t-white"></div>
      
      {/* Text with typing animation */}
      <motion.p 
        className="text-xl font-medium text-gray-800"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        {content}
      </motion.p>
    </motion.div>
  ) : null;
};

// Custom component to handle the character with transparent background
const CustomCharacter = () => {
  return (
    <div 
      style={{ 
        width: "100%",
        height: "100%",
        position: "relative",
        mixBlendMode: "multiply",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img 
        src="/character-intro.gif" 
        alt="Character" 
        style={{
          maxWidth: "100%",
          maxHeight: "100%",
          objectFit: "contain",
          imageRendering: "auto",
          filter: "contrast(1.2)",
        }}
      />
    </div>
  );
};

const CharacterIntroPage: React.FC = () => {
  const navigate = useNavigate();
  const [stage, setStage] = useState(0);
  const [imageError] = useState(false);
  
  // Dialog content
  const dialogContent = [
    "Hi, my name is...!",
    "Guess what?! My mom finally got me a phone! Super excited! You wanna play some games together?",
  ];
  
  // Start the intro sequence after component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setStage(1); // Show first dialog
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Advance to next dialog after a delay
  useEffect(() => {
    if (stage === 1) {
      const timer = setTimeout(() => {
        setStage(2); // Show second dialog
      }, 4000);
      
      return () => clearTimeout(timer);
    }
    
    if (stage === 2) {
      const timer = setTimeout(() => {
        setStage(3); // Show button
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [stage]);
  
  // Navigate to the ScenarioGame page
  const goToScenarioGame = () => {
    navigate("/scenarioGame");
  };
  
  return (
    <PageWrapper className="min-h-screen bg-gradient-to-b from-[#4DC0BE] to-[#23A2DA] text-white relative">
      {/* Background elements - colorful bubbles for fun atmosphere */}
      <div className="absolute inset-0 w-full h-full">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`bubble-${i}`}
            className="absolute rounded-full bg-blue-200 opacity-20"
            style={{
              width: Math.random() * 200 + 50,
              height: Math.random() * 200 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, Math.random() * 20 - 10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: Math.random() * 5 + 5,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
      
      <div id="character-intro" className="w-full h-full flex flex-col items-center justify-center relative pt-10 pb-10 z-10">
        {/* Character container */}
        <div className="relative w-full max-w-3xl mx-auto flex justify-center items-center z-10 mt-28">
          <AnimatePresence>
            {stage > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="relative"
              >
                <motion.div
                  animate={{ 
                    y: [0, -15, 0],
                    rotate: [0, -1, 0, 1, 0] 
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 5,
                    ease: "easeInOut",
                  }}
                  className="relative"
                  style={{ top: "80px" }}
                >
                  {/* Character container */}
                  <div className="flex items-center justify-center">
                    {imageError ? (
                      // Fallback character avatar if image fails
                      <div className="w-[300px] h-[300px] md:w-[400px] md:h-[400px] bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="8" r="5"></circle>
                          <path d="M20 21a8 8 0 0 0-16 0"></path>
                        </svg>
                      </div>
                    ) : (
                      // Using a different approach with a custom Character component
                      <div className="w-[300px] h-[300px] md:w-[400px] md:h-[400px]">
                        <CustomCharacter />
                      </div>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Dialog section */}
        <div className="absolute bottom-64 md:bottom-80 left-0 right-0 flex justify-center z-20">
          <AnimatePresence mode="wait">
            {stage >= 1 && stage <= 2 && (
              <CharacterDialog
                key={`dialog-${stage}`}
                content={dialogContent[stage - 1]}
                isVisible={true}
                className="mx-4"
              />
            )}
          </AnimatePresence>
        </div>
        
        {/* Button section */}
        <AnimatePresence>
          {stage === 3 && (
            <motion.div
              className="absolute bottom-32"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, type: "spring" }}
            >
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  ease: "easeInOut",
                }}
              >
                <PrimaryButton 
                  variant="cta" 
                  onClick={goToScenarioGame}
                  className="text-xl px-8 py-4"
                >
                  How about a game?
                </PrimaryButton>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageWrapper>
  );
};

export default CharacterIntroPage;