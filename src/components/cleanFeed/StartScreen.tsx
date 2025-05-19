/* eslint-disable no-irregular-whitespace */
import React, { JSX } from "react";
import PrimaryButton from "@/components/PrimaryButton";

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
const StartScreen: React.FC<{ onStart: () => void }> = ({
  onStart,
}: {
  onStart: () => void;
}): JSX.Element => (
  <div className="flex flex-col items-center justify-center h-[80vh] text-center space-y-6">
    <h1 className="text-4xl font-bold">Ready to Clean the Feed?</h1>
    <p className="text-lg">
      You have 15 SECONDS to like or dislike as many comments as you can!
    </p>
    <PrimaryButton variant="cta" onClick={onStart} rotate>
      Let's Start!
    </PrimaryButton>
  </div>
);

export default StartScreen;
