const fs = require('fs');
const content = fs.readFileSync('./src/App.jsx', 'utf8');
console.log("App.jsx has LevelMap imported?", content.includes("import LevelMap"));
console.log("App.jsx has LevelMap rendered?", content.includes("currentScreen === 'map' && <LevelMap"));
