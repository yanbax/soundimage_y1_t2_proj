//A video feed from webcam which will detect motion and then 'delete' (fill out with black) the areas which moved

let feed;
let feedWidth = 640;
let feedHeight = 360;
let prevFrame;
let address;
let threshold = 3;

function setup() {
  
  createCanvas(feedWidth,feedHeight);
  
  //found an issue where it wouldn't load the previous frame as anything other than blank - according to a StackOverflow page I referenced, this is due to the feed's metadata not being set as 'ready' by using the simple/short assignment of feed size
  //assigning video properties using the longer constraints method instead seems to fix it
  let constraints = {
    video: {
      mandatory: {
        maxWidth: feedWidth,
        maxHeight: feedHeight
      }
    },
    audio: false
  };
  
  feed = createCapture( constraints );
  prevFrame = feed.get(0, 0, feedWidth, feedHeight);
  feed.hide();
}

function draw() {
  background( 200 );
  image(prevFrame, 0, 0, feedWidth, feedHeight);
  
  loadPixels();
  feed.loadPixels();
  prevFrame.loadPixels();
  
  //this section very heavily relying on a Daniel Shiffman sketch (https://editor.p5js.org/ebenjmuse/sketches/rklr8q-yz)
  //the only other way I could think to do this kind of work is to copy the values of each pixel to a new array and then compare arrays to find out which values changed, which makes me sweat thinking about the amount of time that would take comparatively
  //this is altogether much more elegant and, while I can't claim it's original, I'll be building on it further
  for(x = 0; x < feed.width; x++){
    for(y = 0; y < feed.height; y++){
      
      //find the address/location of the pixel we're looking at in the frame
      address = (x + y * feed.width) * 4;
      
      //find the old values for pixel colour
      let rOld = prevFrame.pixels[address];
      let gOld = prevFrame.pixels[address + 1];
      let bOld = prevFrame.pixels[address + 2];
      
      //find the new values for pixel colour
      let rNew = feed.pixels[address];
      let gNew = feed.pixels[address + 1];
      let bNew = feed.pixels[address + 2];
      
      //find difference between them
      let diff = dist(rOld, gOld, bOld, rNew, gNew, bNew);
      
      if(diff > threshold){
        pixels[address] = 0;
        pixels[address + 1] = 0;
        pixels[address + 2] = 0;
        pixels[address + 3] = 255;
      }
    }
  }
  updatePixels();
  
  prevFrame = feed.get(0, 0, feedWidth, feedHeight);
}