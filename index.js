let RESOLUTION = 16;
let cam;
let val = false;
let differenceValues = [0, 0, 0];

let modes = [
  "customTextFrame",
  "bwVertexesPartialScreen",
  "bwVertexes",
  "showTheDifference",
  "defColorful",
  "offsetColorful",
];

let currentMode = 1;

document
  .getElementById("submitCustomCharacter")
  .addEventListener("click", getVal);
function getVal() {
  val = document.getElementById("customCharacter").value;
  console.log("Value updated:", val);
}

function preload() {}

function setup() {
  let canvas = createCanvas(windowWidth, 500);
  canvas.parent("canvasContainer");
  background(0);

  cam = createCapture(VIDEO);
  cam.hide();
}

function draw() {
  background(255);

  cam.loadPixels(); //cam.pixels is accesible after this line!
  let w = cam.width;
  let h = cam.height;

  if (val != false) {
    customTextFrame(w, h);
  } else if (val === false && currentMode === 0) {
    fill(0);
    textSize(30);
    text(modes[currentMode], 0, 100);
    noFill();
    textSize(20);
    text(
      "print & send your character below!",
      width / 2 - 100,
      height / 2 - 100
    );
  } else if (modes[currentMode] === "bwVertexesPartialScreen") {
    fill(0);
    textSize(30);
    text(modes[currentMode], 0, 100);
    noFill();
    bwVertexesPartialScreen(w, h);
  } else if (modes[currentMode] === "bwVertexes") {
    fill(0);
    textSize(30);
    text(modes[currentMode], 0, 100);
    noFill();
    bwVertexes(w, h);
  } else if (modes[currentMode] === "showTheDifference") {
    fill(0);
    textSize(30);
    text("Move faster!", 0, 100);
    text(modes[currentMode], 0, 200);
    noFill();
    showTheDifference(w, h);
  } else if (modes[currentMode] === "defColorful") {
    fill(0);
    textSize(30);
    text(modes[currentMode], 0, 100);
    noFill();
    defColorful(w, h);
  } else if (modes[currentMode] === "offsetColorful") {
    fill(0);
    textSize(30);
    text(modes[currentMode], 0, 100);
    noFill();
    offsetColorful(w, h);
  }
}

function keyPressed() {
  if (keyCode === RIGHT_ARROW) {
    if (val != false) {
      val = false;
      currentMode++;
    } else if (currentMode + 1 < modes.length) {
      currentMode++;
    } else {
      currentMode = 0;
    }
  } else if (keyCode === LEFT_ARROW) {
    if (val != false) {
      val = false;
      currentMode--;
    } else if (currentMode - 1 >= 0) {
      currentMode--;
    } else {
      currentMode = modes.length - 1;
    }
  }
}

let prevPixels = [];
function showTheDifference(w, h) {
  for (let y = 0; y < h; y += RESOLUTION) {
    for (
      let x = (windowWidth - w) / 2;
      x < (windowWidth + w) / 2;
      x += RESOLUTION
    ) {
      let index = (x - (windowWidth - w) / 2 + y * w) * 4; // RGBA
      let r = cam.pixels[index + 0];
      let g = cam.pixels[index + 1];
      let b = cam.pixels[index + 2];
      //let a = cam.pixels[index + 3];

      let pr = prevPixels[index + 0];
      let pg = prevPixels[index + 1];
      let pb = prevPixels[index + 2];
      //let pa = prevPixels[index + 3];

      let diffR = abs(r - pr);
      let diffG = abs(g - pg);
      let diffB = abs(b - pb);

      differenceValues[0] = diffR;
      differenceValues[1] = diffG;
      differenceValues[2] = diffB;

      stroke(map((diffR + diffG + diffB) / 3, 0, 255, 255, 0));
      rect(x, y, RESOLUTION, RESOLUTION);
    }
  }
  prevPixels = [...cam.pixels];
}

function customTextFrame(w, h) {
  for (let y = 0; y < h; y += RESOLUTION) {
    stroke(255);
    //fill(255, 100);
    noFill();
    for (
      let x = (windowWidth - w) / 2;
      x < (windowWidth + w) / 2;
      x += RESOLUTION
    ) {
      let index = (x - (windowWidth - w) / 2 + y * w) * 4; // RGBA
      let r = cam.pixels[index + 0];
      let g = cam.pixels[index + 1];
      let b = cam.pixels[index + 2];
      let a = cam.pixels[index + 3];

      let avg = (r + g + b) / 3;
      if (avg > 100) {
        fill(0);

        let size = map(avg, 50, 255, 0, 2 * RESOLUTION);

        textSize(size);
        text(val, x, y);
      }
    }
  }
}

function bwVertexesPartialScreen(w, h) {
  for (let y = 0; y < h; y += RESOLUTION) {
    stroke(255);
    //fill(255, 100);
    noFill();
    beginShape();
    for (
      let x = (windowWidth - w) / 2;
      x < (windowWidth + w) / 2;
      x += RESOLUTION
    ) {
      let index = (x - (windowWidth - w) / 2 + y * w) * 4; // RGBA
      let r = cam.pixels[index + 0];
      let g = cam.pixels[index + 1];
      let b = cam.pixels[index + 2];
      let a = cam.pixels[index + 3];

      let avg = (r + g + b) / 3;

      // let adjSize = map(avg, 0, 255, 0, RESOLUTION);
      // image(img, adjSize, adjSize);
      // // stroke(map(mouseX, 0, width, 0, 255), 0, 200);
      if (avg > 150) {
        stroke(map(avg, 150, 255, 0, 255));
        let adjY = map(avg, 0, 255, RESOLUTION, -RESOLUTION);
        vertex(x, y + adjY);
      }
    }
    endShape();
  }
}

