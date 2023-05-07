let RESOLUTION = 16;
let cam;

let currentMode = 1;

function setup() {
  let canvas = createCanvas(windowWidth, 480);
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

  vertexes(w, h);
}

function vertexes(w, h) {
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

function mouseWheel(event) {
  print(event.delta);
  if (event.delta > 0 && RESOLUTION < 40) {
    RESOLUTION += 1;
  } else if (event.delta < 0 && RESOLUTION > 8) {
    RESOLUTION -= 1;
  }
}
