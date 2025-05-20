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
    <PageWrapper className="min-h-screen overflow-hidden relative">
      {/* Enhanced starry background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f2e68] via-[#1e3a8a] to-[#312e81] z-0">
        {/* Star field - static stars */}
        <div className="stars-container">
          {Array.from({ length: 100 }).map((_, i) => {
            const size = Math.random() * 3 + 1;
            const left = Math.random() * 100;
            const top = Math.random() * 100;
            const delay = Math.random() * 5;
            const duration = Math.random() * 3 + 2;
            
            return (
              <div 
                key={`star-${i}`}
                className="star"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  left: `${left}%`,
                  top: `${top}%`,
                  animationDelay: `${delay}s`,
                  animationDuration: `${duration}s`
                }}
              />
            );
          })}
        </div>
        
        {/* Shooting stars */}
        <div className="shooting-stars-container">
          {Array.from({ length: 5 }).map((_, i) => {
            const top = Math.random() * 50;
            const left = Math.random() * 90;
            const delay = Math.random() * 15 + (i * 3);
            
            return (
              <div 
                key={`shooting-star-${i}`}
                className="shooting-star"
                style={{
                  top: `${top}%`,
                  left: `${left}%`,
                  animationDelay: `${delay}s`
                }}
              />
            );
          })}
        </div>
        
        {/* Glowing nebulas */}
        <div
          className="absolute opacity-20 rounded-full blur-3xl"
          style={{
            width: '40%',
            height: '40%',
            background: 'radial-gradient(circle, rgba(56, 189, 248, 0.4) 0%, rgba(0, 0, 0, 0) 70%)',
            top: '10%',
            right: '5%',
            animation: 'nebula-pulse 8s infinite alternate ease-in-out'
          }}
        />
        <div
          className="absolute opacity-20 rounded-full blur-3xl"
          style={{
            width: '30%',
            height: '30%',
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, rgba(0, 0, 0, 0) 70%)',
            bottom: '10%',
            left: '5%',
            animation: 'nebula-pulse 7s infinite alternate-reverse ease-in-out'
          }}
        />
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

        {/* Speech bubble - RESTORED TO ORIGINAL */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="absolute left-[5rem] bottom-[30rem] text-black text-lg font-medium z-20"
          style={{
            position: "absolute",
            padding: "1em",
            width: "15em",
            minHeight: "4em",
            borderRadius: "0.25em",
            transform: "rotate(-4deg) rotateY(15deg)",
            background: "#629bdd",
            fontFamily: "Century Gothic, Verdana, sans-serif",
            fontSize: "1.3rem",
            textAlign: "center"
          }}
        >
          <div
            style={{
              position: "absolute",
              zIndex: -1,
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              borderRadius: "0.25em",
              transform: "rotate(2deg) translate(.35em, -.15em) scale(1.02)",
              background: "#f4fbfe"
            }}
          />
          <div
            style={{
              position: "absolute",
              zIndex: -1,
              border: "solid 0 transparent",
              borderRight: "solid 3.5em #f4fbfe",
              borderBottom: "solid .25em #629bdd",
              bottom: ".25em",
              left: "1.25em",
              width: 0,
              height: "1em",
              transform: "rotate(45deg) skewX(75deg)"
            }}
          />
          Your privacy is important to us! Here's our policy.
        </motion.div>
      </motion.div>

      <div className="container mx-auto px-4 max-w-3xl pt-16 relative z-10">
        {/* Animated header */}
        <motion.h1 
          className="text-4xl font-bold mb-8 text-center text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {policyContent.title}
        </motion.h1>

        {/* Summary section */}
        <motion.div
          className="bg-white/10 backdrop-blur-md rounded-lg p-6 mb-8 border border-white/20 shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="text-lg text-white">{policyContent.summary}</p>
        </motion.div>

        {/* Detailed sections */}
        <motion.div
          className="bg-white/10 backdrop-blur-md rounded-lg p-6 mb-8 border border-white/20 shadow-xl"
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
                <span className="text-white">{detail}</span>
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

      {/* CSS for stars and animations */}
      <style>{`
        .stars-container {
          position: absolute;
          width: 100%;
          height: 100%;
          overflow: hidden;
          z-index: 1;
        }
        
        .star {
          position: absolute;
          background-color: white;
          border-radius: 50%;
          opacity: 0.7;
          animation: twinkle ease-in-out infinite;
        }
        
        @keyframes twinkle {
          0%, 100% { 
            opacity: 0.2;
            transform: scale(0.8);
          }
          50% { 
            opacity: 1;
            transform: scale(1.2);
          }
        }
        
        .shooting-stars-container {
          position: absolute;
          width: 100%;
          height: 100%;
          overflow: hidden;
          z-index: 1;
        }
        
        .shooting-star {
          position: absolute;
          width: 80px;
          height: 1px;
          background: linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,1));
          transform: rotate(-45deg);
          animation: shooting-star 6s linear infinite;
          opacity: 0;
        }
        
        @keyframes shooting-star {
          0% {
            transform: rotate(-45deg) translateX(0);
            opacity: 0;
          }
          5% {
            opacity: 1;
          }
          20% {
            transform: rotate(-45deg) translateX(100px);
            opacity: 0;
          }
          100% {
            transform: rotate(-45deg) translateX(100px);
            opacity: 0;
          }
        }
        
        @keyframes nebula-pulse {
          0% {
            opacity: 0.15;
            transform: scale(1);
          }
          100% {
            opacity: 0.25;
            transform: scale(1.2);
          }
        }
      `}</style>
    </PageWrapper>
  );
};

export default PrivacyPolicyPage;