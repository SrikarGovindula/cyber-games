import React, { useState } from 'react';
import Timer from './Timer';

const SYMBOLS = ['🔐', '🛡', '💻', '📧', '🌐', '📡', '🧠', '🔍'];

const MemoryCardGame = ({ onWin }) => {
  const [cards] = useState(() => {
    return [...SYMBOLS, ...SYMBOLS]
      .sort(() => Math.random() - 0.5)
      .map((symbol, index) => ({ id: index, symbol }));
  });
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matchedIndices, setMatchedIndices] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isGameWon, setIsGameWon] = useState(false);
  const [isRunning, setIsRunning] = useState(true);

  const handleCardClick = (index) => {
    if (
      isGameOver ||
      isGameWon ||
      flippedIndices.length === 2 ||
      flippedIndices.includes(index) ||
      matchedIndices.includes(index)
    ) {
      return;
    }

    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      const firstIndex = newFlipped[0];
      const secondIndex = newFlipped[1];

      if (cards[firstIndex].symbol === cards[secondIndex].symbol) {
        // Matched
        const newMatched = [...matchedIndices, firstIndex, secondIndex];
        setMatchedIndices(newMatched);
        setFlippedIndices([]);

        if (newMatched.length === cards.length) {
          // Win condition
          setIsRunning(false);
          setIsGameWon(true);
          setTimeout(() => {
            onWin();
          }, 2000);
        }
      } else {
        // Not matched, flip back after a delay
        setTimeout(() => {
          setFlippedIndices([]);
        }, 1000);
      }
    }
  };

  const handleTimeUp = () => {
    setIsRunning(false);
    setIsGameOver(true);
  };

  return (
    <div className="app-container minigame-container memory-game-screen">
      <Timer initialSeconds={60} onTimeUp={handleTimeUp} isRunning={isRunning} />
      
      <div className="game-header">
        <h2 className="glow-text-blue">MEMORY FLIP</h2>
      </div>

      <div className="card-grid">
        {cards.map((card, index) => {
          const isFlipped = flippedIndices.includes(index) || matchedIndices.includes(index);
          const isMatched = matchedIndices.includes(index);

          return (
            <div 
              key={card.id} 
              className={`memory-card ${isFlipped ? 'flipped' : ''} ${isMatched ? 'matched' : ''}`}
              onClick={() => handleCardClick(index)}
            >
              <div className="card-inner">
                <div className="card-front">
                  {/* Back of the card (visible when face down) */}
                  <div className="card-pattern"></div>
                </div>
                <div className="card-back">
                  {/* Face of the card (visible when flipped) */}
                  <span className="card-symbol">{card.symbol}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {isGameOver && (
        <div className="game-overlay glow-text-red">
          <h1>SYSTEM FAILED</h1>
          <p>TIME OUT</p>
          <button className="btn-cyber" onClick={() => window.location.reload()}>REBOOT</button>
        </div>
      )}

      {isGameWon && (
        <div className="game-overlay glow-text-green">
          <h1>🎉 MINI GAME COMPLETE</h1>
        </div>
      )}
    </div>
  );
};

export default MemoryCardGame;
