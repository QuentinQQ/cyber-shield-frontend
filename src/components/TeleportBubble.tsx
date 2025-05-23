import { motion } from "framer-motion";
import React, { useState } from "react";

// Updated TeleportBubble component with color and position props
export const TeleportBubble: React.FC<{ 
  onClick: () => void;
  color?: "blue" | "purple" | "rainbow"; // Added rainbow option
  position?: "left" | "right"; // Optional with "right" as default
  text?: string; // Optional text to display where the bubble leads to
}> = ({ 
  onClick, 
  color = "blue", 
  position = "right",
  text
}) => {
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
    },
    rainbow: {
      outer: '#FF6B6B', // Red-pink
      outerBorder: '#FF8E8E', // Lighter red-pink
      middle: '#4ECDC4', // Teal-blue  
      middleBorder: '#7ED4CD', // Lighter teal
      inner: '#FFD93D', // Yellow
      innerBorder: '#FFE066' // Lighter yellow
    }
  };
  
  const selectedColor = colorValues[color];
  
  // Set position based on the position prop
  const positionStyle = position === "right" ? 
    { right: '20px' } : 
    { left: '20px' };
    
  // State to track if the bubble is being hovered
  const [isHovered, setIsHovered] = useState(false);
  
  // Animation variants for the text
  const textVariants = {
    normal: { 
      scale: 1, 
      rotate: 0, 
      opacity: 1,
      transition: {
        duration: 0.3
      }
    },
    hovered: {
      scale: [1, 0.8, 0.6, 0.4, 0.2, 0],
      rotate: [0, 90, 180, 270, 360],
      opacity: [1, 0.8, 0.6, 0.4, 0.2, 0],
      transition: {
        duration: 1.2,
        repeat: Infinity,
        repeatType: "loop" as const
      }
    }
  };
  
  // Animation variants for the layers
  const middleLayerVariants = {
    normal: {
      rotate: 0,
      transition: { duration: 0.5 }
    },
    hovered: {
      rotate: 360,
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };
  
  const innerLayerVariants = {
    normal: {
      rotate: 0,
      transition: { duration: 0.5 }
    },
    hovered: {
      rotate: -720,
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };
  
  return (
    <>
      {/* Add keyframe animations for rotation */}
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
      `}</style>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.3 }}
        className={`absolute bottom-10 cursor-pointer z-30`}
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          width: '150px',
          height: '150px',
          ...positionStyle
        }}
      >
        <div 
          className={`teleport-bubble-${color}`}
          style={{
            width: '150px',  
            height: '150px',
            background: selectedColor.outer,
            border: `13px solid ${selectedColor.outerBorder}`,
            position: 'relative',
            overflow: 'visible',
            borderRadius: '48% 40% 62% 47% / 61% 49% 64% 43%',
            animation: 'rotateTeleport 35s infinite linear',
            zIndex: 10
          }}
        >
          <motion.div 
            variants={middleLayerVariants}
            animate={isHovered ? "hovered" : "normal"}
            style={{
              content: '',
              position: 'absolute',
              top: '15px',
              left: '15px',
              width: 'calc(100% - 45px)',
              height: 'calc(100% - 45px)',
              background: selectedColor.middle,
              border: `10px solid ${selectedColor.middleBorder}`,
              borderRadius: '41% 40% 50% 55% / 49% 52% 51% 43%',
              zIndex: -2,
              animation: 'rotateTeleportBefore 35s infinite linear'
            }}
          />
          <motion.div 
            variants={innerLayerVariants}
            animate={isHovered ? "hovered" : "normal"}
            style={{
              content: '',
              position: 'absolute',
              top: '30px',
              left: '30px',
              width: 'calc(100% - 75px)',
              height: 'calc(100% - 75px)',
              background: selectedColor.inner,
              border: `7px solid ${selectedColor.innerBorder}`,
              borderRadius: '42% 63% 51% 60% / 47% 62% 42% 52%',
              animation: 'rotateTeleportAfter 35s infinite linear'
            }}
          />
          
          {/* Text label in the innermost circle with vortex animation */}
          {text && (
            <motion.div 
              variants={textVariants}
              animate={isHovered ? "hovered" : "normal"}
              style={{
                position: 'absolute',
                top: 'calc(30px + (100% - 75px)/2 - 10px)',
                left: 'calc(30px + (100% - 75px)/2 - 20px)',
                transform: 'translate(-50%, -50%)',
                color: 'white',
                fontWeight: 'bold',
                textAlign: 'center',
                fontSize: '0.85rem',
                textShadow: '0 1px 3px rgba(0,0,0,0.7)',
                width: 'calc(100% - 90px)',
                zIndex: 20,
                pointerEvents: 'none', // So it doesn't interfere with clicks
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}
            >
              {text}
            </motion.div>
          )}
        </div>
      </motion.div>
    </>
  );
};

// You can also create a mini version for use in other components
export const MiniTeleportBubble: React.FC<{ 
  color?: "blue" | "purple" | "rainbow"; // Added rainbow option
  size?: number;
  text?: string; // Optional text for mini bubble
}> = ({ 
  color = "blue",
  size = 80,
  text
}) => {
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
    },
    rainbow: {
      outer: '#FF6B6B', 
      outerBorder: '#daff6b',
      middle: '#4ECDC4', 
      middleBorder: '#7ED4CD', 
      inner: '#FFD93D',
      innerBorder: '#daff6b'
    }
  };
  
  const selectedColor = colorValues[color];
  const borderSize = Math.max(7, Math.round(size * 0.09)); // Scale border size with bubble size
  
  // State to track if the bubble is being hovered
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <>
      {/* Add keyframe animations for rotation */}
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
      `}</style>
      
      <motion.div 
        className={`teleport-bubble-mini-${color}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          background: selectedColor.outer,
          border: `${borderSize}px solid ${selectedColor.outerBorder}`,
          position: 'relative',
          overflow: 'visible',
          borderRadius: '48% 40% 62% 47% / 61% 49% 64% 43%',
          animation: 'rotateTeleport 35s infinite linear'
        }}
      >
        <motion.div 
          animate={isHovered ? {
            rotate: 360,
            transition: { 
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }
          } : {}}
          style={{
            position: 'absolute',
            top: `${size * 0.1}px`,
            left: `${size * 0.1}px`,
            width: `calc(100% - ${size * 0.3}px)`,
            height: `calc(100% - ${size * 0.3}px)`,
            background: selectedColor.middle,
            border: `${borderSize * 0.7}px solid ${selectedColor.middleBorder}`,
            borderRadius: '41% 40% 50% 55% / 49% 52% 51% 43%',
            zIndex: 2,
            animation: 'rotateTeleportBefore 35s infinite linear'
          }}
        />
        <motion.div 
          animate={isHovered ? {
            rotate: -720,
            transition: { 
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }
          } : {}}
          style={{
            position: 'absolute',
            top: `${size * 0.2}px`,
            left: `${size * 0.2}px`,
            width: `calc(100% - ${size * 0.5}px)`,
            height: `calc(100% - ${size * 0.5}px)`,
            background: selectedColor.inner,
            border: `${borderSize * 0.5}px solid ${selectedColor.innerBorder}`,
            borderRadius: '42% 63% 51% 60% / 47% 62% 42% 52%',
            animation: 'rotateTeleportAfter 35s infinite linear'
          }}
        />
        
        {/* Text label for mini bubble */}
        {text && (
          <motion.div 
            animate={isHovered ? {
              scale: [1, 0.8, 0.6, 0.4, 0.2, 0],
              rotate: [0, 90, 180, 270, 360],
              opacity: [1, 0.8, 0.6, 0.4, 0.2, 0],
              transition: {
                duration: 1.2,
                repeat: Infinity,
                repeatType: "loop" as const
              }
            } : {
              scale: 1, 
              rotate: 0, 
              opacity: 1
            }}
            style={{
              position: 'absolute',
              top: `calc(${size * 0.2}px + (100% - ${size * 0.5}px)/2 - ${size * 0.05}px)`,
              left: `calc(${size * 0.2}px + (100% - ${size * 0.5}px)/2 - ${size * 0.05}px)`,
              transform: 'translate(-50%, -50%)',
              color: 'white',
              fontWeight: 'bold',
              textAlign: 'center',
              fontSize: `${size * 0.12}rem`,
              textShadow: '0 1px 3px rgba(0,0,0,0.7)',
              width: `calc(100% - ${size * 0.7}px)`,
              zIndex: 20,
              pointerEvents: 'none'
            }}
          >
            {text}
          </motion.div>
        )}
      </motion.div>
    </>
  );
};