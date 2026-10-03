import React, { useState } from 'react';
import Timer from './Timer';

import { emojiPuzzles, shuffleArray } from '../GameLogic';

const EmojiDecodeGame = ({ onWin, onTimeUp }) => {
  const [currentPuzzles, setCurrentPuzzles] = useState(() => {
    return shuffleArray(emojiPuzzles).slice(0, 3); // Exactly 3 questions
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [guess, setGuess] = useState('');
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [gameStatus, setGameStatus] = useState('playing'); // playing, won, lost
  const [feedbackMsg, setFeedbackMsg] = useState('');

  const handleGuessSubmit = (e) => {
    e.preventDefault();
    if (!guess.trim() || gameStatus !== 'playing') return;

    const currentAnswer = currentPuzzles[currentIndex].answer.toLowerCase();
    
    if (guess.toLowerCase().trim() === currentAnswer) {
      setFeedbackMsg('CORRECT! ACCESS GRANTED.');
      setTimeout(() => {
        const newCorrect = correctAnswers + 1;
        setCorrectAnswers(newCorrect);
        setGuess('');
        setFeedbackMsg('');
        
        if (newCorrect >= 3) { // Updated back to 3
          setGameStatus('won');
          setTimeout(() => onWin(), 1500); // Trigger win transition after celebration
        } else {
          setCurrentIndex(currentIdx => currentIdx + 1);
        }
      }, 1000);
    } else {
      setFeedbackMsg('ACCESS DENIED. TRY AGAIN.');
      setTimeout(() => setFeedbackMsg(''), 1500);
    }
  };

  const handleTimeUp = () => {
    if (gameStatus === 'playing') {
      setGameStatus('lost');
    }
  };

  const handleRetry = () => {
    const shuffled = shuffleArray(emojiPuzzles).slice(0, 3);
    setCurrentPuzzles(shuffled);
    setCurrentIndex(0);
    setCorrectAnswers(0);
    setGuess('');
    setGameStatus('playing');
    setFeedbackMsg('');
  };

  if (currentPuzzles.length === 0) return <div>Loading...</div>;

  return (
    <div className="app-container minigame-container emoji-game-container">
      <div className="game-header">
        <h2 className="glow-text-blue cyber-title">DECODE THE THREAT</h2>
        {gameStatus === 'playing' && (
          <Timer initialSeconds={40} isRunning={true} onTimeUp={handleTimeUp} />
        )}
      </div>

      <div className="progress-bar-container">
        <div className="progress-bar" style={{ width: `${(correctAnswers / 3) * 100}%` }}></div>
      </div>
      <div className="progress-text">DECODED: {correctAnswers}/3</div>

      {gameStatus === 'playing' && (
        <div className="emoji-display-card scenario-loader" key={currentIndex}>
          <div className="emoji-clue">{currentPuzzles[currentIndex].emoji}</div>
          
          <form className="guess-form" onSubmit={handleGuessSubmit}>
            <input 
              type="text" 
              className="guess-input input-cyber"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              placeholder="Enter interpretation..."
              autoFocus
            />
            <button type="submit" className="btn-cyber btn-primary submit-btn">SUBMIT</button>
          </form>

          {feedbackMsg && (
            <div className={`feedback-msg ${feedbackMsg.includes('CORRECT') ? 'text-green' : 'text-red'}`}>
              {feedbackMsg}
            </div>
          )}
        </div>
      )}

      {gameStatus === 'won' && (
        <div className="game-over-screen">
          <h1 className="glow-text-green blink">LEVEL 2 COMPLETE</h1>
          <p>THREATS NEUTRALIZED.</p>
        </div>
      )}

      {gameStatus === 'lost' && (
        <div className="game-over-screen">
          <h1 className="glow-text-red">SYSTEM COMPROMISED</h1>
          <p>TIME IS UP.</p>
          <button className="btn-cyber mt-4" onClick={handleRetry}>INITIALIZE REBOOT</button>
          <button className="btn-cyber btn-danger mt-2" onClick={onTimeUp}>ABORT MISSION</button>
        </div>
      )}
    </div>
  );
};

export default EmojiDecodeGame;
