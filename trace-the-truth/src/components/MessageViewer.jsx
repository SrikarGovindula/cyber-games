import React, { useState, useEffect } from "react";

const MessageViewer = ({
  contact,
  onBack,
  onSolve,
  alreadySolved = false
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [showPrevention, setShowPrevention] = useState(false);

  useEffect(() => {
    setSelectedAnswer(null);
    setShowResult(false);
    setShowPrevention(false);
  }, [contact.id]);

  const handleDetection = (answer) => {
    if (alreadySolved || showResult) return;

    setSelectedAnswer(answer);
    setShowResult(true);

    const isCorrect = answer === contact.isReal;

    /*
      If the message is correctly identified as a scam,
      show prevention information before allowing the
      user to return to the WhatsApp list.
    */
    if (isCorrect && contact.isReal === false) {
      setShowPrevention(true);
    } else if (isCorrect) {
      /*
        Real message:
        directly complete the detection.
      */
      if (onSolve) {
        onSolve(contact.id);
      }
    }
  };

  const handlePreventionOK = () => {
    setShowPrevention(false);

    /*
      Count the successfully detected scam after
      the user has finished reading the prevention tips.
    */
    if (onSolve) {
      onSolve(contact.id);
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        background: "#111b21",
        color: "#e9edef",
        display: "flex",
        flexDirection: "column",
        fontFamily:
          '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial',
        overflow: "hidden"
      }}
    >

      {/* =====================================================
          WHATSAPP HEADER
      ===================================================== */}

      <div
        style={{
          height: "60px",
          minHeight: "60px",
          background: "#202c33",
          display: "flex",
          alignItems: "center",
          padding: "0 15px",
          borderBottom: "1px solid #2a3942"
        }}
      >
        <button
          onClick={onBack}
          style={{
            background: "none",
            border: "none",
            color: "#fff",
            fontSize: "22px",
            cursor: "pointer",
            marginRight: "15px"
          }}
        >
          ←
        </button>

        <div
          style={{
            width: "42px",
            height: "42px",
            borderRadius: "50%",
            background: "#00a884",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "22px",
            marginRight: "12px"
          }}
        >
          {contact.avatar}
        </div>

        <div>
          <div
            style={{
              fontWeight: "600",
              fontSize: "16px"
            }}
          >
            {contact.name}
          </div>

          <div
            style={{
              color: "#8696a0",
              fontSize: "12px"
            }}
          >
            online
          </div>
        </div>
      </div>


      {/* =====================================================
          CHAT AREA
      ===================================================== */}

      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "30px",
          backgroundColor: "#0b141a",
          backgroundImage:
            "radial-gradient(rgba(255,255,255,.025) 1px, transparent 1px)",
          backgroundSize: "20px 20px"
        }}
      >

        {/* Chat date */}

        <div
          style={{
            textAlign: "center",
            marginBottom: "25px"
          }}
        >
          <span
            style={{
              background: "#182229",
              color: "#8696a0",
              padding: "6px 12px",
              borderRadius: "8px",
              fontSize: "11px"
            }}
          >
            TODAY
          </span>
        </div>


        {/* Messages */}

        {contact.history?.map((message, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              justifyContent:
                message.sender === "me"
                  ? "flex-end"
                  : "flex-start",
              marginBottom: "12px"
            }}
          >
            <div
              style={{
                maxWidth: "65%",
                background:
                  message.sender === "me"
                    ? "#005c4b"
                    : "#202c33",
                padding: "10px 12px",
                borderRadius:
                  message.sender === "me"
                    ? "8px 0 8px 8px"
                    : "0 8px 8px 8px",
                color: "#e9edef",
                fontSize: "14px",
                lineHeight: "1.5",
                boxShadow:
                  "0 1px 1px rgba(0,0,0,.2)"
              }}
            >
              {message.text}

              <div
                style={{
                  textAlign: "right",
                  marginTop: "5px",
                  color: "#8696a0",
                  fontSize: "10px"
                }}
              >
                10:42 AM ✓✓
              </div>
            </div>
          </div>
        ))}


        {/* =================================================
            DETECTION AREA
        ================================================= */}

        {!showResult && !alreadySolved && (
          <div
            style={{
              marginTop: "40px",
              background: "#182229",
              border: "1px solid #2a3942",
              borderRadius: "12px",
              padding: "25px",
              maxWidth: "650px",
              marginLeft: "auto",
              marginRight: "auto",
              textAlign: "center"
            }}
          >
            <div
              style={{
                color: "#00a884",
                fontSize: "16px",
                fontWeight: "bold",
                marginBottom: "10px"
              }}
            >
              🔍 WHATSAPP THREAT DETECTION
            </div>

            <p
              style={{
                color: "#8696a0",
                fontSize: "13px",
                marginBottom: "20px"
              }}
            >
              Is this conversation REAL or a SCAM?
            </p>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "15px",
                flexWrap: "wrap"
              }}
            >

              <button
                onClick={() => handleDetection(true)}
                style={{
                  background: "#00a884",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  padding: "12px 35px",
                  fontWeight: "bold",
                  fontSize: "14px",
                  cursor: "pointer"
                }}
              >
                ✓ REAL
              </button>

              <button
                onClick={() => handleDetection(false)}
                style={{
                  background: "#d93025",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  padding: "12px 35px",
                  fontWeight: "bold",
                  fontSize: "14px",
                  cursor: "pointer"
                }}
              >
                ⚠ SCAM
              </button>

            </div>
          </div>
        )}


        {/* =================================================
            RESULT
        ================================================= */}

        {showResult && !showPrevention && (
          <div
            style={{
              marginTop: "35px",
              background:
                selectedAnswer === contact.isReal
                  ? "#12372f"
                  : "#3b1f20",
              border:
                selectedAnswer === contact.isReal
                  ? "1px solid #00a884"
                  : "1px solid #d93025",
              borderRadius: "12px",
              padding: "25px",
              maxWidth: "650px",
              marginLeft: "auto",
              marginRight: "auto"
            }}
          >

            <h3
              style={{
                margin: "0 0 10px",
                color:
                  selectedAnswer === contact.isReal
                    ? "#00a884"
                    : "#f28b82",
                fontSize: "18px"
              }}
            >
              {selectedAnswer === contact.isReal
                ? "✔️ CORRECT DETECTION"
                : "❌ INCORRECT DETECTION"}
            </h3>

            <p
              style={{
                color: "#d1d7da",
                fontSize: "14px",
                lineHeight: "1.6"
              }}
            >
              {contact.explanation ||
                (selectedAnswer === contact.isReal
                  ? "You correctly identified this message."
                  : "This was not the correct classification.")}
            </p>

            <button
              onClick={onBack}
              style={{
                marginTop: "15px",
                background: "#00a884",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                padding: "10px 22px",
                fontWeight: "bold",
                cursor: "pointer"
              }}
            >
              BACK TO WHATSAPP
            </button>

          </div>
        )}


        {/* =================================================
            SCAM PREVENTION PANEL
        ================================================= */}

        {showPrevention && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,.75)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px",
              zIndex: 1000
            }}
          >

            <div
              style={{
                width: "620px",
                maxWidth: "95%",
                maxHeight: "90vh",
                overflowY: "auto",
                background: "#111d2d",
                border: "1px solid #00a884",
                borderRadius: "16px",
                padding: "30px",
                boxShadow:
                  "0 10px 40px rgba(0,0,0,.5)"
              }}
            >

              <div
                style={{
                  textAlign: "center",
                  fontSize: "45px",
                  marginBottom: "10px"
                }}
              >
                🛡️
              </div>

              <h2
                style={{
                  textAlign: "center",
                  color: "#00a884",
                  margin: "0 0 8px"
                }}
              >
                SCAM DETECTED
              </h2>

              <p
                style={{
                  textAlign: "center",
                  color: "#aebac1",
                  fontSize: "14px",
                  marginBottom: "25px"
                }}
              >
                Learn how to protect yourself from messages
                like this.
              </p>


              {/* Prevention 1 */}

              <div
                style={{
                  background: "#18283b",
                  padding: "16px",
                  borderRadius: "10px",
                  marginBottom: "12px"
                }}
              >
                <strong
                  style={{
                    color: "#80cbc4"
                  }}
                >
                  🔐 Never share OTPs or passwords
                </strong>

                <p
                  style={{
                    color: "#aebac1",
                    fontSize: "13px",
                    lineHeight: "1.5",
                    marginBottom: 0
                  }}
                >
                  Legitimate banks and services will not
                  ask you to send your OTP, PIN, or password
                  through WhatsApp.
                </p>
              </div>


              {/* Prevention 2 */}

              <div
                style={{
                  background: "#18283b",
                  padding: "16px",
                  borderRadius: "10px",
                  marginBottom: "12px"
                }}
              >
                <strong
                  style={{
                    color: "#80cbc4"
                  }}
                >
                  🔗 Do not open suspicious links
                </strong>

                <p
                  style={{
                    color: "#aebac1",
                    fontSize: "13px",
                    lineHeight: "1.5",
                    marginBottom: 0
                  }}
                >
                  Avoid links sent unexpectedly by unknown
                  contacts or messages that pressure you to
                  act immediately.
                </p>
              </div>


              {/* Prevention 3 */}

              <div
                style={{
                  background: "#18283b",
                  padding: "16px",
                  borderRadius: "10px",
                  marginBottom: "12px"
                }}
              >
                <strong
                  style={{
                    color: "#80cbc4"
                  }}
                >
                  💳 Never send money because of pressure
                </strong>

                <p
                  style={{
                    color: "#aebac1",
                    fontSize: "13px",
                    lineHeight: "1.5",
                    marginBottom: 0
                  }}
                >
                  Be cautious about unexpected requests for
                  payments, fees, gift cards, or transfers.
                </p>
              </div>


              {/* Prevention 4 */}

              <div
                style={{
                  background: "#18283b",
                  padding: "16px",
                  borderRadius: "10px",
                  marginBottom: "12px"
                }}
              >
                <strong
                  style={{
                    color: "#80cbc4"
                  }}
                >
                  📞 Verify independently
                </strong>

                <p
                  style={{
                    color: "#aebac1",
                    fontSize: "13px",
                    lineHeight: "1.5",
                    marginBottom: 0
                  }}
                >
                  If a message claims to be from your bank,
                  college, company, or another service, contact
                  them using their official website or phone
                  number.
                </p>
              </div>


              {/* Prevention 5 */}

              <div
                style={{
                  background: "#18283b",
                  padding: "16px",
                  borderRadius: "10px",
                  marginBottom: "25px"
                }}
              >
                <strong
                  style={{
                    color: "#80cbc4"
                  }}
                >
                  🚫 Block and report suspicious contacts
                </strong>

                <p
                  style={{
                    color: "#aebac1",
                    fontSize: "13px",
                    lineHeight: "1.5",
                    marginBottom: 0
                  }}
                >
                  If a message is clearly fraudulent, avoid
                  interacting with it and use the platform's
                  block and report features.
                </p>
              </div>


              {/* OK BUTTON */}

              <button
                onClick={handlePreventionOK}
                style={{
                  width: "100%",
                  padding: "13px",
                  background: "#00a884",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "15px",
                  fontWeight: "bold",
                  cursor: "pointer"
                }}
              >
                OK — I UNDERSTAND
              </button>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default MessageViewer;
