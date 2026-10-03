import React, { useState, useMemo } from "react";
import { contacts, shuffleArray } from "../GameLogic";

const REQUIRED_MESSAGES = 3;

const MessagesApp = ({
  onBack,
  onSolve,
  verifiedMessageIds = new Set(),
  verifiedCount = 0
}) => {
  const [shuffledContacts] = useState(() => shuffleArray(contacts));
  const [selectedContact, setSelectedContact] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showInstructions, setShowInstructions] = useState(true);
  const [feedback, setFeedback] = useState(null);

  const filteredContacts = useMemo(() => {
    return shuffledContacts.filter((contact) => {
      const lastMessage =
        contact.history?.[contact.history.length - 1]?.text || "";

      return (
        contact.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        lastMessage
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      );
    });
  }, [shuffledContacts, searchQuery]);

  // --------------------------------------------------
  // SELECT CONTACT
  // --------------------------------------------------

  const openContact = (contact) => {
    if (verifiedMessageIds.has(contact.id)) return;

    setSelectedContact(contact);
    setFeedback(null);
  };

  // --------------------------------------------------
  // DETECTION
  // --------------------------------------------------

  const handleDetection = (isReal) => {
    if (!selectedContact) return;

    if (verifiedMessageIds.has(selectedContact.id)) return;

    const correct = isReal === selectedContact.isReal;

    if (!correct) {
      setFeedback({
        type: "incorrect",
        message: "❌ Incorrect detection",
        explanation:
          selectedContact.explanation ||
          "Look carefully for suspicious requests, links, urgency, or requests for sensitive information."
      });

      return;
    }

    setFeedback({
      type: "correct",
      message: "✅ Correct detection",
      explanation:
        selectedContact.explanation ||
        "Good job! You correctly identified this message."
    });

    if (onSolve) {
      onSolve(selectedContact.id);
    }

    const newCount = verifiedCount + 1;

    // Return to Levels page after 3 correct detections
    if (newCount >= REQUIRED_MESSAGES) {
      setTimeout(() => {
        onBack();
      }, 1200);
    }
  };

  // --------------------------------------------------
  // SHORT INTRODUCTION
  // --------------------------------------------------

  if (showInstructions) {
    return (
      <div
        style={{
          minHeight: "100vh",
          width: "100%",
          background:
            "linear-gradient(135deg, #061812, #102d25, #061812)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
          boxSizing: "border-box",
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial',
          color: "#fff"
        }}
      >
        <div
          style={{
            width: "520px",
            maxWidth: "95%",
            background: "#111d2d",
            border: "1px solid #00a884",
            borderRadius: "16px",
            padding: "30px",
            boxShadow: "0 0 30px rgba(0,168,132,.2)"
          }}
        >
          <div
            style={{
              textAlign: "center",
              fontSize: "50px",
              marginBottom: "8px"
            }}
          >
            💬
          </div>

          <h1
            style={{
              textAlign: "center",
              color: "#00a884",
              fontSize: "24px",
              margin: "0 0 12px"
            }}
          >
            WHATSAPP THREAT DETECTION
          </h1>

          <p
            style={{
              textAlign: "center",
              color: "#aebac1",
              fontSize: "14px",
              lineHeight: "1.5",
              marginBottom: "20px"
            }}
          >
            Check each message and decide whether it is{" "}
            <strong>REAL</strong> or a <strong>SCAM</strong>.
          </p>

          <div
            style={{
              background: "#18283b",
              borderRadius: "10px",
              padding: "16px",
              color: "#d7e0e5",
              fontSize: "14px",
              lineHeight: "1.7"
            }}
          >
            <strong style={{ color: "#80cbc4" }}>
              🔎 Look for:
            </strong>

            <ul
              style={{
                margin: "8px 0 0",
                paddingLeft: "20px"
              }}
            >
              <li>Suspicious links or requests</li>
              <li>OTP/password requests</li>
              <li>Urgent or threatening messages</li>
              <li>Unexpected payment or prize offers</li>
            </ul>
          </div>

          <div
            style={{
              background: "#12372f",
              borderRadius: "10px",
              padding: "14px",
              marginTop: "15px",
              color: "#80cbc4",
              textAlign: "center",
              fontSize: "14px"
            }}
          >
            🎯 Correctly detect <strong>3 messages</strong>{" "}
            to complete the challenge.
          </div>

          <div
            style={{
              textAlign: "center",
              marginTop: "24px"
            }}
          >
            <button
              onClick={onBack}
              style={{
                padding: "10px 22px",
                marginRight: "10px",
                border: "1px solid #777",
                borderRadius: "8px",
                background: "transparent",
                color: "#fff",
                cursor: "pointer"
              }}
            >
              ← BACK
            </button>

            <button
              onClick={() => setShowInstructions(false)}
              style={{
                padding: "10px 25px",
                border: "none",
                borderRadius: "8px",
                background: "#00a884",
                color: "#fff",
                fontWeight: "bold",
                cursor: "pointer"
              }}
            >
              START DETECTION →
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --------------------------------------------------
  // MAIN WHATSAPP
  // --------------------------------------------------

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        width: "100%",
        background: "#111b21",
        color: "#e9edef",
        overflow: "hidden",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial'
      }}
    >
      {/* ------------------------------------------------
          SIDEBAR
      ------------------------------------------------ */}

      <div
        style={{
          width: "350px",
          minWidth: "300px",
          borderRight: "1px solid #222d34",
          display: "flex",
          flexDirection: "column",
          background: "#111b21"
        }}
      >
        {/* HEADER */}

        <div
          style={{
            height: "60px",
            background: "#202c33",
            display: "flex",
            alignItems: "center",
            padding: "0 15px",
            boxSizing: "border-box"
          }}
        >
          <button
            onClick={onBack}
            style={{
              background: "none",
              border: "none",
              color: "#fff",
              fontSize: "21px",
              cursor: "pointer"
            }}
          >
            ←
          </button>

          <span
            style={{
              marginLeft: "15px",
              fontWeight: "bold",
              fontSize: "17px"
            }}
          >
            WhatsApp
          </span>
        </div>

        {/* COUNTER */}

        <div
          style={{
            padding: "12px 15px",
            background: "#182229",
            color: "#80cbc4",
            fontWeight: "bold",
            fontSize: "13px"
          }}
        >
          THREATS DETECTED:{" "}
          {Math.min(verifiedCount, REQUIRED_MESSAGES)}
          /{REQUIRED_MESSAGES}
        </div>

        {/* SEARCH */}

        <div
          style={{
            padding: "10px",
            background: "#111b21"
          }}
        >
          <input
            type="text"
            placeholder="Search chats"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: "100%",
              boxSizing: "border-box",
              background: "#202c33",
              border: "none",
              borderRadius: "8px",
              padding: "10px 13px",
              color: "#fff",
              outline: "none",
              fontSize: "14px"
            }}
          />
        </div>

        {/* CONTACTS */}

        <div
          style={{
            flex: 1,
            overflowY: "auto"
          }}
        >
          {filteredContacts.map((contact) => {
            const solved = verifiedMessageIds.has(contact.id);

            const lastMessage =
              contact.history?.[
                contact.history.length - 1
              ]?.text || "";

            return (
              <div
                key={contact.id}
                onClick={() => openContact(contact)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "12px",
                  borderBottom: "1px solid #222d34",
                  cursor: solved ? "default" : "pointer",
                  background:
                    selectedContact?.id === contact.id
                      ? "#2a3942"
                      : solved
                      ? "#12372f"
                      : "transparent"
                }}
              >
                {/* AVATAR */}

                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                    background: solved
                      ? "#075e54"
                      : "#00a884",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "23px",
                    flexShrink: 0
                  }}
                >
                  {solved ? "✅" : contact.avatar}
                </div>

                {/* CONTACT INFO */}

                <div
                  style={{
                    marginLeft: "12px",
                    flex: 1,
                    overflow: "hidden"
                  }}
                >
                  <div
                    style={{
                      fontWeight: "500",
                      marginBottom: "4px"
                    }}
                  >
                    {contact.name}
                  </div>

                  <div
                    style={{
                      color: "#8696a0",
                      fontSize: "13px",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis"
                    }}
                  >
                    {lastMessage}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ------------------------------------------------
          CHAT AREA
      ------------------------------------------------ */}

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          background: "#0b141a"
        }}
      >
        {!selectedContact ? (
          /* EMPTY CHAT */

          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#222e35"
            }}
          >
            <div
              style={{
                textAlign: "center",
                color: "#8696a0"
              }}
            >
              <div
                style={{
                  fontSize: "80px",
                  marginBottom: "10px"
                }}
              >
                💬
              </div>

              <h2
                style={{
                  color: "#e9edef",
                  fontWeight: "normal"
                }}
              >
                WhatsApp Threat Detection
              </h2>

              <p>
                Select a conversation to analyze the message.
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* CHAT HEADER */}

            <div
              style={{
                height: "60px",
                background: "#202c33",
                display: "flex",
                alignItems: "center",
                padding: "0 18px",
                boxSizing: "border-box"
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  background: "#00a884",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "20px"
                }}
              >
                {selectedContact.avatar}
              </div>

              <div
                style={{
                  marginLeft: "12px"
                }}
              >
                <div style={{ fontWeight: "500" }}>
                  {selectedContact.name}
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

            {/* MESSAGES */}

            <div
              style={{
                flex: 1,
                overflowY: "auto",
                padding: "30px",
                background: "#0b141a"
              }}
            >
              {selectedContact.history?.map(
                (message, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      justifyContent:
                        message.sender === "me"
                          ? "flex-end"
                          : "flex-start",
                      marginBottom: "10px"
                    }}
                  >
                    <div
                      style={{
                        maxWidth: "65%",
                        background:
                          message.sender === "me"
                            ? "#005c4b"
                            : "#202c33",
                        padding: "10px 14px",
                        borderRadius:
                          message.sender === "me"
                            ? "8px 0 8px 8px"
                            : "0 8px 8px 8px",
                        color: "#e9edef",
                        fontSize: "14px",
                        lineHeight: "1.5"
                      }}
                    >
                      {message.text}
                    </div>
                  </div>
                )
              )}

              {/* DETECTION */}

              {!feedback && (
                <div
                  style={{
                    marginTop: "30px",
                    background: "#182229",
                    border: "1px solid #304047",
                    borderRadius: "12px",
                    padding: "20px",
                    maxWidth: "600px",
                    marginLeft: "auto",
                    marginRight: "auto",
                    textAlign: "center"
                  }}
                >
                  <div
                    style={{
                      color: "#80cbc4",
                      fontWeight: "bold",
                      marginBottom: "8px"
                    }}
                  >
                    🔍 THREAT DETECTION
                  </div>

                  <p
                    style={{
                      color: "#aebac1",
                      fontSize: "14px"
                    }}
                  >
                    Is this message REAL or a SCAM?
                  </p>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      gap: "15px",
                      marginTop: "15px"
                    }}
                  >
                    <button
                      onClick={() => handleDetection(true)}
                      style={{
                        background: "#00a884",
                        color: "#fff",
                        border: "none",
                        borderRadius: "7px",
                        padding: "11px 35px",
                        fontWeight: "bold",
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
                        borderRadius: "7px",
                        padding: "11px 35px",
                        fontWeight: "bold",
                        cursor: "pointer"
                      }}
                    >
                      ⚠ SCAM
                    </button>
                  </div>
                </div>
              )}

              {/* FEEDBACK */}

              {feedback && (
                <div
                  style={{
                    marginTop: "30px",
                    background:
                      feedback.type === "correct"
                        ? "#12372f"
                        : "#3a2020",
                    border:
                      feedback.type === "correct"
                        ? "1px solid #00a884"
                        : "1px solid #d93025",
                    borderRadius: "12px",
                    padding: "22px",
                    maxWidth: "600px",
                    marginLeft: "auto",
                    marginRight: "auto"
                  }}
                >
                  <h3
                    style={{
                      marginTop: 0,
                      color:
                        feedback.type === "correct"
                          ? "#80cbc4"
                          : "#ff8a80"
                    }}
                  >
                    {feedback.message}
                  </h3>

                  <p
                    style={{
                      color: "#d7e0e5",
                      lineHeight: "1.6",
                      fontSize: "14px"
                    }}
                  >
                    {feedback.explanation}
                  </p>

                  {/* PREVENTION FOR SCAM */}

                  {selectedContact.isReal === false && (
                    <div
                      style={{
                        marginTop: "18px",
                        background: "#202c33",
                        borderRadius: "10px",
                        padding: "16px"
                      }}
                    >
                      <h4
                        style={{
                          color: "#ffcc80",
                          marginTop: 0
                        }}
                      >
                        🛡️ Prevent this scam
                      </h4>

                      <ul
                        style={{
                          color: "#d7e0e5",
                          lineHeight: "1.6",
                          paddingLeft: "20px",
                          marginBottom: 0
                        }}
                      >
                        <li>
                          Never share OTPs, passwords, or PINs.
                        </li>
                        <li>
                          Do not click suspicious links.
                        </li>
                        <li>
                          Never send money because of an
                          unexpected message.
                        </li>
                        <li>
                          Verify the sender through an
                          official channel.
                        </li>
                        <li>
                          Block and report suspicious contacts.
                        </li>
                      </ul>
                    </div>
                  )}

                  {/* NEXT BUTTON */}

                  {verifiedCount + 1 < REQUIRED_MESSAGES && (
                    <div
                      style={{
                        textAlign: "right",
                        marginTop: "20px"
                      }}
                    >
                      <button
                        onClick={() => {
                          setSelectedContact(null);
                          setFeedback(null);
                        }}
                        style={{
                          background: "#00a884",
                          color: "#fff",
                          border: "none",
                          borderRadius: "18px",
                          padding: "9px 22px",
                          cursor: "pointer",
                          fontWeight: "bold"
                        }}
                      >
                        BACK TO CHATS
                      </button>
                    </div>
                  )}

                  {verifiedCount + 1 >= REQUIRED_MESSAGES && (
                    <div
                      style={{
                        textAlign: "center",
                        marginTop: "20px",
                        color: "#80cbc4",
                        fontWeight: "bold"
                      }}
                    >
                      🎉 Challenge complete! Returning to
                      Levels...
                    </div>
                  )}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MessagesApp;
