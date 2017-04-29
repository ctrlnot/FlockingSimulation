function Box(x, y, type) {
    this.position = createVector(x, y);
    this.w = 20;
    this.type = type; // 1 - Attract ; 0 - Repel
    this.aoe = this.w + 150;

    this.show = function() {
        if (this.type) {
            fill('rgba(0, 0, 255, 0.5)');
            stroke(0, 0, 255);
        } else {
            fill('rgba(255, 0, 0, 0.5)');
            stroke(255, 0, 0);
        }

        strokeWeight(1);
        rect(this.position.x, this.position.y, this.w, this.w);
    }
}