import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";
import RelaxBackground from '@/components/RelaxBackground';
import BunnyAnimation from '@/components/BunnyAnimation';
import { TeleportBubble } from '@/components/TeleportBubble';

// Import music player icons from lucide-react
import { Play, Pause, Volume2, VolumeX, Sparkles } from 'lucide-react';

// Define the WebKit AudioContext for TypeScript
interface Window {
  webkitAudioContext: typeof AudioContext;
}

// Custom hook for audio playback and visualization
function useAudioPlayer(audioPath: string) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1.0);
  const [audioData, setAudioData] = useState<Uint8Array | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceNodeRef = useRef<MediaElementAudioSourceNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const analyserNodeRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const initialized = useRef(false);

  // Set audio source path
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = audioPath;
      audioRef.current.load();
    }
  }, [audioPath]);

  // Initialize audio context and nodes
  const initializeAudio = useCallback(() => {
    if (initialized.current) return;
    
    try {
      // Create AudioContext
      const AudioContext = window.AudioContext || (window as unknown as Window).webkitAudioContext;
      if (!AudioContext) {
        throw new Error("AudioContext not supported");
      }
      
      audioContextRef.current = new AudioContext();
      
      if (!audioRef.current) return;
      
      // Create source node
      sourceNodeRef.current = audioContextRef.current.createMediaElementSource(audioRef.current);
      
      // Create gain node for volume control
      gainNodeRef.current = audioContextRef.current.createGain();
      gainNodeRef.current.gain.value = volume;
      
      // Create analyser node for visualization
      analyserNodeRef.current = audioContextRef.current.createAnalyser();
      analyserNodeRef.current.fftSize = 256;
      
      // Connect nodes: source -> gain -> analyser -> destination
      sourceNodeRef.current.connect(gainNodeRef.current);
      gainNodeRef.current.connect(analyserNodeRef.current);
      analyserNodeRef.current.connect(audioContextRef.current.destination);
      
      initialized.current = true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to initialize audio";
      setError(errorMessage);
      console.error("Audio initialization error:", err);
    }
  }, [volume]);

  // Toggle play/pause
  const togglePlay = useCallback(() => {
    if (!audioRef.current) return;
    
    // Initialize audio on first play
    if (!initialized.current) {
      initializeAudio();
    }
    
    // Resume AudioContext if suspended
    if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume().catch(err => {
        console.error("Failed to resume AudioContext:", err);
      });
    }
    
    if (isPlaying) {
      audioRef.current.pause();
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      setIsPlaying(false);
    } else {
      // Ensure volume is set correctly
      audioRef.current.volume = volume;
      if (gainNodeRef.current) {
        gainNodeRef.current.gain.value = isMuted ? 0 : volume;
      }
      
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
          updateVisualization();
        })
        .catch(err => {
          const errorMessage = err instanceof Error ? err.message : "Failed to play audio";
          setError(errorMessage);
          console.error("Audio play error:", err);
        });
    }
  }, [isPlaying, isMuted, volume, initializeAudio]);

  // Update visualization data
  const updateVisualization = useCallback(() => {
    if (!analyserNodeRef.current || !isPlaying) return;
    
    const dataArray = new Uint8Array(analyserNodeRef.current.frequencyBinCount);
    analyserNodeRef.current.getByteFrequencyData(dataArray);
    setAudioData(dataArray);
    
    animationFrameRef.current = requestAnimationFrame(updateVisualization);
  }, [isPlaying]);

  // Toggle mute
  const toggleMute = useCallback(() => {
    if (gainNodeRef.current) {
      if (isMuted) {
        gainNodeRef.current.gain.value = volume;
      } else {
        gainNodeRef.current.gain.value = 0;
      }
    }
    
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
    }
    
    setIsMuted(!isMuted);
  }, [isMuted, volume]);

  // Handle volume change
  const handleVolumeChange = useCallback((newVolume: number | string) => {
    const numericVolume = typeof newVolume === 'number' ? newVolume : parseFloat(newVolume);
    
    setVolume(numericVolume);
    
    if (audioRef.current) {
      audioRef.current.volume = numericVolume;
    }
    
    if (gainNodeRef.current && !isMuted) {
      gainNodeRef.current.gain.value = numericVolume;
    }
  }, [isMuted]);

  // Setup and cleanup
  useEffect(() => {
    // Check if the browser supports AudioContext
    const AudioContext = window.AudioContext || (window as unknown as Window).webkitAudioContext;
    if (!AudioContext) {
      setError("Your browser doesn't support Web Audio API");
      return;
    }
    
    // Handle document click to enable audio (browsers require user interaction)
    const enableAudio = () => {
      if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume().catch(console.error);
      }
    };
    
    document.addEventListener('click', enableAudio);
    
    // Cleanup function
    return () => {
      document.removeEventListener('click', enableAudio);
      
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      
      // Disconnect and clean up audio nodes
      if (sourceNodeRef.current) {
        sourceNodeRef.current.disconnect();
      }
      
      if (gainNodeRef.current) {
        gainNodeRef.current.disconnect();
      }
      
      if (analyserNodeRef.current) {
        analyserNodeRef.current.disconnect();
      }
      
      // Close AudioContext
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(console.error);
      }
    };
  }, []);

  return {
    audioRef,
    isPlaying,
    isMuted,
    volume,
    audioData,
    error,
    togglePlay,
    toggleMute,
    handleVolumeChange
  };
}

