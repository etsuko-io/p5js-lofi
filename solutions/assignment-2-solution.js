/*
  Reference: 
    - https://p5js.org/reference/p5.sound/


// Uncomment the snippet below if having trouble with playback (clicks and pops)
--------------------------------
const customContext = new (window.AudioContext || window.webkitAudioContext)({
  latencyHint: 'playback',
  sampleRate: 44100
});
p5.prototype.getAudioContext = () => customContext;
--------------------------------
*/

// 8:02 start
// 8:18 finish


// Each file path in this array will be loaded in `preload()` and associated with a sequence
let soundFiles = [
  'sounds/lofi-drums/kick/kick 01.wav', 
  'sounds/lofi-drums/snare/snare 02.wav',
  'sounds/lofi-drums/hats/hat 05.wav',
];

// Each sequence in this array corresponds to a soundFile with the same index
let sequences = [
    [1, 0, 0, 0,  0, 0, 0, 0,  1, 0, 1, 0,  0, 0, 0, 0],  // sequence for soundFiles[0] (Kick)
    [0, 0, 0, 0,  1, 0, 0, 0,  0, 0, 0, 0,  1, 0, 0, 0],  // sequence for soundFiles[1] (Snare)
    [0, 1, .9, 0,  0, 0, 1, 0,  0, 0, 1, 0,  0, 0, 1, 0],  // sequence for soundFiles[2] (Closed Hi-hat)
];

let sounds = []; 
let part;
let playing = false; // playback status

function preload() {
  // Load sounds before sketch starts
  for (let file of soundFiles) {
    sounds.push(loadSound(file));
  }
}

function setup() {
  // Setup canvas and text
  makeCanvas();
  
  randomSeed(99);
  sequences[2] = [];
  let choices = [0, 0.8, 1, 1.2];
  for (i = 0; i < 64; i++) {
      let x = Math.floor(Math.random() * 4);
      sequences[2].push(choices[x]);
  }

  // https://p5js.org/reference/p5.sound/p5.Part/
  part = new p5.Part();
  
  // Tempo
  part.setBPM(80);

  // https://p5js.org/reference/p5.sound/p5.Phrase/
  // Associate a sound with a sequence
  let phrase1 = new p5.Phrase(`sound1`, play1, sequences[0]);
  let phrase2 = new p5.Phrase(`sound2`, play2, sequences[1]);
  let phrase3 = new p5.Phrase(`sound3`, play3, sequences[2]);
  
  // Adding the phrases to the same part ensures they play together and in sync
  part.addPhrase(phrase1);
  part.addPhrase(phrase2);
  part.addPhrase(phrase3);

  // Mixing - volume is from 0 to 1
  sounds[0].setVolume(.4);
  sounds[1].setVolume(.2);
  sounds[2].setVolume(.1);
}

function makeCanvas() {
  let cnv = createCanvas(720, 480);
  cnv.mousePressed(playMyPart);
  background(220);
  textAlign(CENTER, CENTER);
  text('click to play', width/2, height/2);
}

function mousePressed() {
  // Click anywhere on the canvas to start/stop sound
  playing ? part.stop() : part.start();
  playing = !playing
}

function play1(time, playbackRate) {
  // time param is injected by the callback; playbackRate provided by us
  sounds[0].rate(playbackRate);
  sounds[0].play(time);
}

function play2(time, playbackRate) {
  sounds[1].rate(playbackRate);
  sounds[1].play(time);
}

function play3(time, playbackRate) {
  sounds[2].rate(playbackRate);
  sounds[2].play(time);
}

function playMyPart() {
  userStartAudio();
  part.loop();
}
