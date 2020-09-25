function Particle(){
	this.strokeAValue = 0;
	this.strokeColor = 25;
	this.pos = createVector(random(width),random(height));
	this.vel = createVector(0,0);
	this.acc = createVector(0,0);
	this.maxspeed = 3;
	this.prevPos = this.pos.copy();


	this.update = function(){
		this.vel.add(this.acc);
		this.vel.limit(this.maxspeed);
		this.pos.add(this.vel);
		this.acc.mult(0);
	}

    this.follow = function(vectors){
    	var x = floor(this.pos.x/scl);
    	var y = floor(this.pos.y/scl);
    	var index = x + y * cols;
    	var force = vectors[index];
    	this.applyForce(force);
    }


	this.applyForce = function(force){
		this.acc.add(force);
	}

	this.show = function(strokeColorR,strokeColorG,strokeColorB,strokeAValue){
		//noFill();
		
		stroke(strokeColorR,strokeColorG,strokeColorB, this.strokeAValue);

		// this.strokeColor =this.strokeColor + 1;

		// if(this.strokeColor >255){
		// 	this.strokeColor = 0;
		// }
		strokeWeight(5);
		line(this.pos.x,this.pos.y, this.prevPos.x, this.prevPos.y);
		this.updatePrev();


	}
    
    

	this.edges = function(){
		this.strokeAValue = 255;
        if (this.pos.x > width) {
        	this.pos.x = 0;
        	this.updatePrev;
        	this.strokeAValue = 0;
        }

        if (this.pos.x < 0){
         this.pos.x = width;
         this.updatePrev;
         this.strokeAValue = 0;
     }
         if (this.pos.y > height){

          this.pos.y = 0;
          this.updatePrev;
          this.strokeAValue = 0;
      }
        if (this.pos.y < 0){
         this.pos.y = height;
         this.updatePrev;
         this.strokeAValue = 0;
     }

	}


	this.updatePrev = function(){
    	this.prevPos.x = this.pos.x;
    	this.prevPos.y = this.pos.y;
    }
}