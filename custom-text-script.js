let RESOLUTION = 16;
let cam;
let val = "?";
const CAM_WIDTH = 1000;
const CAM_HEIGHT = 750;

document
  .getElementById("submitCustomCharacter")
  .addEventListener("click", getVal);
function getVal() {
  val = document.getElementById("customCharacter").value;
  console.log("Value updated:", val);
}

function preload() {}

function setup() {
  let canvas = createCanvas(CAM_WIDTH, CAM_HEIGHT);
  canvas.parent("canvasContainer");
  background(0);

  cam = createCapture(VIDEO);
  cam.size(CAM_WIDTH, CAM_HEIGHT);
  cam.hide();
}

function draw() {
  background(255);

  cam.loadPixels();
  let w = cam.width;
  let h = cam.height;
  customTextFrame(w, h);
}

function customTextFrame(w, h) {
  for (let y = 0; y < h; y += RESOLUTION) {
    stroke(255);
    noFill();
    for (let x = 0; x < w; x += RESOLUTION) {
      let index = (x + y * w) * 4; // RGBA
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
function mouseWheel(event) {
  print(event.delta);
  if (event.delta > 0 && RESOLUTION < 40) {
    RESOLUTION += 1;
  } else if (event.delta < 0 && RESOLUTION > 8) {
    RESOLUTION -= 1;
  }
}
