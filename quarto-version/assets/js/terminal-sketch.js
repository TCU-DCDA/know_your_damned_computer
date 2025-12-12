let terminalImg;
let cursorVisible = true;
let lastBlinkTime = 0;
const BLINK_INTERVAL = 500; // ms

function preload() {
  terminalImg = loadImage('images/terminal.png');
}

function setup() {
  // Select the container
  let container = select('#terminal-canvas');
  
  // Calculate dimensions based on container width and image aspect ratio
  let w = container.width;
  // Default to 16:9 if image hasn't loaded yet (though preload handles this)
  let aspectRatio = terminalImg.width > 0 ? terminalImg.height / terminalImg.width : 0.5625;
  let h = w * aspectRatio;
  
  let canvas = createCanvas(w, h);
  canvas.parent('terminal-canvas');
}

function windowResized() {
  let container = select('#terminal-canvas');
  if (container) {
    let w = container.width;
    let aspectRatio = terminalImg.height / terminalImg.width;
    resizeCanvas(w, w * aspectRatio);
  }
}

function draw() {
  // Scale everything to fit the current canvas width
  let scaleFactor = width / terminalImg.width;
  scale(scaleFactor);
  
  background(17); // Match the dark background
  image(terminalImg, 0, 0);
  
  // Flashing cursor logic
  if (millis() - lastBlinkTime > BLINK_INTERVAL) {
    cursorVisible = !cursorVisible;
    lastBlinkTime = millis();
  }
  
  if (cursorVisible) {
    fill(50, 255, 50); // Terminal Green
    noStroke();
    // Position: Adjust these coordinates to match where the prompt is in terminal.png
    // Currently set to top-left area
    rect(30, 30, 15, 30); 
  }
}
