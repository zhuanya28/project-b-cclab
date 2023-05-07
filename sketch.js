const RESOLUTION = 10;
let cam;

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("canvasContainer");
  background(0);

  cam = createCapture(VIDEO);
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

      let mapX = map(x, 0, w, 0, width);
      let mapY = map(y, 0, h, 0, (width * 3) / 4);

      beginShape();
      stroke(0);
      if (avg > 50) {
        let len = map(avg, 0, 255, 10, 50);
        vertex(mapX + random(-len, len), mapY + random(-len, len));
        vertex(mapX + random(-len, len), mapY + random(-len, len));
        vertex(mapX + random(-len, len), mapY + random(-len, len));
        vertex(mapX + random(-len, len), mapY + random(-len, len));
        vertex(mapX + random(-len, len), mapY + random(-len, len));
        vertex(mapX + random(-len, len), mapY + random(-len, len));
      }
      endShape();
    }
  }
}
