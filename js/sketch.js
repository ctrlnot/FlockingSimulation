var init = 50; // Initial number of birbs
var birbs = [];
var hideInfo = true;
var simulate = true;
var flocking = false;
var debugMode = false;
var separating = true;
var mouseScare = false;
var mouseAttract = false;

var repellants = [];
var attractors = [];

function setup() {
    var myCanvas = createCanvas(windowWidth, windowHeight);
    myCanvas.parent('content');

    // Initial birbs
    for (var i = 0; i < init; i++) {
        birbs[i] = new Birb(random(width), random(height));
    }
}

function draw() {
    background(255);

    // For avoiding and attracting mouse
    var mouse = createVector(mouseX, mouseY);
    if (debugMode) { // Show mouse AOE
        fill('rgba(66, 66, 66, 0.1)');
        stroke(66, 66, 66);
        strokeWeight(1);
        ellipse(mouse.x, mouse.y, 154, 154);
    }

    // Display birbs
    for (var i = 0; i < birbs.length; i++) {
        birbs[i].run(mouse);
    }

    // Display repellants and attractors
    for (var i = 0; i < attractors.length; i++) {
        attractors[i].show();
    }
    for (var i = 0; i < repellants.length; i++) {
        repellants[i].show();
    }

    // Send Information
    if (hideInfo) {
        document.getElementById('fps').innerHTML = "FPS: " + frameRate().toFixed(2);
        document.getElementById('debug-mode').innerHTML = "Simulation: " + simulate + " | Debug mode: " + debugMode;
        document.getElementById('states-one').innerHTML = "Flocking mode: " + flocking + " | Separating mode: " + separating;
        document.getElementById('states-two').innerHTML = "Mouse scare mode: " + mouseScare + " | Mouse attract mode: " + mouseAttract;
        document.getElementById('numbers').innerHTML = "Number of birbs: " + birbs.length + " | Number of attractors: " + attractors.length + " | Number of repellants: " + repellants.length;
    } else {
        document.getElementById('fps').innerHTML = "";
        document.getElementById('debug-mode').innerHTML = "";
        document.getElementById('states-one').innerHTML = "";
        document.getElementById('states-two').innerHTML = "";
        document.getElementById('numbers').innerHTML = "";
    }
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
        if (mouseScare) {
            mouseScare = false;
        } else {
            mouseScare = true;
            mouseAttract = false; // Off the attract mode
        }
    }

    // Toggle mouse attract mode
    if (key === 'm' && simulate) {
        if (mouseAttract) {
            mouseAttract = false;
        } else {
            mouseAttract = true;
            mouseScare = false; // Off the scare mode
        }
    }

    // Clear all the boxes and walls
    if (key === 'c' && simulate) {
        attractors = [];
        repellants = [];
    }

    // Hide informations
    if (key === 'i' && simulate) {
        hideInfo ? hideInfo = false : hideInfo = true;
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
        birbs = []; // Clear birbs' array
        attractors = []; // Clear attractors' array
        repellants = []; // Clear repellants' array

        // Reset states
        simulate = true;
        flocking = false;
        debugMode = true;
        separating = true;
        mouseScare = false;
        mouseAttract = false;
    }

    // Kill one birb :(
    if (keyCode === BACKSPACE) birbs.pop();

    // Produce instant 5 birbs :> 45 = Keycode of Insert Key
    if (keyCode === 45) {
        for (var i = 0; i < 5; i++) {
            birbs.push(new Birb(mouseX, mouseY));
        }
    }

    // Kills five birbs :( 46 = Keycode of Delete Key
    if (keyCode === 46 && birbs.length >= 5) birbs.splice(-5, 5);
}

function mousePressed () {
    birbs.push(new Birb(mouseX, mouseY)); // Add birb
    if (keyIsDown(17)) attractors.push(new Box(mouseX, mouseY, true)); // Add attractor box (Ctrl key)
    if (keyIsDown(18)) repellants.push(new Box(mouseX, mouseY, false)); // Add repellant box (Alt key)

    return false; // End the method for safety purposes
}