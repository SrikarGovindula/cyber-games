import React, { useEffect, useState } from "react";

const warnings = [
  {
    text: "> Misinformation spreading",
    styleClass: "style-yellow"
  },
  {
    text: "> Security alert critical",
    styleClass: "style-green"
  },
  {
    text: "> Data breach imminent",
    styleClass: "style-blue"
  },
  {
    text: "> Trust compromised",
    styleClass: "style-yellow"
  },
  {
    text: "> Bot network active",
    styleClass: "style-purple"
  },
  {
    text: "> Suspicious login detected",
    styleClass: "style-purple"
  },
  {
    text: "> Phishing attempt logged",
    styleClass: "style-purple"
  },
  {
    text: "> Credentials compromised",
    styleClass: "style-blue"
  },
  {
    text: "> Malware injection attempt",
    styleClass: "style-green"
  },
  {
    text: "> Tracking scripts detected",
    styleClass: "style-cyan"
  },
  {
    text: "> Fake news detected",
    styleClass: "style-blue"
  },
  {
    text: "> Privacy threat detected",
    styleClass: "style-cyan"
  },
  {
    text: "> Suspicious activity",
    styleClass: "style-yellow"
  },
  {
    text: "> Digital identity exposed",
    styleClass: "style-purple"
  }
];

/*
  Safe fixed positions.

  The titles are deliberately separated so they
  don't overlap each other or the level nodes.
*/
const backgroundPositions = [
  { top: "7%", left: "3%" },
  { top: "7%", left: "68%" },

  { top: "16%", left: "28%" },
  { top: "20%", left: "78%" },

  { top: "30%", left: "2%" },
  { top: "32%", left: "72%" },

  { top: "45%", left: "4%" },
  { top: "47%", left: "69%" },

  { top: "61%", left: "3%" },
  { top: "64%", left: "73%" },

  { top: "76%", left: "22%" },
  { top: "78%", left: "63%" },

  { top: "88%", left: "3%" },
  { top: "90%", left: "70%" }
];

