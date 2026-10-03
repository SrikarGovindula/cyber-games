import React from "react";

const StartScreen = ({ onStart }) => {
  // Pre-calculate positions for static layout from first image
  const staticCommands = [
    { text: "$ ls -la", top: "35%", left: "70%" },
    { text: "$ chmod +x script.sh", top: "40%", left: "20%" },
    { text: "$ tar -xvf archive.tar", top: "40%", left: "32%" },
    { text: "$ mkdir projects", top: "55%", left: "40%" },
    { text: "$ ssh user@server", top: "58%", left: "65%" },
    { text: "$ cp file.txt backup.txt", top: "62%", left: "78%" },
    { text: "$ pwd", top: "65%", left: "79%" },
    { text: "$ chown user file.txt", top: "68%", left: "79%" },
    { text: "$ touch index.html", top: "65%", left: "20%" },
    { text: "$ mv old.txt new.txt", top: "68%", left: "35%" },
    { text: "$ netstat -tuln", top: "72%", left: "24%" },
    { text: "$ whoami", top: "71%", left: "7%" },
    { text: "$ scp file user@server:/home", top: "71%", left: "38%" },
    { text: "$ git add .", top: "73%", left: "42%" },
    { text: "$ uname -a", top: "75%", left: "48%" },
    { text: "$ rm temp.txt", top: "76%", left: "55%" },
    { text: '$ grep -r "data"', top: "77%", left: "33%" },
    { text: "$ git init", top: "79%", left: "49%" },
    { text: "$ sudo apt update", top: "78%", left: "60%" },
    { text: "$ kill 4321", top: "79%", left: "73%" },
    { text: "$ ifconfig", top: "75%", left: "80%" },
    { text: "$ free -m", top: "80%", left: "18%" },
    { text: "$ ping google.com", top: "82%", left: "72%" },
    { text: "$ curl https://example.com", top: "80%", left: "82%" },
    { text: "$ nmap localhost", top: "80%", left: "26%" },
    { text: "$ du -sh", top: "83%", left: "22%" },
    { text: "$ nano config.conf", top: "83%", left: "28%" },
    { text: "$ git status", top: "86%", left: "8%" },
    { text: "$ cat config.txt", top: "86%", left: "15%" },
    { text: "$ traceroute google.com", top: "92%", left: "61%" },
    { text: "$ wget file.zip", top: "88%", left: "81%" },
    { text: "$ df -h", top: "92%", left: "80%" },
    { text: "$ ps aux", top: "98%", left: "38%" },
    { text: "$ unzip data.zip", top: "98%", left: "65%" },
    { text: "$ docker ps", top: "98%", left: "85%" },
  ];

  // Add random float animations to commands
  const [commands] = React.useState(() => {
    return staticCommands.map((cmd) => ({
      ...cmd,
      duration: (Math.random() * 3 + 3).toFixed(2) + "s",
      delay: (Math.random() * 2).toFixed(2) + "s",
    }));
  });

  return (
    <div className="start-screen">
      <h1 className="start-title">
        Trace the <span className="glow-text-green">Truth</span>
      </h1>
      <p className="start-subtitle">Click the command to begin your journey</p>

      {commands.map((cmd, index) => (
        <div
          key={index}
          className="cmd-box"
          style={{
            top: cmd.top,
            left: cmd.left,
            animation: `float ${cmd.duration} ease-in-out infinite`,
            animationDelay: cmd.delay,
          }}
        >
          {cmd.text}
        </div>
      ))}

      <button
        className="cmd-box cmd-start"
        onClick={() => {
          console.log("Starting game...");
          onStart();
        }}
        style={{
          position: "relative",
          zIndex: 9999,
          pointerEvents: "auto",
          cursor: "pointer",
        }}
      >
        $ ./startgame
      </button>
    </div>
  );
};

export default StartScreen;
