
class Particle {
  constructor() {
  	let x;
  	let y;
    this.x = 300;
    this.y = 380;
    this.vx = random(-10, 10);
    this.vy = random(5, 5);
    this.alpha = 255;
  }

  finished() {
    return this.alpha < 0;
  }

  update() {
    //this.x += this.vx;
    //this.y += this.vy;
    //this.alpha -= 5;

    x += this.vx;
    y += this.vy;
    this.alpha -= 5;


  }

  show() {
    noStroke();
    //stroke(255);
    fill(255, this.alpha);
    //ellipse(this.x, this.y, 16);
    ellipse(x, y, 16);
  }
}