const LevelMap = ({
  onSelectLevel,
  level1Completed,
  onSelectLevel2,
  level2Completed,
  onSelectLevel3
}) => {
  const [activeWarnings, setActiveWarnings] = useState([]);

  // ==========================================================
  // INITIAL BACKGROUND TITLES
  // ==========================================================

  useEffect(() => {
    const initialWarnings = warnings.map(
      (warning, index) => {
        const position =
          backgroundPositions[index];

        return {
          id: `warning-${index}`,
          text: warning.text,
          styleClass: warning.styleClass,
          top: position.top,
          left: position.left,

          animationDelay:
            `${index * 0.25}s`,

          animationDuration:
            `${6 + (index % 4)}s`
        };
      }
    );

    setActiveWarnings(initialWarnings);
  }, []);

  // ==========================================================
  // CHANGE TITLES OCCASIONALLY
  // ==========================================================

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveWarnings((previous) => {
        if (!previous.length) {
          return previous;
        }

        const updated = [...previous];

        const replaceIndex =
          Math.floor(
            Math.random() * updated.length
          );

        const warning =
          warnings[
            Math.floor(
              Math.random() *
                warnings.length
            )
          ];

        const position =
          backgroundPositions[
            replaceIndex
          ];

        updated[replaceIndex] = {
          id:
            `warning-${Date.now()}-${replaceIndex}`,

          text: warning.text,

          styleClass:
            warning.styleClass,

          top: position.top,

          left: position.left,

          animationDelay: "0s",

          animationDuration:
            `${6 + Math.floor(Math.random() * 4)}s`
        };

        return updated;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="level-map">

      {/* ======================================================
          BACKGROUND TITLES
      ====================================================== */}

      <div className="background-warning-layer">

        {activeWarnings.map((warning) => (
          <div
            key={warning.id}
            className={
              `map-background-text ${warning.styleClass}`
            }
            style={{
              top: warning.top,
              left: warning.left,
              animationDelay:
                warning.animationDelay,
              animationDuration:
                warning.animationDuration
            }}
          >
            {warning.text}
          </div>
        ))}

      </div>


      {/* ======================================================
          LEVEL NODES
      ====================================================== */}

      <div className="level-nodes">

        {/* ==================================================
            LEVEL 1
        ================================================== */}

        <div
          className="
            level-node-container
            level-one-node
          "
          style={{
            top: "35%",
            left: "30%"
          }}
        >

          <div
            className={
              `level-node ${
                level1Completed
                  ? "completed"
                  : "unlocked"
              }`
            }
            onClick={onSelectLevel}
          >

            <span className="number">
              1
            </span>

            <span className="label">
              LEVEL
            </span>

          </div>

          <div className="node-title">
            &gt; Algorithmic influence
          </div>

        </div>


        {/* ==================================================
            LEVEL 2
        ================================================== */}

        <div
          className="
            level-node-container
            level-two-node
          "
          style={{
            top: "25%",
            left: "60%"
          }}
        >

          <div
            className="
              level-node
              unlocked
              glow-blue
            "
            onClick={onSelectLevel2}
            style={{
              cursor: "pointer"
            }}
          >

            <span className="number">
              2
            </span>

            <span className="label">
              LEVEL
            </span>

          </div>

          <div className="node-title">
            &gt; Social engineering
          </div>

        </div>


        {/* ==================================================
            LEVEL 3
        ================================================== */}

        <div
          className="
            level-node-container
            level-three-node
          "
          style={{
            top: "60%",
            left: "42%"
          }}
        >

          <div
            className="
              level-node
              unlocked
              glow-purple
            "
            onClick={onSelectLevel3}
            style={{
              cursor: "pointer"
            }}
          >

            <span className="number">
              3
            </span>

            <span className="label">
              LEVEL
            </span>

          </div>

          <div className="node-title">
            &gt; Malicious QR Codes
          </div>

        </div>

      </div>


      {/* ======================================================
          STYLES
      ====================================================== */}

      <style>
        {`

        /* =====================================================
           BACKGROUND
        ===================================================== */

        .background-warning-layer {
          position: absolute;

          top: 0;
          left: 0;
          right: 0;
          bottom: 0;

          width: 100%;
          height: 100%;

          overflow: hidden;

          pointer-events: none;

          z-index: 1;
        }


        /* =====================================================
           BACKGROUND TITLES
        ===================================================== */

        .map-background-text {

          position: absolute;

          /*
            Larger font.
          */

          font-size: clamp(
            15px,
            1.35vw,
            21px
          );

          font-weight: 700;

          font-family:
            "Courier New",
            monospace;

          letter-spacing: 0.7px;

          line-height: 1.2;

          /*
            Give every title enough room.
          */

          width: 27%;

          max-width: 330px;

          min-width: 190px;

          /*
            Never allow text to extend
            outside its own box.
          */

          white-space: nowrap;

          overflow: hidden;

          text-overflow: ellipsis;

          /*
            Soft futuristic appearance.
          */

          opacity: 0.38;

          user-select: none;

          pointer-events: none;

          /*
            Animation.
          */

          animation-name:
            floatingWarning;

          animation-timing-function:
            ease-in-out;

          animation-iteration-count:
            infinite;

          /*
            Hardware acceleration.
          */

          transform:
            translate3d(
              0,
              0,
              0
            );

          will-change:
            transform,
            opacity;

          z-index: 1;
        }


        /* =====================================================
           FLOATING EFFECT
        ===================================================== */

        @keyframes floatingWarning {

          0% {
            transform:
              translate3d(
                0px,
                0px,
                0
              );

            opacity: 0.25;
          }

          25% {
            transform:
              translate3d(
                7px,
                -4px,
                0
              );

            opacity: 0.38;
          }

          50% {
            transform:
              translate3d(
                12px,
                3px,
                0
              );

            opacity: 0.32;
          }

          75% {
            transform:
              translate3d(
                6px,
                6px,
                0
              );

            opacity: 0.42;
          }

          100% {
            transform:
              translate3d(
                0px,
                0px,
                0
              );

            opacity: 0.25;
          }
        }


        /* =====================================================
           COLORS
        ===================================================== */

        .style-yellow {
          color: #ffd740;

          text-shadow:
            0 0 8px
            rgba(
              255,
              215,
              64,
              0.3
            );
        }

        .style-green {
          color: #69f0ae;

          text-shadow:
            0 0 8px
            rgba(
              105,
              240,
              174,
              0.3
            );
        }

        .style-blue {
          color: #40c4ff;

          text-shadow:
            0 0 8px
            rgba(
              64,
              196,
              255,
              0.3
            );
        }

        .style-purple {
          color: #b388ff;

          text-shadow:
            0 0 8px
            rgba(
              179,
              136,
              255,
              0.3
            );
        }

        .style-cyan {
          color: #18ffff;

          text-shadow:
            0 0 8px
            rgba(
              24,
              255,
              255,
              0.3
            );
        }


        /* =====================================================
           LEVEL NODE LAYER
        ===================================================== */

        .level-nodes {

          position: relative;

          width: 100%;
          height: 100%;

          z-index: 10;
        }


        /* =====================================================
           NODE CONTAINERS
        ===================================================== */

        .level-node-container {

          position: absolute;

          transform:
            translate(
              -50%,
              -50%
            );

          display: flex;

          flex-direction: column;

          align-items: center;

          justify-content: center;

          z-index: 20;

          /*
            Prevent container from becoming
            too wide.
          */

          width: 230px;

          max-width: 230px;

          box-sizing: border-box;
        }


        /* =====================================================
           LEVEL TITLES
        ===================================================== */

        .node-title {

          margin-top: 15px;

          width: 220px;

          max-width: 220px;

          text-align: center;

          white-space: normal;

          overflow-wrap: break-word;

          word-break: normal;

          font-family:
            "Courier New",
            monospace;

          /*
            Increased level title size.
          */

          font-size: clamp(
            15px,
            1.4vw,
            20px
          );

          font-weight: 700;

          line-height: 1.35;

          color: #ffffff;

          text-shadow:
            0 0 8px
            rgba(
              255,
              255,
              255,
              0.3
            ),

            0 0 18px
            rgba(
              255,
              255,
              255,
              0.08
            );
        }


        /* =====================================================
           INDIVIDUAL NODE TITLE WIDTHS
        ===================================================== */

        .level-one-node .node-title {
          width: 200px;
        }

        .level-two-node .node-title {
          width: 200px;
        }

        .level-three-node .node-title {
          width: 210px;
        }


        /* =====================================================
           TABLET
        ===================================================== */

        @media (max-width: 900px) {

          .map-background-text {

            width: 30%;

            min-width: 155px;

            max-width: 240px;

            font-size: 14px;
          }


          .level-node-container {

            width: 200px;

            max-width: 200px;
          }


          .node-title {

            width: 185px;

            max-width: 185px;

            font-size: 15px;
          }
        }


        /* =====================================================
           MOBILE
        ===================================================== */

        @media (max-width: 600px) {

          .map-background-text {

            width: 30%;

            min-width: 105px;

            max-width: 150px;

            font-size: 10px;

            letter-spacing: 0.3px;
          }


          .level-node-container {

            width: 160px;

            max-width: 160px;
          }


          .level-one-node {

            left: 25% !important;
          }


          .level-two-node {

            left: 72% !important;
          }


          .level-three-node {

            left: 50% !important;
          }


          .node-title {

            width: 145px;

            max-width: 145px;

            font-size: 12px;

            line-height: 1.3;

            margin-top: 10px;
          }
        }


        /* =====================================================
           VERY SMALL SCREENS
        ===================================================== */

        @media (max-width: 400px) {

          .map-background-text {

            width: 27%;

            min-width: 85px;

            max-width: 125px;

            font-size: 9px;
          }


          .level-node-container {

            width: 140px;

            max-width: 140px;
          }


          .node-title {

            width: 130px;

            max-width: 130px;

            font-size: 11px;
          }
        }

        `}
      </style>

    </div>
  );
};

export default LevelMap;
