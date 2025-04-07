import React from 'react';
import { GameResult } from '../../types/types';

/**
 * @component ResultScreen
 * @description
 * Displays the final result of the game, including:
 * - percentage of correct answers
 * - score
 * - comparison to other players
 * - total answered and correct answers
 *
 * Typically shown when the game ends.
 *
 * @param {Object} props - Component props
 * @param {GameResult} props.result - The result object returned after game submission
 *
 * @returns {JSX.Element} Rendered result screen
 */
const ResultScreen: React.FC<{ result: GameResult }> = ({ result }) => (
  <div className="flex flex-col items-center justify-center h-[80vh] text-center space-y-6">
    <h2 className="text-3xl font-bold">Game Over!</h2>
    <p className="text-lg">You answered {result.percent} of the questions correctly.</p>
    <p>Your score is <strong>{result.score}</strong>.</p>
    <p>You performed better than <strong>{result.comparison}</strong> of players.</p>
    <p>Total Answered: {result.answered}, Correct: {result.answered_cor}</p>
  </div>
);

export default ResultScreen;
