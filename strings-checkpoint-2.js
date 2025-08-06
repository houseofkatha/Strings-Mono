// == Custom Letterform Library ==

// Public function to include in other sketches
let letterStates = [];
let savedStates = [];
let recordingStates = false;
let charWidth;
let n=10;

function drawCustomText(str, x, y, options = {}) {
  let {
    letterWidth = 10,
    letterSpacing = 10,
    lineSpacing = 10,
    strokeWeightVal = 2,
    detailLevel = 5,
    color = [0, 116, 255],
    preset = null,
    radius = 100,
    interactiveStrokeWeight = 6,
    interactiveDetailLevel = 10,
    interactiveColor = [255, 0, 0],
    // New color pairs
    baseColor = [0, 0, 0],
    targetColor = [255, 255, 255],
    interactiveBaseColor = [255, 0, 0],
    interactiveTargetColor = [255, 255, 0],
    maxWidth = width - x,     // 👈 max width for bounding box    
    lineHeight = letterWidth * 2 + lineSpacing// 👈 vertical distance between lines
  } = options;

  let cx = x;
  let cy = y;

  // Split string into words (preserve whitespace)
  let words = str.split(/(\s+)/);

  for (let word of words) {
    let wordWidth = 0;
    for (let char of word) {
      let upperChar = char.toUpperCase();
      if (letterFunctions[upperChar]) {
        wordWidth += letterWidth * 2 + letterSpacing;
      }
    }

    if (cx + wordWidth > x + maxWidth) {
      // Move to next line
      cx = x;
      cy += lineHeight;
    }

    for (let char of word) {
      let upperChar = char.toUpperCase();

      // Push new state if needed
      if (!letterStates[cx + ',' + cy]) {
        letterStates[cx + ',' + cy] = {
          sw: strokeWeightVal,
          p: detailLevel,
          col: color.slice()
        };
      }

      let state = letterStates[cx + ',' + cy];

      if (!letterFunctions[upperChar]) {
        cx += letterSpacing * 2;
        continue;
      }

      let d = dist(mouseX, mouseY, cx + options.letterWidth, cy + options.letterWidth);
      let verticalGuard = abs(mouseY - cy) < radius / 2;

      let targetSw = strokeWeightVal;
      let targetP = detailLevel;
      let targetCol;

      if (preset === "hover-reactive" && d < radius) {
        // Interpolate strength based on proximity to cursor
        let proximity = 1 - (d / radius); // 1 near center, 0 at edge
        proximity = constrain(proximity, 0, 1);

        // Linearly interpolate based on proximity
        targetSw = lerp(strokeWeightVal, interactiveStrokeWeight, proximity);
        targetP = lerp(detailLevel, interactiveDetailLevel, proximity);

        // Color also interpolates based on proximity (new logic)
        targetCol = [
          lerp(interactiveBaseColor[0], interactiveTargetColor[0], proximity),
          lerp(interactiveBaseColor[1], interactiveTargetColor[1], proximity),
          lerp(interactiveBaseColor[2], interactiveTargetColor[2], proximity)
        ];
      } else {
        // Default color interpolation
        targetCol = [
          lerp(baseColor[0], targetColor[0], 0.5),
          lerp(baseColor[1], targetColor[1], 0.5),
          lerp(baseColor[2], targetColor[2], 0.5)
        ];
      }

      state.sw = lerp(state.sw, targetSw, 0.1);
      state.p = lerp(state.p, targetP, 0.1);
      if (abs(state.p) < 0.05) state.p = 0;

      let renderP = round(state.p);
      state.col = [
        lerp(state.col[0], targetCol[0], 0.1),
        lerp(state.col[1], targetCol[1], 0.1),
        lerp(state.col[2], targetCol[2], 0.1)
      ];

      push();
      translate(cx, cy);
      strokeWeight(state.sw);
      stroke(...state.col);
      letterFunctions[upperChar](renderP, letterWidth);
      pop();

      cx += letterWidth * 2 + letterSpacing;
      charWidth = letterWidth;

      if (recordingStates) {
        savedStates.push({
          x: cx,
          y: cy,
          char: upperChar,
          strokeWeight: Math.round(state.sw * 10) / 10,
          detail: state.p,
          color: [...state.col],
          width: charWidth
        });
        
      }
      
    }
  }
  recordingStates = false;
}

function drawStaticLetterData(dataArray) {
  for (let state of dataArray) {
    if (!letterFunctions[state.char]) continue;
    push();
    translate(state.x, state.y);
    strokeWeight(state.strokeWeight);
    stroke(...state.color);
    letterFunctions[state.char](round(state.detail), state.width);
    pop();
  }
}

const letterFunctions = {
  A: drawA, B: drawB, C: drawC, D: drawD, E: drawE, F: drawF, G: drawG,
  H: drawH, I: drawI, J: drawJ, K: drawK, L: drawL, M: drawM, N: drawN,
  O: drawO, P: drawP, Q: drawQ, R: drawR, S: drawS, T: drawT, U: drawU,
  V: drawV, W: drawW, X: drawX, Y: drawY, Z: drawZ,
  "0": draw0, "1": draw1, "2": draw2, "3": draw3, "4": draw4, "5": draw5,
  "6": draw6, "7": draw7, "8": draw8, "9": draw9, " ": () => {}
};

