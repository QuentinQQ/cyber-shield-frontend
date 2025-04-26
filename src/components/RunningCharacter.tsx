import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const RunningCharacter = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasRun, setHasRun] = useState(false);
  
  useEffect(() => {
    console.log("RunningCharacter mounted");
    
    // Show the character after 3 seconds
    const timer = setTimeout(() => {
      console.log("Setting isVisible to true");
      setIsVisible(true);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Handle animation complete
  const handleAnimationComplete = () => {
    console.log("Animation completed");
    // Keep on screen longer (30 seconds)
    setTimeout(() => {
      console.log("Setting hasRun to true");
      setHasRun(true);
    }, 30000);  // 30 seconds so you can see the full animation cycle
  };
  
  if (hasRun) return null; // Don't render anything once animation is complete
  
  return (
    <motion.div 
      className="fixed bottom-20 z-50 pointer-events-none"
      initial={{ x: "-50vw" }}
      animate={isVisible ? { x: "120vw" } : { x: "-50vw" }}
      transition={{ 
        type: "spring",
        stiffness: 6,    // Extremely low stiffness = super slow movement
        damping: 3,      // Very low damping = more bouncy
        mass: 8,         // Very high mass = much slower movement
        duration: 10     // Very long duration
      }}
      onAnimationComplete={handleAnimationComplete}
      style={{ 
        mixBlendMode: "multiply"
      }}
    >
      <img 
        src="/ezgif-69d805477686d4.gif"
        alt="Running Character"
        style={{
          width: "650px",    
          height: "650px",
          objectFit: "contain",
          imageRendering: "auto",
        }}
      />
    </motion.div>
  );
};

export default RunningCharacter;