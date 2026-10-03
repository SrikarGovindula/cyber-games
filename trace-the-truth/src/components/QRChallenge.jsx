import React, { useState } from 'react';
import QRCodeDisplay from './QRCodeDisplay';
import QRResultMessage from './QRResultMessage';

import { qrScenarios, shuffleArray } from '../GameLogic';

const QRChallenge = ({ onComplete, onReturnMap }) => {
  const [scenarios] = useState(() => {
    return shuffleArray(qrScenarios).slice(0, 2);
  });

  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [resultData, setResultData] = useState(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [isScanning, setIsScanning] = useState(false);
  const [hasFailed, setHasFailed] = useState(false);
  const [showFailedScreen, setShowFailedScreen] = useState(false);

  const handleScan = () => {
    if (isScanning) return;

    setIsScanning(true);

    setTimeout(() => {
      setIsScanning(false);

      const current = scenarios[currentScenarioIndex];

      setResultData({
        isError: true,
        title: "⚠️ Incorrect Action",
        explanation:
          `${current.explanation}\n\n` +
          `Legitimate message example:\n"${current.realMessage}"`
      });

      setHasFailed(true);
      setShowResult(true);
    }, 1500);
  };

  const handleIgnore = () => {
    const current = scenarios[currentScenarioIndex];

    setResultData({
      isError: false,
      title: "✅ Correct Decision",
      explanation:
        `${current.explanation}\n\n` +
        `Excellent awareness! You correctly identified the scam.`
    });

    setCorrectCount(prev => prev + 1);
    setShowResult(true);
  };

  const handleNext = () => {
    if (hasFailed) {
      setShowFailedScreen(true);
      return;
    }

    setShowResult(false);

    if (currentScenarioIndex >= scenarios.length - 1) {
      const totalCorrect =
        resultData && !resultData.isError
          ? correctCount
          : correctCount;

      if (totalCorrect >= 2) {
        onComplete();
      }
    } else {
      setCurrentScenarioIndex(prev => prev + 1);
    }
  };

  if (scenarios.length === 0) {
    return null;
  }

  // Failed screen
  if (showResult && hasFailed && showFailedScreen) {
    return (
      <div className="app-container qr-challenge-container">
        <div className="qr-result-overlay">
          <div className="qr-result-dialog error">

            <h2 className="text-red">
              ❌ Challenge Failed
            </h2>

            <div
              style={{
                marginTop: '10px',
                fontSize: '1.2rem',
                whiteSpace: 'pre-line'
              }}
            >
              <p>
                You were caught by a QR code scam attempt.
                This challenge is designed to help build
                awareness about suspicious QR messages.
              </p>

              <p
                style={{
                  marginTop: '15px',
                  color: '#ccc'
                }}
              >
                Stay cautious when scanning QR codes and
                always verify messages through official sources.
              </p>
            </div>

            <div style={{ marginTop: '30px' }}>
              <button
                className="btn-cyber"
                onClick={onReturnMap}
              >
                RETURN TO LEVEL MAP
              </button>
            </div>

          </div>
        </div>
      </div>
    );
  }

  // Result screen
  if (showResult) {
    return (
      <QRResultMessage
        isError={resultData.isError}
        title={resultData.title}
        explanation={resultData.explanation}
        buttonText={hasFailed ? "CONTINUE" : "NEXT"}
        onContinue={handleNext}
      />
    );
  }

  const currentScenario =
    scenarios[currentScenarioIndex];

  return (
    <div className="app-container qr-challenge-container">

      {/* Instructions */}
      <div className="instruction-panel">

        <h2 className="glow-text-blue">
          QR SCAN CHALLENGE
        </h2>

        <p
          className="mt-2"
          style={{ whiteSpace: 'pre-line' }}
        >
          Carefully review the message below.
          Decide whether the QR code is legitimate
          or suspicious.

          Choose <strong>SCAN</strong> if it is safe,
          or <strong>IGNORE</strong> if it looks like a scam.
        </p>

      </div>

      {/* Scenario */}
      <div
        className="scenario-panel email-card scenario-loader"
        key={currentScenarioIndex}
      >

        <div className="email-header">

          <span className="dot red"></span>
          <span className="dot yellow"></span>
          <span className="dot green"></span>

          <span className="email-title">
            Incoming Message
          </span>

        </div>

        <div className="email-body">

          {currentScenario.fakeMessage
            .split('\n')
            .map((line, idx) => (
              <p key={idx}>
                {line}
              </p>
            ))}

        </div>

      </div>

      {/* QR Code */}
      <QRCodeDisplay
        isScanning={isScanning}
      />

      {/* Buttons */}
      <div className="qr-actions">

        <button
          className="btn-cyber btn-scan"
          onClick={handleScan}
          disabled={isScanning}
        >
          {isScanning
            ? 'SCANNING...'
            : 'SCAN'}
        </button>

        <button
          className="btn-cyber btn-ignore"
          onClick={handleIgnore}
          disabled={isScanning}
        >
          IGNORE
        </button>

      </div>

      {/* Scenario Counter */}
      <div
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          color: 'rgba(255,255,255,0.5)',
          fontFamily: 'var(--font-cyber)'
        }}
      >
        Scenario: {currentScenarioIndex + 1} / {scenarios.length}
      </div>

    </div>
  );
};

export default QRChallenge;