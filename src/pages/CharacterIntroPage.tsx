// File: src/pages/CharacterIntroPage.tsx

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import PageWrapper from "@/components/PageWrapper";
import PrimaryButton from "@/components/PrimaryButton";
import NetworkBackground from "@/components/NetworkBackground";


// Add proper TypeScript interfaces - removed as it was redefined in the component definition

// Character Dialog Component with proper type annotation - updated with new speech bubble style
// Modified to accept custom style for individual positioning
interface CharacterDialogProps {
  content: React.ReactNode;
  isVisible: boolean;
  className?: string;
  customStyle?: React.CSSProperties; // Added custom style prop
}

const CharacterDialog: React.FC<CharacterDialogProps> = ({ content, isVisible, className = "", customStyle = {} }) => {
  return isVisible ? (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      className={`speech-bubble relative ${className}`}
      style={{
        position: "relative",
        margin: "0.5em 0", // Changed from auto to 0 to align left
        padding: "1em",
        width: "15em", // Adjusted for better fitting of dialog content
        minHeight: "4em",
        borderRadius: "0.25em",
        transform: "rotate(-4deg) rotateY(15deg)",
        background: "#629bdd",
        fontFamily: "Century Gothic, Verdana, sans-serif",
        fontSize: "1.5rem",
        textAlign: "center",
        zIndex: 2,
        ...customStyle, // Apply custom styles that can override defaults
      }}
    >
      {/* Content */}
      <motion.div 
        className="text-lg font-medium text-gray-800 z-10 relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        style={{ position: "relative", zIndex: 5 }}
      >
        {content}
      </motion.div>
    </motion.div>
  ) : null;
};
      

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

const TeleportBubble: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="absolute bottom-10 right-20 cursor-pointer z-30"
      onClick={onClick}
      style={{
        width: '150px',  // Width of the container
        height: '150px', // Height of the container (no label anymore)
      }}
    >
      {/* Teleport bubble animation */}
      <div 
        className="teleport-bubble"
        style={{
          width: '150px',  
          height: '150px',
          background: 'hsl(212, 100%, 71%)',
          border: '13px solid hsl(212, 100%, 81%)',
          position: 'relative',
          overflow: 'visible',
          borderRadius: '48% 40% 62% 47% / 61% 49% 64% 43%',
          animation: 'rotateTeleport 35s infinite linear',
          zIndex: 10
        }}
      >
        {/* Inner layers of the teleport bubble */}
        <div 
          style={{
            content: '',
            position: 'absolute',
            top: '15px',
            left: '15px',
            width: 'calc(100% - 45px)',
            height: 'calc(100% - 45px)',
            background: 'hsl(212, 100%, 51%)',
            border: '10px solid hsl(212, 100%, 61%)',
            borderRadius: '41% 40% 50% 55% / 49% 52% 51% 43%',
            zIndex: -2,
            animation: 'rotateTeleportBefore 35s infinite linear'
          }}
        />
        <div 
          style={{
            content: '',
            position: 'absolute',
            top: '30px',
            left: '30px',
            width: 'calc(100% - 75px)',
            height: 'calc(100% - 75px)',
            background: 'hsl(212, 100%, 31%)',
            border: '7px solid hsl(212, 100%, 41%)',
            borderRadius: '42% 63% 51% 60% / 47% 62% 42% 52%',
            animation: 'rotateTeleportAfter 35s infinite linear'
          }}
        />
      </div>
    </motion.div>
  );
};


