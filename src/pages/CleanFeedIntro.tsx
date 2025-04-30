import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

// Teleport Bubble component - reusable across pages
const TeleportBubble: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="absolute bottom-10 right-20 cursor-pointer z-50"
      onClick={onClick}
      style={{
        width: '150px',
        height: '150px',
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

// Glitch text effect for cat hover - enhanced TV static effect
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
  const handleNavigation = () => {
    console.log("Navigation function called! Navigating to /clean-feed-game");
    navigate("/clean-feed-game");
  };
  
  // Handle teleport to clean feed game page with skipIntro=true
  const handleTeleport = () => {
    console.log("Teleport clicked! Navigating to /clean-feed-game");
    navigate("/clean-feed-game");
  };
  
  return (
    <div
      className="relative w-full h-screen bg-cover bg-center"
      style={{ backgroundImage: `url('/bed-room.png')` }}
    >
      {/* Teleport Bubble - always visible */}
      <TeleportBubble onClick={handleTeleport} />

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

        {/* Cat hover text with enhanced glitch effect */}
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

      {/* Character on the left side with enhanced glow effect */}
      <div 
        className="absolute bottom-9 left-20 w-100 h-auto group"
      >
        {/* More intense blue glow effect */}
        <div 
          className="absolute -inset-10 bg-blue-500/70 rounded-full 
                     opacity-80 animate-pulse 
                     blur-3xl"
        />
        
        <img
          src="/character-phone.png"
          alt="Character"
          className="relative z-10 w-full h-full" 
        />

        {/* Character Popups */}
        <AnimatePresence>
          {characterPopupStage === 1 && (
            <motion.div
              className="absolute -top-64 left-1/2 transform -translate-x-1/2 
                          p-6 rounded-3xl 
                          shadow-lg border-4 
                          text-center z-20"
              style={{
                background: "linear-gradient(45deg, #0a0047, #2e0057, #001e3c)",
                backgroundSize: "400% 400%",
                animation: "alienPulse 3s ease infinite",
                borderColor: "#00f7ff",
                boxShadow: "0 0 25px #00f7ff, inset 0 0 15px rgba(0, 247, 255, 0.5)"
              }}
              initial={{ 
                opacity: 0, 
                scale: 0, 
                y: 20,
                rotate: Math.random() * 20 - 10
              }}
              animate={{ 
                opacity: 1, 
                scale: 1, 
                y: 0,
                rotate: 0
              }}
              exit={{ 
                opacity: 0, 
                scale: 0, 
                y: 20 
              }}
              transition={{ 
                type: "spring", 
                stiffness: 300,
                damping: 20
              }}
            >
              <div className="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-green-400 animate-ping"></div>
              <div className="absolute -top-3 -left-3 w-6 h-6 rounded-full bg-purple-500 animate-pulse"></div>
              <p className="font-bold text-xl mb-2 text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-blue-500">
                First TikTok about to drop!
              </p>
              <p className="text-blue-200 font-medium">
                It's my Zat <span className="text-green-300">~</span> get ready for cuteness <span className="animate-pulse text-pink-300">OVERLOAD</span>!
              </p>
              
              {/* Alien Speech bubble elements */}
              <div className="absolute -right-2 top-5 w-3 h-3 rounded-full bg-blue-400 animate-ping"></div>
              <div className="absolute -left-2 bottom-5 w-2 h-2 rounded-full bg-purple-400 animate-pulse delay-300"></div>
              
              {/* Speech bubble arrow - alien style */}
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
                <div className="w-6 h-16" 
                     style={{
                       background: "linear-gradient(to bottom, #00f7ff, transparent)",
                       clipPath: "polygon(0% 0%, 100% 0%, 50% 100%)"
                     }}>
                </div>
              </div>
            </motion.div>
          )}

          {characterPopupStage === 2 && (
            <motion.div
              className="absolute -top-64 left-1/2 transform -translate-x-1/2 
                          p-6 rounded-3xl 
                          shadow-lg border-4 
                          text-center z-20"
              style={{
                background: "linear-gradient(45deg, #3d0042, #500038, #42001a)",
                backgroundSize: "400% 400%",
                animation: "alienPulse 3s ease infinite, borderPulse 4s linear infinite",
                boxShadow: "0 0 25px #ff00c3, inset 0 0 15px rgba(255, 0, 195, 0.7)"
              }}
              initial={{ 
                opacity: 0, 
                scale: 0.8, 
                rotate: -5
              }}
              animate={{ 
                opacity: 1, 
                scale: [0.9, 1.05, 0.95, 1.02, 1],
                rotate: [0, -5, 5, -5, 5, 0],
                transition: {
                  duration: 0.5
                }
              }}
              exit={{ 
                opacity: 0, 
                scale: 0, 
                y: 20 
              }}
              transition={{ 
                type: "spring", 
                stiffness: 300,
                damping: 20
              }}
            >
              <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-red-400 animate-ping"></div>
              <div className="absolute -bottom-3 -right-3 w-6 h-6 rounded-full bg-pink-500 animate-pulse"></div>
              
              <div className="mb-2 flex items-center justify-center">
                <span className="text-red-500 text-2xl mr-2 animate-pulse">!</span>
                <p className="font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-red-300 to-pink-500">
                  URGENT TRANSMISSION
                </p>
                <span className="text-red-500 text-2xl ml-2 animate-pulse">!</span>
              </div>
              
              <p className="text-pink-200 font-medium">
                <span className="text-yellow-300">Ugh</span>, so many comments! Help me clear this feed by liking and disliking comments! Time left: 
                <motion.span
                  className="inline-block ml-1 font-mono font-bold text-red-300"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  00:30
                </motion.span>
              </p>
              
              {/* Speech bubble arrow - alien style */}
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
                <div className="w-6 h-16" 
                     style={{
                       background: "linear-gradient(to bottom, #ff00c3, transparent)",
                       clipPath: "polygon(0% 0%, 100% 0%, 50% 100%)"
                     }}>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Full-screen overlay with button when active */}
      {characterPopupStage === 3 && (
        <div className="fixed inset-0 flex items-center justify-center z-40" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: [0.8, 1.2, 1], rotate: [0, -5, 5, 0] }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{ 
                background: "radial-gradient(circle at center, rgba(0, 247, 255, 0.8), rgba(0, 98, 255, 0.4))",
                filter: "blur(15px)"
              }}
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            
            <motion.button
              onClick={handleNavigation}
              className="relative px-8 py-6 rounded-full font-bold text-white"
              style={{
                background: "radial-gradient(circle at center, #00f7ff, #0062ff)",
                boxShadow: "0 0 30px rgba(0, 247, 255, 0.8), inset 0 0 15px rgba(255, 255, 255, 0.6)"
              }}
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              whileHover={{ 
                scale: 1.15,
                boxShadow: "0 0 40px rgba(0, 247, 255, 1)" 
              }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="relative flex items-center justify-center">
                {/* Orbiting bubbles */}
                <motion.div 
                  className="absolute w-6 h-6 rounded-full bg-white/80"
                  style={{ top: '-15px', right: '-15px' }}
                  animate={{ 
                    opacity: [0.8, 0.2, 0.8],
                    scale: [1, 1.3, 1]
                  }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <motion.div 
                  className="absolute w-5 h-5 rounded-full bg-blue-200/80"
                  style={{ bottom: '-10px', left: '-20px' }}
                  animate={{ 
                    opacity: [0.7, 0.3, 0.7],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                />
                <motion.div 
                  className="absolute w-4 h-4 rounded-full bg-green-200/80"
                  style={{ top: '5px', left: '-25px' }}
                  animate={{ 
                    opacity: [0.6, 0.2, 0.6],
                    scale: [1, 1.3, 1]
                  }}
                  transition={{ duration: 1.8, repeat: Infinity, delay: 0.7 }}
                />
                
                {/* Button text */}
                <span 
                  className="drop-shadow-lg text-2xl font-bold tracking-wide"
                  style={{ textShadow: "0 0 10px rgba(255,255,255,0.8)" }}
                >
                  LET'S CLEAN MY FEED!
                </span>
              </div>
            </motion.button>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default CleanFeedIntro;