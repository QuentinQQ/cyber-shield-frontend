import React, { useEffect } from 'react';
import { useInfographicViewModel } from '@/hooks/useInfoGraphic';
import './Infographic.css';

/**
 * Interactive visualization demonstrating cyberbullying statistics.
 * Takes user input for class size and generates a visual representation
 * of how many students might be experiencing cyberbullying.
 * 
 * @component
 * @example
 * <Infographic />
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
  
  // Tooltip texts for different icon states
  const tooltipTexts = {
    normal: "It's great that you haven't experienced bullying, but it's important to be aware and supportive of others who might be going through it.",
    orange: "You may feel isolated or afraid to speak up, but you're not alone. It's important to reach out to someone you trust.",
    maroon: "Talking to your parents is a great first step in getting the support you need. They care about you and want to help."
  };
  
  /**
   * Updates grid layout when student count changes
   * 
   * @effect
   * @dependency {number} iconSize - Current calculated icon size
   * @dependency {number} studentCount - Number of students entered by user
   */
  useEffect(() => {
    if (gridRef.current && studentCount > 0) {
      gridRef.current.style.gridTemplateColumns = `repeat(auto-fill, minmax(${iconSize}px, 1fr))`;
    }
  }, [iconSize, studentCount]);
  
  /**
   * Updates state when input value changes
   * 
   * @param {React.ChangeEvent<HTMLInputElement>} e - Input change event
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    handleStudentCountChange(isNaN(value) ? 0 : value);
  };
  
  /**
   * Validates user input and starts the visualization sequence
   * Shows an alert if value is outside valid range (10-200)
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
      <h1 className="text-center text-2xl md:text-3xl font-bold text-white">
        How many students are in your class?<br />
        (Or in your year level at your school)
      </h1>
      
      <input
        className="px-4 py-3 rounded-2xl bg-[#D1E8FF] text-xl text-center w-32 shadow-md"
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
              icon.highlighted ? 'brightness-120 scale-105' : ''
            }`}
            style={{ width: iconSize, height: iconSize }}
            title={tooltipTexts[icon.state]}
            alt={`${icon.gender} icon`}
          />
        ))}
      </div>
      
      {/* Animated caption container */}
      {showCaptions && (
        <div className="bg-[#1DA9E0] rounded-2xl shadow-lg p-6 w-full max-w-[600px]">
          <div className={`caption ${currentStep === 1 ? 'show orange' : 'hide'}`}>
            30% of students have experienced cyberbullying.
          </div>
          
          <div className={`caption ${currentStep === 2 ? 'show orange' : 'hide'}`}>
            Girls are more likely than boys to be targeted.
          </div>
          
          <div className={`caption ${currentStep === 3 ? 'show maroon' : 'hide'}`}>
            Only one in five who face cyberbullying share their pain with their parents.
          </div>
          
          <div className={`caption ${currentStep === 4 ? 'show green' : 'hide'}`}>
            You don't have to face this alone - reach out for support.
          </div>
          
          <div className={`caption ${currentStep === 5 ? 'show blue' : 'hide'}`}>
            Talk to an adult, and together we can stop it!
          </div>
        </div>
      )}
      
      {/* Sound effect for icon transitions */}
      <audio 
        ref={audioRef}
        src="/quizPage/95265__department64__tree_pop.wav"
        preload="auto"
      />
      
      {/* Reset button appears after animation completes */}
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