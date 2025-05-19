import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import PageWrapper from "@/components/PageWrapper";
import NetworkBackground from "@/components/NetworkBackground";
import { TeleportBubble } from "@/components/TeleportBubble";

/**
 * @component
 * @description This page introduces the user to the site's character, Gleepo,
 * and explains the purpose of the two teleport bubbles for navigating the site.
 * It uses animations and timed sequences to guide the user through the introduction.
 */

interface CharacterDialogProps {
  content: React.ReactNode;
  isVisible: boolean;
  className?: string;
  customStyle?: React.CSSProperties;
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
        margin: "0.5em 0",
        padding: "1em",
        width: "15em",
        minHeight: "4em",
        borderRadius: "0.25em",
        transform: "rotate(-4deg) rotateY(15deg)",
        background: "#629bdd",
        fontFamily: "Century Gothic, Verdana, sans-serif",
        fontSize: "1.5rem",
        textAlign: "center",
        zIndex: 2,
        ...customStyle,
      }}
    >
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

// Function to create a Mini Teleport bubble for display in dialogs
const MiniTeleportBubble: React.FC<{ color: "blue" | "purple" }> = ({ color }) => {
  // Define color values based on the color prop
  const colorValues = {
    blue: {
      outer: 'hsl(212, 100%, 71%)',
      outerBorder: 'hsl(212, 100%, 81%)',
      middle: 'hsl(212, 100%, 51%)',
      middleBorder: 'hsl(212, 100%, 61%)',
      inner: 'hsl(212, 100%, 31%)',
      innerBorder: 'hsl(212, 100%, 41%)'
    },
    purple: {
      outer: 'hsl(270, 100%, 71%)',
      outerBorder: 'hsl(270, 100%, 81%)',
      middle: 'hsl(270, 100%, 51%)',
      middleBorder: 'hsl(270, 100%, 61%)',
      inner: 'hsl(270, 100%, 31%)',
      innerBorder: 'hsl(270, 100%, 41%)'
    }
  };
  
  const selectedColor = colorValues[color];
  
  return (
    <div 
      className={`teleport-bubble-mini-${color}`}
      style={{
        width: '80px',
        height: '80px',
        background: selectedColor.outer,
        border: `7px solid ${selectedColor.outerBorder}`,
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
          background: selectedColor.middle,
          border: `5px solid ${selectedColor.middleBorder}`,
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
          background: selectedColor.inner,
          border: `4px solid ${selectedColor.innerBorder}`,
          borderRadius: '42% 63% 51% 60% / 47% 62% 42% 52%',
          animation: 'rotateTeleportAfter 35s infinite linear'
        }}
      />
    </div>
  );
};

// Highlight component to highlight teleport bubbles
const HighlightEffect: React.FC<{ position: "left" | "right"; intense?: boolean }> = ({ position, intense = false }) => {
  const positionStyle = position === "left" 
    ? { left: "20px" } 
    : { right: "20px" };
    
  const intensityStyle = intense ? {
    background: "rgba(255, 215, 0, 0.6)",
    boxShadow: "0 0 30px 10px rgba(255, 215, 0, 0.4)",
    animation: "pulse 1.5s infinite"
  } : {
    background: "rgba(255, 215, 0, 0.3)",
    filter: "blur(15px)"
  };
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: intense ? [0.6, 1, 0.6] : [0.2, 0.7, 0.2],
        scale: intense ? [1, 1.2, 1] : [1, 1.15, 1]
      }}
      transition={{ 
        duration: intense ? 1.2 : 1.8,
        repeat: Infinity,
        repeatType: "loop" 
      }}
      className="absolute bottom-10 z-20"
      style={{
        ...positionStyle,
        width: "180px",
        height: "180px",
        borderRadius: "50%",
        ...intensityStyle
      }}
    />
  );
};