function drawLetter(idArray, p, widthh) {
  let baseColor = color(255, 0, 255);
  let targetColor = color(0, 255, 255);
  let a = new Quadrilateral(widthh, n, baseColor, targetColor);   
  for (let id of idArray) {
    if (!id) continue;
    push();
    applyTransform(id, a.w);
    let type = id[2];
    if (type === "C") a.circ(p);
    else if (type === "S") a.st(p);
    pop();
  }
}

function applyTransform(id, letterWidth) {
  let gridSpacing = letterWidth;
  let translateMap = {
    1: [0, 0], 2: [1, 0], 3: [2, 0],
    4: [0, 1], 5: [1, 1], 6: [2, 1],
    7: [0, 2], 8: [1, 2], 9: [2, 2]
  };

  let rotateMap = { V: 0, W: HALF_PI, X: PI, Y: PI + HALF_PI };
  let scaleMap = { "=": [1, 1], "-": [-1, 1], "+": [1, -1] };

  let t = translateMap[id[0]];
  let r = rotateMap[id[1]];
  let s = scaleMap[id[3]];

  translate(t[0] * gridSpacing, t[1] * gridSpacing);
  rotate(r);
  scale(s[0], s[1]);
}

class Quadrilateral {
  constructor(w_, n_, baseColor_, targetColor_) {
    this.w = w_;
    this.n = n_;
    this.baseColor = baseColor_ || color(255, 0, 0);
    this.targetColor = targetColor_ || color(0, 255, 255);
  }

  st(p_) {
    if (p_ == 0) {
      line(0, 0, 0, this.w);
      line(0, this.w, this.w, this.w);
    } else {
      for (let i = 0; i <= p_ - 1; i++) {
        let amt = i / (p_ - 1);
        let c = lerpColor(this.baseColor, this.targetColor, amt);
        stroke(c);
        line(0, (this.w * i) / this.n, (this.w * (i + 1)) / this.n, this.w);
        line(
          0,
          this.w - (this.w * (i + 1)) / this.n,
          this.w - (this.w * i) / this.n,
          this.w
        );
      }
    }
  }

  circ(p_) {
    let col = 0;
    let angle = 90 / (this.n + 1);
    if (p_ == 0) {
      line(0, 0, this.w, 0);
      line(0, this.w, this.w, 0);
    } else if (p_ >= this.n / 2) {
      let v = 0;
      for (let j = this.n; j <= 90; j += angle) {
        let amt = (j - this.n) / (90 - this.n);
        let c = lerpColor(this.baseColor, this.targetColor, amt);
        stroke(c);
        let x = int(this.w * cos(radians(j)));
        let y = int(this.w * sin(radians(j)));
        line(v, 0, x, y);
        line(0, this.w, this.w, 0);
        v = v + this.w / this.n;
      }
    } else {
      let v1 = this.w - this.w / this.n;
      let v2 = 0;
      for (let j = this.n; j <= angle * (p_ + 1); j += angle) {
        let amt = (j - this.n) / (angle * (p_ + 1) - this.n);
        let c = lerpColor(this.baseColor, this.targetColor, amt);
        stroke(c);
        let x = int(this.w * cos(radians(j)));
        let y = int(this.w * sin(radians(j)));
        line(v2, 0, x, y);
        v2 += this.w / this.n;
      }
      for (let j = 90 - angle; j >= angle * (this.n - p_); j -= angle) {
        let amt = (90 - j) / (90 - angle * (this.n - p_));
        let c = lerpColor(this.baseColor, this.targetColor, amt);
        stroke(c);
        let x = int(this.w * cos(radians(j)));
        let y = int(this.w * sin(radians(j)));
        line(v1, 0, x, y);
        v1 -= this.w / this.n;
        col++;
      }
    }
  }
}


// function keyPressed() {
//   if (key === 'S' || key === 's') {
//     recordingStates = true;
//     console.log('hello');
//     savedStates = []; // clear old
//   } else if (key === 'E' || key === 'e') {
//     recordingStates = false;
//     console.log(savedStates); // 🔁 Or send via postMessage to another sketch
//     sendStateToOtherSketch(savedStates);
//   }
// }

function keyPressed() {
  if (key === 'S' || key === 's') {
    // Start recording
    recordingStates = true;
    savedStates = []; // Clear previous data

    // Wait one frame (~16ms) to collect states in draw()
    setTimeout(() => {
      recordingStates = false;
      console.log(savedStates);
      sendStateToOtherSketch(savedStates);
    }, 25); // slight delay to ensure draw() runs once
  }
}

function sendStateToOtherSketch(data) {
  const targetWindow = window.open('receiver.html', '_blank'); // or iframe.contentWindow
  const payload = JSON.stringify(data);

  // Wait a moment before posting to make sure the other window is ready
  setTimeout(() => {
    targetWindow.postMessage({ type: "letterData", payload }, "*");
  }, 2000);
}

