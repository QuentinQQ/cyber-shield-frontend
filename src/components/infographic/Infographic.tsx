import React, { useEffect } from 'react';
import { useInfographicViewModel } from '@/hooks/useInfoGraphic';
import { motion } from 'framer-motion';

/**
 * @component Infographic
 * @description
 * Interactive visualization that demonstrates cyberbullying statistics.
 * Takes user input for class size and generates a visual representation
 * of how many students might be experiencing cyberbullying.
 *
 * @returns {JSX.Element} The rendered component
 */
const Infographic: React.FC = () => {
  const {
    state,
    audioRef,
    gridRef,
    handleStudentCountChange,
    generateIcons,
    resetInfographic,
    getIconSrc,
    calculateIconSize
  } = useInfographicViewModel();
  
  const { studentCount, showCaptions, icons, isAnimating, currentStep } = state;
  
  // Calculate icon size based on student count
  const iconSize = calculateIconSize(studentCount);
  
  // Tooltip texts for different states
  const tooltipTexts = {
    normal: "It's great that you haven't experienced bullying, but it's important to be aware and supportive of others who might be going through it.",
    orange: "You may feel isolated or afraid to speak up, but you're not alone. It's important to reach out to someone you trust.",
    maroon: "Talking to your parents is a great first step in getting the support you need. They care about you and want to help."
  };
  
  // Update grid template columns when icon size changes
  useEffect(() => {
    if (gridRef.current && studentCount > 0) {
      gridRef.current.style.gridTemplateColumns = `repeat(auto-fill, minmax(${iconSize}px, 1fr))`;
    }
  }, [iconSize, studentCount]);
  
  /**
   * @function handleInputChange
   * @description Updates state when input value changes
   * @param {React.ChangeEvent<HTMLInputElement>} e - Input change event
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    handleStudentCountChange(isNaN(value) ? 0 : value);
  };
  
  /**
   * @function handleSubmit
   * @description Validates input and starts the visualization
   */
  const handleSubmit = () => {
    if (isAnimating) return;
    
    if (isNaN(studentCount) || studentCount < 10 || studentCount > 200) {
      alert("Enter a number between 10 and 200");
      return;
    }
    
    generateIcons(studentCount);
  };
  
  return (
    <div className="flex flex-col items-center justify-center space-y-6 p-8 w-full max-w-4xl mx-auto">
      <h1 className="text-center text-xl md:text-2xl font-bold">
        How many students are in your class?<br />
        (or in your year level at your school)
      </h1>
      
      <input
        className="px-4 py-3 rounded-lg border-2 border-amber-400 text-xl text-center w-32 md:w-48"
        type="number"
        min="10"
        max="200"
        placeholder="e.g. 120"
        value={studentCount || ''}
        onChange={handleInputChange}
      />
      
      <button 
        className="px-8 py-3 bg-amber-400 text-gray-800 font-bold rounded-lg hover:bg-amber-300 transition-colors disabled:opacity-70"
        onClick={handleSubmit}
        disabled={isAnimating}
      >
        {isAnimating ? 'Showing...' : 'Show'}
      </button>
      
      {/* Grid for student icons */}
      <div 
        ref={gridRef} 
        className="grid gap-1.5 justify-center w-full max-w-3xl"
      >
        {icons.map((icon) => (
          <img
            key={icon.id}
            src={getIconSrc(icon.gender, icon.state)}
            className={`transition-all duration-300 ${
              currentStep === 2 && icon.state === 'orange' && icon.gender === 'girl' 
                ? 'brightness-150 scale-110' 
                : ''
            }`}
            style={{ width: iconSize, height: iconSize }}
            title={tooltipTexts[icon.state]}
            alt={`${icon.gender} icon`}
          />
        ))}
      </div>
      
      {/* Captions */}
      {showCaptions && (
        <div className="bg-sky-500 rounded-2xl shadow-lg p-6 w-full max-w-2xl">
          <motion.div 
            className={`text-xl md:text-2xl font-bold text-center my-4 text-white ${currentStep === 1 ? 'opacity-100' : 'opacity-0'}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: currentStep === 1 ? 1 : 0, y: currentStep === 1 ? 0 : 20 }}
            transition={{ duration: 0.5 }}
          >
            30% of students have experienced cyberbullying.
          </motion.div>
          
          <motion.div 
            className={`text-xl md:text-2xl font-bold text-center my-4 text-white ${currentStep === 2 ? 'opacity-100' : 'opacity-0'}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: currentStep === 2 ? 1 : 0, y: currentStep === 2 ? 0 : 20 }}
            transition={{ duration: 0.5 }}
          >
            Girls are more likely than boys to be targeted.
          </motion.div>
          
          <motion.div 
            className={`text-xl md:text-2xl font-bold text-center my-4 text-white ${currentStep === 3 ? 'opacity-100' : 'opacity-0'}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: currentStep === 3 ? 1 : 0, y: currentStep === 3 ? 0 : 20 }}
            transition={{ duration: 0.5 }}
          >
            Only one in five who face cyberbullying share their pain with their parents.
          </motion.div>
          
          <motion.div 
            className={`text-xl md:text-2xl font-bold text-center my-4 text-white ${currentStep === 4 ? 'opacity-100' : 'opacity-0'}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: currentStep === 4 ? 1 : 0, y: currentStep === 4 ? 0 : 20 }}
            transition={{ duration: 0.5 }}
          >
            You don't have to face this alone - reach out for support.
          </motion.div>
          
          <motion.div 
            className={`text-xl md:text-2xl font-bold text-center my-4 text-white ${currentStep === 5 ? 'opacity-100' : 'opacity-0'}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: currentStep === 5 ? 1 : 0, y: currentStep === 5 ? 0 : 20 }}
            transition={{ duration: 0.5 }}
          >
            Talk to an adult, and together we can stop it!
          </motion.div>
        </div>
      )}
      
      {/* Audio file for pop sound */}
      <audio 
        ref={audioRef}
        src="/sounds/95265__department64__tree_pop.wav"
        preload="auto"
      />
      
      {/* Reset button - shown after animation completes */}
      {!isAnimating && showCaptions && (
        <button 
          className="px-8 py-3 bg-amber-400 text-gray-800 font-bold rounded-lg hover:bg-amber-300 transition-colors"
          onClick={resetInfographic}
        >
          Try Again
        </button>
      )}
    </div>
  );
};

export default Infographic;