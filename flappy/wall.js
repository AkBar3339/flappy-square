function Wall(x) {
    this.posU = createVector(width + x, 0);
    this.posL = createVector(width + x, height);
    this.posS = createVector(width + x, 0);
    this.speed = -2.5;
    this.holeHeight = 90;
    this.color = color(255);
    
    this.move = function() {
        this.posU.add(this.speed);
        this.posL.add(this.speed);
        this.posS.add(this.speed);
    }
    
    this.hole;
    this.lowerHole = 0;
    this.upperHole = 0;
    
    this.randHole = function() {
        this.hole = random((this.holeHeight + 30), height - (this.holeHeight + 30));
    }
    
    this.randHole();
    
    this.show = function() {
        noStroke();
        fill(this.color);
        this.upperHole = this.hole - this.holeHeight;
        this.lowerHole = this.hole - height + this.holeHeight;
        rect(this.posU.x, this.posU.y, 50, this.upperHole);
        rect(this.posL.x, this.posL.y, 50, this.lowerHole);
    }
    
    this.endpoint = function() {
        if (this.posL.x + 50 < 0 && this.posU.x + 50 < 0){
            this.posL.x = width;
            this.posU.x = width;
            this.posS.x = width;
            this.randHole();
        }
    }
    
    this.dificultyLevel = function() {
        switch (checkboxVal) {
            case "ezaf":
                this.holeHeight = 100;
            break;
            case "med":
                this.holeHeight = 75;
            break;
            case "hard":
                this.holeHeight = 50;
            break;
        }
    }
}
