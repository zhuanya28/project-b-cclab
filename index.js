let RESOLUTION = 14;
let cam;
let val = false;
let differenceValues = [0, 0, 0];

let currentMode = "vertexes";

document
  .getElementById("submitCustomCharacter")
  .addEventListener("click", getVal);
function getVal() {
  val = document.getElementById("customCharacter").value;
  console.log("Value updated:", val);
}

function preload() {}

function setup() {
  let canvas = createCanvas(640, 500);
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

  if (val !== false) {
    customTextFrame(w, h);
  }

  bwVertexes(w, h);

  // if (currentMode === "vertexes") {
  //   vertexes(w, h);
  // } else if (currentMode === "circles") {
  //   circles(w, h);
  // } else if (currentMode === "trigs") {
  //   trigs(w, h);
  // } else if (currentMode === "rectangles") {
  //   rectangles(w, h);
  // }

  fill(255);
  rect(10, 10, 50, 50);
  rect(70, 10, 50, 50);
  rect(130, 10, 50, 50);
  rect(190, 10, 50, 50);
}

function mousePressed() {
  if (dist(mouseX, mouseY, 35, 35) < 25) {
    currentMode = "vertexes";
    val = false;
  } else if (dist(mouseX, mouseY, 95, 35) < 25) {
    currentMode = "circles";
    val = false;
  } else if (dist(mouseX, mouseY, 155, 35) < 25) {
    currentMode = "trigs";
    val = false;
  } else if (dist(mouseX, mouseY, 215, 35) < 25) {
    currentMode = "rectangles";
    val = false;
  }
}

let prevPixels = [];
function recordingTheDifference(w, h) {
  for (let y = 0; y < h; y += RESOLUTION) {
    stroke(255);
    //fill(255, 100);
    noFill();
    for (let x = 0; x < w; x += RESOLUTION) {
      let index = (x + y * w) * 4; // RGBA
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
      fill(differenceValues[0], differenceValues[1], differenceValues[2]);
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
    for (let x = 0; x < w; x += RESOLUTION) {
      let index = (x + y * w) * 4; // RGBA
      let r = cam.pixels[index + 0];
      let g = cam.pixels[index + 1];
      let b = cam.pixels[index + 2];
      let a = cam.pixels[index + 3];

      let avg = (r + g + b) / 3;
      if (avg > 150) {
        fill(0);

        let size = map(avg, 150, 255, 0, 2 * RESOLUTION);

        textSize(size);
        text(val, x, y);
      }
    }
  }
}

function bwVertexes(w, h) {
  for (let y = 0; y < h; y += RESOLUTION) {
    stroke(255);
    //fill(255, 100);
    noFill();
    beginShape();
    for (let x = 0; x < w; x += RESOLUTION) {
      let index = (x + y * w) * 4; // RGBA
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

function colorfulVertexes(w, h) {
  for (let y = 0; y < h; y += RESOLUTION) {
    stroke(255);
    //fill(255, 100);
    noFill();
    beginShape();
    for (let x = 0; x < w; x += RESOLUTION) {
      let index = (x + y * w) * 4; // RGBA
      let r = cam.pixels[index + 0];
      let g = cam.pixels[index + 1];
      let b = cam.pixels[index + 2];
      let a = cam.pixels[index + 3];

      let avg = (r + g + b) / 3;

      // let adjSize = map(avg, 0, 255, 0, RESOLUTION);
      // image(img, adjSize, adjSize);
      // // stroke(map(mouseX, 0, width, 0, 255), 0, 200);
      stroke(
        map(x, 0, w, 0, 255),
        map(y, 0, h, 0, 255),
        map(RESOLUTION, 0, 20, 0, 255)
      );

      let adjY = map(avg, 0, 255, RESOLUTION, -RESOLUTION);
      vertex(x, y + adjY);
    }
    endShape();
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
