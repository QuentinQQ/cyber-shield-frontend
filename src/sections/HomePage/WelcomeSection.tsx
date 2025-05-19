import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; 
import { useState, useEffect, useRef, JSX } from "react";
import PrimaryButton from "@/components/PrimaryButton";
import SectionWrapper from "@/components/SectionWrapper";
import { useHomePage } from "@/hooks/useHomePage";
import RunningCharacter from "@/components/RunningCharacter";

// Cosmic Star component for cursor trail
interface CosmicStarProps {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  onComplete: () => void;
}

const CosmicStar: React.FC<CosmicStarProps> = ({ id, x, y, size, color, onComplete }) => {
  return (
    <motion.div
      key={id}
      className="fixed pointer-events-none z-10"
      style={{
        left: x - size/2,
        top: y - size/2,
        width: size,
        height: size,
      }}
      initial={{ opacity: 0.8, scale: 0.2 }}
      animate={{ 
        opacity: [0.8, 0.5, 0],
        scale: [0.2, 1, 0.8],
        rotate: 360,
      }}
      transition={{ duration: 2.5, ease: "easeOut" }}
      onAnimationComplete={onComplete}
    >
      {/* Star shape */}
      <motion.div
        className="w-full h-full absolute"
        style={{
          background: `radial-gradient(circle, ${color} 0%, rgba(255,255,255,0) 70%)`,
          borderRadius: '50%',
          boxShadow: `0 0 10px ${color}, 0 0 20px rgba(255,255,255,0.3)`,
        }}
      />
      
      {/* Star points */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            width: '100%',
            height: '100%',
            transform: `rotate(${i * 72}deg)`,
          }}
        >
          <motion.div
            className="absolute"
            style={{
              width: size * 0.1,
              height: size * 0.6,
              background: `linear-gradient(to top, ${color}, transparent)`,
              borderRadius: '50%',
              left: '50%',
              marginLeft: -(size * 0.05),
              top: -size * 0.1,
            }}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

// Twinkling stars component
const TwinklingStars: React.FC = () => {
  const starsRef = useRef<JSX.Element[]>([]);

  if (starsRef.current.length === 0) {
    const starCount = 110; // Increased star count
    
    for (let i = 0; i < starCount; i++) {
      const size = Math.random() * 2.5 + 1;
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const delay = Math.random() * 3;
      const duration = Math.random() * 3 + 2;
      
      // Different colors for stars
      const colors = [
        'rgba(255, 255, 255, 0.8)',
        'rgba(220, 255, 255, 0.8)',
        'rgba(255, 245, 220, 0.8)',
      ];
      
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      starsRef.current.push(
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${x}%`,
            top: `${y}%`,
            width: size,
            height: size,
            backgroundColor: color,
            boxShadow: `0 0 ${size}px ${size/2}px ${color}`,
          }}
          animate={{
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration,
            repeat: Infinity,
            delay,
          }}
        />
      );
    }
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-1">
      {starsRef.current}
    </div>
  );
};

// Floating particles component for subtle space dust
const FloatingParticles: React.FC = () => {
  const particles = useRef<JSX.Element[]>([]);

  if (particles.current.length === 0) {
    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
      const size = Math.random() * 20 + 10;
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const duration = Math.random() * 10 + 15;
      const delay = Math.random() * 5;
      
      // Subtle pastel colors that match turquoise theme
      const colors = [
        'rgba(200, 255, 255, 0.05)',
        'rgba(190, 240, 250, 0.05)',
        'rgba(180, 250, 230, 0.05)',
        'rgba(210, 250, 220, 0.05)',
      ];
      
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      particles.current.push(
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${x}%`,
            top: `${y}%`,
            width: size,
            height: size,
            backgroundColor: color,
            filter: 'blur(8px)',
          }}
          animate={{
            y: [`${y}%`, `${y + (Math.random() * 10 - 5)}%`],
            x: [`${x}%`, `${x + (Math.random() * 10 - 5)}%`],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration,
            repeat: Infinity,
            repeatType: 'reverse',
            delay,
          }}
        />
      );
    }
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {particles.current}
    </div>
  );
};

