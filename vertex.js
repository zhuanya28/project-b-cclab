let RESOLUTION = 16;
let cam;
let CAM_HEIGHT = 750;
let CAM_WIDTH = 1000;
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
  background(255, 10);

  cam.loadPixels();
  let w = cam.width;
  let h = cam.height;

  vertexes(w, h);
}

function vertexes(w, h) {
  for (let y = 0; y < h; y += RESOLUTION) {
    for (let x = 0; x < w; x += RESOLUTION) {
      let index = (x + y * w) * 4; // RGBA
      let r = cam.pixels[index + 0];
      let g = cam.pixels[index + 1];
      let b = cam.pixels[index + 2];
      let mapX = map(x, 0, w, 0, width);
      let mapY = map(y, 0, h, 0, (width * 3) / 4);
      let avg = (r + b + g) / 3;
      noStroke();
      let colorDiff = 10;
      fill(
        r + random(-colorDiff, colorDiff),
        g + random(-colorDiff, colorDiff),
        b
      ) + random(-colorDiff, colorDiff);
      beginShape();
      let len = map(avg, 0, 255, 20, 100);
      vertex(mapX + random(-len, len), mapY + random(-len, len));
      vertex(mapX + random(-len, len), mapY + random(-len, len));
      vertex(mapX + random(-len, len), mapY + random(-len, len));
      endShape(CLOSE);
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
