/*
  Reference: https://p5js.org/reference/p5.sound/
*/

let soundFiles = [
  'sounds/lofi-drums/kick/kick 01.wav', 
  'sounds/lofi-drums/snare/snare 01.wav',
  'sounds/lofi-drums/hats/hat 01.wav',
];

const customContext = new (window.AudioContext || window.webkitAudioContext)({
  latencyHint: 'playback',
  sampleRate: 44100
});

// Uncomment line below if having trouble with playback (clicks and pops)
// p5.prototype.getAudioContext = () => customContext;

let currentStep = 0;
let numSteps = 8; // max steps for grid, should match longest sequence

let sequences = [
  [1, 0, 0, 0, 0, 0, 0, 0,],   
  [0, 0, 0, 0, 1, 0, 0, 0,],
  [0, 0, 1, 0, 0, 0, 1, 0,],
];

let sounds = [];
let part;
let amp;
let playing = false;

function preload() {
  for (let file of soundFiles) {
    sounds.push(loadSound(file));
  }
}

function setup() {
  for (i = 0; i < sequences[0].length; i++) {
    if (sequences[0][i] > 0) {
      sequences[0][i] = 0.5 + Math.random();
    }
  }

  for (i = 0; i < sequences[1].length; i++) {
    if (sequences[1][i] > 0) {
      sequences[1][i] = .5 + Math.random() * 2;
    }
  }

  for (i = 0; i < sequences[2].length; i++) {
    if (sequences[2][i] > 0) {
      sequences[2][i] = .5 + Math.random();
    }
  }  

  let cnv = createCanvas(720, 480);
  cnv.mousePressed(playMyPart);
  background(220);
  textAlign(CENTER, CENTER);
  text('tap to play', width/2, height/2);

  part = new p5.Part();
  for (let i = 0; i < sounds.length; i++) {    
    let phrase = new p5.Phrase(`sound${i}`, makePlayer(i), sequences[i]);
    part.addPhrase(phrase);
  }

  sounds[2].setVolume(.2);

  part.setBPM(80);
}

function draw() {
  background(10);
}


function mousePressed() {
  // Click anywhere on the canvas to start/stop sound
  playing ? part.stop() : part.start();
  playing = !playing
}

// Factory function for a callback playing sound <n> at a given playback rate
function makePlayer(index) {
  return function(time, playbackRate) {
    sounds[index].rate(playbackRate);
    sounds[index].play(time);
  };
}

function playMyPart() {
  userStartAudio();
  part.loop();
}
