import React, { useState, useEffect } from "react";
import { GameResultV2 } from "../../types/types";
import { motion, AnimatePresence } from "framer-motion";

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
        position: "absolute",
        margin: "0.5em 0", 
        padding: "1em",
        width: "20em", 
        minHeight: "4em",
        borderRadius: "0.25em",
        transform: "rotate(-4deg) rotateY(15deg)",
        background: "#629bdd",
        fontFamily: "Century Gothic, Verdana, sans-serif",
        fontSize: "1.5rem",
        textAlign: "center",
        zIndex: 100,
        left: "1%",
        top: "10%",  
        ...customStyle,
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

/**
 * @component ResultScreen
 * @description
 * Visually enhanced game result screen with motion feedback.
 *
 * @param {Object} props
 * @param {GameResult} props.result - Game result data (score, percent, etc.)
 * @returns {JSX.Element}
 */
const ResultScreen: React.FC<{
  result: GameResultV2;
  onRestart: () => void;
}> = ({ result, onRestart }) => {
  const [showCharacterDialog, setShowCharacterDialog] = useState(true);

  // Auto-hide the speech bubble after a few seconds
  useEffect(() => {
    // Show the bubble initially
    setShowCharacterDialog(true);
    
    // Hide it after 8 seconds
    const timer = setTimeout(() => {
      setShowCharacterDialog(false);
    }, 8000);
    
    // Clean up on unmount
    return () => clearTimeout(timer);
  }, []);

  // Handle character click to show the speech bubble again
  const handleCharacterClick = () => {
    setShowCharacterDialog(true);
    
    // Hide it again after 8 seconds
    const timer = setTimeout(() => {
      setShowCharacterDialog(false);
    }, 8000);
    
    return () => clearTimeout(timer);
  };

  /**
   * @function getFeedback
   * @description Returns a feedback string based on score.
   * @returns {string}
   */
  const getFeedback = (): string => {
    const raw = typeof result.percent === "string" ? result.percent : "";
    const percentNumber = Number(raw.replace("%", ""));
    if (percentNumber >= 90) return "Amazing! You're a cyber safety pro!";
    if (percentNumber >= 70) return "Well done! You know your stuff.";
    if (percentNumber >= 50)
      return "Nice try! A bit more practice and you'll ace it.";
    return "Don't worry, it's a great start. Let's try again!";
  };

  // Determine badge and glow color based on score
  const getBadgeInfo = () => {
    const raw = typeof result.percent === "string" ? result.percent : "";
    const percentNumber = Number(raw.replace("%", ""));
    
    if (percentNumber >= 90) return { 
      text: "Cosmic Champion", 
      color: "from-yellow-300 to-yellow-500",
      glow: "rgba(250, 204, 21, 0.7)" // Yellow glow
    };
    if (percentNumber >= 70) return { 
      text: "Star Navigator", 
      color: "from-blue-400 to-cyan-500",
      glow: "rgba(14, 165, 233, 0.7)" // Blue glow
    };
    if (percentNumber >= 50) return { 
      text: "Space Cadet", 
      color: "from-purple-400 to-indigo-500",
      glow: "rgba(139, 92, 246, 0.7)" // Purple glow
    };
    return { 
      text: "Space Explorer", 
      color: "from-green-400 to-emerald-500",
      glow: "rgba(52, 211, 153, 0.7)" // Green glow
    };
  };

  const badgeInfo = getBadgeInfo();


  return (
    <div className="flex flex-col items-center justify-center min-h-screen max-h-screen w-full relative overflow-hidden">
      {/* Space background elements */}
      {/* Keyframe animations for teleport bubble and speech bubble */}
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

        /* Fix for horizontal scroll */
        html, body {
            overflow-x: hidden;
            width: 100%;
            margin: 0;
            padding: 0;
        }
      `}</style>

      {/* Space background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating stars */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 3 + 1,
              height: Math.random() * 3 + 1,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Speech bubble - positioned independently in the DOM */}
      <AnimatePresence>
        {showCharacterDialog && (
          <CharacterDialog
            content={result.summary}
            isVisible={true}
          />
        )}
      </AnimatePresence>

      {/* Character - positioned on the left bottom */}
      <motion.div 
        className="absolute left-10 bottom-38 cursor-pointer z-30"
        style={{ 
          height: '39%',
        }}
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        onClick={handleCharacterClick}
      >
        {/* Character image */}
        <img
          src="/clapping.gif"
          alt="Clapping Character"
          className="h-full w-auto object-contain"
        />
      </motion.div>

      {/* Content Container - centered but shifted up with negative margin */}
      <div className="flex flex-col items-center justify-center gap-6 max-w-2xl px-6 transform translate-y-[-80px] mx-auto">
        {/* Animated title with space theme */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative mb-1"
        >
          <h2 className="text-5xl font-bold text-white relative z-10">
            Mission Complete!
          </h2>
          {/* Glow effect behind title */}
          <motion.div
            className="absolute -inset-4 rounded-full blur-xl z-0 opacity-70"
            style={{ background: "radial-gradient(circle, rgba(56, 189, 248, 0.8) 0%, rgba(56, 189, 248, 0) 70%)" }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.7, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </motion.div>

        {/* Badge display */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="relative mb-2"
        >
          <div className="p-1 rounded-full bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-sm">
            <div className={`w-36 h-36 rounded-full bg-gradient-to-br ${badgeInfo.color} flex items-center justify-center text-white font-bold text-xl p-6 shadow-lg`}
                 style={{ boxShadow: `0 0 30px ${badgeInfo.glow}` }}>
              <div className="text-center">
                <div className="text-4xl font-bold">{result.percent}</div>
                <div className="text-sm mt-1">{badgeInfo.text}</div>
              </div>
            </div>
            
            {/* Orbital ring */}
            <motion.div
              className="absolute inset-0 border border-white/20 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
          </div>
        </motion.div>

        {/* Result stats - more compact spacing */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
          className="space-y-2 text-white text-lg w-full"
        >
          {[
            { label: "Score", value: result.score },
            { label: "Performance", value: `Better than ${result.comparison}% of players` },
            { label: "Questions", value: `Total: ${result.answered}, Correct: ${result.answered_cor}` }
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.4 }}
              className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-xl flex justify-between items-center"
            >
              <span className="font-medium text-cyan-200">{item.label}</span>
              <span className="font-semibold">{item.value}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Feedback banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="bg-white/20 backdrop-blur-md text-white rounded-xl px-8 py-4 text-xl font-semibold shadow-md w-full border border-white/30 text-center"
        >
          {getFeedback()}
        </motion.div>

        {/* Try Again Button */}
        <div className="relative mt-2">
          {/* Shadow beneath the button */}
          <motion.div 
            className="absolute w-full h-4 bg-black/20 rounded-full blur-md bottom-0 left-0"
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
            onClick={onRestart}
            className="relative bg-[#C2E764] text-black px-6 py-3 rounded-full font-bold shadow-lg z-10"
            whileHover={{ 
              scale: 1.05,
            }}
            whileTap={{ 
              scale: 0.95,
            }}
            // Add a bouncing animation
            animate={{
              y: [0, -6, 0],
            }}
            transition={{
              y: {
                duration: 1.2,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
          >
            Play Again with New Stuff!
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default ResultScreen;