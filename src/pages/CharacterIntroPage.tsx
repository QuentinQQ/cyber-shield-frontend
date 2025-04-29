// File: src/pages/CharacterIntroPage.tsx

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import PageWrapper from "@/components/PageWrapper";
import PrimaryButton from "@/components/PrimaryButton";
import NetworkBackground from "@/components/NetworkBackground";


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
  // Correctly use the hook at the top level of your component
  const navigate = useNavigate();
  
  const [stage, setStage] = useState(1);
  const [imageError] = useState(false);
  
  // Dialog content
  const dialogContent = [
    "Hi, my name is Gleepo!",
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
  
  // Navigate using the hook directly
  const handleNavigation = () => {
    navigate("/scenario");
  };
  
  return (
    <PageWrapper className="min-h-screen relative text-white">
      {/* Background Image - Full Screen */}
      <div 
        className="absolute inset-0 w-full h-full bg-center bg-cover bg-no-repeat z-0"
        style={{ 
          backgroundImage: `url('/living-room.png')`, // Your space-themed living room image
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      {/* Optional slight overlay to ensure text readability */}
      <div className="absolute inset-0 bg-black/10 z-0"></div>
      
      {/* Network Background with colors to match the pastel theme */}
      <NetworkBackground 
        dotColor="rgba(255, 183, 197, 0.6)" // Pink to match the pastel theme
        lineColor="rgba(100, 100, 100, 0.15)" // Very subtle lines
        dotCount={70}
        connectionDistance={150}
        dotSize={1.5}
        lineWidth={0.15}
        speed={0.5}
        interactive={true}
      />
      
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
        
        {/* Button section with Link for navigation */}
        <AnimatePresence>
          {stage === 3 && (
            <motion.div
              className="absolute bottom-32 right-10 md:right-1/4 z-30" 
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
                {/* FIXED: Using only handleNavigation for direct programmatic navigation */}
                <PrimaryButton 
                  variant="cta" 
                  onClick={handleNavigation} 
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