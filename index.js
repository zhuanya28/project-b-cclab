let img;
let song;

let cap;
function setup() {
  createCanvas(400, 400);
  cap = createCapture(VIDEO);
  cap.hide();
  rectMode(CENTER);
  imageMode(CENTER);
  noStroke();
}
function draw() {
  background(50);
  fill(255);
  cap.loadPixels();
  //   let d = pixelDensity();
  //   for (let i = 0; i < d; i++) {
  //     for (let j = 0; j < d; j++) {
  //       index = 4 * ((y * d + j) * width * d + (x * d + i));
  //       cap[index] = r;
  //       cap[index + 1] = g;
  //       cap[index + 2] = b;
  //       cap[index + 3] = a;
  //     }
  //   }
  for (let cy = 0; cy < cap.height; cy += 1) {
    for (let cx = 0; cx < cap.width; cx += 1) {
      stroke(0);
      strokeWeight(1);
      line(cx, 0, cy, 0);
      updatePixels();
    }
  }

  image(cap, width / 2, height / 2);
}
