//This sketch is inspire by Daniel Shiffman
//https://thecodingtrain.com/CodingChallenges/144-black-hole-visualization.html


class Blackhole {
   constructor(x,y,m){
    this.pos = createVector(x,y);
    this.mass = m;
    this.rs = 2*G*this.mass/(c*c);
   }




   pull(photon){
    let force = p5.Vector.sub(this.pos, photon.pos);
    let r = force.mag();
    let fg = G * this.mass/ (r * r);
    force.setMag(fg);
    photon.vel.add(force);
    photon.vel.setMag(c);

    if (r<this.rs){
      //print("ok");
    }

   }

   show(){
    fill(0);
    noStroke();
    circle(this.pos.x, this.pos.y, this.rs);

    noFill();
    stroke(100,100);
    strokeWeight(64);
    circle(this.pos.x, this.pos.y, this.rs*3);
    
    stroke(255,150,0,100);
    strokeWeight(32);
    circle(this.pos.x, this.pos.y, this.rs*1.5+16)
   }
}
