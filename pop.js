let RESOLUTION = 16;
let cam;
let val = false;
const CAM_WIDTH = 1000;
const CAM_HEIGHT = 750;

let modes = ["defColorful", "offsetColorful", "offsetColorful2"];

let currentMode = 1;

function preload() {}

function setup() {
  let canvas = createCanvas(CAM_WIDTH, CAM_HEIGHT);
  canvas.parent("canvasContainer");
  background(0);

  cam = createCapture(VIDEO);
  cam.size(CAM_WIDTH, CAM_HEIGHT);
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
    for (let x = 0; x < w; x += RESOLUTION) {
      let index = (x + y * w) * 4; // RGBA
      let r = cam.pixels[index + 0];
      let g = cam.pixels[index + 1];
      let b = cam.pixels[index + 2];
      let a = cam.pixels[index + 3];

      let avg = (r + g + b) / 3;
      let mapX = map(x, 0, w, 0, width);
      let mapY = map(y, 0, h, 0, (width * 3) / 4);

      if (avg > 50) {
        fill("#FFFF00");
        circle(mapX + 2 * RESOLUTION, mapY, 2 * RESOLUTION);
        fill("#FF00FF");
        circle(mapX + RESOLUTION, mapY, RESOLUTION);
        fill("#00FFFF");
        circle(mapX, mapY, RESOLUTION / 2);
      }
    }
  }
}

function offsetColorful(w, h) {
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
      if (avg > 50) {
        fill("#FFFF00");
        circle(mapX + 2 * RESOLUTION, mapY, RESOLUTION);
        fill("#00FFFF");
        circle(mapX + RESOLUTION, mapY, RESOLUTION);
        fill("#FF00FF");
        circle(mapX, mapY, RESOLUTION);
      }
    }
  }
}

function offsetColorful2(w, h) {
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
      if (avg > 50) {
        fill("#FF00FF");
        rect(mapX, mapY, RESOLUTION, RESOLUTION);
        fill("#FFFF00");
        rect(mapX + 2 * RESOLUTION, mapY, RESOLUTION, RESOLUTION);
        fill("#00FFFF");
        rect(mapX + 4 * RESOLUTION, mapY, RESOLUTION, RESOLUTION);
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
