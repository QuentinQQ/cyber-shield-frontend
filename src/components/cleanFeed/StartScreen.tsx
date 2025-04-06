import React from 'react';

const StartScreen: React.FC<{ onStart: () => void }> = ({ onStart }) => (
  <div className="flex flex-col items-center justify-center h-[80vh] text-center space-y-6">
    <h1 className="text-4xl font-bold">Ready to Clean the Feed?</h1>
    <p className="text-lg">You have 1 minute to like or dislike as many comments as you can!</p>
    <button
      onClick={onStart}
      className="bg-white text-cyan-700 px-6 py-3 rounded-xl text-lg font-semibold hover:bg-gray-200 transition"
    >
      Let's Start a Game
    </button>
  </div>
);

export default StartScreen;
