/* eslint-disable react-hooks/exhaustive-deps */
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; 
import { useState, useEffect, useRef } from "react";
import PrimaryButton from "@/components/PrimaryButton";
import SectionWrapper from "@/components/SectionWrapper";
import happyImg from "@/assets/welcomePage/hero-happy.svg";
import { useHomePage } from "@/hooks/useHomePage";
import RunningCharacter from "@/components/RunningCharacter";

// Space Hole component
interface SpaceHoleProps {
  size: number;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  delay?: number;
}

const SpaceHole: React.FC<SpaceHoleProps> = ({ size, top, left, right, bottom, delay = 0 }) => {
  return (
    <motion.div 
      className="absolute pointer-events-none"
      style={{ 
        top: top || undefined, 
        left: left || undefined,
        right: right || undefined,
        bottom: bottom || undefined,
        width: size,
        height: size,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(20, 24, 82, 0.8) 0%, rgba(8, 15, 40, 0.9) 50%, rgba(0, 0, 0, 0) 100%)',
        boxShadow: 'inset 0 0 20px rgba(111, 168, 220, 0.5), 0 0 30px rgba(111, 168, 220, 0.3)',
        zIndex: 1,
      }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        rotate: 360,
      }}
      transition={{ 
        delay,
        duration: 2,
        rotate: {
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }
      }}
    >
      {/* Stars inside the hole */}
      {[...Array(8)].map((_, i) => (
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
    </motion.div>
  );
};

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

const WelcomeSection: React.FC = () => {
  const { goToQuiz } = useHomePage();
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorHovered, setCursorHovered] = useState(false);
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
  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  
  // Rotate through facts every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFactIndex((prev) => (prev + 1) % cyberbullyingFacts.length);
    }, 5000);
    return () => clearInterval(interval);
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
    <SectionWrapper id="welcome" withGrid gridRows={2} headerHeight={80}>
      {/* Space Holes/Portals */}
      <SpaceHole size={120} top="15%" left="5%" delay={0.3} right={undefined} bottom={undefined} />
      <SpaceHole size={180} bottom="15%" left="15%" delay={0.8} top={undefined} right={undefined} />
      <SpaceHole size={150} top="10%" left="60%" delay={0.5} right={undefined} bottom={undefined} /> 
      <SpaceHole size={100} bottom="85%" right="8%" delay={1.2} top={undefined} left={undefined} />
      <SpaceHole size={90} bottom="10%" right="30%" delay={0.7} top={undefined} left={undefined} /> 

      {/* Running Character Animation */}
      <RunningCharacter />
      
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

      {/* Title block */}
      <div className="flex flex-col justify-start items-start px-10 md:px-20 relative pt-30 z-20">
        <div className="relative">
          {/* Go Beyond */}
          <motion.div
            whileHover={{
              x: [0, 5, -5, 5, -5, 0],
              rotate: [0, 2, -2, 2, -2, 0],
            }}
            transition={{ duration: 0.6 }}
            className="relative mb-2 cursor-default"
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
              className="absolute z-0 text-4xl sm:text-5xl md:text-6xl font-bold text-black/30 top-1 left-1"
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
              className="absolute z-0 text-5xl sm:text-6xl md:text-7xl font-bold text-black/40 top-2 left-2"
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
          className="text-xl sm:text-2xl md:text-3xl font-semibold text-white mt-2"
        >
          "Remember, Words Can Wound"
        </motion.p>
        
        {/* "Did you know?" facts component */}
        <motion.div 
          className="mt-26 bg-white/20 backdrop-blur-md p-4 rounded-xl max-w-xl border border-white/30 z-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <h4 className="text-black font-bold mb-1">Did you know?</h4>
          <motion.p 
            key={currentFactIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-white text-lg"
          >
            {cyberbullyingFacts[currentFactIndex]}
          </motion.p>
        </motion.div>

        {/* Puzzle - Space Theme with White Glow Effect */}
        <div className="cursor-pointer absolute top-30 right-10 md:right-40 z-20">
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="relative"
            onMouseEnter={() => setCursorHovered(true)}
            onMouseLeave={() => setCursorHovered(false)}
            onClick={() => addStar(mousePosition.x, mousePosition.y, true)}
          >
            {/* Space portal glow effect */}
            <motion.div
              className="absolute inset-0 rounded-full blur-lg z-0"
              style={{
                background: "radial-gradient(circle, rgba(120, 180, 255, 0.7) 0%, rgba(100, 100, 255, 0.4) 70%, transparent 100%)",
                boxShadow: "0 0 20px rgba(120, 180, 255, 0.5)",
              }}
              animate={{
                scale: cursorHovered ? [1, 1.2, 1.1] : [1, 1.1, 1],
                opacity: cursorHovered ? 0.9 : 0.7,
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
            
            {/* White glow on hover - NEW */}
            <motion.div
              className="absolute inset-0 rounded-full blur-md z-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: cursorHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              style={{
                boxShadow: "0 0 20px 10px rgba(255, 255, 255, 0.7), 0 0 40px 20px rgba(255, 255, 255, 0.4)",
                transform: "scale(1.1)",
              }}
            />
            
            {/* Orbiting stars */}
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-white"
                style={{
                  width: 4,
                  height: 4,
                  boxShadow: "0 0 5px rgba(255, 255, 255, 0.8)",
                  top: "50%",
                  left: "50%",
                  marginTop: -2,
                  marginLeft: -2,
                }}
                animate={{
                  x: [0, Math.cos(i * (Math.PI / 2)) * 60, 0],
                  y: [0, Math.sin(i * (Math.PI / 2)) * 60, 0],
                  opacity: [0.5, 1, 0.5],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: cursorHovered ? 2 : 3,
                  repeat: Infinity,
                  delay: i * 0.25,
                }}
              />
            ))}

            {/* Space-themed Tooltip */}
            <motion.div
              className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-indigo-900/80 text-white rounded-2xl px-5 py-4 font-bold text-base shadow-xl z-30 whitespace-nowrap border-2 border-indigo-500/50 backdrop-blur-md"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: cursorHovered ? 1 : 0,
                scale: cursorHovered ? 1 : 0.8,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              What's your class like?
              <div className="absolute top-1/2 left-full -translate-y-1/2 w-3 h-3 bg-indigo-500 transform rotate-45 ml-[-2px] shadow-sm"></div>
              
              {/* Stars in tooltip */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full bg-white"
                  style={{
                    width: 2,
                    height: 2,
                    left: `${10 + Math.random() * 80}%`,
                    top: `${10 + Math.random() * 80}%`,
                  }}
                  animate={{
                    opacity: [0.2, 1, 0.2],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: Math.random() * 1,
                  }}
                />
              ))}
            </motion.div>

            <motion.img
              src={happyImg}
              alt="Quiz Start"
              className="w-36 sm:w-44 md:w-52 relative z-10"
              onClick={goToQuiz}
              whileHover={{ 
                scale: 1.1, 
                rotate: [0, -5, 5, -5, 0],
              }}
              whileTap={{ scale: 0.95 }}
              transition={{
                rotate: { duration: 0.5 },
                scale: { duration: 0.2 },
              }}
            />
          </motion.div>
        </div>
      </div>

      {/* Bottom right CTA - Space Theme */}
      <div className="flex justify-end items-center px-70 md:px-10 z-20">
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
            Let's Go!
          </PrimaryButton>
        </motion.div>
      </div>
    </SectionWrapper>
  );
};

export default WelcomeSection;