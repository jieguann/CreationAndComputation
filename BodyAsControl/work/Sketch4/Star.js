// Daniel Shiffman
//end
let noiseMax = 0.01;
let goal = 5;

let start = 0;
let z = 0;

let posM;
let lastM;

function Star() {
  this.x = random(-width, width);
  this.y = random(-height, height);
  this.z = random(width);
  this.pz = this.z;

  this.update = function() {
    //print(speed);
    this.z = this.z - speed;
    if (this.z < 1) {
      this.z = width;
      this.x = random(-width, width);
      this.y = random(-height, height);
      this.pz = this.z;
    }
  };

  this.show = function() {
    fill(255);
    noStroke();

    var sx = map(this.x / this.z, 0, 1, 0, width);
    var sy = map(this.y / this.z, 0, 1, 0, height);

    var r = map(this.z, 0, width, 16, 0);
    ellipse(sx, sy, r, r);
    //perlin noise
    //drawNoise();


    //end


    var px = map(this.x / this.pz, 0, 1, 0, width);
    var py = map(this.y / this.pz, 0, 1, 0, height);

    this.pz = this.z;

    stroke(255);
    line(px, py, sx, sy);
  }
}

function drawNoise() {
  //background(0);
  push()
  translate(width/2,height/2);

  if(!lastM) lastM = createVector(10,10);
  else if(posM) lastM = posM;
  posM = createVector(20,20);
  
  let dist = sqrt( pow(posM.x-lastM.x, 2) + pow(posM.y - lastM.y,2)   ) / 10;
  if(dist > 5) goal = dist;
  dist = 0;
  
  if(noiseMax < goal) noiseMax *= 1.1;
  else {
     goal = 5;
    noiseMax *= 0.99;
  }
    
  noFill();
  stroke(255);
  
  
  beginShape();
  for(let i = 0; i < TWO_PI; i += (PI/100)) {
          xoff = map(cos(i+start),-1,1,0,noiseMax);
          yoff = map(sin(i),-1,1,0,noiseMax);
          let r = map(noise(xoff,yoff,z),0,1,100,200);
          let x = r * sin(i);
          let y = r * cos(i);
          vertex(x,y);
  }  
  endShape(CLOSE);  
  pop();
  //start += 0.001;
  z += 0.01;
}