// Enhanced Shooting Star animation component with multiple shooting stars
const ShootingStars: React.FC = () => {
  const [shootingStars, setShootingStars] = useState<{id: number; x: number; y: number}[]>([]);
  const nextStarId = useRef(0);
  
  useEffect(() => {
    // Create a new shooting star that moves horizontally
    const createShootingStar = () => {
      const id = nextStarId.current++;
      const startX = -50; // Start from left edge
      const startY = Math.random() * window.innerHeight * 0.7; // Random Y position
      
      setShootingStars(prev => [...prev, { id, x: startX, y: startY }]);
      
      // Remove the star after animation
      setTimeout(() => {
        setShootingStars(prev => prev.filter(star => star.id !== id));
      }, 1500);
    };
    
    // Create shooting stars at random intervals
    const interval = setInterval(() => {
      if (Math.random() < 0.5) { // 50% chance to create a shooting star
        createShootingStar();
      }
    }, 3000); // Check every 3 seconds
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <>
      {shootingStars.map(star => (
        <motion.div
          key={star.id}
          className="fixed pointer-events-none z-5"
          initial={{ opacity: 0, x: star.x, y: star.y }}
          animate={{
            opacity: [0, 1, 0], 
            x: window.innerWidth + 100, // Move across the screen to the right
            y: star.y, // Keep the same Y position
          }}
          transition={{ duration: 2, ease: "linear" }}
        >
          <div 
            className="h-1 w-20 bg-white rounded-full"
            style={{ 
              boxShadow: "0 0 8px 1px white, 0 0 20px 5px rgba(255, 255, 255, 0.3)",
            }}
          />
        </motion.div>
      ))}
    </>
  );
};
// New Custom Planet component based on the provided CSS
const CustomPlanet: React.FC<{
  color: string;
  size: number;
  left: string;
  top: string;
  hasMoon?: boolean;
  moonColor?: string;
}> = ({ color, size, left, top, hasMoon = false, moonColor = "#9e9e9e" }) => {
  return (
    <div className="absolute" style={{ left, top, zIndex: 2 }}>
      {/* Main planet */}
      <motion.div
        className="relative rounded-full overflow-hidden"
        style={{
          width: size,
          height: size,
          background: color,
          boxShadow: `0 0 20px 5px ${color}40`,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        whileHover={{ scale: 1.05 }}
      >
        {/* Planet shadow */}
        <div 
          className="absolute rounded-full"
          style={{
            position: "absolute",
            borderRadius: "50%",
            height: "100%",
            width: "100%",
            top: "-40%",
            right: "-10%",
            border: `${size/4}px solid rgba(0,0,0,.15)`,
          }}
        />
        
        {/* Craters */}
        <div 
          className="absolute rounded-full"
          style={{ 
            width: size/7.5, 
            height: size/7.5, 
            left: "25%", 
            top: "20%", 
            background: "rgba(0,0,0,.15)",
            boxShadow: "inset 3px 3px 0 rgba(0,0,0,.15)"
          }}
        />
        <div 
          className="absolute rounded-full"
          style={{ 
            width: size/15, 
            height: size/15, 
            left: "50%", 
            top: "60%", 
            background: "rgba(0,0,0,.15)",
            boxShadow: "inset 3px 3px 0 rgba(0,0,0,.15)"
          }}
        />
        <div 
          className="absolute rounded-full"
          style={{ 
            width: size/10, 
            height: size/10, 
            left: "30%", 
            top: "65%", 
            background: "rgba(0,0,0,.15)",
            boxShadow: "inset 3px 3px 0 rgba(0,0,0,.15)"
          }}
        />
        <div 
          className="absolute rounded-full"
          style={{ 
            width: size/10, 
            height: size/10, 
            left: "60%", 
            top: "35%", 
            background: "rgba(0,0,0,.15)",
            boxShadow: "inset 3px 3px 0 rgba(0,0,0,.15)"
          }}
        />
      </motion.div>
      
      {/* Moon (if enabled) */}
      {hasMoon && (
        <motion.div
          className="absolute rounded-full overflow-hidden"
          style={{
            width: size/3.75,
            height: size/3.75,
            background: moonColor,
            boxShadow: `inset -${size/21}px -${size/21}px 0 rgba(0,0,0,.2)`,
            zIndex: 3,
          }}
          animate={{
            rotate: [0, 360],
            x: [size/2, size*1.2, size/2, -size*0.2, size/2],
            y: [0, size*0.3, size*0.6, size*0.3, 0],
          }}
          transition={{
            rotate: { duration: 15, repeat: Infinity, ease: "linear" },
            x: { duration: 15, repeat: Infinity, ease: "linear" },
            y: { duration: 15, repeat: Infinity, ease: "linear" },
          }}
        >
          {/* Moon craters */}
          <div 
            className="absolute rounded-full"
            style={{ 
              width: size/30, 
              height: size/30, 
              left: "20%", 
              top: "20%", 
              background: "rgba(0,0,0,.15)",
              boxShadow: "inset 1px 1px 0 rgba(0,0,0,.15)"
            }}
          />
          <div 
            className="absolute rounded-full"
            style={{ 
              width: size/40, 
              height: size/40, 
              left: "50%", 
              top: "50%", 
              background: "rgba(0,0,0,.15)",
              boxShadow: "inset 1px 1px 0 rgba(0,0,0,.15)"
            }}
          />
        </motion.div>
      )}
    </div>
  );
};

// UFO component hover above the "Go Beyond" text
const Ufo: React.FC<{
  top: string;
  left: string;
  width?: number;
  zIndex?: number;
}> = ({ top, left, width = 35, zIndex = 20 }) => {
  return (
    <motion.div 
      className="absolute pointer-events-none"
      style={{ top, left, zIndex }}
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    >
      <div className="relative" style={{ width: `${width}vmin` }}>
        <div 
          className="relative"
          style={{
            width: `${width * 0.57}vmin`,
            height: `${width * 0.17}vmin`,
            background: 'lightskyblue',
            borderRadius: `${width * 0.3}vmin ${width * 0.3}vmin ${width * 0.06}vmin ${width * 0.06}vmin / ${width * 0.46}vmin ${width * 0.46}vmin ${width * 0.06}vmin ${width * 0.06}vmin`,
            transform: `translateY(${width * 0.06}vmin)`,
            zIndex: 1,
            marginLeft: `${width * 0.21}vmin`,
          }}
        >
          {/* UFO top antenna */}
          <div
            style={{
              position: 'absolute',
              width: `${width * 0.057}vmin`,
              height: `${width * 0.029}vmin`,
              background: '#fff',
              left: '50%',
              top: '0%',
              transform: 'translate(-50%,-90%)',
              borderRadius: `${width * 0.029}vmin ${width * 0.029}vmin 0 0 / ${width * 0.029}vmin ${width * 0.029}vmin 0 0`,
              zIndex: -1,
            }}
          />
        </div>
        
        {/* UFO middle part (with lights) */}
        <div
          className="relative overflow-hidden"
          style={{
            width: `${width}vmin`,
            height: `${width * 0.1}vmin`,
            background: '#a180d4',
            borderRadius: `${width * 0.5}vmin / ${width * 0.07}vmin ${width * 0.07}vmin ${width * 0.02}vmin ${width * 0.02}vmin`,
            zIndex: 2,
          }}
        >
          {/* Animated lights */}
          <motion.div
            style={{
              position: 'absolute',
              width: `${width * 1.23}vmin`,
              height: `${width * 0.052}vmin`,
              top: '50%',
              transform: 'translate(-19.4%, -50%)',
              borderBottom: `${width * 0.04}vmin dotted white`,
            }}
            animate={{ 
              x: [0, `${width * 0.55}vmin`, 0] 
            }}
            transition={{ 
              duration: 0.8, 
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>
        
        {/* UFO bottom part */}
        <div
          style={{
            background: 'lightskyblue',
            width: `${width * 0.8}vmin`,
            height: `${width * 0.17}vmin`,
            borderRadius: `${width * 0.08}vmin ${width * 0.08}vmin ${width * 0.4}vmin ${width * 0.4}vmin / ${width * 0.034}vmin ${width * 0.034}vmin ${width * 0.136}vmin ${width * 0.136}vmin`,
            transform: `translateY(-${width * 0.06}vmin)`,
            filter: 'brightness(.7)',
            marginLeft: `${width * 0.1}vmin`,
          }}
        />
        
       <motion.div
          className="absolute left-1/2 transform -translate-x-1/2"
          style={{
            width: `${width * 0.5}vmin`,   // narrow top width
            height: `${width * 2}vmin`,
            background: 'linear-gradient(0deg, transparent, #ffff5faa)',
            zIndex: -1,
            transformOrigin: 'top',
            top: '100%',
            clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',  // triangle shape
          }}
          initial={{ opacity: 0, scaleY: 0.7 }}
          animate={{ 
            opacity: [0, 0.6, 0],
            scaleY: [0.7, 1, 0.7],
          }}
          transition={{ 
            duration: 2.5, 
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      </div>
    </motion.div>
  );
};

// Stationary Character component
const StationaryCharacter: React.FC = () => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center absolute"
      style={{
        left: "50%",
        bottom: "10%",
        transform: "translateX(-50%)",
        zIndex: 20,
      }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
    >
      <div className="relative" style={{ width: "180px", height: "220px" }}>
        <RunningCharacter />
      </div>
    </motion.div>
  );
};

const WelcomeSection: React.FC = () => {
  useHomePage();
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [, setCursorHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [stars, setStars] = useState<{ id: number; x: number; y: number; size: number; color: string }[]>([]);
  const nextId = useRef(0);

  // Define goToCharacterIntro at the component level
  const goToCharacterIntroPage = () => {
    navigate("/character-intro");
  };

  // Added cyberbullying facts for the rotating facts component
  const cyberbullyingFacts = [
    "1 in 3 young people have experienced cyberbullying",
    "Telling a trusted adult is the first step to stopping cyberbullying",
    "Standing up for others online can help stop cyberbullying",
    "Taking a screenshot is a good way to document cyberbullying",
    "It's never too late to get help with cyberbullying",
  ];
  
  // State to track the current fact being displayed
  const [, setCurrentFactIndex] = useState(0);
  
  // Rotate through facts every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFactIndex((prev) => (prev + 1) % cyberbullyingFacts.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [cyberbullyingFacts.length]);

  // Space-themed colors
  const spaceColors = [
    "rgba(191, 217, 250, 0.8)", // Blue
    "rgba(215, 182, 255, 0.8)", // Purple
    "rgba(251, 179, 212, 0.8)", // Pink
    "rgba(181, 255, 214, 0.8)", // Teal
    "rgba(252, 213, 181, 0.8)", // Orange
  ];

  useEffect(() => {
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
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mousePosition]);

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

  return (
    <>
      {/* Turquoise space background - matching your screenshot */}
      <div className="fixed inset-0 z-0" style={{
        background: 'linear-gradient(to bottom,rgb(53, 155, 192),rgb(79, 214, 235))',
      }}></div>
      
      {/* Background elements */}
      <FloatingParticles />
      <TwinklingStars />
      <ShootingStars />
      
      <CustomPlanet 
        color="#ff5f40" 
        size={120} 
        left="37%" 
        top="22%" 
        hasMoon={true}
      />
      <CustomPlanet 
        color="#e6d14e" 
        size={100} 
        left="70%" 
        top="55%" 
      />
      <CustomPlanet 
        color="#94f0ff" 
        size={80} 
        left="80%" 
        top="20%" 
        hasMoon={true}
        moonColor="#a8e0ff"
      />
      {/* Added more planets */}
      <CustomPlanet 
        color="#ffcc66" 
        size={60} 
        left="25%" 
        top="70%" 
      />
      <CustomPlanet 
        color="#c792ea" 
        size={50} 
        left="60%" 
        top="15%" 
      />
      <CustomPlanet 
        color="#7fc1ca" 
        size={40} 
        left="60%" 
        top="45%" 
        hasMoon={true}
        moonColor="#b2ebf2"
      />

      <CustomPlanet 
        color="#4586ad" 
        size={60} 
        left="50%" 
        top="80%" 
      />
      
      <SectionWrapper id="welcome" withGrid gridRows={2} headerHeight={80}>
        {/* Added back the stationary character with speech bubble */}
        <StationaryCharacter />
        
        {/* Cosmic Stars */}
        {stars.map((star) => (
          <CosmicStar
            key={star.id}
            id={star.id}
            x={star.x}
            y={star.y}
            size={star.size}
            color={star.color}
            onComplete={() => 
              setStars((current) => current.filter((s) => s.id !== star.id))
            }
          />
        ))}

        {/* Space-themed cursor */}
        <motion.div
          className="fixed pointer-events-none z-10"
          style={{
            left: mousePosition.x - 20,
            top: mousePosition.y - 20,
            width: isClicking ? 80 : 40,
            height: isClicking ? 80 : 40,
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

        {/* Title and Content - Left aligned */}
        <div className="flex flex-col justify-start items-start px-10 md:px-20 mt-20 z-20">
          <div className="relative">
            <Ufo 
              top="-15vh" 
              left="0%" 
              width={45}
              zIndex={25} 
            />
            
            {/* Go Beyond */}
            <motion.div
              whileHover={{
                x: [0, 5, -5, 5, -5, 0],
                rotate: [0, 2, -2, 2, -2, 0],
              }}
              transition={{ duration: 0.6 }}
              className="relative mt-10 mb-7 cursor-default"

            >
              <motion.h1
                className="text-4xl sm:text-5xl md:text-6xl font-bold text-white relative z-10"
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 1.5,
                  type: "spring",
                  stiffness: 100,
                  damping: 10,
                }}
              >
                Go Beyond
              </motion.h1>
              <motion.div
                className="absolute z-0 text-4xl sm:text-5xl md:text-6xl font-bold text-black/20 top-1 left-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, delay: 0.3 }}
              >
                Go Beyond
              </motion.div>
            </motion.div>

            {/* Cyberbully */}
            <motion.div
              whileHover={{ y: [0, -4, 4, -4, 4, 0] }}
              transition={{ duration: 0.6 }}
              className="relative mb-2 cursor-default"
            >
              <motion.h1
                className="text-5xl sm:text-6xl md:text-7xl font-bold text-white relative z-10"
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 1.5,
                  delay: 0.2,
                  type: "spring",
                  stiffness: 100,
                  damping: 10,
                }}
              >
                Cyberbully
              </motion.h1>
              <motion.div
                className="absolute z-0 text-5xl sm:text-6xl md:text-7xl font-bold text-black/20 top-2 left-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, delay: 0.4 }}
              >
                Cyberbully
              </motion.div>
            </motion.div>
          </div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.8, delay: 0.6, type: "spring" }}
            className="text-xl sm:text-2xl md:text-3xl font-semibold text-[#090b3d] mt-10"
          >
            "Your Space Mission Against Online Meanness"
          </motion.p>
          
          {/* New hero message */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.7 }}
            className="text-[#090b3d] font-semibold text-lg mt-9 max-w-lg"
          >
            Join our cosmic adventure to become a digital defender! Learn to spot online bullies, 
            discover your superpowers to stay safe, and help friends in need.
          </motion.p>

          {/* "Did you know?" facts component - Moved down */}
          <motion.div 
            className="mt-15 bg-white/20 backdrop-blur-md p-4 rounded-xl max-w-xl border border-white/30 z-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
          >
            <h4 className="text-[#090b3d] font-bold mb-1">Did you know?</h4>
            <p className="text-[#090b3d] text-lg">
              1 in 3 young people have experienced cyberbullying
            </p>
          </motion.div>
        </div>

        {/* Bottom right CTA - Space Theme - Moved up */}
        <div className="relative flex justify-end items-center px-6 md:px-10 py-0 top-[-70px] z-20">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.8 }}
            whileHover={{
              rotate: [0, 5, -5, 5, -5, 0], // tilt shake effect
              filter: "drop-shadow(0 0 10px rgba(120, 180, 255, 0.8))",
              transition: { duration: 0.6 }
            }}
            onMouseEnter={() => setCursorHovered(false)} 
            onMouseLeave={() => setCursorHovered(true)}
          >
            <PrimaryButton variant="cta" onClick={goToCharacterIntroPage}>
              Let's Kill Cyberbullying!
            </PrimaryButton>
          </motion.div>
        </div>
      </SectionWrapper>
    </>
  );
};

export default WelcomeSection;