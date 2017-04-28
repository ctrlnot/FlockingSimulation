var init = 10; // Initial number of birbs
var birbs = [];
var simulate = true;
var flocking = false;
var debugMode = true;
var separating = true;
var mouseScare = false;

function setup() {
    var myCanvas = createCanvas(windowWidth, windowHeight);
    myCanvas.parent('content');

    // Initial birbs
    for (var i = 0; i < init; i++) {
        birbs[i] = new Birb(random(width), random(height));
    }
}

function draw() {
    background(240);

    // For avoiding and attracting mouse
    var mouse = createVector(mouseX, mouseY);

    // Display birbs
    for (var i = 0; i < birbs.length; i++) {
        birbs[i].run(mouse);
    }

    // Send Information
    document.getElementById('fps').innerHTML = "FPS: " + frameRate().toFixed(2);

    document.getElementById('birbs-no').innerHTML = "Number of birbs: " + birbs.length;
    document.getElementById('debug-mode').innerHTML = "Simulation: " + simulate + " | Debug mode: " + debugMode;
    document.getElementById('states-one').innerHTML = "Flocking mode: " + flocking + " | Separating mode: " + separating;
    document.getElementById('states-two').innerHTML = "Mouse scare: " + mouseScare;
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}


// -------------------------------- Hot Keys ------------------------------------- //

function keyTyped() {
    // Toggle debugging mode
    if (key === 'd' && simulate) {
        debugMode ? debugMode = false : debugMode = true;
    }

    // Toggle separating mode
    if (key === 's' && simulate && !flocking) {
        separating ? separating = false : separating = true;
    }

    // Toggle flocking mode
    if (key === 'f' && simulate) {
        if (flocking) {
            flocking = false;
        } else {
            flocking = true;
            separating = true;
        }
    }

    // Toggle mouse scare mode
    if (key === 'n' && simulate) {
        mouseScare ? mouseScare = false : mouseScare = true;
    }
}

function keyPressed() {
    // Toggle simulation
    if (key === ' ') {
        if (simulate) {
            simulate = false;
            noLoop();
        } else {
            simulate = true;
            loop();
        }
    }

    // Restart canvas
    if (keyCode === ESCAPE) {
        birbs = []; // Truncate the birbs' array

        for (var i = 0; i < init; i++) {
            birbs[i] = new birb(random(width), random(height));
        }
    }

    // Kill one birb :(
    if (keyCode === BACKSPACE) birbs.pop();
}

function mousePressed () {
    // Add birb
    if (simulate) birbs.push(new Birb(mouseX, mouseY));

    return false; // End the method for safety purposes
}