function bwVertexes(w, h) {
  for (let y = 0; y < h; y += RESOLUTION) {
    stroke(255);
    //fill(255, 100);
    noFill();
    beginShape();
    for (
      let x = (windowWidth - w) / 2;
      x < (windowWidth + w) / 2;
      x += RESOLUTION
    ) {
      let index = (x - (windowWidth - w) / 2 + y * w) * 4; // RGBA
      let r = cam.pixels[index + 0];
      let g = cam.pixels[index + 1];
      let b = cam.pixels[index + 2];
      let a = cam.pixels[index + 3];

      let avg = (r + g + b) / 3;

      // let adjSize = map(avg, 0, 255, 0, RESOLUTION);
      // image(img, adjSize, adjSize);
      // // stroke(map(mouseX, 0, width, 0, 255), 0, 200);
      stroke(map(avg, 150, 255, 0, 255));
      let adjY = map(avg, 0, 255, -RESOLUTION, RESOLUTION);
      vertex(x, y + adjY);
    }
    endShape();
  }
}

function colorfulVertexes(w, h) {
  for (let y = 0; y < h; y += RESOLUTION) {
    stroke("#FFFF00");
    //fill(255, 100);
    noFill();
    beginShape();
    for (
      let x = (windowWidth - w) / 2;
      x < (windowWidth + w) / 2;
      x += RESOLUTION
    ) {
      let index = (x - (windowWidth - w) / 2 + y * w) * 4; // RGBA
      let r = cam.pixels[index + 0];
      let g = cam.pixels[index + 1];
      let b = cam.pixels[index + 2];
      let a = cam.pixels[index + 3];

      let avg = (r + g + b) / 3;
      stroke("#FFFF00");

      let adjY = map(avg, 0, 255, RESOLUTION, -RESOLUTION);
      vertex(x, y + adjY);
    }
    endShape();
  }
}

function defColorful(w, h) {
  for (let y = 0; y < h; y += RESOLUTION) {
    for (
      let x = (windowWidth - w) / 2;
      x < (windowWidth + w) / 2;
      x += RESOLUTION
    ) {
      let index = (x - (windowWidth - w) / 2 + y * w) * 4; // RGBA
      let r = cam.pixels[index + 0];
      let g = cam.pixels[index + 1];
      let b = cam.pixels[index + 2];
      let a = cam.pixels[index + 3];

      let avg = (r + g + b) / 3;

      if (avg > 100) {
        fill("#FFFF00");
        circle(x + 2 * RESOLUTION, y, 2 * RESOLUTION);
        fill("#FF00FF");
        circle(x + RESOLUTION, y, RESOLUTION);
        fill("#00FFFF");
        circle(x, y, RESOLUTION / 2);
      }
    }
  }
}

function offsetColorful(w, h) {
  for (let y = 0; y < h; y += RESOLUTION) {
    for (
      let x = (windowWidth - w) / 2;
      x < (windowWidth + w) / 2;
      x += RESOLUTION
    ) {
      let index = (x - (windowWidth - w) / 2 + y * w) * 4; // RGBA
      let r = cam.pixels[index + 0];
      let g = cam.pixels[index + 1];
      let b = cam.pixels[index + 2];
      let a = cam.pixels[index + 3];

      let avg = (r + g + b) / 3;

      if (avg > 100) {
        fill("#FFFF00");
        circle(x + 2 * RESOLUTION, y, RESOLUTION);
        fill("#00FFFF");
        circle(x + RESOLUTION, y, RESOLUTION);
        fill("#FF00FF");
        circle(x, y, RESOLUTION);
      }
    }
  }
}

function offsetColorful2(w, h) {
  for (let y = 0; y < h; y += RESOLUTION) {
    for (
      let x = (windowWidth - w) / 2;
      x < (windowWidth + w) / 2;
      x += RESOLUTION
    ) {
      let index = (x - (windowWidth - w) / 2 + y * w) * 4; // RGBA
      let r = cam.pixels[index + 0];
      let g = cam.pixels[index + 1];
      let b = cam.pixels[index + 2];
      let a = cam.pixels[index + 3];

      let avg = (r + g + b) / 3;

      if (avg > 50) {
        fill("#FF00FF");
        rect(x, y, RESOLUTION, RESOLUTION);
        fill("#FFFF00");
        rect(x + 2 * RESOLUTION, y, RESOLUTION, RESOLUTION);
        fill("#00FFFF");
        rect(x + 4 * RESOLUTION, y, RESOLUTION, RESOLUTION);
      }
    }
  }
}
function mouseWheel(event) {
  print(event.delta);
  if (event.delta > 0 && RESOLUTION < 40) {
    RESOLUTION += 1;
  } else if (event.delta < 0 && RESOLUTION > 8) {
    RESOLUTION -= 1;
  }
}
