//This sketch is inspire by Daniel Shiffman
//https://thecodingtrain.com/CodingChallenges/144-black-hole-visualization.html

const c = 30;
const G = 6;
const dt = 0.1;

let pointC;
let m87;

const particles= [];
let start, end;


function setup() {
  
  createCanvas(windowWidth,windowHeight);
  pointC = createGraphics(windowWidth,windowHeight);

  ellipseMode(RADIUS);
  
  

  
  start = height/2;
  //end = height/2 - m87.rs * 2.6;

  for (let y = 0; y < start; y+=10){
    particles.push(new Photon(width-20, y));
  }

}

function draw(){

  background(255);
  //m87 = new Blackhole(windowWidth/2,windowHeight/2, 3000);
  m87 = new Blackhole(mouseX,mouseY, 3000);
  

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