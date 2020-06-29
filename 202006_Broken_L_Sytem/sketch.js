//An L-system drawn by a turle who's afraid of mice

//using a basic dragon curve algorithm. I like its blocky nature for the glitch aesthetic

//set up the dragon curve rules
let axiom = "FX";
let output = axiom;
let newOutput = "";
let rules = [];

//place to store to find out where our turtle is
let turtlePos = 0;
let turtleAngle = 0;

//a set of nice 'glitchy' colours to use 
let colours = ['#020202', '#3e3c41', '#fdfefe', '#cc0f39', '#0ffbf9', '#c2bfcc', '#c36b93', '#cdc764'];

//don't run forever and crash everything
let maxSteps = 10;
let step = 0;

//set an angle var and set how much we should be turning by
let currentAngle = 0;
let turnAngle = 90;

rules[0] = {
  a: "X",
  b: "X+YF+"
}

rules[1] = {
  a: "Y",
  b: "-FX-Y"
}

function setup() {
  createCanvas(400, 400);
  //go REALLY slow so we have a chance to process what's happening
  frameRate(1);
}

function draw() {
  //no background, I want it transparent
  
  if(step == 0) {
    //set the start point for the drawing
    translate(20, 20);
    
    //turtle moves too
    turtlePos = 20;
  }
  
  if(mouseX == turtlePos) {
    //if we touch the turtle (our translated origin point as we're drawing), he leaps away from the mouse and starts drawing at another random point. The background also turns pink. He's a bit hard to catch
    background('pink');
    translate((int(random(1, width -1))),(int(random(1, height-1)))); 
  }
  
  if(step < maxSteps) {
    for(var p = 0; p < output.length; p++) {
      let char = output[p];
      
      //select a random colour from our pallette 
      let randomColour = int(random(0, colours.length));
      let selectedColour = colours[randomColour];
      stroke(selectedColour);
      
      if(char == "X" || char == "Y") {
        //X and Y just control the evolution of the curve, so don't do anything if we hit one of these
      } else if(char == "F") {
        //F moves us forwards
        line(0, 0, 10, 0);
        translate(10, 0);
        if(turtleAngle == 0) {
          turtlePos += 10;
        } else if(turtleAngle == 180) {
          turtlePos -= 10;
        }
      } else if(char == "+") {
        //+ rotates us right
        rotate(radians(currentAngle + turnAngle));
        turtleAngle = getTurtleAngle(char);
      } else if(char == "-") {
        //- rotates us left
        rotate(radians(currentAngle - turnAngle));
        turtleAngle = getTurtleAngle(char);
      }
    }
    calcDraw();
  }
}

function calcDraw() {
  //calculating what the string will be once processed by the l sys
  for(a = 0; a < output.length; a++) {
    let position = output.charAt(a);
    
    let present = false;
    
    for(b = 0; b < rules.length; b++) {
      if(position == rules[b].a) {
        present = true;
        newOutput += rules[b].b;
        break;
      }
    }
    if(!present) {
      newOutput += position;
    }
  }
  output = newOutput;
  step += 1;
}

function getTurtleAngle(char) {
  //I'm so sure there's a simple, clean way to do this with PI but I've been struggling with it for ages and still can't get it quite right. Done the sums as a manual reference but this is really messy and long-winded
  if(turtleAngle == 0) {
    if(char == "+") {
      turtleAngle = 90;
    } else if(char == "-") {
      turtleAngle = 270;
    }
  } else if(turtleAngle == 90) {
    if(char == "+") {
      turtleAngle = 180;
    } else if(char == "-") {
      turtleAngle = 0;
    }
  } else if(turtleAngle == 180) {
    if(char == "+") {
      turtleAngle = 270;
    } else if(char == "-") {
      turtleAngle = 90;
    }
  } else if(turtleAngle == 270) {
    if(char == "+") {
      turtleAngle = 0;
    } else if(char == "-") {
      turtleAngle = 180;
    }
  }
  return turtleAngle;
}