// Include all letter drawing functions here (e.g. drawA to drawZ and draw0 to draw9)
// These functions call drawLetter() with the correct transformation strings
// Copy the existing drawA(p) { drawLetter([...], p); } etc. from your sketch
// into this file for it to be self-contained.

// == Letter Functions ==
function drawA(p, letterWidth) { drawLetter(["5XC=", "5XC-", "9XS=", "5WS="], p, letterWidth); }
function drawB(p, letterWidth) { drawLetter(["2WS=", "2VC=", "8VC+", "4VS="], p, letterWidth); }
function drawC(p, letterWidth) { drawLetter(["2WS=", "2VC=", "8YS=", "4VS="], p, letterWidth); }
function drawD(p, letterWidth) { drawLetter(["2WS=", "5VC+", "5VC=", "4VS="], p, letterWidth); }
function drawE(p, letterWidth) { drawLetter(["2VC-", "6XS=", "8YS=", "8XC="], p, letterWidth); }
function drawF(p, letterWidth) { drawLetter(["5XC=", "6XS=", "", "5WS="], p, letterWidth); }
function drawG(p, letterWidth) { drawLetter(["2WS=", "6XS=", "8VC+", "4VS="], p, letterWidth); }
function drawH(p, letterWidth) { drawLetter(["5XC=", "5YS=", "5VC=", "5WS="], p, letterWidth); }
function drawI(p, letterWidth) { drawLetter(["5WC-", "3WS=", "5YC-", "7YS="], p, letterWidth); }
function drawJ(p, letterWidth) { drawLetter(["", "6XS=", "8YS=", "8XC="], p, letterWidth); }
function drawK(p, letterWidth) { drawLetter(["1VS=", "5VC+", "5VS=", "5WS="], p, letterWidth); }
function drawL(p, letterWidth) { drawLetter(["2WS=", "", "8VC+", "4VS="], p, letterWidth); }
function drawM(p, letterWidth) { drawLetter(["4YC=", "6WC-", "8YS=", "4VS="], p, letterWidth); }
function drawN(p, letterWidth) { drawLetter(["4YC=", "6XS=", "6WC=", "4VS="], p, letterWidth); }
function drawO(p, letterWidth) { drawLetter(["2WS=", "6XS=", "8YS=", "4VS="], p, letterWidth); }
function drawP(p, letterWidth) { drawLetter(["5XC=", "2VC=", "", "5WS="], p, letterWidth); }
function drawQ(p, letterWidth) { drawLetter(["2WS=", "6XS=", "9XS=", "5VS=", "4VS="], p, letterWidth); }
function drawR(p, letterWidth) { drawLetter(["5XC=", "5XC-", "5VS=", "5WS="], p, letterWidth); }
function drawS(p, letterWidth) { drawLetter(["2VC-", "6XS=", "8VC+", "4VS="], p, letterWidth); }
function drawT(p, letterWidth) { drawLetter(["5YC+", "5YC=", "5VS=", "7YS="], p, letterWidth); }
function drawU(p, letterWidth) { drawLetter(["2WS=", "6WC-", "8YS=", "4VS="], p, letterWidth); }
function drawV(p, letterWidth) { drawLetter(["2WS=", "6WC-", "", "4WC+"], p, letterWidth); }
function drawW(p, letterWidth) { drawLetter(["2WS=", "6XS=", "6WC=", "4WC+"], p, letterWidth); }
function drawX(p, letterWidth) { drawLetter(["2VC-", "2VC=", "8VC+", "8XC="], p, letterWidth); }
function drawY(p, letterWidth) { drawLetter(["5XC=", "5YS=", "9XC=", ""], p, letterWidth); }
function drawZ(p, letterWidth) { drawLetter(["2WS=", "2VC=", "8YS=", "8XC="], p, letterWidth); }
function draw1(p, letterWidth) { drawLetter(["5YC+", "5VS=", "7YS="], p, letterWidth); }
function draw2(p, letterWidth) { drawLetter(["2WS=", "5XC-", "8YS=", "8XC="], p, letterWidth); }
function draw3(p, letterWidth) { drawLetter(["2WS=", "2VC=", "5VC=", "4VS="], p, letterWidth); }
function draw4(p, letterWidth) { drawLetter(["5XC=", "5YS=", "9XS="], p, letterWidth); }
function draw5(p, letterWidth) { drawLetter(["2VC-", "6XS=", "5VC=", "4VS="], p, letterWidth); }
function draw6(p, letterWidth) { drawLetter(["5XC=", "6XS=", "8VC+", "5VC-"], p, letterWidth); }
function draw7(p, letterWidth) { drawLetter(["2WS=", "2VC=", "8XC="], p, letterWidth); }
function draw8(p, letterWidth) { drawLetter(["5XC=", "2VC=", "5VC=", "8XC="], p, letterWidth); }
function draw9(p, letterWidth) { drawLetter(["2VC-", "5XC-", "5VC=", "4VS="], p, letterWidth); }
function draw0(p, letterWidth) { drawLetter(["2WS=", "6XS=", "8YS=", "4VS=", "2VS-", "2VS=", "6WS=", "8XS="], p, letterWidth); }

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}