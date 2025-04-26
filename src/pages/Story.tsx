import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const StoryPage: React.FC = () => {
    const navigate = useNavigate();
    const [isLeftScreenHovered, setIsLeftScreenHovered] = useState(false);
    const [isCharacterHovered, setIsCharacterHovered] = useState(false);
    const [textNoiseLevel, setTextNoiseLevel] = useState(100);

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
            
            // Set canvas size to match parent
            const resizeCanvas = () => {
                const parent = canvas.parentElement;
                if (parent) {
                    canvas.width = parent.clientWidth;
                    canvas.height = parent.clientHeight;
                }
            };
            
            resizeCanvas();
            window.addEventListener('resize', resizeCanvas);
            
            // Draw TV static
            const drawStatic = () => {
                // Original TV static was black and white with some color bleeding
                const imgData = ctx.createImageData(canvas.width, canvas.height);
                const data = imgData.data;
                
                for (let i = 0; i < data.length; i += 4) {
                    // Create grayscale noise as base
                    const grayValue = Math.floor(Math.random() * 255);
                    
                    // Randomly add slight color tint (red, green, blue "bleeding")
                    const colorTint = Math.random();
                    if (colorTint < 0.1) {
                        // Add reddish tint 
                        data[i] = Math.min(255, grayValue + Math.random() * 50); // Red +
                        data[i + 1] = grayValue * 0.7; // Green reduced
                        data[i + 2] = grayValue * 0.7; // Blue reduced
                    } else if (colorTint < 0.2) {
                        // Add greenish tint
                        data[i] = grayValue * 0.7; // Red reduced
                        data[i + 1] = Math.min(255, grayValue + Math.random() * 50); // Green +
                        data[i + 2] = grayValue * 0.7; // Blue reduced
                    } else if (colorTint < 0.3) {
                        // Add bluish tint
                        data[i] = grayValue * 0.7; // Red reduced
                        data[i + 1] = grayValue * 0.7; // Green reduced
                        data[i + 2] = Math.min(255, grayValue + Math.random() * 50); // Blue +
                    } else {
                        // Regular grayscale static
                        data[i] = grayValue;     // red
                        data[i + 1] = grayValue; // green
                        data[i + 2] = grayValue; // blue
                    }
                    data[i + 3] = 255; // alpha
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

    // Text with noise effect
    const NoisyText = ({ text, className = "" }) => {
        const chars = text.split('');
        
        return (
            <div className={`relative ${className}`}>
                {/* Text that will emerge */}
                <span 
                    style={{ 
                        opacity: 1 - textNoiseLevel/100,
                        transition: 'opacity 0.3s ease-out',
                    }}
                    className="relative z-10"
                >
                    {text}
                </span>
                
                {/* Noisy text overlay */}
                {textNoiseLevel > 0 && (
                    <span 
                        className="absolute top-0 left-0 z-20"
                        style={{ 
                            opacity: textNoiseLevel/100,
                            transition: 'opacity 0.3s ease-out',
                        }}
                    >
                        {chars.map((char, index) => {
                            // Replace with random character based on noise level
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
            {/* Full-screen background image */}
            <div className="absolute inset-0 w-full h-full z-0">
                <img
                    src="/story-select.png"
                    alt="Story Selection Background"
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="relative z-10 w-full h-full flex flex-col">
                <div className="container mx-auto py-10">
                    <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-white">
                        Stories
                    </h1>
                </div>

                <div className="flex-1 flex items-center justify-center" style={{ position: 'relative' }}>
                    {/* Left TV Screen - Interactive - Positioned to match the left blue box */}
                    <div 
                        className="absolute cursor-pointer"
                        style={{ 
                            left: '18%', 
                            top: '35%', 
                            width: '25%', 
                            height: '33%',
                            transform: 'translateY(-50%)',
                            overflow: 'hidden',
                            borderRadius: '0px',
                            zIndex: 15 // Higher z-index to stay above character
                        }}
                        onMouseEnter={() => setIsLeftScreenHovered(true)}
                        onMouseLeave={() => setIsLeftScreenHovered(false)}
                        onClick={() => navigate("/video")}
                    >
                        {/* TV Static Canvas */}
                        <div className={`absolute inset-0 transition-opacity duration-500 ${isLeftScreenHovered ? 'opacity-0' : 'opacity-100'}`}>
                            <canvas id="leftScreenStatic" className="w-full h-full"></canvas>
                        </div>

                        {/* TV Content when hovered - With noisy text effect */}
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

                        {/* TV Scan Lines */}
                        <div 
                            className="absolute inset-0 pointer-events-none z-10"
                            style={{ 
                                backgroundImage: 'linear-gradient(transparent 50%, rgba(0, 0, 0, 0.1) 50%)',
                                backgroundSize: '100% 4px',
                                opacity: isLeftScreenHovered ? 0.2 : 0.5,
                            }}
                        />
                        
                        {/* TV Glare Effect */}
                        <div 
                            className="absolute inset-0 pointer-events-none z-20"
                            style={{ 
                                background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 40%)',
                                opacity: isLeftScreenHovered ? 0.7 : 0.3,
                            }}
                        />
                    </div>

                    {/* Character in the center with speech bubble */}
                    <motion.div 
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-20 cursor-pointer"
                        style={{ 
                            height: '35%',
                            zIndex: 10 // Lower z-index to go behind screen
                        }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        onMouseEnter={() => setIsCharacterHovered(true)}
                        onMouseLeave={() => setIsCharacterHovered(false)}
                        onClick={() => navigate("/video")}
                    >
                        {/* Speech bubble for character */}
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
                                    {/* Speech bubble pointer */}
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