import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";
import RelaxBackground from '@/components/RelaxBackground';
import BunnyAnimation from '@/components/BunnyAnimation';
import { TeleportBubble } from '@/components/TeleportBubble';

const RelaxPage = () => {
  const navigate = useNavigate();
  // Show both rabbit and character immediately
  const [showRabbit] = useState(true);
  const [showCharacter, setShowCharacter] = useState(true);
  const [showSpeechBubble, setShowSpeechBubble] = useState(true);

  // Navigation handler for both teleport bubbles
  const handleTeleport = () => {
    navigate("/text-checker");
  };

  // Hide speech bubble after 4 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSpeechBubble(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  // Hide character after 7 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCharacter(false);
    }, 7000); // Character disappears after 7 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <RelaxBackground>
      {/* Character */}
      {showCharacter && (
        <div className="absolute left-8 top-[60%] transform -translate-y-1/2 z-10">
          <div className="w-128 h-auto">
            <img 
              src="/relax-char.gif"
              alt="Relax Character" 
              className="max-w-full max-h-full object-contain"
            />
          </div>
        </div>
      )}

      {/* Speech bubble matching CleanFeedIntro style */}
      <AnimatePresence>
        {showSpeechBubble && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="speech-bubble relative"
            style={{
              position: "absolute",
              top: "calc(50% - 320px)",   
              left: "150px",  
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
              zIndex: 20,
            }}
          >
            {/* Speech bubble pointer and shadow - inline styles */}
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
              className="text-lg font-medium text-black z-10 relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              style={{ position: "relative", zIndex: 5 }}
            >
              <p>Sometimes things can get hard, so let's relax a little bit, follow our friend Rabbitz!</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bunny container */}
      {showRabbit && <BunnyAnimation />}
      
      {/* Both Teleport Bubbles */}
      <TeleportBubble onClick={handleTeleport} color="blue" position="right" />
      <TeleportBubble onClick={handleTeleport} color="purple" position="left" />
    </RelaxBackground>
  );
};

export default RelaxPage;