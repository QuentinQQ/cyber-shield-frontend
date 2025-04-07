import React from 'react';
import PrimaryButton from '../PrimaryButton';

/**
 * @component EmptyResultScreen
 * @description
 * Shown when user finishes game without answering any question.
 *
 * @param {() => void} props.onRestart - Restart callback
 */
const EmptyResultScreen: React.FC<{
  onRestart: () => void;
}> = ({ onRestart }) => {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] space-y-6 text-white text-center">
      <h2 className="text-2xl font-bold">You did not answer any question.</h2>
      <p className="text-lg">Would you like to try again?</p>
      <div className="flex gap-4">
        <PrimaryButton
          variant="cta"
          onClick={onRestart}
          className="px-6 py-2 bg-white text-cyan-700 rounded-lg font-semibold hover:bg-gray-100 transition"
        >
          Try Again
        </PrimaryButton>
        <PrimaryButton
          variant="default"
          onClick={() => window.history.back()}
          className="px-6 py-2 border border-white text-white rounded-lg font-semibold hover:bg-white hover:text-cyan-700 transition"
        >
          Back
        </PrimaryButton>
      </div>
    </div>
  );
};

export default EmptyResultScreen;
