import { RefObject } from 'react';

export interface IconData {
  id: string;
  gender: 'boy' | 'girl';
  state: 'normal' | 'orange' | 'maroon';
  highlighted?: boolean;
}

export interface InfographicState {
  studentCount: number;
  showCaptions: boolean;
  icons: IconData[];
  isAnimating: boolean;
  currentStep: number;
}

export interface InfographicViewModel {
  state: InfographicState;
  audioRef: RefObject<HTMLAudioElement>;
  gridRef: RefObject<HTMLDivElement>;
  handleStudentCountChange: (count: number) => void;
  generateIcons: (count: number) => void;
  resetInfographic: () => void;
  getIconSrc: (gender: 'boy' | 'girl', state: 'normal' | 'orange' | 'maroon') => string;
  calculateIconSize: (count: number) => number;
}