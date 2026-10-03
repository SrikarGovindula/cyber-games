import React, { useEffect } from 'react';

const LevelTransition3 = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="transition-screen">
      <div className="transition-text glow-text-green">
        LEVEL 3
      </div>
    </div>
  );
};

export default LevelTransition3;