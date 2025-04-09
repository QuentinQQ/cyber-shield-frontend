import { useState, useRef } from 'react';
import { IconData, InfographicState, InfographicViewModel } from '../types/infographic.types';
import { v4 as uuidv4 } from 'uuid';

/**
 * @function useInfographicViewModel
 * @description
 * ViewModel for the Infographic component following MVVM pattern.
 * Handles all business logic and data processing for the infographic visualization.
 *
 * @returns {InfographicViewModel} State and methods for the infographic component
 */
export const useInfographicViewModel = (): InfographicViewModel => {
  // Main state for the infographic
  const [state, setState] = useState<InfographicState>({
    studentCount: 0,
    showCaptions: false,
    icons: [],
    isAnimating: false,
    currentStep: 0,
  });

  // References with correct typing to match the InfographicViewModel interface
  const audioRef = useRef<HTMLAudioElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  
  // // Constants
  // const tooltipTexts: TooltipTexts = {
  //   normal: "It's great that you haven't experienced bullying, but it's important to be aware and supportive of others who might be going through it.",
  //   orange: "You may feel isolated or afraid to speak up, but you're not alone. It's important to reach out to someone you trust.",
  //   maroon: "Talking to your parents is a great first step in getting the support you need. They care about you and want to help."
  // };

  /**
   * @function sleep
   * @description Creates a promise that resolves after a specified delay
   * @param {number} ms - Milliseconds to delay
   * @returns {Promise<void>}
   */
  const sleep = (ms: number): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, ms));
  };

  /**
   * @function createIconData
   * @description Creates icon data object with specified properties
   * @param {string} gender - Gender of the icon ('boy' or 'girl')
   * @param {'normal' | 'orange' | 'maroon'} state - Visual state of the icon
   * @returns {IconData} Created icon data
   */
  const createIconData = (gender: 'boy' | 'girl', state: 'normal' | 'orange' | 'maroon' = 'normal'): IconData => {
    return {
      id: uuidv4(),
      gender,
      state,
    };
  };

  /**
   * @function handleStudentCountChange
   * @description Updates the student count in the state
   * @param {number} count - New student count value
   */
  const handleStudentCountChange = (count: number): void => {
    setState(prev => ({
      ...prev,
      studentCount: count
    }));
  };

  /**
   * @function calculateIconSize
   * @description Calculates the optimal icon size based on student count
   * @param {number} count - Number of students
   * @returns {number} Icon size in pixels
   */
  const calculateIconSize = (count: number): number => {
    return Math.max(24, 60 - (count - 10) * 0.2);
  };

  /**
   * @function generateIcons
   * @description Generates the initial set of icons based on student count
   * @param {number} count - Number of students to generate
   */
  const generateIcons = (count: number): void => {
    if (isNaN(count) || count < 10 || count > 200) {
      alert("Enter a number between 10 and 200");
      return;
    }

    // Generate icons (half boys, half girls)
    const newIcons: IconData[] = [];
    for (let i = 0; i < count; i++) {
      const gender = Math.random() < 0.5 ? 'boy' : 'girl';
      newIcons.push(createIconData(gender));
    }

    setState(prev => ({
      ...prev,
      studentCount: count,
      showCaptions: true,
      icons: newIcons,
      isAnimating: true,
      currentStep: 0
    }));

    // Start the animation sequence
    animateInfographic(newIcons, count);
  };

  /**
   * @function animateInfographic
   * @description Main animation sequence that updates icons and shows captions
   * @param {IconData[]} initialIcons - Initial set of icons
   * @param {number} count - Total number of students
   */
  const animateInfographic = async (initialIcons: IconData[], count: number): Promise<void> => {
    // Copy the icons array so we can modify it
    let icons = [...initialIcons];
    
    // Step 1: Identify victims (30%): 60% girls, 40% boys
    const bulliedCount = Math.ceil(count * 0.3);
    const numGirls = Math.round(bulliedCount * 0.6);
    const numBoys = bulliedCount - numGirls;

    // Separate icons by gender
    let girls = icons.filter(p => p.gender === 'girl');
    let boys = icons.filter(p => p.gender === 'boy');
    let bullied: IconData[] = [];

    // Randomly select victims
    let selectedGirls = 0;
    let selectedBoys = 0;

    while (bullied.length < bulliedCount) {
      // Determine whether to choose a girl or boy next
      let chooseGirl = Math.random() < 0.6; // 60% chance
      
      // Adjust based on remaining quota
      if (selectedGirls >= numGirls) chooseGirl = false;
      if (selectedBoys >= numBoys) chooseGirl = true;

      // Select from appropriate array
      let arr = chooseGirl ? girls : boys;
      if (arr.length === 0) {
        arr = arr === girls ? boys : girls;
      }

      const idx = Math.floor(Math.random() * arr.length);
      bullied.push({...arr[idx], state: 'orange'});
      
      // Update counters
      if (chooseGirl) selectedGirls++;
      else selectedBoys++;
      
      // Remove selected icon from available pool
      if (chooseGirl) {
        girls = girls.filter((_, i) => i !== idx);
      } else {
        boys = boys.filter((_, i) => i !== idx);
      }
    }

    // Update icons with victims
    for (let i = 0; i < bullied.length; i++) {
      await sleep(100 + Math.random() * 100);
      
      // Find the index of this icon in the overall array
      const targetIdx = icons.findIndex(icon => 
        icon.gender === bullied[i].gender && icon.state === 'normal');
      
      if (targetIdx !== -1) {
        // Update the icon state to 'orange'
        const updatedIcons = [...icons];
        updatedIcons[targetIdx] = {...updatedIcons[targetIdx], state: 'orange'};
        
        // Play sound
        if (audioRef.current) {
          audioRef.current.currentTime = 0;
          audioRef.current.volume = 1;
          await audioRef.current.play().catch(e => console.error("Audio play error:", e));
        }
        
        // Update state
        setState(prev => ({
          ...prev,
          icons: updatedIcons,
          currentStep: 1
        }));
        
        icons = updatedIcons;
      }
    }

    // Wait for first caption to be read
    await sleep(2000);
    
    // Highlight girls among victims
    setState(prev => ({
      ...prev,
      currentStep: 2
    }));

    await sleep(3000);
    
    // Step 2: Highlight those who disclosed (20% of victims)
    const disclosedCount = Math.max(1, Math.round(bulliedCount * 0.2));
    const orangeIndices = icons
      .map((icon, index) => icon.state === 'orange' ? index : -1)
      .filter(index => index !== -1)
      .slice(0, disclosedCount);
    
    setState(prev => ({
      ...prev,
      currentStep: 3
    }));

    // Update disclosed victims to maroon
    for (let i = 0; i < orangeIndices.length; i++) {
      await sleep(100 + Math.random() * 100);
      
      const idx = orangeIndices[i];
      const updatedIcons = [...icons];
      updatedIcons[idx] = {...updatedIcons[idx], state: 'maroon'};
      
      // Play sound
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        await audioRef.current.play().catch(e => console.error("Audio play error:", e));
      }
      
      // Update state
      setState(prev => ({
        ...prev,
        icons: updatedIcons
      }));
      
      icons = updatedIcons;
    }
    
    // Final captions
    await sleep(4000);
    setState(prev => ({ ...prev, currentStep: 4 }));
    
    await sleep(3000);
    setState(prev => ({ ...prev, currentStep: 5 }));
    
    await sleep(3000);
    setState(prev => ({ ...prev, isAnimating: false }));
  };

  /**
   * @function getIconSrc
   * @description Gets the image source for an icon based on gender and state
   * @param {string} gender - Gender of the icon ('boy' or 'girl')
   * @param {string} state - Visual state of the icon
   * @returns {string} Path to the icon image
   */
  const getIconSrc = (gender: 'boy' | 'girl', state: 'normal' | 'orange' | 'maroon') => {
    const basePath = '/public/quizPage';
  
    if (gender === 'boy') {
      if (state === 'normal') return `${basePath}/boy.svg`;
      if (state === 'orange') return `${basePath}/boy_orange.svg`;
      if (state === 'maroon') return `${basePath}/boy_maroon.svg`;
    } else {
      if (state === 'normal') return `${basePath}/girl.svg`;
      if (state === 'orange') return `${basePath}/girl_orange.svg`;
      if (state === 'maroon') return `${basePath}/girl_maroon.svg`;
    }
  
    return '';
  };
  
  

  /**
   * @function resetInfographic
   * @description Resets the infographic to its initial state
   */
  const resetInfographic = (): void => {
    setState({
      studentCount: 0,
      showCaptions: false,
      icons: [],
      isAnimating: false,
      currentStep: 0,
    });
  };

  return {
    state,
    audioRef,
    gridRef,
    handleStudentCountChange,
    generateIcons,
    resetInfographic,
    getIconSrc,
    calculateIconSize,
  };
};