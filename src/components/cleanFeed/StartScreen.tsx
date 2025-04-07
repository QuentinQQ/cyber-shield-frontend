import React from 'react';
import PrimaryButton from '@/components/PrimaryButton';

/**
 * @component StartScreen
 * @description
 * The entry screen shown before the game starts. Displays introductory text
 * and a call-to-action button to begin the game.
 *
 * @param {Object} props - Component props
 * @param {() => void} props.onStart - Callback to initiate the game when user clicks the button
 *
 * @returns {JSX.Element} Rendered start screen
 */
const StartScreen: React.FC<{ onStart: () => void }> = ({ onStart }) => (
  <div className="flex flex-col items-center justify-center h-[80vh] text-center space-y-6">
    <h1 className="text-4xl font-bold">Ready to Clean the Feed?</h1>
    <p className="text-lg">You have 1 minute to like or dislike as many comments as you can!</p>
    <PrimaryButton
      variant="cta"
      onClick={onStart}
      rotate
      className="bg-[#E76F50] text-cyan-700 px-6 py-3 rounded-xl text-lg font-semibold hover:bg-gray-200 transition"
    >
      Let's Start a Game
    </PrimaryButton>
  </div>
);

export default StartScreen;
