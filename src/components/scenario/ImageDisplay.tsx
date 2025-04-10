import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ImageDisplayProps {
  src: string;
  onLoad?: () => void;
}

/**
 * @component ImageDisplay
 * @description Displays images with loading states
 */
const ImageDisplay: React.FC<ImageDisplayProps> = ({ src, onLoad }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    // Reset state when src changes
    setIsLoading(true);
    setError(null);
  }, [src]);
  
  const handleLoad = () => {
    setIsLoading(false);
    if (onLoad) onLoad();
  };
  
  const handleError = () => {
    setIsLoading(false);
    setError(`Failed to load image: ${src}`);
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
      
      <motion.img
        src={src}
        alt="Scenario scene"
        className="w-full h-full object-cover"
        onLoad={handleLoad}
        onError={handleError}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.5 }}
      />
    </div>
  );
};

export default ImageDisplay;