const RelaxPage = () => {
  const navigate = useNavigate();
  // Show both rabbit and character immediately
  const [showRabbit] = useState(true);
  const [showCharacter, setShowCharacter] = useState(true);
  const [showSpeechBubble, setShowSpeechBubble] = useState(true);
  const [showSparkles, setShowSparkles] = useState(true);
  
  // Use our custom audio hook
  const {
    audioRef,
    isPlaying,
    isMuted,
    volume,
    audioData,
    error: audioError,
    togglePlay,
    toggleMute,
    handleVolumeChange
  } = useAudioPlayer(`/blue-skies.mp3`);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const isUnmounting = useRef(false);

  // Update error message when audio error changes
  useEffect(() => {
    if (audioError) {
      setErrorMessage(audioError);
    }
  }, [audioError]);

  // Navigation handler for both teleport bubbles
  const handleTeleportNext = () => {
    isUnmounting.current = true;
    navigate("/text-checker");
  };

  const handleTeleportBack = () => {
    isUnmounting.current = true;
    navigate(-1);
  };

  // Toggle sparkles effect
  const toggleSparkles = () => {
    setShowSparkles(!showSparkles);
  };

  // Handle volume change from UI slider
  const onVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleVolumeChange(parseFloat(e.target.value));
  };

  // Hide speech bubble after 4 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSpeechBubble(false);
    }, 9000);

    return () => clearTimeout(timer);
  }, []);

  // Hide character after 7 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCharacter(false);
    }, 9000); // Character disappears after 7 seconds

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

  // Calculate visualization data for UI
  const getVisualizationBars = () => {
    if (!audioData) return Array(20).fill(0);
    
    // Sample the frequency data to create 20 bars
    const sampleSize = Math.floor(audioData.length / 20);
    const bars = [];
    
    for (let i = 0; i < 20; i++) {
      const startIndex = i * sampleSize;
      let sum = 0;
      
      // Average the values in this sample range
      for (let j = 0; j < sampleSize && startIndex + j < audioData.length; j++) {
        sum += audioData[startIndex + j];
      }
      
      // Scale to a reasonable height (5-40px)
      const height = (sum / sampleSize) * 0.4;
      bars.push(Math.max(5, Math.min(40, height)));
    }
    
    return bars;
  };

  return (
    <RelaxBackground>
      {/* Audio element - hidden but functional */}
      <audio 
        ref={audioRef}
        loop
        preload="auto"
        crossOrigin="anonymous"
        style={{ display: 'none' }}
        src={`${window.location.origin}/blue-skies.mp3`}
      />

      {/* Simple Music Player - centered at the top without cloud shape */}
      <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
        <div className={`relative px-6 py-3 flex items-center gap-3 rounded-full backdrop-blur-md border shadow-lg transition-all duration-300 ${
          isPlaying 
            ? 'bg-gradient-to-r from-blue-600/80 to-purple-700/80 border-blue-400/40 shadow-blue-500/30' 
            : 'bg-gradient-to-r from-blue-500/70 to-purple-600/70 border-white/20'
        }`}>
          {/* Play/Pause Button with enhanced visual feedback */}
          <button 
            onClick={togglePlay}
            className={`w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 shadow-md ${
              isPlaying 
                ? 'bg-blue-400/40 hover:bg-blue-400/60 text-white scale-110 shadow-blue-400/50' 
                : 'bg-white/20 hover:bg-white/30 text-white'
            }`}
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
              className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors duration-300 ${
                isMuted 
                  ? 'bg-red-500/40 hover:bg-red-500/60 text-white' 
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
            </button>
            
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={onVolumeChange}
              className={`w-16 h-1.5 rounded-lg appearance-none cursor-pointer ${
                isMuted 
                  ? 'bg-red-300/30' 
                  : isPlaying ? 'bg-blue-300/50' : 'bg-white/30'
              }`}
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
            <p className={`text-xs font-medium opacity-90 ${isPlaying ? 'text-blue-100' : 'text-white'}`}>
              Blue Skies
            </p>
            <p className={`text-xs opacity-80 ${isPlaying ? 'text-blue-200' : 'text-blue-100'}`}>
              by Zambolino
            </p>
          </div>
        </div>
        
        {/* Audio status indicator */}
        {isPlaying && (
          <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 flex items-center justify-center bg-blue-500/20 backdrop-blur-sm rounded-full px-2 py-0.5">
            <span className="animate-pulse w-2 h-2 bg-blue-400 rounded-full mr-1"></span>
            <span className="text-xs text-blue-100">Playing</span>
          </div>
        )}
        
        {/* Audio error message with more details */}
        {audioError && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-red-500/80 text-white text-xs p-2 rounded-md text-center max-w-xs mx-auto">
            {errorMessage || "Click anywhere to enable audio playback"}
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
      

      {/* Enhanced Music visualization with real audio data */}
      <div className="fixed bottom-0 left-0 right-0 h-12 z-40 flex flex-col items-center">
        {isPlaying && (
          <>
            <div className="flex justify-around items-end h-10 w-full max-w-2xl px-4">
              {getVisualizationBars().map((height, i) => (
                <div 
                  key={i}
                  className="w-1 rounded-t-full opacity-90 bg-gradient-to-t from-purple-600 to-blue-400"
                  style={{
                    height: `${height}px`,
                    transition: "height 0.1s ease-in-out"
                  }}
                ></div>
              ))}
            </div>
            <div className="text-xs text-blue-200 opacity-80 animate-pulse">
              Sound is playing
            </div>
          </>
        )}
      </div>

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

      <TeleportBubble onClick={handleTeleportNext} color="blue" position="right" text="7.Text Check"/>
      <TeleportBubble onClick={handleTeleportBack} color="purple" position="left" text="5.Support"/>
        
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