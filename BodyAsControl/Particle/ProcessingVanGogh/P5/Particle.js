class Particle {
  constructor(locx,locy) {
    /*
    this.x = random(width);
    this.y = random(height);
    this.speed = 
    this.alpha = 255;
    */
    this.locx=locx;
    this.locy=locy;
    this.speedx=10;
    this.speedy=10;
   

    this.rad;
    this.col;
    this.maxVel = 1.6;
    this.index;
  }

 

  update() {
    /*
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= 5;
    */
    //flow();
  }

  show() {
    noStroke();
    //stroke(255);
    fill(255);
    ellipse(this.locx, this.locy, 16);
  }


  flow(){
    /*
    let deg = 360.0*noise (
      this.locx/666.0,
      this.locy/666.0,
      millis()/100000.0
      );
    let noiseStrength = 106.3;
    //this.rad = radians(deg*noiseStrength);
    this.rad = radians(500);
    /*
    this.speed.set(sin(this.rad),cos(this.rad));
    if(speed.magSq()>(maxVel)){
      this.speed.normalize();
      this.speed.mult(maxVel);
    }
    */
    //this.speedx = sin(360);
    //this.speedy = cos(360);
    
    this.locx+=this.speedx;
    this.locy+=this.speedy;
  }
}
