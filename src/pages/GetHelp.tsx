import React from 'react';
import { motion } from 'framer-motion';
import { usePrivacyPolicyViewModel } from '../viewmodels/PrivacyPolicyViewModel';
import PageWrapper from '@/components/PageWrapper';
import { cn } from '@/lib/utils'; // Make sure this import exists

/**
 * PrivacyPolicyPage Component
 * 
 * Displays the privacy policy information following MVVM architecture.
 * The view connects to the ViewModel via the usePrivacyPolicyViewModel hook.
 * 
 * @returns {JSX.Element} The rendered privacy policy page
 */
const PrivacyPolicyPage: React.FC = () => {
  // Connect to ViewModel through the custom hook
  const { policyContent, downloadPolicyPDF } = usePrivacyPolicyViewModel();

  // Button variants for PrimaryButton styling
  const buttonVariants = {
    initial: {
      scale: 1,
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.3 }
    },
    tap: {
      scale: 0.95,
      transition: { duration: 0.1 }
    }
  };

  return (
    <PageWrapper className="min-h-screen text-white py-10 overflow-hidden relative bg-blue-900">
      {/* Starry background - only adding this */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {Array.from({ length: 100 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.6 + 0.4,
              animation: `twinkle ${Math.random() * 3 + 2}s ease-in-out ${Math.random() * 3}s infinite alternate`
            }}
          />
        ))}
      </div>

      {/* Added Security Character */}
      <motion.div 
        className="absolute left-0 top-1/2 transform -translate-y-1/2 -ml-8 z-30"
        initial={{ x: -200 }}
        animate={{ x: 0 }}
        transition={{ 
          type: "spring", 
          damping: 20, 
          stiffness: 100,
          delay: 0.5 
        }}
      >
        <img 
          src="/security-char.gif" 
          alt="Security Character" 
          className="w-140 h-auto"
        />

        {/* Blue speech bubble with sharp point like in the image */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="absolute left-[5rem] bottom-[30rem] z-20"
          style={{
            position: "absolute",
            zIndex: 20
          }}
        >
          <div className="blue-speech-bubble relative">
            <div className="text-black text-2xl font-medium text-center p-8">
              Your privacy is important to us! Here's our policy.
            </div>
          </div>
        </motion.div>
      </motion.div>

      <div className="container mx-auto px-4 max-w-3xl pt-16 relative z-10">
        {/* Animated header */}
        <motion.h1 
          className="text-4xl font-bold mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {policyContent.title}
        </motion.h1>

        {/* Summary section */}
        <motion.div
          className="bg-white/10 backdrop-blur-md rounded-lg p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="text-lg">{policyContent.summary}</p>
        </motion.div>

        {/* Detailed sections */}
        <motion.div
          className="bg-white/10 backdrop-blur-md rounded-lg p-6 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <ul className="space-y-4">
            {policyContent.details.map((detail, index) => (
              <motion.li 
                key={index}
                className="flex items-start"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
              >
                <span className="mr-2 text-cyan-400">&bull;</span>
                <span>{detail}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Download button - Updated to match your PrimaryButton style */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <motion.button
            onClick={downloadPolicyPDF}
            className={cn(
              // Base styles
              'relative font-bold rounded-full px-8 py-4 shadow-lg z-10',
              // Color styles
              'bg-[#C2E764] text-black -rotate-3 hover:rotate-0',
            )}
            // Button animations
            variants={buttonVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            // Add a bouncing animation
            animate={{
              y: [0, -8, 0],
            }}
            transition={{
              y: {
                duration: 1.2,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
          >
            <svg className="h-5 w-5 mr-2 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download Full Policy (PDF)
            
            {/* Ring orbits */}
            <motion.div
              className="absolute inset-0 border-2 border-black/10 rounded-full"
              animate={{ scale: [1, 1.1, 1], opacity: [0.7, 0.5, 0.7] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <motion.div
              className="absolute inset-0 border-2 border-black/5 rounded-full"
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.3, 0.5] }}
              transition={{ duration: 3, delay: 0.2, repeat: Infinity }}
            />
          </motion.button>
        </motion.div>

        {/* Footer note */}
        <motion.p 
          className="text-center mt-12 text-sm text-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          Last updated: {new Date().toLocaleDateString()}
        </motion.p>
      </div>

      {/* Styles for blue speech bubble and stars */}
      <style>{`
        @keyframes twinkle {
          0% {
            opacity: 0.3;
            transform: scale(0.8);
          }
          100% {
            opacity: 1;
            transform: scale(1.2);
          }
        }
        
        /* Blue speech bubble like in the image */
        .blue-speech-bubble {
          position: relative;
          background:rgb(255, 255, 255);
          border-radius: 20px;
          width: 400px;
          min-height: 100px;
          box-shadow: 0 5px 15px rgba(19, 12, 61, 0.2);
        }
        
        .blue-speech-bubble:after {
          content: '';
          position: absolute;
          top: 100%;
          left: 50px;
          width: 0;
          height: 0;
          border-top: 40px solidrgb(255, 255, 255);
          border-right: 40px solid transparent;
          margin-left: -20px;
          transform: rotate(20deg) skew(5deg);
        }
      `}</style>
    </PageWrapper>
  );
};

export default PrivacyPolicyPage;