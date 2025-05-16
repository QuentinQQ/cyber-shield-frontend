import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";
import RelaxBackground from '@/components/RelaxBackground';
import BunnyAnimation from '@/components/BunnyAnimation';
import { TeleportBubble } from '@/components/TeleportBubble';

// Import music player icons from lucide-react
import { Play, Pause, Volume2, VolumeX, Sparkles } from 'lucide-react';

const RelaxPage = () => {
  const navigate = useNavigate();
  // Show both rabbit and character immediately
  const [showRabbit] = useState(true);
  const [showCharacter, setShowCharacter] = useState(true);
  const [showSpeechBubble, setShowSpeechBubble] = useState(true);
  const [showSparkles, setShowSparkles] = useState(true);
  
  // Audio player states
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [audioError, setAudioError] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Navigation handler for both teleport bubbles
  const handleTeleport = () => {
    navigate("/text-checker");
  };

  // Audio controls
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        // Create a promise to handle play attempt
        const playPromise = audioRef.current.play();
        
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
              setAudioError(false);
            })
            .catch(error => {
              console.error("Audio play error:", error);
              setAudioError(true);
              setIsPlaying(false);
              
              // Show a notification or alert here if needed
              alert("Please interact with the page first to enable audio playback.");
            });
        }
      }
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  // Toggle sparkles effect
  const toggleSparkles = () => {
    setShowSparkles(!showSparkles);
  };

  // Set up audio on component mount
  useEffect(() => {
    // Create an audio context to check if audio is suspended
    const audioContext = new AudioContext();
    
    if (audioRef.current) {
      // Set initial volume
      audioRef.current.volume = volume;
      
      // Listen for the canplaythrough event
      audioRef.current.addEventListener('canplaythrough', () => {
        console.log("Audio can play through - ready to play");
      });
      
      // Listen for errors
      audioRef.current.addEventListener('error', (e) => {
        console.error("Audio error:", e);
        setAudioError(true);
      });
      
      // Setup audio element
      audioRef.current.src = "/blue-skies.mp3"; // Your downloaded track
      audioRef.current.load();
      
      // We won't try to autoplay immediately to avoid browser restrictions
      console.log("Audio context state:", audioContext.state);
    }
    
    // Add a click event listener to the document to enable audio context
    const enableAudio = () => {
      if (audioContext.state === 'suspended') {
        audioContext.resume();
      }
      
      // Try to play audio on user interaction if not already playing
      if (audioRef.current && !isPlaying) {
        const playAttempt = audioRef.current.play();
        if (playAttempt) {
          playAttempt
            .then(() => {
              setIsPlaying(true);
              setAudioError(false);
            })
            .catch(error => {
              console.log("Audio play attempt failed:", error);
            });
        }
      }
      
      // Remove the event listener after first interaction
      document.removeEventListener('click', enableAudio);
    };
    
    document.addEventListener('click', enableAudio);
    
    return () => {
      document.removeEventListener('click', enableAudio);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
    };
  }, []);

  // Hide speech bubble after 4 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSpeechBubble(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  // Hide character after 7 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCharacter(false);
    }, 7000); // Character disappears after 7 seconds

    return () => clearTimeout(timer);
  }, []);

  // Generate falling objects (stars, bubbles, sparkles)
  const fallingElements = Array.from({ length: 50 }, (_, i) => {
    const size = Math.random() * 15 + 5;
    const left = Math.random() * 100;
    const animationDuration = Math.random() * 6 + 3;
    const delay = Math.random() * 5;
    const opacity = Math.random() * 0.3 + 0.7;
    const rotation = Math.random() * 360;
    const scale = Math.random() * 0.5 + 0.5;
    
    // Choose element type
    const elementType = Math.floor(Math.random() * 3);
    
    return {
      id: i,
      size,
      left,
      animationDuration,
      delay,
      opacity,
      rotation,
      scale,
      elementType
    };
  });

  return (
    <RelaxBackground>
      {/* Audio element - hidden but functional */}
      <audio 
        ref={audioRef}
        loop
        preload="auto"
        crossOrigin="anonymous"
      />

      {/* Simple Music Player - centered at the top without cloud shape */}
      <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
        <div className="relative px-6 py-3 flex items-center gap-3 bg-gradient-to-r from-blue-500/70 to-purple-600/70 rounded-full backdrop-blur-md border border-white/20 shadow-lg">
          {/* Play/Pause Button */}
          <button 
            onClick={togglePlay}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-white transition-all duration-300 shadow-md"
          >
            {isPlaying ? 
              <Pause size={20} /> : 
              <Play size={20} className="ml-1" />
            }
          </button>
          
          {/* Volume Controls */}
          <div className="flex items-center gap-2">
            <button 
              onClick={toggleMute}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white"
            >
              {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
            </button>
            
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="w-16 h-1.5 bg-white/30 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          
          {/* Sparkles toggle button */}
          <button
            onClick={toggleSparkles}
            className={`w-8 h-8 flex items-center justify-center rounded-full transition-all duration-300 ${
              showSparkles 
                ? 'bg-purple-500 text-white' 
                : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
          >
            <Sparkles size={14} />
          </button>
          
          {/* Music info with glowing text */}
          <div className="ml-1">
            <p className="text-xs text-white font-medium opacity-90">
              Blue Skies
            </p>
            <p className="text-xs text-blue-100 opacity-80">
              by Zambolino
            </p>
          </div>
        </div>
        
        {/* Audio error message */}
        {audioError && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-red-500/80 text-white text-xs p-2 rounded-md text-center">
            Click anywhere to enable audio playback
          </div>
        )}
      </div>

      {/* Fixed stars at the top of the screen */}
      <div className="fixed top-0 left-0 right-0 h-36 overflow-hidden z-5 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => {
          const size = Math.random() * 3 + 1;
          const left = Math.random() * 100;
          const top = Math.random() * 20;
          const opacity = Math.random() * 0.5 + 0.5;
          const animationDelay = Math.random() * 3;
          
          return (
            <div 
              key={`star-top-${i}`}
              className="absolute rounded-full bg-white"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `${left}%`,
                top: `${top}%`,
                opacity,
                boxShadow: `0 0 ${size * 2}px ${size/2}px rgba(255, 255, 255, 0.8)`,
                animation: `twinkle 3s ease-in-out ${animationDelay}s infinite alternate`
              }}
            />
          );
        })}
      </div>

      {/* Fireflies effect */}
      <div className="fixed inset-0 pointer-events-none z-10">
        {Array.from({ length: 30 }).map((_, i) => {
          const size = Math.random() * 4 + 2;
          const left = Math.random() * 100;
          const top = Math.random() * 100;
          const duration = Math.random() * 15 + 5;
          const delay = Math.random() * 5;
          
          return (
            <div 
              key={`firefly-${i}`}
              className="absolute rounded-full"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `${left}%`,
                top: `${top}%`,
                background: `radial-gradient(circle, rgba(255,255,190,0.8) 0%, rgba(182,255,116,0.4) 70%, rgba(0,255,171,0) 100%)`,
                boxShadow: `0 0 ${size * 2}px ${size}px rgba(255, 255, 160, 0.6)`,
                animation: `firefly ${duration}s ease-in-out ${delay}s infinite`,
                opacity: 0
              }}
            />
          );
        })}
      </div>

      {/* Character */}
      {showCharacter && (
        <div className="absolute left-8 top-[60%] transform -translate-y-1/2 z-10">
          <div className="w-105 h-auto">
            <img 
              src="/relax-char.gif"
              alt="Relax Character" 
              className="max-w-full max-h-full object-contain"
            />
          </div>
        </div>
      )}

      {/* Speech bubble matching CleanFeedIntro style */}
      <AnimatePresence>
        {showSpeechBubble && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="speech-bubble relative"
            style={{
              position: "absolute",
              top: "calc(50% - 320px)",   
              left: "150px",  
              margin: "0.5em 0", 
              padding: "1em",
              width: "15em", 
              minHeight: "4em",
              borderRadius: "0.25em",
              transform: "rotate(-4deg) rotateY(15deg)",
              background: "#629bdd",
              fontFamily: "Century Gothic, Verdana, sans-serif",
              fontSize: "1.5rem",
              textAlign: "center",
              zIndex: 20,
            }}
          >
            {/* Speech bubble pointer and shadow - inline styles */}
            <div 
              style={{
                position: "absolute",
                zIndex: -1,
                content: "''",
                top: 0, 
                right: 0, 
                bottom: 0, 
                left: 0,
                borderRadius: "0.25em",
                transform: "rotate(2deg) translate(.35em, -.15em) scale(1.02)",
                background: "#f4fbfe",
              }}
            />
            <div 
              style={{
                position: "absolute",
                zIndex: -1,
                content: "''",
                border: "solid 0 transparent",
                borderRight: "solid 3.5em #f4fbfe",
                borderBottom: "solid .25em #629bdd",
                bottom: ".25em", 
                left: "1.25em",
                width: 0, 
                height: "1em",
                transform: "rotate(45deg) skewX(75deg)",
              }}
            />
            
            {/* Content */}
            <motion.div 
              className="text-lg font-medium text-black z-10 relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              style={{ position: "relative", zIndex: 5 }}
            >
              <p>Sometimes things can get hard, so let's relax a little bit, follow our friend Rabbitz!</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Falling Sparkles, Stars and Bubbles Effect */}
      {showSparkles && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-15">
          {fallingElements.map(element => (
            <div
              key={element.id}
              className="absolute top-0"
              style={{
                left: `${element.left}%`,
                opacity: element.opacity,
                animation: `fallAndFade ${element.animationDuration}s linear ${element.delay}s infinite`,
                zIndex: 15
              }}
            >
              {/* Different element types */}
              {element.elementType === 0 && (
                // Star
                <svg width={element.size} height={element.size} viewBox="0 0 24 24" fill="none" style={{ filter: 'drop-shadow(0 0 3px rgba(147, 51, 234, 0.5))' }}>
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" 
                    fill="#FFD700" 
                    style={{ transform: `rotate(${element.rotation}deg) scale(${element.scale})` }}
                  />
                </svg>
              )}
              {element.elementType === 1 && (
                // Sparkle
                <div className="relative" style={{ width: element.size, height: element.size }}>
                  <div className="absolute inset-0 rounded-full bg-white animate-ping" style={{ animationDuration: '0.8s' }}></div>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-pink-300 to-purple-400"></div>
                </div>
              )}
              {element.elementType === 2 && (
                // Bubble
                <div 
                  className="rounded-full bg-gradient-to-br from-blue-300/40 to-purple-300/30 border border-white/20"
                  style={{ 
                    width: element.size * 1.2, 
                    height: element.size * 1.2,
                    backdropFilter: 'blur(2px)',
                    transform: `rotate(${element.rotation}deg) scale(${element.scale})`,
                    boxShadow: '0 0 5px rgba(255, 255, 255, 0.3) inset'
                  }}
                ></div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Place the bunny in the center */}
      <div className="absolute inset-0 flex items-center justify-center">
        {showRabbit && <BunnyAnimation />}
      </div>
      
      {/* Both Teleport Bubbles */}
      <TeleportBubble onClick={handleTeleport} color="blue" position="right" />
      <TeleportBubble onClick={handleTeleport} color="purple" position="left" />

      {/* Music visualization */}
      {isPlaying && (
        <div className="fixed bottom-0 left-0 right-0 h-1 z-40">
          <div className="flex justify-around items-end h-full">
            {[...Array(20)].map((_, i) => (
              <div 
                key={i}
                className="w-1 rounded-t-full opacity-70 bg-gradient-to-t from-purple-600 to-blue-400"
                style={{
                  height: `${Math.random() * 20 + 5}px`,
                  animationDuration: `${Math.random() * 2 + 0.5}s`,
                  animationDelay: `${Math.random() * 0.5}s`,
                  animationIterationCount: 'infinite',
                  animationDirection: 'alternate',
                  animationTimingFunction: 'ease-in-out',
                  animationName: 'musicBounce'
                }}
              ></div>
            ))}
          </div>
        </div>
      )}

      {/* Music Attribution - Centered at the bottom */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-40 text-white text-xs opacity-60 hover:opacity-100 transition-opacity text-center">
        <p>
          Music: Blue Skies by Zambolino<br />
          <a 
            href="https://freetouse.com/music" 
            target="_blank" 
            rel="noopener noreferrer"
            className="underline"
          >
            Source: freetouse.com
          </a>
        </p>
      </div>

      {/* REMOVED: Invisible button that was blocking clicks */}
      {/* Now we'll use a different approach for enabling audio */}
      <div 
        className="fixed top-0 left-0 w-0 h-0 opacity-0 overflow-hidden"
        onClick={() => {
          if (audioRef.current && !isPlaying) {
            audioRef.current.play()
              .then(() => {
                setIsPlaying(true);
                setAudioError(false);
              })
              .catch(() => {
                // Silent fail
              });
          }
        }}
      />

      {/* Global styles for animations */}
      <style>{`        
        @keyframes musicBounce {
          0% { height: 5px; }
          100% { height: 25px; }
        }
        
        @keyframes fallAndFade {
          0% { 
            transform: translateY(-50px) rotate(0deg);
            opacity: 0; 
          }
          10% { 
            opacity: 0.8; 
          }
          80% { 
            opacity: 0.8; 
          }
          100% { 
            transform: translateY(100vh) rotate(360deg);
            opacity: 0; 
          }
        }
        
        @keyframes twinkle {
          0% { opacity: 0.2; transform: scale(0.8); }
          100% { opacity: 1; transform: scale(1.2); }
        }
        
        @keyframes firefly {
          0% { opacity: 0; transform: translateX(0) translateY(0); }
          10% { opacity: 0.6; }
          20% { transform: translateX(20px) translateY(-15px); }
          40% { transform: translateX(-15px) translateY(10px); opacity: 0.8; }
          60% { transform: translateX(15px) translateY(15px); opacity: 0.6; }
          80% { transform: translateX(-20px) translateY(-10px); opacity: 0.4; }
          100% { opacity: 0; transform: translateX(0) translateY(0); }
        }
      `}</style>
    </RelaxBackground>
  );
};

export default RelaxPage;