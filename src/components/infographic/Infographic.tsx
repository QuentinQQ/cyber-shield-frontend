import React, { useEffect, useState, KeyboardEvent } from 'react';
import { useInfographicViewModel } from '@/hooks/useInfoGraphic';
import './Infographic.css';

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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  // Calculate icon size based on student count
  const iconSize = calculateIconSize(studentCount);

  // Total number of steps in the animation
  const totalSteps = 5;
  
  // Check if all animations have completed
  const allStepsCompleted = showCaptions && currentStep >= totalSteps;

  const tooltipTexts = {
    normal: "It's great that you haven't experienced bullying, but it's important to be aware and supportive of others who might be going through it.",
    orange: "You may feel isolated or afraid to speak up, but you're not alone. It's important to reach out to someone you trust.",
    maroon: "Talking to your parents is a great first step in getting the support you need. They care about you and want to help."
  };

  useEffect(() => {
    if (gridRef.current && studentCount > 0) {
      gridRef.current.style.gridTemplateColumns = `repeat(auto-fill, minmax(${iconSize}px, 1fr))`;
    }
  }, [iconSize, studentCount]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    handleStudentCountChange(isNaN(value) ? 0 : value);
  };

  // Handle Enter key press
  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    if (isAnimating) return;

    if (isNaN(studentCount) || studentCount < 10 || studentCount > 200) {
      alert("Enter a number between 10 and 200");
      return;
    }

    setIsButtonClicked(true);
    generateIcons(studentCount);
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-6 p-8 w-full max-w-4xl mx-auto">
      <h1 className="text-center text-2xl md:text-3xl font-bold text-white">
        How many students are in your class?<br />
        (Or in your year level at your school)
      </h1>

      {/* Input area with Enter key support */}
      <div className="flex flex-col items-center">
        <div className="relative">
          <input
            className="px-6 py-3 text-2xl text-center w-40 rounded-full bg-[#AEEEEE] shadow-lg focus:outline-none focus:ring-4 focus:ring-yellow-300 border-4 border-yellow-400"
            type="number"
            min="10"
            max="200"
            placeholder="?"
            value={studentCount || ''}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            disabled={isAnimating}
          />
          <div className="absolute right-6 top-1/2 transform -translate-y-1/2 text-3xl animate-bounce">
            🎓
          </div>
        </div>
        
        <p className="text-white mt-2 text-sm">(Between 10-200)</p>
        
        {/* Show Blast Off button when not animating */}
        {!isAnimating && (
          <button
            className="mt-4 px-8 py-3 bg-[#F4A261] text-gray-800 text-lg font-bold rounded-full shadow-lg hover:scale-105 transition-all"
            onClick={handleSubmit}
          >
            <span>🚀 Blast Off!</span>
          </button>
        )}
      </div>

      <div ref={gridRef} className="grid gap-1.5 justify-center w-full max-w-3xl">
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

      <audio ref={audioRef} src="/quizPage/95265__department64__tree_pop.wav" preload="auto" />

      {/* Try Again button only shown when all animation steps are completed */}
      {allStepsCompleted && (
        <button
          className="mt-6 px-8 py-3 bg-[#F4A261] text-gray-800 font-bold rounded-full hover:shadow-lg transition-all hover:scale-105"
          onClick={resetInfographic}
          disabled={isAnimating}
        >
          Try Again! 🔄
        </button>
      )}
    </div>
  );
};

export default Infographic;