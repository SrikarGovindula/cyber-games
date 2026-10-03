import React, { useState, useEffect } from 'react';

const MiniGameUnlock = ({ onPlay }) => {
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    // Start locked, then unlock after a short delay for animation effect
    const timer = setTimeout(() => {
      setUnlocked(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="app-container minigame-container lock-screen">
      <div className="center-content">
        <div className={`lock-icon ${unlocked ? 'unlocked glow-text-green' : 'glow-text-red'}`}>
          {unlocked ? '🔓' : '🔐'}
        </div>
        <h1 className="unlock-text">
          {unlocked ? 'MINI GAME UNLOCKED' : 'SYSTEM LOCKED'}
        </h1>
        {unlocked && (
          <button className="btn-cyber play-minigame-btn" onClick={onPlay}>
            PLAY MINI GAME
          </button>
        )}
      </div>
    </div>
  );
};

export default MiniGameUnlock;
