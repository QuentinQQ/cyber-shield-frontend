import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface VideoPlayerProps {
  src: string;
  onEnded: () => void;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  skipPlayback?: boolean;
}

/**
 * @component VideoPlayer
 * @description Handles video playback with loading states
 */
const VideoPlayer: React.FC<VideoPlayerProps> = ({ 
  src, 
  onEnded, 
  videoRef,
  skipPlayback = false
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [videoStarted, setVideoStarted] = useState(false);

  useEffect(() => {
    // Reset state when src changes
    setIsLoading(false);
    setError(null);
    setVideoStarted(false);
    
    // If skipPlayback is true, immediately trigger onEnded
    if (skipPlayback) {
      onEnded();
    }
  }, [src, skipPlayback, onEnded]);

  const handleCanPlay = () => {
    // If skipPlayback, we shouldn't play the video at all
    if (skipPlayback) return;
    
    setIsLoading(false);
    // Ensure video plays
    if (videoRef.current) {
      videoRef.current.play().catch(err => {
        console.error("Video play error:", err);
        setError("Could not play video. Check your browser permissions.");
      });
    }
  };

  const handlePlay = () => {
    setIsLoading(false);
    setVideoStarted(true);
  };

  const handleTimeUpdate = () => {
    if (!videoStarted && videoRef.current && videoRef.current.currentTime > 0) {
      setIsLoading(false);
      setVideoStarted(true);
    }
  };

  const handleError = () => {
    setIsLoading(false);
    setError(`Failed to load video: ${src}`);
  };

  // If skipPlayback is true, don't render the video at all
  if (skipPlayback) {
    return null;
  }

  return (
    <div className="w-full h-full">
      {isLoading && !videoStarted && (
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
        onPlay={handlePlay}
        onTimeUpdate={handleTimeUpdate}
        onEnded={onEnded}
        onError={handleError}
        autoPlay
        playsInline
      />
    </div>
  );
};

export default VideoPlayer;