import React, { useEffect, useState } from 'react';

const Timer = ({ initialSeconds, onTimeUp, isRunning }) => {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    let interval = null;
    if (isRunning && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    } else if (seconds === 0 && isRunning) {
      onTimeUp();
    }
    return () => clearInterval(interval);
  }, [isRunning, seconds, onTimeUp]);

  return (
    <div className="timer-display">
      TIME LEFT: {seconds}s
    </div>
  );
};

export default Timer;
