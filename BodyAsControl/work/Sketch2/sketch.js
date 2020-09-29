// Copyright (c) 2018 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
PoseNet example using p5.js
=== */
//particle
let keypoint1;//right hand
    let keypoint2;//right hand
//black
const c = 30;
const G = 10;
const dt = 0.1;

let pointC;
let m87;

const particles= [];
let start, end;

//posnet
var inc = 0.02;
//var start = 0;
var scl = 20;
var cols, rows;
var offz = 0;
//var particles = [];

var flowfield = [];
let particlesG;
let centreC;

//posnet

let video;
let poseNet;
let poses = [];

let p;
//let particles = [];

let keypoints1x;
let keypoints1y;
let keypoints2x;
let keypoints2y;


function setup() {
  createCanvas(1080, 1080);
  //black
  pointC = createGraphics(1080,1080);
  ellipseMode(RADIUS);

  start = height/2;
  //end = height/2 - m87.rs * 2.6;

  for (let y = 300; y < start; y+=10){
    particles.push(new Photon(width-20, y));
  }
  
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
  


}

function modelReady() {
  select('#status').html('Model Loaded');
}






function draw() {
  
  
  centreC = createVector( (keypoints1x+keypoints2x)/2, (keypoints1y+keypoints2y)/2 );
  //particle
 
 

  // We can call both functions to draw all keypoints and the skeletons
  /*
  drawKeypoints();
  drawSkeleton();
  */
  
  push();
  tint(100,20,20, 200);
  image(video, 0, 0, width, height);
  pop();
  



  drawPoint();
  drawBlack();
  



}


//draw one point
function drawPoint(){
 
    
  

    for (let i = 0; i < poses.length; i++) {
    // For each pose detected, loop through all the keypoints
    let pose = poses[i].pose;
     keypoint1 = pose.keypoints[1];//right hand
     keypoint2 = pose.keypoints[2];//right hand

        keypoints1x=keypoint1.position.x; 
        keypoints1y=keypoint1.position.y;

        keypoints2x=keypoint2.position.x; 
        keypoints2y=keypoint2.position.y;

        //ellipse(keypoints1x, keypoints1y, 20, 20);
        //ellipse(keypoints2x, keypoints2y, 20, 20);

        
        // centreC.x = (keypoints1x+keypoints2x)/2;
        // centreC.y=(keypoints1y+keypoints2y)/2;
        //((keypoints1x+keypoints2x)/2, (keypoints1y+keypoints2y)/2);
        //ellipse(centreC.x, centreC.y, 20, 20);






  }
}


function drawBlack(){
  //background(255);
  //m87 = new Blackhole(windowWidth/2,windowHeight/2, 3000);
  m87 = new Blackhole(centreC.x,centreC.y, 3000);
  

  stroke(0);
  strokeWeight(1);
  //line(0,start,width,start);
  //line(0,end,width,end);

  for(let p of particles){

    //let force = m87.pull(p);
    //p.applyForce(force);
    m87.pull(p);
    p.update();
    p.edge();
    p.show();

  }

  m87.show();
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