let RESOLUTION = 10;
let cam;

function preload() {
  img = loadImage("assets/TylerTheCreator_SamRock.webp");
}

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
  trigs(w, h);
}

function trigs(w, h) {
  for (let y = 0; y < h; y += RESOLUTION) {
    stroke(255);
    //fill(255, 100);
    noFill();
    for (let x = 0; x < w; x += RESOLUTION) {
      let index = (x + y * w) * 4; // RGBA
      let r = cam.pixels[index + 0];
      let g = cam.pixels[index + 1];
      let b = cam.pixels[index + 2];
      let a = cam.pixels[index + 3];

      let avg = (r + g + b) / 3;

      // let adjSize = map(avg, 0, 255, 0, RESOLUTION);
      // image(img, adjSize, adjSize);
      // // stroke(map(mouseX, 0, width, 0, 255), 0, 200);

      fill(
        map(x, 0, w, 0, 255),
        map(y, 0, h, 0, 255),
        map(RESOLUTION, 0, 20, 0, 255),
        80
      );
      let size = map(avg, 0, 255, 0, RESOLUTION);
      triangle(
        x,
        y + random(-RESOLUTION - 10, RESOLUTION + 10),
        x + random(-RESOLUTION - 10, RESOLUTION + 10),
        y,
        x,
        y + random(-RESOLUTION - 10, RESOLUTION + 10)
      );
    }
  }
}

function circles(w, h) {
  for (let y = 0; y < h; y += RESOLUTION) {
    stroke(255);
    //fill(255, 100);
    noFill();
    for (let x = 0; x < w; x += RESOLUTION) {
      let index = (x + y * w) * 4; // RGBA
      let r = cam.pixels[index + 0];
      let g = cam.pixels[index + 1];
      let b = cam.pixels[index + 2];
      let a = cam.pixels[index + 3];

      let avg = (r + g + b) / 3;

      // let adjSize = map(avg, 0, 255, 0, RESOLUTION);
      // image(img, adjSize, adjSize);
      // // stroke(map(mouseX, 0, width, 0, 255), 0, 200);

      stroke(
        map(x, 0, w, 0, 255),
        map(y, 0, h, 0, 255),
        map(RESOLUTION, 0, 20, 0, 255)
      );
      fill(
        map(x, 0, w, 0, 255),
        map(y, 0, h, 0, 255),
        map(RESOLUTION, 0, 20, 0, 255),
        20
      );
      let size = map(avg, 0, 255, 0, RESOLUTION);
      circle(x, y, size);
    }
  }
}

function rectangles(w, h) {
  for (let y = 0; y < h; y += RESOLUTION) {
    stroke(255);
    //fill(255, 100);
    noFill();
    for (let x = 0; x < w; x += RESOLUTION) {
      let index = (x + y * w) * 4; // RGBA
      let r = cam.pixels[index + 0];
      let g = cam.pixels[index + 1];
      let b = cam.pixels[index + 2];
      let a = cam.pixels[index + 3];

      let avg = (r + g + b) / 3;

      // let adjSize = map(avg, 0, 255, 0, RESOLUTION);
      // image(img, adjSize, adjSize);
      // // stroke(map(mouseX, 0, width, 0, 255), 0, 200);

      stroke(
        map(x, 0, w, 0, 255),
        map(y, 0, h, 0, 255),
        map(RESOLUTION, 0, 20, 0, 255)
      );
      fill(
        map(x, 0, w, 0, 255),
        map(y, 0, h, 0, 255),
        map(RESOLUTION, 0, 20, 0, 255),
        20
      );
      let size = map(avg, 0, 255, 0, RESOLUTION);
      rect(x, y, size, size);
    }
  }
}

function vertexes(w, h) {
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

      // let adjSize = map(avg, 0, 255, 0, RESOLUTION);
      // image(img, adjSize, adjSize);
      // // stroke(map(mouseX, 0, width, 0, 255), 0, 200);
      stroke(
        map(x, 0, w, 0, 255),
        map(y, 0, h, 0, 255),
        map(RESOLUTION, 0, 20, 0, 255)
      );

      let adjY = map(avg, 0, 255, RESOLUTION, -RESOLUTION);
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
