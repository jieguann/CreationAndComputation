//https://thecodingtrain.com/CodingChallenges/001-starfield.html



particles = [];
let stars = [];
let ufo;

let speed;
let speedS;

var capture;
var tracker
var w = 640,
    h = 480;
var positions;
let middlePointX;
let middlePointY;

var smile;
var mTD;
let pN;

// function preload() {
//   ufo = loadImage('UFO.png');
// }


function setup() {
//image(ufo, 0, 0);

    capture = createCapture({
        audio: false,
        video: {
            width: w,
            height: h
        }
    }, function() {
        console.log('capture ready.')
    });
    capture.elt.setAttribute('playsinline', '');
    createCanvas(w, h);
    capture.size(w, h);
    capture.hide();

    //colorMode(HSB);

    tracker = new clm.tracker();
    tracker.init();
    tracker.start(capture.elt);

    angleMode(DEGREES);

    for (let i = 0; i < 800; i++) {
    stars[i] = new Star();
  }
}

function draw() {


    

  push();
  tint(50);
  image(capture, 0, 0, w, h);
  pop();


    positions = tracker.getCurrentPosition();

    // noFill();
    // stroke(255);
    // beginShape();
    // for (var i = 0; i < positions.length; i++) {
    //     vertex(positions[i][0], positions[i][1]);
    // }
    // endShape();

    // noStroke();
    // for (var i = 0; i < positions.length; i++) {
    //     fill(map(i, 0, positions.length, 0, 360), 50, 100);
    //     ellipse(positions[i][0], positions[i][1], 4, 4);
    //     text(i, positions[i][0], positions[i][1]);
    // }

    if (positions.length > 0) {
        var mouthLeft = createVector(positions[44][0], positions[44][1]);
        var mouthRight = createVector(positions[50][0], positions[50][1]);

        var mouthTop = createVector(positions[47][0], positions[47][1]);
        var mouthDown = createVector(positions[53][0], positions[53][1]);

        smile = map(mouthLeft.dist(mouthRight),40,90,1,10);
        mTD = map(mouthTop.dist(mouthDown),27,80,2,10);
        pN = map(mouthTop.dist(mouthDown),27,80,0,4.5);

        middlePointX = (positions[44][0]+positions[50][0])/2;
        middlePointY = (positions[44][1]+positions[50][1])/2;
        // uncomment the line below to show an estimate of amount "smiling"
        // rect(20, 20, smile * 3, 20);

        // uncomment for a surprise
        drawRect();

        noStroke();
        fill(255, 0, 0);
        //ellipse(positions[62][0], positions[62][1], 50, 50);
        rect(width/2-15, map(positions[62][1],0,height,height/4,height-height/4), 50, 20);
        speed = map(map(positions[62][1],0,height,height/4,height-height/4),height/4,height-height/4,50,0);
        //print(speed);
        
        //speed = map(mouseX, 0, width, 0, 50);

        //print(mouthLeft.dist(mouthRight),smile,mTD);
        
        drawStar();


    }

    //drawParticles();
    //speed = 10;
    //drawStar();


    
    
}


function drawStar() {
  //speed = map(mouseX, 0, width, 0, 50);
  //background(0);
  //speedS = speed;
  //speed = 10;

  translate(width / 2, height / 2);
  for (let i = 0; i < stars.length; i++) {
    stars[i].update();
    stars[i].show();
  }
}

function drawRect(){
  stroke(255, 0, 0);
  strokeWeight(3);
  fill(255,255,0,100);
  rect(width/2,height/3,20,height/2)
}




// function drawParticles(){
    
//     for (let i = 0; i < pN; i++) {
//     let p = new Particle(middlePointX,middlePointY);
//     particles.push(p);
//   }
//   for (let i = particles.length - 1; i >= 0; i--) {
//     particles[i].update();
//     particles[i].show();
//     if (particles[i].finished()) {
//       // remove this particle
//       particles.splice(i, 1);
//     }
//   }
// }

