const RESOLUTION = 10;
let cam;
const CAM_WIDTH = 1000;
const CAM_HEIGHT = 750;
let fileName = 1;

function setup() {
  let canvas = createCanvas(CAM_WIDTH, CAM_HEIGHT);
  canvas.parent("canvasContainer");
  background(0);

  cam = createCapture(VIDEO);
  cam.size(CAM_WIDTH, CAM_HEIGHT);
  cam.hide();
}

function draw() {
  background(0, 30);

  cam.loadPixels(); //cam.pixels is accesible after this line!

  let w = cam.width;
  let h = cam.height;
  processPixels(w, h);
}

function processPixels(w, h) {
  for (let y = 0; y < h; y += RESOLUTION) {
    for (let x = 0; x < w; x += RESOLUTION) {
      let index = (x + y * w) * 4; // RGBA
      let r = cam.pixels[index + 0];
      let g = cam.pixels[index + 1];
      let b = cam.pixels[index + 2];
      let a = cam.pixels[index + 3];

      let avg = (r + g + b) / 3;

      beginShape();
      stroke(0);
      if (avg > 50) {
        let len = map(avg, 0, 255, 10, 50);
        vertex(x + random(-len, len), y + random(-len, len));
        vertex(x + random(-len, len), y + random(-len, len));
        vertex(x + random(-len, len), y + random(-len, len));
        vertex(x + random(-len, len), y + random(-len, len));
        vertex(x + random(-len, len), y + random(-len, len));
        vertex(x + random(-len, len), y + random(-len, len));
      }
      endShape();
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