const CharacterIntroPage: React.FC = () => {
  const navigate = useNavigate();
  
  const [stage, setStage] = useState(1);
  const [imageError] = useState(false);
  const [showTeleports, setShowTeleports] = useState(false);
  const [showPurpleTeleport, setShowPurpleTeleport] = useState(false);
  const [showBlueTeleport, setShowBlueTeleport] = useState(false);
  const [showPurpleArrow, setShowPurpleArrow] = useState(false);
  const [showBlueArrow, setShowBlueArrow] = useState(false);
  const [showBluePulse, setShowBluePulse] = useState(false);
  
  
  // Updated dialog content with Australian kid-friendly language
  const getDialogContent = (stageNum: number) => {
    if (stageNum === 1) {
      return "G'day mate! I'm Gleepo!";
    } else if (stageNum === 2) {
      return "Guess what?! Mum finally got me a phone! Heaps excited! Wanna play some ripper games together?";
    } else if (stageNum === 3) {
      return (
        <div className="flex flex-col items-center gap-3">
          <p>Check out this cool blue teleport bubble:</p>
          <div className="flex justify-center relative h-32">
            <MiniTeleportBubble color="blue" />
          </div>
          <p>Give it a click to take the next step in our journey!</p>
        </div>
      );
    } else if (stageNum === 4) {
      return (
        <div className="flex flex-col items-center gap-3">
          <p>And this purple one here:</p>
          <div className="flex justify-center relative h-32">
            <MiniTeleportBubble color="purple" />
          </div>
          <p>It's your back button, in case you want to go back to where you were before. Bonza, right?</p>
        </div>
      );
    } else if (stageNum === 5) {
      return "If you're ready to go on an awesome adventure, tap the glowing blue teleport bubble! Let's get started!";
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
    } else if (stageNum === 4) {
      return {
        top: "-700px",
        left: "-230px",
        position: "absolute" as const,
      };
    } else if (stageNum === 5) {
      return {
        top: "-480px",
        left: "-230px",
        position: "absolute" as const,
      };
    }
    return {};
  };
  
  // Updated navigation handlers for both paths
  const handleBlueTeleport = () => {
    navigate("/quiz"); // Next step
  };
  
  const handlePurpleTeleport = () => {
    navigate("/"); // Back button
  };
  
  // Start the intro sequence after component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setStage(1); // Show first dialog
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Sequential dialogs with updated timing
  useEffect(() => {
    if (stage === 1) {
      const timer = setTimeout(() => {
        setStage(2); // Show second dialog
      }, 4000);
      
      return () => clearTimeout(timer);
    }
    
    if (stage === 2) {
      const timer = setTimeout(() => {
        setStage(3); // Show purple teleport explanation
      }, 5000);
      
      return () => clearTimeout(timer);
    }

    if (stage === 3) {
      // Show blue teleport with highlight
      const timerShowTeleport = setTimeout(() => {
        setShowBlueTeleport(true);
        setShowBlueArrow(true);
      }, 1500);
      
      const timer = setTimeout(() => {
        setStage(4); // Show purple teleport explanation
        setShowBlueArrow(false);
      }, 5000);
      
      return () => {
        clearTimeout(timer);
        clearTimeout(timerShowTeleport);
      };
    }
    
    if (stage === 4) {
      // Show purple teleport with highlight
      const timerShowTeleport = setTimeout(() => {
        setShowPurpleTeleport(true);
        setShowPurpleArrow(true);
      }, 1500);
      
      const timer = setTimeout(() => {
        setStage(5); // Show final call-to-action dialog
        setShowPurpleArrow(false);
        setShowPurpleTeleport(false);
        setShowBlueTeleport(false);
        setShowTeleports(true);
      }, 5000);
      
      return () => {
        clearTimeout(timer);
        clearTimeout(timerShowTeleport);
      };
    }
    
    if (stage === 5) {
      // After the final dialog, make the blue teleport pulse
      const timer = setTimeout(() => {
        setShowBluePulse(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [stage]);
  
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
        @keyframes pulse {
          0% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.1); opacity: 1; }
          100% { transform: scale(1); opacity: 0.6; }
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
          backgroundImage: `url('/living-room.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      {/* Optional slight overlay to ensure text readability */}
      <div className="absolute inset-0 bg-black/10 z-0"></div>
      
      {/* Network Background with colors to match the pastel theme */}
      <NetworkBackground 
        dotColor="rgba(255, 183, 197, 0.6)"
        lineColor="rgba(100, 100, 100, 0.15)"
        dotCount={70}
        connectionDistance={150}
        dotSize={1.5}
        lineWidth={0.15}
        speed={0.5}
        interactive={true}
      />

      {/* Purple Teleport Bubble with Highlight (Appears during explanation) */}
      {showPurpleTeleport && (
        <TeleportBubble onClick={handlePurpleTeleport} color="purple" position="left" text="Back" />
      )}
      
      {showPurpleArrow && <HighlightEffect position="left" />}
      
      {/* Blue Teleport Bubble with Highlight (Appears during explanation) */}
      {showBlueTeleport && (
        <TeleportBubble onClick={handleBlueTeleport} color="blue" position="right" text="Next Step" />
      )}
      
      {showBlueArrow && <HighlightEffect position="right" />}
      
      {/* Both Teleport Bubbles (permanent display after all dialogs) */}
      {showTeleports && !showPurpleTeleport && !showBlueTeleport && (
        <>
          <TeleportBubble onClick={handleBlueTeleport} color="blue" position="right" text="1.Quiz" />
          <TeleportBubble onClick={handlePurpleTeleport} color="purple" position="left" text="Home" />
          {showBluePulse && <HighlightEffect position="right" intense={true} />}
        </>
      )}
      
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
            {stage >= 1 && stage <= 5 && (
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
      </div>
    </PageWrapper>
  );
};

export default CharacterIntroPage;