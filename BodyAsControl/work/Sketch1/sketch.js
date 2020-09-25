// Copyright (c) 2018 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
PoseNet example using p5.js
=== */
//particle
var inc = 0.02;
var start = 0;
var scl = 20;
var cols, rows;
var offz = 0;
var particles = [];

var flowfield = [];
let particlesG;


//posnet

let video;
let poseNet;
let poses = [];

let p;
//let particles = [];

var keypoints1x;
var keypoints1y;


function setup() {
  createCanvas(1080, 1080);
  particlesG = createGraphics(1080,1080);
  //colorMode(HSB, 255);
  //particle

  //video
  video = createCapture(VIDEO);
  video.size(width, height);

  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, modelReady);
  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on('pose', function(results) {
    poses = results;
  });
  // Hide the video element, and just show the canvas
  video.hide();


  //particle
  cols = floor(width/scl);
  rows = floor(height/scl);

  flowfield = new Array(cols * rows);


for(var i =0; i<500; i++){
  particles[i] = new Particle();
}


}

function modelReady() {
  select('#status').html('Model Loaded');
}






function draw() {
  
  
  
  //particle
 
 

  // We can call both functions to draw all keypoints and the skeletons
  /*
  drawKeypoints();
  drawSkeleton();
  */
  
  push();
  tint(100,0,200, 220);
  image(video, 0, 0, width, height);
  pop();

  image(particlesG,0,0,width,height);
  drawPoint();
  
  drawParticle();



}


//draw one point
function drawPoint(){
 
    
  

    for (let i = 0; i < poses.length; i++) {
    // For each pose detected, loop through all the keypoints
    let pose = poses[i].pose;
    let keypoint1 = pose.keypoints[10];//right hand
        keypoints1x=keypoint1.position.x; 
        keypoints1y=keypoint1.position.y;


        // fill(255,0,0,10);
        // noStroke();
        // ellipse(keypoints1x, keypoints1y, 10, 10);

        
        // push();
        // noFill();
        // translate(keypoints1x,keypoints1y);
        // let t = 0;
        // beginShape();
        // for(var a = 0; a < TWO_PI; a += 0.001){
        //   let r= map(noise(t),0,1,1,10);
        //   var x = r* cos(a);
        //   var y = r*sin(a);
        //   vertex(x,y);
        //   t+=0.001;

        // }

        // endShape();
        //pop();


  }
}

function drawParticle(){
   var offy = 0;

  for (var x=0; x<rows; x++){
    var offx = 0;
    for(var y=0; y<cols;y++){
    var index =x + y * cols;
    //var r = noise(offx,offy)*255;
    //var angle = noise(offx ,offy, offz)* TWO_PI*4;
    var angle = noise(offx+keypoints1x/200 ,offy+keypoints1y/200, offz)* TWO_PI*4;
    var v = p5.Vector.fromAngle(angle);
    v.setMag(0.1);

    flowfield[index] = v;
    offx += inc;

    


    }
    offy += inc;
    

}  

for(var i=0; i < particles.length; i++){
  var r = 0;
  var g = 0;
  var b  = 0;
  particles[i].follow(flowfield);
    particles[i].update();
    particles[i].edges();
    particles[i].show(particlesG, noise(i+r)*255,noise(i+g)*255,0,0 );
    r += 1;
    g += 1000;
    b += 1;
    }
}
// A function to draw ellipses over the detected keypoints
/*
function drawKeypoints()  {
  // Loop through all the poses detected
  for (let i = 0; i < poses.length; i++) {
    // For each pose detected, loop through all the keypoints
    let pose = poses[i].pose;
    for (let j = 0; j < pose.keypoints.length; j++) {
      // A keypoint is an object describing a body part (like rightArm or leftShoulder)
      let keypoint = pose.keypoints[j];
      // Only draw an ellipse is the pose probability is bigger than 0.2
      if (keypoint.score > 0.2) {
        fill(255, 0, 0);
        noStroke();
        ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
      }
    }
  }
}


function drawPoints(){

}


// A function to draw the skeletons
function drawSkeleton() {
  // Loop through all the skeletons detected
  for (let i = 0; i < poses.length; i++) {
    let skeleton = poses[i].skeleton;
    // For every skeleton, loop through all body connections
    for (let j = 0; j < skeleton.length; j++) {
      let partA = skeleton[j][0];
      let partB = skeleton[j][1];
      stroke(255, 0, 0);
      line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
    }
  }
}
*/