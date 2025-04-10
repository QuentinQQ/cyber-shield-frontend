import { RefObject } from 'react';

/**
 * @interface IconData
 * @description Represents a student icon in the infographic
 */
export interface IconData {
  id: string;
  gender: 'boy' | 'girl';
  state: 'normal' | 'orange' | 'maroon';
}

/**
 * @interface CaptionStep
 * @description Represents a caption step in the infographic animation
 */
export interface CaptionStep {
  id: number;
  text: string;
  colorClass: string;
  delay: number;
}

/**
 * @interface InfographicState
 * @description State for the infographic component
 */
export interface InfographicState {
  studentCount: number;
  showCaptions: boolean;
  icons: IconData[];
  isAnimating: boolean;
  currentStep: number;
}

/**
 * @interface InfographicViewModel
 * @description View model interface for the infographic component
 */
export interface InfographicViewModel {
  state: InfographicState;
  audioRef: RefObject<HTMLAudioElement | null>;
  gridRef: RefObject<HTMLDivElement | null>;
  handleStudentCountChange: (count: number) => void;
  generateIcons: (count: number) => void;
  resetInfographic: () => void;
  getIconSrc: (gender: 'boy' | 'girl', state: 'normal' | 'orange' | 'maroon') => string;
  calculateIconSize: (count: number) => number;
}

/**
 * @type TooltipTexts
 * @description Tooltip text mapping for different icon states
 */
export type TooltipTexts = {
  [key in 'normal' | 'orange' | 'maroon']: string;
};