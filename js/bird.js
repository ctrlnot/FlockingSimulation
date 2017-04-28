function Bird(x, y) {
    this.position = createVector(x, y);
    this.velocity = p5.Vector.random2D();
    this.acceleration = createVector();
    this.r = 4;

    this.maxspeed = 5;
    this.maxforce = 0.5;
}

Bird.prototype.run = function() {
    this.separate();
    this.update();
    this.show();
}

Bird.prototype.update = function() {
    this.velocity.add(this.acceleration);
    // this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);

    // Go to other side if outside the window
    // LEFT and RIGHT
    if (this.position.x > width + this.r) {
        this.position.x = -this.r;
    } else if (this.position.x < -this.r) {
        this.position.x = width + this.r;
    }

    // TOP AND BOTTOM
    if (this.position.y > height + this.r) {
        this.position.y = -this.r;
    } else if (this.position.y < -this.r) {
        this.position.y = height + this.r;
    }
}

Bird.prototype.show = function() {
    // Draw that majestic bird or .. maybe it's just a triangle ._.
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
}

Bird.prototype.applyForce = function(force) {
    this.acceleration.add(force);
}

Bird.prototype.separate = function() {
    var separationAOE = this.r * 6;
    var sum = createVector();
    var count = 0;

    // Check the neighbors
    for (var i = 0; i < birds.length; i++) {
        var d = p5.Vector.dist(this.position, birds[i].position);
        if ((d > 0) && (d < separationAOE)) {
            var diff = p5.Vector.sub(this.position, birds[i].position);
            diff.normalize();
            diff.div(d);
            sum.add(diff);
            count++;
        }
    }

    if (count > 0) {
        sum.div(count);
        sum.normalize();
        sum.mult(this.maxspeed);

        var steer = p5.Vector.sub(sum, this.velocity);
        steer.limit(this.maxforce);
        this.applyForce(steer);
    }
}