/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

/**
 * Bottom Wheel Navigation component
 */
const NavBar = () => {
  const navigate = useNavigate();
  const [rotationAngle, setRotationAngle] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  
  // Map menu items to appropriate colors
  const navItems = [
    { label: "Home", path: "/", color: "#FF6B6B" },
    { label: "What's Your Class Like?", path: "/quiz", color: "#4ECDC4" },
    { label: "Step Into the Story", path: "/scenario", color: "#FFD166" },
    { label: "Hear Their Voices", path: "/story", color: "#118AB2" },
    { label: "Clean My Feed", path: "/clean-feed", color: "#06D6A0" },
    { label: "Someone Listens", path: "/safe-people", color: "#9381FF" },
    { label: "Detect my message", path: "/text-checker", color: "#F25F5C" },
  ];

  const totalItems = navItems.length;
  const anglePerItem = 360 / totalItems;
  const radius = 150; // Wheel radius
  
  // Calculate position for each menu item
  const getPosition = (index: number) => {
    const angle = (index * anglePerItem) * (Math.PI / 180);
    return {
      x: radius * Math.cos(angle - Math.PI / 2),
      y: radius * Math.sin(angle - Math.PI / 2),
    };
  };

  // Spin the wheel to selected item - fixed TypeScript error by explicitly typing index as number
  const spinToItem = (index: number) => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    const targetAngle = -index * anglePerItem;
    const currentAngle = rotationAngle % 360;
    let differenceAngle = (targetAngle - currentAngle) % 360;
    
    // Ensure we're spinning in the shortest direction
    if (Math.abs(differenceAngle) > 180) {
      differenceAngle = differenceAngle > 0 ? differenceAngle - 360 : differenceAngle + 360;
    }
    
    // Add extra rotation for effect
    const newAngle = rotationAngle + differenceAngle;
    
    setRotationAngle(newAngle);
    setActiveIndex(index);
    
    // Navigate after spinning animation completes
    setTimeout(() => {
      setIsSpinning(false);
      navigate(navItems[index].path);
    }, 700);
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: { key: string; }) => {
      if (e.key === 'ArrowRight') {
        spinToItem((activeIndex + 1) % totalItems);
      } else if (e.key === 'ArrowLeft') {
        spinToItem((activeIndex - 1 + totalItems) % totalItems);
      } else if (e.key === 'Enter') {
        navigate(navItems[activeIndex].path);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, navigate]);

  // Breathing animation for menu items
  const pulseVariants = {
    hover: {
      scale: 1.15,
      boxShadow: "0 0 15px rgba(255,255,255,0.5)",
      transition: {
        duration: 0.3
      }
    }
  };


const centralButtonVariants = {
  animate: {
    scale: [1, 1.08, 1],
    boxShadow: [
      "0 0 10px rgba(255,255,255,0.2)",
      "0 0 20px rgba(255,255,255,0.6)",
      "0 0 10px rgba(255,255,255,0.2)"
    ],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};


  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 z-40 w-full max-w-md h-80 pointer-events-none overflow-hidden">
      <div className="absolute bottom-0 left-0 w-full h-full flex items-center justify-center pointer-events-auto">
        {/* Wheel Container */}
        <div className="relative w-full h-full">
          {/* Center Button - Added motion animation */}
          <motion.div 
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-20 h-20 rounded-full bg-white shadow-lg flex items-center justify-center z-10 cursor-pointer"
            onClick={() => navigate(navItems[activeIndex].path)}
            variants={centralButtonVariants}
            animate="animate"
            whileHover={{ scale: 1.2 }}
          >
            <span className="text-purple-900 font-bold">Menu</span>
          </motion.div>
          
          {/* Navigation Items - Only top half of wheel visible */}
          <motion.div 
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-96 h-96"
            animate={{ rotate: rotationAngle }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            {navItems.map((item, index) => {
              const pos = getPosition(index);
              
              return (
                <div
                  key={index}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                  style={{
                    transform: `translate(${pos.x}px, ${pos.y}px)`,
                  }}
                  onClick={() => spinToItem(index)}
                >
                  <motion.div 
                    className="w-24 h-24 rounded-full flex items-center justify-center shadow-md"
                    style={{ 
                      backgroundColor: item.color,
                      transform: `rotate(${-rotationAngle}deg)` // Counter-rotate to keep text upright
                    }}
                    whileHover="hover"
                    variants={pulseVariants}
                    // Add a floating effect to make buttons more enticing
                    animate={index === activeIndex ? {
                      y: [0, -8, 0],
                      scale: [1, 1.1, 1],
                      transition: {
                        y: { duration: 1.5, repeat: Infinity },
                        scale: { duration: 1.5, repeat: Infinity }
                      }
                    } : {
                      y: [0, -3, 0],
                      transition: { 
                        duration: 2, 
                        repeat: Infinity,
                        delay: index * 0.2 // Staggered animation for non-active items
                      }
                    }}
                  >
                    <span className="text-white font-bold text-xs text-center px-1">
                      {item.label.length > 12 
                        ? item.label.split(' ').map(word => word.substring(0, 1)).join('')
                        : item.label}
                    </span>
                  </motion.div>
                </div>
              );
            })}
          </motion.div>
        </div>
        
        {/* Left/Right Arrows for Navigation - Added motion effects */}
        <motion.div 
          className="absolute bottom-10 left-6 w-10 h-10 rounded-full bg-white/80 flex items-center justify-center cursor-pointer hover:bg-white"
          onClick={() => spinToItem((activeIndex - 1 + totalItems) % totalItems)}
          whileHover={{ scale: 1.2, backgroundColor: 'rgba(255, 255, 255, 1)' }}
          whileTap={{ scale: 0.9 }}
          animate={{ x: [-5, 0, -5], transition: { duration: 1.5, repeat: Infinity } }}
        >
          <span className="text-xl">←</span>
        </motion.div>
        
        <motion.div 
          className="absolute bottom-10 right-6 w-10 h-10 rounded-full bg-white/80 flex items-center justify-center cursor-pointer hover:bg-white"
          onClick={() => spinToItem((activeIndex + 1) % totalItems)}
          whileHover={{ scale: 1.2, backgroundColor: 'rgba(255, 255, 255, 1)' }}
          whileTap={{ scale: 0.9 }}
          animate={{ x: [5, 0, 5], transition: { duration: 1.5, repeat: Infinity } }}
        >
          <span className="text-xl">→</span>
        </motion.div>
        
        {/* Active Menu Item Label - Added motion effects */}
        <motion.div 
          className="absolute bottom-32 left-1/2 transform -translate-x-1/2 rounded-full bg-white/80 px-4 py-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ 
            opacity: 1, 
            y: 0,
            boxShadow: ["0px 0px 0px rgba(255,255,255,0)", "0px 0px 15px rgba(255,255,255,0.5)", "0px 0px 0px rgba(255,255,255,0)"],
          }}
          transition={{ 
            opacity: { duration: 0.3 },
            boxShadow: { duration: 2, repeat: Infinity }
          }}
        >
          <span className="text-purple-900 font-bold">{navItems[activeIndex].label}</span>
        </motion.div>
      </div>
    </div>
  );
};

export default NavBar;