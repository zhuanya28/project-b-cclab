let RESOLUTION = 16;
let cam;
let val = false;

let modes = ["defColorful", "offsetColorful", "offsetColorful2"];

let currentMode = 1;

function preload() {}

function setup() {
  let canvas = createCanvas(windowWidth, 480);
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

  if (modes[currentMode] === "defColorful") {
    defColorful(w, h);
  } else if (modes[currentMode] === "offsetColorful") {
    offsetColorful(w, h);
  } else if (modes[currentMode] === "offsetColorful2") {
    offsetColorful2(w, h);
  }
}

function keyPressed() {
  if (keyCode === RIGHT_ARROW) {
    if (val != false) {
      val = false;
      currentMode++;
    } else if (currentMode + 1 < modes.length) {
      currentMode++;
    } else {
      currentMode = 0;
    }
  } else if (keyCode === LEFT_ARROW) {
    if (val != false) {
      val = false;
      currentMode--;
    } else if (currentMode - 1 >= 0) {
      currentMode--;
    } else {
      currentMode = modes.length - 1;
    }
  }
}

function defColorful(w, h) {
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
      let a = cam.pixels[index + 3];

      let avg = (r + g + b) / 3;

      if (avg > 100) {
        fill("#FFFF00");
        circle(x + 2 * RESOLUTION, y, 2 * RESOLUTION);
        fill("#FF00FF");
        circle(x + RESOLUTION, y, RESOLUTION);
        fill("#00FFFF");
        circle(x, y, RESOLUTION / 2);
      }
    }
  }
}

function offsetColorful(w, h) {
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
      let a = cam.pixels[index + 3];

      let avg = (r + g + b) / 3;

      if (avg > 100) {
        fill("#FFFF00");
        circle(x + 2 * RESOLUTION, y, RESOLUTION);
        fill("#00FFFF");
        circle(x + RESOLUTION, y, RESOLUTION);
        fill("#FF00FF");
        circle(x, y, RESOLUTION);
      }
    }
  }
}

function offsetColorful2(w, h) {
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
      let a = cam.pixels[index + 3];

      let avg = (r + g + b) / 3;

      if (avg > 50) {
        fill("#FF00FF");
        rect(x, y, RESOLUTION, RESOLUTION);
        fill("#FFFF00");
        rect(x + 2 * RESOLUTION, y, RESOLUTION, RESOLUTION);
        fill("#00FFFF");
        rect(x + 4 * RESOLUTION, y, RESOLUTION, RESOLUTION);
      }
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
