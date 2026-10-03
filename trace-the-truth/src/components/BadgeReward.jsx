import React from "react";

const BadgeReward = ({ onReturnMap, onNextLevel }) => {
  const handleNextLevel = () => {
    console.log("NEXT LEVEL clicked");
    console.log("Calling onNextLevel...");
    onNextLevel();
  };

  return (
    <div className="app-container minigame-container badge-screen">
      <div className="center-content">
        <div className="badge-icon glow-gold float-animation">
          🏅
        </div>

        <h1 className="badge-title glow-text-blue">
          Cyber Detective Badge
        </h1>

        <p className="badge-message">
          You successfully detected digital threats and completed the challenge.
        </p>

        <div className="badge-actions">
          <button
            className="btn-cyber"
            onClick={onReturnMap}
          >
            RETURN TO LEVEL MAP
          </button>

          <button
            className="btn-cyber btn-primary"
            onClick={handleNextLevel}
          >
            NEXT LEVEL
          </button>
        </div>
      </div>
    </div>
  );
};

export default BadgeReward;