const CharacterIntroPage: React.FC = () => {
  const navigate = useNavigate();
  
  const [stage, setStage] = useState(1);
  const [imageError] = useState(false);
  const [showTeleport] = useState(true); // Always show teleport button
  
  // Custom dialog content component with JSX for the third dialog
  const getDialogContent = (stageNum: number) => {
    if (stageNum === 1) {
      return "Hi, my name is Gleepo!";
    } else if (stageNum === 2) {
      return "Guess what?! My mom finally got me a phone! Super excited! You wanna play some games together?";
    } else if (stageNum === 3) {
      return (
        <div className="flex flex-col items-center gap-3">
          <p>By the way, if you see this teleport bubble anywhere on the screen:</p>
          <div className="flex justify-center relative h-32">
            {/* Mini version of the teleport bubble for preview */}
            <div 
              className="teleport-bubble-mini"
              style={{
                width: '80px',
                height: '80px',
                background: 'hsl(212, 100%, 71%)',
                border: '7px solid hsl(212, 100%, 81%)',
                position: 'relative',
                overflow: 'visible',
                borderRadius: '48% 40% 62% 47% / 61% 49% 64% 43%',
                animation: 'rotateTeleport 35s infinite linear'
              }}
            >
              <div 
                style={{
                  position: 'absolute',
                  top: '8px',
                  left: '8px',
                  width: 'calc(100% - 24px)',
                  height: 'calc(100% - 24px)',
                  background: 'hsl(212, 100%, 51%)',
                  border: '5px solid hsl(212, 100%, 61%)',
                  borderRadius: '41% 40% 50% 55% / 49% 52% 51% 43%',
                  zIndex: 2,
                  animation: 'rotateTeleportBefore 35s infinite linear'
                }}
              />
              <div 
                style={{
                  position: 'absolute',
                  top: '16px',
                  left: '16px',
                  width: 'calc(100% - 40px)',
                  height: 'calc(100% - 40px)',
                  background: 'hsl(212, 100%, 31%)',
                  border: '4px solid hsl(212, 100%, 41%)',
                  borderRadius: '42% 63% 51% 60% / 47% 62% 42% 52%',
                  animation: 'rotateTeleportAfter 35s infinite linear'
                }}
              />
            </div>
          </div>
          <p>You can click on it to teleport to the next activity!</p>
        </div>
      );
    }
    return "";
  };
  
  // Get position styles for each speech bubble based on stage
  const getDialogPositionStyle = (stageNum: number) => {
    // Return different positions for each stage/bubble
    if (stageNum === 1) {
      return {
        top: "-480px",
        left: "-230px",
        position: "absolute" as const,
      };
    } else if (stageNum === 2) {
      return {
        top: "-490px",
        left: "-230px",
        position: "absolute" as const,
      };
    } else if (stageNum === 3) {
      return {
        top: "-700px",
        left: "-230px",
        position: "absolute" as const,
      };
    }
    return {};
  };
  
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
        setStage(3); // Show third dialog about teleport
      }, 5000);
      
      return () => clearTimeout(timer);
    }

    if (stage === 3) {
      const timer = setTimeout(() => {
        setStage(4); // Show game button
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [stage]);
  
  // Navigate using the hook directly
  const handleNavigation = () => {
    navigate("/scenario");
  };

  // Navigate to next page (skip)
  const handleTeleport = () => {
    navigate("/scenario"); // Updated to go to scenario route
  };
  
  return (
    <PageWrapper className="min-h-screen relative text-white">
      {/* Keyframe animations for the teleport bubbles and shake effect */}
      <style>{`
        @keyframes rotateTeleport {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes rotateTeleportBefore {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(-720deg); }
        }
        @keyframes rotateTeleportAfter {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(720deg); }
        }
        @keyframes shake {
          0%, 100% { transform: rotate(0deg); }
          10% { transform: rotate(2deg); }
          20% { transform: rotate(-2deg); }
          30% { transform: rotate(1deg); }
          40% { transform: rotate(-1deg); }
          50% { transform: rotate(1deg); }
          60% { transform: rotate(-1deg); }
          70% { transform: rotate(1deg); }
          80% { transform: rotate(-1deg); }
          90% { transform: rotate(1deg); }
        }
        .hover\\:animate-shake:hover {
          animation: shake 0.6s ease-in-out;
        }
      `}</style>
      
      {/* Global styles for the speech bubble */}
      <style>{`
        .speech-bubble:before, .speech-bubble:after {
          position: absolute;
          z-index: -1;
          content: '';
        }
        
        .speech-bubble:after {
          top: 0; 
          right: 0; 
          bottom: 0; 
          left: 0;
          border-radius: inherit;
          transform: rotate(2deg) translate(.35em, -.15em) scale(1.02);
          background: #f4fbfe;
        }
        
        .speech-bubble:before {
          border: solid 0 transparent;
          border-right: solid 3.5em #f4fbfe;
          border-bottom: solid .25em #629bdd;
          bottom: .25em; 
          left: 1.25em;
          width: 0; 
          height: 1em;
          transform: rotate(45deg) skewX(75deg);
        }
      `}</style>
      
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

      {/* Teleport Bubble (always visible) */}
      {showTeleport && <TeleportBubble onClick={handleTeleport} />}
      
      <div id="character-intro" className="w-full h-full flex flex-col items-center justify-center relative pt-10 pb-10 z-10">
        {/* Character container */}
        <div className="relative w-full max-w-3xl mx-auto flex justify-center items-center z-10 mt-48">
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
        
        {/* Dialog section - each bubble has its own position */}
        <div className="relative z-20">
          <AnimatePresence mode="wait">
            {stage >= 1 && stage <= 3 && (
              <CharacterDialog
                key={`dialog-${stage}`}
                content={getDialogContent(stage)}
                isVisible={true}
                className="ml-4"
                customStyle={getDialogPositionStyle(stage)}
              />
            )}
          </AnimatePresence>
        </div>
        
        {/* Button section with Link for navigation - now positioned above teleport */}
        <AnimatePresence>
          {stage === 4 && (
            <motion.div
              className="absolute bottom-40 right-80 md:right-20 z-30" 
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
                {/* Updated button with shake effect on hover */}
                <PrimaryButton 
                  variant="cta" 
                  onClick={handleNavigation} 
                  className="text-xl px-8 py-4 hover:animate-shake"
                  style={{ 
                    transformOrigin: 'center',
                  }}
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