var birds = [];

function setup() {
    createCanvas(windowWidth, windowHeight);

    // Initial birds
    for (var i = 0; i < 100; i++) {
        birds[i] = new Bird(random(width), random(height));
    }
}

function draw() {
    background(240);

    // Display birds
    for (var i = 0; i < birds.length; i++) {
        var b = birds[i];
        b.run();
    }

    // Information
    document.getElementById('birds-no').innerHTML = "Number of birds: " + birds.length;
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}


// -------------------------------- Hot Keys ------------------------------------- //

// function keyTyped() {
//     if (key === 'a') birds.push(new Bird(random(width), random(height)));
// }

function mousePressed () {
    birds.push(new Bird(mouseX, mouseY));
}