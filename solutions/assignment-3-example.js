// Each file path in this array will be loaded in `preload()` and associated with a sequence
let soundFiles = [
    'sounds/lofi-drums/kick/kick 05.wav',
    'sounds/lofi-drums/snare/snare 03.wav',
    'sounds/lofi-drums/hats/hat 04.wav',
    'sounds/lofi-drums/hats/hat 05.wav',

    'sounds/chords/flora1.wav',
    'sounds/chords/keys2.wav',
    'sounds/chords/keys9.wav',
    'sounds/fx/rain1.mp3',
];

// Each sequence in this array corresponds to a soundFile with the same index
let sequences = [
    [1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0,],
    [0, 0, 0, 0, 1, 0, 0, 0,],
    [0, 1, 0, 0, 0, 0, 1, 0,],
    [0, 0, 1, 0, 0, 0.9, 1.1, 0, 0,],

    [0,],
    [0,],
    [0,],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
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
    frameRate(6); // number of times per second draw() is called

    sequences[4] = [];
    let choices = [0.5, 0.75, 1, 2];
    for (i = 0; i < 64; i++) {
        if (Math.random() > 0.9) {
            let x = Math.floor(Math.random() * 4);
            sequences[4].push(choices[x]);
        } else {
            sequences[4].push(0);
        }
    }

    // https://p5js.org/reference/p5.sound/p5.Part/
    part = new p5.Part();

    // Tempo
    part.setBPM(70);

    // https://p5js.org/reference/p5.sound/p5.Phrase/
    // Associate a sound with a sequence. 
    let phrase0 = new p5.Phrase(`sound0`, play0, sequences[0]);
    let phrase1 = new p5.Phrase(`sound1`, play1, sequences[1]);
    let phrase2 = new p5.Phrase(`sound2`, play2, sequences[2]);
    let phrase3 = new p5.Phrase(`sound3`, play3, sequences[3]);
    let phrase4 = new p5.Phrase(`sound4`, play4, sequences[4]);
    let phrase5 = new p5.Phrase(`sound5`, play5, sequences[5]);
    let phrase6 = new p5.Phrase(`sound6`, play6, sequences[6]);
    let phrase7 = new p5.Phrase(`sound7`, play7, sequences[7]);


    // Adding the phrases to the same part ensures they play together and in sync
    // Comment a part out to mute it
    part.addPhrase(phrase0);
    part.addPhrase(phrase1);
    part.addPhrase(phrase2);
    part.addPhrase(phrase3);
    part.addPhrase(phrase4);
    // part.addPhrase(phrase5);
    // part.addPhrase(phrase6);
    part.addPhrase(phrase7);

    // Mixing - volume is from 0 to 1
    sounds[0].setVolume(.5);
    sounds[1].setVolume(.5);
    sounds[2].setVolume(.2);
    sounds[3].setVolume(.2);
    sounds[4].setVolume(.2);
    sounds[5].setVolume(.2);
    sounds[6].setVolume(.2);
    sounds[7].setVolume(.1);


}

function draw() {
    // This function is called 6x per second

    // 1/10 chance to change volume for the kick
    if (Math.random() > .9) {
        sounds[0].setVolume(0.0);
    } else {
        sounds[0].setVolume(0.4);
    }

    // 9/10 chance to change volume for the keys
    if (Math.random() > .9) {
        sounds[4].setVolume(0.1);
    } else {
        sounds[4].setVolume(0.3);
    }
}

function makeCanvas() {
    let cnv = createCanvas(720, 480);
    cnv.mousePressed(playMyPart);
    background(220);
    textAlign(CENTER, CENTER);
    text('click to play/pause', width / 2, height / 2);
}

function mousePressed() {
    // Click anywhere on the canvas to start/stop sound
    userStartAudio();
    playing ? part.stop() : part.start();
    playing = !playing
}

function play0(time, playbackRate) {
    // time param is injected by the callback; playbackRate provided by us
    sounds[0].rate(playbackRate);
    sounds[0].play(time);
}

function play1(time, playbackRate) {
    sounds[1].rate(playbackRate);
    sounds[1].play(time);
}

function play2(time, playbackRate) {
    sounds[2].rate(playbackRate);
    sounds[2].play(time);
}

function play3(time, playbackRate) {
    sounds[3].rate(playbackRate);
    sounds[3].play(time);
}

function play4(time, playbackRate) {
    sounds[4].rate(playbackRate);
    sounds[4].play(time);
}

function play5(time, playbackRate) {
    sounds[5].rate(playbackRate);
    sounds[5].play(time);
}

function play6(time, playbackRate) {
    sounds[6].rate(playbackRate);
    sounds[6].play(time);
}

function play7(time, playbackRate) {
    sounds[7].rate(playbackRate);
    sounds[7].play(time);
}


function playMyPart() {
    part.loop();
}
