// PrimaryButton.tsx
import React from 'react'
import { cn } from '@/lib/utils'
import { motion } from "framer-motion";

interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'cta' | 'ghost'
  rotate?: boolean
}

// Define animation variants
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

// Map the variant names to classes
const variantClasses: Record<NonNullable<PrimaryButtonProps['variant']>, string> = {
  default: 'bg-[#C2E764] text-black',
  cta: 'bg-[#C2E764] text-black text-xl px-8 py-4',
  ghost: 'bg-indigo-900/50 text-white border-2 border-indigo-400 backdrop-blur-sm',
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  children,
  className,
  variant = 'default',
  rotate = false,
  ...props
}) => {
  return (
    <div className="relative">
      {/* Shadow beneath the button */}
      <motion.div 
        className="absolute w-full h-4 bg-black/20 rounded-full blur-md bottom-0 left-0"
        animate={{
          width: ['90%', '60%', '90%'],
          x: ['5%', '20%', '5%']
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      <motion.button
        className={cn(
          // Base styles
          'relative font-bold rounded-full px-8 py-4 shadow-lg z-10',
          // Variant styles
          variantClasses[variant],
          // Rotation if enabled
          rotate && '-rotate-6 hover:rotate-0',
          // Add any custom classes
          className
        )}
        // Basic button animations
        variants={buttonVariants}
        initial="initial"
        whileHover="hover"
        whileTap="tap"
        // Add a bouncing animation for all buttons
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
        {...(props as React.ComponentProps<typeof motion.button>)}
      >
        {children}
        
        {/* Ring orbits (only for non-ghost buttons) */}
        {variant !== 'ghost' && (
          <>
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
          </>
        )}
      </motion.button>
    </div>
  )
}

export default PrimaryButton