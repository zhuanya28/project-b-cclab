let RESOLUTION = 16;
let cam;
let val = false;
const CAM_WIDTH = 1000;
const CAM_HEIGHT = 750;
let fileName = 1;

let modes = ["defColorful", "offsetColorful", "offsetColorful2"];

let currentMode = 1;

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
  background(255, 50);

  cam.loadPixels();
  let w = cam.width;
  let h = cam.height;

  defColorful(w, h);
}

function defColorful(w, h) {
  for (let y = 0; y < h; y += RESOLUTION) {
    for (let x = 0; x < w; x += RESOLUTION) {
      let index = (x + y * w) * 4; // RGBA
      let r = cam.pixels[index + 0];
      let g = cam.pixels[index + 1];
      let b = cam.pixels[index + 2];
      let a = cam.pixels[index + 3];

      let avg = (r + g + b) / 3;
      noStroke();

      if (avg > 100) {
        fill("#00FFFF");
        circle(x + RESOLUTION, y, RESOLUTION);
        fill("#FF00FF");
        circle(x + RESOLUTION * 2, y, RESOLUTION);
        fill("#FFFF00");
        circle(x, y, RESOLUTION);
      }
    }
  }
}

function keyPressed() {
  if (key === "s" || key === "S") {
    let fileNameFinal = "MIRRORbyZHUANYA" + fileName.toString();
    saveCanvas(fileNameFinal, "jpg");
    fileName++;
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
