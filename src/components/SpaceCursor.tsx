import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

/**
 * SpaceCursor component
 * A space-themed cursor effect that follows the mouse with animated stars
 */
const SpaceCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isClicking, setIsClicking] = useState(false);
  const [stars, setStars] = useState<Array<{id: number; x: number; y: number; size: number; color: string}>>([]);
  const nextId = useRef(0);
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile - we'll show default cursor on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Space-themed colors
  const spaceColors = [
    "rgba(191, 217, 250, 0.8)", // Blue
    "rgba(215, 182, 255, 0.8)", // Purple
    "rgba(251, 179, 212, 0.8)", // Pink
    "rgba(181, 255, 214, 0.8)", // Teal
    "rgba(252, 213, 181, 0.8)", // Orange
  ];

  useEffect(() => {
    // If on mobile, don't setup cursor events
    if (isMobile) return;

    // Set up CSS to hide cursor
    const style = document.createElement('style');
    style.innerHTML = `
      body {
        cursor: none !important;
      }
      
      a, 
      button, 
      [role="button"], 
      .cursor-pointer, 
      input, 
      select, 
      textarea {
        cursor: none !important;
      }

      /* Ensure teleport buttons and other interactive elements don't hide the cursor */
      .teleport-bubble,
      button,
      [role="button"],
      .cursor-pointer {
        z-index: 999 !important;
      }
    `;
    document.head.appendChild(style);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (Math.random() > 0.92) addStar(e.clientX, e.clientY);
    };

    const handleMouseDown = () => {
      setIsClicking(true);
      addStar(mousePosition.x, mousePosition.y, true);
    };

    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.head.removeChild(style);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mousePosition, isMobile]);

  useEffect(() => {
    if (stars.length > 15) {
      setStars((current) => current.slice(-15));
    }
  }, [stars]);

  const addStar = (x: number, y: number, isLarge = false) => {
    const colorIndex = Math.floor(Math.random() * spaceColors.length);
    const size = isLarge ? Math.random() * 30 + 30 : Math.random() * 20 + 10;
    setStars((current) => [
      ...current,
      {
        id: nextId.current++,
        x,
        y,
        size,
        color: spaceColors[colorIndex],
      },
    ]);
  };

  // If on mobile, don't render the custom cursor
  if (isMobile) return null;

  return (
    <>
      {/* Space-themed cursor */}
      <motion.div
        className="fixed pointer-events-none"
        style={{
          left: mousePosition.x - 20,
          top: mousePosition.y - 20,
          width: isClicking ? 80 : 40,
          height: isClicking ? 80 : 40,
          zIndex: 9999, // Extremely high z-index to ensure it's always on top
        }}
      >
        {/* Core glow */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: isClicking
              ? "radial-gradient(circle, rgba(255, 255, 255, 0.9) 0%, rgba(120, 180, 255, 0.7) 40%, rgba(120, 120, 255, 0) 70%)"
              : "radial-gradient(circle, rgba(255, 255, 255, 0.7) 0%, rgba(120, 180, 255, 0.5) 40%, rgba(120, 120, 255, 0) 70%)",
            boxShadow: "0 0 15px rgba(120, 180, 255, 0.8)",
          }}
          animate={{
            scale: isClicking ? [1, 1.4, 1.2] : [1, 1.1, 1],
            opacity: isClicking ? [1, 0.9, 0.8] : [0.8, 0.7, 0.8],
          }}
          transition={{ 
            duration: 0.4,
            scale: { repeat: Infinity, repeatType: "reverse" },
            opacity: { repeat: Infinity, repeatType: "reverse" },
          }}
        />
        
        {/* Orbiting particles */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: isClicking ? 4 : 3,
              height: isClicking ? 4 : 3,
              boxShadow: "0 0 5px rgba(255, 255, 255, 0.8)",
              top: "50%",
              left: "50%",
            }}
            animate={{
              x: [0, Math.cos(i * (Math.PI * 2 / 3)) * 20, 0],
              y: [0, Math.sin(i * (Math.PI * 2 / 3)) * 20, 0],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </motion.div>

      {/* Cosmic Stars */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="fixed pointer-events-none"
          style={{
            left: star.x - star.size/2,
            top: star.y - star.size/2,
            width: star.size,
            height: star.size,
            zIndex: 9998, // Very high z-index just below the cursor
          }}
          initial={{ opacity: 0.8, scale: 0.2 }}
          animate={{ 
            opacity: [0.8, 0.5, 0],
            scale: [0.2, 1, 0.8],
            rotate: 360,
          }}
          transition={{ duration: 2.5, ease: "easeOut" }}
          onAnimationComplete={() => 
            setStars((current) => current.filter((s) => s.id !== star.id))
          }
        >
          {/* Star shape */}
          <motion.div
            className="w-full h-full absolute"
            style={{
              background: `radial-gradient(circle, ${star.color} 0%, rgba(255,255,255,0) 70%)`,
              borderRadius: '50%',
              boxShadow: `0 0 10px ${star.color}, 0 0 20px rgba(255,255,255,0.3)`,
            }}
          />
        </motion.div>
      ))}
    </>
  );
};

export default SpaceCursor;