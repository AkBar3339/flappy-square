var canvH;
var square;
var walls = [];
var score = 0;
var started = false;
var ended = false;
var txt1 = "Press up arrow to play!";
var checkboxVal;
var chckbx1;
var chckbx2;
var chckbx3;
var sPoint;
var sHit;
var sFlap;
var sHitPlayed = false;

function preload() {
    var windowH = windowHeight
    if (windowH >= 600) canvH = 600;
    else canvH = windowH;
    window.addEventListener("keydown", function(event) {
        if (event.keyCode === UP_ARROW || event.keyCode === 32) {
            event.preventDefault();
        }
    })
    chckbx1 = document.getElementById("ezaf");
    chckbx2 = document.getElementById("med");
    chckbx3 = document.getElementById("hard");
    sPoint = loadSound('assets/point.flac');
    sHit = loadSound('assets/hit.wav');
    sFlap = loadSound('assets/flap.wav');
}

function crW() {
    for (var i = 0; i <= 3; i++) {
        var x = i * 250;
        walls[i] = new Wall(x)
    }
}

function check(id) {
    if (!started){
        switch (id) {
            case "ezaf":
                chckbx1.checked = true;
                chckbx2.checked = false;
                chckbx3.checked = false;
                checkboxVal = id;
                break;
            case "med":
                chckbx1.checked = false;
                chckbx2.checked = true;
                chckbx3.checked = false;
                checkboxVal = id;
                break;
            case "hard":
                chckbx1.checked = false;
                chckbx2.checked = false;
                chckbx3.checked = true;
                checkboxVal = id;
            break;
            default: 
               checkboxVal = "ezaf";
        }
    }
    else {
        chckbx1.disabled = true;
        chckbx2.disabled = true;
        chckbx3.disabled = true;
    }
}

function setup() {
    var canvas = createCanvas(950, canvH);
    canvas.parent("main");
    square = new Square();
    crW();
    check();
}

function draw() {
    background(51);
    if (started) {
        for (var i = 0; i < walls.length; i++) {
            walls[i].show();
            walls[i].move();
            walls[i].endpoint();
        }
    
        square.show();
        square.update();
        square.rip();
        square.scored();
    }
    beginShape();
    noStroke();
    textSize(16);
    fill(255);
    textStyle(BOLD);
    textAlign(CENTER);
    text(txt1, width / 2, height / 2 + 50)
    endShape();
    colorChanger();
}

function keyPressed() {
    if (started) {
        if (!ended) {
            if (keyCode === UP_ARROW) {
                square.fly();
            }
        }
        else {
            if (keyCode === 32) {
                reset();
            }
        }
    }
    else {
        if (keyCode === UP_ARROW) {
            for (var i = 0; i < walls.length; i++) {
                walls[i].dificultyLevel();
            }
            started = true;
            check();
            txt1 = "";
        }
    }
}

function colorChanger() {
    //TODO
    var wallC;
    if (score < 25) {
        square.color = color(255, 235, 59);
        wallC = color(236, 64, 122);
    }
    else if (score >= 25 && score < 50) {
        square.color = color(142, 36, 170);
        wallC = color(0, 150, 136);
    }
    else if (score >= 50 && score < 75) {
        square.color = color(156, 39, 176);
        wallC = color(245, 124, 0);
    }
    else if (score >= 75 && score < 100) {
        square.color = color(105, 240, 174);
        wallC = color(96, 125, 139);
    }
    else {
        square.color = color(118, 255, 3);
        wallC = color(238, 255, 65);
    }
    
    for (var i = 0; i < walls.length; i++){
        walls[i].color = wallC;
    }
}

function reset() {
    noLoop();
    started = false;
    chckbx1.disabled = false;
    chckbx2.disabled = false;
    chckbx3.disabled = false;
    sHitPlayed = false;
    walls = [];
    square.y = height / 2;
    score = 0;
    txt1 = "Press up arrow to play!";
    crW();
    ended = false;
    loop();
}