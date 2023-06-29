const SCALE = Math.pow(2, 32);
let x = 0;

let seed = 1;

function setup() {
    let cnv = createCanvas(500,500);
    cnv.parent("divDisplay");
    background(0);
    noStroke();
}

function draw() {
    plot1D(Math.random());
}

/********************/
/* Random functions */
/********************/
let state = seed;
function simpleRandom() {


    return state / SCALE + .5;
}

function simpleNoise(x) {


    return state / SCALE + .5;
}

function simpleNoiseSeed(seed, x) {


    return state / SCALE + .5;
}


function smoothNoise(seed, x) {


    return state / SCALE + .5;
}

function multiNoise(seed, x) {


    return state / SCALE + .5;
}


/**********************/
/* Plotting functions */
/**********************/
function plot1D (value) {
    blendMode(DARKEST);
    fill(100,255,100);
    rect(0,0,500,500);

    blendMode(BLEND);
    fill(0);
    rect(x, 0, 1, 500 - value * 500);
    fill(255);
    rect(x, 500 - value * 500, 1, value * 500);

    x = (x + 1) % 500;
}
