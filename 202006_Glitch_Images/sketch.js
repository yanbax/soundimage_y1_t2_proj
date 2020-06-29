//Takes an image and scrambles the pixels in varying amounts and sections vertically

let pic;
let indexStart;
let indexEnd;
let moveAmount;
let direction;
let xVal;
let modifyArray;

function setup() {
  createCanvas(400, 400);
  pic = loadImage('glitchimg2.png');
  //this sketch actually has its own real-life glitch; the loadPixels method doesn't ever have to be called, but it still functions. Sometimes it will load the image and allow you to see it glitching in real time, other times it will simply show the pixel manipulation loading but not the original image
//This was discovered by accident when I was playing with the placement of loadPixels
  //For contingency, I've added loadPixels here to make sure it works, but if this line is cut out and a space is left, the effect should change
  loadPixels();
}

function draw() {
  background(220);
  image(pic, 0,0,width,height);
  frameRate(50);
  glitch_it();
}

function glitch_it() {
  //putting this in its own function just for easy reading. Could just as well be done under draw
  
  //select a random range of pixels to mess with
  
  //first select which row from
  xVal = int(random(0, height));
  
  indexStart = int(random(0, width));
  
  if (indexStart == width) {
    //just a contingency on the off chance that the selected start is the last pixel
    indexEnd = int(random(0, (width - 1)));
  } else {
    indexEnd = int(random(indexStart, width));
  }
  
  //how far are we going to shift everything?
  moveAmount = int(random(1, width));
  
  //decide whether we'll shift up or down. I'm doing this as a random integer; gives a nice 50/50 chance
  direction = int(random(1, 10));
  
  switch (direction % 2) {
    case 0:
      for(indexEnd; indexEnd > indexStart; indexEnd--) {
        modifyArray = get(xVal, indexEnd);
        set(xVal, (indexEnd + moveAmount), modifyArray);
      }
    case 1:
      for(indexStart; indexStart < indexEnd; indexStart++) {
        modifyArray = get(xVal, indexStart);
        set(xVal, (indexStart - moveAmount), modifyArray);
      }
  }
  updatePixels();
}