import React from 'react';

const BadgeRewardLevel2 = ({ onReturnMap, onNextLevel }) => {
  return (
    <div className="app-container minigame-container badge-screen">
      <div className="center-content">
        <div className="badge-icon glow-gold float-animation">
          🏅
        </div>
        <h1 className="badge-title glow-text-blue">
          Social Media Investigator
        </h1>
        <p className="badge-message">
          You successfully identified suspicious posts online.
        </p>
        <div className="badge-actions">
          <button className="btn-cyber" onClick={onReturnMap}>
            RETURN TO LEVEL MAP
          </button>
          <button className="btn-cyber btn-primary" onClick={onNextLevel}>
            NEXT LEVEL
          </button>
        </div>
      </div>
    </div>
  );
};

export default BadgeRewardLevel2;
