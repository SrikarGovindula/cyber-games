import React, { useState } from "react";

import StartScreen from "./components/StartScreen";
import LevelMap from "./components/LevelMap";
import LevelTransition from "./components/LevelTransition";
import IconSelector from "./components/IconSelector";

import EmailInbox from "./components/EmailInbox";
import MessagesApp from "./components/MessagesApp";

import LevelTransition2 from "./components/LevelTransition2";
import InstagramFeed from "./components/InstagramFeed";

import LevelTransition3 from "./components/LevelTransition3";
import QRChallenge from "./components/QRChallenge";


function App() {
  const [currentScreen, setCurrentScreen] = useState("start");

  // ==================================================
  // LEVEL 1
  // ==================================================

  const [verifiedEmails, setVerifiedEmails] = useState(0);
  const [verifiedMessages, setVerifiedMessages] = useState(0);

  const [emailVerifiedIds, setEmailVerifiedIds] =
    useState(new Set());

  const [messageVerifiedIds, setMessageVerifiedIds] =
    useState(new Set());

  const [level1Completed, setLevel1Completed] =
    useState(false);

  // ==================================================
  // LEVEL 2
  // ==================================================

  const [level2Completed, setLevel2Completed] =
    useState(false);

  // ==================================================
  // LEVEL 3
  // ==================================================

  const [level3Completed, setLevel3Completed] =
    useState(false);

  // ==================================================
  // START
  // ==================================================

  const handleStart = () => {
    setCurrentScreen("map");
  };

  // ==================================================
  // LEVEL 1
  // ==================================================

  const handleLevelSelect = () => {
    setCurrentScreen("transition");
  };

  const handleTransitionComplete = () => {
    setCurrentScreen("selector");
  };

  // ==================================================
  // EMAIL DETECTION
  // ==================================================

  const handleEmailSolved = (emailId) => {
    if (emailVerifiedIds.has(emailId)) {
      return;
    }

    const updatedIds = new Set(emailVerifiedIds);
    updatedIds.add(emailId);

    setEmailVerifiedIds(updatedIds);

    const newCount = updatedIds.size;

    setVerifiedEmails(newCount);

    console.log(`Emails verified: ${newCount}/3`);

    if (newCount >= 3) {
      console.log("EMAIL THREAT DETECTION COMPLETE");
    }
  };

  // ==================================================
  // WHATSAPP DETECTION
  // ==================================================

  const handleMessageSolved = (messageId) => {
    if (messageVerifiedIds.has(messageId)) {
      return;
    }

    const updatedIds = new Set(messageVerifiedIds);
    updatedIds.add(messageId);

    setMessageVerifiedIds(updatedIds);

    const newCount = updatedIds.size;

    setVerifiedMessages(newCount);

    console.log(
      `WhatsApp messages verified: ${newCount}/3`
    );

    if (newCount >= 3) {
      console.log(
        "WHATSAPP THREAT DETECTION COMPLETE"
      );
    }
  };

  // ==================================================
  // APP SELECTOR
  // ==================================================

  const handleAppSelect = (app) => {
    if (app === "gmail") {
      setCurrentScreen("email");
      return;
    }

    if (app === "messages") {
      setCurrentScreen("messages");
      return;
    }
  };

  // ==================================================
  // BACK TO MAP
  // ==================================================

  const handleBackToMap = () => {
    setCurrentScreen("map");
  };

  // ==================================================
  // LEVEL 2
  // ==================================================

  const handleLevel2Select = () => {
    setCurrentScreen("transition2");
  };

  const handleTransition2Complete = () => {
    setCurrentScreen("instagram");
  };

  const handleLevel2Complete = () => {
    setLevel2Completed(true);
    setCurrentScreen("map");
  };

  // ==================================================
  // LEVEL 3
  // ==================================================

  const handleLevel3Select = () => {
    console.log("LEVEL 3 SELECTED");

    setCurrentScreen("transition3");
  };

  const handleLevel3Complete = () => {
    console.log("LEVEL 3 COMPLETE");

    setLevel3Completed(true);

    // DIRECTLY RETURN TO LEVEL MAP
    // NO MINI GAME
    setCurrentScreen("map");
  };

  // ==================================================
  // RENDER
  // ==================================================

  return (
    <div
      className="app-container"
      style={{
        width: "100%",
        minHeight: "100vh"
      }}
    >

      {/* ==================================================
          START SCREEN
      ================================================== */}

      {currentScreen === "start" && (
        <StartScreen
          onStart={handleStart}
        />
      )}


      {/* ==================================================
          LEVEL MAP
      ================================================== */}

      {currentScreen === "map" && (
        <LevelMap
          onSelectLevel={handleLevelSelect}

          level1Completed={level1Completed}

          onSelectLevel2={handleLevel2Select}

          level2Completed={level2Completed}

          onSelectLevel3={handleLevel3Select}

          level3Completed={level3Completed}
        />
      )}


      {/* ==================================================
          LEVEL 1 TRANSITION
      ================================================== */}

      {currentScreen === "transition" && (
        <LevelTransition
          onComplete={handleTransitionComplete}
        />
      )}


      {/* ==================================================
          LEVEL 1 APP SELECTOR
      ================================================== */}

      {currentScreen === "selector" && (
        <IconSelector
          onSelectApp={handleAppSelect}
          onBack={handleBackToMap}
          verifiedEmails={verifiedEmails}
          verifiedMessages={verifiedMessages}
        />
      )}


      {/* ==================================================
          EMAIL THREAT DETECTION
      ================================================== */}

      {currentScreen === "email" && (
        <EmailInbox
          onBack={() =>
            setCurrentScreen("selector")
          }

          onSolve={handleEmailSolved}

          verifiedEmailIds={emailVerifiedIds}

          verifiedCount={verifiedEmails}
        />
      )}


      {/* ==================================================
          WHATSAPP THREAT DETECTION
      ================================================== */}

      {currentScreen === "messages" && (
        <MessagesApp
          onBack={() =>
            setCurrentScreen("selector")
          }

          onSolve={handleMessageSolved}

          verifiedMessageIds={messageVerifiedIds}

          verifiedCount={verifiedMessages}
        />
      )}


      {/* ==================================================
          LEVEL 2 TRANSITION
      ================================================== */}

      {currentScreen === "transition2" && (
        <LevelTransition2
          onComplete={handleTransition2Complete}
        />
      )}


      {/* ==================================================
          LEVEL 2 INSTAGRAM
      ================================================== */}

      {currentScreen === "instagram" && (
        <InstagramFeed
          onUnlockMiniGame={handleLevel2Complete}
        />
      )}


      {/* ==================================================
          LEVEL 3 TRANSITION
      ================================================== */}

      {currentScreen === "transition3" && (
        <LevelTransition3
          onComplete={() => {
            console.log(
              "LEVEL 3 TRANSITION COMPLETE"
            );

            setCurrentScreen("qr_challenge");
          }}
        />
      )}


      {/* ==================================================
          LEVEL 3 QR CHALLENGE
          FROM THE ORIGINAL LEVEL 3 FLOW
      ================================================== */}

      {currentScreen === "qr_challenge" && (
        <QRChallenge
          onComplete={handleLevel3Complete}

          onReturnMap={() => {
            setCurrentScreen("map");
          }}
        />
      )}

    </div>
  );
}

export default App;
