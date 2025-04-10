import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface VideoPlayerProps {
  src: string;
  onEnded: () => void;
  videoRef: React.RefObject<HTMLVideoElement | null>;
}

/**
 * @component VideoPlayer
 * @description Handles video playback with loading states
 */
const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, onEnded, videoRef }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Reset state when src changes
    setIsLoading(true);
    setError(null);
  }, [src]);

  const handleCanPlay = () => {
    setIsLoading(false);
    // Ensure video plays
    if (videoRef.current) {
      videoRef.current.play().catch(err => {
        console.error("Video play error:", err);
        setError("Could not play video. Check your browser permissions.");
      });
    }
  };

  const handleError = () => {
    setIsLoading(false);
    setError(`Failed to load video: ${src}`);
  };

  return (
    <div className="w-full h-full">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="h-16 w-16 border-4 border-[#23A2DA] border-t-transparent rounded-full"
          />
        </div>
      )}
      
      {error && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-red-600 text-white p-4 rounded">{error}</div>
        </div>
      )}
      
      <video
        ref={videoRef}
        src={src}
        className="w-full h-full object-cover"
        onCanPlay={handleCanPlay}
        onEnded={onEnded}
        onError={handleError}
        autoPlay
      />
    </div>
  );
};

export default VideoPlayer;