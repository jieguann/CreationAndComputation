

class Photon {
  
  constructor(x, y){
    this.pos = createVector(x, y);
    this.vel = createVector(-c, 0);
    this.history = [];
    this.strokeC;
    this.strokeA;
  }


  update(){
    this.history.push(this.pos.copy());
    let deltaV = this.vel.copy();
    deltaV.mult(dt);
    this.pos.add(deltaV);

    if(this.history.length>600){
      this.history.splice(0,1);
    }

  }
  

  edge(){
    if(this.pos.x > width){ this.pos.x =0;}
    if(this.pos.x < 0){ this.pos.x =width;}
    if(this.pos.y > height){ this.pos.y =0;}
    if(this.pos.y < 0){ this.pos.y =height;}
  }


  show(){
    this.strokeC =20;
    this.strokeA = 10;
    //pointC.background(0);
    pointC.strokeWeight(2);
    pointC.stroke(this.strokeC, 220, 0, 10);
    pointC.point(this.pos.x, this.pos.y);


    // let noiseX = 0;
    // strokeWeight(2);
    // stroke(this.strokeC, 220, 0, 255);
    // point(this.pos.x, this.pos.y);
    image(pointC, 0,0);

    // stroke(this.strokeC, noise(noiseX)*225+100, 0, 255);
    // strokeWeight(2);
    // noFill();
    // beginShape();

    // for (let v of this.history){
    //   vertex(v.x, v.y);
    // }

    // endShape();

    // noiseX += 1;


  }
}
