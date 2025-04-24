import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import PrimaryButton from "@/components/PrimaryButton";
import SectionWrapper from "@/components/SectionWrapper";
import happyImg from "@/assets/welcomePage/hero-happy.svg";
import { useHomePage } from "@/hooks/useHomePage";
import RunningCharacter from "@/components/RunningCharacter"; // Import the new component

const WelcomeSection: React.FC = () => {
  const { goToQuiz } = useHomePage();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorHovered, setCursorHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [splashes, setSplashes] = useState<
    Array<{ id: number; x: number; y: number; color: string }>
  >([]);
  const nextId = useRef(0);

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

  const splashColors = [
    "rgba(255, 183, 197, 0.6)",
    "rgba(173, 216, 230, 0.6)",
    "rgba(152, 251, 152, 0.6)",
    "rgba(255, 255, 153, 0.6)",
    "rgba(221, 160, 221, 0.6)",
  ];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (Math.random() > 0.92) addSplash(e.clientX, e.clientY);
    };

    const handleMouseDown = () => {
      setIsClicking(true);
      addSplash(mousePosition.x, mousePosition.y);
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
    if (splashes.length > 15) {
      setSplashes((current) => current.slice(-15));
    }
  }, [splashes]);

  const addSplash = (x: number, y: number) => {
    const colorIndex = Math.floor(Math.random() * splashColors.length);
    setSplashes((current) => [
      ...current,
      {
        id: nextId.current++,
        x,
        y,
        color: splashColors[colorIndex],
      },
    ]);
  };

  return (
    <SectionWrapper id="welcome" withGrid gridRows={2} headerHeight={80}>
      {/* Running Character Animation */}
      <RunningCharacter />
      
      {/* Watercolor splashes */}
      {splashes.map((splash) => (
        <motion.div
          key={splash.id}
          className="fixed pointer-events-none z-0 rounded-full blur-md opacity-60"
          style={{
            left: splash.x - 75,
            top: splash.y - 75,
            width: 150,
            height: 150,
            background: splash.color,
          }}
          initial={{ scale: 0.2, opacity: 0.8 }}
          animate={{ scale: [0.2, 1.2, 1.5], opacity: [0.8, 0.5, 0] }}
          transition={{ duration: 3.5, ease: "easeOut" }}
          onAnimationComplete={() =>
            setSplashes((current) =>
              current.filter((s) => s.id !== splash.id)
            )
          }
        />
      ))}

      {/* Cursor follower */}
      <motion.div
        className="fixed pointer-events-none z-0 rounded-full blur-md"
        style={{
          left: mousePosition.x - 20,
          top: mousePosition.y - 20,
          width: isClicking ? 80 : 40,
          height: isClicking ? 80 : 40,
          background: isClicking
            ? "rgba(120, 220, 232, 0.8)"
            : "rgba(173, 216, 230, 0.5)",
          mixBlendMode: "screen",
        }}
        animate={{
          scale: isClicking ? [1, 1.4, 1.2] : 1,
          opacity: isClicking ? [0.8, 0.9, 0.7] : 0.7,
        }}
        transition={{ duration: 0.4 }}
      />

      {/* Title block */}
      <div className="flex flex-col justify-start items-start px-10 md:px-20 relative pt-30">
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
          className="mt-26 bg-white/20 backdrop-blur-md p-4 rounded-xl max-w-xl border border-white/30"
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

        {/* Puzzle */}
        <div className="cursor-pointer absolute top-30 right-10 md:right-40">
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="relative"
            onMouseEnter={() => setCursorHovered(true)}
            onMouseLeave={() => setCursorHovered(false)}
            onClick={() => addSplash(mousePosition.x, mousePosition.y)}
          >
            {/* Watercolor glow */}
            <motion.div
              className="absolute inset-0 rounded-full blur-lg z-0"
              style={{
                background: "rgba(255, 223, 100, 0.6)",
              }}
              animate={{
                scale: cursorHovered ? [1, 1.2, 1.1] : [1, 1.1, 1],
                opacity: cursorHovered ? 0.8 : 0.6,
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />

            {/* Cute Tooltip */}
            <motion.div
              className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-yellow-50/80 text-black rounded-2xl px-5 py-4 font-bold text-base shadow-xl z-30 whitespace-nowrap border-2 border-yellow-300 backdrop-blur-md"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: cursorHovered ? 1 : 0,
                scale: cursorHovered ? 1 : 0.8,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              What's your class like?
              <div className="absolute top-1/2 left-full -translate-y-1/2 w-3 h-3 bg-yellow-200 transform rotate-45 ml-[-2px] shadow-sm"></div>
            </motion.div>

            <motion.img
              src={happyImg}
              alt="Quiz Start"
              className="w-36 sm:w-44 md:w-52 relative z-10"
              onClick={goToQuiz}
              whileHover={{ scale: 1.1, rotate: [0, -5, 5, -5, 0] }}
              whileTap={{ scale: 0.95 }}
              transition={{
                rotate: { duration: 0.5 },
                scale: { duration: 0.2 },
              }}
            />
          </motion.div>
        </div>
      </div>

      {/* Bottom right CTA */}
      <div className="flex justify-end items-center px-10 md:px-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8 }}
          whileHover={{
            rotate: [0, 5, -5, 5, -5, 0], // tilt shake effect
            transition: { duration: 0.6 }
          }}
          onMouseEnter={() => setCursorHovered(false)}  // Disable cursor effect when hovering over the button
          onMouseLeave={() => setCursorHovered(true)}   // Re-enable cursor effect when leaving the button
        >
          <PrimaryButton variant="cta" onClick={goToQuiz}>
            Let's Go!
          </PrimaryButton>
        </motion.div>
      </div>
    </SectionWrapper>
  );
};

export default WelcomeSection;