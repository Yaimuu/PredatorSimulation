const WIDTH = window.innerWidth;
const HEIGTH = window.innerHeight;
// const WIDTH = 400;
// const HEIGTH = 400;

var environment = new Environment(WIDTH, HEIGTH);

function setup() {
    createCanvas(WIDTH, HEIGTH);
    environment.generateMap();
    console.log(environment.agentList);
    // background(255, 255, 255);
    // environment.run();
  }
  
  function draw() {
    background(32);
    environment.run();

    // fill(0);
    // textAlign(CENTER);
    // text('Click to create a new sprite', width/2, height/2);
    //draw all the sprites added to the sketch so far
    //the positions will be updated automatically at every cycle
    // drawSprites();
  }
  
  function mousePressed() {
    environment.showGauges(mouseX, mouseY);
    //create a sprite at the mouse position and store it in a temporary variable
    // var s = createSprite(mouseX, mouseY, 30, 30);
    //if no image or animation is associated it will be a rectancle of the specified size
    //and a random color
    
    //now you can use the variable to set properties
    //e.g. a random velocity on the x and y coordinates
    // s.velocity.x = random(-5, 5);
    // s.velocity.y = random(-5, 5);
  }
  