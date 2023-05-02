const letters = [" ", ".", ",", "-", "*", "!", "+", "@", "#", "$"];

let RESOLUTION = 10;
let cam;

function setup() {
  createCanvas(1000, 700);
  background(0);

  cam = createCapture(VIDEO);
  cam.hide();
}

function draw() {
  background(0);

  cam.loadPixels(); //cam.pixels is accesible after this line!
  let w = cam.width;
  let h = cam.height;
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

      let adjY = map(avg, 0, 255, RESOLUTION, -RESOLUTION);
      vertex(x, y + adjY);
    }
    endShape();
  }
}

function mouseWheel(event) {
  print(event.delta);
  if (event.delta > 0 && RESOLUTION < 15) {
    RESOLUTION++;
  } else if (event.delta < 0 && RESOLUTION > 5) {
    RESOLUTION--;
  }
}
