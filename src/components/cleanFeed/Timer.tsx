import React, { useEffect, useState } from 'react';

const Timer: React.FC<{ duration: number }> = ({ duration }) => {
  const [seconds, setSeconds] = useState(duration);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => Math.max(prev - 1, 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="text-center text-2xl font-bold">
      ⏱ Time Left: {seconds}s
    </div>
  );
};

export default Timer;
