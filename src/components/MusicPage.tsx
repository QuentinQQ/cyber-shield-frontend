// File: src/pages/MusicPage.tsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import RelaxBackground from '../components/RelaxBackground';

const MusicPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showControls, setShowControls] = useState(true);

  // Show loading animation while iframe loads
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Auto-hide controls after 5 seconds
  useEffect(() => {
    if (isLoaded) {
      const timer = setTimeout(() => {
        setShowControls(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isLoaded]);

  return (
    <RelaxBackground>
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        {/* Title */}
        <motion.h1 
          className="text-3xl md:text-4xl font-bold mb-8 text-purple-800 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Relaxing Music for Stress Relief
        </motion.h1>

        {/* Video container with responsive sizing */}
        <motion.div 
          className="relative w-full max-w-4xl aspect-video rounded-lg overflow-hidden shadow-2xl"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {/* Loading animation */}
          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-pink-100">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-500"></div>
            </div>
          )}

          {/* YouTube iframe */}
          <iframe 
            className="absolute inset-0 w-full h-full"
            src="https://www.youtube.com/embed/HQvKPn67z-k?si=RrX6y_BGdIRXa8N0&autoplay=1" 
            title="YouTube video player" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            referrerPolicy="strict-origin-when-cross-origin" 
            allowFullScreen
            onLoad={() => setIsLoaded(true)}
          ></iframe>
        </motion.div>

        {/* Breathing instructions */}
        <motion.div 
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <p className="text-lg text-purple-700 font-medium">Take deep breaths and let the music calm your mind...</p>
        </motion.div>

        {/* Controls (visible on hover or initially) */}
        <motion.div
          className="mt-6 flex gap-4"
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: showControls ? 1 : 0, y: showControls ? 0 : 10 }}
          transition={{ duration: 0.5 }}
          onMouseEnter={() => setShowControls(true)}
          onMouseLeave={() => setShowControls(false)}
        >
          <button 
            className="px-5 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-full shadow-md transition-all transform hover:scale-105"
            onClick={() => window.history.back()}
          >
            Back to Relaxation
          </button>
        </motion.div>
      </div>

      {/* Floating music notes animation */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 15 }).map((_, i) => (
          <div 
            key={i}
            className="absolute text-purple-400 opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 20 + 15}px`,
              animation: `float ${Math.random() * 10 + 15}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          >
            ♪
          </div>
        ))}
        {Array.from({ length: 10 }).map((_, i) => (
          <div 
            key={i + 15}
            className="absolute text-purple-500 opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 25 + 20}px`,
              animation: `float ${Math.random() * 15 + 20}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          >
            ♫
          </div>
        ))}
      </div>

      <style>{`
        @keyframes float {
          0% {
            transform: translate(0, 0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.3;
          }
          90% {
            opacity: 0.3;
          }
          100% {
            transform: translate(${Math.random() > 0.5 ? '' : '-'}${Math.random() * 100 + 100}px, -${Math.random() * 500 + 300}px) rotate(${Math.random() * 360}deg);
            opacity: 0;
          }
        }
      `}</style>
    </RelaxBackground>
  );
};

export default MusicPage;