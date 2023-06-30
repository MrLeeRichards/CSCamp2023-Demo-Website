const SCALE = Math.pow(2, 32);
let x = 0;
let y = 0;
let z = 0;

let seed = 10;

let plot;

function preload() {
    plot = loadImage("block.png");
}

function setup() {
    let cnv = createCanvas(500,500);
    cnv.parent("divDisplay");
    background(0);
    noStroke();
}

function draw() {
    for (let i = 0; i < 1000; i++) {
        plot2D(simpleNoise3D(seed, x, y));
    }
}

function simpleNoise3D(seed, x = 0, y = 0, z = 0) {
    let state = seed * 1048549;
    state = state ^ (state << 8);
    state = state * 1048367;

    state = state ^ (x * 1047467);
    state = state * 1047671;
    state = state ^ (state >> 8);

    state = state ^ (y * 1047469);
    state = state * 1047989;
    state = state ^ (state << 8);

    state = state ^ (z * 1047467);
    state = state * 1048447;
    state = state ^ (state >> 8);

    return state / SCALE + .5;
}

function smoothNoise3D(seed, x = 0, y = 0, z = 0) {
    let wholeX = Math.floor(x);
    let partialX = x % 1;
    let wholeY = Math.floor(y);
    let partialY = y % 1;
    let wholeZ = Math.floor(z);
    let partialZ = z % 1;

    const lerp = function(n1, n2, i) {
        return n1 * (1 - i) + n2 * i;
    }

    return lerp(
        lerp(
            lerp(
                simpleNoise3D(seed, wholeX, wholeY, wholeZ),
                simpleNoise3D(seed, wholeX, wholeY, wholeZ + 1),
                partialZ
            ),
            lerp(
                simpleNoise3D(seed, wholeX, wholeY + 1, wholeZ),
                simpleNoise3D(seed, wholeX, wholeY + 1, wholeZ + 1),
                partialZ
            ),
            partialY
        ),
        lerp(
            lerp(
                simpleNoise3D(seed, wholeX + 1, wholeY, wholeZ),
                simpleNoise3D(seed, wholeX + 1, wholeY, wholeZ + 1),
                partialZ
            ),
            lerp(
                simpleNoise3D(seed, wholeX + 1, wholeY + 1, wholeZ),
                simpleNoise3D(seed, wholeX + 1, wholeY + 1, wholeZ + 1),
                partialZ
            ),
            partialY
        ),
        partialX
    )
}

function multiNoise3D(seed, x = 0, y = 0, z = 0) {
    return smoothNoise3D(seed, x, y, z) * 0.5
            + smoothNoise3D(seed + 1, x * 2, y * 2, z * 2) * 0.25
            + smoothNoise3D(seed + 2, x * 4, y * 4, z * 4) * 0.125
            + smoothNoise3D(seed + 4, x * 8, y * 8, z * 8) * 0.0625
            + smoothNoise3D(seed + 8, x * 16, y * 16, z * 16) * 0.0625;
}

/**********************/
/* Plotting functions */
/**********************/
function plot2D(value) {
    let contrast = constrain(value * 2 - 1, 0, 1);

    fill(100 * contrast, 255 * contrast, 100 * contrast);
    rect(x,y,1,1);

    x++;

    if (x >= 500) {
        x = 0;
        y++;
        
        if (y >= 500) {
            y = 0;
            z++;
        }
    }
}

function plot3D(value) {
    if (value > .75) {
        image(plot, x + 250 - z, x * .5 + y + z * .5,2,2);
    }

    x++;

    if (x >= 250) {
        x = 0;
        y++;
        
        if (y >= 250) {
            y = 0;
            z++;

            if (z >= 250) {
                z = 0;
                background(0);
            }
        }
    }
}