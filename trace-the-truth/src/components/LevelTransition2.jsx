import React, { useEffect } from 'react';

const LevelTransition2 = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2500); // 2.5 seconds total transition

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="transition-screen">
      <div className="transition-text glow-text-blue">LEVEL 2</div>
    </div>
  );
};

export default LevelTransition2;
