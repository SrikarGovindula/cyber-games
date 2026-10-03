import React, { useState, useEffect, useRef } from 'react';

const EmailViewer = ({ email, onBack, onSolve }) => {
  const [feedback, setFeedback] = useState(null);
  const [hasAnswered, setHasAnswered] = useState(false);

  const contentRef = useRef(null);

  // Reset only the answer/feedback when a different email opens.
  // IMPORTANT: There are NO instructions here.
  useEffect(() => {
    setFeedback(null);
    setHasAnswered(false);

    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  }, [email.id]);

  // ============================================================
  // ANSWER EMAIL
  // ============================================================

  const handleGuess = guess => {
    if (hasAnswered) return;

    setHasAnswered(true);

    const isCorrect = guess === email.isReal;

    if (isCorrect) {
      setFeedback('correct');

      // Only correct answers count toward the 3-email requirement.
      if (onSolve) {
        onSolve();
      }
    } else {
      setFeedback('incorrect');
    }
  };

  // ============================================================
  // SCAM PREVENTION
  // ============================================================

  const scamPreventions = [
    'Do not click links or open attachments until the sender is verified.',
    'Check the sender email address and domain carefully.',
    'Never share passwords, OTPs, PINs or banking information by email.',
    'Do not act immediately because an email creates urgency or fear.',
    'Verify the request through the organization’s official website or app.',
    'If unsure, report the email as phishing or spam.'
  ];

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        backgroundColor: '#f6f8fc',
        fontFamily: '"Google Sans", Roboto, Arial, sans-serif',
        color: '#202124',
        overflow: 'hidden'
      }}
    >
      {/* ========================================================
          GMAIL HEADER
          ======================================================== */}

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '8px',
          backgroundColor: '#fff',
          borderBottom: '1px solid #e0e0e0',
          height: '64px',
          boxSizing: 'border-box'
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            width: '238px',
            paddingLeft: '12px'
          }}
        >
          <button
            onClick={onBack}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '20px',
              cursor: 'pointer',
              padding: '12px',
              borderRadius: '50%',
              color: '#5f6368',
              marginRight: '4px'
            }}
            className="hover-circle"
          >
            ⬅️
          </button>

          <img
            src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_1x_r5.png"
            alt="Gmail"
            style={{ height: '40px' }}
          />
        </div>

        <div style={{ flex: 1 }} />

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            paddingRight: '12px'
          }}
        >
          <button className="icon-btn">⚙️</button>
          <button className="icon-btn">▦</button>

          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: '#1a73e8',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              fontSize: '14px'
            }}
          >
            U
          </div>
        </div>
      </div>

      {/* ========================================================
          EMAIL CONTENT
          ======================================================== */}

      <div
        ref={contentRef}
        style={{
          flex: 1,
          overflowY: 'auto',
          backgroundColor: '#fff',
          margin: '0 16px 16px 0',
          borderRadius: '0 0 16px 16px'
        }}
      >
        {/* Email Toolbar */}
        <div
          style={{
            height: '56px',
            display: 'flex',
            alignItems: 'center',
            padding: '0 16px',
            borderBottom: '1px solid #e0e0e0',
            gap: '8px'
          }}
        >
          <button
            onClick={onBack}
            className="icon-btn"
            title="Back to inbox"
          >
            ⬅️
          </button>

          <button className="icon-btn" title="Archive">
            📥
          </button>

          <button className="icon-btn" title="Report spam">
            ⚠️
          </button>

          <button className="icon-btn" title="Delete">
            🗑️
          </button>

          <div style={{ flex: 1 }} />

          <button className="icon-btn" title="More">
            ⋮
          </button>
        </div>

        {/* ======================================================
            EMAIL HEADER
            ====================================================== */}

        <div
          style={{
            padding: '24px 32px 10px'
          }}
        >
          <h1
            style={{
              fontSize: '24px',
              fontWeight: '400',
              color: '#202124',
              margin: '0 0 20px'
            }}
          >
            {email.subject}
          </h1>

          <div
            style={{
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: '#1a73e8',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                marginRight: '12px'
              }}
            >
              {email.sender?.charAt(0)?.toUpperCase()}
            </div>

            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontSize: '14px',
                  fontWeight: 'bold',
                  color: '#202124'
                }}
              >
                {email.sender}
              </div>

              <div
                style={{
                  fontSize: '12px',
                  color: '#5f6368'
                }}
              >
                to me
              </div>
            </div>

            <div
              style={{
                fontSize: '12px',
                color: '#5f6368'
              }}
            >
              {email.time}
            </div>
          </div>
        </div>

        {/* ======================================================
            EMAIL BODY
            ====================================================== */}

        <div
          style={{
            padding: '20px 32px',
            fontSize: '15px',
            lineHeight: '1.7',
            color: '#202124',
            whiteSpace: 'pre-wrap'
          }}
        >
          {email.body || email.content || email.preview}
        </div>

        {/* ======================================================
            DETECTION CONTROLS
            ====================================================== */}

        {!feedback && (
          <div
            style={{
              margin: '20px 32px 32px',
              padding: '20px',
              backgroundColor: '#f8fafd',
              borderRadius: '10px',
              border: '1px solid #dadce0',
              textAlign: 'center'
            }}
          >
            <div
              style={{
                color: '#1a73e8',
                fontWeight: 'bold',
                fontSize: '15px',
                marginBottom: '14px'
              }}
            >
              🔍 IS THIS EMAIL REAL OR A SCAM?
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '16px'
              }}
            >
              <button
                onClick={() => handleGuess(true)}
                style={{
                  backgroundColor: '#188038',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '10px 32px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
                className="action-btn"
              >
                ✓ REAL
              </button>

              <button
                onClick={() => handleGuess(false)}
                style={{
                  backgroundColor: '#d93025',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '10px 32px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
                className="action-btn"
              >
                ⚠ SCAM
              </button>
            </div>
          </div>
        )}

        {/* ======================================================
            FEEDBACK
            ====================================================== */}

        {feedback && (
          <div
            style={{
              margin: '20px 32px 32px',
              padding: '18px',
              borderRadius: '10px',
              backgroundColor:
                feedback === 'correct'
                  ? '#e6f4ea'
                  : '#fce8e6',
              border:
                feedback === 'correct'
                  ? '1px solid #34a853'
                  : '1px solid #d93025'
            }}
          >
            <h3
              style={{
                margin: '0 0 8px',
                color:
                  feedback === 'correct'
                    ? '#188038'
                    : '#d93025',
                fontSize: '16px'
              }}
            >
              {feedback === 'correct'
                ? '✔️ CORRECT DETECTION'
                : '❌ INCORRECT DETECTION'}
            </h3>

            <p
              style={{
                margin: 0,
                color: '#3c4043',
                fontSize: '14px',
                lineHeight: '1.5'
              }}
            >
              {email.explanation ||
                (feedback === 'correct'
                  ? 'Good job! You correctly identified this email.'
                  : 'That was not the correct classification.')}
            </p>

            {/* ==================================================
                SCAM PREVENTION
                Show for scam emails.
                ================================================== */}

            {email.isReal === false && (
              <div
                style={{
                  marginTop: '18px',
                  padding: '16px',
                  backgroundColor: '#fff8e1',
                  border: '1px solid #fbbc04',
                  borderRadius: '10px'
                }}
              >
                <h4
                  style={{
                    margin: '0 0 10px',
                    color: '#b06000',
                    fontSize: '15px'
                  }}
                >
                  🛡️ How to Prevent This Scam
                </h4>

                <ul
                  style={{
                    margin: 0,
                    paddingLeft: '22px',
                    color: '#5f6368',
                    fontSize: '13px',
                    lineHeight: '1.7'
                  }}
                >
                  {scamPreventions.map((tip, index) => (
                    <li key={index}>{tip}</li>
                  ))}
                </ul>
              </div>
            )}

            <div
              style={{
                marginTop: '16px',
                display: 'flex',
                justifyContent: 'flex-end'
              }}
            >
              <button
                onClick={onBack}
                style={{
                  backgroundColor: '#1a73e8',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '18px',
                  padding: '8px 20px',
                  cursor: 'pointer',
                  fontWeight: '500'
                }}
              >
                BACK TO INBOX
              </button>
            </div>
          </div>
        )}
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            .icon-btn {
              width: 40px;
              height: 40px;
              border-radius: 50%;
              border: none;
              background: transparent;
              color: #5f6368;
              font-size: 18px;
              cursor: pointer;
              display: flex;
              align-items: center;
              justify-content: center;
            }

            .icon-btn:hover {
              background-color: rgba(60,64,67,0.08);
            }

            .hover-circle:hover {
              background-color: rgba(60,64,67,0.08);
            }

            .action-btn:hover {
              opacity: 0.9;
              transform: translateY(-1px);
            }
          `
        }}
      />
    </div>
  );
};

export default EmailViewer;
