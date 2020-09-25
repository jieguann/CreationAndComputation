//var xoff1 = 0;
//var xoff2 = 10000;

var inc = 0.02;
var start = 0;
var scl = 20;
var cols, rows;
var offz = 0;
var particles = [];

var flowfield = [];


function setup() {
	background(255);
  // put setup code here
  createCanvas(600,600);
  cols = floor(width/scl);
  rows = floor(height/scl);

  flowfield = new Array(cols * rows);


for(var i =0; i<300; i++){
  particles[i] = new Particle();
}
}

function draw() {
	//background(255);
  // put drawing code here
  var offy = 0;

  for (var x=0; x<rows; x++){
  	var offx = 0;
  	for(var y=0; y<cols;y++){
    var index =x + y * cols;
    //var r = noise(offx,offy)*255;
    //var angle = noise(offx ,offy, offz)* TWO_PI*4;
    var angle = noise(offx+mouseX/200 ,offy+mouseY/200, offz)* TWO_PI*4;
    var v = p5.Vector.fromAngle(angle);
    v.setMag(0.1);

    flowfield[index] = v;
    offx += inc;

    


  	}
  	offy += inc;
  	

}  

for(var i=0; i < particles.length; i++){

	particles[i].follow(flowfield);
    particles[i].update();
    particles[i].show();
    particles[i].edges();
    }
  //updatePixels();
  //endShape();
  //noLoop();
  //start +=inc;
  /*
  var x = map(noise(xoff1),0,1,0,400);
  var y = map(noise(xoff2),0,1,0,400);

  xoff1 += 0.01;
  xoff2 += 0.01;

  

  ellipse(x,y,24,24);
  */
}