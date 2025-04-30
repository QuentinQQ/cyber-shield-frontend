import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

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

const StoryPage: React.FC = () => {
    const navigate = useNavigate();
    const [isLeftScreenHovered, setIsLeftScreenHovered] = useState(false);
    const [isCharacterHovered, setIsCharacterHovered] = useState(false);
    const [textNoiseLevel, setTextNoiseLevel] = useState(100);

    // Handle teleport to clean feed page
    const handleTeleport = () => {
        navigate("/clean-feed");
    };

    // Text noise animation effect
    useEffect(() => {
        if (isLeftScreenHovered) {
            const interval = setInterval(() => {
                setTextNoiseLevel(prev => {
                    if (prev <= 0) return 0;
                    return prev - 5;
                });
            }, 50);
            return () => clearInterval(interval);
        } else {
            setTextNoiseLevel(100);
        }
    }, [isLeftScreenHovered]);

    // TV static noise canvas effect
    useEffect(() => {
        const createTVNoise = (canvasId: string) => {
            const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
            if (!canvas) return;
            
            const ctx = canvas.getContext('2d');
            if (!ctx) return;
            
            const resizeCanvas = () => {
                const parent = canvas.parentElement;
                if (parent) {
                    canvas.width = parent.clientWidth;
                    canvas.height = parent.clientHeight;
                }
            };
            
            resizeCanvas();
            window.addEventListener('resize', resizeCanvas);
            
            const drawStatic = () => {
                const imgData = ctx.createImageData(canvas.width, canvas.height);
                const data = imgData.data;
                
                for (let i = 0; i < data.length; i += 4) {
                    const grayValue = Math.floor(Math.random() * 255);
                    const colorTint = Math.random();
                    if (colorTint < 0.1) {
                        data[i] = Math.min(255, grayValue + Math.random() * 50);
                        data[i + 1] = grayValue * 0.7;
                        data[i + 2] = grayValue * 0.7;
                    } else if (colorTint < 0.2) {
                        data[i] = grayValue * 0.7;
                        data[i + 1] = Math.min(255, grayValue + Math.random() * 50);
                        data[i + 2] = grayValue * 0.7;
                    } else if (colorTint < 0.3) {
                        data[i] = grayValue * 0.7;
                        data[i + 1] = grayValue * 0.7;
                        data[i + 2] = Math.min(255, grayValue + Math.random() * 50);
                    } else {
                        data[i] = grayValue;
                        data[i + 1] = grayValue;
                        data[i + 2] = grayValue;
                    }
                    data[i + 3] = 255;
                }
                
                ctx.putImageData(imgData, 0, 0);
                requestAnimationFrame(drawStatic);
            };
            
            drawStatic();
            
            return () => {
                window.removeEventListener('resize', resizeCanvas);
            };
        };
        
        createTVNoise('leftScreenStatic');
    }, []);

    const NoisyText: React.FC<{ text: string; className?: string }> = ({ text, className = "" }) => {
        const chars = text.split('');
        
        return (
            <div className={`relative ${className}`}>
                <span 
                    style={{ 
                        opacity: 1 - textNoiseLevel/100,
                        transition: 'opacity 0.3s ease-out',
                    }}
                    className="relative z-10"
                >
                    {text}
                </span>
                
                {textNoiseLevel > 0 && (
                    <span 
                        className="absolute top-0 left-0 z-20"
                        style={{ 
                            opacity: textNoiseLevel/100,
                            transition: 'opacity 0.3s ease-out',
                        }}
                    >
                        {chars.map((char, index) => {
                            const shouldReplace = Math.random() < textNoiseLevel/100;
                            const randomChar = shouldReplace ? 
                                String.fromCharCode(33 + Math.floor(Math.random() * 94)) : 
                                char;
                            
                            return (
                                <span 
                                    key={index} 
                                    style={{ 
                                        color: shouldReplace ? 
                                            `rgb(${150 + Math.random() * 105}, ${150 + Math.random() * 105}, ${150 + Math.random() * 105})` : 
                                            'inherit',
                                        textShadow: shouldReplace ? '0 0 2px rgba(255,255,255,0.8)' : 'none'
                                    }}
                                >
                                    {randomChar}
                                </span>
                            );
                        })}
                    </span>
                )}
            </div>
        );
    };

    return (
        <div className="relative w-full h-screen overflow-hidden">
            {/* Keyframe animations for teleport bubble */}
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

            {/* Full-screen background image */}
            <div className="absolute inset-0 w-full h-full z-0">
                <img
                    src="/story-select.png"
                    alt="Story Selection Background"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Teleport Bubble - always visible */}
            <TeleportBubble onClick={handleTeleport} />

            <div className="relative z-10 w-full h-full flex flex-col">
                <div className="flex-1 flex items-center justify-center relative">
                    {/* Left TV Screen */}
                    <div 
                        className="absolute cursor-pointer"
                        style={{ 
                            left: '19%', 
                            top: '45%', 
                            width: '24%', 
                            height: '25%',
                            transform: 'translateY(-50%)',
                            overflow: 'hidden',
                            borderRadius: '0px',
                            zIndex: 5
                        }}
                        onMouseEnter={() => setIsLeftScreenHovered(true)}
                        onMouseLeave={() => setIsLeftScreenHovered(false)}
                        onClick={() => navigate("/video")}
                    >
                        <div className={`absolute inset-0 transition-opacity duration-500 ${isLeftScreenHovered ? 'opacity-0' : 'opacity-100'}`}>
                            <canvas id="leftScreenStatic" className="w-full h-full"></canvas>
                        </div>

                        <motion.div 
                            className={`absolute inset-0 flex flex-col items-center justify-center p-6 text-white bg-blue-600 bg-opacity-80 transition-opacity duration-500 ${isLeftScreenHovered ? 'opacity-100' : 'opacity-0'}`}
                            initial={false}
                            animate={isLeftScreenHovered ? { scale: 1 } : { scale: 0.95 }}
                            transition={{ duration: 0.3 }}
                        >
                            <NoisyText 
                                text="This is Emma's story" 
                                className="text-xl font-bold mb-3 text-center"
                            />
                            <NoisyText 
                                text="Mates can be online bullies too. Emma's yarn: She got help to end the cyber aggro."
                                className="text-sm text-center leading-tight"
                            />
                            <motion.div 
                                className="mt-4 text-xs text-white bg-red-500 px-3 py-1 rounded-full"
                                animate={{ scale: [1, 1.05, 1] }}
                                transition={{ repeat: Infinity, duration: 1.5 }}
                            >
                                Click to Watch
                            </motion.div>
                        </motion.div>

                        <div 
                            className="absolute inset-0 pointer-events-none z-10"
                            style={{ 
                                backgroundImage: 'linear-gradient(transparent 50%, rgba(0, 0, 0, 0.1) 50%)',
                                backgroundSize: '100% 4px',
                                opacity: isLeftScreenHovered ? 0.2 : 0.5,
                            }}
                        />
                        
                        <div 
                            className="absolute inset-0 pointer-events-none z-20"
                            style={{ 
                                background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 40%)',
                                opacity: isLeftScreenHovered ? 0.7 : 0.3,
                            }}
                        />
                    </div>

                    {/* Character in the center */}
                    <motion.div 
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-20 cursor-pointer"
                        style={{ 
                            height: '35%',
                            zIndex: 10
                        }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        onMouseEnter={() => setIsCharacterHovered(true)}
                        onMouseLeave={() => setIsCharacterHovered(false)}
                    >
                        <AnimatePresence>
                            {isCharacterHovered && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.8, y: 20 }}
                                    transition={{ duration: 0.3 }}
                                    className="absolute -top-24 left-1/2 transform -translate-x-1/2 bg-white text-blue-800 p-3 rounded-2xl max-w-xs shadow-lg z-30"
                                >
                                    <div className="font-medium text-center">
                                        Pick a screen to watch a story together!
                                    </div>
                                    <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[8px] border-r-[8px] border-t-[12px] border-l-transparent border-r-transparent border-t-white"></div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <img
                            src="/select-video.gif"
                            alt="Select Video"
                            className="h-full w-auto object-contain"
                            style={{ 
                                filter: 'drop-shadow(0 0 15px rgba(0,150,255,0.5))',
                            }}
                        />
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default StoryPage;