function Square() {
    this.x = 250;
    this.y = height / 2;
    this.grav = 0.85;
    this.force = -16;
    this.vel = 0; 
    this.color = color(255);
    
    this.fly = function() {
        this.vel += this.force;
        sFlap.setVolume(3);
        sFlap.play();
    }
    
    this.update = function() {
        this.vel += this.grav;
        this.vel *= 0.93;
        this.y += this.vel;
        if (this.y > height - 30) {
            this.y = height - 30;
            this.vel = 0;
        }
        if (this.y < 0) {
            this.y = 0;
            this.vel = 0;
        }
        if (ended){
            if (this.y == height - 30 && !sHitPlayed) {
                sHit.setVolume(1.5);
                sHit.play();
                sHitPlayed = true;
            }
        }
    }
    
    this.show = function() {
        noStroke();
        fill(this.color);
        rect(this.x, this.y, 30, 30);
    }
    
    this.scored = function() {
        var point = false;
        for (var i = 0; i < walls.length; i++) {
            point = collideLineRect(walls[i].posS.x + 50, 0, walls[i].posS.x + 50, height, this.x, this.y, 1, 1);
            if (point == true && !ended) {
                score += 1;
                sPoint.setVolume(0.2);
                sPoint.play();
            }
        }
        
        beginShape();
        noStroke();
        fill(255);
        textSize(50);
        textStyle(BOLD);
        textAlign(CENTER);
        text(score, width / 2, height / 2);
        endShape();
    }
    this.rip = function() {
        var hitL = false;
        var hitU = false;
        for (var i = 0; i < walls.length; i++) {
            var help = walls[i].upperHole + (walls[i].holeHeight * 2);
            hitL = collideRectRect(walls[i].posL.x, help, 50, height - help, this.x, this.y, 30, 30);
            hitU = collideRectRect(walls[i].posU.x, walls[i].posU.y, 50, walls[i].upperHole, this.x, this.y, 30, 30);
            if (hitL || hitU) {
                ended = true;
                for (var i = 0; i < walls.length; i++) {
                    walls[i].speed = 0;
                }
                txt1 = "Game over! Press spacebar to try again."
                if (!sSlapPlayed) {
                    sSlap.setVolume(2);
                    sSlap.play();
                    sSlapPlayed = true;
                }
            }
        }
    }
}