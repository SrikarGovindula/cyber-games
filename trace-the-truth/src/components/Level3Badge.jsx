import React from 'react';

const Level3Badge = ({ onReturnMap, onNextLevel }) => {
  return (
    <div className="app-container minigame-container badge-screen">
      <div className="center-content">
        <div className="badge-icon glow-gold float-animation" style={{ fontSize: '4rem', marginBottom: '20px' }}>
          🔍
        </div>
        <h1 className="badge-title glow-text-green">
          Level 3 Complete
        </h1>
        <p className="badge-message" style={{ fontWeight: 'bold' }}>
          LEVEL 3 CYBER AWARENESS BADGE
        </p>
        <div className="badge-actions">
          <button className="btn-cyber" onClick={onReturnMap}>
            RETURN TO LEVEL MAP
          </button>
          <button className="btn-cyber btn-primary" onClick={onNextLevel}>
            FINISH
          </button>
        </div>
      </div>
    </div>
  );
};

export default Level3Badge;
