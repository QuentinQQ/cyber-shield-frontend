import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { TeleportBubble } from "@/components/TeleportBubble";

// Character Dialog Component with proper type annotation
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
      {/* Speech bubble pointer and shadow - inline styles to ensure they apply */}
      <div 
        style={{
          position: "absolute",
          zIndex: -1,
          content: "''",
          top: 0, 
          right: 0, 
          bottom: 0, 
          left: 0,
          borderRadius: "0.25em",
          transform: "rotate(2deg) translate(.35em, -.15em) scale(1.02)",
          background: "#f4fbfe",
        }}
      />
      <div 
        style={{
          position: "absolute",
          zIndex: -1,
          content: "''",
          border: "solid 0 transparent",
          borderRight: "solid 3.5em #f4fbfe",
          borderBottom: "solid .25em #629bdd",
          bottom: ".25em", 
          left: "1.25em",
          width: 0, 
          height: "1em",
          transform: "rotate(45deg) skewX(75deg)",
        }}
      />
      
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


// Glitch text effect for cat hover - keeping this unchanged
const GlitchText: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <span 
      className="relative inline-block"
      style={{
        textShadow: '2px 2px rgba(0,255,0,0.4), -2px -2px rgba(255,0,0,0.4), 0 0 5px rgba(0,255,0,0.8)',
        animation: 'glitch 0.2s infinite alternate',
        position: 'relative',
        display: 'inline-block'
      }}
    >
      {children}
      <>
        <style>{`
          @keyframes glitch {
            0% { transform: translate(0); filter: hue-rotate(0deg); }
            10% { transform: translate(-3px, 1px); filter: hue-rotate(15deg); }
            20% { transform: translate(2px, -2px); filter: hue-rotate(30deg); }
            30% { transform: translate(-2px, -1px); filter: hue-rotate(0deg); }
            40% { transform: translate(1px, 2px); filter: hue-rotate(-15deg); }
            50% { transform: translate(-2px, 1px); filter: hue-rotate(-30deg); }
            60% { transform: translate(3px, 1px); filter: hue-rotate(0deg); }
            70% { transform: translate(2px, 3px); filter: hue-rotate(15deg); }
            80% { transform: translate(-1px, -2px); filter: hue-rotate(30deg); }
            90% { transform: translate(1px, -1px); filter: hue-rotate(0deg); }
            100% { transform: translate(0); filter: hue-rotate(-15deg); }
          }
          
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
          }
          
          @keyframes glow {
            0% { box-shadow: 0 0 5px 0px rgba(120, 255, 214, 0.7); }
            50% { box-shadow: 0 0 20px 5px rgba(120, 255, 214, 0.9); }
            100% { box-shadow: 0 0 5px 0px rgba(120, 255, 214, 0.7); }
          }
          
          @keyframes alienPulse {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          
          @keyframes borderPulse {
            0% { border-color: #00f7ff; }
            25% { border-color: #00ff9d; }
            50% { border-color: #b300ff; }
            75% { border-color: #ff00c3; }
            100% { border-color: #00f7ff; }
          }
          
          @keyframes bubble {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
          }
          
          @keyframes scanline {
            0% { top: -50%; }
            100% { top: 110%; }
          }
          
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
          
          /* Global styles for the speech bubble */
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
      </>
      
      {/* Additional glitch elements */}
      <span
        style={{
          content: "''",
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0,255,0,0.08)',
          animation: 'scanline 2.5s linear infinite'
        }}
      />
      
      {/* Text clone for glitch effect */}
      <span
        style={{
          position: 'absolute',
          top: 0,
          left: '-2px',
          width: '100%',
          color: 'rgba(255,0,0,0.5)',
          animation: 'glitch 0.3s infinite reverse'
        }}
      >
        {children}
      </span>
      
      <span
        style={{
          position: 'absolute',
          top: '1px',
          left: '1px',
          width: '100%',
          color: 'rgba(0,255,0,0.5)',
          animation: 'glitch 0.35s infinite'
        }}
      >
        {children}
      </span>
    </span>
  );
};

const CleanFeedIntro: React.FC = () => {
  // Correctly use the hook at the top level of your component
  const navigate = useNavigate();
  
  const [characterPopupStage, setCharacterPopupStage] = useState(1);
  const [isCatHovered, setIsCatHovered] = useState(false);
  const [showCharacterDialog, setShowCharacterDialog] = useState(true);
  
  // Clear localStorage items related to the game when component mounts
  useEffect(() => {
    // Remove any local storage items related to the Clean Feed game
    const keysToRemove = Object.keys(localStorage).filter(key => 
      key.startsWith('cleanFeed') || key.includes('cleanFeed') || key.includes('feed_result'));
    
  
    keysToRemove.forEach(key => {
      localStorage.removeItem(key);
    });
  }, []);
  
  // Auto-hide the speech bubble after a few seconds
  useEffect(() => {
    // Show the bubble initially
    setShowCharacterDialog(true);
    
    // Hide it after 5 seconds
    const timer = setTimeout(() => {
      setShowCharacterDialog(false);
    }, 10000);
    
    // Clean up on unmount
    return () => clearTimeout(timer);
  }, []);

  // Handle character click to show the speech bubble again
  const handleCharacterClick = () => {
    setShowCharacterDialog(true);
    
    // Hide it again after 5 seconds
    const timer = setTimeout(() => {
      setShowCharacterDialog(false);
    }, 5000);
    
    return () => clearTimeout(timer);
  };
  
  // Advance to next dialog after a delay
  useEffect(() => {
    if (characterPopupStage === 1) {
      const timer = setTimeout(() => {
        console.log("Moving to stage 2");
        setCharacterPopupStage(2); // Show second dialog
      }, 4000);
      
      return () => clearTimeout(timer);
    }
    
    if (characterPopupStage === 2) {
      const timer = setTimeout(() => {
        console.log("Moving to stage 3 - button should appear");
        setCharacterPopupStage(3); // Show button
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [characterPopupStage]);
  
  // Navigate using the hook directly with enhanced debugging
  const handleStartGame = () => {
    navigate("/clean-feed-game");
  };
  
  const handleTeleportNext = () => {
    navigate("/text-checker");
  };

  const handleTeleportBack = () => {
    navigate(-1);
  };

  // Handle click outside the button to dismiss the overlay
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only dismiss if clicking the overlay itself, not the button
    if (e.currentTarget === e.target) {
      setCharacterPopupStage(2);
    }
  };
  
  return (
    <div
      className="relative w-full h-screen bg-cover bg-center"
      style={{ backgroundImage: `url('/bed-room.png')` }}
    >
      {/* Speech bubble styles directly applied in the component instead of global styles */}
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
        @keyframes glitch {
          0% { transform: translate(0); filter: hue-rotate(0deg); }
          10% { transform: translate(-3px, 1px); filter: hue-rotate(15deg); }
          20% { transform: translate(2px, -2px); filter: hue-rotate(30deg); }
          30% { transform: translate(-2px, -1px); filter: hue-rotate(0deg); }
          40% { transform: translate(1px, 2px); filter: hue-rotate(-15deg); }
          50% { transform: translate(-2px, 1px); filter: hue-rotate(-30deg); }
          60% { transform: translate(3px, 1px); filter: hue-rotate(0deg); }
          70% { transform: translate(2px, 3px); filter: hue-rotate(15deg); }
          80% { transform: translate(-1px, -2px); filter: hue-rotate(30deg); }
          90% { transform: translate(1px, -1px); filter: hue-rotate(0deg); }
          100% { transform: translate(0); filter: hue-rotate(-15deg); }
        }
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        @keyframes glow {
          0% { box-shadow: 0 0 5px 0px rgba(120, 255, 214, 0.7); }
          50% { box-shadow: 0 0 20px 5px rgba(120, 255, 214, 0.9); }
          100% { box-shadow: 0 0 5px 0px rgba(120, 255, 214, 0.7); }
        }
        @keyframes alienPulse {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes borderPulse {
          0% { border-color: #00f7ff; }
          25% { border-color: #00ff9d; }
          50% { border-color: #b300ff; }
          75% { border-color: #ff00c3; }
          100% { border-color: #00f7ff; }
        }
        @keyframes bubble {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
        @keyframes scanline {
          0% { top: -50%; }
          100% { top: 110%; }
        }
      `}</style>
      {/* Teleport Bubble - always visible */}
      <TeleportBubble onClick={handleTeleportNext} color="blue" position="right" text="5.Text Checker" />
      <TeleportBubble onClick={handleTeleportBack} color="purple" position="left" text="3.Scenarios" />

      {/* Black Cat on the right side of the bed  */}
      <div 
        className="absolute bottom-39 right-119 w-50 h-auto group"
        onMouseEnter={() => setIsCatHovered(true)}
        onMouseLeave={() => setIsCatHovered(false)}
      >
        {/* Cat glow effect - enhanced */}
        <div 
          className="absolute -inset-4 bg-gray-600/40 rounded-full 
                     opacity-0 group-hover:opacity-90
                     transition-opacity duration-300 blur-2xl"
        />
        <div 
          className="absolute -inset-2 bg-green-500/30 rounded-full 
                     opacity-0 group-hover:opacity-70
                     transition-opacity duration-300 blur-xl"
        />
        <img
          src="/black-cat.png"
          alt="Black Cat"
          className="relative z-10 w-full h-full" 
        />

        {/* Cat hover text with enhanced glitch effect - Keep this unchanged */}
        {isCatHovered && (
          <div 
            className="absolute -top-10 left-1/2 transform -translate-x-1/2 
                        bg-black/80 border border-green-400/50
                        px-4 py-2 rounded-lg text-white
                        text-sm overflow-hidden"
            style={{
              boxShadow: "0 0 8px rgba(0, 255, 0, 0.5)"
            }}
          >
            <GlitchText>zzuuur</GlitchText>
          </div>
        )}
      </div>

      {/* Character on the left side with reduced glow effect */}
      <div 
        className="absolute bottom-9 left-20 w-100 h-auto"
        onClick={handleCharacterClick}
      >
        <img
          src="/character-phone.gif"
          alt="Character"
          className="relative -z-10 w-full h-full cursor-pointer" 
        />

        {/* Character Dialog with the consistent speech bubble style */}
        <AnimatePresence>
          {showCharacterDialog && (
            <CharacterDialog
              content={characterPopupStage === 1 ? 
                "First TikTok about to drop! It's my Zat ~ get ready for cuteness OVERLOAD!" : 
                "Ugh, so many comments! Help me clear this feed by liking and disliking comments! Only 15 sec left!"
              }
              isVisible={true}
              customStyle={{
                position: "absolute",
                top: "-150px",
                left: "10%",
                transform: "translateX(-50%)",
                zIndex: 20,
                width: "18em"
              }}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Full-screen overlay with button when active - click anywhere to dismiss */}
      {characterPopupStage === 3 && (
        <div 
          className="fixed inset-0 flex items-center justify-center z-30" 
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          onClick={handleOverlayClick}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: [0.8, 1.2, 1] }}
            transition={{ duration: 1 }}
            className="relative"
          >
            {/* Shadow beneath the button */}
            <motion.div 
              className="absolute w-full h-6 bg-black/20 rounded-full blur-md bottom-0 left-0"
              animate={{
                width: ['90%', '60%', '90%'],
                x: ['5%', '20%', '5%']
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
            
            <motion.button
              onClick={handleStartGame}
              className="relative bg-[#C2E764] text-black px-8 py-6 rounded-full font-bold text-2xl shadow-lg z-10"
              whileHover={{ 
                scale: 1.05,
              }}
              whileTap={{ 
                scale: 0.95,
              }}
              // Add a bouncing animation for the button
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                y: {
                  duration: 1.2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
            >
              LET'S CLEAN MY FEED!
              
              {/* Ring orbits */}
              <motion.div
                className="absolute inset-0 border-2 border-black/10 rounded-full"
                animate={{ scale: [1, 1.1, 1], opacity: [0.7, 0.5, 0.7] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <motion.div
                className="absolute inset-0 border-2 border-black/5 rounded-full"
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.3, 0.5] }}
                transition={{ duration: 3, delay: 0.2, repeat: Infinity }}
              />
            </motion.button>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default CleanFeedIntro;