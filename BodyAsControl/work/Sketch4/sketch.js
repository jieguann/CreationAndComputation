// https://kylemcdonald.github.io/cv-examples/
// https://github.com/kylemcdonald/AppropriatingNewTechnologies/wiki/Week-2

let particlesN;
const globe = [];
const r = 200;
const total = 25;
let angleX = 0;
let angleY = 0;


particles = [];

let capture;
var tracker
var w = 640,
    h = 480;
var positions;
let middlePointX;
let middlePointY;

var smile;
var mTD;
let pN;

function setup() {


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



    //shere
    noFill();
  strokeWeight(2);
  stroke(200);

  for (let i = 0; i < total + 1; i++) {
    globe[i] = [];
    const lat = map(i, 0, total, 0, PI);
    for (let j = 0; j < total + 1; j++) {
      const lon = map(j, 0, total, 0, TWO_PI);
      const x = r * sin(lat) * cos(lon);
      const y = r * sin(lat) * sin(lon);
      const z = r * cos(lat);
      globe[i][j] = createVector(x, y, z);
    }
  }
}

function draw() {


    

  push();
  //tint(43, 15, 255);
  image(capture, 0, 0, w, h);
  pop();
  // noStroke();
  // ambientMaterial(255);
  // texture(capture);
  // plane(w,h);


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
        // noStroke();
        let cR;

        let trigerS;

        if(positions[62][1]>(height-height/3)){
            //fill(0, 255, 255,100);
            cR = 0;
            //trigerS = 2;
            drawParticles(positions[62][0], positions[62][1]+20,trigerS);

        }
        else{

            cR =255;
            //trigerS = 1;
            

        }


        fill(cR, 255, 255,100);
        //ellipse(positions[62][0], positions[62][1], 50, 50);

        //drawParticles(positions[62][0], positions[62][1],trigerS);
        //print(trigerS);

        //print(mouthLeft.dist(mouthRight),smile,mTD);
    }

    //drawParticles();
    fill(0, 51, 204,150);
    noStroke();
    rect(0,h/1.5,w,h/1.5);
    
}


function drawParticles(x,y,t){
    print(t)
    for (i = 0; i < 1; i++) {
    let p = new Particle(x,y);
    //print(particlesN);

    particles.push(p);
  }



  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update(t);
    particles[i].show();
    if (particles[i].finished()) {
      // remove this particle
      particles.splice(i, 1); 
    }
  }
}

