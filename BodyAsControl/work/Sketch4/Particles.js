class Particle {
  constructor(x,y) {
    this.angle =0;
    this.scalar =100;

    this.x=x;
    this.y=y;
    this.startX = 300;
    this.startY = 380;
    this.vx = random(-mTD, mTD);
    this.vy = random(-mTD, mTD);
    this.alpha = 255;
    this.r = 0;
    this.rx=0;


  }

  finished() {
    return this.alpha < 0;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= 5;

    this.r = noise(this.r+this.rx)*25
    this.rx += 1;



  }

  show() {
    noStroke();
    //stroke(255);
    fill(102, 227, 255, this.alpha);
    let xS= random(0,this.scalar*sin(this.angle));
    let yS= random(0,this.scalar*sin(this.angle));

    ellipse(this.x+xS, this.y+yS, this.r);
  }
}