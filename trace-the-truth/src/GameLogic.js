// src/GameLogic.js

// ============================================================
// Utility
// ============================================================

export const shuffleArray = (array) => {
  return [...array].sort(() => Math.random() - 0.5);
};

// ============================================================
// LEVEL 1 - EMAILS
// ============================================================

export const sampleEmails = [
  {
    id: 1,
    sender: "security@paypa1-alert.com",
    subject: "URGENT: Your account will be suspended",
    preview: "Verify your account immediately to avoid suspension...",
    time: "10:42 AM",
    isReal: false,
    explanation:
      "This is a phishing email. The sender uses a suspicious domain that imitates PayPal. Legitimate services normally use their official domain."
  },

  {
    id: 2,
    sender: "hr@company.com",
    subject: "Annual employee benefits update",
    preview: "Please review the updated employee benefits information...",
    time: "9:35 AM",
    isReal: true,
    explanation:
      "This email comes from a legitimate company domain and does not request suspicious credentials or urgent payments."
  },

  {
    id: 3,
    sender: "support@micros0ft-security.com",
    subject: "Your Microsoft account has been compromised",
    preview: "Click here immediately to secure your account...",
    time: "9:12 AM",
    isReal: false,
    explanation:
      "The domain contains a deceptive spelling. Attackers often replace letters with numbers to imitate trusted brands."
  },

  {
    id: 4,
    sender: "newsletter@technews.com",
    subject: "Weekly Technology Newsletter",
    preview: "Here are this week's biggest technology stories...",
    time: "8:50 AM",
    isReal: true,
    explanation:
      "This is a normal informational newsletter and does not contain obvious phishing indicators."
  },

  {
    id: 5,
    sender: "bank-alert@secure-banking-login.net",
    subject: "Unusual login detected",
    preview: "Confirm your identity within 24 hours...",
    time: "8:20 AM",
    isReal: false,
    explanation:
      "The sender domain is not the official banking domain and creates urgency to make the user act without checking."
  },

  {
    id: 6,
    sender: "professor@university.edu",
    subject: "Assignment submission reminder",
    preview: "Reminder that your assignment is due Friday...",
    time: "Yesterday",
    isReal: true,
    explanation:
      "The message comes from a recognizable institutional domain and does not request sensitive information."
  },

  {
    id: 7,
    sender: "amazon-prize@winner-rewards.xyz",
    subject: "Congratulations! You won a prize",
    preview: "Claim your reward before it expires...",
    time: "Yesterday",
    isReal: false,
    explanation:
      "Unexpected prize messages are a common phishing tactic, especially when they ask users to click unfamiliar links."
  },

  {
    id: 8,
    sender: "github-noreply@github.com",
    subject: "Your security settings were updated",
    preview: "Your account security settings were recently changed...",
    time: "Yesterday",
    isReal: true,
    explanation:
      "The sender uses the official GitHub domain and the message describes a normal account-security notification."
  },

  {
    id: 9,
    sender: "delivery@fast-shipping.co",
    subject: "Package delivery failed",
    preview: "Pay a small redelivery fee to receive your package...",
    time: "Monday",
    isReal: false,
    explanation:
      "Requests for unexpected small payments through unfamiliar domains are common delivery scams."
  },

  {
    id: 10,
    sender: "calendar@company.com",
    subject: "Team meeting scheduled",
    preview: "A new team meeting has been added to your calendar...",
    time: "Monday",
    isReal: true,
    explanation:
      "This is a normal workplace notification from the company's domain."
  }
];

// ============================================================
// LEVEL 1 - MESSAGES
// ============================================================

