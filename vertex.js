let RESOLUTION = 16;
let cam;

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("canvasContainer");
  background(0);

  cam = createCapture(VIDEO);
  cam.hide();
}

function draw() {
  background(255);

  cam.loadPixels();
  let w = cam.width;
  let h = cam.height;

  vertexes(w, h);
}

function vertexes(w, h) {
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
      let mapX = map(x, 0, w, 0, width);
      let mapY = map(y, 0, h, 0, (width * 3) / 4);
      noStroke();
      let colorDiff = 10;
      fill(
        r + random(-colorDiff, colorDiff),
        g + random(-colorDiff, colorDiff),
        b
      ) + random(-colorDiff, colorDiff);
      beginShape();
      let len = map(avg, 0, 255, 10, 50);
      vertex(mapX + random(-len, len), mapY + random(-len, len));
      vertex(mapX + random(-len, len), mapY + random(-len, len));
      vertex(mapX + random(-len, len), mapY + random(-len, len));
      endShape(CLOSE);
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
