const WIDTH = window.innerWidth;
const HEIGTH = window.innerHeight;
// const WIDTH = 400;
// const HEIGTH = 400;

var environment = new Environment(WIDTH, HEIGTH);

function setup() {
    let canvas = createCanvas(WIDTH, HEIGTH);
    canvas.mouseClicked(mousePressedOnCanvas);
    environment.generateMap();
    console.log(environment.agentList);
    // background(255, 255, 255);
    // environment.run();
  }
  
  function draw() {
    background(32);
    environment.run();
  }
  
  function mousePressedOnCanvas() {
    environment.showGauges(mouseX, mouseY);
  }
  