export const contacts = [
  {
    id: 1,
    name: "Alex",
    avatar: "👨",
    isReal: true,
    history: [
      {
        sender: "them",
        text: "Hey! Are we still meeting at 5 PM?"
      },
      {
        sender: "them",
        text: "Let me know if anything changes."
      }
    ],
    explanation:
      "This conversation does not contain suspicious requests, links, credentials, or payment demands."
  },

  {
    id: 2,
    name: "Bank Support",
    avatar: "🏦",
    isReal: false,
    history: [
      {
        sender: "them",
        text: "URGENT! Your bank account has been temporarily locked."
      },
      {
        sender: "them",
        text: "Send your OTP immediately to restore access."
      }
    ],
    explanation:
      "Banks should never ask you to send an OTP through a chat message. This is a scam."
  },

  {
    id: 3,
    name: "Mom",
    avatar: "👩",
    isReal: true,
    history: [
      {
        sender: "them",
        text: "Don't forget to bring your umbrella."
      },
      {
        sender: "them",
        text: "It looks like it might rain today."
      }
    ],
    explanation:
      "This is an ordinary personal conversation with no suspicious request."
  },

  {
    id: 4,
    name: "Free Prize",
    avatar: "🎁",
    isReal: false,
    history: [
      {
        sender: "them",
        text: "Congratulations! You have won ₹50,000!"
      },
      {
        sender: "them",
        text: "Send ₹500 processing fee to claim your prize."
      }
    ],
    explanation:
      "Unexpected prizes that require an upfront payment are a common scam."
  },

  {
    id: 5,
    name: "College Group",
    avatar: "🎓",
    isReal: true,
    history: [
      {
        sender: "them",
        text: "The project presentation is tomorrow."
      },
      {
        sender: "them",
        text: "Don't forget to bring your slides."
      }
    ],
    explanation:
      "This is a normal group conversation without suspicious requests."
  },

  {
    id: 6,
    name: "Unknown Number",
    avatar: "📱",
    isReal: false,
    history: [
      {
        sender: "them",
        text: "Your account will be deleted today."
      },
      {
        sender: "them",
        text: "Click this link and enter your password to prevent deletion."
      }
    ],
    explanation:
      "Threatening immediate account deletion and requesting a password through an unknown contact are strong scam indicators."
  },

  {
    id: 7,
    name: "Friend",
    avatar: "🧑",
    isReal: true,
    history: [
      {
        sender: "them",
        text: "Are you coming to the movie tonight?"
      },
      {
        sender: "them",
        text: "I'll book the tickets if you're coming."
      }
    ],
    explanation:
      "This is a normal conversation and does not contain obvious social-engineering indicators."
  },

  {
    id: 8,
    name: "Delivery Service",
    avatar: "📦",
    isReal: false,
    history: [
      {
        sender: "them",
        text: "Your package is waiting."
      },
      {
        sender: "them",
        text: "Pay ₹99 using this link to release the package."
      }
    ],
    explanation:
      "Unexpected payment links from an unverified delivery contact are a common phishing tactic."
  }
];

// ============================================================
// LEVEL 2 - EMOJI GAME
// ============================================================

export const emojiPuzzles = [
  {
    emoji: "🎣📧🔑",
    answer: "phishing"
  },

  {
    emoji: "🤖📱💬",
    answer: "bot"
  },

  {
    emoji: "🔒🔑",
    answer: "password"
  },

  {
    emoji: "👤🎭",
    answer: "fake identity"
  },

  {
    emoji: "🦠💻",
    answer: "malware"
  },

  {
    emoji: "🚨🔐",
    answer: "security alert"
  },

  {
    emoji: "📱👀",
    answer: "tracking"
  },

  {
    emoji: "📰❌",
    answer: "fake news"
  }
];

// ============================================================
// LEVEL 3 - QR CHALLENGE
// ============================================================

