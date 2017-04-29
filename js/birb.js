function Birb(x, y) {
    this.position = createVector(x, y);
    this.velocity = p5.Vector.random2D();
    this.acceleration = createVector();
    this.r = 4;

    this.separationAOE = this.r + 25;
    this.groupingAOE = this.r + 75;
    this.mouseDetectAOE = this.r + 150;

    this.maxspeed = 8;
    this.maxforce = 0.5;
}


Birb.prototype.separate = function() {
    var steer = createVector();
    var count = 0;

    // Check the neighbors
    for (var i = 0; i < birbs.length; i++) {
        var d = p5.Vector.dist(this.position, birbs[i].position);
        if ((d > 0) && (d < this.separationAOE)) {
            var diff = p5.Vector.sub(this.position, birbs[i].position);
            diff.normalize();
            diff.div(d);
            steer.add(diff);
            count++;
        }
    }

    // Get the average steering velocity
    if (count > 0) {
        steer.div(count);
    }

    if (steer.mag() > 0) {
        steer.normalize();
        steer.mult(this.maxspeed);
        steer.sub(this.velocity); // Apply steering = desired - velocity <3
        steer.limit(this.maxforce);
    }

    return steer;
}

Birb.prototype.seek = function(target) {
    var desired = p5.Vector.sub(target, this.position); // Get the vector that points towards the target
    desired.normalize();
    desired.mult(this.maxspeed);

    var steer = p5.Vector.sub(desired, this.velocity); // Apply steering = desired - velocity <3
    steer.limit(this.maxforce);
    return steer;
}

Birb.prototype.grouping = function() {
    var steer = createVector();
    var count = 0;

    for (var i = 0; i < birbs.length; i++) {
        var d = p5.Vector.dist(this.position, birbs[i].position);
        if ((d > 0) && (d < this.groupingAOE)) {
            steer.add(birbs[i].position);
            count++;
        }
    }

    // Getting average position
    if (count > 0) {
        steer.div(count);
        return this.seek(steer);
    } else {
        return createVector();
    }
}

Birb.prototype.aligning = function() {
    var steer = createVector();
    var count = 0;

    for (var i = 0; i < birbs.length; i++) {
        var d = p5.Vector.dist(this.position, birbs[i].position);
        if ((d > 0) && (d < this.groupingAOE)) {
            steer.add(birbs[i].velocity);
            count++;
        }
    }

    // Getting average position
    if (count > 0) {
        steer.div(count);
        steer.normalize();
        steer.mult(this.maxspeed);
        steer.sub(this.velocity); // Apply steering = desired - velocity <3
        steer.limit(this.maxforce);
        return steer;
    } else {
        return createVector();
    }
}

Birb.prototype.avoidMouse = function(mouse) {
    var steer = createVector();
    var d = p5.Vector.dist(this.position, mouse);

    // Check the mouse range and get the vector to move away from mouse
    if ((d > 0) && (d < this.mouseDetectAOE)) {
        var diff = p5.Vector.sub(this.position, mouse);
        diff.normalize();
        diff.div(d);
        steer.add(diff);
    }

    if (steer.mag() > 0) {
        steer.normalize();
        steer.mult(this.maxspeed);
        steer.sub(this.velocity); // Apply steering = desired - velocity <3
        steer.limit(this.maxforce);
    }

    return steer;
}

Birb.prototype.attractMouse = function(mouse) {
    var steer = createVector();
    var count = 0;

    var d = p5.Vector.dist(this.position, mouse);
    if ((d > 0) && (d < this.mouseDetectAOE * 1.25)) {
        steer.add(mouse);
        count++;
    }

    // Getting average steer vector
    if (count > 0) {
        steer.div(count);
        return this.seek(steer);
    } else {
        return createVector();
    }
}

Birb.prototype.avoidRepellant = function() {
    var steer = createVector();
    var count = 0;

    // Check the neighbors
    for (var i = 0; i < repellants.length; i++) {
        var d = p5.Vector.dist(this.position, repellants[i].position);
        if ((d > 0) && (d < repellants[i].aoe)) {
            var diff = p5.Vector.sub(this.position, repellants[i].position);
            diff.normalize();
            diff.div(d);
            steer.add(diff);
            count++;
        }
    }

    // Get the average steering velocity
    if (count > 0) {
        steer.div(count);
    }

    if (steer.mag() > 0) {
        steer.normalize();
        steer.mult(this.maxspeed);
        steer.sub(this.velocity); // Apply steering = desired - velocity <3
        steer.limit(this.maxforce);
    }

    return steer;
}

Birb.prototype.trackAttractor = function() {
    var steer = createVector();
    var count = 0;

    for (var i = 0; i < attractors.length; i++) {
        var d = p5.Vector.dist(this.position, attractors[i].position);
        if ((d > 0) && (d < attractors[i].aoe * 1.25)) {
            steer.add(attractors[i].position);
            count++;
        }
    }

    // Getting average position
    if (count > 0) {
        steer.div(count);
        return this.seek(steer);
    } else {
        return createVector();
    }
}












Birb.prototype.applyForce = function(force) {
    this.acceleration.add(force);
}

Birb.prototype.update = function() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);

    // Dealing when out of bounds
    if (this.position.x > width + this.r) this.position.x = -this.r; // Right
    if (this.position.x < -this.r) this.position.x = width + this.r; // Left
    if (this.position.y > height + this.r) this.position.y = -this.r; // Bottom
    if (this.position.y < -this.r) this.position.y = height + this.r; // Top
}

Birb.prototype.show = function(r, g, b) {
    // Draw that majestic birb or .. maybe it's just a triangle ._.
    var theta = this.velocity.heading() + PI/2;
    fill(127);
    stroke(127);
    strokeWeight(1);
    push();
    translate(this.position.x, this.position.y);
    rotate(theta);
    beginShape();
    vertex(0, -this.r * 2);
    vertex(-this.r, this.r * 2);
    vertex(this.r, this.r * 2);
    endShape(CLOSE);
    pop();
    
    if (debugMode) {
        // Draw red circle for separation debugging
        fill('rgba(255, 0, 0, 0.1)');
        stroke(255, 0, 0);
        strokeWeight(1);
        ellipse(this.position.x, this.position.y, this.separationAOE, this.separationAOE);

        // Draw red circle for grouping debugging
        fill('rgba(0, 255, 0, 0.1)');
        stroke(0, 255, 0);
        strokeWeight(1);
        ellipse(this.position.x, this.position.y, this.groupingAOE, this.groupingAOE);

        // Draw gray circle for mouse interaction debugging
        fill('rgba(66, 66, 66, 0.1)');
        stroke(66, 66, 66);
        strokeWeight(1);
        ellipse(this.position.x, this.position.y, this.mouseDetectAOE, this.mouseDetectAOE);
    }
}

Birb.prototype.run = function(mouse) {

    var sep = this.separate();
    var ali = this.aligning();
    var grp = this.grouping();
    var avm = this.avoidMouse(mouse);
    var atm = this.attractMouse(mouse);
    var avr = this.avoidRepellant();
    var ata = this.trackAttractor();

    avr.mult(2);
    avm.mult(2);
    sep.mult(2);
    ata.mult(1);
    atm.mult(1);
    ali.mult(1);
    grp.mult(1);

    // Apply all forces
    this.applyForce(avr);
    this.applyForce(ata);
    if (mouseScare) this.applyForce(avm);
    if (mouseAttract) this.applyForce(atm);
    if (separating) this.applyForce(sep);
    if (flocking) {
        this.applyForce(ali);
        this.applyForce(grp);
    }

    // Render the birbs
    this.update();
    this.show();
}