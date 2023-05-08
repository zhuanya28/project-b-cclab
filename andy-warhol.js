const CAM_WIDTH = 500;
const CAM_HEIGHT = 375;
const RESOLUTION = 10;
let cam;
let img; // blank
let fileName = 1;

function setup() {
  let canvas = createCanvas(CAM_WIDTH * 2, CAM_HEIGHT * 2);
  canvas.parent("canvasContainer");
  background(0);

  cam = createCapture(VIDEO);
  cam.size(CAM_WIDTH, CAM_HEIGHT);
  cam.hide();
  img = createImage(CAM_WIDTH, CAM_HEIGHT);
}

function draw() {
  background(0);

  cam.loadPixels(); //cam.pixels is accesible after this line!
  img.loadPixels();

  let w = cam.width;
  let h = cam.height;

  processImage(w, h);
  image(img, 0, 0);
  image(img, 500, 0);
  image(img, 0, 375);
  image(img, 500, 375);
}

function processImage(w, h) {
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let index = (x + y * w) * 4; // RGBA
      let r = cam.pixels[index + 0];
      let g = cam.pixels[index + 1];
      let b = cam.pixels[index + 2];
      let a = cam.pixels[index + 3];

      let avg = (r + g + b) / 3;

      let nr, ng, nb;
      if (x <= CAM_WIDTH / 2 && y <= CAM_HEIGHT / 2) {
        if (avg < 255 * 0.25) {
          nr = 100;
          ng = 255;
          nb = 0;
        } else if (avg < 255 * 0.5) {
          nr = 255;
          ng = 0;
          nb = 100;
        } else if (avg < 255 * 0.75) {
          nr = 255;
          ng = 100;
          nb = 0;
        } else {
          nr = 0;
          ng = 100;
          nb = 255;
        }
      } else if (x <= CAM_WIDTH / 2 && y >= CAM_HEIGHT / 2) {
        if (avg < 255 * 0.25) {
          nr = 255;
          ng = 0;
          nb = 255;
        } else if (avg < 255 * 0.5) {
          nr = 0;
          ng = 200;
          nb = 200;
        } else if (avg < 255 * 0.75) {
          nr = 0;
          ng = 255;
          nb = 0;
        } else {
          nr = 255;
          ng = 0;
          nb = 255;
        }
      } else if (x >= CAM_WIDTH / 2 && y <= CAM_HEIGHT / 2) {
        if (avg < 255 * 0.25) {
          nr = 255;
          ng = 255;
          nb = 100;
        } else if (avg < 255 * 0.5) {
          nr = 100;
          ng = 0;
          nb = 255;
        } else if (avg < 255 * 0.75) {
          nr = 0;
          ng = 0;
          nb = 255;
        } else {
          nr = 0;
          ng = 255;
          nb = 255;
        }
      } else if (x >= CAM_WIDTH / 2 && y >= CAM_HEIGHT / 2) {
        if (avg < 255 * 0.25) {
          nr = 0;
          ng = 255;
          nb = 0;
        } else if (avg < 255 * 0.5) {
          nr = 255;
          ng = 0;
          nb = 255;
        } else if (avg < 255 * 0.75) {
          nr = 0;
          ng = 100;
          nb = 255;
        } else {
          nr = 0;
          ng = 0;
          nb = 255;
        }
      }

      img.pixels[index + 0] = nr;
      img.pixels[index + 1] = ng;
      img.pixels[index + 2] = nb;
      img.pixels[index + 3] = 255;
    }
  }
  img.updatePixels();
}
function keyPressed() {
  if (key === "s" || key === "S") {
    let fileNameFinal = "MIRRORbyZHUANYA" + fileName.toString();
    saveCanvas(fileNameFinal, "jpg");
    fileName++;
  }
}
