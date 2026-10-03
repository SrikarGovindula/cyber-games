import React, { useState, useEffect } from 'react';

// Word list: Encoded word, original word
const words = [
  { encoded: "xjo", decoded: "win" },        // w+1, i+1, n+1
  { encoded: "zpv", decoded: "you" },        
  { encoded: "tbgf", decoded: "safe" },
  { encoded: "tijfme", decoded: "shield" },
  { encoded: "ivoufst", decoded: "hunters" },
  { encoded: "svmf", decoded: "rule" },
  { encoded: "hpbm", decoded: "goal" }
];

const MiniGameCipher = ({ onWin, onReturnMap }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [inputValue, setInputValue] = useState('');
  
  const [timeLeft, setTimeLeft] = useState(60);
  const [isGameOver, setIsGameOver] = useState(false);
  const [hasFailed, setHasFailed] = useState(false);

  useEffect(() => {
    // Pick 3 random words for this round
    const shuffled = [...words].sort(() => 0.5 - Math.random());
    setQuestions(shuffled.slice(0, 3));
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) {
      setIsGameOver(true);
      setHasFailed(true);
      return;
    }

    if (!isGameOver) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft, isGameOver]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isGameOver) return;

    const currentWord = questions[currentQuestionIndex];
    if (inputValue.toLowerCase() === currentWord.decoded.toLowerCase()) {
      // Correct! Move to next
      const nextIndex = currentQuestionIndex + 1;
      setInputValue('');
      
      if (nextIndex >= questions.length) {
        // Player won all 3
        setIsGameOver(true);
        setHasFailed(false);
        
        // Award badge locally
        const badges = JSON.parse(localStorage.getItem("playerBadges") || "[]");
        if (!badges.includes("LEVEL3_CYBER_BADGE")) {
          badges.push("LEVEL3_CYBER_BADGE");
          localStorage.setItem("playerBadges", JSON.stringify(badges));
        }
      } else {
        setCurrentQuestionIndex(nextIndex);
      }
    } else {
      // Wrong answer - Player fails immediately
      setIsGameOver(true);
      setHasFailed(true);
    }
  };

  if (questions.length === 0) return null;

  if (isGameOver && hasFailed) {
    return (
      <div className="app-container minigame-container">
        <div className="cyber-panel error-panel text-center" style={{ maxWidth: '600px', margin: '0 auto', marginTop: '100px' }}>
          <h2 className="text-red">⚠️ Challenge Ended</h2>
          <p style={{ marginTop: '20px', fontSize: '1.2rem', whiteSpace: 'pre-line' }}>
            You made a strong effort to reach this stage. Although the final challenge was not completed, your progress shows growing awareness of cyber threats. Keep learning and stay safe online.
          </p>
          <button 
            className="btn-cyber mt-4"
            onClick={onReturnMap}
          >
            RETURN TO LEVEL MAP
          </button>
        </div>
      </div>
    );
  }

  if (isGameOver && !hasFailed) {
    return (
      <div className="app-container minigame-container">
        <div className="cyber-panel success-panel text-center" style={{ maxWidth: '600px', margin: '0 auto', marginTop: '100px' }}>
          <h2 className="text-green">🏆 Mini Game Completed</h2>
          <p style={{ marginTop: '20px', fontSize: '1.2rem', whiteSpace: 'pre-line' }}>
            Outstanding work. Your decoding skills and cyber awareness helped you successfully complete the challenge.
          </p>
          <button 
            className="btn-cyber mt-4"
            onClick={onWin}
          >
            CLAIM REWARD
          </button>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestionIndex];

  return (
    <div className="app-container minigame-container">
      <div className="timer-display" style={{ 
        position: 'absolute', top: '20px', right: '20px', fontSize: '1.5rem', 
        color: timeLeft <= 10 ? 'var(--neon-red)' : 'var(--neon-blue)',
        textShadow: `0 0 10px ${timeLeft <= 10 ? 'var(--neon-red)' : 'var(--neon-blue)'}`
      }}>
        ⏱️ {timeLeft}s
      </div>

      <div style={{ position: 'absolute', top: '20px', left: '20px', fontFamily: 'var(--font-cyber)' }}>
        <h3 className="glow-text-blue">LETTER SHIFT CIPHER</h3>
        <p style={{ color: 'rgba(255,255,255,0.7)' }}>Word {currentQuestionIndex + 1} of 3</p>
      </div>

      <div className="center-content text-center">
        <div className="cyber-panel" style={{ padding: '40px', maxWidth: '500px', margin: '0 auto' }}>
          <h3 style={{ marginBottom: '10px' }}>DECODE THE WORD</h3>
          <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '30px' }}>
            Each letter has been shifted forward by 1 (+1) in the alphabet.<br/>
            e.g. 'c' becomes 'd'. Shift them backward to reveal the original word!
          </p>
          
          <div style={{ fontSize: '3rem', letterSpacing: '8px', marginBottom: '30px', fontFamily: 'monospace', color: 'var(--neon-green)' }}>
            {currentQ.encoded.toUpperCase()}
          </div>

          <form onSubmit={handleSubmit}>
            <input 
              type="text" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="cyber-input"
              placeholder="ENTER DECODED WORD"
              autoFocus
              style={{ width: '100%', padding: '15px', fontSize: '1.2rem', textAlign: 'center', marginBottom: '20px' }}
            />
            <button type="submit" className="btn-cyber w-100">
              SUBMIT
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MiniGameCipher;
