import { motion } from "framer-motion";

// Updated TeleportBubble component with color and position props
export const TeleportBubble: React.FC<{ 
  onClick: () => void;
  color?: "blue" | "purple"; // Optional with "blue" as default
  position?: "left" | "right"; // Optional with "right" as default
}> = ({ 
  onClick, 
  color = "blue", 
  position = "right" 
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
    }
  };
  
  const selectedColor = colorValues[color];
  
  // Set position based on the position prop
  const positionStyle = position === "right" ? 
    { right: '20px' } : 
    { left: '20px' };
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className={`absolute bottom-10 cursor-pointer z-50`}
      onClick={onClick}
      style={{
        width: '150px',
        height: '150px',
        ...positionStyle
      }}
    >
      {/* Teleport bubble animation */}
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
        {/* Inner layers of the teleport bubble */}
        <div 
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
        <div 
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
      </div>
    </motion.div>
  );
};

// You can also create a mini version for use in other components
export const MiniTeleportBubble: React.FC<{ 
  color?: "blue" | "purple";
  size?: number;
}> = ({ 
  color = "blue",
  size = 80 
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
    }
  };
  
  const selectedColor = colorValues[color];
  const borderSize = Math.max(7, Math.round(size * 0.09)); // Scale border size with bubble size
  
  return (
    <div 
      className={`teleport-bubble-mini-${color}`}
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
      <div 
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
      <div 
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
    </div>
  );
};