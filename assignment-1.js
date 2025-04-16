/*
  Reference: 
    - https://p5js.org/reference/p5.sound/
*/

let sound; 

function preload() {
   sound = loadSound('sounds/lofi-drums/kick/kick 01.wav');
}

function setup() {
  // Setup canvas and text
  let cnv = createCanvas(720, 480);
  cnv.mousePressed(play);
  background(220);
  textAlign(CENTER, CENTER);
  text('click to play sample', width/2, height/2);
}

function play() {
  userStartAudio();
  sound.play();
}