export const qrScenarios = [
  {
    id: 1,
    fakeMessage:
      "Your parcel delivery failed. Scan the QR code to update your delivery address.",
    realMessage:
      "Track your parcel using the official courier website or mobile app.",
    explanation:
      "Delivery companies should not ask you to scan random QR codes from suspicious messages. Verify delivery information through the official courier website or app."
  },

  {
    id: 2,
    fakeMessage:
      "URGENT: Your bank account will be suspended. Scan this QR code immediately to verify your account.",
    realMessage:
      "Contact your bank through its official website, app, or customer-care number.",
    explanation:
      "Banks do not ask customers to verify their accounts by scanning random QR codes from unexpected messages. Never enter banking credentials or OTPs after scanning an untrusted QR code."
  },

  {
    id: 3,
    fakeMessage:
      "Congratulations! You have won a ₹5,000 shopping voucher. Scan the QR code to claim your reward.",
    realMessage:
      "Verify the promotion through the company's official website or verified application.",
    explanation:
      "Unexpected prizes and rewards are common phishing tactics. Verify the offer independently before scanning any QR code."
  },

  {
    id: 4,
    fakeMessage:
      "Your college scholarship payment is ready. Scan this QR code to receive your money.",
    realMessage:
      "Check your scholarship status through the official government or university portal.",
    explanation:
      "Financial benefits should be verified through official portals. Do not scan QR codes sent through unknown messages to receive payments."
  },

  {
    id: 5,
    fakeMessage:
      "Free Wi-Fi available! Scan this QR code and enter your email password to connect.",
    realMessage:
      "Ask the venue staff for the official Wi-Fi network and connection instructions.",
    explanation:
      "Public QR codes can redirect users to malicious websites. Never enter your password into an unknown page opened through a QR code."
  }
];

// ============================================================
// LEVEL 3 - CIPHER GAME
// ============================================================

export const cipherChallenges = [
  {
    question: "Decode: QEB NRFZH YOLTK CLU GRJMP",
    answer: "the quick brown fox jumps",
    hint: "Try a Caesar cipher."
  },

  {
    question: "Decode: EBIL",
    answer: "evil",
    hint: "Look for a simple substitution."
  },

  {
    question: "Decode: PHVVDJH",
    answer: "message",
    hint: "Try shifting each letter."
  }
];

// ============================================================
// GENERAL GAME RULES
// ============================================================

export const emailGameRules = [
  "You must correctly identify 5 emails.",
  "Each email can be classified as REAL or SCAM.",
  "Look carefully at the sender address.",
  "Watch for suspicious links and domains.",
  "Be careful with urgent requests.",
  "Never trust requests for passwords, OTPs, or payment details.",
  "You do NOT need to check every email.",
  "After 5 correct email classifications, Level 1 email challenge is complete."
];

export const messageGameRules = [
  "You must correctly identify 5 messages.",
  "Each message can be classified as REAL or SCAM.",
  "Look for urgency and threats.",
  "Never share OTPs or passwords.",
  "Be suspicious of unexpected payment requests.",
  "Be careful with unknown contacts and links.",
  "You do NOT need to check every conversation.",
  "After 5 correct classifications, the message challenge is complete."
];

export const emojiGameRules = [
  "Decode 3 emoji clues.",
  "Enter the meaning of each clue.",
  "You need all 3 correct answers to complete the challenge.",
  "You can retry if you run out of time."
];

export const qrGameRules = [
  "Read each QR-code scenario carefully.",
  "Choose the safest response.",
  "Never scan suspicious QR codes without verifying their source.",
  "Never enter passwords, OTPs, or banking details from an untrusted QR code.",
  "Complete all scenarios to finish the challenge."
];

export const cipherGameRules = [
  "Decode the encrypted messages.",
  "Look for patterns in the letters.",
  "Use the provided hint when necessary.",
  "Enter the decoded message to continue."
];

// ============================================================
// DEFAULT EXPORT
// ============================================================

export default {
  shuffleArray,
  sampleEmails,
  contacts,
  emojiPuzzles,
  qrScenarios,
  cipherChallenges,
  emailGameRules,
  messageGameRules,
  emojiGameRules,
  qrGameRules,
  cipherGameRules
};