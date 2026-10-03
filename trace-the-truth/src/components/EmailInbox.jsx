import React, { useState, useMemo, useEffect, useRef } from 'react';
import EmailViewer from './EmailViewer';
import { sampleEmails, shuffleArray } from '../GameLogic';

const EmailInbox = ({ onBack, onSolve }) => {
  // ============================================================
  // GAME STATE
  // ============================================================

  // Instructions are shown ONLY ONCE when entering the email game.
  const [showInstructions, setShowInstructions] = useState(true);

  const [emails] = useState(() => shuffleArray(sampleEmails));
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [sidebarActive, setSidebarActive] = useState('inbox');

  const [correctDetections, setCorrectDetections] = useState(0);
  const [completed, setCompleted] = useState(false);

  const searchInputRef = useRef(null);

  // ONLY 3 CORRECT EMAILS ARE REQUIRED
  const REQUIRED_DETECTIONS = 3;

  // ============================================================
  // EMAIL SOLVED
  // ============================================================

  const handleEmailSolved = () => {
    setCorrectDetections(prev => {
      // Prevent counting beyond the required number.
      if (prev >= REQUIRED_DETECTIONS) {
        return prev;
      }

      const newCount = prev + 1;

      console.log(
        `Correct email detections: ${newCount}/${REQUIRED_DETECTIONS}`
      );

      if (newCount >= REQUIRED_DETECTIONS) {
        setCompleted(true);

        if (onSolve) {
          onSolve();
        }
      }

      return newCount;
    });
  };

  // ============================================================
  // KEYBOARD SHORTCUTS
  // ============================================================

  useEffect(() => {
    const handleKeyDown = e => {
      if (
        e.target.tagName === 'INPUT' ||
        e.target.tagName === 'TEXTAREA'
      ) {
        return;
      }

      if (e.key === 'c') {
        e.preventDefault();
        setIsComposeOpen(true);
      } else if (e.key === '/') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // ============================================================
  // SEARCH
  // ============================================================

  const filteredEmails = useMemo(() => {
    const query = searchQuery.toLowerCase();

    return emails.filter(email =>
      email.sender.toLowerCase().includes(query) ||
      email.subject.toLowerCase().includes(query) ||
      email.preview.toLowerCase().includes(query)
    );
  }, [emails, searchQuery]);

  // ============================================================
  // SELECT EMAILS
  // ============================================================

  const toggleSelectAll = () => {
    if (
      selectedIds.size === filteredEmails.length &&
      filteredEmails.length > 0
    ) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(
        new Set(filteredEmails.map(email => email.id))
      );
    }
  };

  const toggleSelect = (id, e) => {
    e.stopPropagation();

    const newIds = new Set(selectedIds);

    if (newIds.has(id)) {
      newIds.delete(id);
    } else {
      newIds.add(id);
    }

    setSelectedIds(newIds);
  };

  // ============================================================
  // BULK ACTIONS
  // ============================================================

  const handleBulkAction = action => {
    if (action === 'delete') {
      setSelectedIds(new Set());
    }
  };

  // ============================================================
  // SIDEBAR
  // ============================================================

  const menuItems = [
    { id: 'inbox', icon: '📥', label: 'Inbox' },
    { id: 'starred', icon: '⭐', label: 'Starred' },
    { id: 'snoozed', icon: '⏰', label: 'Snoozed' },
    { id: 'sent', icon: '📤', label: 'Sent' },
    { id: 'drafts', icon: '📝', label: 'Drafts' },
    { id: 'spam', icon: '⚠️', label: 'Spam' },
    { id: 'trash', icon: '🗑️', label: 'Trash' }
  ];

  // ============================================================
  // INSTRUCTIONS
  // IMPORTANT:
  // This is the ONLY place where the instructions are shown.
  // EmailViewer.jsx does NOT show them.
  // ============================================================

  if (showInstructions) {
    return (
      <div
        style={{
          height: '100%',
          width: '100%',
          background:
            'linear-gradient(135deg, #0b1020 0%, #111827 50%, #172554 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: '"Google Sans", Roboto, Arial, sans-serif',
          color: '#fff',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '10%',
            left: '8%',
            fontSize: '80px',
            opacity: 0.04
          }}
        >
          ✉️
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: '10%',
            right: '8%',
            fontSize: '100px',
            opacity: 0.04
          }}
        >
          🔐
        </div>

        <div
          style={{
            width: 'min(620px, 90%)',
            maxHeight: '90%',
            overflowY: 'auto',
            backgroundColor: 'rgba(255,255,255,0.97)',
            color: '#202124',
            borderRadius: '20px',
            padding: '36px',
            boxSizing: 'border-box',
            boxShadow: '0 20px 60px rgba(0,0,0,0.45)',
            position: 'relative'
          }}
        >
          <div
            style={{
              display: 'inline-block',
              backgroundColor: '#e8f0fe',
              color: '#1967d2',
              padding: '6px 14px',
              borderRadius: '20px',
              fontSize: '13px',
              fontWeight: 'bold',
              marginBottom: '14px'
            }}
          >
            LEVEL 1 • EMAIL DETECTION
          </div>

          <h1
            style={{
              margin: '0 0 10px',
              fontSize: '30px',
              color: '#202124'
            }}
          >
            🔍 Email Threat Detection
          </h1>

          <p
            style={{
              fontSize: '15px',
              color: '#5f6368',
              lineHeight: '1.6',
              marginBottom: '20px'
            }}
          >
            Your task is to identify whether an email is{' '}
            <strong>REAL</strong> or a <strong>SCAM</strong>.
          </p>

          <div
            style={{
              backgroundColor: '#f8fafd',
              border: '1px solid #dadce0',
              borderRadius: '12px',
              padding: '18px',
              marginBottom: '20px'
            }}
          >
            <h3
              style={{
                margin: '0 0 10px',
                fontSize: '16px',
                color: '#202124'
              }}
            >
              📋 Look for these warning signs
            </h3>

            <ul
              style={{
                margin: 0,
                paddingLeft: '22px',
                color: '#5f6368',
                lineHeight: '1.7',
                fontSize: '14px'
              }}
            >
              <li>Suspicious sender addresses or domains</li>
              <li>Urgent or threatening language</li>
              <li>Unexpected links or attachments</li>
              <li>Requests for passwords, OTPs or personal information</li>
              <li>Spelling, grammar or branding inconsistencies</li>
            </ul>
          </div>

          <div
            style={{
              backgroundColor: '#e6f4ea',
              border: '1px solid #34a853',
              borderRadius: '12px',
              padding: '16px',
              marginBottom: '24px'
            }}
          >
            <div
              style={{
                fontWeight: 'bold',
                color: '#137333',
                marginBottom: '5px'
              }}
            >
              🎯 YOUR OBJECTIVE
            </div>

            <div
              style={{
                color: '#3c4043',
                fontSize: '14px',
                lineHeight: '1.5'
              }}
            >
              Correctly identify <strong>3 emails</strong> to complete
              the email detection challenge.
              <br />
              You do <strong>NOT</strong> need to check every email.
            </div>
          </div>

          <button
            onClick={() => setShowInstructions(false)}
            style={{
              width: '100%',
              border: 'none',
              borderRadius: '24px',
              padding: '13px 24px',
              backgroundColor: '#1a73e8',
              color: '#fff',
              fontSize: '15px',
              fontWeight: 'bold',
              cursor: 'pointer',
              boxShadow: '0 2px 5px rgba(26,115,232,0.35)'
            }}
          >
            START EMAIL DETECTION →
          </button>

          <button
            onClick={onBack}
            style={{
              width: '100%',
              marginTop: '10px',
              border: 'none',
              background: 'transparent',
              color: '#5f6368',
              padding: '10px',
              fontSize: '14px',
              cursor: 'pointer'
            }}
          >
            ← Back to Level Map
          </button>
        </div>
      </div>
    );
  }

  // ============================================================
  // EMAIL VIEWER
  // ============================================================

  if (selectedEmail) {
    return (
      <EmailViewer
        email={selectedEmail}
        onBack={() => setSelectedEmail(null)}
        onSolve={handleEmailSolved}
      />
    );
  }

  // ============================================================
  // COMPLETION
  // ============================================================

  if (completed) {
    return (
      <div
        style={{
          height: '100%',
          width: '100%',
          background: 'linear-gradient(135deg, #06140c, #0b3d20)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontFamily: '"Google Sans", Roboto, Arial, sans-serif'
        }}
      >
        <div
          style={{
            textAlign: 'center',
            backgroundColor: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(52,168,83,0.5)',
            borderRadius: '20px',
            padding: '45px',
            width: 'min(500px, 90%)',
            boxShadow: '0 0 40px rgba(52,168,83,0.2)'
          }}
        >
          <div
            style={{
              fontSize: '70px',
              marginBottom: '15px'
            }}
          >
            🏆
          </div>

          <h1
            style={{
              color: '#34a853',
              margin: '0 0 12px',
              fontSize: '30px'
            }}
          >
            EMAIL DETECTION COMPLETE
          </h1>

          <p
            style={{
              color: '#d7f5df',
              fontSize: '16px',
              lineHeight: '1.6'
            }}
          >
            You correctly detected 3 emails.
            <br />
            The email investigation is complete.
          </p>

          <button
            onClick={onBack}
            style={{
              marginTop: '20px',
              backgroundColor: '#34a853',
              color: '#fff',
              border: 'none',
              borderRadius: '22px',
              padding: '12px 28px',
              fontSize: '15px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            RETURN TO LEVEL MAP
          </button>
        </div>
      </div>
    );
  }

  // ============================================================
  // ORIGINAL GMAIL INBOX UI
  // ============================================================

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
      {/* Top Navbar */}
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

        <div
          style={{
            flex: 1,
            maxWidth: '720px',
            backgroundColor: '#f1f3f4',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            padding: '0 16px',
            height: '48px',
            border: '1px solid transparent'
          }}
          className="search-box"
        >
          <span
            style={{
              color: '#5f6368',
              fontSize: '20px',
              marginRight: '12px'
            }}
          >
            🔍
          </span>

          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search mail (press / to focus)"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            style={{
              border: 'none',
              background: 'transparent',
              outline: 'none',
              fontSize: '16px',
              width: '100%',
              color: '#202124'
            }}
          />
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            flex: 1,
            paddingRight: '12px',
            gap: '8px'
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
              fontSize: '14px',
              marginLeft: '8px'
            }}
          >
            U
          </div>
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          flex: 1,
          overflow: 'hidden'
        }}
      >
        {/* Left Sidebar */}
        <div
          style={{
            width: '256px',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#f6f8fc',
            paddingRight: '16px',
            boxSizing: 'border-box'
          }}
        >
          <div
            style={{
              padding: '16px 8px 16px 16px'
            }}
          >
            <button
              onClick={() => setIsComposeOpen(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                backgroundColor: '#c2e7ff',
                color: '#001d35',
                border: 'none',
                borderRadius: '16px',
                padding: '16px 24px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                boxShadow: '0 1px 2px rgba(60,64,67,0.3)'
              }}
              className="compose-btn"
            >
              <span style={{ fontSize: '20px' }}>✏️</span>
              Compose
            </button>
          </div>

          <div
            style={{
              flex: 1,
              overflowY: 'auto'
            }}
          >
            {menuItems.map(item => (
              <div
                key={item.id}
                onClick={() => setSidebarActive(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0 12px 0 26px',
                  height: '32px',
                  cursor: 'pointer',
                  backgroundColor:
                    sidebarActive === item.id
                      ? '#d3e3fd'
                      : 'transparent',
                  color:
                    sidebarActive === item.id
                      ? '#041e49'
                      : '#202124',
                  borderTopRightRadius: '16px',
                  borderBottomRightRadius: '16px',
                  marginRight: '16px',
                  fontSize: '14px',
                  fontWeight:
                    sidebarActive === item.id ? 'bold' : 'normal'
                }}
                className="sidebar-item"
              >
                <span
                  style={{
                    width: '24px',
                    marginRight: '18px',
                    textAlign: 'center',
                    fontSize: '16px'
                  }}
                >
                  {item.icon}
                </span>

                {item.label}
              </div>
            ))}

            <div
              style={{
                margin: '16px 0',
                borderTop: '1px solid #dadce0'
              }}
            />

            <div
              style={{
                padding: '0 26px',
                color: '#5f6368',
                fontSize: '14px',
                fontWeight: '500',
                marginBottom: '8px'
              }}
            >
              Labels
            </div>

            <div
              className="sidebar-item"
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '0 12px 0 26px',
                height: '32px',
                cursor: 'pointer',
                color: '#202124',
                fontSize: '14px'
              }}
            >
              <span
                style={{
                  width: '24px',
                  marginRight: '18px'
                }}
              >
                🏷️
              </span>
              Work
            </div>

            <div
              className="sidebar-item"
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '0 12px 0 26px',
                height: '32px',
                cursor: 'pointer',
                color: '#202124',
                fontSize: '14px'
              }}
            >
              <span
                style={{
                  width: '24px',
                  marginRight: '18px'
                }}
              >
                🏷️
              </span>
              Personal
            </div>
          </div>
        </div>

        {/* Email List */}
        <div
          style={{
            flex: 1,
            backgroundColor: '#fff',
            borderRadius: '16px',
            margin: '0 16px 16px 0',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            boxShadow: '0 1px 2px rgba(60,64,67,0.3)'
          }}
        >
          {/* Progress */}
          <div
            style={{
              padding: '8px 16px',
              backgroundColor: '#e8f0fe',
              color: '#174ea6',
              fontSize: '13px',
              fontWeight: 'bold',
              borderBottom: '1px solid #d2e3fc'
            }}
          >
            🔍 EMAIL DETECTION PROGRESS:{' '}
            {correctDetections}/{REQUIRED_DETECTIONS}

            <span
              style={{
                marginLeft: '12px',
                fontWeight: 'normal'
              }}
            >
              Correctly identify 3 emails to complete this challenge.
            </span>
          </div>

          {/* List Toolbar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '8px 16px',
              borderBottom: '1px solid #e0e0e0',
              height: '48px',
              boxSizing: 'border-box'
            }}
          >
            <input
              type="checkbox"
              checked={
                selectedIds.size === filteredEmails.length &&
                filteredEmails.length > 0
              }
              onChange={toggleSelectAll}
              style={{
                marginRight: '16px',
                cursor: 'pointer',
                width: '16px',
                height: '16px'
              }}
            />

            <button
              className="icon-btn"
              style={{
                fontSize: '14px',
                marginRight: '8px'
              }}
            >
              ↻
            </button>

            <button
              className="icon-btn"
              style={{ fontSize: '14px' }}
            >
              ⋮
            </button>

            {selectedIds.size > 0 && (
              <div
                style={{
                  display: 'flex',
                  marginLeft: '16px',
                  paddingLeft: '16px',
                  borderLeft: '1px solid #e0e0e0',
                  gap: '8px'
                }}
              >
                <button
                  className="icon-btn"
                  title="Archive"
                  onClick={() => handleBulkAction('archive')}
                >
                  📥
                </button>

                <button
                  className="icon-btn"
                  title="Report spam"
                >
                  ⚠️
                </button>

                <button
                  className="icon-btn"
                  title="Delete"
                  onClick={() => handleBulkAction('delete')}
                >
                  🗑️
                </button>

                <button
                  className="icon-btn"
                  title="Mark as read"
                >
                  ✉️
                </button>
              </div>
            )}
          </div>

          {/* Email Rows */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto'
            }}
          >
            {filteredEmails.map(email => {
              const checked = selectedIds.has(email.id);

              return (
                <div
                  key={email.id}
                  onClick={() => setSelectedEmail(email)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 16px',
                    height: '40px',
                    borderBottom: '1px solid #e0e0e0',
                    backgroundColor: checked
                      ? '#c2e7ff'
                      : '#fff',
                    cursor: 'pointer',
                    fontSize: '14px',
                    boxShadow: checked
                      ? 'inset 1px 0 0 #0b57d0'
                      : 'none'
                  }}
                  className="email-row"
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      width: '64px',
                      flexShrink: 0
                    }}
                    onClick={e => e.stopPropagation()}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={e =>
                        toggleSelect(email.id, e)
                      }
                      style={{
                        marginRight: '16px',
                        cursor: 'pointer',
                        width: '16px',
                        height: '16px'
                      }}
                    />

                    <span
                      style={{
                        color: '#ccc',
                        cursor: 'pointer',
                        fontSize: '18px'
                      }}
                      className="star-icon"
                    >
                      ☆
                    </span>
                  </div>

                  <div
                    style={{
                      width: '168px',
                      fontWeight: 'bold',
                      color: '#202124',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      paddingRight: '16px'
                    }}
                  >
                    {email.sender}
                  </div>

                  <div
                    style={{
                      flex: 1,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      color: '#202124',
                      display: 'flex'
                    }}
                  >
                    <span
                      style={{
                        fontWeight: 'bold',
                        marginRight: '8px'
                      }}
                    >
                      {email.subject}
                    </span>

                    <span
                      style={{
                        color: '#5f6368'
                      }}
                    >
                      - {email.preview}
                    </span>
                  </div>

                  <div
                    style={{
                      width: '80px',
                      textAlign: 'right',
                      color: '#5f6368',
                      fontSize: '12px',
                      fontWeight: 'bold'
                    }}
                    className="email-time"
                  >
                    {email.time}
                  </div>

                  <div
                    className="email-actions"
                    style={{
                      display: 'none',
                      width: '80px',
                      justifyContent: 'flex-end',
                      gap: '8px'
                    }}
                  >
                    <span
                      title="Archive"
                      style={{ cursor: 'pointer' }}
                    >
                      📥
                    </span>

                    <span
                      title="Delete"
                      style={{ cursor: 'pointer' }}
                    >
                      🗑️
                    </span>

                    <span
                      title="Mark as read"
                      style={{ cursor: 'pointer' }}
                    >
                      ✉️
                    </span>
                  </div>
                </div>
              );
            })}

            {filteredEmails.length === 0 && (
              <div
                style={{
                  padding: '32px',
                  textAlign: 'center',
                  color: '#5f6368'
                }}
              >
                No emails found matching your search.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Compose Modal */}
      {isComposeOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: 0,
            right: '72px',
            width: '500px',
            height: '500px',
            backgroundColor: '#fff',
            borderTopLeftRadius: '8px',
            borderTopRightRadius: '8px',
            boxShadow: '0 8px 10px rgba(0,0,0,0.14)',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 1000
          }}
        >
          <div
            style={{
              backgroundColor: '#f2f6fc',
              padding: '10px 16px',
              borderTopLeftRadius: '8px',
              borderTopRightRadius: '8px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              color: '#041e49',
              fontWeight: 'bold',
              fontSize: '14px'
            }}
          >
            <span>New Message</span>

            <span
              style={{ cursor: 'pointer' }}
              onClick={() => setIsComposeOpen(false)}
            >
              ✖
            </span>
          </div>

          <div
            style={{
              padding: 0,
              display: 'flex',
              flexDirection: 'column',
              flex: 1
            }}
          >
            <div
              style={{
                borderBottom: '1px solid #f1f3f4',
                display: 'flex',
                alignItems: 'center',
                padding: '0 16px'
              }}
            >
              <span
                style={{
                  color: '#5f6368',
                  fontSize: '14px',
                  marginRight: '8px'
                }}
              >
                To
              </span>

              <input
                type="text"
                style={{
                  flex: 1,
                  border: 'none',
                  outline: 'none',
                  height: '36px',
                  fontSize: '14px'
                }}
              />
            </div>

            <div
              style={{
                borderBottom: '1px solid #f1f3f4',
                padding: '0 16px'
              }}
            >
              <input
                type="text"
                placeholder="Subject"
                style={{
                  width: '100%',
                  border: 'none',
                  outline: 'none',
                  height: '36px',
                  fontSize: '14px'
                }}
              />
            </div>

            <textarea
              style={{
                flex: 1,
                border: 'none',
                outline: 'none',
                resize: 'none',
                padding: '16px',
                fontSize: '14px'
              }}
            />
          </div>

          <div
            style={{
              padding: '12px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              borderTop: '1px solid #f1f3f4'
            }}
          >
            <button
              onClick={() => setIsComposeOpen(false)}
              style={{
                backgroundColor: '#0b57d0',
                color: '#fff',
                border: 'none',
                borderRadius: '18px',
                padding: '8px 24px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer'
              }}
            >
              Send
            </button>

            <span>A_</span>
            <span>📎</span>
            <span>🔗</span>
            <span>😀</span>

            <div style={{ flex: 1 }} />

            <span
              style={{ cursor: 'pointer' }}
              onClick={() => setIsComposeOpen(false)}
            >
              🗑️
            </span>
          </div>
        </div>
      )}

      <style
        dangerouslySetInnerHTML={{
          __html: `
            .search-box:focus-within {
              background-color: #fff !important;
              box-shadow:
                0 1px 1px 0 rgba(65,69,73,0.3),
                0 1px 3px 1px rgba(65,69,73,0.15);
            }

            .icon-btn {
              width: 40px;
              height: 40px;
              border-radius: 50%;
              border: none;
              background: transparent;
              color: #5f6368;
              font-size: 20px;
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

            .compose-btn:hover {
              box-shadow:
                0 1px 3px 0 rgba(60,64,67,0.3),
                0 4px 8px 3px rgba(60,64,67,0.15) !important;
            }

            .sidebar-item:hover {
              background-color: rgba(60,64,67,0.08) !important;
            }

            .email-row:hover {
              box-shadow:
                inset 1px 0 0 #dadce0,
                inset -1px 0 0 #dadce0,
                0 1px 2px 0 rgba(60,64,67,0.3),
                0 1px 3px 1px rgba(60,64,67,0.15) !important;
              z-index: 1;
            }

            .email-row:hover .email-time {
              display: none !important;
            }

            .email-row:hover .email-actions {
              display: flex !important;
            }

            .star-icon:hover {
              color: #f4b400 !important;
            }
          `
        }}
      />
    </div>
  );
};

export default EmailInbox;
