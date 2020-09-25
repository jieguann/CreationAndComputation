//存放粒子的数组
ParticleSystem ps;
PImage img01, img02, foreImg;
boolean flow;
void setup() {
  size(1280, 720, P3D);
  img01 = loadImage("01.png");
  img02 = loadImage("02.png");

  foreImg = loadImage("foreground.png");

  ps = new ParticleSystem();
  ps.initial(img01);
}

void draw() {
  //半透明背景
  fill(#2c0954, 10);
  noStroke();
  rect(0, 0, width, height);
  fill(255, 155);  
  if (flow) {
    ps.flow();
  }
  ps.update();
  ps.render();
  image(foreImg, 0, 0);
}

void keyTyped() {
  if (key=='f') {
    flow =!flow;
  }
  //1和2控制形变，p控制归为，其他任意键流动
  if (key=='1') {
    ps.morph(img01);
    flow = false;
  }
  if (key=='2') {
    ps.morph(img02);
    flow = false;
  }
}
