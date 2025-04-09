import React, { useEffect, useState } from 'react';
import ClockImg from '@/assets/cleanFeed/clock.svg';

/**
 * @component Timer
 * @description
 * Countdown timer component that shows seconds left. Counts down from the specified
 * `duration` in seconds and updates every second until it reaches 0.
 *
 * @param {Object} props - Component props
 * @param {number} props.duration - Duration in seconds to count down from
 *
 * @returns {JSX.Element} A live-updating timer text
 */
const Timer: React.FC<{ duration: number }> = ({ duration }) => {
  const [seconds, setSeconds] = useState(duration);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => Math.max(prev - 1, 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="text-center text-2xl font-bold flex items-center justify-center gap-2">
      <img src={ClockImg} alt="Clock Icon" className="w-16 h-16" />
      Time Left: {seconds}s
    </div>
  );  
};

export default Timer;
